// Copyright 2019 Google LLC
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
import '../radio-sk'

let container = document.createElement("div");
document.body.appendChild(container);

afterEach(function() {
  container.innerHTML = "";
});

function _checkBoxSetup() {
  return window.customElements.whenDefined('checkbox-sk').then(() => {
    container.innerHTML = `<checkbox-sk></checkbox-sk>`;
    return container.querySelector('checkbox-sk');
  });
}

function _radioSetup() {
  return window.customElements.whenDefined('radio-sk').then(() => {
    container.innerHTML = `<radio-sk></radio-sk>`;
    return container.querySelector('radio-sk');
  });
}

describe('checkbox-sk', function() {
  it('responds to click()', function() {
    return _checkBoxSetup().then((cb) => {
      assert.isFalse(cb.checked);

      let called = false;
      cb.addEventListener('change', (e) => { called = true; })

      cb.click();
      assert.isTrue(called);
      assert.isTrue(cb.checked);

      cb.click();
      assert.isFalse(cb.checked);
    });
  });
});

describe('radio-sk', function() {
  it('responds to click()', function() {
    return _radioSetup().then((rb) => {
      assert.isFalse(rb.checked);

      let called = false;
      rb.addEventListener('change', (e) => { called = true; })

      rb.click();
      assert.isTrue(called);
      assert.isTrue(rb.checked);
      rb.click();
      assert.isTrue(rb.checked);
    });
  });
});
