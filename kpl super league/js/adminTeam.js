console.log("Admin Teams Loaded");



const teamsAdminContainer =
document.getElementById("teamsAdminContainer");




// ============================
// LOAD TEAMS
// ============================


async function loadAdminTeams(){



const {data,error}=await supabaseClient

.from("teams")

.select("*")

.order("id");



if(error){

console.log(
"Team Load Error:",
error
);

return;

}




teamsAdminContainer.innerHTML="";




// Fixture dropdowns

const homeSelect =
document.getElementById("homeTeam");


const awaySelect =
document.getElementById("awayTeam");



if(homeSelect && awaySelect){



homeSelect.innerHTML = `

<option value="">
Select Home Team
</option>

`;



awaySelect.innerHTML = `

<option value="">
Select Away Team
</option>

`;



}







data.forEach(team)


teamsAdminContainer.innerHTML += `


<div class="team-card">


<h3>
${team.team_name}
</h3>


<p>
Captain:
${team.captain_name ?? "N/A"}
</p>


<p>
Owner:
${team.owner_name ?? "N/A"}
</p>


<p>
Purse:
₹${team.purse_amount ?? 0}
</p>


<p>
${team.pot ?? ""}
</p>



<button onclick="deleteTeam(${team.id})">

Delete

</button>



</div>


`;







// Add to fixture dropdown


if(homeSelect && awaySelect){



homeSelect.innerHTML += `


<option value="${team.team_name}">

${team.team_name}

</option>


`;





awaySelect.innerHTML += `


<option value="${team.team_name}">

${team.team_name}

</option>


`;



}





};














// ============================
// ADD TEAM
// ============================


async function addTeam(){



const teamName =

document.getElementById("teamName").value;



const captain =

document.getElementById("captainName").value;



const owner =

document.getElementById("ownerName").value;



const purse =

Number(
document.getElementById("purseAmount").value
);



const pot =

document.getElementById("teamPot").value;





if(teamName===""){


alert("Enter team name");

return;


}






const {error}=await supabaseClient

.from("teams")

.insert({


team_name:teamName,


captain_name:captain,


owner_name:owner,


purse_amount:purse,


pot:pot



});





if(error){


console.log(error);


alert("Team not added");


return;


}





alert("Team Added ⚽");



loadAdminTeams();



}









// ============================
// DELETE TEAM
// ============================


async function deleteTeam(id){



const confirmDelete =

confirm(
"Delete this team?"
);



if(!confirmDelete){

return;

}






const {error}=await supabaseClient

.from("teams")

.delete()

.eq("id",id);






if(error){


console.log(error);


alert("Delete failed");


return;


}





alert("Team Deleted");



loadAdminTeams();



}









// START

loadAdminTeams();