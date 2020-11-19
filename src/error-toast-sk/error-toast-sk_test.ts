// Copyright 2020 Google LLC
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

import { ErrorToastSk } from "./error-toast-sk";
import { errorMessage } from "../errorMessage"
import { ToastSk } from '../toast-sk/toast-sk';

const assert = chai.assert;

describe('error-toast-sk', () => {
  let container: HTMLDivElement;

  beforeAll(async () => {
    await customElements.whenDefined('error-toast-sk');
  });

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container)
  });

  it('can be cancelled by clicking on the close button', () => {
    container.innerHTML = `<error-toast-sk></error-toast-sk>`;
    const errorToastSk = container.firstElementChild as ErrorToastSk;
    const childToast = errorToastSk.querySelector('toast-sk') as ToastSk;

    // Display the error toast and confirm it is displayed.
    errorMessage('This is an error message which should display forever', 0);
    assert.isTrue(childToast.hasAttribute('shown'));

    // Click the close button.
    errorToastSk.querySelector('button')!.click();
    assert.isFalse(childToast.hasAttribute('shown'));
  });
});
