console.log("KPL Auction System Loaded");



let allPlayers = [];

let soldPlayers = [];



const playerContainer =
document.getElementById("auctionPlayers");


const soldContainer =
document.getElementById("soldPlayers");





// ===============================
// LOAD ALL PLAYERS
// ===============================


async function loadPlayers(){



const {data,error}=await supabaseClient

.from("players")

.select("*")

.order("id",{ascending:false});




if(error){

console.log("Player Loading Error:",error);

return;

}




console.log("All Players:",data);




// Available players

allPlayers = data.filter(player =>

player.auction_status !== "Sold"

);



// Sold players

soldPlayers = data.filter(player =>

player.auction_status === "Sold"

);



console.log("Available Players:",allPlayers);

console.log("Sold Players:",soldPlayers);



displayPlayers(allPlayers);


displaySoldPlayers(soldPlayers);



}









// ===============================
// DISPLAY AVAILABLE PLAYERS
// ===============================


function displayPlayers(players){



playerContainer.innerHTML="";




if(players.length===0){


playerContainer.innerHTML=

"<h3>No players available</h3>";


return;


}





players.forEach(player=>{


playerContainer.innerHTML += `



<div class="auction-card">



<h2>
${player.full_name}
</h2>



<p>
Position:
${player.position ?? "-"}
</p>



<p>
Age:
${player.age ?? "-"}
</p>



<p>
Experience:
${player.experience ?? "-"}
</p>





<input

id="price${player.id}"

type="number"

placeholder="Sold Price"

>




<select id="team${player.id}">


<option value="Manchester United">
Manchester United
</option>


<option value="Manchester City">
Manchester City
</option>


<option value="Liverpool">
Liverpool
</option>


<option value="Chelsea">
Chelsea
</option>


<option value="Arsenal">
Arsenal
</option>


<option value="Tottenham">
Tottenham
</option>


</select>




<button onclick="sellPlayer(${player.id})">

Sell Player

</button>




</div>



`;



});



}









// ===============================
// DISPLAY SOLD PLAYERS
// ===============================


function displaySoldPlayers(players){



soldContainer.innerHTML="";




if(players.length===0){


soldContainer.innerHTML=

"<h3>No sold players</h3>";


return;


}






players.forEach(player=>{



soldContainer.innerHTML += `



<div class="auction-card sold-card">



<h2>
${player.full_name}
</h2>




<p>
Position:
${player.position ?? "-"}
</p>



<p>
Sold Team:
<b>
${player.team ?? "-"}
</b>
</p>



<p>
Sold Price:
₹${player.sold_price ?? 0}
</p>





<select id="changeTeam${player.id}">


<option>
Manchester United
</option>


<option>
Manchester City
</option>


<option>
Liverpool
</option>


<option>
Chelsea
</option>


<option>
Arsenal
</option>


<option>
Tottenham
</option>



</select>




<button onclick="changeTeam(${player.id})">

Update Team

</button>



</div>



`;



});



}









// ===============================
// SEARCH AVAILABLE PLAYERS
// ===============================


function searchPlayers(){



let value = 

document.getElementById("playerSearch")

.value

.toLowerCase();





let filtered = allPlayers.filter(player =>



player.full_name

.toLowerCase()

.includes(value)



);



displayPlayers(filtered);



}









// ===============================
// SEARCH SOLD PLAYERS
// ===============================


function searchSoldPlayers(){



let value = 

document.getElementById("soldSearch")

.value

.toLowerCase();





let filtered = soldPlayers.filter(player =>



player.full_name

.toLowerCase()

.includes(value)



);



displaySoldPlayers(filtered);



}









// ===============================
// SELL PLAYER
// ===============================


async function sellPlayer(id){



let price = Number(

document.getElementById(
"price"+id
).value

);




let team =

document.getElementById(
"team"+id
).value;





if(price<=0){


alert(
"Enter valid sold price"
);


return;


}







const {error}=await supabaseClient


.from("players")


.update({

auction_status:"Sold",

sold_price:price,

team:team


})


.eq("id",id);







if(error){


console.log(error);


alert(
"Sale failed"
);


return;


}





alert(
"Player Sold Successfully"
);



loadPlayers();



}









// ===============================
// CHANGE SOLD PLAYER TEAM
// ===============================


async function changeTeam(id){



let team =

document.getElementById(

"changeTeam"+id

).value;





const {error}=await supabaseClient


.from("players")


.update({

team:team

})


.eq("id",id);






if(error){


console.log(error);


alert(
"Team update failed"
);


return;


}




alert(
"Team Updated"
);



loadPlayers();



}








// START

loadPlayers();