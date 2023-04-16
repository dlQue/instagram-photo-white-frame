// Modified from ruhua (vx:xiaoaozi2018) 2021/10/26
// Made by Que, April 11, 2023

alert("Choose your input folder", "Choose your input", false);
var inputFolder = Folder.selectDialog("Choose your input folder：");

alert("Choose your output folder", "Choose your output", false);
var outputFolder = Folder.selectDialog("Choose your output folder：");

// all files under the input folder, save it as a list
var fileList = inputFolder.getFiles();

// for all files inside of fileList
for (var i=0; i<fileList.length; i++) {

    // check object
    if (fileList[i] instanceof File && fileList[i].hidden == false) {
        var inumber =i+1;
        // lert("#"+inumber+ "file is ready, press ok to continue", "file check", false);
    }else{
        continue;
        }

    var doc = open(fileList[i]);

    // set foreground color
    // app.foregroundColor.rgb.hexValue = '000000';
    // set background color
    app.backgroundColor.rgb.hexValue = 'ffffff';
    // set unit
    app.preferences.rulerUnits = Units.PIXELS

    var picw = doc.width.value;
    var pich = doc.height.value;

    // get individual file name
    var picname = doc.name.split ('.')[0];

    gapsample = picw
    var a= 1.1 // here a is the ratio of frame
    var cw = picw+(a-1)*gapsample
    var ch1 = pich+(a-1)*gapsample

    //make background square
    if (picw > pich){
        ch1 = cw
    }else{
        cw = ch1
    }
    
    // resolution after adjustment
    var resolution = 300;
    // resample method be automatic
    var resampleMethod = ResampleMethod.AUTOMATIC;
    // noise after adjustment
    var amount = 100;
    // reset size
    doc.resizeImage(picw, pich, resolution, resampleMethod, amount);

    // add frame

    // set anchor position
    var anchor1 = AnchorPosition.MIDDLECENTER;
    // resize canvas
    doc.resizeCanvas(cw, ch1, anchor1);

    // file saving path
    var fileOut = new File(outputFolder+'//'+picname+".jpg");
    // save as jpeg
    var myoptions = JPEGSaveOptions;
    myoptions.quality=12;
    // save as copy
    var asCopy = true;
    // set the extension as .jpg
    var extensionType = Extension.LOWERCASE;
    // save as the method
    doc.saveAs(fileOut, myoptions, asCopy, extensionType);
    doc.close (SaveOptions.DONOTSAVECHANGES)
}
alert("All done!", "Happy posting :)", false);
