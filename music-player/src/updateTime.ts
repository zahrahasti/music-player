import { convertTime } from "./convertTime";


export function updatTime(this:HTMLAudioElement,range:HTMLInputElement,slider:HTMLElement){
    range.value="";
    const currentTime = (this as HTMLAudioElement).currentTime / (this as HTMLAudioElement).duration;
    if(!isNaN(currentTime))
    range.value=`${currentTime*100}`;
    slider.style.width=`${currentTime*100}%`;
    convertTime(this)
  }