/*! Built with http://stenciljs.com */
import { h } from '../agc-breeding-date.core.js';

class AgcBreedingDateResultsPlaceholder {
    render() {
        const placeholder = () => h("span", null,
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }));
        return (h("section", null,
            h("ul", { class: "agc-results-placeholder" },
                h("li", null,
                    h("h2", { "data-i18n": "results.breeding-date" }, "Breeding Date"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.days-until-calving" }, "Days until Breeding"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.first-partition-begins" }, "First Partition Begins"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.second-partition-begins" }, "Second Partition Begins"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.third-partition-begins" }, "Third Partition Begins"),
                    placeholder()))));
    }
    static get is() { return "agc-breeding-date-results-placeholder"; }
    static get style() { return "agc-breeding-date-results-placeholder section{font-size:var(--agc-form-results-font-size,22px);text-align:var(--agc-form-results-text-align,left)}agc-breeding-date-results-placeholder *,agc-breeding-date-results-placeholder :after,agc-breeding-date-results-placeholder :before{-webkit-box-sizing:border-box;box-sizing:border-box}agc-breeding-date-results-placeholder ul.agc-results-placeholder{margin:0;padding:var(--agc-results-padding,10px)}agc-breeding-date-results-placeholder ul.agc-results-placeholder li{margin:0 0 16px 0;list-style-type:none}agc-breeding-date-results-placeholder ul.agc-results-placeholder h2{font-size:var(--agc-results-heading-font-size,14px);background:var(--agc-results-heading-background-color,#f1f1f1);color:var(--agc-results-heading-color,#333);padding:var(--agc-results-heading-padding,0 0 0 6px);margin:var(--agc-results-heading-margin,0 0 8px 0);-webkit-border-radius:4px;-moz-border-radius:4px;-ms-border-radius:4px;border-radius:4px;line-height:2}agc-breeding-date-results-placeholder ul.agc-results-placeholder span{font-size:var(--agc-results-value-font-size,42px);font-weight:var(--agc-results-value-font-weight,bold);line-height:var(--agc-results-value-line-height,1)}agc-breeding-date-results-placeholder .mark{height:var(--agc-step-progress-height,15px);width:var(--agc-step-progress-width,15px);margin:var(--agc-step-progress-margin,0 2px);background-color:var(--agc-step-progress-bg-color,#bbb);border:var(--agc-step-progress-border,none);border-radius:var(--agc-step-progress-border-radius,50%);display:var(--agc-step-progress-display,inline-block);opacity:var(--agc-step-progress-opacity,.5);position:relative;top:-5px}"; }
}

export { AgcBreedingDateResultsPlaceholder };
