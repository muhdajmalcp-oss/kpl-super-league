function loginAdmin(){

    const password =
    document.getElementById("adminPassword").value;


    const correctPassword = "KPL2026";


    if(password === correctPassword){

        localStorage.setItem("adminLogin","true");

        window.location.href = "admin.html";

    }

    else{

        document.getElementById("message").innerHTML =
        "❌ Wrong Password";

    }

}