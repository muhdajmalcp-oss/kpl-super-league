console.log("Points Table Loaded");


async function loadPoints(){



// Get teams from database

const {data:teams,error:teamError}=await supabaseClient

.from("teams")

.select("*")

.order("id");



if(teamError){

console.log(teamError);

return;

}





// Get fixtures

const {data:matches,error}=await supabaseClient

.from("fixtures")

.select("*");



if(error){

console.log(error);

return;

}







function createTable(teamList){



let standings={};





teamList.forEach(team=>{


standings[team.team_name]={


team:team.team_name,

played:0,

won:0,

draw:0,

lost:0,

gf:0,

ga:0,

gd:0,

pts:0


};



});







matches.forEach(match=>{



if(match.status !== "Finished") return;



let home =
standings[match.home_team];


let away =
standings[match.away_team];




if(!home || !away) return;




let homeScore =
Number(match.home_score);



let awayScore =
Number(match.away_score);





home.played++;

away.played++;




home.gf += homeScore;

home.ga += awayScore;



away.gf += awayScore;

away.ga += homeScore;






if(homeScore > awayScore){


home.won++;

away.lost++;

home.pts += 3;


}



else if(awayScore > homeScore){


away.won++;

home.lost++;

away.pts += 3;


}



else{


home.draw++;

away.draw++;

home.pts++;

away.pts++;


}




});







Object.values(standings).forEach(team=>{


team.gd =
team.gf-team.ga;


});






return Object.values(standings)

.sort(
(a,b)=>

b.pts-a.pts ||

b.gd-a.gd

);



}









// Separate pots

const pot1 =

createTable(
teams.filter(
team=>team.pot==="Pot 1"
)
);





const pot2 =

createTable(
teams.filter(
team=>team.pot==="Pot 2"
)
);









function render(id,data){



let html=`

<table class="points-table">


<tr>

<th>Pos</th>
<th>Team</th>
<th>P</th>
<th>W</th>
<th>D</th>
<th>L</th>
<th>GF</th>
<th>GA</th>
<th>GD</th>
<th>PTS</th>

</tr>


`;




let position=1;



data.forEach(team=>{



html+=`


<tr>


<td>${position}</td>


<td>${team.team}</td>


<td>${team.played}</td>


<td>${team.won}</td>


<td>${team.draw}</td>


<td>${team.lost}</td>


<td>${team.gf}</td>


<td>${team.ga}</td>


<td>${team.gd}</td>


<td>${team.pts}</td>



</tr>



`;



position++;


});




html+="</table>";



document.getElementById(id).innerHTML=html;



}







render("pot1",pot1);

render("pot2",pot2);



}





loadPoints();