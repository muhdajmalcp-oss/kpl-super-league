const container = document.getElementById("fixturesContainer");

async function loadFixtures() {

    const { data, error } = await supabaseClient
        .from("fixtures")
        .select("*")
        .order("id");

    if (error) {
        console.log(error);
        return;
    }

    data.forEach(match => {

        container.innerHTML += `
            <div class="fixture-card">

                <h2>${match.stage}</h2>

                <h3>
                    ${match.home_team}
                    <br>VS<br>
                    ${match.away_team}
                </h3>

                <p>📅 Date: ${match.match_date}</p>

                <p>⏰ Time: ${match.match_time}</p>

                <p>⚽ Score:
                ${match.home_score} - ${match.away_score}
                </p>

                <p>📌 Status: ${match.status}</p>

            </div>
        `;
    });
}

loadFixtures();