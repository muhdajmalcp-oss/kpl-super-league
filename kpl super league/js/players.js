const container = document.getElementById("playersContainer");


async function loadPlayers(){


const {data,error} = await supabaseClient
.from("players")
.select("*");



if(error){

console.log(error);
return;

}



data.forEach(player => {


container.innerHTML += `

<div class="player-card">

<h2>${player.full_name}</h2>

<p>Age: ${player.age}</p>

<p>Position: ${player.position}</p>

<p>Phone: ${player.phone}</p>

<p>Location: ${player.location}</p>

<p>Foot: ${player.preferred_foot}</p>

<p>Experience: ${player.experience}</p>


</div>

`;


});


}


loadPlayers();