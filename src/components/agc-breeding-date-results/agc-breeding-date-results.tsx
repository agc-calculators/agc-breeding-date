import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'agc-breeding-date-results',
    styleUrl: 'agc-breeding-date-results.css'
})
export class AgcBreedingDateResults {
    @Prop() socket: string = ""
    @State() data: any
    @State() ready: boolean = false

    render() {
        return (
            <section data-wizard-results>
                <div style={{display: this.ready ? 'none' : 'block'}}>
                    <slot name="empty"></slot>
                </div>

                <div style={{display: this.ready ? 'block' : 'none'}}>
                    {this.data && (<ul class="agc-results">
                            <li>
                                <h2 data-i18n="results.breeding-date">Breeding Date</h2>
                                <span>{this.data['breedingDate']}</span>
                            </li>
                            {!this.data['bred'] && !this.data['calved'] && (<li>
                                <h2 data-i18n="results.days-until-breeding">Days Until Breeding</h2>
                                <span>{this.data['daysTillBreeding']}</span>
                                <sub data-i18n="results.days">Days</sub>
                            </li>)}
                            {this.data['bred'] && (<li>
                                <h2 data-i18n="results.days-bred">Days Bred</h2>
                                <span>{this.data['daysBred']}</span>
                                <sub data-i18n="results.days">Days</sub>
                            </li>)}
                            <li>
                                <h2 data-i18n="results.first-partition-begins">First Partition Begins</h2>
                                <span>{this.data['firstPartition'].start}</span>
                            </li>
                            <li>
                                <h2 data-i18n="results.second-partition-begins">Second Partition Begins</h2>
                                <span>{this.data['secondPartition'].start}</span>
                            </li>
                            <li>
                                <h2 data-i18n="results.third-partition-begins">Third Partition Begins</h2>
                                <span>{this.data['thirdPartition'].start}</span>
                            </li>                            
                        </ul>)}
                </div>
            </section>
        );
    }

    handleResults(e:CustomEvent) {
        if (e.detail['socket'] !== this.socket) { return; }
        this.data = {...e.detail['results']};
        this.ready = true;
    }

    componentDidLoad() {
        // Global events allow the control to be separated from the form...
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }

    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
}
