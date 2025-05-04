MenuYpos = 575;
buttons = {
    "About":{"drawFunction":AboutMeContent,"selectorYPos":MenuYpos-125, "SelectorXLength":420},
    "Work":{"drawFunction":WorkContent,"selectorYPos":MenuYpos+80, "SelectorXLength":330},
    "Projects":{"drawFunction":ProjectContent,"selectorYPos":MenuYpos+280, "SelectorXLength":620},
}
buttonSelector = ["About","Work","Projects"];
SelectorState = buttonSelector.length;
ButtonTarget = "About"
selBoxYPos = 0;
selBoxXLen = 0;

lerpTransitionTime = 0.3;
LerpStartTime = 0;
lerping = false;

let images = [new Image(), new Image(), new Image(), new Image(), new Image()]
images[0].src = "./src/Images/headshot3.png";
images[1].src = "./src/Images/timeline.png";
images[2].src = "./src/Images/Aberrate.png";
images[3].src = "./src/Images/TerminalVelocity.png";
images[4].src = "./src/Images/GardenGameJam.png";

function lerp(A, B, cur, dur) {
    return A + (B - A) * Math.min(cur / dur, 1);;
}

function LerpSelector()
{
    // check if selection box needs to move
    if(selBoxYPos!=buttons[ButtonTarget].selectorYPos || selBoxXLen!=buttons[ButtonTarget].SelectorXLength)
    {
        if(!lerping)
        {
            // start lerping and set the start reference time
            lerping = true;
            LerpStartTime = time;
        }

        selBoxYPos = lerp(selBoxYPos,buttons[ButtonTarget].selectorYPos,time-LerpStartTime,lerpTransitionTime)
        selBoxXLen = lerp(selBoxXLen,buttons[ButtonTarget].SelectorXLength,time-LerpStartTime,lerpTransitionTime)

        if(time-LerpStartTime>=lerpTransitionTime)
        {
            lerping = false;
            selBoxYPos = buttons[ButtonTarget].selectorYPos;
            selBoxXLen = buttons[ButtonTarget].SelectorXLength;
        }
    }
    // draw selection box
    ctx.fillStyle = screenComplement.toHexString();
    ctx.fillRect(220,selBoxYPos,selBoxXLen,150)
}
function AboutMeContent()
{
    ctx.strokeStyle = screenComplement.toHexString();
    ctx.fillStyle = screenComplement.toHexString();
    ctx.beginPath();
    ctx.arc(1585, 500, 310, 0, 2 * Math.PI);
    ctx.lineWidth = 20;
    ctx.stroke();
    if(ctx.drawImage)
        ctx.drawImage(images[0], 1285, 200, 600, 600);

    ctx.fillRect(1120,860,900,330)
    ctx.fillStyle = screenColor.toHexString();
    ctx.fillRect(1580,900,10,260)
    
    ctx.fillStyle = "#000000"
    ctx.font = "75px monospace";
    ctx.fillText(`Game`,1260,1000)      // HTML5 canvas filltext doesnt accept line breaks :(
    ctx.fillText(`Developer`,1160,1090)
    ctx.fillText(`Cyber`,1690,950)      
    ctx.fillText(`Security`,1640,1040)      
    ctx.fillText(`Analyst`,1665,1130)
}

function WorkContent()
{
    // background boxes
    ctx.fillStyle = screenComplement.toHexString();
    ctx.fillRect(880,180,950,225)
    ctx.fillRect(880,480,660,225)
    ctx.fillRect(880,780,660,225)
    ctx.fillRect(880,1080,900,90)

    ctx.fillRect(2010,200,350,90)
    ctx.fillRect(2010,490,385,90)
    ctx.fillRect(2010,780,385,90)
    ctx.fillRect(2010,1080,350,90)

    // timeline image
    if(ctx.drawImage)
        ctx.drawImage(images[1], 1910, 200, 87, 1070);

    //titles
    ctx.fillStyle = "#000000"
    ctx.font = "bold 75px monospace";

    ctx.fillText(`Macquarie University`,900,260)
    ctx.fillText(`Jan 2021`,2010,265)

    ctx.fillText(`Zylax Computers`,900,560)
    ctx.fillText(`2021-2022`,2010,560)

    ctx.fillText(`Conn3cted`,900,850)
    ctx.fillText(`2022-2024`,2010,850)

    ctx.fillText(`University completion`,900,1145)
    ctx.fillText(`Dec 2025`,2020,1145)


    // subtitles
    ctx.font = "bold 45px monospace";

    ctx.fillText(`Bachelor of Cybersecurity`,900,320)
    ctx.fillText(`Bachelor of game design & development`,900,370)

    ctx.fillText(`Repair Technician`,900,620)

    ctx.fillText(`Security Analyst / Tester`,900,910)
}

function ProjectContent()
{
    imgBoxX = 900;
    // background box
    ctx.fillStyle = screenComplement.toHexString();
    ctx.fillRect(ArcadeScreenWidth-imgBoxX,0,1120,ArcadeScreenHeight)

    if(ctx.drawImage) {
        ctx.drawImage(images[2], ArcadeScreenWidth-imgBoxX+20, 60, 747, 420);
        ctx.drawImage(images[3], ArcadeScreenWidth-imgBoxX+20, 500, 747, 420);
        ctx.drawImage(images[4], ArcadeScreenWidth-imgBoxX+20, 940, 747, 420);
    }

    // background boxes
    ctx.fillRect(880,180,570,110)
    ctx.fillRect(880,300,380,60)

    ctx.fillRect(880,580,750,110)
    ctx.fillRect(880,700,550,60)
    
    ctx.fillRect(880,980,600,110)
    ctx.fillRect(880,1100,480,60)

    ctx.fillStyle = "#000000"
    ctx.font = "bold 75px monospace";
    ctx.fillText(`Aberrate Inc.`,900,260)
    ctx.fillText(`Terminal Velocity`,900,660)
    ctx.fillText(`Garden Rush`,900,1060)

    ctx.fillStyle = "#000000"
    ctx.font = "bold 45px monospace";
    ctx.fillText(`Upcoming, 2025`,900,345)
    ctx.fillText(`"Re-Entry" Jam, 2024`,900,745)
    ctx.fillText(`"Revive" Jame 2023`,900,1145)
}

