// ------------sliding code------------///
const RsignUpButton = document.getElementById('signUp');
const RsignInButton = document.getElementById('signIn');
const container = document.getElementById('container');
RsignUpButton.addEventListener('click', () => container.classList.add('right-panel-active'));
RsignInButton.addEventListener('click', () => container.classList.remove('right-panel-active'));

// ----------SIGN-UP-INPUT------------- //
let signupnameInp = document.getElementById("sign-up-name");
let signupemailInp = document.getElementById("sign-up-email");
let signuppasswordInp = document.getElementById("sign-up-password");
let signupKeyInp = document.getElementById("sign-up-key");
let signupImageUrlInp = document.getElementById("sign-up-image-url");
let signupbtn = document.getElementById("sign-up-button");

// ----------SIGN-IN-INPUT------------- //
let signinemailInp = document.getElementById("sign-in-email");
let signinpasswordInp = document.getElementById("sign-in-password");
let signinbtn = document.getElementById("sign-in-button");

signupbtn.addEventListener("click", () => {
   if(signupKeyInp.value!="ace@123"){
     alert("Enter correct Key for signup");
   }else if (signinemailInp.value !== "" || signupemailInp.value !== "" || signuppasswordInp.value !== ""){
        let obj = {
            name: signupnameInp.value,
            email: signupemailInp.value,
            password: signuppasswordInp.value,
            image: signupImageUrlInp.value
        }
        if (obj.image == "") {
            obj.image = "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png";
        }
        fetch(`http://localhost:3000/admin`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(obj)
        })
    }
})

signinbtn.addEventListener("click", async () => {
    try {
        let res = await fetch(`http://localhost:3000/admin`);
        let data = await res.json();
        let credentials = checkLogIn(data);
        fun(credentials, data);
    } catch (error) {
        console.log(error);
    }
})


function checkLogIn(data) {
    for (let i = 0; i < data.length; i++) {
        if (signinemailInp.value == data[i].email && signinpasswordInp.value == data[i].password) {
            return true;
        }
    }
    return false;
}


function fun(credentials, data) {
    if (credentials) {
        alert("Sign In Successful!");
        let user = JSON.parse(localStorage.getItem("admin-user")) || [];
        let curr = {};
        for (let i = 0; i < data.length; i++) {
            if (signinemailInp.value == data[i].email) {
                curr.name = data[i].name;
                curr.image = data[i].image;
                break;
            }
        }
        user.push(curr);
        localStorage.setItem("admin-user", JSON.stringify(user));
        window.location.href = "admin.html"
    } else if (!credentials && signinemailInp.value!="" || signinpasswordInp.value!=""){
        alert("Wrong Credentials");
    }
}