checkLogin();
function checkLogin() {
   let lsData = JSON.parse(localStorage.getItem("admin-user")) || [];
   if (lsData.length == 0) {
      alert("Need  Authorization");
      window.location.href = 'admin_signup_login.html';
   }
}


//----------------------------fetch----------------------------
let currProduct = "";
async function fetchData(product = "iphone") {
   currProduct = product;
   try {
      let res = await fetch(`https://myapple-api-json-server.onrender.com/${product}`);
      let data = await res.json();
      Display(data);
   } catch (error) {
      console.log(error);
   }
}



//----------------------- Dashboard page---------------------------
let dashboard = document.querySelector("#main-content");

welcome();
function welcome() {
   dashboard.innerHTML = `<h2>Dashboard</h2>
    <p>Welcome to the Ace Admin Page!</p>
    <div id="dashboard-main">
       <div class="dashboard-card">
          <h3>Product Information</h3>
          <hr>
          <p>Total Products: 500</p>
          <p>New Products Added: 10</p>
          <p>Products Out of Stock: 20</p>
       </div>
       <div class="dashboard-card">
          <h3>Customer Support</h3>
          <hr>
          <p>Total Inquiries: 100</p>
          <p>New Inquiries: 5</p>
          <p>Inquiries Resolved: 80</p>
       </div>
       <div class="dashboard-card">
          <h3>Website Analytics</h3>
          <hr>
          <p>Total Visitors: 10,000</p>
          <p>New Visitors: 1,000</p>
          <p>Page Views: 50,000</p>
       </div>
    </div>`;
}

let dashboradBtn = document.querySelector("#dashboard-btn");
dashboradBtn.addEventListener("click", () => {
   welcome();
});




//------------------------- Products Page-----------------------------

let productBtn = document.querySelector("#products-btn");
productBtn.addEventListener("click", () => {
   fetchData("mac");
});

// Remove
function remove(id) {
   dashboard.innerHTML = "";
   var otp = Math.floor(1000 + Math.random() * 9000);
   dashboard.innerHTML = `
   <div class="removePage">
         <h1>Enter OTP</h1>
         <span>OTP: ${otp}</span>
         <input type="number" placeholder="Enter OTP here" id="enteredOtp">
         <input type="submit" id="submitOtp">
      </div>`;

   let submitOtp = document.querySelector("#submitOtp");
   let enteredOtp = document.querySelector("#enteredOtp");
   submitOtp.addEventListener("click", () => {
      if (enteredOtp.value != otp) {
         alert("Wrong OTP");
      } else {
         //delete request
         fetch(`https://myapple-api-json-server.onrender.com/${currProduct}/${id}`, {
            method: "DELETE"
         });
         fetchData("mac");
      }
   })
}
// edit
function edit(id, title, price, image) {
   dashboard.innerHTML = "";
   dashboard.innerHTML = `
   <div class="updateNewProduct">
   <h1>Edit Product</h1>
   <label for="update-product-id">Id</label>
   <input type="number" id="update-product-id" placeholder="Id" value="${id}"/>
   <label for="update-product-type">Type</label>
   <input type="text" id="update-product-type" placeholder="Product Type" value="${currProduct}"/>
   <label for="update-product-title">Title</label>
   <input type="text" id="update-product-title" placeholder="Title" value="${title}"/>
   <label for="update-product-price">Price</label>
   <input type="number" id="update-product-price" placeholder="Price" value="${price}"/>
   <label for="update-product-img">Image URL</label>
   <input type="text" id="update-product-img" placeholder="Image URL" value="${image}"/>
   <button id="update-product">
      Submit
   </button>
</div>`;

   let updateProductSubmitBtn = document.querySelector("#update-product");
   let updateId = document.querySelector("#update-product-id");
   let updateType = document.querySelector("#update-product-type");
   let updateTitle = document.querySelector("#update-product-title");
   let updatePrice = document.querySelector("#update-product-price");
   let updateImg = document.querySelector("#update-product-img");
   updateProductSubmitBtn.addEventListener("click", (el) => {
      let obj = {
         "id": updateId.value,
         "title": updateTitle.value,
         "price": updatePrice.value,
         "image": updateImg.value
      }
      fetch(`https://myapple-api-json-server.onrender.com/${updateType.value}/${updateId.value}`, {
         method: "PUT",
         headers: {
            "Content-type": "application/json"
         },
         body: JSON.stringify(obj)
      })
      alert("Product Updated Successfully!")
   });
}


// Display product
function Display(data) {
   dashboard.innerHTML = "";

   let filterDiv = document.createElement("div");
   filterDiv.setAttribute("class", "filter");

   filterDiv.innerHTML = `<div class="filter">
   <select id="fiter-by-product">
      <option value="">Select Category</option>
      <option value="iphone">iphone</option>
      <option value="mac">mac</option>
      <option value="ipad">ipad</option>
      <option value="accessories">accessories</option>
   </select>
   <select id="sort-by-price">
      <option value="">Sort by Price</option>
      <option value="lth">Low to High</option>
      <option value="htl">High to Low</option>
   </select>
</div>`;

   let productDiv = document.createElement("div");
   productDiv.setAttribute("class", "products");
   data.forEach((el) => {
      productDiv.innerHTML += `
      <div class="card">
      <img
         src="${el.image}"
         alt="">
      <h1>${el.title}</h1>
      <h2>₹ ${el.price}</h2>
      <button id="removeBtn" onclick="remove(${el.id})">Remove</button>
      <button id="editBtn" onclick="edit('${el.id}','${el.title}','${el.price}','${el.image}')" >Edit</button>
   </div>`
   });
   dashboard.append(filterDiv, productDiv);


   // filter && sort
   let filter = document.getElementById("fiter-by-product");
   filter.addEventListener("change", () => {
      if (filter.value == "mac") {
         fetchData("mac");
      } else if (filter.value == "iphone") {
         fetchData("iphone");
      } else if (filter.value == "ipad") {
         fetchData("ipad");
      } else if (filter.value == "accessories") {
         fetchData("accessories");
      }
   });
   let sort = document.getElementById("sort-by-price");
   sort.addEventListener("change", () => {
      if (sort.value == "lth") {
         let sortedData = data
         sortedData = sortedData.sort((a, b) => a.price - b.price);
         Display(sortedData);
      } else if (sort.value == "htl") {
         let sortedData = data
         sortedData = sortedData.sort((a, b) => b.price - a.price);
         Display(sortedData);
      }
   });
}


// ---------------------Add new Product Page------------------------

let addNewProductBtn = document.querySelector("#add-product-btn");
addNewProductBtn.addEventListener("click", () => {
   dashboard.innerHTML = "";
   dashboard.innerHTML = `
   <div class="addNewProduct">
         <h1>Add New Product</h1>
         <input type="number" id="product-id" placeholder="Id" />
         <input type="text" id="product-type" placeholder="Product Type" />
         <input type="text" id="product-title" placeholder="Title" />
         <input type="number" id="product-price" placeholder="Price" />
         <input type="text" id="product-img" placeholder="Image URL" />
         <button id="add-product">
            Add Product
         </button>
      </div> `

   // form submit
   let addNewProductSubmitBtn = document.querySelector("#add-product");
   let newId = document.querySelector("#product-id");
   let newType = document.querySelector("#product-type");
   let newTitle = document.querySelector("#product-title");
   let newPrice = document.querySelector("#product-price");
   let newImg = document.querySelector("#product-img");
   addNewProductSubmitBtn.addEventListener("click", async () => {
      try {
         let res = await fetch(`https://myapple-api-json-server.onrender.com/${newType.value}`);
         let Alldata = await res.json();
         AddProfun(Alldata);
      } catch (error) {
         console.log(error);
      }
   })

   function AddProfun(data) {
      let flag = true;
      for (let i = 0; i < data.length; i++) {
         if (data[i].id == newId.value) {
            flag = false;
         }
      }

      if (flag == false) {
         alert("ID already exists!")
      } else {
         let obj = {
            "id": newId.value,
            "title": newTitle.value,
            "price": newPrice.value,
            "image": newImg.value
         }
         fetch(`https://myapple-api-json-server.onrender.com/${newType.value}`, {
            method: "POST",
            headers: {
               "Content-type": "application/json"
            },
            body: JSON.stringify(obj)
         })
         alert("Product Added Successfully!")
      }
   }
})




// Sign In

let user = JSON.parse(localStorage.getItem("admin-user")) || [];

displayCredentials(user)
function displayCredentials(user) {
   let displayName = document.querySelector("#profile>h2");
   let displayImg = document.querySelector("#profile>img");
   displayName.innerText = user[0].name;
   displayImg.src = user[0].image;
}


// Log Out
let logOutBtn = document.querySelector("#log-out-btn");
logOutBtn.addEventListener("click", () => {
   localStorage.setItem("admin-user", "[]")
   alert("Log Out Successful!");
   window.location.href = 'admin_signup_login.html';
})