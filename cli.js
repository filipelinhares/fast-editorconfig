#!/usr/bin/env node
'use strict';
var argv = require('yargs')
  .alias('s', 'style')
  .alias('l', 'size')
  .alias('t', 'type')
  .alias('r', 'root')
  .alias('w', 'whitespace')
  .alias('m', 'maxline')
  .argv,
  fs = require('fs');
  var str;

if (argv.type && argv.size && argv.style) {
  str = '\n' +
  '\n[*.'+argv.type+']' +
  '\nident-size = ' + argv.size +
  '\nident-style = ' + argv.style +
  '';
};

if(argv.whitespace){
  str += ''+
  '\ntrim_trailing_whitespace = ' + argv.whitespace +
  '';
}

if(argv.maxline){
  str += ''+
  '\nmax_line_length = ' + argv.maxline +
  '';
}

fs.readFile('.editorconfig', function (err, data) {
  if(err){
    fs.exists('.editorconfig', function () {
      if(!argv.root){
        fs.writeFileSync('.editorconfig', '# editorconfig.org');
      }
      if(argv.root){
        fs.writeFileSync('.editorconfig', '# editorconfig.org\n root = true');
      }
    });
  }

  fs.appendFile('.editorconfig', str, function (err) {
    if (err) throw console.log(err);

    console.log('.editorconfig has generated with success! ✔');
  });
});
