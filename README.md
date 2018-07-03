elements-sk
===========

A collection of v1 custom elements.

See [A la carte Web Development](https://bitworking.org/news/2018/03/a-la-carte-web-development)
for more background on pulito and how it fits into "A la carte" web
development.

Installation
------------

If loaded via npm then importing will just work, i.e.:

    $ npm i elements-sk

Then from within your code:

    import 'elements-sk/checkbox-sk'

See `pages/index.js` as an example.

Documentation
-------------

[jsdoc.skia.org](https://jsdoc.skia.org/) contains the
[jsdoc](http://usejsdoc.org/) generated documentation for all of the code. It
also hosts a [demo page](https://jsdoc.skia.org/elements-sk/) of many of the
elements, and a [catalog](https://jsdoc.skia.org/elements-sk/icon-sk.html) of
all the [Material Design
icons](https://github.com/google/material-design-icons) included.


Browser Support
---------------

This library only uses the v1 Custom Elements spce with no Shadow DOM,
so the only polyfill needed is:

    https://github.com/webcomponents/custom-elements

See `pages/index.html` for an example on how to conditionally include
the polyfill.

Disclaimer
----------

This is not an officially supported Google product.

