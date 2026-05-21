// ELEMENTS

const signupBtn = document.getElementById("signupBtn");

const message = document.getElementById("message");

const darkModeBtn = document.getElementById("darkModeBtn");

const password = document.getElementById("password");

const strengthText = document.getElementById("strengthText");

const togglePassword = document.getElementById("togglePassword");

// DARK MODE

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    // Save preference
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
    }
    else{
        localStorage.setItem("theme", "light");
    }
});

// LOAD SAVED THEME

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
}

// PASSWORD STRENGTH

password.addEventListener("input", () => {

    const value = password.value;

    if(value.length < 6){
        strengthText.textContent = "Weak Password";
        strengthText.style.color = "red";
    }
    else if(value.length < 10){
        strengthText.textContent = "Medium Password";
        strengthText.style.color = "orange";
    }
    else{
        strengthText.textContent = "Strong Password";
        strengthText.style.color = "green";
    }
});

// SHOW/HIDE PASSWORD

togglePassword.addEventListener("click", () => {

    if(password.type === "password"){
        password.type = "text";
        togglePassword.textContent = "Hide";
    }
    else{
        password.type = "password";
        togglePassword.textContent = "Show";
    }
});

// FORM VALIDATION

signupBtn.addEventListener("click", () => {

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const pass = password.value.trim();

    message.classList.remove("success", "error");

    // VALIDATION

    if(name === "" || email === "" || pass === ""){

        message.textContent = "Please fill in all fields.";
        message.classList.add("error");

        return;
    }

    // EMAIL CHECK

    if(!email.includes("@") || !email.includes(".")){

        message.textContent = "Please enter a valid email.";
        message.classList.add("error");

        return;
    }

    // PASSWORD LENGTH

    if(pass.length < 6){

        message.textContent = "Password must be at least 6 characters.";
        message.classList.add("error");

        return;
    }

    // SUCCESS

    message.textContent = `Welcome to ASync, ${name}!`;

    message.classList.add("success");

    // SAVE USER

    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
});