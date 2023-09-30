

"use strict";
 
import { renderSearchData } from "./renderSeachData";
import { updatTime } from "./updateTime";
import {createChart} from "./chart";
 import {renderTopCard,renderMusicPage,renderMusicCardDetails,renderRadioCard} from "./renderCard"
 const dataPlay=document.querySelector("[data-play]") as HTMLElement;
 const btnPlay=document.querySelector("[data-btn-play]") as HTMLElement;
 export const audio=document.querySelector("audio") as HTMLAudioElement;
 const range=document.querySelector(".range") as HTMLInputElement;
 export const slider=document.querySelector(".slider") as HTMLElement;
 const buttonsControl=[...document.querySelectorAll("[data-btn]")] as HTMLButtonElement[];
 const audioDuration=document.querySelector("[ data-aduio-duraion]") as HTMLSpanElement;

  

 const toggleMenu=document.querySelector(".toggle-menu") as HTMLButtonElement;
 createChart()

 
export interface Music {
    artist: string;
    title: string;
}

 export let musics:Music[]=[];
 
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
    renderMusicCardDetails(data)
    renderRadioCard(data)
    const cards =[...document.querySelectorAll("[data-music]")] as HTMLElement[];
    playMusic(cards)
}
 

 fetchData("./data/music.json");
 

 
let currentMusicIndex: number | undefined;

function playMusic(musicEl:HTMLElement[]):void{
    musicEl.forEach((el,i)=>{
 
        el.addEventListener("click",e=>{
            e.preventDefault();
             const containerPlaying=document.querySelector(".container-play-music") as HTMLElement;
             containerPlaying.classList.remove("translate-y-full")
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
            audio.addEventListener("loadeddata",function(){
              console.log();
              audioDuration.textContent=`${Math.floor(audio.duration/60).toString().padStart(2, '0')}:${Math.floor(audio.duration % 60).toString().padStart(2, '0')}`
            })

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

audio.addEventListener("timeupdate",function(){
  updatTime.call(this,range,slider)
})
range.addEventListener("input",()=>setCurrentTime())
range.addEventListener("change",()=>setCurrentTime())
function setCurrentTime(){
    
    if(audio.src!==undefined) {
      audio.currentTime=audio.duration * (+range.value / 100);
      }
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
 
 
 
const audioVolum=document.querySelector(".volum") as HTMLInputElement;
const sliderVolum=document.querySelector(".slider-volum") as HTMLDivElement
audioVolum.addEventListener("input",function(){
  sliderVolum.style.width=this.value + "%";
  audio.volume=Number(this.value) / 100
})