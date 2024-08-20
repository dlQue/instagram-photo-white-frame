// Modified from ruhua 2021/10/26
// Made by D.Q., April 11, 2023

alert("Choose your input folder", "Choose your input", false);
var inputFolder = Folder.selectDialog("Choose your input folder：");

alert("Choose your output folder", "Choose your output", false);
var outputFolder = Folder.selectDialog("Choose your output folder：");

var fileList = inputFolder.getFiles();

for (var i = 0; i < fileList.length; i++) {
    if (fileList[i] instanceof File && !fileList[i].hidden) {
        var doc = open(fileList[i]);

        app.backgroundColor.rgb.hexValue = 'ffffff';
        app.preferences.rulerUnits = Units.PIXELS;

        var picw = doc.width.value;
        var pich = doc.height.value;
        var picname = doc.name.split('.')[0];

        var a = 1.1;
        var cw = picw + (a - 1) * picw;
        var ch1 = pich + (a - 1) * pich;

        if (picw > pich) {
            ch1 = cw;
        } else {
            cw = ch1;
        }

        doc.resizeImage(picw, pich, 300, ResampleMethod.AUTOMATIC, 100);
        doc.resizeCanvas(cw, ch1, AnchorPosition.MIDDLECENTER);

        // Flatten the image to reduce memory usage
        doc.flatten();

        var fileOut = new File(outputFolder + '/' + picname + ".jpg");
        var myoptions = new JPEGSaveOptions();
        myoptions.quality = 12;
        doc.saveAs(fileOut, myoptions, true, Extension.LOWERCASE);
        
        // Close the document to free up memory
        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
}

alert("All done!", "Happy posting :)", false);
