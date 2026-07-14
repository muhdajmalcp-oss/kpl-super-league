console.log("Admin Players Loaded");


let allPlayers = [];
let allTeams = [];

const playerContainer =
document.getElementById("adminPlayers");




// ============================
// LOAD TEAMS
// ============================

async function loadTeamsForPlayers(){


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


    allTeams=data;


}







// ============================
// LOAD PLAYERS
// ============================


async function loadAdminPlayers(){



    await loadTeamsForPlayers();




    const {data,error}=await supabaseClient

    .from("players")

    .select("*")

    .order("id",{ascending:false});





    if(error){


        console.log(
        "Player Load Error:",
        error
        );


        return;


    }




    allPlayers=data;


    displayPlayers(allPlayers);



}









// ============================
// DISPLAY PLAYERS
// ============================


function displayPlayers(players){



    playerContainer.innerHTML="";




    if(players.length===0){


        playerContainer.innerHTML =
        "<h3>No Players Found</h3>";


        return;


    }






    players.forEach(player=>{



        let teamOptions = `

        <option value="">
        Select Team
        </option>

        `;



        allTeams.forEach(team=>{


            teamOptions += `


            <option value="${team.team_name}"
            
            ${player.team===team.team_name ? "selected":""}

            >

            ${team.team_name}

            </option>


            `;


        });







        playerContainer.innerHTML += `


        <div class="player-card">



        <h3>
        ${player.full_name}
        </h3>




        <p>
        📍 Location:
        ${player.location ?? "Not given"}
        </p>




        <p>
        🎯 Position:
        ${player.position ?? "Not given"}
        </p>




        <p>
        🦶 Preferred Foot:
        ${player.preferred_foot ?? "Not given"}
        </p>




        <p>
        Experience:
        ${player.experience ?? "Not given"}
        </p>




        <p>
        Phone:
        ${player.phone ?? "Not given"}
        </p>




        <p>

        Current Team:

        <b>
        ${player.team ?? "Not Assigned"}
        </b>

        </p>





        <select id="team${player.id}">

        ${teamOptions}

        </select>





        <button onclick="assignPlayerTeam(${player.id})">

        Assign Team

        </button>




        </div>



        `;




    });



}









// ============================
// SEARCH PLAYERS
// ============================


function searchPlayers(){



    const search =

    document.getElementById("playerSearch")

    .value

    .toLowerCase();





    const filtered =

    allPlayers.filter(player=>{


        return (


        player.full_name
        ?.toLowerCase()
        .includes(search)



        ||


        player.position
        ?.toLowerCase()
        .includes(search)



        ||


        player.phone
        ?.includes(search)



        );



    });




    displayPlayers(filtered);



}









// ============================
// ASSIGN PLAYER TEAM
// ============================


async function assignPlayerTeam(id){



    const select =

    document.getElementById("team"+id);



    const teamName = select.value;





    if(teamName===""){


        alert("Please select a team");

        return;


    }






    const selectedTeam =

    allTeams.find(
    team=>team.team_name===teamName
    );







    const {error}=await supabaseClient

    .from("players")

    .update({


        team:teamName,


        team_id:selectedTeam.id,


        status:"Assigned"



    })

    .eq("id",id);






    if(error){


        console.log(
        "Assign Error:",
        error
        );


        alert("Assignment failed");


        return;


    }





    alert(
    "Player assigned to "+teamName+" ⚽"
    );



    loadAdminPlayers();



}








// START

loadAdminPlayers();