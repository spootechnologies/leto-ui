var global = new Vue({
    data: function() {
        return {
            step: 0,
            subStep: 0,
            stepsMap: [],
            allowed: [
                'Absolute length units like 64px.', // 0
                'Leto variables containing absolute length Units like $xxs', // 1
                'Relative length units like 50%.', // 2
                'Leto variables containing relative length units like $standardRoundness', // 3
                'Length units like 64px or 50%.', // 4
                'Leto variables containing length units like $xxs or $standardRoundness', // 5
                'Number', // 6
                'Leto variables containing a Number', // 7
                'CSS colors like hexadecimal colors #ff0000', // 8
                'Leto variables containing CSS colors like $colorRed', // 9
                'Absolute, relative or data URL', // 10
                'One or more Font family, generic font names separated by a comma', // 11
                'For no color use transparent', // 12
                'Use 0 for no effect', // 13
                'Use none for no effect', // 14
                'Only class specific values' // 15
            ],
            letoData: {
                variables: [ 
                    {
                        name: 'Device Media Queries',
                        info: 'Device breakpoints for responsive layouts.',
                        values: [
                            {
                                name: '$tablet',
                                value: '600px',
                                allowed: [0, 1]
                            },
                            {
                                name: '$tabletAndPC',
                                value: '1024px',
                                allowed: [0, 1]
                            },
                            {
                                name: '$pc',
                                value: '1440px',
                                allowed: [0, 1]
                            },
                            {
                                name: '$ultrawide',
                                value: '1921px',
                                allowed: [0, 1]
                            }
                        ]
                    },
                    {
                        name: 'General Sizes',
                        info: 'Basic sizes for Leto. Effecting element classes \n like leto-bubble and transformer classes like leto-margin.',
                        values: [
                            {
                                name: '$xxs',
                                value: '8px',
                                allowed: [0, 1]
                            },
                            {
                                name: '$xs',
                                value: '12px',
                                allowed: [0, 1]
                            },
                            {
                                name: '$sm',
                                value: '16px',
                                allowed: [0, 1]
                            },
                            {
                                name: '$md',
                                value: '24px',
                                allowed: [0, 1]
                            },
                            {
                                name: '$lg',
                                value: '32px',
                                allowed: [0, 1]
                            },
                            {
                                name: '$xl',
                                value: '48px',
                                allowed: [0, 1]
                            },
                            {
                                name: '$xxl',
                                value: '64px',
                                allowed: [0, 1]
                            },
                        ]
                    },
                    {
                        name: 'Standards',
                        info: 'Standards effecting element classes in default size and roundness.',
                        values: [
                            {
                                name: '$standardSize',
                                value: '$md',
                                allowed: [0, 1]
                            },
                            {
                                name: '$elementSizeMultiplier',
                                value: '2',
                                allowed: [6, 7]
                            },
                            {
                                name: '$standardRoundness',
                                value: '12px',
                                allowed: [4, 5]
                            }
                        ]
                    },
                    {
                        name: 'Standard Colors',
                        info: 'Colors used in element and transformer classes \n like leto-text-red for $colorRed. \n Leto will also generate darker and lighter colors like $colorLightRed',
                        values: [
                            {
                                name: '$colorWhite',
                                value: '#fdfdfd',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorGrey',
                                value: '#e1e1e1',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorBlack',
                                value: '#303030',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorYellow',
                                value: '#ffff73',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorOrange',
                                value: '#ffac5a',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorRed',
                                value: '#ff6666',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorPurple',
                                value: '#ca7fff',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorBlue',
                                value: '#738aff',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorMint',
                                value: '#59ffc8',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorGreen',
                                value: '#8aff80',
                                allowed: [8, 9],
                                inputType: 'color'
                            }
                        ]
                    },
                    {
                        name: 'Dark Mode Colors',
                        info: 'Alternative colors for the standard color palette used in dark mode. \n Leto will also generate darker and lighter colors like $colorLightRed',
                        values: [
                            {
                                name: '$colorWhiteDM',
                                value: '#fdfdfd',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorGreyDM',
                                value: '#e1e1e1',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorBlackDM',
                                value: '#303030',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorYellowDM',
                                value: '#ffff73',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorOrangeDM',
                                value: '#ffac5a',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorRedDM',
                                value: '#ff6666',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorPurpleDM',
                                value: '#ca7fff',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorBlueDM',
                                value: '#738aff',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorMintDM',
                                value: '#59ffc8',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$colorGreenDM',
                                value: '#8aff80',
                                allowed: [8, 9],
                                inputType: 'color'
                            }
                        ]
                    },
                    {
                        name: 'Special Element Colors',
                        info: 'Colors for classes in connection with link and toast.',
                        values: [
                            {
                                name: '$linkColor',
                                value: '$colorBlue',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$linkHoverColor',
                                value: '$colorOrange',
                                allowed: [8, 9],
                                inputType: 'color'
                            },
                            {
                                name: '$toastColor',
                                value: '$colorBlack',
                                allowed: [8, 9]
                            }
                        ]
                    },
                    {
                        name: 'Standard Font',
                        info: 'Font used in Leto.',
                        values: [
                            {
                                name: '$fontLink',
                                value: 'url("https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap")',
                                allowed: [10]
                            },
                            {
                                name: '$fontFamily',
                                value: '"Open Sans", sans-serif',
                                allowed: [11]
                            }
                        ]
                    },
                    {
                        name: 'Font Sizes',
                        info: 'Font sizes used in classes like leto-text.',
                        values: [
                            {
                                name: '$fontSizeXXS',
                                value: '10px',
                                allowed: [4, 5]
                            },
                            {
                                name: '$fontSizeXS',
                                value: '12px',
                                allowed: [4, 5]
                            },
                            {
                                name: '$fontSizeSM',
                                value: '14px',
                                allowed: [4, 5]
                            },
                            {
                                name: '$fontSizeMD',
                                value: '16px',
                                allowed: [4, 5]
                            },
                            {
                                name: '$fontSizeLG',
                                value: '20px',
                                allowed: [4, 5]
                            },
                            {
                                name: '$fontSizeXL',
                                value: '24px',
                                allowed: [4, 5]
                            },
                            {
                                name: '$fontSizeXXL',
                                value: '32px',
                                allowed: [4, 5]
                            }
                        ]
                    },
                    {
                        name: 'Font Weight',
                        info: 'Font weight used in classes like leto-text.',
                        values: [
                            {
                                name: '$fontWeightLight',
                                value: '300',
                                allowed: [6, 7]
                            },
                            {
                                name: '$fontWeightRegular',
                                value: '400',
                                allowed: [6, 7]
                            },
                            {
                                name: '$fontWeightMedium',
                                value: '600',
                                allowed: [6, 7]
                            },
                            {
                                name: '$fontWeightBold',
                                value: '700',
                                allowed: [6, 7]
                            },
                            {
                                name: '$fontWeightBlack',
                                value: '800',
                                allowed: [6, 7]
                            }
                        ]
                    },
                    {
                        name: 'Basic Margins and Paddings',
                        info: 'Basics for all Leto classes using margin and padding.',
                        values: [
                            {
                                name: '$basicPadding',
                                value: '$xxs',
                                allowed: [0, 1]
                            },
                            {
                                name: '$basicMargin',
                                value: '$xxs',
                                allowed: [0, 1]
                            }
                        ]
                    }
                ],
                customVariables: [{}],
                elements: [
                    {
                        name: 'Bubble',
                        values: [
                            {
                                name: 'Background',
                                value: 'transparent',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Size Multiplier',
                                value: '2.5',
                                allowed: [6, 7]
                            },
                            {
                                name: 'Color',
                                value: '$colorBlack',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Width',
                                value: '1px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Border Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Roundness',
                                value: '100%',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Width',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Outline Offset',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Style',
                                value: 'none',
                                allowed: [14, 15]
                            },
                            {
                                name: 'Box Shadow',
                                value: 'none',
                                allowed: [14, 15]
                            },
                        ]
                    },
                    {
                        name: 'Card',
                        values: [
                            {
                                name: 'Background',
                                value: 'transparent',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Size Multiplier',
                                value: '10',
                                allowed: [6, 7]
                            },
                            {
                                name: 'Color',
                                value: '$colorBlack',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Width',
                                value: '1px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Border Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Roundness',
                                value: '$standardRoundness',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Width',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Outline Offset',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Style',
                                value: 'none',
                                allowed: [14, 15]
                            },
                            {
                                name: 'Box Shadow',
                                value: 'none',
                                allowed: [14, 15]
                            },
                        ]
                    },
                    {
                        name: 'Button',
                        values: [
                            {
                                name: 'Background',
                                value: '$colorWhite',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Size Multiplier',
                                value: '$elementSizeMultiplier',
                                allowed: [6, 7]
                            },
                            {
                                name: 'Color',
                                value: '$colorBlack',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Width',
                                value: '1px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Border Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Roundness',
                                value: '128px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Width',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Outline Offset',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Style',
                                value: 'none',
                                allowed: [14, 15]
                            },
                            {
                                name: 'Box Shadow',
                                value: 'none',
                                allowed: [14, 15]
                            },
                        ]
                    },
                    {
                        name: 'Badge',
                        values: [
                            {
                                name: 'Background',
                                value: '$colorWhite',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Size Multiplier',
                                value: '$elementSizeMultiplier',
                                allowed: [6, 7]
                            },
                            {
                                name: 'Color',
                                value: '$colorBlack',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Width',
                                value: '1px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Border Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Roundness',
                                value: '128px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Width',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Outline Offset',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Style',
                                value: 'none',
                                allowed: [14, 15]
                            },
                            {
                                name: 'Box Shadow',
                                value: 'none',
                                allowed: [14, 15]
                            },
                        ]
                    },
                    {
                        name: 'Input',
                        values: [
                            {
                                name: 'Background',
                                value: '$colorWhite',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Size Multiplier',
                                value: '$elementSizeMultiplier',
                                allowed: [6, 7]
                            },
                            {
                                name: 'Color',
                                value: '$colorBlack',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Width',
                                value: '1px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Border Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Roundness',
                                value: '$standardRoundness',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Width',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Outline Offset',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Style',
                                value: 'none',
                                allowed: [14, 15]
                            },
                            {
                                name: 'Box Shadow',
                                value: 'none',
                                allowed: [14, 15]
                            },
                        ]
                    },
                    {
                        name: 'Radio',
                        values: [
                            {
                                name: 'Background',
                                value: '$colorWhite',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Size Multiplier',
                                value: '$elementSizeMultiplier',
                                allowed: [6, 7]
                            },
                            {
                                name: 'Color',
                                value: '$colorBlack',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Width',
                                value: '1px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Border Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Roundness',
                                value: '$standardRoundness',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Width',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Outline Offset',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Style',
                                value: 'none',
                                allowed: [14, 15]
                            },
                            {
                                name: 'Box Shadow',
                                value: 'none',
                                allowed: [14, 15]
                            },
                        ]
                    },
                    {
                        name: 'Checkbox',
                        values: [
                            {
                                name: 'Background',
                                value: '$colorWhite',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Size Multiplier',
                                value: '$elementSizeMultiplier',
                                allowed: [6, 7]
                            },
                            {
                                name: 'Color',
                                value: '$colorBlack',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Width',
                                value: '1px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Border Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Roundness',
                                value: '$standardRoundness',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Width',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Outline Offset',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Style',
                                value: 'none',
                                allowed: [14, 15]
                            },
                            {
                                name: 'Box Shadow',
                                value: 'none',
                                allowed: [14, 15]
                            },
                        ]
                    },
                    {
                        name: 'Search',
                        values: [
                            {
                                name: 'Background',
                                value: '$colorLightGrey',
                                allowed: [8, 9, 12]
                            },                            
                            {
                                name: 'Size Multiplier',
                                value: '$elementSizeMultiplier',
                                allowed: [6, 7]
                            },
                            {
                                name: 'Color',
                                value: '$colorBlack',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Width',
                                value: '1px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Border Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Roundness',
                                value: '$standardRoundness',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Width',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Outline Offset',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Style',
                                value: 'none',
                                allowed: [14, 15]
                            },
                            {
                                name: 'Box Shadow',
                                value: 'none',
                                allowed: [14, 15]
                            },
                        ]
                    },
                    {
                        name: 'Textarea',
                        values: [
                            {
                                name: 'Background',
                                value: '$colorWhite',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Color',
                                value: '$colorBlack',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Width',
                                value: '1px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Border Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Roundness',
                                value: '$standardRoundness',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Width',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Outline Offset',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Style',
                                value: 'none',
                                allowed: [14, 15]
                            },
                            {
                                name: 'Box Shadow',
                                value: 'none',
                                allowed: [14, 15]
                            },
                        ]
                    },
                    {
                        name: 'Select',
                        values: [
                            {
                                name: 'Background',
                                value: '$colorWhite',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Size Multiplier',
                                value: '$elementSizeMultiplier',
                                allowed: [6, 7]
                            },
                            {
                                name: 'Color',
                                value: '$colorBlack',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Width',
                                value: '1px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Border Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Roundness',
                                value: '$standardRoundness',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Width',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Outline Offset',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Style',
                                value: 'none',
                                allowed: [14, 15]
                            },
                            {
                                name: 'Box Shadow',
                                value: 'none',
                                allowed: [14, 15]
                            },
                        ]
                    },
                    {
                        name: 'Pile',
                        values: [
                            {
                                name: 'Background',
                                value: 'transparent',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Color',
                                value: '$colorBlack',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Width',
                                value: '1px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Border Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Roundness',
                                value: '$standardRoundness',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Width',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Outline Offset',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Style',
                                value: 'none',
                                allowed: [14, 15]
                            },
                            {
                                name: 'Box Shadow',
                                value: 'none',
                                allowed: [14, 15]
                            },
                        ]
                    },
                    {
                        name: 'Form',
                        values: [
                            {
                                name: 'Background',
                                value: '$colorWhite',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Color',
                                value: '$colorBlack',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Width',
                                value: '1px',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Border Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Border Roundness',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Width',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Color',
                                value: '$colorGrey',
                                allowed: [8, 9, 12]
                            },
                            {
                                name: 'Outline Offset',
                                value: '0',
                                allowed: [4, 5, 13]
                            },
                            {
                                name: 'Outline Style',
                                value: 'none',
                                allowed: [14, 15]
                            },
                            {
                                name: 'Box Shadow',
                                value: 'none',
                                allowed: [14, 15]
                            },
                        ]
                    }
                ],
                customElements: [{}],
                presetAndMQ: [
                    {
                        name: 'Presets',
                        values: [
                            {
                                name: 'bubble',
                                value: true,
                            },
                            {
                                name: 'card',
                                value: true,
                            },
                            {
                                name: 'button',
                                value: true,
                            },
                            {
                                name: 'badge',
                                value: true,
                            },
                            {
                                name: 'input',
                                value: false,
                            },
                            {
                                name: 'radio',
                                value: false,
                            },
                            {
                                name: 'checkbox',
                                value: false,
                            },
                            {
                                name: 'color',
                                value: false,
                            },
                            {
                                name: 'search',
                                value: false,
                            },
                            {
                                name: 'textarea',
                                value: false,
                            },
                            {
                                name: 'select',
                                value: false,
                            },
                            {
                                name: 'table',
                                value: false,
                            },
                            {
                                name: 'pile',
                                value: true,
                            },
                            {
                                name: 'form',
                                value: false,
                            }
                        ]
                    },
                    {
                        name: 'Layout Media Quries',
                        values: [
                            {
                                name: 'display',
                                value: false,
                            },
                            {
                                name: 'axisPosition',
                                value: false,
                            },
                            {
                                name: 'elementPosition',
                                value: false,
                            },
                            {
                                name: 'flexArea',
                                value: true,
                            },
                            {
                                name: 'shrink',
                                value: false,
                            },
                            {
                                name: 'space',
                                value: false,
                            }
                        ]
                    },
                    {
                        name: 'Transformer Media Quries',
                        values: [
                            {
                                name: 'position',
                                value: false,
                            },
                            {
                                name: 'minWidth',
                                value: false,
                            },
                            {
                                name: 'width',
                                value: false,
                            },
                            {
                                name: 'maxWidth',
                                value: false,
                            },
                            {
                                name: 'minHeight',
                                value: false,
                            },
                            {
                                name: 'height',
                                value: false,
                            },
                            {
                                name: 'maxHeight',
                                value: false,
                            },
                            {
                                name: 'background',
                                value: false,
                            },
                            {
                                name: 'border',
                                value: false,
                            },
                            {
                                name: 'margin',
                                value: true,
                            },
                            {
                                name: 'padding',
                                value: true,
                            },
                            {
                                name: 'overflow',
                                value: false,
                            },
                            {
                                name: 'display',
                                value: false,
                            },
                            {
                                name: 'disabled',
                                value: false,
                            },
                            {
                                name: 'click',
                                value: false,
                            },
                            {
                                name: 'noLink',
                                value: false,
                            },
                            {
                                name: 'active',
                                value: false,
                            },
                            {
                                name: 'hover',
                                value: false,
                            },
                        ]
                    }
                ],
                generateSettings: [
                    {
                        name: 'Generated Leto file type',
                        values: [
                            {
                                name: 'Split up Leto file',
                                value: false
                            }
                        ]
                    },
                    {
                        name: 'File Compressing',
                        values: [
                            {
                                name: 'Compressed Leto file',
                                value: false
                            }
                        ]
                    }
                ],
            }
        }
    },
    methods: {
        getStepsLenght: function(){
            var self = this;
            self.stepsMap[0] = self.letoData.variables.length;
            self.stepsMap[1] = self.letoData.customVariables.length;
            self.stepsMap[2] = self.letoData.elements.length;
            self.stepsMap[3] = self.letoData.customElements.length;
            self.stepsMap[4] = self.letoData.presetAndMQ.length;
            self.stepsMap[5] = self.letoData.generateSettings.length;
        },
        createAllowedInputs: function(){
            var self = this;
            var newAllowed = '';

            self.letoData.variables.forEach(function(step, stepIndex){
                step.values.forEach(function(subStep, subStepIndex){
                    newAllowed = '';
                    if(subStep.allowed){
                        subStep.allowed.forEach(function(allowedIndex){
                            newAllowed += self.allowed[allowedIndex];
                            newAllowed += '\n';
                        })
                    }
                    self.letoData.variables[stepIndex].values[subStepIndex].allowed = newAllowed;                   
                })

            })
            console.log(self.letoData.variables);

            newAllowed = '';
            self.letoData.elements.forEach(function(step, stepIndex){
                step.values.forEach(function(subStep, subStepIndex){
                    newAllowed = '';
                    if(subStep.allowed){
                        subStep.allowed.forEach(function(allowedIndex){
                            newAllowed += self.allowed[allowedIndex];
                            newAllowed += '\n';
                        })
                    }
                    self.letoData.elements[stepIndex].values[subStepIndex].allowed = newAllowed;                   
                })

            })
            console.log(self.letoData.elements);
        }
    },
    created: function(){
        var self = this;
        self.createAllowedInputs();
        self.getStepsLenght();
    }
})

var eventBus = new Vue();