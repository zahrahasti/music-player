export function loadImage(url:string,image:HTMLImageElement){
    image.addEventListener("load",()=>{
      image.src=url;
    })
    image.addEventListener("error",()=>{
     image.src="./bg-mobile.png";
     return new Error("Error to load image")
    })
  
 }
