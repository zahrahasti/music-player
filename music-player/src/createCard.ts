
import { loadImage } from "./loadImage";
export function cardDetail(container:HTMLElement,template:HTMLTemplateElement,data:dataMusic[]):void{
    data.map((d,i)=>{
        const card = template!.content.cloneNode(true)?.children[0] as HTMLDivElement; 
        const title=card.querySelector("[data-title]") as HTMLParagraphElement;
        const artist=card.querySelector("[data-artist]") as HTMLParagraphElement;
        const image=card.querySelector("[data-image]") as HTMLImageElement;
        const duration=card.querySelector("[data-duration]") as HTMLParagraphElement;

        card?.setAttribute("data-index",`${i}`);
        card?.setAttribute("data-url",d.url);
        title.textContent=d.title;
        artist.textContent=d.artist;
        // duration.textContent=`${Math.floor(+duration / 60)}: ${Math.floor(+duration % 60)}`;
        let imageDetail:[string,HTMLImageElement]=[d.artwork,image];
        loadImage(...imageDetail);
        container.appendChild(card);
})}
