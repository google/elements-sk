/* This is a generated file!
 *   SVG path data from https://github.com/google/material-design-icons used
 *   under an Apache 2.0 license.
 *
 *   Copyright 2018 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import './icon-sk.css';
import { define } from '../define';

const iconSkTemplate = document.createElement('template');
iconSkTemplate.innerHTML = '<svg class="icon-sk-svg" xmlns="http://www.w3.org/2000/svg" width=24 height=24 viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>';

define('build-icon-sk', class extends HTMLElement {
	connectedCallback() {
	const icon = iconSkTemplate.content.cloneNode(true);
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
		this.appendChild(icon);
	}
});