console.log("Update Points Loaded");


async function updatePointsTable() {

    console.log("Update button clicked");


    // Get finished matches

    const { data: matches, error } = await supabaseClient
        .from("fixtures")
        .select("*")
        .eq("status", "Finished");


    if(error){

        console.log("Fixture error:", error);
        return;

    }


    console.log("Matches:", matches);



    if(!matches || matches.length === 0){

        console.log("No finished matches");
        return;

    }




    // Reset points table

    const { data: teams, error: teamError } = await supabaseClient
        .from("points_table")
        .select("*");



    if(teamError){

        console.log(teamError);
        return;

    }



    for(let team of teams){


        await supabaseClient
        .from("points_table")
        .update({

            played:0,
            won:0,
            drawn:0,
            lost:0,
            goals_for:0,
            goals_against:0,
            goal_difference:0,
            points:0

        })
        .eq("team_name",team.team_name);


    }





    // Calculate matches

    for(let match of matches){


        console.log("Processing:",match);



        let home = match.home_team;

        let away = match.away_team;


        let homeScore = Number(match.home_score);

        let awayScore = Number(match.away_score);




        await updateStats(
            home,
            homeScore,
            awayScore
        );


        await updateStats(
            away,
            awayScore,
            homeScore
        );





        if(homeScore > awayScore){


            await addResult(home,"win");

            await addResult(away,"loss");


        }
        else if(awayScore > homeScore){


            await addResult(away,"win");

            await addResult(home,"loss");


        }
        else{


            await addResult(home,"draw");

            await addResult(away,"draw");


        }


    }



    console.log("Points table updated successfully");

}









async function updateStats(team, goalsFor, goalsAgainst) {


    const { data, error } = await supabaseClient
        .from("points_table")
        .select("*")
        .eq("team_name", team)
        .single();


    if(error){

        console.log("Stats error:", error);
        return;

    }


    const newGoalsFor = data.goals_for + goalsFor;

    const newGoalsAgainst = data.goals_against + goalsAgainst;


    const { error:updateError } = await supabaseClient
    .from("points_table")
    .update({

        played: data.played + 1,

        goals_for: newGoalsFor,

        goals_against: newGoalsAgainst,

        goal_difference:
        newGoalsFor - newGoalsAgainst

    })
    .eq("team_name", team);



    if(updateError){

        console.log(updateError);

    }
    else{

        console.log("Stats updated:", team);

    }


}








async function addResult(team,result){



    const {data,error}=await supabaseClient
    .from("points_table")
    .select("*")
    .eq("team_name",team)
    .single();



    if(error){

        console.log(
            "Result select error:",
            error
        );

        return;

    }




    let update = {};



    if(result==="win"){

        update={

            won:data.won + 1,

            points:data.points + 3

        };

    }




    if(result==="draw"){

        update={

            drawn:data.drawn + 1,

            points:data.points + 1

        };

    }




    if(result==="loss"){

        update={

            lost:data.lost + 1

        };

    }





    const {error:updateError}=await supabaseClient
    .from("points_table")
    .update(update)
    .eq("team_name",team);




    if(updateError){

        console.log(
            "Result update error:",
            updateError
        );

    }
    else{

        console.log(
            "Result updated:",
            team,
            result
        );

    }


}