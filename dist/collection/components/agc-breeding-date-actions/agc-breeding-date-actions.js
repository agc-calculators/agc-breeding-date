export class AgcBreedingDateActions {
    render() {
        return (h("div", { class: "agc-actions" }, this.results && h("agc-action", { "action-type": "calendar", "action-text": "Add to Calendar", "action-slug": "agc-breeding-date", "action-tract": this.tract, "action-text-i18n": "actions.add-to-calendar", "action-payload": JSON.stringify(this.results || {}) })));
    }
    agcCalculatedHandler(event) {
        if (event.detail['socket'] !== this.socket) {
            return;
        }
        this.results = Object.assign({}, event.detail, { socket: this.socket });
    }
    componentDidLoad() {
        window.document.addEventListener('agcCalculated', this.agcCalculatedHandler.bind(this));
    }
    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.agcCalculatedHandler);
    }
    static get is() { return "agc-breeding-date-actions"; }
    static get properties() { return {
        "results": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        },
        "tract": {
            "type": String,
            "attr": "tract"
        }
    }; }
    static get style() { return "/**style-placeholder:agc-breeding-date-actions:**/"; }
}
