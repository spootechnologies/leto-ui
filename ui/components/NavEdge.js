var NavEdge = {
    data: function() {
        return {
            global: global,
        }
    },
    methods: {

    },
    watch: {

    },
    created: function() {
        var self = this;


    },
    template: `
        <div v-if="global.step > 0" class="leto-edge-left leto-group leto-horizontal-center">
            <div @click="global.step = 1; global.subStep = 1" class="leto-bubble-wrapper">
                <div class="leto-bubble leto-border-darker-grey leto-click" :class="{'leto-border-black': (global.step == 1)}">

                </div>
                <label>Variables</label>
            </div>  
            <div @click="global.step = 2; global.subStep = 1" class="leto-bubble-wrapper">
                <div class="leto-bubble leto-border-darker-grey leto-click" :class="{'leto-border-black': (global.step == 2)}">

                </div>
                <label>Custom Variables</label>
            </div>  
            <div @click="global.step = 3; global.subStep = 1" class="leto-bubble-wrapper">
                <div class="leto-bubble leto-border-darker-grey leto-click" :class="{'leto-border-black': (global.step == 3)}">

                </div>
                <label>Elements</label>
            </div> 
            <div @click="global.step = 4; global.subStep = 1" class="leto-bubble-wrapper">
                <div class="leto-bubble leto-border-darker-grey leto-click" :class="{'leto-border-black': (global.step == 4)}">

                </div>
                <label>Custom Elements</label>
            </div>     
            <div @click="global.step = 5; global.subStep = 1" class="leto-bubble-wrapper">
                <div class="leto-bubble leto-border-darker-grey leto-click" :class="{'leto-border-black': (global.step == 5)}">

                </div>
                <label>Presets and Media Queries</label>
            </div>   
            <div @click="global.step = 6; global.subStep = 1" class="leto-bubble-wrapper">
                <div class="leto-bubble leto-border-darker-grey leto-click" :class="{'leto-border-black': (global.step == 6)}">

                </div>
                <label>Generate Settings</label>
            </div>   
            <div @click="global.step = 7; global.subStep = 1" class="leto-bubble-wrapper">
                <div class="leto-bubble leto-border-darker-grey leto-click" :class="{'leto-border-black': (global.step == 7)}">

                </div>
                <label>Finish</label>
            </div>           
        </div>
    `
}


Vue.component('nav-edge', NavEdge);