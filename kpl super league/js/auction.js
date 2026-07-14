const container = document.getElementById("auctionPlayers");


// Load available players
async function loadAuctionPlayers(){

    const {data, error} = await supabaseClient
    .from("players")
    .select("*")
    .eq("auction_status","Pending");


    if(error){

        console.log(error);
        return;

    }


    container.innerHTML = "";


    data.forEach(player => {


        container.innerHTML += `

        <div class="player-card">

            <h2>${player.full_name}</h2>

            <p>Position: ${player.position}</p>

            <p>Age: ${player.age}</p>

            <p>Experience: ${player.experience}</p>


            <input 
            id="price${player.id}" 
            type="number"
            placeholder="Sold Price">


            <select id="team${player.id}">

                <option>Manchester United</option>
                <option>Manchester City</option>
                <option>Liverpool</option>
                <option>Chelsea</option>
                <option>Arsenal</option>
                <option>Tottenham</option>

            </select>


            <button onclick="sellPlayer(${player.id})">
                SOLD
            </button>


        </div>

        `;

    });

}



// Sell player
async function sellPlayer(id){


    let price = Number(
        document.getElementById("price"+id).value
    );


    let team = 
        document.getElementById("team"+id).value;



    // Minimum price check

    if(price < 20){

        alert("Minimum player price is ₹20");
        return;

    }



    // Get team purse

    const {data: teamData, error: teamError} =
    await supabaseClient
    .from("teams")
    .select("purse_amount")
    .eq("team_name", team)
    .single();



    if(teamError){

        alert("Team not found");
        console.log(teamError);
        return;

    }



    // Check purse

    if(price > teamData.purse_amount){

        alert("Not enough purse amount");
        return;

    }



    // Update player

    const {error: playerError} =
    await supabaseClient
    .from("players")
    .update({

        auction_status:"Sold",
        sold_price:price,
        team:team

    })
    .eq("id",id);
    console.log("Player update:", playerError);



    if(playerError){

        alert(playerError.message);
        return;

    }



    // Deduct team purse

    const newPurse =
    teamData.purse_amount - price;
    console.log("Team:", team);
console.log("Old Purse:", teamData.purse_amount);
console.log("Price:", price);
console.log("New Purse:", newPurse);



   const {data:purseData, error:purseError} =
await supabaseClient
.from("teams")
.update({
    purse_amount:newPurse
})
.eq("team_name",team)
.select();


console.log("Purse result:", purseData);
console.log("Purse error:", purseError);
    console.log("Purse update error:", purseError);



    if(purseError){

        alert(purseError.message);
        return;

    }



    alert("Player Sold Successfully ⚽🏆");

    location.reload();


}



// Start auction page

loadAuctionPlayers();