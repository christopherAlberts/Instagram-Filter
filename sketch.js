// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var flip = 0;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
    
//    pixelDensity(1);
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
    console.log("mouseX: " + mouseX + " mouseY: " + mouseY)
}
/////////////////////////////////////////////////////////////////
function keyPressed(){
    
    
    if (flip == 0){
        console.log("blueBirdFilter")
        image(blueBirdFilter(imgIn), imgIn.width, 0);
        flip = 1
    }
    else if (flip == 1){
        console.log("grayBirdFilter")
        image(grayBirdFilter(imgIn), imgIn.width, 0);
        flip = 2
    }
    else if (flip == 2){
        console.log("earlyBirdFilter")
        image(earlyBirdFilter(imgIn), imgIn.width, 0);
        flip = 0
    }

    
    
}
/////////////////////////////////////////////////////////////////
function sepiaFilter(img){

    var imgOut = createImage(img.width, img.height);
    console.log(typeof imgOut.loadPixels());
    imgOut.loadPixels();
    img.loadPixels();
    
    for (var x=0; x < img.width; x++){
        
        for (var y=0; y < img.height; y++){

            var index = (y*img.width + x) * 4;
           
            var oldRed = img.pixels[index + 0];
            var oldGreen = img.pixels[index + 1];
            var oldBlue = img.pixels[index + 2];

            var newRed = (oldRed * 0.393) + (oldGreen * 0.769) + (oldBlue * 0.189);
            var newGreen = (oldRed * 0.349) + (oldGreen * 0.686) + (oldBlue * 0.168);
            var newBlue = (oldRed * 0.272) + (oldGreen * 0.534) + (oldBlue * 0.131);

            
            imgOut.pixels[index + 0] = newRed;
            imgOut.pixels[index + 1] = newGreen;
            imgOut.pixels[index + 2] = newBlue;
            imgOut.pixels[index + 3] = 255;  
            
        }
    }
    imgOut.updatePixels();
    return imgOut ;

}

/////////////////////////////////////////////////////////////////
function blueFilter(img){
    
     var imgOut = createImage(img.width, img.height);
    imgOut.loadPixels();
    img.loadPixels();
    
    for (var x=0; x < img.width; x++){
        
        for (var y=0; y < img.height; y++){

            var index = (y*img.width + x) * 4;
           
            var oldRed = img.pixels[index + 0];
            var oldGreen = img.pixels[index + 1];
            var oldBlue = img.pixels[index + 2];

            var newRed = oldRed * 0.4
            var newGreen = oldGreen * 1
            var newBlue = oldBlue * 1.2

            
            imgOut.pixels[index + 0] = newRed;
            imgOut.pixels[index + 1] = newGreen;
            imgOut.pixels[index + 2] = newBlue;
            imgOut.pixels[index + 3] = 255;  
            
        }
    }
    imgOut.updatePixels();
    return imgOut ;
    
} 

/////////////////////////////////////////////////////////////////

function grayFilter(img){
    
     var imgOut = createImage(img.width, img.height);
    imgOut.loadPixels();
    img.loadPixels();
    
    for (var x=0; x < img.width; x++){
        
        for (var y=0; y < img.height; y++){

            var index = (y*img.width + x) * 4;
           
            var oldRed = img.pixels[index + 0];
            var oldGreen = img.pixels[index + 1];
            var oldBlue = img.pixels[index + 2];

            var newRed = (oldRed * 0.393) + (oldGreen * 0.769) + (oldBlue * 0.8);
            var newGreen = (oldRed * 0.349) + (oldGreen * 0.7) + (oldBlue * 0.8);
            var newBlue = (oldRed * 0.272) + (oldGreen * 0.7) + (oldBlue * 0.8);

            
            imgOut.pixels[index + 0] = newRed;
            imgOut.pixels[index + 1] = newGreen;
            imgOut.pixels[index + 2] = newBlue;
            imgOut.pixels[index + 3] = 255;  
            
        }
    }
    imgOut.updatePixels();
    return imgOut ;
    
}

/////////////////////////////////////////////////////////////////

function darkCorners(img){
    
    var imgOut = createImage(img.width, img.height);
    imgOut.loadPixels();
    img.loadPixels();
    
    centerX = img.width/2
    centerY = img.height/2
    
    for (var x=0; x < img.width; x++){

        for (var y=0; y < img.height; y++){

            var index = (y*img.width + x) * 4;

            var oldRed = img.pixels[index + 0];
            var oldGreen = img.pixels[index + 1];
            var oldBlue = img.pixels[index + 2];
            
            d = dist(centerX, centerY, x, y);            

            // up to 300 pixels away from the centre of the image – no adjustment (multiply each channel by 1
            if (d < 300){

                var oldRed = oldRed * 1;
                var oldGreen = oldGreen * 1;
                var oldBlue = oldBlue * 1;

            }

//             from 300 to 450 scale by 1 to 0.4 depending on distance
            if (d > 300 & d < 450){

                
                var oldRed = map(d, 300, 450, oldRed*1, oldRed*0.4);
                var oldGreen = map(d, 300, 450, oldGreen*1, oldGreen*0.4);
                var oldBlue = map(d, 300, 450, oldBlue*1, oldBlue*0.4);

            }   

//            // 450 and above scale by a value between 0.4 and 0
            if (d > 450){

                var oldRed = map(d, 450, 750, oldRed*0.4, oldRed*0);
                var oldGreen = map(d, 450, 750, oldGreen*0.4, oldGreen*0);
                var oldBlue = map(d, 450, 750, oldBlue*0.4, oldBlue*0);

            }  

            var newRed = oldRed;
            var newGreen = oldGreen;
            var newBlue = oldBlue;

            imgOut.pixels[index + 0] = newRed;
            imgOut.pixels[index + 1] = newGreen;
            imgOut.pixels[index + 2] = newBlue;
            imgOut.pixels[index + 3] = 255;  

        }
    }    

    imgOut.updatePixels();
    return imgOut ;
  
}
/////////////////////////////////////////////////////////////////
function radialBlurFilter(img){
    var imgOut = createImage(img.width, img.height);
    var matrixSize = matrix.length;

    imgOut.loadPixels();
    img.loadPixels();

    // read every pixel
    for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

            var index = (x + y * imgOut.width) * 4;
            var c = convolution(x, y, matrix, matrixSize, img);
          
            dynBlur_dist = dist(mouseX, mouseY, x, y)
            dynBlur_map = map(dynBlur_dist, 100, 300,0 ,1)
            dynBlur = constrain(dynBlur_map, 0, 1)

            var oldRed = img.pixels[index + 0];
            var oldGreen = img.pixels[index + 1];
            var oldBlue = img.pixels[index + 2];
          
            var newRed = c[0]*dynBlur + oldRed*(1-dynBlur);;
            var newGreen = c[1]*dynBlur + oldGreen*(1-dynBlur);;
            var newBlue = c[2]*dynBlur + oldBlue*(1-dynBlur);;
          
            imgOut.pixels[index + 0] = newRed
            imgOut.pixels[index + 1] = newGreen
            imgOut.pixels[index + 2] = newBlue
            imgOut.pixels[index + 3] = 255;
      }
    }
    console.log("dynBlur_dist: " + dynBlur_dist)
    console.log("dynBlur_map: " + dynBlur_map)
    console.log("dynBlur: " + dynBlur)
    imgOut.updatePixels();
    return imgOut;
}

/////////////////////////////////////////////////////////////////
function convolution(x, y, matrix, matrixSize, img) {
    var totalRed = 0.0;
    var totalGreen = 0.0;
    var totalBlue = 0.0;
    var offset = floor(matrixSize / 2);

    // convolution matrix loop
    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            // Get pixel loc within convolution matrix
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            var index = (xloc + img.width * yloc) * 4;
            // ensure we don't address a pixel that doesn't exist
            index = constrain(index, 0, img.pixels.length - 1);

            // multiply all values with the mask and sum up
            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }
    // return the new color
    return [totalRed, totalGreen, totalBlue];
}

/////////////////////////////////////////////////////////////////

function borderFilter(img){
    
    buffer = createGraphics(img.width, img.height)
    image(img, img.width, 0);
    noFill();
    stroke(255,255,255);
    strokeWeight(20);
    rect(img.width+10, 10, img.width-20, img.height-20, 50);
    rect(img.width+10, 10, img.width-20, img.height-20);
    return buffer
    
}

/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
    var resultImg = createImage(imgIn.width, imgIn.height);
    resultImg = sepiaFilter(img);
    resultImg = darkCorners(resultImg);
    resultImg = radialBlurFilter(resultImg);
    resultImg = borderFilter(resultImg)
    return resultImg;
}

function blueBirdFilter(img){
    var resultImg = createImage(imgIn.width, imgIn.height);
    resultImg = blueFilter(img);
    resultImg = darkCorners(resultImg);
    resultImg = radialBlurFilter(resultImg);
    resultImg = borderFilter(resultImg)
    return resultImg;
}

function grayBirdFilter(img){
    var resultImg = createImage(imgIn.width, imgIn.height);
    resultImg = grayFilter(img);
    resultImg = darkCorners(resultImg);
    resultImg = radialBlurFilter(resultImg);
    resultImg = borderFilter(resultImg)
    return resultImg;
}
