interface TopMusic {
    artist: string;
    title: string;
}
interface CardMusic extends TopMusic{
    artwork:string,
    url:string,
    likes:string
}
interface CardDetail extends CardMusic{
    duration:string
}
import { cardDetail } from './createCard';
import { scrollerInner } from "./animatedScroll";
import { addAnimation } from './animatedScroll';
let musics:TopMusic[]=[];
const cardTopTemplate=<HTMLTemplateElement>document.querySelector("[data-card-top-template]");
const musicCardTemplate=<HTMLTemplateElement>document.querySelector("[data-card-music]");
const containerTopChart=document.querySelector(".container-top-chart") as HTMLElement;
const containerMusicPlayer=document.querySelector(".container-music") as HTMLElement;
const contaierCardDetail=document.querySelector(".container-card-details") as HTMLElement;
const cardDetailTemplate=document.querySelector("[data-card-detail]") as HTMLTemplateElement;
 const cardRadioTemplate=document.querySelector("[data-card-radio-template]") as HTMLTemplateElement;
export function renderTopCard(data:CardMusic[]| null){
    if(data!==null){
       
        musics=data.map(d=>{
            return {title:d.title.toLocaleLowerCase(),artist:d.artist.toLocaleLowerCase()};
        })
        let topDataCard:CardMusic[] =data.sort((a,b)=>Number(b.likes)- Number(a.likes));
        let sliceTop=topDataCard.slice(0,3);
        cardDetail(containerTopChart,cardTopTemplate,sliceTop)
}}

export function renderMusicPage(data:CardMusic[]| null):void{
    if(data!==null){
       cardDetail(containerMusicPlayer,musicCardTemplate,data);
    }
}
export function renderMusicCardDetails(data:CardDetail[]| null):void{
    if(data!==null){
       cardDetail(contaierCardDetail,cardDetailTemplate,data);
    }
}

export function renderRadioCard(data:TopMusic[]| null):void{
    if(data!==null){
        cardDetail(scrollerInner,cardRadioTemplate,data);
        addAnimation()
     }
}