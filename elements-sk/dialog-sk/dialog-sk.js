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
 * @module elements-sk/dialog-sk
 * @description <h2><code>dialog-sk</code></h2>
 *
 * <p>
 *   A custom elment that creates a dialog centered in the window.
 *   Pressing the ESC key will cause the dialog to close.
 * </p>
 *
 * @example
 *
 * <dialog-sk id=dialog>
 *   <p>This is a dialog.</p>
 *   <button onclick="this.parentElement.shown = false;">Close</button>
 * </dialog-sk>
 *
 * @attr shown - A boolean attribute that is present when the dialog is shown.
 *            and absent when it is hidden.
 *
 * @evt closed - This event is generated when the dialog is closed.
 */
window.customElements.define('dialog-sk', class extends HTMLElement {
  static get observedAttributes() {
    return ['shown'];
  }

  /** @prop {boolean} shown Mirrors the shown attribute. */
  get shown() { return this.hasAttribute('shown'); }
  set shown(val) {
    if (val) {
      this.setAttribute('shown', '');
    } else {
      this.removeAttribute('shown');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== null) {
      window.addEventListener('keydown', this);
    } else {
      window.removeEventListener('keydown', this);
      this.dispatchEvent(new CustomEvent('closed', { bubbles: true }));
    }
  }

  handleEvent(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      this.shown = false;
    }
  }
});
