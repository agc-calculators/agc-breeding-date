export class AgcBreedingDateResults {
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
    static get style() { return "/**style-placeholder:agc-breeding-date-results:**/"; }
}
