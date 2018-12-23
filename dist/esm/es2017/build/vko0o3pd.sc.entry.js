/*! Built with http://stenciljs.com */
import { h } from '../agc-breeding-date.core.js';

class AgcBreedingDateProgress {
    constructor() {
        this.socket = "";
        this.currentStep = -1;
    }
    render() {
        return (h("div", { ref: c => this.progress = c, class: "wizard__progress" },
            h("span", { class: `step${this.currentStep > 0 ? ' finish' : ''}${this.currentStep === 0 ? ' active' : ''}` }),
            h("span", { class: `step${this.currentStep > 1 ? ' finish' : ''}${this.currentStep === 1 ? ' active' : ''}` })));
    }
    componentDidLoad() {
        window.document.addEventListener('agcStepChanged', this.agcStepChangedHandler.bind(this));
        window.document.addEventListener('agcCalculated', this.agcCalculatedHandler.bind(this));
    }
    agcStepChangedHandler(event) {
        if (event.detail['socket'] !== this.socket) {
            return;
        }
        this.currentStep = parseInt(event.detail['step']);
        this.progress.classList.remove('complete');
    }
    agcCalculatedHandler(event) {
        if (event.detail['socket'] !== this.socket) {
            return;
        }
        this.currentStep = 2;
        this.progress.classList.add('complete');
    }
    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.agcCalculatedHandler);
        window.document.removeEventListener('agcStepChanged', this.agcStepChangedHandler);
    }
    static get is() { return "agc-breeding-date-progress"; }
    static get properties() { return {
        "currentStep": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        }
    }; }
    static get style() { return "agc-breeding-date-progress *{-webkit-box-sizing:border-box;box-sizing:border-box}agc-breeding-date-progress .wizard__progress{text-align:var(--agc-step-progress-text-align,center);margin:var(--agc-step-progress-margin,40px 0 0)}agc-breeding-date-progress .wizard__progress.complete{display:var(--agc-step-progress-complete-display,none)}agc-breeding-date-progress .step{height:var(--agc-step-progress-height,15px);width:var(--agc-step-progress-width,15px);margin:var(--agc-step-progress-margin,0 2px);background-color:var(--agc-step-progress-bg-color,#bbb);border:var(--agc-step-progress-border,none);border-radius:var(--agc-step-progress-border-radius,50%);display:var(--agc-step-progress-display,inline-block);opacity:var(--agc-step-progress-opacity,.5)}agc-breeding-date-progress .step.active{opacity:1}agc-breeding-date-progress .step.finish{background-color:var(--agc-step-progress-finish-bg-color,#4caf50)}"; }
}

export { AgcBreedingDateProgress };
