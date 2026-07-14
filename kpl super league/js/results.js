const container = document.getElementById("resultsContainer");

async function loadResults() {

    const { data, error } = await supabaseClient
        .from("fixtures")
        .select("*")
        .eq("status", "Finished");

    if (error) {
        console.log(error);
        container.innerHTML = "Error loading results";
        return;
    }

    console.log(data);

    if (data.length === 0) {
        container.innerHTML = "<h2>No results available yet.</h2>";
        return;
    }

    data.forEach(match => {

        container.innerHTML += `
        <div class="result-card">

            <h2>${match.stage}</h2>

            <h3>
                ${match.home_team}
                ${match.home_score}
                -
                ${match.away_score}
                ${match.away_team}
            </h3>

            <p>📅 ${match.match_date}</p>
            <p>⏰ ${match.match_time}</p>
            <p>✅ ${match.status}</p>

        </div>
        `;

    });
}

loadResults();