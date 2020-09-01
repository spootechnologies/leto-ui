var Dashboard = {
    data: function() {
        return {
            global: global,
            letoGenerated: false
        };
    },
    methods: {
        createLetoFile: function() {
            var self = this;
            fetch('http://localhost:3000', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(global.letoData)
            })
                .then(function(response) {
                    console.log(response);
                    if(response.status == 201){
                        self.letoGenerated = true;
                    }
                    return response.json();
                })
                .then(function(response) {
                    console.log(response.files);
                    self.downloadZip('leto.zip', response.files);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        closeUI: function(){
            fetch('http://localhost:3000/exit', {
                method: 'POST',
                mode: 'no-cors',
                body: null
            })
            .then(function(response) {
                console.log('API closed!');
                alert()
                window.close();
            })
            .catch(function(error) {
                console.log("API couldn't be closed!");
                window.close();
            });
        },
        download: function(filename, data) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:application/zip;base64,' + data);
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        },
        downloadZip: function(filename, data) {
            var self = this;
            var zip = new JSZip();
            if (data.leto) {
                zip.file('leto.css', data.leto);
            }
            if (data.letoMin) {
                zip.file('leto.min.css', data.letoMin);
            }
            if (data.general) {
                zip.file('general.css', data.general);
            }
            if (data.generalMin) {
                zip.file('general.min.css', data.generalMin);
            }
            if (data.elements) {
                zip.file('elements.css', data.elements);
            }
            if (data.elementsMin) {
                zip.file('elements.min.css', data.elementsMin);
            }
            if (data.layout) {
                zip.file('layout.css', data.layout);
            }
            if (data.layoutMin) {
                zip.file('layout.min.css', data.layoutMin);
            }
            if (data.transformer) {
                zip.file('transformer.css', data.transformer);
            }
            if (data.transformerMin) {
                zip.file('transformer.min.css', data.transformerMin);
            }
            if (data.variables) {
                zip.file('variables.sass', data.variables);
            }
            zip.generateAsync({ type: 'base64' }).then(
                function(base64) {
                    //window.location = 'data:application/zip;base64,' + base64;
                    self.download('leto', base64);
                },
                function(err) {
                    console.log(err);
                }
            );
        }
    },
    watch: {},
    created: function() {
        var self = this;
    },
    template: `
        <div>
            <div v-if="!letoGenerated" class="leto-all-center leto-group leto-column" style="width: 100%; height: calc(100% - 92px)">
                <h1 class="leto-text-light">LETO Generator</h1>
                <div v-if="global.step == 0" @click="global.step = 1; global.subStep = 1" class="leto-button leto-border-black leto-min-width-lg">Start</div>
                <div v-if="global.step == 1"  style="width: 100%">
                    <div v-if="global.subStep-1 == subStepIndex" v-for="(subStep, subStepIndex) in global.letoData.variables" >
                        <div class="leto-group leto-all-center">
                            <h2 class="leto-text-light leto-text-center">{{subStep.name}}</h2>
                            <div v-if="subStep.info" class="leto-bubble-xs leto-border-darker-grey leto-click leto-border-black label" :data-label="subStep.info">?</div>
                        </div>
                        <div class="leto-overflow-y-auto leto-overflow-x-hidden" style="max-height: 60vh">
                            <div v-for="value in subStep.values" class="leto-group leto-vertical-center leto-mv-sm" style="width: 100%"> 
                                <label>{{value.name}}</label>
                                <input v-model="value.value" class="leto-input leto-mv-none leto-border-darker-grey leto-right" :type="value.inputType || 'text'" :placeholder="subStep.name">
                                <div v-if="value.allowed" class="leto-bubble-xs leto-border-darker-grey leto-click leto-border-black label" :data-label="value.allowed">✔</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="global.step == 2" class="leto-overflow-y-auto" style="width: 100%">
                    <h2 class="leto-text-light leto-text-center">No Custom Variables available right now.</h2>
                </div>
                <div v-if="global.step == 3" style="width: 100%">
                    <div v-if="global.subStep-1 == subStepIndex" v-for="(subStep, subStepIndex) in global.letoData.elements" >
                        <div class="leto-group leto-all-center">
                            <h2 class="leto-text-light leto-text-center">{{subStep.name}}</h2>
                            <div v-if="subStep.info" class="leto-bubble-xs leto-border-darker-grey leto-click leto-border-black" :title="subStep.info">?</div>
                        </div>
                        <div class="leto-overflow-y-auto leto-overflow-x-hidden" style="max-height: 60vh">
                            <div v-for="value in subStep.values" class="leto-group leto-vertical-center leto-mv-sm" style="width: 100%"> 
                                <label>{{value.name}}</label>
                                <input v-model="value.value" class="leto-input leto-mv-none leto-border-darker-grey leto-right" type="text" :placeholder="subStep.name">
                                <div v-if="value.allowed" class="leto-bubble-xs leto-border-darker-grey leto-click leto-border-black label" :data-label="value.allowed">✔</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="global.step == 4" class="leto-overflow-y-auto" style="width: 100%">
                    <h2 class="leto-text-light leto-text-center">No Custom Elements available right now.</h2>
                </div>
                <div v-if="global.step == 5" style="width: 100%">
                    <div v-if="global.subStep-1 == subStepIndex" v-for="(subStep, subStepIndex) in global.letoData.presetAndMQ" >
                        <div class="leto-group leto-all-center">
                            <h2 class="leto-text-light leto-text-center">{{subStep.name}}</h2>
                            <div v-if="subStep.info" class="leto-bubble-xs leto-border-darker-grey leto-click leto-border-black" :title="subStep.info">?</div>
                        </div>
                        <div class="leto-overflow-y-auto leto-overflow-x-hidden" style="max-height: 60vh">
                            <div v-for="value in subStep.values" class="leto-group leto-vertical-center leto-mv-sm" style="width: 100%"> 
                                <label>{{value.name}}</label>
                                <input v-model="value.value" class="leto-input-sm leto-mv-none leto-right" style="margin-right: 32px" type="checkbox" :placeholder="subStep.name">
                                <div v-if="value.allowed" class="leto-bubble-xs leto-border-darker-grey leto-click leto-border-black label" :data-label="value.allowed">✔</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="global.step == 6" style="width: 100%">
                    <div v-if="global.subStep-1 == subStepIndex" v-for="(subStep, subStepIndex) in global.letoData.generateSettings" >
                        <div class="leto-group leto-all-center">
                            <h2 class="leto-text-light leto-text-center">{{subStep.name}}</h2>
                            <div v-if="subStep.info" class="leto-bubble-xs leto-border-darker-grey leto-click leto-border-black" :title="subStep.info">?</div>
                        </div>
                        <div class="leto-overflow-y-auto leto-overflow-x-hidden" style="max-height: 60vh">
                            <div v-for="value in subStep.values" class="leto-group leto-vertical-center leto-mv-sm" style="width: 100%"> 
                                <label>{{value.name}}</label>
                                <input v-model="value.value" class="leto-input-sm leto-mv-none leto-right" style="margin-right: 32px" type="checkbox" :placeholder="subStep.name">
                                <div v-if="value.allowed" class="leto-bubble-xs leto-border-darker-grey leto-click leto-border-black label" :data-label="value.allowed">✔</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="global.step > 0 && global.step < 7" class="leto-group">
                    <div v-if="global.subStep == 1" @click="global.step--; global.subSteo = 1" class="leto-button leto-border-darker-grey leto-min-width-lg">Back</div>
                    <div v-if="global.subStep != 1" @click="global.subStep--" class="leto-button leto-border-darker-grey leto-min-width-lg">Back</div>
                    <div v-if="global.subStep == global.stepsMap[global.step-1]" @click="global.step++; global.subStep = 1" class="leto-button leto-border-black leto-min-width-lg">Next</div>
                    <div v-if="global.subStep != global.stepsMap[global.step-1]" @click="global.subStep++" class="leto-button leto-border-black leto-min-width-lg">Next</div>
                </div>
                <div v-if="global.step == 7" class="leto-group">
                    <div @click="global.step--; global.subSteo = 1" class="leto-button leto-border-darker-grey leto-min-width-lg">Back</div>
                    <div @click="createLetoFile()" class="leto-button leto-border-black leto-min-width-lg">Generate Leto file</div>
                </div>
            </div>
            <div v-else class="leto-all-center leto-group leto-column" style="width: 100%; height: calc(100% - 92px)">
                <h1 class="leto-text-light">LETO successful generated</h1>
                <h2 class="leto-text-light leto-text-center">Download...</h2>
                <div class="leto-group">
                    <div @click="letoGenerated = false" class="leto-button leto-border-darker-grey leto-min-width-lg">Back</div>
                    <div @click="closeUI()" class="leto-button leto-border-black leto-min-width-lg">Close UI</div>
                </div>
            </div>
        </div>
    `
};

Vue.component('dashboard', Dashboard);
