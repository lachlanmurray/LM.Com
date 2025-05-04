ArcadeScreenWidth = 2560;
ArcadeScreenHeight = 1440;


// Create BabylonJS application for 3d elements
var canvas = document.getElementById("renderCanvas");

var controlHints = true;
var engine = null;
var scene = null;
var camera = null;
var sceneToRender = null;
var controlHints = true;
var time;
var camera = null;
var ScreenMesh = null;
var textureScreenContent = null;
var screenLight;
var mainLight;
var screenColor;
var screenComplement;
var time;
var ctx;
var isMobile = false;
var scan = 3;
var curve = 0.75;
var fisheye = 0.3
window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};
windowSizeModifiers()
if(!isMobile)
    var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };

function DrawArcadeScreen(){
    // clear to pre-made gradient to save on processing
    ctx.drawImage(ctx.clearCanvas, 0,0);

    // update the selector lerp
    LerpSelector();
    ctx.fillStyle = "#000000"

    // draw button text
    ctx.font = "130px monospace";
    buttonSelector.forEach((label,i)=>{this.ctx.fillText(label,250,MenuYpos+200*i)})

    // call the function that draws content for whatever button we have selected
    buttons[ButtonTarget].drawFunction()

    //ctx.fillText(engine.getFps(),300,300)

    // TODO: proper mobile support
    //if(isMobile)
    //{
    //    ctx.fillStyle = screenComplement.toHexString();
    //    ctx.fillRect(230,190,740,300)
    //    ctx.fillStyle = "#000000"
    //    ctx.font = "bold 130px monospace";
    //    ctx.fillText("Lachlan",250,300)
    //    ctx.fillText("Murray",450,450)
    //    MenuYpos = 750
    //    scan = 0.5;
    //    curve = 0.6;
    //    fisheye = 0.22;
    //}

    // Final update
    textureScreenContent.update();
    // configure the CRT shader to apply to the current frame of the arcade machine
    var shaderPath = {vertex: "CRT", fragment: "CRT"};
    let customMaterial = new BABYLON.ShaderMaterial("custom", scene, shaderPath, {
        attributes: ["position", "normal", "uv"],
        uniforms: ["worldViewProjection", "textureSampler", "curve", "scan", "fisheye"]
    });
    // set shader uniforms
    customMaterial.setFloat("curve",curve);
    customMaterial.setFloat("scan",scan*Math.cos(time));
    customMaterial.setFloat("fisheye",fisheye);
    customMaterial.setTexture("textureSampler", textureScreenContent);

    mat = new BABYLON.StandardMaterial()
    mat.diffuseTexture = textureScreenContent;

    // set material to the final rendered CRT screen
    ScreenMesh.material = customMaterial;
}

function changeColor (value) 
{
    screenColor = value;
    console.log(screenColor)
}

function randomColour()
{
    colors = [0,0,0]                                                        // create a randomly generated (saturated only) colour
    n = Math.floor(Math.random()*3)
    colors[n] = 0.5
    colors[(n+Math.floor(Math.random()*2)+1)%3] = Math.random()
    screenColor = new BABYLON.Color3(colors[0],colors[1],colors[2]);        // the screen background and glow lighting share the same colour
    screenComplement = new BABYLON.Color3(1 - screenColor.r, 1 - screenColor.g, 1 - screenColor.b);
    screenLight.diffuse = screenColor;
}

var createScene = function (engine, canvas) {

    scene = new BABYLON.Scene(engine);                                                      // create the scene reference
    scene.clearColor = new BABYLON.Color3(0.1,0.1,0.1);                                     // clear the screen with dark grey

    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);      // create camera and point it at origin
    camera.setTarget(BABYLON.Vector3.Zero());                                               // set camera target to scene origin
    
    windowSizeModifiers();
    
    // create a dynamic texture to hold the virtual arcade machine
    textureScreenContent = new BABYLON.DynamicTexture("dynamic texture", {width:ArcadeScreenWidth,height:ArcadeScreenHeight}, scene);
    ctx = textureScreenContent.getContext();
    
    mainLight = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0.5, 1, 0.5), scene);             // creating a main "sun" light
    mainLight.intensity = 0.5;
    screenLight = new BABYLON.HemisphericLight("screenLight", new BABYLON.Vector3(0,-0.5,1), scene);        // this directional light simulates screen glow
    

    screenColor = new BABYLON.Color3(0,0.2,1);                                                              // Set a nice colour the first time its loaded
    screenComplement = new BABYLON.Color3(1 - screenColor.r, 1 - screenColor.g, 1 - screenColor.b);
    
        
    if(document.cookie === "NotFirstLoad")
        randomColour()                                                                                       // set a random screen and light each time you load the page IF not first load

    document.cookie = "NotFirstLoad"


    var grd = ctx.createRadialGradient(ArcadeScreenWidth/2, ArcadeScreenHeight/2, 1, ArcadeScreenWidth/2, ArcadeScreenHeight/2, 2000);      // create a gradient texture to mimic CRT
    grd.addColorStop(0, screenColor.toHexString());
    grd.addColorStop(1, "white");

    ctx.clearCanvas = document.createElement("canvas");                                                     // draw the gradient to an offscreen canvas once, saves almost 30fps in render loop
    ctx.clearCanvas.width = ArcadeScreenWidth;
    ctx.clearCanvas.height = ArcadeScreenHeight;
    ctx.clearCanvas.getContext("2d").fillStyle = grd;
    ctx.clearCanvas.getContext("2d").fillRect(0,0,ArcadeScreenWidth,ArcadeScreenHeight)

    var glassMtl = new BABYLON.PBRMaterial("glassMtl", scene);                                              // setup a glass material.
    glassMtl.metallic = 0;
    glassMtl.transparencyMode = BABYLON.PBRMaterial.MATERIAL_ALPHABLEND;
    glassMtl.alpha = 0.05;
    glassMtl.roughness = 0.1;
    glassMtl.subSurface.isRefractionEnabled = true;

    BABYLON.ImportMeshAsync("./src/Models/arcade.glb", scene).then(function({meshes}){                      // import the arcade machine model and pick specific submeshes for later use.
        meshes[0].scaling = new BABYLON.Vector3(0.9,0.9,0.9);
        for(i in meshes)
        {
            if(meshes[i].name == "Glass")           // the screen should have glass infront
            {
                meshes[i].material = glassMtl
            }
            else if(meshes[i].name == "Screen")     // the screen submesh is needed in the main render loop
            {
                ScreenMesh = meshes[i];                                
            }
            else if(meshes[i].name == "Name")       // my name should use the emissive material
            {
                var EmissionMat = new BABYLON.PBRMaterial("nameMtl", scene);
                EmissionMat.emissiveColor = new BABYLON.Color3(1,1,1);
                EmissionMat.emissiveIntensity=3;
                meshes[i].material = EmissionMat;
            }
        }
    });

    let previousMousePosition = { x: 0, y: 0 };
    canvas.addEventListener('mousemove', function (event) {                                             // Event listener for mouse movement to rotate camera
        // Update the camera's rotation based on mouse movement
        camera.rotation.y += (event.clientX - previousMousePosition.x) * 0.00001;
        camera.rotation.x += (event.clientY - previousMousePosition.y) * 0.00001;

        // Update the previous mouse position
        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;    
    });

    return scene;
};

function windowSizeModifiers() {
    if(window.innerHeight<720){
        console.log("1")
        scan = 0;
    }
    else{
        console.log("2")
        scan = 3;
    }
    isMobile = window.mobileCheck()
    if(isMobile)
        {
            scan = 0.5;
            document.getElementById('controlHint').style.visibility = "hidden";
            document.getElementById('ProfileLinks').classList.remove("RightProfileLinks")
            document.getElementById('ProfileLinks').classList.add("MobileLinks")
            document.getElementById('Fail').classList.remove("Desktop")
            document.getElementById('Fail').classList.add("MobileContent")
            document.getElementById('FailContent').classList.remove("Desktop")
        }

    if(camera && isMobile && window.innerWidth > window.innerHeight) {
        camera.position = new BABYLON.Vector3(0,3.5,-7.3);
    } else if(camera && isMobile && window.innerWidth < window.innerHeight) {
        camera.position = new BABYLON.Vector3(0,6,-18);
    }
}

var startRenderLoop = function (engine) {                                                       // main render loop
    const startTime = new Date();
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera && ScreenMesh) {
            const endTime = new Date();
            time = (endTime - startTime) / 1000.0; // in s
            DrawArcadeScreen()
            sceneToRender.render();
            engine.wipeCaches(true);
        }
    });
}
window.initFunction = async function() {
    if(!isMobile){
        var asyncEngineCreation = async function() {
            try {
                return createDefaultEngine();
            } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
            }
        }

        window.engine = await asyncEngineCreation();
        
        const engineOptions = window.engine.getCreationOptions?.();
        if (!engineOptions || engineOptions.audioEngine !== false) {
            
        }

        if (!engine) throw 'engine should not be null.';

        startRenderLoop(engine);
        window.scene = createScene(engine,canvas);
    }
};

initFunction().then(() => {sceneToRender = scene});

window.addEventListener("resize", function () {
    windowSizeModifiers();
    engine.resize();
});