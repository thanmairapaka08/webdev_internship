const form = document.getElementById("form");

const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

// LIVE VALIDATION
fname.addEventListener("input", () => validateName(fname));
lname.addEventListener("input", () => validateName(lname));
email.addEventListener("input", validateEmail);
phone.addEventListener("input", validatePhone);
password.addEventListener("input", validatePassword);
cpassword.addEventListener("input", validateConfirmPassword);

// FUNCTIONS
function setError(input, message) {
    input.classList.add("error");
    input.classList.remove("success");
    input.nextElementSibling.textContent = message;
}

function setSuccess(input) {
    input.classList.add("success");
    input.classList.remove("error");
    input.nextElementSibling.textContent = "";
}

function validateName(input) {
    if (input.value.trim() === "") {
        setError(input, "Required");
    } else {
        setSuccess(input);
    }
}

function validateEmail() {
    if (!email.value.includes("@")) {
        setError(email, "Invalid email");
    } else {
        setSuccess(email);
    }
}

function validatePhone() {
    if (phone.value.length < 10) {
        setError(phone, "Invalid phone");
    } else {
        setSuccess(phone);
    }
}

function validatePassword() {
    if (password.value.length < 6) {
        setError(password, "Min 6 characters");
    } else {
        setSuccess(password);
    }
}

function validateConfirmPassword() {
    if (cpassword.value !== password.value) {
        setError(cpassword, "Passwords not match");
    } else {
        setSuccess(cpassword);
    }
}

// SUBMIT CHECK
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // run all validations again
    validateName(fname);
    validateName(lname);
    validateEmail();
    validatePhone();
    validatePassword();
    validateConfirmPassword();

    // check if any error exists
    let errors = document.querySelectorAll(".error");

    if (errors.length === 0) {
        alert("Registration Successful!");
        form.reset();
    } else {
        alert("Please enter correct details!");
    }
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (!taskInput || !taskList) {
        console.log("Element not found!");
        return;
    }

    let taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = taskValue;

    let btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = function () {
        li.remove();
    };

    li.appendChild(btn);
    taskList.appendChild(li);

    taskInput.value = "";
}