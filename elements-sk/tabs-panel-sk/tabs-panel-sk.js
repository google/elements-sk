// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @module elements-sk/tabs-panel-sk
 * @description <h2><code>tabs-panel-sk</code></h2>
 *
 * <p>
 *   See the description of [tabs-sk]{@link module:elements-sk/tabs-sk}.
 * </p>
 *
 * @attr selected - The index of the tab panel to display.
 *
 */
import { upgradeProperty } from 'common-sk/modules/upgradeProperty';

window.customElements.define('tabs-panel-sk', class extends HTMLElement {
  static get observedAttributes() {
    return ['selected'];
  }

  connectedCallback() {
    upgradeProperty(this, 'selected');
  }

  /** @prop {boolean} selected Mirrors the 'selected' attribute. */
  get selected() { return this.hasAttribute('selected'); }
  set selected(val) {
    this.setAttribute('selected', val);
    this._select(val);
  }

	attributeChangedCallback(name, oldValue, newValue) {
    this._select(+newValue);
	}

  _select(index) {
    for (let i=0; i<this.children.length; i++) {
      this.children[i].classList.toggle('selected', i === index);
    }
  }
});
