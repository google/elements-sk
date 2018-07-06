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
 * @module elements-sk/spinner-sk
 * @decription <h2><code>spinner-sk</code></h2>
 *
 * <p>
 *   An activity spinner.
 * </p>
 *
 * @attr active - Boolean attribute, if present, spinner is active.
 *
 */
import { upgradeProperty } from 'common-sk/modules/upgradeProperty'

window.customElements.define('spinner-sk', class extends HTMLElement {
  // TODO(jcgregorio) What is ARIA for a spinner?
  connectedCallback() {
    upgradeProperty(this, 'active');
  }

  /** @prop {boolean} active Mirrors the attribute 'active'. */
  get active() { return this.hasAttribute('active'); }
  set active(val) {
    if (val) {
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }
  }
});
