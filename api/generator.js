const fs = require('fs');
const path = require('path');
const sass = require('node-sass');


var generatingStep = -1;
var generatingStep = 0;
var currentStep = 0;
var res = null;
var fileData = {
    leto: '',
    letoMin: '',
    general: '',
    generalMin: '',
    elements: '',
    elementsMin: '',
    layout: '',
    layoutMin: '',
    transformer: '',
    transformerMin: '',
    variables: ''
};
var paths = [
    __dirname+'/src/imports/_variables.sass',
    __dirname+'/src/imports/_elements-variables.sass',
    __dirname+'/src/imports/_white-lists.sass',
    path.resolve(__dirname, '../dist/leto.css'),
    path.resolve(__dirname, '../dist/leto.min.css'),
    path.resolve(__dirname, '../dist/leto-general.css'),
    path.resolve(__dirname, '../dist/leto-elements.css'),
    path.resolve(__dirname, '../dist/leto-layout.css'),
    path.resolve(__dirname, '../dist/leto-transformer.css'),
    path.resolve(__dirname, '../dist/leto-general.min.css'),
    path.resolve(__dirname, '../dist/leto-elements.min.css'),
    path.resolve(__dirname, '../dist/leto-layout.min.css'),
    path.resolve(__dirname, '../dist/leto-transformer.min.css')
];

function generateLeto(data, newRes){
    generatingStep = -1;    
    currentStep = 0;
    nextStep(data);
    res = newRes;
}

function getVariablesContent(variablesData){
    //console.log(variablesData);
    var content =  '';

    variablesData.forEach(function(part) {
        part.values.forEach(function(variable){
            //console.log(variable);
            content += `${variable.name}: ${variable.value} \n`;
        })
        content += `\n`;
    });

    content += `$ultrawideRatio: "21/9"\n`;
    content += `$superUltrawideRatio: "32/9"\n`;
    content += `$touchDevice: (hover: none) and (pointer: coarse)\n`;
    content += `\n`;
    content += `$colorDarkWhite: darken($colorWhite, 5%)\n`;
    content += `$colorLightGrey: lighten($colorGrey, 5%)\n`;
    content += `$colorLighterGrey: lighten($colorLightGrey, 5%)\n`;
    content += `$colorDarkGrey: darken($colorGrey, 10%)\n`;
    content += `$colorDarkerGrey: darken($colorDarkGrey, 10%)\n`;
    content += `$colorLightBlack: lighten($colorBlack, 10%)\n`;

    content += `$colorLightYellow: lighten($colorYellow, 15%)\n`;
    content += `$colorDarkYellow: darken($colorYellow, 15%)\n`;

    content += `$colorLightOrange: lighten($colorOrange, 15%)\n`;
    content += `$colorDarkOrange: darken($colorOrange, 15%)\n`;
    
    content += `$colorLightRed: lighten($colorRed, 15%)\n`;
    content += `$colorDarkRed: darken($colorRed, 15%)\n`;

    content += `$colorLightPurple: lighten($colorPurple, 15%)\n`;
    content += `$colorDarkPurple: darken($colorPurple, 15%)\n`;

    content += `$colorLightBlue: lighten($colorBlue, 15%)\n`;
    content += `$colorDarkBlue: darken($colorBlue, 15%)\n`;

    content += `$colorLightMint: lighten($colorMint, 15%)\n`;
    content += `$colorDarkMint: darken($colorMint, 15%)\n`;

    content += `$colorLightGreen: lighten($colorGreen, 15%)\n`;
    content += `$colorDarkGreen: darken($colorGreen, 15%)\n`;
    content += `\n`;
    content += `$colorDarkWhiteDM: darken($colorWhiteDM, 5%)\n`;
    content += `$colorLightGreyDM: lighten($colorGreyDM, 5%)\n`;
    content += `$colorLighterGreyDM: lighten($colorLightGreyDM, 5%)\n`;
    content += `$colorDarkGreyDM: darken($colorGreyDM, 10%)\n`;
    content += `$colorDarkerGreyDM: darken($colorDarkGreyDM, 10%)\n`;
    content += `$colorLightBlackDM: lighten($colorBlackDM, 10%)\n`;

    content += `$colorLightYellowDM: lighten($colorYellowDM, 15%)\n`;
    content += `$colorDarkYellowDM: darken($colorYellowDM, 15%)\n`;

    content += `$colorLightOrangeDM: lighten($colorOrangeDM, 15%)\n`;
    content += `$colorDarkOrangeDM: darken($colorOrangeDM, 15%)\n`;
    
    content += `$colorLightRedDM: lighten($colorRedDM, 15%)\n`;
    content += `$colorDarkRedDM: darken($colorRedDM, 15%)\n`;

    content += `$colorLightPurpleDM: lighten($colorPurpleDM, 15%)\n`;
    content += `$colorDarkPurpleDM: darken($colorPurpleDM, 15%)\n`;

    content += `$colorLightBlueDM: lighten($colorBlueDM, 15%)\n`;
    content += `$colorDarkBlueDM: darken($colorBlueDM, 15%)\n`;

    content += `$colorLightMintDM: lighten($colorMintDM, 15%)\n`;
    content += `$colorDarkMintDM: darken($colorMintDM, 15%)\n`;

    content += `$colorLightGreenDM: lighten($colorGreenDM, 15%)\n`;
    content += `$colorDarkGreenDM: darken($colorGreenDM, 15%)\n`;
    content += `\n`;
    content += `$lightModeColor: $colorBlack\n`;
    content += `$lightModeBgColor: $colorWhite\n`;
    content += `$darkModeColor: $colorWhite\n`;
    content += `$darkModeBgColor: $colorBlack\n`;
    //console.log(content);
    return content;
}

function getElementsVariablesContent(elementsVariablesData){
    var content = '';
    content += `@import '_variables.sass' \n`;
    content += `@use 'sass:map' \n`;
    content += `\n`;

    elementsVariablesData.forEach(function(part, partIndex) {
        switch(partIndex){
            case 0:
                content += `$bubbleDefaultAttrVal`;
                break;
            case 1:
                content += `$cardDefaultAttrVal`;
                break;
            case 2:
                content += `$buttonDefaultAttrVal`;
                break;
            case 3:
                content += `$badgeDefaultAttrVal`;
                break;
            case 4:
                content += `$inputDefaultAttrVal`;
                break;
            case 5:
                content += `$radioDefaultAttrVal`;
                break;
            case 6:
                content += `$checkboxDefaultAttrVal`;
                break;
            case 7:
                content += `$searchDefaultAttrVal`;
                break;
            case 8:
                content += `$textareaDefaultAttrVal`;
                break;
            case 9:
                content += `$selectDefaultAttrVal`;
                break;
            case 10:
                content += `$pileDefaultAttrVal`;
                break;
            case 11:
                content += `$formDefaultAttrVal`;
                break;
            default:
                break;
        }
        if(partIndex < 10 && partIndex != 8){
            content += `: ('bg': ${part.values[0].value}, 'multiplier': ${part.values[1].value}, 'color': ${part.values[2].value}, 'borderWidth': ${part.values[3].value}, 'borderColor': ${part.values[4].value}, 'borderRadius': ${part.values[5].value}, 'outlineWidth': ${part.values[6].value}, 'outlineColor': ${part.values[7].value}, 'outlineOffset': ${part.values[8].value}, 'outlineStyle': ${part.values[9].value}, 'boxShadow': ${part.values[10].value})\n`;
        }
        else {
            content += `: ('bg': ${part.values[0].value}, 'color': ${part.values[1].value}, 'borderWidth': ${part.values[2].value}, 'borderColor': ${part.values[3].value}, 'borderRadius': ${part.values[4].value}, 'outlineWidth': ${part.values[5].value}, 'outlineColor': ${part.values[6].value}, 'outlineOffset': ${part.values[7].value}, 'outlineStyle': ${part.values[8].value}, 'boxShadow': ${part.values[9].value})\n`;
        }
    })

    content += `
@function getElementAttrVal($elementName, $attr) 
    $value: ''

    @if $elementName == 'bubble'
        $value: map-get($bubbleDefaultAttrVal, $attr)
    @else if $elementName == 'card'
        $value: map-get($cardDefaultAttrVal, $attr)                
    @else if $elementName == 'button'
        $value: map-get($buttonDefaultAttrVal, $attr)   
    @else if $elementName == 'badge'
        $value: map-get($badgeDefaultAttrVal, $attr)
    @else if $elementName == 'input'
        $value: map-get($inputDefaultAttrVal, $attr)     
    @else if $elementName == 'radio'
        $value: map-get($inputDefaultAttrVal, $attr)     
    @else if $elementName == 'checkbox'
        $value: map-get($inputDefaultAttrVal, $attr)        
    @else if $elementName == 'search'
        $value: map-get($searchDefaultAttrVal, $attr)
    @else if $elementName == 'textarea'
        $value: map-get($textareaDefaultAttrVal, $attr)
    @else if $elementName == 'select'
        $value: map-get($selectDefaultAttrVal, $attr)                
    @else if $elementName == 'pile'
        $value: map-get($pileDefaultAttrVal, $attr)   
    @else if $elementName == 'form'
        $value: map-get($formDefaultAttrVal, $attr)                      
    @return $value
    `
    return content;
}

function getPresetsAndMQContent(presetsAndMQData){
    var content = '';
    var listCounter = 0;

    presetsAndMQData.forEach(function(part, partIndex) {
        switch(partIndex){
            case 0:
                content += `$elementPresetsList: `;
                break;
            case 1:
                content += `$layoutMQList: `;
                break;
            case 2:
                content += `$transformerMQList: `;
                break;
            default:
                break;
        }
        part.values.forEach(function(value){
            if(value.value && listCounter > 0) content += `, `;    
            if(value.value){
                content += `'${value.name}'`;
                listCounter++;
            } 
        })
        content += '\n'
        listCounter = 0;
    })

    content += `   
@function checkElementMQList($value)
    @return true

@function checkElementPresetsList($value)
    $found: false

    @each $entry in $elementPresetsList
        @if $value == $entry
            $found: true

    @return $found

@function checkLayoutMQList($value)
    $found: false

    @each $entry in $layoutMQList
        @if $value == $entry
            $found: true

    @return $found

@function checkTransformerMQList($value)
    $found: false

    @each $entry in $transformerMQList
        @if $value == $entry
            $found: true

    @return $found
    `
    return content;
}

function nextStep(data){
    generatingStep++;
    if(generatingStep == 0){
        if (!fs.existsSync(path.resolve(__dirname, '../dist'))){
            fs.mkdirSync(path.resolve(__dirname, '../dist'));
        }
        createFile(paths[0], function(){
            createVariablesSASS(data, function(){ nextStep(data) });
        })

    }
    if(generatingStep == 1){
        createFile(paths[1], function(){
            createElementsVariablesSASS(data, function(){ nextStep(data) });
        })
    }
    if(generatingStep == 2){

        createFile(paths[2], function(){
            createWhiteListsSASS(data, function(){ nextStep(data) });
        })     
    }   
    if(generatingStep == 3){
        if(!data.generateSettings[0].values[0].value){
            if(!data.generateSettings[1].values[0].value){
                generatingSteps = 1;
            } else {
                generatingSteps = 2;
            }

            createFile(paths[3], function(){
                createLetoCSS();
            })

            if(data.generateSettings[1].values[0].value){
                generatingSteps = 2;
                createFile(paths[4], function(){
                    createLetoMinCSS();
                })       
            } 
        } else {
            if(!data.generateSettings[1].values[0].value){
                generatingSteps = 4;
            } else {
                generatingSteps = 8;
            }

            createFile(paths[5], function(){
                createLetoGeneralCSS();
            })
            createFile(paths[6], function(){
                createLetoElementsCSS();
            })
            createFile(paths[7], function(){
                createLetoLayoutCSS();
            })
            createFile(paths[8], function(){
                createLetoTransformerCSS();
            })

            if(data.generateSettings[1].values[0].value){
                generatingSteps = 8;
                createFile(paths[5], function(){
                    createLetoGeneralMinCSS();
                })
                createFile(paths[6], function(){
                    createLetoElementsMinCSS();
                })
                createFile(paths[7], function(){
                    createLetoLayoutMinCSS();
                })
                createFile(paths[8], function(){
                    createLetoTransformerMinCSS();
                })
            }
        }
    }
}

function checkGeneratingSteps(){
    console.log(currentStep, generatingSteps)
    if(currentStep == generatingSteps){
        console.log('All Leto files created');
        res.set("Content-Type", "application/json");
        res.status(201).send({files: fileData}).end();
        
    }
}

function createFile(filePath, callback){
    fs.access(filePath, fs.F_OK, (err) => {
        if (err) {
            callback();
        }
        else {
            fs.writeFile(filePath, '', function(){
                callback();
            })
        }
    })
}

function createVariablesSASS(data, callback){
    var variables = getVariablesContent(data.variables);
    fs.appendFile(__dirname+'/src/imports/_variables.sass', variables, function (err) {
        if (err) throw err;
        fileData.variables = variables;
        console.log('_variables.sass saved!');
        callback();
    });
}

function createElementsVariablesSASS(data, callback){
    var elementsVariables = getElementsVariablesContent(data.elements);
    fs.appendFile(__dirname+'/src/imports/_elements-variables.sass', elementsVariables, function (err) {
        if (err) throw err;
        console.log('_elements-variables.sass saved!');
        callback();
    });
}

function createWhiteListsSASS(data, callback){
    var presetAndMQ = getPresetsAndMQContent(data.presetAndMQ);
    fs.appendFile(__dirname+'/src/imports/_white-lists.sass', presetAndMQ, function (err) {
        if (err) throw err;
        console.log('_white-lists.sass saved!');
        callback();
    });
}

function createLetoCSS(){
    sass.render({
        file: __dirname+'/src/leto.sass',
    }, function(err, result) {
        if(err) throw err;
        fs.appendFile(path.resolve(__dirname, '../dist/leto.css'), result.css, function (err) {
            if (err) throw err;
            fileData.leto = result.css.toString();
            console.log('leto.css saved!');
            currentStep++;
            checkGeneratingSteps();
        })
    });
}

function createLetoGeneralCSS(){

    sass.render({
        file: __dirname+'/src/leto-general.sass',
    }, function(err, result) {
        if(err) throw err;
        fs.appendFile(path.resolve(__dirname, '../dist/leto-general.css'), result.css, function (err) {
            if (err) throw err;
            fileData.general = result.css.toString();
            console.log('leto-general.css saved!');
            currentStep++;
            checkGeneratingSteps();
        })
    });
}

function createLetoElementsCSS(){
    sass.render({
        file: __dirname+'/src/leto-elements.sass',
    }, function(err, result) {
        if(err) throw err;
        fs.appendFile(path.resolve(__dirname, '../dist/leto-elements.css'), result.css, function (err) {
            if (err) throw err;
            fileData.elements = result.css.toString();
            console.log('leto-elements.css saved!');
            currentStep++;
            checkGeneratingSteps();
        })
    });
}

function createLetoLayoutCSS(){
    sass.render({
        file: __dirname+'/src/leto-layout.sass',
    }, function(err, result) {
        if(err) throw err;
        fs.appendFile(path.resolve(__dirname, '../dist/leto-layout.css'), result.css, function (err) {
            if (err) throw err;
            fileData.layout = result.css.toString();
            console.log('leto-layout.css saved!');
            currentStep++;
            checkGeneratingSteps();
        })
    });
}

function createLetoTransformerCSS(){
    sass.render({
        file: __dirname+'/src/leto-transformer.sass',
    }, function(err, result) {
        if(err) throw err;
        fs.appendFile(path.resolve(__dirname, '../dist/leto-transformer.css'), result.css, function (err) {
            if (err) throw err;
            fileData.transformer = result.css.toString();
            console.log('leto-transformer.css saved!');
            currentStep++;
            checkGeneratingSteps();
        })
    });
}

function createLetoMinCSS(){
    sass.render({
        file: __dirname+'/src/leto.sass',
        outputStyle: 'compressed',
    }, function(err, result) {
        if(err) throw err;
        fs.appendFile(path.resolve(__dirname, '../dist/leto.min.css'), result.css, function (err) {
            if (err) throw err;
            fileData.letoMin = result.css.toString();
            console.log('leto.min.css saved!');
            currentStep++;
            checkGeneratingSteps();
        })
    });
}

function createLetoGeneralMinCSS(){
    sass.render({
        file: __dirname+'/src/leto-general.sass',
        outputStyle: 'compressed',
    }, function(err, result) {
        if(err) throw err;
        fs.appendFile(path.resolve(__dirname, '../dist/leto-general.min.css'), result.css, function (err) {
            if (err) throw err;
            fileData.generalMin = result.css.toString();
            console.log('leto-general.min.css saved!');
            currentStep++;
            checkGeneratingSteps();
        })
    });
}

function createLetoElementsMinCSS(){
    sass.render({
        file: __dirname+'/src/leto-elements.sass',
        outputStyle: 'compressed',
    }, function(err, result) {
        if(err) throw err;
        fs.appendFile(path.resolve(__dirname, '../dist/leto-elements.min.css'), result.css, function (err) {
            if (err) throw err;
            fileData.elementsMin = result.css.toString();
            console.log('leto-elements.min.css saved!');
            currentStep++;
            checkGeneratingSteps();
        })
    });
}

function createLetoLayoutMinCSS(){
    sass.render({
        file: __dirname+'/src/leto-layout.sass',
        outputStyle: 'compressed',
    }, function(err, result) {
        if(err) throw err;
        fs.appendFile(path.resolve(__dirname, '../dist/leto-layout.min.css'), result.css, function (err) {
            if (err) throw err;
            fileData.layoutMin = result.css.toString();
            console.log('leto-layout.min.css saved!');
            currentStep++;
            checkGeneratingSteps();
        })
    });
}

function createLetoTransformerMinCSS(){
    sass.render({
        file: __dirname+'/src/leto-transformer.sass',
        outputStyle: 'compressed',
    }, function(err, result) {
        if(err) throw err;
        fs.appendFile(path.resolve(__dirname, '../dist/leto-transformer.min.css'), result.css, function (err) {
            if (err) throw err;
            fileData.transformerMin = result.css.toString();
            console.log('leto-transformer.min.css saved!');
            currentStep++;
            checkGeneratingSteps();
        })
    });
}

module.exports = {generateLeto}