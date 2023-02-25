//----------------------------fetch----------------------------
let currProduct = "";
async function fetchData(product = "iphone") {
   currProduct = product;
   try {
      let res = await fetch(`http://localhost:3000/${product}`);
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
         fetch(`http://localhost:3000/${currProduct}/${id}`, {
            method: "DELETE"
         });
         fetchData("mac");
      }
   })
}
// edit
function edit(id) {
   dashboard.innerHTML = "";
   dashboard.innerHTML = `
   <div class="updateNewProduct">
   <h1>Edit Product</h1>
   <input type="number" id="update-product-id" placeholder="Id" />
   <input type="text" id="update-product-type" placeholder="Product Type" />
   <input type="text" id="update-product-title" placeholder="Title" />
   <input type="number" id="update-product-price" placeholder="Price" />
   <input type="tetx" id="update-product-img" placeholder="Image URL" />
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
      fetch(`http://localhost:3000/${updateType.value}/${updateId.value}`, {
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
      <button id="editBtn" onclick="edit(${el.id})">Edit</button>
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
         let res = await fetch(`http://localhost:3000/${newType.value}`);
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
         fetch(`http://localhost:3000/${newType.value}`, {
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



