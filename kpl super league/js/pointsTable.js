const table = document.getElementById("pointsTable");


async function loadPointsTable(){


    const {data,error}=await supabaseClient
    .from("points_table")
    .select("*")
    .order("points",{ascending:false})
    .order("goal_difference",{ascending:false})
    .order("goals_for",{ascending:false});



    if(error){

        console.log(error);
        return;

    }



    // clear old data

    table.innerHTML = "";



    let position = 1;



    data.forEach(team=>{


        let gd = team.goal_difference;


        if(gd > 0){

            gd = "+" + gd;

        }



        table.innerHTML += `

        <tr>


        <td>${position}</td>


        <td>${team.team_name}</td>


        <td>${team.played}</td>


        <td>${team.won}</td>


        <td>${team.drawn}</td>


        <td>${team.lost}</td>


        <td>${team.goals_for}</td>


        <td>${team.goals_against}</td>


        <td>${gd}</td>


        <td>${team.points}</td>


        </tr>


        `;



        position++;


    });



}



loadPointsTable();