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

/** @module elements-sk/select-sk
 *
 * @description <h2><code>select-sk</code></h2>
 *
 * <p>
 *   Clicking on the children will cause them to be selected.
 * </p>
 *
 * <p>
 *   The select-sk elements monitors for the addition and removal of child
 *   elements and will update the 'selected' property as needed. Note that it
 *   does not monitor the 'selected' attribute of child elements, and will not
 *   update the 'selected' property if they are changed directly.
 * </p>
 *
 * @example
 *
 *   <select-sk>
 *     <div></div>
 *     <div></div>
 *     <div selected></div>
 *     <div></div>
 *   </select-sk>
 *
 * @evt selection-changed - Sent when an item is clicked and the selection is changed.
 *   The detail of the event contains the child element index:
 *
 *   <pre>
 *     detail: {
 *       selection: 1,
 *     }
 *   </pre>
 *
 */
import { upgradeProperty } from '../upgradeProperty'

window.customElements.define('select-sk', class extends HTMLElement {
  constructor() {
    super();
    // Keep _selection up to date by monitoring DOM changes.
    this._obs = new MutationObserver(() => this._bubbleUp());
    this._selection = -1;
  }

  connectedCallback() {
    upgradeProperty(this, 'selection');
    upgradeProperty(this, 'disabled');
    this.addEventListener('click', this._click);
    this._obs.observe(this, {
      childList: true,
    });
    this._bubbleUp();
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._click);
    this._obs.disconnect();
  }

  /** @prop {Boolean} disabled - whether this element should respond to input.*/
  get disabled() { return this.hasAttribute('disabled'); }
  set disabled(val) {
    if (!!val) {
      this.setAttribute('disabled', '');
      this.selection = -1;
    } else {
      this.removeAttribute('disabled');
      this._bubbleUp();
    }
  }

  /** @prop {Number} selection The index of the item selected. Has a
   *                 value of -1 if nothing is selected.
   */
  get selection() { return this._selection; }
  set selection(val) {
    if (this.disabled) {
      return;
    }
    if (val === undefined || val === null) {
      val = -1;
    }
    this._selection = +val;
    this._rationalize();
  }

  _click(e) {
    if (this.disabled) {
      return;
    }
    let oldIndex = this._selection;
    // Look up the DOM path until we find an element that is a child of
    // 'this', and set _selection based on that.
    let target = e.target;
    while (target && target.parentElement !== this) {
      target = target.parentElement;
    }
    if (target && target.parentElement === this) {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i] === target) {
          this._selection = i;
          break;
        }
      }
    }
    this._rationalize();
    if (oldIndex != this._selection) {
      this.dispatchEvent(new CustomEvent('selection-changed', {
        detail: {
          selection: this._selection,
        },
        bubbles: true,
      }));
    }
  }

  // Loop over all immediate child elements and make sure at most only one is selected.
  _rationalize() {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].getAttribute('tabindex') == null) {
        this.children[i].setAttribute('tabindex', '0');
      }
      if (this._selection === i) {
        this.children[i].setAttribute('selected', '');
      } else {
        this.children[i].removeAttribute('selected');
      }
    }
  }

  // Loop over all immediate child elements and find the first one selected.
  _bubbleUp() {
    this._selection = -1;
    if (this.disabled) {
      return;
    }
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].hasAttribute('selected')) {
        this._selection = i;
        break;
      }
    }
    this._rationalize();
  }
});
