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

// This is a jsdoc plugin that adds support for both @evt and @attr
// tags on a class, where @evt documents an event the custom element may
// generate, and @attr documents an attribute the custom element recognizes.


// The tags are defined here, and we use the onTagged callback to
// store the name and description associated with each tag.
exports.defineTags = function(dictionary) {
  dictionary.defineTag('evt', {
    canHaveName: true,
    onTagged: function(doclet, tag) {
      if (!doclet.webevents) {
        doclet.webevents= [];
      }

      doclet.webevents.push({
        name: tag.value.name,
        description: tag.value.description || '',
      });
    }
  });

  dictionary.defineTag('attr', {
    canHaveName: true,
    onTagged: function(doclet, tag) {
      if (!doclet.attrs) {
        doclet.attrs= [];
      }

      doclet.attrs.push({
        name: tag.value.name,
        description: tag.value.description || '',
      });
    }
  });
}

const rows = (rowData) => rowData.map((e) => `
  <tr>
    <td>${e.name}</td>
    <td>${e.description}</td>
  </tr>
`);

const section = (title, rowData) => `<h5>${title}</h5>
    <table class=params>
    <thead>
      <th>Name</th>
      <th>Description</th>
    </thead>
    ${rows(rowData).join('')}
    </table>
`;

// The handlers look for doclets with data we stored from our custom
// tags and emit HTML for the data we found.
exports.handlers = {
  newDoclet: function(e) {
    if (e.doclet.webevents) {
      e.doclet.description = `
        ${e.doclet.description || ''}
        ${section('Events', e.doclet.webevents)}
      `;
    }
    if (e.doclet.attrs) {
      e.doclet.description = `
        ${e.doclet.description || ''}
        ${section('Attributes', e.doclet.attrs)}
      `;
    }
  }
}
