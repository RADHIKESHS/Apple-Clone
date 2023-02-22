

var movieImages = [
    "https://is3-ssl.mzstatic.com/image/thumb/UrWlq3f7s-X-C69nlCXIZw/1679x945sr.webp",
    "https://is3-ssl.mzstatic.com/image/thumb/wu6bl_EDpI5bOnLWSN0mRQ/1679x945sr.webp",
    "https://is5-ssl.mzstatic.com/image/thumb/nc6_OLkCV3TgiHCklTQbMg/1679x945sr.webp"
]


function slideshowFun(images){
    let mdiv=document.getElementById("slideshow");
    let count=0;
    setInterval(()=>{
      mdiv.innerHTML="";
      if(count==images.length){
        count=0;
      }
      let im=document.createElement("img");
      im.setAttribute("src", images[count]);
      mdiv.append(im);
      count++;
   },3000);

}

slideshowFun(movieImages)