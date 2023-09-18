
import { loadImage } from "./loadImage";
export function cardDetail(container:HTMLElement,template:HTMLTemplateElement,data:dataMusic[]):void{
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
