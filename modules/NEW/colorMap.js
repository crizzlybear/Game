let rgb = { r: 0, g: 0, b: 0 };
function averageColor(){
        let img = new Image();
        img.crossOrigin = "anonymous";
        img.src = "images/mini3.png";
        
        if(img==null){
            console.log("img is null");
            return null;
        }
        img.addEventListener("load",(e)=>{
            let canvas2 = document.getElementById("myCanvas2");
            let context= canvas2.getContext &&canvas2.getContext('2d');
            
            context.drawImage(img, 0, 0,10,10);
            
            imgData = context.getImageData( 0, 0, 10, 10);
            console.log("len", imgData.data.length);
            var len = imgData.data.length;
            for (var i = 0; i < len; i += 4) {
            rgb.r += imgData.data[i];
            rgb.g += imgData.data[i + 1];
            rgb.b += imgData.data[i + 2];
            //console.log("rbg..",rgb.r,rgb.g,rgb.b);
            }
            rgb.r= Math.floor(rgb.r / (len/4));
            rgb.g = Math.floor(rgb.g / (len/4));
            rgb.b= Math.floor(rgb.b / (len/4));

            console.log("RGBf: ",rgb);
            
        });
        return  rgb;
       
    
}
