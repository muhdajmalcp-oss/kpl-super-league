console.log("Register JS connected");


const form = document.getElementById("playerForm");


form.addEventListener("submit", async function(e){

    e.preventDefault();


    const player = {

        full_name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        position: document.getElementById("position").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        preferred_foot: document.getElementById("foot").value,
        experience: document.getElementById("experience").value

    };


    const { data, error } = await supabaseClient
        .from("players")
        .insert([player]);


    if(error){

        alert("Error: " + error.message);
        console.log(error);

    } else {

        alert("Registration Successful ⚽🏆");

        form.reset();

    }

});