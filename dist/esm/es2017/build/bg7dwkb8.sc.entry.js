/*! Built with http://stenciljs.com */
import { h } from '../agc-breeding-date.core.js';

const oneDay = 24 * 60 * 60 * 1000;
const addDays = (dt, days) => {
    if (typeof dt === 'string') {
        dt = new Date(dt);
    }
    var newDate = new Date(dt);
    var nextDate = dt.getDate() + parseInt(days);
    newDate.setDate(nextDate);
    return newDate;
};
const inputDate = (date) => {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};
const formatDate = (date, sep = "/") => {
    let newDate = new Date(date);
    var dd = newDate.getDate();
    var mm = newDate.getMonth() + 1;
    var y = newDate.getFullYear();
    return `${mm}${sep}${dd}${sep}${y}`;
};
const daysBetween = (d1, d2) => {
    var firstDate = new Date(d1);
    var secondDate = new Date(d2);
    return Math.round((firstDate.getTime() - secondDate.getTime()) / (oneDay));
};

class AgcBreedingDate {
    constructor() {
        this.socket = "";
        this.tract = "";
        this.shadow = false;
        this.mode = 'step';
        this.currentStep = 0;
        this.cache = {};
        this.submitted = false;
        this.results = {};
    }
    render() {
        return (h("div", null,
            h("form", { onSubmit: (e) => e.preventDefault(), ref: c => this.form = c, "data-wizard": "agc-breeding-date", "data-wizard-mode": this.mode, class: `agc-wizard${this.shadow ? ' shadow' : ''}` },
                h("slot", null),
                h("section", { "data-wizard-section": "1" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.calving-date" }, "Calving Date"),
                        h("input", { name: "calvingDate", type: "date", required: true }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.calving-date.required", "data-validates": "calvingDate" }, "Please enter a valid date."),
                        h("p", { "data-i18n": "hints.calving-date" }, "\u2BA4 Enter the calving date of the cow or heifer.")),
                    this.mode === 'step' && (h("div", { class: "agc-wizard__actions" },
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16")))),
                h("section", { "data-wizard-section": "2" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.gestation-period" }, "Gestation Period"),
                        h("select", { name: "gestationPeriod" },
                            h("option", { value: "279", "data-i18n": "options.gestation-period.279" }, "279 Days"),
                            h("option", { value: "280", "data-i18n": "options.gestation-period.280" }, "280 Days"),
                            h("option", { value: "281", "data-i18n": "options.gestation-period.281" }, "281 Days"),
                            h("option", { value: "282", "data-i18n": "options.gestation-period.282" }, "282 Days"),
                            h("option", { value: "283", "data-i18n": "options.gestation-period.283", selected: true }, "283 Days"),
                            h("option", { value: "284", "data-i18n": "options.gestation-period.284" }, "284 Days"),
                            h("option", { value: "285", "data-i18n": "options.gestation-period.285" }, "285 Days"),
                            h("option", { value: "286", "data-i18n": "options.gestation-period.286" }, "286 Days"),
                            h("option", { value: "287", "data-i18n": "options.gestation-period.287" }, "287 Days")),
                        h("p", null, "\u2BA4 Select the number of days in the gestation period.")),
                    h("div", { class: "agc-wizard__actions" },
                        this.mode === 'step' && (h("button", { class: "agc-wizard__actions-back", "data-i18n": "actions.back", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back")),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.finish", onClick: this.nextPrev.bind(this, this.mode === 'step' ? 1 : 2) }, "Calculate \uD83E\uDC16"))),
                h("section", { "data-wizard-results": true },
                    h("slot", { name: "results" })))));
    }
    showTab(n) {
        if (this.mode === 'step') {
            this.cache['sections'][n].style.display = "block";
        }
        if (this.socket) {
            this.agcStepChanged.emit({ socket: this.socket, tract: this.tract, step: this.currentStep });
        }
    }
    reset() {
        this.currentStep = 0;
        this.submitted = false;
        this.showTab(0);
    }
    validateForm() {
        let valid = true;
        if (this.currentStep === 0 || this.mode === 'full') {
            let calvingDate = this.form.querySelector('[name="calvingDate"]');
            let calvingDateMessage = this.form.querySelector('[data-validates="calvingDate"');
            if (!calvingDate.checkValidity()) {
                valid = false;
                if (calvingDate.className.indexOf('invalid') === -1) {
                    calvingDate.className += " invalid";
                }
                calvingDateMessage.style.display = 'block';
            }
            else {
                calvingDate.className = calvingDate.className.replace(" invalid", "");
                calvingDateMessage.style.display = 'none';
            }
        }
        return valid;
    }
    nextPrev(n, e) {
        e && e.preventDefault();
        if (this.mode === 'full') {
            if (!this.validateForm())
                return false;
        }
        else if (n == 1 && !this.validateForm())
            return false;
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none";
        }
        this.currentStep = this.currentStep + n;
        if (this.currentStep >= this.cache['sections'].length) {
            this.submitted = true;
            this.showResults.call(this);
            return false;
        }
        this.showTab.call(this, this.currentStep);
    }
    showResults() {
        let calvingDate = this.form.querySelector('[name="calvingDate"').valueAsDate;
        let gestationPeriod = parseInt(this.form.querySelector('[name="gestationPeriod"]').value);
        let daysInPartition = Math.floor(gestationPeriod / 3);
        let breedingDate = addDays(calvingDate, -gestationPeriod);
        let daysTillBreeding = daysBetween(breedingDate, new Date());
        let daysTillCalving = daysBetween(calvingDate, new Date());
        let daysBred = daysBetween(new Date(), breedingDate);
        if (daysTillBreeding < 0)
            daysTillBreeding = 0;
        if (daysBred < 0)
            daysBred = 0;
        let calved = calvingDate <= new Date();
        let bred = daysBred > 0 && daysBred <= gestationPeriod;
        let firstPartition = {
            id: 'first',
            start: formatDate(addDays(breedingDate, 1), "/"),
            end: formatDate(addDays(breedingDate, daysInPartition), "/"),
            dayStart: 1,
            dayEnd: daysInPartition,
            isCurrent: daysBred <= daysInPartition
        };
        let secondPartition = {
            id: 'second',
            start: formatDate(addDays(breedingDate, daysInPartition + 1), "/"),
            end: formatDate(addDays(breedingDate, (daysInPartition * 2) + 1), "/"),
            dayStart: daysInPartition + 1,
            dayEnd: daysInPartition * 2,
            isCurrent: (daysBred >= daysInPartition + 1) && (daysBred <= (daysInPartition * 2) + 1)
        };
        let thirdPartition = {
            id: 'third',
            start: formatDate(addDays(breedingDate, 190), "/"),
            end: formatDate(calvingDate, "/"),
            dayStart: (daysInPartition * 2) + 1,
            dayEnd: gestationPeriod,
            isCurrent: daysBred >= 190
        };
        let current = [firstPartition, secondPartition, thirdPartition].filter(c => c.isCurrent);
        let results = {
            socket: this.socket,
            tract: this.tract,
            breedingDate: formatDate(breedingDate, "/"),
            daysTillBreeding: daysTillBreeding,
            gestationPeriod: gestationPeriod,
            calvingDate: formatDate(calvingDate, "/"),
            daysTillCalving: daysTillCalving,
            daysBred: daysBred,
            firstPartition: firstPartition,
            secondPartition: secondPartition,
            thirdPartition: thirdPartition,
            currentPartition: current.length ? current[0].id : '',
            calved: calved,
            bred: bred,
            inputs: {
                breedingDate: { text: 'Breeding Date', i18n: 'results.breeding-date', type: 'date', value: formatDate(breedingDate, "/") },
                gestationPeriod: { text: 'Gestation Period', i18n: 'results.gestation-period', type: 'number', value: gestationPeriod }
            },
            outputs: {
                calvingDate: { text: 'Calving Date', i18n: 'results.calving-date', type: 'date', value: formatDate(calvingDate, "/") },
                daysTillCalving: { text: 'Days until Calving', i18n: 'results.days-until-calving', type: 'number', value: daysTillCalving },
                daysBred: { text: 'Days Bred', i18n: 'results.days-bred', type: 'number', value: daysBred },
                firstPartition: { text: 'First Partition', i18n: 'results.first-partition', type: 'object', value: firstPartition, fields: {
                        start: { text: 'Start', i18n: 'results.start-date', type: 'date', value: firstPartition.start },
                        end: { text: 'End', i18n: 'results.end-date', type: 'date', value: firstPartition.end }
                    } },
                secondPartition: { text: 'Second Partition', i18n: 'results.second-partition', type: 'object', value: secondPartition, fields: {
                        start: { text: 'Start', i18n: 'results.start-date', type: 'date', value: secondPartition.start },
                        end: { text: 'End', i18n: 'results.end-date', type: 'date', value: secondPartition.end }
                    } },
                thirdPartition: { text: 'Third Partition', i18n: 'results.third-partition', type: 'object', value: thirdPartition, fields: {
                        start: { text: 'Start', i18n: 'results.start-date', type: 'date', value: thirdPartition.start },
                        end: { text: 'End', i18n: 'results.end-date', type: 'date', value: firstPartition.end }
                    } },
            }
        };
        if (this.socket) {
            this.agcCalculated.emit({ socket: this.socket, tract: this.tract, results: Object.assign({}, results) });
        }
        this.results = Object.assign({}, results);
        this.cache['results'].forEach(result => {
            result.style.display = 'block';
        });
    }
    handleAction(e) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }
    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c).map(c => c);
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c).map(c => c);
        this.cache = Object.assign({}, this.cache, { sections: sections, results: results });
        window.document.addEventListener('agcAction', this.handleAction.bind(this));
        this.form.querySelector('[name="calvingDate"]').defaultValue = inputDate(new Date());
        this.showTab(0);
    }
    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
    static get is() { return "agc-breeding-date"; }
    static get properties() { return {
        "cache": {
            "state": true
        },
        "currentStep": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "results": {
            "state": true
        },
        "shadow": {
            "type": Boolean,
            "attr": "shadow"
        },
        "socket": {
            "type": String,
            "attr": "socket"
        },
        "submitted": {
            "state": true
        },
        "tract": {
            "type": String,
            "attr": "tract"
        }
    }; }
    static get events() { return [{
            "name": "agcCalculated",
            "method": "agcCalculated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "agcStepChanged",
            "method": "agcStepChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "agc-breeding-date *{-webkit-box-sizing:border-box;box-sizing:border-box}agc-breeding-date form{width:var(--agc-form-width,100%);margin:var(--agc-form-margin,0 auto);border:var(--agc-form-border-size,0) var(--agc-form-border-style,solid) var(--agc-form-border-color,#ebebeb);border-radius:var(--agc-form-border-radius,0);padding:var(--agc-form-padding,0);background-color:var(--agc-form-bg-color,#fff);color:var(--agc-form-color,#333)}agc-breeding-date form.shadow{-webkit-box-shadow:var(--agc-form-box-shadow,0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23));-moz-box-shadow:var(--agc-form-box-shadow,0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23));box-shadow:var(--agc-form-box-shadow,0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23))}agc-breeding-date [data-wizard-mode=step] [data-wizard-results],agc-breeding-date [data-wizard-mode=step] [data-wizard-section]{display:none}agc-breeding-date .agc-wizard__field{padding:var(--agc-wizard-field-padding,10px)}agc-breeding-date label{text-transform:var(--agc-form-label-text-transform,none);display:var(--agc-form-label-display,block);width:var(--agc-form-label-width,100%);margin:var(--agc-form-label-margin,0 0 5px 0)}agc-breeding-date input[type=date],agc-breeding-date input[type=text],agc-breeding-date select{padding:var(--agc-form-input-padding,10px);width:var(--agc-form-input-width,100%);font-size:var(--agc-form-input-font-size,17px);font-family:var(--agc-form-input-font-family,Raleway);border:var(--agc-form-input-border-size,1px) var(--agc-form-input-border-style,solid) var(--agc-form-input-border-color,#aaa)}agc-breeding-date button{background-color:var(--agc-form-button-bg-color,#4caf50);color:var(--agc-form-button-color,#fff);border:var(--agc-form-button-border,none);padding:var(--agc-form-button-padding,10px 20px);margin:var(--agc-form-button-margin,0);font-size:var(--agc-form-button-font-size,17px);font-family:var(--agc-form-button-font-family,Raleway);cursor:var(--agc-form-button-cursor,pointer);text-transform:var(--agc-form-button-text-transform,inherit)}agc-breeding-date .agc-wizard__actions{background-color:var(--agc-wizard-actions-bg-color,transparent);border-radius:var(--agc-wizard-actions-border-radius,0);margin:var(--agc-wizard-actions-margin,10px 0 0);padding:var(--agc-wizard-actions-padding,0 10px 10px);zoom:1}agc-breeding-date .agc-wizard__actions:after,agc-breeding-date .agc-wizard__actions:before{content:\"\";display:table}agc-breeding-date .agc-wizard__actions:after{content:\"\";display:table;clear:both}agc-breeding-date .agc-wizard__actions.centered{text-align:var(--agc-form-actions-centered-text-align,center)}agc-breeding-date button.agc-wizard__actions-next{float:right}agc-breeding-date button.agc-wizard__actions-back{background-color:var(--agc-form-back-button-bg-color,#999);color:var(--agc-form-back-button-color,#fff)}agc-breeding-date button:hover{opacity:.8}agc-breeding-date .agc-wizard__validation-message{display:none;color:var(--agc-form-validation-message-color,maroon)}agc-breeding-date input.invalid{border-color:var(--agc-form-input-error-border-color,maroon);background-color:var(--agc-form-input-error-background-color,#ffe5e5);color:var(--agc-form-input-error-color,maroon)}"; }
}

export { AgcBreedingDate };
