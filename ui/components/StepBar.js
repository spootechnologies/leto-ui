var StepBar = {
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
        <div v-if="global.step > 0" class="leto-group leto-horizontal-center"> 
            <div v-for="step in global.stepsMap[global.step-1]" @click="global.subStep = step" class="leto-bubble leto-border-darker-grey leto-click" :class="{'leto-border-black': (global.subStep == step)}">{{step}}</div>
        </div>
    `
}


Vue.component('step-bar', StepBar);