console.log("Update Points Loaded");





async function updatePointsTable(){


console.log("Updating Points Table...");





// Get finished matches


const {data:matches,error}=await supabaseClient

.from("fixtures")

.select("*")

.eq("status","Finished");






if(error){


console.log(
"Fixture Error:",
error
);


return;


}






if(!matches || matches.length===0){


alert("No finished matches found");


return;


}







// Get teams


const {data:teams,error:teamError}=await supabaseClient

.from("points_table")

.select("*");







if(teamError){


console.log(teamError);


return;


}







// Reset table


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

.eq("id",team.id);



}









// Process matches


for(let match of matches){



let home =
match.home_team;


let away =
match.away_team;



let homeScore =
Number(match.home_score);



let awayScore =
Number(match.away_score);






await updateTeamStats(

home,

homeScore,

awayScore

);





await updateTeamStats(

away,

awayScore,

homeScore

);







if(homeScore > awayScore){



await addPoints(home,"win");


await addPoints(away,"loss");



}

else if(awayScore > homeScore){



await addPoints(away,"win");


await addPoints(home,"loss");



}

else{



await addPoints(home,"draw");


await addPoints(away,"draw");



}





}






alert(
"Points Table Updated ✅"
);


console.log(
"Points update complete"
);



}









// ==========================
// UPDATE GOALS
// ==========================


async function updateTeamStats(team,gf,ga){



const {data,error}=await supabaseClient

.from("points_table")

.select("*")

.eq("team_name",team)

.single();





if(error){


console.log(error);


return;


}






await supabaseClient

.from("points_table")

.update({


played:data.played+1,


goals_for:data.goals_for+gf,


goals_against:data.goals_against+ga,


goal_difference:
(data.goals_for+gf)
-
(data.goals_against+ga)



})

.eq("team_name",team);





}









// ==========================
// ADD WIN DRAW LOSS
// ==========================


async function addPoints(team,result){



const {data,error}=await supabaseClient

.from("points_table")

.select("*")

.eq("team_name",team)

.single();





if(error){


console.log(error);


return;


}






let update={};





if(result==="win"){


update={


won:data.won+1,


points:data.points+3


};


}







if(result==="draw"){


update={


drawn:data.drawn+1,


points:data.points+1


};


}







if(result==="loss"){


update={


lost:data.lost+1


};


}







await supabaseClient

.from("points_table")

.update(update)

.eq("team_name",team);





}