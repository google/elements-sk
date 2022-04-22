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

import { SelectSk } from "./select-sk";

const assert = chai.assert;

describe('select-sk', () => {
  let container: HTMLDivElement;

  beforeAll(async () => {
    await window.customElements.whenDefined('select-sk');
  });

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('selection property', () => {
    it('has a default value', () => {
      container.innerHTML = '<select-sk></select-sk>';
      const s = container.firstElementChild as SelectSk;
      assert.equal(-1, (s as any)._selection);
      assert.equal(-1, s.selection);
    });

    it('changes based on children', () => {
      container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
      const s = container.firstElementChild as SelectSk;
      assert.equal(1, (s as any)._selection);
      assert.equal(1, s.selection);
    });

    it('can go back to -1', () => {
      container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
      const s = container.firstElementChild as SelectSk;
      s.selection = -1;
      assert.equal(-1, s.selection);
      assert.isFalse(s.querySelector('#b')!.hasAttribute('selected'));
    });

    it('parses strings', () => {
      container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b></div>
        </select>
        `;
      const s = container.firstElementChild as SelectSk;
      s.selection = '1';
      assert.equal(1, +s.selection);
      assert.isTrue(s.querySelector('#b')!.hasAttribute('selected'));
    });

    it('treats null and undefined and out of range as -1', () => {
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

      s.selection = 10;
      assert.equal(-1, s.selection);

      s.selection = -3;
      assert.equal(-1, s.selection);
    });

    it('changes selected attributes on children', () => {
      container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b></div>
        </select>
        `;
      const s = container.firstElementChild as SelectSk;
      const a = s.querySelector('#a')!;
      const b = s.querySelector('#b')!;
      s.selection = 0;
      assert.equal(0, s.selection);
      assert.isTrue(a.hasAttribute('selected'));
      assert.isFalse(b.hasAttribute('selected'));
      s.selection = 1;
      assert.equal(1, s.selection);
      assert.isFalse(a.hasAttribute('selected'));
      assert.isTrue(b.hasAttribute('selected'));
    });

    it('stays fixed when disabled', () => {
      container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
      const s = container.firstElementChild as SelectSk;
      assert.equal(1, (s as any)._selection);
      assert.equal(1, s.selection);
      assert.equal('0', s.getAttribute('tabindex'));
      s.disabled = true;
      s.selection = 0;
      assert.equal(1, (s as any)._selection);
      assert.equal(1, s.selection);
      assert.equal(false, s.hasAttribute('tabindex'));
    });

    it('gets updated when select-sk is re-enabled', () => {
      container.innerHTML = `
        <select-sk id=select disabled>
          <div id=a></div>
          <div id=b selected></div>
        </select>
        `;
      const s = container.firstElementChild as SelectSk;
      assert.equal(-1, (s as any)._selection);
      assert.equal(-1, s.selection);
      s.disabled = false;
      assert.equal(1, (s as any)._selection);
      assert.equal(1, s.selection);
      assert.isFalse(s.hasAttribute('disabled'));
    });
  }); // end describe('selected property')

  describe('click', () => {
    it('changes selection', () => {
      container.innerHTML = `
        <select-sk id=select>
          <div id=a></div>
          <div id=b></div>
        </select>
        `;
      const s = container.firstElementChild as SelectSk;
      assert.equal('listbox', s.getAttribute('role'));
      const a = s.querySelector<HTMLDivElement>('#a')!;
      const b = s.querySelector<HTMLDivElement>('#b')!;
      a.click();
      assert.equal(0, s.selection);
      assert.isTrue(a.hasAttribute('selected'));
      assert.equal('true', a.getAttribute('aria-selected'));
      assert.equal('option', a.getAttribute('role'));
      assert.isFalse(b.hasAttribute('selected'));
      assert.equal('false', b.getAttribute('aria-selected'));
      assert.equal('option', b.getAttribute('role'));
      b.click();
      assert.equal(1, s.selection);
      assert.isFalse(a.hasAttribute('selected'));
      assert.equal('false', a.getAttribute('aria-selected'));
      assert.isTrue(b.hasAttribute('selected'));
      assert.equal('true', b.getAttribute('aria-selected'));
    });

    it('ignores clicks when disabled', () => {
      container.innerHTML = `
        <select-sk id=select disabled>
          <div id=a></div>
          <div id=b></div>
        </select>
        `;
      const s = container.firstElementChild as SelectSk;
      const a = s.querySelector<HTMLDivElement>('#a')!;
      const b = s.querySelector<HTMLDivElement>('#b')!;
      a.click();
      assert.equal(-1, s.selection);
      assert.isFalse(a.hasAttribute('selected'));
      assert.isFalse(b.hasAttribute('selected'));
      b.click();
      assert.equal(-1, s.selection);
      assert.isFalse(a.hasAttribute('selected'));
      assert.isFalse(b.hasAttribute('selected'));
    });
  }); // end describe('click')

  describe('inserting new children', () => {
    it('updates selection property', async () => {
      container.innerHTML = `
        <select-sk id=select>
          <div></div>
          <div></div>
          <div></div>
        </select>
        `;
      const s = container.firstElementChild as SelectSk;
      assert.equal(-1, s.selection);
      let div = document.createElement('div');
      div.setAttribute('selected', '');
      s.appendChild(div);
      div = document.createElement('div');
      s.appendChild(div);
      // Need to do the check post microtask so the mutation observer gets a
      // chance to fire.
      await Promise.resolve();
      assert.equal(3, s.selection);
    });

    it('does not check children when disabled', async () => {
      container.innerHTML = `
        <select-sk id=select disabled>
          <div></div>
          <div></div>
          <div></div>
        </select>
        `;
      const s = container.firstElementChild as SelectSk;
      assert.equal(-1, s.selection);
      let div = document.createElement('div');
      div.setAttribute('selected', '');
      s.appendChild(div);
      div = document.createElement('div');
      s.appendChild(div);
      // Need to do the check post microtask so the mutation observer gets a
      // chance to fire.
      await Promise.resolve();
      assert.equal(-1, s.selection);
    });
  }); // end describe('inserting new children')

  describe('mutation of child selected attribute', () => {
    it('does update selection', async () => {
      container.innerHTML = `
        <select-sk id=select>
          <div></div>
          <div id=d1></div>
          <div id=d2 selected></div>
        </select>
        `;
      const s = container.firstElementChild as SelectSk;
      assert.equal(2, s.selection);
      s.querySelector('#d2')!.removeAttribute('selected');
      s.querySelector('#d1')!.setAttribute('selected', '');
      // Need to do the check post microtask so the mutation observer gets a
      // chance to fire.
      await Promise.resolve();
      assert.equal(1, s.selection);
    });
  }); // end describe('mutation of child selected attribute'

  describe('keyboard navigation', () => {
    it('follows arrow keys', () => {
      container.innerHTML = `
        <select-sk id=select>
          <div></div>
          <div></div>
          <div id=d2 selected></div>
        </select>`;
      const s = container.firstElementChild as SelectSk;
      assert.equal(2, s.selection);
      (s as any)._onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      assert.equal(1, s.selection);
      (s as any)._onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      assert.equal(2, s.selection);
      (s as any)._onKeyDown(new KeyboardEvent('keydown', { key: 'Home' }));
      assert.equal(0, s.selection);
      (s as any)._onKeyDown(new KeyboardEvent('keydown', { key: 'End' }));
      assert.equal(2, s.selection);
      // Don't wrap around.
      (s as any)._onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      assert.equal(2, s.selection);
    });
  }); // end describe('keyboard navigation')

  describe('focus', () => {
    it('drops focus when disabled', () => {
      container.innerHTML = `
        <select-sk id=select>
          <div></div>
          <div></div>
          <div id=d2 selected></div>
        </select>`;
      const s = container.firstElementChild as SelectSk;
      s.focus();
      assert.equal(s, document.activeElement);
      s.disabled = true;
      assert.notEqual(s, document.activeElement);
    });
  }); // end describe('focus')
});
