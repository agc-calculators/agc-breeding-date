/*! Built with http://stenciljs.com */
import { h } from '../agc-breeding-date.core.js';

class AgcBreedingDateResults {
    constructor() {
        this.socket = "";
        this.ready = false;
    }
    render() {
        return (h("section", { "data-wizard-results": true },
            h("div", { style: { display: this.ready ? 'none' : 'block' } },
                h("slot", { name: "empty" })),
            h("div", { style: { display: this.ready ? 'block' : 'none' } }, this.data && (h("ul", { class: "agc-results" },
                h("li", null,
                    h("h2", { "data-i18n": "results.breeding-date" }, "Breeding Date"),
                    h("span", null, this.data['breedingDate'])),
                !this.data['bred'] && !this.data['calved'] && (h("li", null,
                    h("h2", { "data-i18n": "results.days-until-breeding" }, "Days Until Breeding"),
                    h("span", null, this.data['daysTillBreeding']),
                    h("sub", { "data-i18n": "results.days" }, "Days"))),
                this.data['bred'] && (h("li", null,
                    h("h2", { "data-i18n": "results.days-bred" }, "Days Bred"),
                    h("span", null, this.data['daysBred']),
                    h("sub", { "data-i18n": "results.days" }, "Days"))),
                h("li", null,
                    h("h2", { "data-i18n": "results.first-partition-begins" }, "First Partition Begins"),
                    h("span", null, this.data['firstPartition'].start)),
                h("li", null,
                    h("h2", { "data-i18n": "results.second-partition-begins" }, "Second Partition Begins"),
                    h("span", null, this.data['secondPartition'].start)),
                h("li", null,
                    h("h2", { "data-i18n": "results.third-partition-begins" }, "Third Partition Begins"),
                    h("span", null, this.data['thirdPartition'].start)))))));
    }
    handleResults(e) {
        if (e.detail['socket'] !== this.socket) {
            return;
        }
        this.data = Object.assign({}, e.detail['results']);
        this.ready = true;
    }
    componentDidLoad() {
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }
    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
    static get is() { return "agc-breeding-date-results"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "ready": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        }
    }; }
    static get style() { return "agc-breeding-date-results section{font-size:var(--agc-form-results-font-size,22px);text-align:var(--agc-form-results-text-align,left)}agc-breeding-date-results *,agc-breeding-date-results :after,agc-breeding-date-results :before{-webkit-box-sizing:border-box;box-sizing:border-box}agc-breeding-date-results .results-box{position:relative;margin:var(--results-box-margin,5px 0 0);padding:var(--results-box-padding,20px 5px 5px);-ms-flex-pack:var(--results-box-justify,center);justify-content:var(--results-box-justify,center);-ms-flex-align:var(--results-box-align,center);align-items:var(--results-box-align,center);color:var(--results-box-text-color,#595959);font-size:var(--results-box-font-size,36px);font-weight:var(--results-box-font-weight,700);background-color:var(--results-box-background-color,#fff);border:var(--results-box-border,1px solid #ebebeb)}agc-breeding-date-results .results-box>label:first-child{color:var(--results-box-label-color,#828282)}agc-breeding-date-results .results-box:after,agc-breeding-date-results .results-box:before{position:absolute;left:0;width:100%;font-weight:300;color:#89867e;text-transform:var(--results-label-text-transform,uppercase);letter-spacing:var(--results-label-letter-spacing,1px)}agc-breeding-date-results .results-box:before{content:attr(data-label);top:0;padding:5px 0 0 10px;font-size:var(--results-label-font-size,12px)}agc-breeding-date-results ul.agc-results{margin:0;padding:var(--agc-results-padding,10px)}agc-breeding-date-results ul.agc-results li{margin:0 0 16px 0;list-style-type:none}agc-breeding-date-results ul.agc-results h2{font-size:var(--agc-results-heading-font-size,14px);background:var(--agc-results-heading-background-color,#f1f1f1);color:var(--agc-results-heading-color,#333);padding:var(--agc-results-heading-padding,0 0 0 6px);margin:var(--agc-results-heading-margin,0 0 8px 0);-webkit-border-radius:4px;-moz-border-radius:4px;-ms-border-radius:4px;border-radius:4px;line-height:2}agc-breeding-date-results ul.agc-results span{font-size:var(--agc-results-value-font-size,42px);font-weight:var(--agc-results-value-font-weight,bold);line-height:var(--agc-results-value-line-height,1)}agc-breeding-date-results ul.agc-results sub{position:relative;bottom:5px;font-size:var(--agc-results-sub-font-size,18px);margin-left:5px}"; }
}

export { AgcBreedingDateResults };
