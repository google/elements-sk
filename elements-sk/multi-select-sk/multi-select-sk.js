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

/** @module elements-sk/multi-select-sk
 *
 * @description <h2><code>multi-select-sk</code></h2>
 *
 * <p>
 *   Clicking on the children will cause them to be selected.
 * </p>
 *
 * <p>
 *   The multi-select-sk elements monitors for the addition and removal of child
 *   elements and will update the 'selected' property as needed. Note that it
 *   does not monitor the 'selected' attribute of child elements, and will not
 *   update the 'selected' property if they are changed directly.
 * </p>
 *
 * @example
 *
 *   <multi-select-sk>
 *     <div></div>
 *     <div></div>
 *     <div selected></div>
 *     <div></div>
 *     <div selected></div>
 *   </multi-select-sk>
 *
 * @evt selection-changed - Sent when an item is clicked and the selection is changed.
 *   The detail of the event contains the indices of the children elements:
 *
 *   <pre>
 *     detail: {
 *       selection: [2,4],
 *     }
 *   </pre>
 *
 */
import { define } from '../define';
import { upgradeProperty } from '../upgradeProperty';

define('multi-select-sk', class extends HTMLElement {
  constructor() {
    super();
    // Keep _selection up to date by monitoring DOM changes.
    this._obs = new MutationObserver(() => this._bubbleUp());
    this._selection = [];
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

  /** @prop {Boolean} disabled - whether this element should respond to input. */
  get disabled() { return this.hasAttribute('disabled'); }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
      this.selection = [];
    } else {
      this.removeAttribute('disabled');
      this._bubbleUp();
    }
  }

  /** @prop {Array} selection - A sorted array of indices that are selected
   *                or [] if nothing is selected. If selection is set to a
   *                not sorted array, it will be sorted anyway.
   */
  get selection() { return this._selection; }

  set selection(val) {
    if (this.disabled) {
      return;
    }
    if (!val || !val.sort) {
      val = [];
    }
    val.sort();
    this._selection = val;
    this._rationalize();
  }

  _click(e) {
    if (this.disabled) {
      return;
    }
    // Look up the DOM path until we find an element that is a child of
    // 'this', and set _selection based on that.
    let target = e.target;
    while (target && target.parentElement !== this) {
      target = target.parentElement;
    }
    if (!target || target.parentElement !== this) {
      return; // not a click we care about
    }
    if (target.hasAttribute('selected')) {
      target.removeAttribute('selected');
    } else {
      target.setAttribute('selected', '');
    }
    this._bubbleUp();
    this.dispatchEvent(new CustomEvent('selection-changed', {
      detail: {
        selection: this._selection,
      },
      bubbles: true,
    }));
  }

  // Loop over all immediate child elements update the selected attributes
  // based on the selected property of this selement.
  _rationalize() {
    // assume this.selection is sorted when this is called.
    let s = 0;
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].getAttribute('tabindex') == null) {
        this.children[i].setAttribute('tabindex', '0');
      }
      if (this._selection[s] === i) {
        this.children[i].setAttribute('selected', '');
        s++;
      } else {
        this.children[i].removeAttribute('selected');
      }
    }
  }

  // Loop over all immediate child elements and find all with the selected
  // attribute.
  _bubbleUp() {
    this._selection = [];
    if (this.disabled) {
      return;
    }
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].hasAttribute('selected')) {
        this._selection.push(i);
      }
    }
    this._rationalize();
  }
});
