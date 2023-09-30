
import { Music } from "./main";
export function renderSearchData(musics:Music[],value:string){

    musics.map(music=>{
        const isVisible=music.title.includes(value) ||music.artist.includes(value);
        console.log(isVisible);
        console.log(isVisible);
    })
}
 