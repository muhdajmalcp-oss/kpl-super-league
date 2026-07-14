const teamsAdminContainer =
document.getElementById("teamsAdminContainer");



// LOAD TEAMS

async function loadAdminTeams(){


const {data,error}=await supabaseClient
.from("teams")
.select("*")
.order("id");



if(error){

console.log(error);
return;

}



teamsAdminContainer.innerHTML="";



data.forEach(team=>{


teamsAdminContainer.innerHTML += `

<div class="fixture-card">


<h3>
${team.team_name}
</h3>


<p>
Captain:
${team.captain_name ?? ""}
</p>


<p>
Owner:
${team.owner_name ?? ""}
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



});


}







// ADD TEAM

async function addTeam(){


const team =
document.getElementById("teamName").value;


const captain =
document.getElementById("captainName").value;


const owner =
document.getElementById("ownerName").value;


const purse =
document.getElementById("purseAmount").value;


const pot =
document.getElementById("teamPot").value;




const {error}=await supabaseClient
.from("teams")
.insert({

team_name:team,

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







// DELETE TEAM

async function deleteTeam(id){


let confirmDelete =
confirm("Delete this team?");



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







loadAdminTeams();