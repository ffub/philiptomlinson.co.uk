// basic build

'use strict';

var
  metalsmith = require('metalsmith'),
  markdown   = require('metalsmith-markdown'),
  layouts   = require('metalsmith-layouts'),
  sass   = require('metalsmith-sass')

  metalsmith = metalsmith(__dirname) // the working directory
    .clean(true)            // clean the build directory
    .source('src/')    // the page source directory
    .destination('build/')  // the destination directory
    .use(markdown())        // convert markdown to HTML
    .use(layouts({              // wrap layouts around html
      engine: 'handlebars',
    }))
    .use(sass())
    .build(function(err) {  // build the site
      if (err) throw err;   // and throw errors
    });
