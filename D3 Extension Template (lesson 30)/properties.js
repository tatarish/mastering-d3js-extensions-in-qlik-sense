define(['text!./d3Template.qext'], function (qext) {
    'use strict';

    //Qlik Help Site: https://help.qlik.com/en-US/sense-developer/February2018/Subsystems/Extensions/Content/Howtos/working-with-custom-properties.htm
    var AllComponents = {
        type: "items",
        label: "All components",
        items: {

            allComponents_Switch: {
                ref: "prop.allComponents_Switch",
                label: "Switch",
                component: "switch",
                type: "boolean",
                options: [{
                    value: true,
                    label: "On"
                }, {
                    value: false,
                    label: "Off"
                }],
                defaultValue: true
            },
            allComponents_String: {
                ref: "prop.allComponents_String",
                label: "String",
                type: "string",
                defaultValue: "",
                expression: "optional",
                show: function (data) {
                    return data.prop.allComponents_Switch
                },
            },
            allComponents_Textarea: {
                label: "Textarea",
                component: "textarea",
                rows: 3,
                maxlength: 140,
                ref: "prop.Textarea",
                show: function (data) {
                    return data.prop.allComponents_Switch
                },
            },
            allComponents_Slider: {
                type: "number",
                component: "slider",
                label: "Slider",
                ref: "prop.allComponents_Slider",
                min: 1,
                max: 100,
                step: 10,
                defaultValue: 1,
                show: function (data) {
                    return data.prop.allComponents_Switch
                }
            },
            allComponents_RangeSlider: {
                type: "array",
                component: "slider",
                label: "Range slider",
                ref: "prop.allComponents_RangeSlider",
                min: 10,
                max: 20,
                step: 0.5,
                defaultValue: [13, 17],
                show: function (data) {
                    return data.prop.allComponents_Switch
                }
            },
            allComponents_Buttongroup: {
                type: "string",
                component: "buttongroup",
                label: "Buttongroup",
                ref: "prop.allComponents_Buttongroup",
                options: [{
                    value: "value1",
                    label: "Value 1"
                }, {
                    value: "value2",
                    label: "Value 2"
                }],
                defaultValue: "value1",
                show: function (data) {
                    return data.prop.allComponents_Switch
                }
            },
            allComponents_ColorPicker: {
                ref: "prop.allComponents_ColorPicker",
                label: "ColorPicker",
                component: "color-picker",
                type: "object",
                defaultValue: {
                    index: 12,
                    color: "#000000"
                },
                show: function (data) {
                    return data.prop.allComponents_Switch
                }
            },
            allComponents_Integrer: {
                type: "integer",
                label: "Integer",
                ref: "prop.allComponents_Integrer",
                defaultValue: "10",
                show: function (data) {
                    return data.prop.allComponents_Switch
                }
            },
            allComponents_Number: {
                type: "number",
                label: "Number",
                ref: "prop.allComponents_Number",
                defaultValue: "8.5",
                max: "20",
                show: function (data) {
                    return data.prop.allComponents_Switch
                }
            },
            allComponents_Button: {
                label: "Button",
                component: "button",
                action: function (data) {
                    //add your button action here
                    alert("Extension name '" + data.visualization + "' and have id '" + data.qInfo.qId + "'.");
                },
                show: function (data) {
                    return data.prop.allComponents_Switch
                }
            },
            allComponents_Checkbox: {
                type: "boolean",
                label: "Checkbox",
                ref: "prop.allComponents_Checkbox",
                defaultValue: true,
                show: function (data) {
                    return data.prop.allComponents_Switch
                }
            },
            allComponents_Dropdown: {
                type: "string",
                component: "dropdown",
                label: "Dropdown",
                ref: "prop.allComponents_Dropdown",
                options: [{
                    value: "value1",
                    label: "Value 1"
                }, {
                    value: "value2",
                    label: "Value 2"
                }],
                defaultValue: "value1",
                show: function (data) {
                    return data.prop.allComponents_Switch
                }
            },
            allComponents_Link: {
                label: "Link",
                ref: "prop.allComponents_Link",
                component: "link",
                url: "http://www.qlik.com/",
                show: function (data) {
                    return data.prop.allComponents_Switch
                }
            },
            allComponents_Radiobuttongroup: {
                type: "string",
                component: "radiobuttons",
                label: "Radio-buttons",
                ref: "prop.allComponents_Radiobuttongroup",
                options: [{
                    value: "value1",
                    label: "Value 1"
                }, {
                    value: "value2",
                    label: "Value 2"
                }],
                defaultValue: "value1",
                show: function (data) {
                    return data.prop.allComponents_Switch
                }
            },


        }
    };


    //SelectionMode
    var SelectionMode = {
        type: "items",
        label: "Selections",
        items: {
            SelectionModeDropdown: {
                type: "string",
                component: "dropdown",
                label: "Selection Mode",
                ref: "prop.SelectionMode",
                options: [{
                    value: "q",
                    label: "Quick"
                }, {
                    value: "c",
                    label: "Confirm"
                }],
                defaultValue: "c"
            }
        }
    };


    // Appearance section
    var appearanceSection = {
        uses: "settings",
        items: {
            AllComponents: AllComponents
        }
    };

    // Settings section
    var settingsSection = {
        type: "items",
        label: "Settings",
        items: {
            SelectionMode: SelectionMode
        }
    };

    // About section
    var aboutSection = {
        type: "items",
        label: "About",
        items: {
            Name: {
                label: 'Name: ' + JSON.parse(qext).name,
                component: 'text'
            },
            Version: {
                label: 'Version: ' + JSON.parse(qext).version,
                component: 'text'
            },
            Author: {
                label: 'Author: ' + JSON.parse(qext).author,
                component: 'text'
            },
            ID: {
                label: "Extension Id",
                component: "button",
                action: function (data) {
                    alert(data.qInfo.qId);
                }
            },

        }
    };


    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: {
                uses: "dimensions",
                min: 1,
                max: 1
            },
            measures: {
                uses: "measures",
                min: 1,
                max: 1
            },
            sorting: {
                uses: "sorting"
            },
            addons: {
                uses: "addons",
                items: {
                    dataHandling: {
                        uses: "dataHandling"
                    }
                }
            },
            appearance: appearanceSection,
            settings: settingsSection,
            about: aboutSection
        }
    };
});