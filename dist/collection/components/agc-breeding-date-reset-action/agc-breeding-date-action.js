export class AgcBreedingDateAction {
    constructor() {
        this.socket = "";
        this.action = 'reset';
        this.actionText = "⟳ Start Over";
    }
    render() {
        return (h("button", { class: `agc-wizard__actions-${this.action}`, onClick: this.doAction.bind(this) }, this.actionText));
    }
    doAction(e) {
        e && e.preventDefault();
        if (!this.socket) {
            return;
        }
        this.agcAction.emit({ socket: this.socket, action: this.action });
    }
    static get is() { return "agc-breeding-date-action"; }
    static get properties() { return {
        "action": {
            "type": String,
            "attr": "action"
        },
        "actionText": {
            "type": String,
            "attr": "action-text"
        },
        "socket": {
            "type": String,
            "attr": "socket"
        }
    }; }
    static get events() { return [{
            "name": "agcAction",
            "method": "agcAction",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:agc-breeding-date-action:**/"; }
}
