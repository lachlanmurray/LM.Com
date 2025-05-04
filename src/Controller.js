// get down keyboard inputs
document.addEventListener("keydown", (event) => { 
    if(controlHints)
    {
        controlHints = false;
        var element = document.getElementById("controlHint");
        element.classList.add("hidden");
    }
    if (event.key === " " || event.key === "w" || event.key === "ArrowUp" ) {
        SelectorState-=1
    } else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
        SelectorState-=1
    } else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
        SelectorState+=1
    } else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
        SelectorState+=1
    }
    if(SelectorState<=0)
        SelectorState = buttonSelector.length
    ButtonTarget = buttonSelector[SelectorState%buttonSelector.length]

});

// get scrollwheel events
document.addEventListener("wheel", (event) => {
    if(controlHints)
    {
        controlHints = false;
        var element = document.getElementById("controlHint");
        element.classList.add("hidden");
    }
    console.log(event.deltaY)
    if(event.deltaY>0) {
        SelectorState+=1;
    }
    else {
        SelectorState-=1;
    }
    if(SelectorState<=0)
        SelectorState = buttonSelector.length
    ButtonTarget = buttonSelector[SelectorState%buttonSelector.length]
});
window.onclick = function(event){
    if(event.clientX >= 778 && event.clientX <= 954 && event.clientY >= 508 && event.clientY <= 571)
        SelectorState = 0;
    if(event.clientX >= 778 && event.clientX <= 918 && event.clientY >= 600 && event.clientY <= 668)
        SelectorState = 1;
    if(event.clientX >= 785 && event.clientX <= 1056 && event.clientY >= 688 && event.clientY <= 759)
        SelectorState = 2;
    if(SelectorState<=0)
        SelectorState = buttonSelector.length
    ButtonTarget = buttonSelector[SelectorState%buttonSelector.length]
}