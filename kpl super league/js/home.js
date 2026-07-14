console.log("Home Loaded");


async function loadHomeStats(){



const {count:players,error:pError}=

await supabaseClient

.from("players")

.select("*",{count:"exact",head:true});





if(!pError){

document.getElementById("playerCount").innerHTML=players;

document.getElementById("heroPlayerCount").innerHTML=players;

}






const {count:teams,error:tError}=

await supabaseClient

.from("teams")

.select("*",{count:"exact",head:true});





if(!tError){

document.getElementById("teamCount").innerHTML=teams;

document.getElementById("teamCountCard").innerHTML=teams;

}



}



loadHomeStats();