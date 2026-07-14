console.log("Admin Points Loaded");


const adminPointsTable =
document.getElementById("adminPointsTable");




// ==========================
// LOAD POINTS TABLE
// ==========================


async function loadAdminPoints(){


    const {data,error}=await supabaseClient

    .from("points_table")

    .select("*")

    .order("points",{ascending:false});



    if(error){

        console.log(
        "Points Load Error:",
        error
        );

        return;

    }




    adminPointsTable.innerHTML="";




    data.forEach(team=>{


        adminPointsTable.innerHTML += `


        <div class="points-card">


        <h3>
        ${team.team_name}
        </h3>



        <label>Played</label>

        <input 
        id="played${team.id}"
        value="${team.played}"
        type="number"
        >



        <label>Won</label>

        <input 
        id="won${team.id}"
        value="${team.won}"
        type="number"
        >



        <label>Drawn</label>

        <input 
        id="drawn${team.id}"
        value="${team.drawn}"
        type="number"
        >



        <label>Lost</label>

        <input 
        id="lost${team.id}"
        value="${team.lost}"
        type="number"
        >



        <label>Goals For</label>

        <input 
        id="gf${team.id}"
        value="${team.goals_for}"
        type="number"
        >



        <label>Goals Against</label>

        <input 
        id="ga${team.id}"
        value="${team.goals_against}"
        type="number"
        >



        <label>Goal Difference</label>

        <input 
        id="gd${team.id}"
        value="${team.goal_difference}"
        type="number"
        >



        <label>Points</label>

        <input 
        id="points${team.id}"
        value="${team.points}"
        type="number"
        >




        <button onclick="savePoints(${team.id})">

        Save Changes

        </button>



        </div>


        `;


    });



}








// ==========================
// SAVE POINTS
// ==========================


async function savePoints(id){



    const update = {


        played:Number(
        document.getElementById("played"+id).value
        ),


        won:Number(
        document.getElementById("won"+id).value
        ),


        drawn:Number(
        document.getElementById("drawn"+id).value
        ),


        lost:Number(
        document.getElementById("lost"+id).value
        ),


        goals_for:Number(
        document.getElementById("gf"+id).value
        ),


        goals_against:Number(
        document.getElementById("ga"+id).value
        ),


        goal_difference:Number(
        document.getElementById("gd"+id).value
        ),


        points:Number(
        document.getElementById("points"+id).value
        )


    };






    const {error}=await supabaseClient

    .from("points_table")

    .update(update)

    .eq("id",id);






    if(error){


        console.log(
        "Update Error:",
        error
        );


        alert("Points update failed");


        return;


    }





    alert("Points table updated ✅");


    loadAdminPoints();



}






// START

loadAdminPoints();