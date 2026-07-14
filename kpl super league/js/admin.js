console.log("Admin JS Loaded");



const fixtureContainer =
document.getElementById("adminFixtures");




// ============================
// ADD FIXTURE
// ============================


async function addFixture(){



const homeTeam =

document.getElementById("homeTeam").value;



const awayTeam =

document.getElementById("awayTeam").value;



const date =

document.getElementById("matchDate").value;



const time =

document.getElementById("matchTime").value;



const stage =

document.getElementById("stage").value;







if(homeTeam==="" || awayTeam===""){


alert("Select both teams");

return;


}





if(homeTeam===awayTeam){


alert("A team cannot play against itself");

return;


}






const {error}=await supabaseClient

.from("fixtures")

.insert({


home_team:homeTeam,


away_team:awayTeam,


match_date:date,


match_time:time,


stage:stage,


home_score:0,


away_score:0,


status:"Scheduled"



});







if(error){


console.log(error);


alert("Fixture not added");


return;


}






alert("Fixture Added ⚽");



loadAdminFixtures();



}









// ============================
// LOAD FIXTURES
// ============================


async function loadAdminFixtures(){



const {data,error}=await supabaseClient

.from("fixtures")

.select("*")

.order("id",{ascending:false});





if(error){


console.log(
"Fixture Error:",
error
);


return;


}






fixtureContainer.innerHTML="";







data.forEach(match=>{





fixtureContainer.innerHTML += `


<div class="fixture-card">


<h3>

${match.home_team}

VS

${match.away_team}

</h3>




<p>

${match.stage ?? ""}

</p>




<p>

📅 ${match.match_date}

</p>




<p>

⏰ ${match.match_time}

</p>





<input

id="home${match.id}"

type="number"

value="${match.home_score ?? 0}"

>



-




<input

id="away${match.id}"

type="number"

value="${match.away_score ?? 0}"

>




<select id="status${match.id}">


<option value="Scheduled"

${match.status==="Scheduled"?"selected":""}>

Scheduled

</option>




<option value="Finished"

${match.status==="Finished"?"selected":""}>

Finished

</option>


</select>





<button onclick="updateMatch(${match.id})">

Save Match

</button>




</div>


`;





});




}









// ============================
// UPDATE FIXTURE
// ============================


async function updateMatch(id){



const homeScore =

Number(
document.getElementById("home"+id).value
);



const awayScore =

Number(
document.getElementById("away"+id).value
);



const status =

document.getElementById("status"+id).value;







const {error}=await supabaseClient

.from("fixtures")

.update({


home_score:homeScore,


away_score:awayScore,


status:status



})

.eq("id",id);







if(error){


console.log(error);


alert("Update failed");


return;


}





alert("Match Updated ⚽");






if(status==="Finished"){


await updatePointsTable();


}






loadAdminFixtures();



}









// START

loadAdminFixtures();