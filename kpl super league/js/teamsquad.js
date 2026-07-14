const container = document.getElementById("teamsContainer");

async function loadTeams() {

    const { data: teams, error } = await supabaseClient
        .from("teams")
        .select("*");

    if (error) {
        console.log(error);
        return;
    }

    for (const team of teams) {

        const { data: players } = await supabaseClient
            .from("players")
            .select("*")
            .eq("team", team.team_name);

        let playersList = "";

        players.forEach(player => {
            playersList += `<li>${player.full_name} - ₹${player.sold_price}</li>`;
        });

        container.innerHTML += `

        <div style="border:1px solid black; padding:15px; margin:15px;">

            <h2>${team.team_name}</h2>

            <p>Captain: ${team.captain_name}</p>

            <p>Owner: ${team.owner_name}</p>

            <p>Pot: ${team.pot}</p>

            <p>Remaining Purse: ₹${team.purse_amount}</p>

            <h3>Squad</h3>

            <ul>
                ${playersList}
            </ul>

        </div>

        `;
    }
}

loadTeams();