
const currentTimeAduio=document.querySelector("[data-aduio-timer]") as HTMLSpanElement;
export function convertTime(audio:HTMLAudioElement){
    currentTimeAduio.textContent=`${Math.floor(audio.currentTime/60).toString().padStart(2, '0')}:${Math.floor(audio.currentTime % 60).toString().padStart(2, '0')}`;
}