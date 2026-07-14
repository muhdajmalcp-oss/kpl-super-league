const playerCount =
document.getElementById("playerCount");


const heroPlayerCount =
document.getElementById("heroPlayerCount");




async function loadPlayerCount(){


    const { count, error } = await supabaseClient

    .from("players")

    .select("*", {count:"exact", head:true});





    if(error){


        console.log(
            "Player count error:",
            error
        );


        return;


    }






    console.log(
        "Total Players:",
        count
    );






    playerCount.innerHTML = count;



    heroPlayerCount.innerHTML = count;



}






loadPlayerCount();