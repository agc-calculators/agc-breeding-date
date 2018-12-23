import { Component, Prop, State } from '@stencil/core';

@Component({
    tag: 'agc-breeding-date-actions',
    styleUrl: 'agc-breeding-date-actions.css'
})
export class AgcBreedingDateActions {

    @Prop() socket: string
    @Prop() tract: string
    @State() results: any

    render() {
        return (
            <div class="agc-actions">
                {this.results && <agc-action 
                    action-type="calendar" 
                    action-text="Add to Calendar"
                    action-slug="agc-breeding-date"
                    action-tract={this.tract}
                    action-text-i18n="actions.add-to-calendar"
                    action-payload={JSON.stringify(this.results || {})}>
                </agc-action>}
            </div>
        );
    }

    agcCalculatedHandler(event: CustomEvent) {
        if (event!.detail['socket'] !== this.socket) { return; }
        this.results = { ...event.detail, socket: this.socket};
    }

    componentDidLoad() {
        // Global events allow the control to be separated from the form...
        window.document.addEventListener('agcCalculated', this.agcCalculatedHandler.bind(this));
    }

    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.agcCalculatedHandler);
    }
}
