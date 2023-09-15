

"use strict";
 const cardTopTemplate=<HTMLTemplateElement>document.querySelector("[data-card-top-template]");
 const musicCardTemplate=<HTMLTemplateElement>document.querySelector("[data-card-music]");
 const containerTopChart=document.querySelector(".container-top-chart") as HTMLElement;
 const containerMusicPlayer=document.querySelector(".container-music") as HTMLElement;
 const dataPlay=document.querySelector("[data-play]") as HTMLElement;
 const btnPlay=document.querySelector("[data-btn-play]") as HTMLElement;
 const audio=document.querySelector("audio") as HTMLAudioElement;
 const range=document.querySelector(".range") as HTMLInputElement;
 const slider=document.querySelector(".slider") as HTMLElement;
 const buttonsControl=[...document.querySelectorAll("[data-btn]")] as HTMLButtonElement[];
 const toggleMenu=document.querySelector(".toggle-menu") as HTMLButtonElement;

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
// const ListSearch=
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

    const cards =[...document.querySelectorAll("[data-music]")] as HTMLElement[];
    playMusic(cards)
    
   
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
 


function renderMusicPage(data:dataMusic[]| null):void{
    if(data!==null){
       cardDetail(containerMusicPlayer,musicCardTemplate,data);
    }
}

 



 
let currentMusicIndex: number | undefined;

function playMusic(musicEl:HTMLElement[]):void{
    musicEl.forEach((el,i)=>{
 
        el.addEventListener("click",e=>{
            e.preventDefault();
            const titleAduio=document.querySelector(".container-play-music [data-title]") as HTMLParagraphElement ; 
            const artistAduio=document.querySelector(".container-play-music [data-artist]") as  HTMLParagraphElement
 
             
 
            const imageAduio=document.querySelector(".container-play-music [data-image]") as  HTMLImageElement
            const title=el.querySelector("[data-title]")?.textContent;
            const artist=el.querySelector("[data-artist]")?.textContent;
            const image=el.querySelector("[data-image]") as HTMLImageElement

            titleAduio.textContent=`${title}`;
            artistAduio.textContent=`${artist}`;
            imageAduio.src=image.src
 
            audio.src=`${el.dataset.url}`;
            audio.play()
            dataPlay.setAttribute("href","./icon/icon.svg#pause")
            btnPlay.setAttribute("data-playing",`${true}`);
 
            currentMusicIndex=i;
 
        })
    })
}
btnPlay.addEventListener("click",function(){
   if(btnPlay.dataset.playing==="true"){
     audio.pause();
     btnPlay.setAttribute("data-playing",`${false}`);
     dataPlay.setAttribute("href","./icon/icon.svg#play")
   }else{
    audio.play()
    btnPlay.dataset.playing=`${false}`
    btnPlay.setAttribute("data-playing",`${true}`);
    dataPlay.setAttribute("href","./icon/icon.svg#pause")
 }

console.log(dataPlay.dataset.playing);
})

 
//todo   btn controls   
buttonsControl.forEach(btn=>{
    btn.addEventListener("click",function(){
        slider.style.width=`0`;
        // audio.currentTime=0;
        audio.src="";
        range.value=`0`
        if(btn.dataset.btn==="next"){
            playNext()
            console.log("next");
        }else if(btn.dataset.btn==="prev"){
            playPrev()
            console.log("prev");
        }
    })
    
})
 
audio.addEventListener("ended",function(){
    audio.pause();
    btnPlay.setAttribute("data-playing",`${false}`);
    dataPlay.setAttribute("href","./icon/icon.svg#play")
})

audio.addEventListener("timeupdate",function(e:Event){
    range.value="";
    const currentTime=this.currentTime / this.duration;
    if(!isNaN(currentTime))
    range.value=`${currentTime*100}`;
    slider.style.width=`${currentTime*100}%`;
 })
range.addEventListener("input",()=>setCurrentTime())
range.addEventListener("change",()=>setCurrentTime())
function setCurrentTime(){
    
    if(audio.src!==undefined) {audio.currentTime=audio.duration * (+range.value / 100);}
    slider.style.width=`${range.value}%`;
}

function playNext() {
    const cards = document.querySelectorAll("[data-music]") as NodeList;
    const lastIndex = cards.length - 1;
  
    if (currentMusicIndex === undefined || currentMusicIndex >= lastIndex) {
      currentMusicIndex = 0;
    } else {
      currentMusicIndex++;
    }
  
    const nextCard = cards[currentMusicIndex] as HTMLElement;
    const titleAduio=document.querySelector(".container-play-music [data-title]") as HTMLParagraphElement ; 
    const artistAduio=document.querySelector(".container-play-music [data-artist]") as  HTMLParagraphElement
    const imageAduio=document.querySelector(".container-play-music [data-image]") as  HTMLImageElement
    const title=nextCard.querySelector("[data-title]")?.textContent;
    const artist=nextCard.querySelector("[data-artist]")?.textContent
    const image=nextCard.querySelector("[data-image]") as HTMLImageElement;
    const nextUrl = nextCard?.dataset?.url;
    
    if (nextUrl) {
       titleAduio.textContent=`${title}`
       artistAduio.textContent=`${artist}`;
       imageAduio.src=image.src;
      audio.src = nextUrl;
      audio.play();
    } else {
      console.error("Invalid URL");
    }
  }
  
  function playPrev() {
    const cards = document.querySelectorAll("[data-music]") as NodeList;
    const lastIndex = cards.length - 1;
    
    if (currentMusicIndex === undefined || currentMusicIndex <= 0) {
      currentMusicIndex = lastIndex;
    } else {
      currentMusicIndex--;
    }
    
    const prevCard = cards[currentMusicIndex] as HTMLElement;
    const prevUrl = prevCard?.dataset?.url;
    
    if (prevUrl) {
      audio.src = prevUrl;
      audio.play();
    } else {
      console.error("Invalid URL");
    }
  }
 

 




//toggle menu
toggleMenu.addEventListener("click",function(){ 
    const containerMenuList=document.querySelector(".container-list") as HTMLElement;
    containerMenuList.style.left="0%";
    containerMenuList.style.display="flex";
})
function cardDetail(container:HTMLElement,template:HTMLTemplateElement,data:dataMusic[]):void{
    data.map((d,i)=>{
        const card = template!.content.cloneNode(true)?.children[0] as HTMLDivElement; 
        // const urlMusic=card.querySelector("[data-music]");
        const title=card.querySelector("[data-title]") as HTMLParagraphElement;
        const artist=card.querySelector("[data-artist]") as HTMLParagraphElement;
        const image=card.querySelector("[data-image]") as HTMLImageElement;
        
        card?.setAttribute("data-index",`${i}`);
        card?.setAttribute("data-url",d.url);
        title.textContent=d.title;
        artist.textContent=d.artist;
        loadImage(d.artwork,image);
        container.appendChild(card);
})}

function loadImage(url:string,image:HTMLImageElement){
    image.addEventListener("load",()=>{
      image.src=url;
    })
    image.addEventListener("error",()=>{
     image.src="./bg-mobile.png";
     return new Error("Error to load image")
    })
  
 }

 
 import {test} from "./index"
 test()