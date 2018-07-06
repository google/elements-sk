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

/** @module elements-sk/errorMessage */

/** errorMessage dispatches an event with the error message in it.
 * <p>
 *   Use this function in conjunction with the {@linkcode module:elements-sk/error-toast-sk} element.
 * </p>
 *
 * @evt error-sk The event has a detail of the form:
 *
 * <pre>
 * {
 *   message: "some string",
 *   duration: (duration in milliseconds),
 * }
 * </pre>
 *
 * @param {(string|Object)} message The value of 'message' is expected to be a
 *   string, an Object with a field 'message', or an Object.
 * @param {number} duration The number of milliseconds the message should be displayed.
 *
 */
export function errorMessage(message, duration=10000) {
  if (typeof message === 'object') {
    message = message.message        || // for handling Errors {name:String, message:String}
              JSON.stringify(message);  // for everything else
  }
  var detail = {
    message: message,
    duration: duration,
  }
  document.dispatchEvent(new CustomEvent('error-sk', {detail: detail, bubbles: true}));
}
