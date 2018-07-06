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

let container = document.createElement("div");
document.body.appendChild(container);

afterEach(function() {
  container.innerHTML = "";
});

describe('select-sk', function() {
  describe('selection property', function() {
    it('has a default value', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `<select-sk></select-sk>`;
        let s = container.firstElementChild;
        assert.equal(-1, s._selection);
        assert.equal(-1, s.selection);
      });
    });

    it('changes based on children', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
        let s = container.firstElementChild;
        assert.equal(1, s._selection);
        assert.equal(1, s.selection);
      });
    });

    it('can go back to -1', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
        let s = container.firstElementChild;
        s.selection = -1;
        assert.equal(-1, s.selection);
        assert.isFalse(s.querySelector('#b').hasAttribute('selected'));
      });
    });

    it('parses strings', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b></div>
        </select>
        `;
        let s = container.firstElementChild;
        s.selection = "1";
        assert.equal(1, s.selection);
        assert.isTrue(s.querySelector('#b').hasAttribute('selected'));
      });
    });

    it('treats null and undefined as -1', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
        let s = container.firstElementChild;
        s.selection = null;
        assert.equal(-1, s.selection);
        assert.isFalse(s.querySelector('#b').hasAttribute('selected'));

        s.selection = 0;
        assert.equal(0, s.selection);
        assert.isTrue(s.querySelector('#a').hasAttribute('selected'));

        s.selection = undefined;
        assert.equal(-1, s.selection);
      });
    });

    it('changes selected attributes on children', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b></div>
        </select>
        `;
        let s = container.firstElementChild;
        let a = s.querySelector('#a');
        let b = s.querySelector('#b');
        s.selection = 0;
        assert.equal(0, s.selection);
        assert.isTrue(a.hasAttribute('selected'));
        assert.isFalse(b.hasAttribute('selected'));
        s.selection = 1;
        assert.equal(1, s.selection);
        assert.isFalse(a.hasAttribute('selected'));
        assert.isTrue(b.hasAttribute('selected'));
      });
    });

    it('stays fixed when disabled', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
        let s = container.firstElementChild;
        assert.equal(1, s._selection);
        assert.equal(1, s.selection);
        s.disabled = true;
        s.selection = 0;
        assert.equal(1, s._selection);
        assert.equal(1, s.selection);
      });
    });

    it('gets updated when select-sk is re-enabled', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `
        <select-sk id=select disabled>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
        let s = container.firstElementChild;
        assert.equal(-1, s._selection);
        assert.equal(-1, s.selection);
        s.disabled = false;
        assert.equal(1, s._selection);
        assert.equal(1, s.selection);
        assert.isFalse(s.hasAttribute('disabled'));
      });
    });
  });  // end describe('selected property')

  describe('click', function() {
    it('changes selection', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b></div>
        </select>
        `;
        let s = container.firstElementChild;
        let a = s.querySelector('#a');
        let b = s.querySelector('#b');
        a.click();
        assert.equal(0, s.selection);
        assert.isTrue(a.hasAttribute('selected'));
        assert.isFalse(b.hasAttribute('selected'));
        b.click();
        assert.equal(1, s.selection);
        assert.isFalse(a.hasAttribute('selected'));
        assert.isTrue(b.hasAttribute('selected'));
      });
    });

    it('ignores clicks when disabled', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `
        <select-sk id=select disabled>
          <div id=a></div>
          <div id=b></div>
        </select>
        `;
        let s = container.firstElementChild;
        let a = s.querySelector('#a');
        let b = s.querySelector('#b');
        a.click();
        assert.equal(-1, s.selection);
        assert.isFalse(a.hasAttribute('selected'));
        assert.isFalse(b.hasAttribute('selected'));
        b.click();
        assert.equal(-1, s.selection);
        assert.isFalse(a.hasAttribute('selected'));
        assert.isFalse(b.hasAttribute('selected'));
      });
    });
  });  // end describe('click')

  describe('inserting new children', function() {
    it('updates selection property', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `
        <select-sk id=select>
          <div></div>
          <div></div>
          <div></div>
        </select>
        `;
        let s = container.firstElementChild;
        assert.equal(-1, s.selection);
        let div = document.createElement('div');
        div.setAttribute('selected', '');
        s.appendChild(div)
        div = document.createElement('div');
        s.appendChild(div)
        // Need to do the check post microtask so the mutation observer gets a
        // chance to fire.
        return Promise.resolve().then(() => {
          assert.equal(3, s.selection);
        });
      });
    });

    it('does not check children when disabled', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `
        <select-sk id=select disabled>
          <div></div>
          <div></div>
          <div></div>
        </select>
        `;
        let s = container.firstElementChild;
        assert.equal(-1, s.selection);
        let div = document.createElement('div');
        div.setAttribute('selected', '');
        s.appendChild(div)
        div = document.createElement('div');
        s.appendChild(div)
        // Need to do the check post microtask so the mutation observer gets a
        // chance to fire.
        return Promise.resolve().then(() => {
          assert.equal(-1, s.selection);
        });
      });
    });
  });  // end describe('inserting new children')

  describe('mutation of child selected attribute', function() {
    it('does not update selection', function() {
      return window.customElements.whenDefined('select-sk').then(() => {
        container.innerHTML = `
        <select-sk id=select>
          <div></div>
          <div></div>
          <div id=d2 selected></div>
        </select>
        `;
        let s = container.firstElementChild;
        assert.equal(2, s.selection);
        s.querySelector('#d2').removeAttribute('selected');
        // Need to do the check post microtask so the mutation observer gets a
        // chance to fire.
        return Promise.resolve().then(() => {
          assert.equal(2, s.selection);
        });
      });
    });
  }); // end describe('mutation of child selected attribute'

});
