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
    __dirname+'/src/imports/_colors-functions.scss',
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
    console.log('generate Leto...');
}

function getVariablesContent(variablesData, classPrefix){
    var content =  '';

    if(classPrefix.value) content += `${classPrefix.name}: ${classPrefix.value} \n`;
    else content += `${classPrefix.name}: '' \n`;

    variablesData.forEach(function(part) {
        part.values.forEach(function(variable){
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
    content += `\n`;
    content += `$lightModeColorDM: $colorBlack\n`;
    content += `$lightModeBgColorDM: $colorWhite\n`;
    content += `$darkModeColorDM: $colorWhite\n`;
    content += `$darkModeBgColorDM: $colorBlack\n`;
    return content;
}

function getColorsFunctionsContent(customVariablesData){
    var content =  '';

    content += `
@import '_variables.sass';
@import '_transformer-mixins.sass';

$colors: (
    '': (
        'black': $colorBlack,
        'light-black': $colorLightBlack,
        'darker-grey': $colorDarkerGrey,
        'dark-grey': $colorDarkGrey,
        'grey': $colorGrey,
        'light-grey': $colorLightGrey,
        'lighter-grey': $colorLighterGrey,
        'dark-white': $colorDarkWhite,
        'white': $colorWhite,
        'light-yellow': $colorLightYellow,
        'yellow': $colorYellow,
        'dark-yellow': $colorDarkYellow,
        'light-orange': $colorLightOrange,
        'orange': $colorOrange,
        'dark-orange': $colorDarkOrange,
        'light-red': $colorLightRed,
        'red': $colorRed,
        'dark-red': $colorDarkRed,
        'light-purple': $colorLightPurple,
        'purple': $colorPurple,
        'dark-purple': $colorDarkPurple,
        'light-blue': $colorLightBlue,
        'blue': $colorBlue,
        'dark-blue': $colorDarkBlue,
        'light-mint': $colorLightMint,
        'mint': $colorMint,
        'dark-mint': $colorDarkMint,
        'light-green': $colorLightGreen,
        'green': $colorGreen,
        'dark-green': $colorDarkGreen,         
    `

    customVariablesData[0].values.forEach(function(variable){
        content += `        '${variable.name}': ${variable.value}, \n`;
    })

    content += `
    ),
    '-dark': (
        'black': $colorBlackDM,
        'light-black': $colorLightBlackDM,
        'darker-grey': $colorDarkerGreyDM,
        'dark-grey': $colorDarkGreyDM,
        'grey': $colorGreyDM,
        'light-grey': $colorLightGreyDM,
        'lighter-grey': $colorLighterGreyDM,
        'dark-white': $colorDarkWhiteDM,
        'white': $colorWhiteDM,
        'light-yellow': $colorLightYellowDM,
        'yellow': $colorYellowDM,
        'dark-yellow': $colorDarkYellowDM,
        'light-orange': $colorLightOrangeDM,
        'orange': $colorOrangeDM,
        'dark-orange': $colorDarkOrangeDM,
        'light-red': $colorLightRedDM,
        'red': $colorRedDM,
        'dark-red': $colorDarkRedDM,
        'light-purple': $colorLightPurpleDM,
        'purple': $colorPurpleDM,
        'dark-purple': $colorDarkPurpleDM,
        'light-blue': $colorLightBlueDM,
        'blue': $colorBlueDM,
        'dark-blue': $colorDarkBlueDM,
        'light-mint': $colorLightMintDM,
        'mint': $colorMintDM,
        'dark-mint': $colorDarkMintDM,
        'light-green': $colorLightGreenDM,
        'green': $colorGreenDM,
        'dark-green': $colorDarkGreenDM,          
    `

    customVariablesData[1].values.forEach(function(variable){
        content += `    '${variable.name}': ${variable.value}, \n`;
    })

    content += `
    )
);
\n`

    content += `
@mixin colors($type, $attributeName){
    @each $theme, $map in $colors {
        @each $color, $cMap in $map {
            @if $theme == '' {
                .#{$classPrefix}frame#{$theme} &-#{$color}, .#{$classPrefix}frame#{$theme} &-#{$color}-themed {
                    $value: map-get(map-get($colors, $theme), '#{$color}');
                    @include transformerConstructor($type){
                        #{$attributeName}: $value;     
                    }
                }
            }
            @if $theme == '-dark' {
                .#{$classPrefix}frame#{$theme} &-#{$color}, .#{$classPrefix}frame#{$theme} &-#{$color}-themed {
                    $value: map-get(map-get($colors, $theme), '#{$color}');
                    @include transformerConstructor($type){
                        #{$attributeName}: $value;     
                    }
                }
            }
        }
    }
}

@mixin colorsThemeModes($type, $attributeName){
    @each $theme, $map in $colors {
        @each $color, $cMap in $map {
            @if $theme == '' {
                .#{$classPrefix}frame#{$theme} &-#{$color}-lm{
                    $value: map-get(map-get($colors, $theme), '#{$color}');
                    @include transformerConstructor($type){
                        #{$attributeName}: $value;     
                    }
                }
            }
            @if $theme == '-dark' {
                .#{$classPrefix}frame#{$theme} &-#{$color}-dm{
                    $value: map-get(map-get($colors, $theme), '#{$color}');
                    @include transformerConstructor($type){
                        #{$attributeName}: $value;     
                    }
                }
            }
        }
    }
}

@mixin colorsThemed($type, $class){
    @each $theme, $map in $colors {
        @each $color, $cMap in $map {
            @if $theme == '' {
                [class*='#{$class}-#{$color}-themed']{
                    $value: map-get(map-get($colors, $theme), '#{$color}');
                    @include transformerColorConstructor($type, $value);
                }
            }
            @if $theme == '-dark' {

            }
        }
    }
}\n`;
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
            createColorsFunctionsSCSS(data, function(){ nextStep(data) });
        })

    }
    if(generatingStep == 2){
        createFile(paths[2], function(){
            createElementsVariablesSASS(data, function(){ nextStep(data) });
        })
    }
    if(generatingStep == 3){

        createFile(paths[3], function(){
            createWhiteListsSASS(data, function(){ nextStep(data) });
        })     
    }   
    if(generatingStep == 4){
        if(!data.generateSettings[1].values[0].value){
            if(!data.generateSettings[2].values[0].value){
                generatingSteps = 1;
            } else {
                generatingSteps = 2;
            }

            createFile(paths[4], function(){
                createLetoCSS();
            })

            if(data.generateSettings[2].values[0].value){
                generatingSteps = 2;
                createFile(paths[5], function(){
                    createLetoMinCSS();
                })       
            } 
        } else {
            if(!data.generateSettings[2].values[0].value){
                generatingSteps = 4;
            } else {
                generatingSteps = 8;
            }

            createFile(paths[6], function(){
                createLetoGeneralCSS();
            })
            createFile(paths[7], function(){
                createLetoElementsCSS();
            })
            createFile(paths[8], function(){
                createLetoLayoutCSS();
            })
            createFile(paths[9], function(){
                createLetoTransformerCSS();
            })

            if(data.generateSettings[2].values[0].value){
                generatingSteps = 8;
                createFile(paths[6], function(){
                    createLetoGeneralMinCSS();
                })
                createFile(paths[7], function(){
                    createLetoElementsMinCSS();
                })
                createFile(paths[8], function(){
                    createLetoLayoutMinCSS();
                })
                createFile(paths[9], function(){
                    createLetoTransformerMinCSS();
                })
            }
        }
    }
}

function checkGeneratingSteps(){
    if(currentStep == generatingSteps){
        console.log('All Leto files created!');
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
    var variables = getVariablesContent(data.variables, data.generateSettings[0].values[0]);
    fs.appendFile(__dirname+'/src/imports/_variables.sass', variables, function (err) {
        if (err) throw err;
        fileData.variables = variables;
        callback();
    });
}


function createColorsFunctionsSCSS(data, callback){
    var elementsVariables = getColorsFunctionsContent(data.customVariables);
    fs.appendFile(__dirname+'/src/imports/_colors-functions.scss', elementsVariables, function (err) {
        if (err) throw err;
        callback();
    });
}

function createElementsVariablesSASS(data, callback){
    var elementsVariables = getElementsVariablesContent(data.elements);
    fs.appendFile(__dirname+'/src/imports/_elements-variables.sass', elementsVariables, function (err) {
        if (err) throw err;
        callback();
    });
}

function createWhiteListsSASS(data, callback){
    var presetAndMQ = getPresetsAndMQContent(data.presetAndMQ);
    fs.appendFile(__dirname+'/src/imports/_white-lists.sass', presetAndMQ, function (err) {
        if (err) throw err;
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
            currentStep++;
            checkGeneratingSteps();
        })
    });
}

module.exports = {generateLeto}