"use strict";
 const cardTopTemplate=<HTMLTemplateElement>document.querySelector("[data-card-top-template]");
 const musicCardTemplate=<HTMLTemplateElement>document.querySelector("[data-card-music]");
 const containerTopChart=document.querySelector(".container-top-chart") as HTMLElement;
 const containerMusicPlayer=document.querySelector(".container-music") as HTMLElement
type MusicData=[
    {
     title:string,
     artist:string,
     artwork:string,
     url:string,
     likes:string
    }
]
type dataMusic={
    title:string,
    artist:string,
    artwork:string,
    url:string,
    likes:string
}
interface Music {
    artist: string;
    title: string;
}

interface MusicData2{
    title:string,
    artist:string,
    artwork:string,
    url:string,
    likes:string
}

let musics:Music[]=[];
 
const searchInput=<HTMLInputElement>document.querySelector(".search");
const ListSearch=
searchInput.addEventListener("input",(e:Event)=>{
     e.preventDefault();
    //  if (musics.every((music) => typeof music.title === "string" && typeof music.artist === "string")) {
       renderSearchData(musics,searchInput.value.toLocaleLowerCase());
    //   }
      
})

async function fetchData(url:string){
    const response=await fetch(url);
    const data=await response.json();
    renderTopCard(data);
    renderMusicPage(data)
   
}
 
function renderSearchData(musics:Music[],value:string){

    musics.map(music=>{
        const isVisible=music.title.includes(value) ||music.artist.includes(value);
        console.log(isVisible);
        console.log(isVisible);
    })
}
 
function renderTopCard(data:MusicData| null){
    if(data!==null){
       
        musics=data.map(d=>{
            return {title:d.title.toLocaleLowerCase(),artist:d.artist.toLocaleLowerCase()};
        })
        let topDataCard:MusicData =data.sort((a,b)=>Number(b.likes)- Number(a.likes));
        let sliceTop=topDataCard.slice(0,3);
        cardDetail(containerTopChart,cardTopTemplate,sliceTop)
    }}

// function render

 fetchData("./data/music.json");
 
 
function loadImage(url:string,image:HTMLImageElement){
   image.addEventListener("load",()=>{
     image.src=url;
   })
   image.addEventListener("error",()=>{
    image.src="./bg-mobile.png";
    return new Error("Error to load image")
   })
}

function renderMusicPage(data:dataMusic[]| null){
    if(data!==null){
       cardDetail(containerMusicPlayer,musicCardTemplate,data);
    }
}



function cardDetail(container:HTMLElement,template:HTMLTemplateElement,data:dataMusic[]){
    data.map(d=>{
        const card = template!.content.cloneNode(true)?.children[0] as HTMLDivElement; 
        const title=card.querySelector("[data-title]") as HTMLParagraphElement;
        const artist=card.querySelector("[data-artist]") as HTMLParagraphElement;
        const image=card.querySelector("[data-image]") as HTMLImageElement;
        
        title.textContent=d.title;
        artist.textContent=d.artist;
        loadImage(d.artwork,image);
        container.appendChild(card);
    })
}
