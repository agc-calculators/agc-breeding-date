
// AgcBreedingDate: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './agc-breeding-date.core.js';
import {
  AgcBreedingDate,
  AgcBreedingDateAction,
  AgcBreedingDateActions,
  AgcBreedingDateProgress,
  AgcBreedingDateResults,
  AgcBreedingDateResultsPlaceholder
} from './agc-breeding-date.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    AgcBreedingDate,
    AgcBreedingDateAction,
    AgcBreedingDateActions,
    AgcBreedingDateProgress,
    AgcBreedingDateResults,
    AgcBreedingDateResultsPlaceholder
  ], opts);
}
