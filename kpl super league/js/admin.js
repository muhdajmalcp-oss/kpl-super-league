const container = document.getElementById("adminFixtures");


// ==========================
// LOAD TEAMS
// ==========================

async function loadTeams(){


    const {data,error} = await supabaseClient
        .from("teams")
        .select("team_name")
        .order("team_name");



    if(error){

        console.log("Team load error:", error);
        return;

    }



    const home =
    document.getElementById("homeTeam");


    const away =
    document.getElementById("awayTeam");



    home.innerHTML =
    `<option value="">Select Home Team</option>`;


    away.innerHTML =
    `<option value="">Select Away Team</option>`;



    data.forEach(team => {


        home.innerHTML += `

        <option value="${team.team_name}">
        ${team.team_name}
        </option>

        `;



        away.innerHTML += `

        <option value="${team.team_name}">
        ${team.team_name}
        </option>

        `;


    });


}






// ==========================
// LOAD FIXTURES
// ==========================


async function loadAdminFixtures(){


    const {data,error}=await supabaseClient
        .from("fixtures")
        .select("*")
        .order("id");



    if(error){

        console.log("Load error:",error);
        return;

    }



    container.innerHTML="";



    data.forEach(match=>{


        container.innerHTML += `


        <div class="fixture-card">


        <h3>

        ${match.home_team}

        VS

        ${match.away_team}

        </h3>



        <p>${match.stage ?? ""}</p>



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

        Update Match

        </button>




        <button onclick="deleteFixture(${match.id})">

        Delete

        </button>



        </div>


        `;



    });


}







// ==========================
// ADD FIXTURE
// ==========================


async function addFixture(){


    const home =
    document.getElementById("homeTeam").value;


    const away =
    document.getElementById("awayTeam").value;


    const date =
    document.getElementById("matchDate").value;


    const time =
    document.getElementById("matchTime").value;


    const stage =
    document.getElementById("stage").value;




    if(!home || !away || !date || !time){


        alert("Fill all fields");

        return;

    }






    const {error}=await supabaseClient
    .from("fixtures")
    .insert({


        home_team:home,

        away_team:away,

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







// ==========================
// UPDATE FIXTURE
// ==========================


async function updateMatch(id){



    const homeScore =
    Number(document.getElementById("home"+id).value);



    const awayScore =
    Number(document.getElementById("away"+id).value);



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






    alert("Fixture Updated ⚽");





    if(status==="Finished"){

        await updatePointsTable();

    }



    loadAdminFixtures();


}








// ==========================
// DELETE FIXTURE
// ==========================


async function deleteFixture(id){



    let confirmDelete =
    confirm("Delete this fixture?");



    if(!confirmDelete){

        return;

    }






    const {error}=await supabaseClient
    .from("fixtures")
    .delete()
    .eq("id",id);





    if(error){


        console.log(error);

        alert("Delete failed");

        return;


    }





    alert("Fixture Deleted");



    loadAdminFixtures();


}







// ==========================
// START
// ==========================


loadTeams();

loadAdminFixtures();