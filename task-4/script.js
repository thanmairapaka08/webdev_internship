function showMessage() {

    alert("Welcome to My Portfolio Website!");
}




const products = [

    {
        name: "Laptop",
        category: "electronics",
        price: 50000
    },

    {
        name: "Headphones",
        category: "electronics",
        price: 2000
    },

    {
        name: "T-Shirt",
        category: "fashion",
        price: 800
    },

    {
        name: "Shoes",
        category: "fashion",
        price: 2500
    },

    {
        name: "JavaScript Book",
        category: "books",
        price: 600
    }

];



const productContainer =
    document.getElementById("productContainer");

const filterCategory =
    document.getElementById("filterCategory");

const sortPrice =
    document.getElementById("sortPrice");



// Display Products

function displayProducts(productList) {

    if (!productContainer) return;

    productContainer.innerHTML = "";

    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `

            <h3>${product.name}</h3>

            <p>
                Category: ${product.category}
            </p>

            <p>
                Price: ₹${product.price}
            </p>

        `;

        productContainer.appendChild(card);

    });
}



// Filter & Sort

function filterAndSortProducts() {

    let filteredProducts = [...products];

    const category =
        filterCategory.value;

    const sort =
        sortPrice.value;



    // Filter

    if (category !== "all") {

        filteredProducts =
            filteredProducts.filter(

                product =>
                    product.category === category
            );
    }



    // Sort

    if (sort === "low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );
    }

    else if (sort === "high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );
    }



    displayProducts(filteredProducts);
}



// Event Listeners

if (filterCategory && sortPrice) {

    filterCategory.addEventListener(
        "change",
        filterAndSortProducts
    );

    sortPrice.addEventListener(
        "change",
        filterAndSortProducts
    );
}



// Initial Display

displayProducts(products);



const taskInput =
    document.getElementById("taskInput");

const taskList =
    document.getElementById("taskList");



let tasks =
    JSON.parse(localStorage.getItem("tasks"))
    || [];



// Save Tasks

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}



// Render Tasks

function renderTasks() {

    if (!taskList) return;

    taskList.innerHTML = "";



    tasks.forEach((task, index) => {

        const li =
            document.createElement("li");



        li.innerHTML = `

            <span>${task}</span>

            <button
                class="delete-btn"
                onclick="deleteTask(${index})"
            >
                Delete
            </button>

        `;



        taskList.appendChild(li);

    });
}



// Add Task

function addTask() {

    if (!taskInput) return;



    const task =
        taskInput.value.trim();



    if (task === "") {

        alert("Please enter a task!");

        return;
    }



    tasks.push(task);

    saveTasks();

    renderTasks();



    // Clear Input

    taskInput.value = "";
}



// Delete Task

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
}



// Initial Render

renderTasks();


const contactForm =
    document.getElementById("contactForm");



if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();



            const name =
                document.getElementById("name");

            const email =
                document.getElementById("email");

            const message =
                document.getElementById("message");



            // Validation

            if (

                name.value.trim() === "" ||

                email.value.trim() === "" ||

                message.value.trim() === ""

            ) {

                alert(
                    "Please fill all fields!"
                );

                return;
            }



            // Email Validation

            const emailPattern =
                /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;



            if (

                !email.value.match(emailPattern)

            ) {

                alert(
                    "Please enter a valid email!"
                );

                return;
            }



            // Success Popup

            alert(
                "✅ Message Sent Successfully!"
            );



            // Clear Fields

            name.value = "";

            email.value = "";

            message.value = "";

        }
    );
}