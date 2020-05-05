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

import { MultiSelectSk } from "./multi-select-sk";
import { SelectSk } from "../select-sk/select-sk";

const assert = chai.assert;

const container = document.createElement('div');
document.body.appendChild(container);

afterEach(() => {
  container.innerHTML = '';
});

describe('multi-select-sk', () => {
  describe('selection property', () => {
    it('has a default value', () => window.customElements.whenDefined('multi-select-sk').then(() => {
      container.innerHTML = '<multi-select-sk></multi-select-sk>';
      const s = container.firstElementChild as MultiSelectSk;
      assert.deepEqual([], (s as any)._selection);
      assert.deepEqual([], s.selection);
    }));

    it('changes based on children', () => window.customElements.whenDefined('multi-select-sk').then(() => {
      container.innerHTML = `
        <multi-select-sk id=select>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
      const s = container.firstElementChild as MultiSelectSk;
      assert.deepEqual([1], (s as any)._selection);
      assert.deepEqual([1], s.selection);
    }));

    it('can go back to []', () => window.customElements.whenDefined('multi-select-sk').then(() => {
      container.innerHTML = `
        <multi-select-sk id=select>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
      const s = container.firstElementChild as MultiSelectSk;
      s.selection = [];
      assert.deepEqual([], s.selection);
      assert.isFalse(s.querySelector('#b')!.hasAttribute('selected'));
    }));

    it('treats null and undefined as []', () => window.customElements.whenDefined('select-sk').then(() => {
      container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
      const s = container.firstElementChild as SelectSk;
      s.selection = null;
      assert.equal(-1, s.selection);
      assert.isFalse(s.querySelector('#b')!.hasAttribute('selected'));

      s.selection = 0;
      assert.equal(0, s.selection);
      assert.isTrue(s.querySelector('#a')!.hasAttribute('selected'));

      s.selection = undefined;
      assert.equal(-1, s.selection);
    }));

    it('changes the selected attributes on the children', () => window.customElements.whenDefined('multi-select-sk').then(() => {
      container.innerHTML = `
        <multi-select-sk id=select>
          <div id=a></div>
          <div id=b></div>
        </select>
        `;
      const s = container.firstElementChild as MultiSelectSk;
      const a = s.querySelector('#a')!;
      const b = s.querySelector('#b')!;
      s.selection = [0];
      assert.deepEqual([0], s.selection);
      assert.isTrue(a.hasAttribute('selected'));
      assert.isFalse(b.hasAttribute('selected'));
      s.selection = [0, 1];

      assert.deepEqual([0, 1], s.selection);
      assert.isTrue(a.hasAttribute('selected'));
      assert.isTrue(b.hasAttribute('selected'));
    }));

    it('is stays fixed when disabled', () => window.customElements.whenDefined('multi-select-sk').then(() => {
      container.innerHTML = `
        <multi-select-sk id=select>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
      const s = container.firstElementChild as MultiSelectSk;
      assert.deepEqual([1], (s as any)._selection);
      assert.deepEqual([1], s.selection);
      s.disabled = true;
      s.selection = [0];
      assert.deepEqual([1], (s as any)._selection);
      assert.deepEqual([1], s.selection);
      assert.isTrue(s.hasAttribute('disabled'));
    }));

    it('gets updated when re-enabled', () => window.customElements.whenDefined('multi-select-sk').then(() => {
      container.innerHTML = `
        <multi-select-sk id=select disabled>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
      const s = container.firstElementChild as MultiSelectSk;
      assert.deepEqual([], (s as any)._selection);
      assert.deepEqual([], s.selection);
      s.disabled = false;
      assert.deepEqual([1], (s as any)._selection);
      assert.deepEqual([1], s.selection);
      assert.isFalse(s.hasAttribute('disabled'));
    }));

    it('is always sorted when read', () => window.customElements.whenDefined('multi-select-sk').then(() => {
      container.innerHTML = `
        <multi-select-sk id=select>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </select>`;
      const s = container.firstElementChild as MultiSelectSk;
      s.selection = [5, 4, 0, 2];
      assert.deepEqual([0, 2, 4, 5], s.selection);
    }));
  }); // end describe('selection property')


  describe('click', () => {
    it('changes selection in an additive fashion', () => window.customElements.whenDefined('multi-select-sk').then(() => {
      container.innerHTML = `
        <multi-select-sk id=select>
          <div id=a></div>
          <div id=b></div>
          <div id=c></div>
        </select>
        `;
      const s = container.firstElementChild as MultiSelectSk;
      const a = s.querySelector<HTMLDivElement>('#a')!;
      const b = s.querySelector<HTMLDivElement>('#b')!;
      const c = s.querySelector<HTMLDivElement>('#c')!;
      a.click();
      assert.deepEqual([0], s.selection);
      assert.isTrue(a.hasAttribute('selected'));
      assert.isFalse(b.hasAttribute('selected'));
      assert.isFalse(c.hasAttribute('selected'));
      b.click();
      assert.deepEqual([0, 1], s.selection);
      assert.isTrue(a.hasAttribute('selected'));
      assert.isTrue(b.hasAttribute('selected'));
      assert.isFalse(c.hasAttribute('selected'));
      // unselect
      b.click();
      assert.deepEqual([0], s.selection);
      assert.isTrue(a.hasAttribute('selected'));
      assert.isFalse(b.hasAttribute('selected'));
      assert.isFalse(c.hasAttribute('selected'));
    }));

    it('ignores clicks when disabled', () => window.customElements.whenDefined('multi-select-sk').then(() => {
      container.innerHTML = `
        <multi-select-sk id=select disabled>
          <div id=a></div>
          <div id=b></div>
          <div id=c></div>
        </select>
        `;
      const s = container.firstElementChild as MultiSelectSk;
      const a = s.querySelector<HTMLDivElement>('#a')!;
      const b = s.querySelector<HTMLDivElement>('#b')!;
      const c = s.querySelector<HTMLDivElement>('#c')!;
      a.click();
      assert.deepEqual([], s.selection);
      assert.isFalse(a.hasAttribute('selected'));
      assert.isFalse(b.hasAttribute('selected'));
      assert.isFalse(c.hasAttribute('selected'));
      b.click();
      assert.deepEqual([], s.selection);
      assert.isFalse(a.hasAttribute('selected'));
      assert.isFalse(b.hasAttribute('selected'));
      assert.isFalse(c.hasAttribute('selected'));
      // unselect
      b.click();
      assert.deepEqual([], s.selection);
      assert.isFalse(a.hasAttribute('selected'));
      assert.isFalse(b.hasAttribute('selected'));
      assert.isFalse(c.hasAttribute('selected'));
    }));
  }); // end describe('click')

  describe('addition of children', () => {
    it('updates selection when a selected child is added', () => window.customElements.whenDefined('multi-select-sk').then(() => {
      container.innerHTML = `
        <multi-select-sk id=select>
          <div></div>
          <div></div>
          <div></div>
        </select>
        `;
      const s = container.firstElementChild as MultiSelectSk;
      assert.deepEqual([], s.selection);
      let div = document.createElement('div');
      div.setAttribute('selected', '');
      s.appendChild(div);
      div = document.createElement('div');
      s.appendChild(div);
      div = document.createElement('div');
      div.setAttribute('selected', '');
      s.appendChild(div);
      // Need to do the check post microtask so the mutation observer gets a
      // chance to fire.
      return Promise.resolve().then(() => {
        assert.deepEqual([3, 5], s.selection);
      });
    }));

    it('does not check children when disabled', () => window.customElements.whenDefined('multi-select-sk').then(() => {
      container.innerHTML = `
        <multi-select-sk id=select disabled>
          <div></div>
          <div></div>
          <div></div>
        </select>
        `;
      const s = container.firstElementChild as MultiSelectSk;
      assert.deepEqual([], s.selection);
      let div = document.createElement('div');
      div.setAttribute('selected', '');
      s.appendChild(div);
      div = document.createElement('div');
      s.appendChild(div);
      div = document.createElement('div');
      div.setAttribute('selected', '');
      s.appendChild(div);
      // Need to do the check post microtask so the mutation observer gets a
      // chance to fire.
      return Promise.resolve().then(() => {
        assert.deepEqual([], s.selection);
      });
    }));
  }); // end describe('addition of children')

  describe('mutation of child selected attribute', () => {
    it('does not update selection', () => window.customElements.whenDefined('multi-select-sk').then(() => {
      container.innerHTML = `
        <multi-select-sk id=select>
          <div></div>
          <div></div>
          <div id=d2 selected></div>
        </select>
        `;
      const s = container.firstElementChild as MultiSelectSk;
      assert.deepEqual([2], s.selection);
      s.querySelector('#d2')!.removeAttribute('selected');
      // Need to do the check post microtask so the mutation observer gets a
      // chance to fire.
      return Promise.resolve().then(() => {
        assert.deepEqual([2], s.selection);
      });
    }));
  }); // end describe('mutation of child selected attribute
});
