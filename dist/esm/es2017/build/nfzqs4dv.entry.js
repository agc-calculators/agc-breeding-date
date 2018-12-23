/*! Built with http://stenciljs.com */
import { h } from '../agc-breeding-date.core.js';

class AgcBreedingDateAction {
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
    static get style() { return "agc-breeding-date-action button[class^=agc-wizard__actions-]{background-color:var(--agc-action-button-bg-color,#4caf50);color:var(--agc-action-button-color,#fff);border:var(--agc-action-button-border,none);padding:var(--agc-action-button-padding,10px 20px);margin:var(--agc-action-button-margin,0);font-size:var(--agc-action-button-font-size,17px);font-family:var(--agc-action-button-font-family,Raleway);cursor:var(--agc-action-button-cursor,pointer);text-transform:var(--agc-action-button-text-transform,inherit)}"; }
}

export { AgcBreedingDateAction };
