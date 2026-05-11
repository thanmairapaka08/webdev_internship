// ===========================
// REGISTER USER
// ===========================

function registerUser() {

    const name =
        document.getElementById("registerName");

    const email =
        document.getElementById("registerEmail");

    const password =
        document.getElementById("registerPassword");



    if (
        !name ||
        !email ||
        !password
    ) return;



    if (
        name.value.trim() === "" ||
        email.value.trim() === "" ||
        password.value.trim() === ""
    ) {

        alert("Please fill all fields!");

        return;
    }



    const user = {

        name: name.value,

        email: email.value,

        password: password.value
    };



    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );



    alert("Registration Successful!");

    window.location.href = "auth.html";
}



// ===========================
// LOGIN USER
// ===========================

function loginUser() {

    const email =
        document.getElementById("loginEmail");

    const password =
        document.getElementById("loginPassword");



    if (
        !email ||
        !password
    ) return;



    const savedUser =
        JSON.parse(
            localStorage.getItem("user")
        );



    if (!savedUser) {

        alert("Please register first!");

        return;
    }



    if (
        email.value === savedUser.email &&
        password.value === savedUser.password
    ) {

        alert("Login Successful!");



        window.location.href =
            "dashboard.html";
    }

    else {

        alert("Invalid Email or Password!");
    }
}



// ===========================
// SUBSCRIPTIONS
// ===========================

const subscriptionList =
    document.getElementById("subscriptionList");

const subscriptionName =
    document.getElementById("subscriptionName");

const subscriptionPrice =
    document.getElementById("subscriptionPrice");



let subscriptions =
    JSON.parse(
        localStorage.getItem("subscriptions")
    ) || [];



// Save Subscriptions

function saveSubscriptions() {

    localStorage.setItem(
        "subscriptions",
        JSON.stringify(subscriptions)
    );
}



// Render Subscriptions

function renderSubscriptions() {

    if (!subscriptionList) return;

    subscriptionList.innerHTML = "";



    subscriptions.forEach((sub, index) => {

        const li =
            document.createElement("li");



        li.innerHTML = `

            <div>

                <strong>
                    ${sub.name}
                </strong>

                <p>
                    Category:
                    ${sub.category}
                </p>

                <p>
                    ₹${sub.price}/month
                </p>

                <p>
                    Renewal:
                    ${sub.renewal}
                </p>

            </div>


            <button
                class="delete-btn"
                onclick="deleteSubscription(${index})"
            >
                Delete
            </button>

        `;



        subscriptionList.appendChild(li);

    });



    updateAnalytics();
}


// Add Subscription

function addSubscription() {

    const category =
        document.getElementById(
            "subscriptionCategory"
        );

    const renewalDate =
        document.getElementById(
            "renewalDate"
        );



    if (
        !subscriptionName ||
        !subscriptionPrice ||
        !category ||
        !renewalDate
    ) return;



    const name =
        subscriptionName.value.trim();

    const price =
        subscriptionPrice.value.trim();

    const categoryValue =
        category.value.trim();

    const renewal =
        renewalDate.value;



    if (
        name === "" ||
        price === "" ||
        categoryValue === "" ||
        renewal === ""
    ) {

        alert("Please fill all fields!");

        return;
    }



    subscriptions.push({

        name: name,

        category: categoryValue,

        price: Number(price),

        renewal: renewal

    });



    saveSubscriptions();

    renderSubscriptions();



    alert(
        "Subscription Added Successfully!"
    );



    subscriptionName.value = "";

    subscriptionPrice.value = "";

    category.value = "";

    renewalDate.value = "";
}


// Delete Subscription

function deleteSubscription(index) {

    subscriptions.splice(index, 1);

    saveSubscriptions();

    renderSubscriptions();
}



// ===========================
// ANALYTICS
// ===========================

function updateAnalytics() {

    const totalSubscriptions =
        document.getElementById(
            "totalSubscriptions"
        );

    const totalAmount =
        document.getElementById(
            "totalAmount"
        );

    const activePlans =
        document.getElementById(
            "activePlans"
        );



    // Total Subscriptions

    if (totalSubscriptions) {

        totalSubscriptions.innerText =
            subscriptions.length;
    }



    // Total Amount

    if (totalAmount) {

        let total = 0;



        subscriptions.forEach(sub => {

            total += Number(sub.price);
        });



        totalAmount.innerText =
            `₹${total}`;
    }



    // Active Plans

    if (activePlans) {

        activePlans.innerText =
            subscriptions.length;
    }
}
// ===========================
// LOGOUT
// ===========================

function logoutUser() {

    alert("Logged Out Successfully!");

    window.location.href =
        "index.html";
}


// Initial Render

renderSubscriptions();

updateAnalytics();