const pot1Teams = [
    "Manchester United",
    "Manchester City",
    "Liverpool"
];

const pot2Teams = [
    "Chelsea",
    "Arsenal",
    "Tottenham"
];

async function loadPoints() {

    const { data, error } = await supabaseClient
        .from("fixtures")
        .select("*");

    if (error) {
        console.log(error);
        return;
    }

    function createTable(teams) {

        let standings = {};

        teams.forEach(team => {
            standings[team] = {
                team,
                played: 0,
                won: 0,
                draw: 0,
                lost: 0,
                gf: 0,
                ga: 0,
                gd: 0,
                pts: 0
            };
        });

        data.forEach(match => {

            if (match.status !== "Finished") return;

            const home = standings[match.home_team];
            const away = standings[match.away_team];

            if (!home || !away) return;

            home.played++;
            away.played++;

            home.gf += match.home_score;
            home.ga += match.away_score;

            away.gf += match.away_score;
            away.ga += match.home_score;

            if (match.home_score > match.away_score) {
                home.won++;
                away.lost++;
                home.pts += 3;
            }
            else if (match.home_score < match.away_score) {
                away.won++;
                home.lost++;
                away.pts += 3;
            }
            else {
                home.draw++;
                away.draw++;
                home.pts += 1;
                away.pts += 1;
            }
        });

        Object.values(standings).forEach(team => {
            team.gd = team.gf - team.ga;
        });

        return Object.values(standings)
            .sort((a, b) => b.pts - a.pts || b.gd - a.gd);
    }

    const pot1 = createTable(pot1Teams);
    const pot2 = createTable(pot2Teams);

    function render(containerId, tableData) {

        let html = `
        <table border="1" cellpadding="10">
        <tr>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
        </tr>`;

        tableData.forEach(team => {
            html += `
            <tr>
                <td>${team.team}</td>
                <td>${team.played}</td>
                <td>${team.won}</td>
                <td>${team.draw}</td>
                <td>${team.lost}</td>
                <td>${team.gf}</td>
                <td>${team.ga}</td>
                <td>${team.gd}</td>
                <td>${team.pts}</td>
            </tr>`;
        });

        html += "</table>";

        document.getElementById(containerId).innerHTML = html;
    }

    render("pot1", pot1);
    render("pot2", pot2);
}

loadPoints();