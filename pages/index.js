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

// Shows how to import elements when using the library.
import 'elements-sk/checkbox-sk';
import 'elements-sk/collapse-sk';
import 'elements-sk/dialog-sk';
import 'elements-sk/multi-select-sk';
import 'elements-sk/nav-button-sk';
import 'elements-sk/nav-links-sk';
import 'elements-sk/radio-sk';
import 'elements-sk/select-sk';
import 'elements-sk/spinner-sk';
import 'elements-sk/styles/buttons';
import 'elements-sk/styles/select';
import 'elements-sk/tabs-panel-sk';
import 'elements-sk/tabs-sk';
import 'elements-sk/toast-sk';

import 'elements-sk/icon/alarm-icon-sk';
import 'elements-sk/icon/check-icon-sk';
import 'elements-sk/icon/create-icon-sk';
import 'elements-sk/icon/link-icon-sk';
import 'elements-sk/icon/menu-icon-sk';
import 'elements-sk/icon/warning-icon-sk';

import { errorMessage } from 'elements-sk/errorMessage';

document.getElementById('make_error').addEventListener('click', () => {
	errorMessage('Oh no, there was a problem!', 4000 /* ms*/);
})
