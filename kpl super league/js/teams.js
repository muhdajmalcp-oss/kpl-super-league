const container = document.getElementById("teamsContainer");


const teams = [
    "Manchester United",
    "Manchester City",
    "Liverpool",
    "Chelsea",
    "Arsenal",
    "Tottenham"
];


async function loadTeams(){


for (let team of teams){


const {data,error} = await supabaseClient
.from("players")
.select("*")
.eq("team", team);



if(error){
    console.log(error);
    continue;
}



container.innerHTML += `

<div class="team-card">

<h2>🏆 ${team}</h2>

<h3>Players: ${data.length}</h3>


${data.length === 0 ? 

"<p>No players yet</p>" :

data.map((player,index)=>`

<div class="player">

<p><b>${index+1}. ${player.full_name}</b></p>

<p>Position: ${player.position}</p>

<p>Age: ${player.age}</p>

<p>Sold Price: ₹${player.sold_price}</p>

</div>

`).join("")

}


</div>

`;

}


}


loadTeams();