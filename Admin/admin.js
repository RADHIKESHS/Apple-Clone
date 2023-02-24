//----------------------------fetch----------------------------
async function fetchData(product = "iphone") {
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
      <button>Remove</button>
      <button>Edit</button>
   </div>`
   });
   dashboard.append(filterDiv, productDiv);


   // filter && sort
   let filter = document.getElementById("fiter-by-product");
   filter.addEventListener("change", () => {
      if(filter.value=="mac"){
         fetchData("mac");
      }else if(filter.value=="iphone"){
         fetchData("iphone");
      }else if(filter.value=="ipad"){
         fetchData("ipad");
      }else if(filter.value=="accessories"){
         fetchData("accessories");
      }
   });
   let sort = document.getElementById("sort-by-price");
   sort.addEventListener("change", () => {
      if(sort.value=="lth"){
         let sortedData=data
         sortedData=sortedData.sort((a,b)=> a.price-b.price);
         Display(sortedData);
      }else if(sort.value=="htl"){
         let sortedData=data
         sortedData=sortedData.sort((a,b)=> b.price-a.price);
         Display(sortedData);
      }
   });
}