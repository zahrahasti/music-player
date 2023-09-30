

const scroller = document.querySelector(".scroller") as HTMLElement;
export const scrollerInner = scroller.querySelector(".scroller__inner") as HTMLElement;

// If a user hasn't opted in for recuded motion, then we add the animation

export function addAnimation() {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        scroller.setAttribute("data-animated", `true`);
    
        // Make an array from the elements within `.scroller-inner`
        const scrollerContent = Array.from(scrollerInner.children);
       console.log(scrollerContent);
        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute("aria-hidden", `true`);
          scrollerInner.appendChild(duplicatedItem);
        });
    }
    
   
   
}
