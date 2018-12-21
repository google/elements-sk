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

import './index.js'
import '../tabs-panel-sk/index.js'

let container = document.createElement("div");
document.body.appendChild(container);

afterEach(function() {
  container.innerHTML = "";
});

describe('tabs-sk', function() {
  it('has selected attribute', function() {
    return Promise.all([customElements.whenDefined('tabs-sk'), customElements.whenDefined('tabs-panel-sk')]).then(() => {
      container.innerHTML = `
        <tabs-sk>
          <button>One</button>
          <button>Two</button>
        </tabs-sk>
        <tabs-panel-sk>
          <section id=panel1></section>
          <section id=panel2></section>
        </tabs-panel-sk>
        `;
      let s = container.firstElementChild;
      assert.equal(0, s.getAttribute('selected'));
      s.setAttribute('selected', 1);
      assert.equal(1, s.getAttribute('selected'));
      let panel1 = container.querySelector('#panel1');
      let panel2 = container.querySelector('#panel2');
      assert.isNotNull(panel2);
      assert.isFalse(panel1.classList.contains('selected'));
      assert.isTrue(panel2.classList.contains('selected'));
    });
  }); // has selected attribute

  it('has selected property', function() {
    return Promise.all([customElements.whenDefined('tabs-sk'), customElements.whenDefined('tabs-panel-sk')]).then(() => {
      container.innerHTML = `
        <tabs-sk>
          <button>One</button>
          <button>Two</button>
        </tabs-sk>
        <tabs-panel-sk>
          <section id=panel1></section>
          <section id=panel2></section>
        </tabs-panel-sk>
        `;
      let s = container.firstElementChild;
      assert.equal(0, s.selected);
      s.selected = 1;
      assert.equal(1, s.selected);
      let panel1 = container.querySelector('#panel1');
      let panel2 = container.querySelector('#panel2');
      assert.isNotNull(panel2);
      assert.isFalse(panel1.classList.contains('selected'));
      assert.isTrue(panel2.classList.contains('selected'));
    });
  }); // has selected property

});
