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
 * @module elements-sk/tabs-sk
 * @description <h2><code>tabs-sk</code></h2>
 *
 * <p>
 * The tabs-sk custom element declaration, used in conjunction with button and
 * the [tabs-panel-sk]{@link module:elements-sk/tabs-panel-sk} element
 * allows you to create tabbed interfaces. The association between the buttons
 * and the tabs displayed in [tabs-panel-sk]{@link module:elements-sk/tabs-panel-sk}
 * is document order, i.e. the first button shows the first panel, second
 * button shows second panel, etc.
 * </p>
 *
 * @example
 *
 * <tabs-sk>
 *   <button class=selected>Query</button>
 *   <button>Results</button>
 * </tabs-sk>
 * <tabs-panel-sk>
 *   <div>
 *     This is the query tab.
 *   </div>
 *   <div>
 *     This is the results tab.
 *   </div>
 * </tabs-panel-sk>
 *
 * @attr selected - The index of the selected tab.
 *
 * @evt tab-selected-sk - Event sent when the user clicks on a tab. The events
 *        value of detail.index is the index of the selected tab.
 *
 */
import { define } from '../define'
import { upgradeProperty } from '../upgradeProperty';

define('tabs-sk', class extends HTMLElement {
  static get observedAttributes() {
    return ['selected'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', this);
    this.select(0, false)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this);
  }

  handleEvent(e) {
    e.stopPropagation();
    this.querySelectorAll('button').forEach((ele, i) => {
      if (ele === e.target) {
        this.select(i, true);
      }
    });
  }

    /** @prop selected {string} - Reflects the 'selected' attribute.  */
    get selected() { return this.getAttribute('selected'); }
    set selected(val) { this.setAttribute('selected', +val); }

  /**
   * Force the selection of a tab
   *
   * @param {number} index The index of the tab to select.
   * @param {boolean} [trigger=false] If true then trigger the 'tab-selected-sk' event.
   */
  select(index, trigger=false) {
    this.setAttribute('selected', index)
    this.querySelectorAll('button').forEach((ele, i) => {
      ele.classList.toggle('selected', i === index);
    });
    this._trigger(index, trigger);
  }

  _trigger(index, trigger) {
    if (trigger) {
      this.dispatchEvent(new CustomEvent('tab-selected-sk', { bubbles: true, detail: { index: index }}));
    }
    if (this.nextElementSibling.tagName === 'TABS-PANEL-SK') {
      this.nextElementSibling.setAttribute('selected', index);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue == newValue) {
      return
    }
    this.select(+newValue, false);
  }
});
