#!/usr/bin/env node
'use strict';
var fs = require('fs');
var chalk = require('chalk');
var argv = require('yargs')
  .alias('t', 'type')
  .alias('s', 'style')
  .alias('l', 'size')
  .alias('r', 'root')
  .alias('w', 'whitespace')
  .alias('m', 'maxline')
  .alias('n', 'newline')
  .argv;
var str;

var options = {
      fileType   : argv.type,
      indentSize : argv.size,
      indentStyle: argv.style,
      whitespace : argv.whitespace,
      maxline    : argv.maxline,
      newLine    : argv.newline,
      root       : argv.root
    };

//# Handling same cases
switch (options.fileType) {
  case 'python':
    options.fileType = 'py';
    break;
  case 'javascript':
    options.fileType = 'js';
    break;
  case 'ruby':
    options.fileType = 'rb';
    break;
  case 'python':
    options.fileType = 'py';
    break;
}

//# File type
if (options.fileType) {

  //# Handling if user set only type.
  if (options.indentSize || options.indentStyle || options.whitespace || options.maxline || options.newLine) {
    if (options.fileType === 'all' || options.fileType === true) {
      str = '\n' +
      '\n[*]' +
      '';
    }
    else if (options.fileType !== 'all') {
      str = '\n' +
      '\n[*.'+options.fileType+']' +
      '';
    }
  } else {
    console.log(chalk.red('Define someone option to your file!'));
    process.exit();
  }
} else {
  console.log(chalk.red('Define a type to the file with --type!'));
  process.exit();
}

//# Indent Size
if (options.indentSize) {
  str += '' +
  '\nindent_size = ' + options.indentSize +
  '';
}

//# Indent Style
if (options.indentStyle) {
  if (options.indentStyle === 'tab' || options.indentStyle === 'space') {
    str += ''+
    '\nindent_style = ' + options.indentStyle +
    '';
  } else if (options.indentStyle !== 'tab' || options.indentStyle !== 'space') {
    console.log(chalk.red('Style only accept space and tab!'));
    process.exit();
  }
}

//# Trim trailing whitespace
if (options.whitespace) {
  if (options.whitespace === 'false') {
      str += ''+
      '\ntrim_trailing_whitespace = false' +
      '';
  } else {
    str += ''+
    '\ntrim_trailing_whitespace = true'+
    '';
  }
}

//# Max-line
if (options.maxline) {
    str += ''+
    '\nmax_line_length = ' + options.maxline +
    '';
}

//# Insert new line
if (options.newLine) {
  if (options.newLine === 'false') {
      str += ''+
      '\ninsert_final_newline = false' +
      '';
  } else {
    str += ''+
    '\ninsert_final_newline = true'+
    '';
  }
}

//# Check if exist an .editorconfig file
fs.readFile('.editorconfig', function (err) {
  if (err) {
    fs.exists('.editorconfig', function () {

      //# If not exists we create one
      if (!argv.root) {
        fs.writeFileSync('.editorconfig', '# editorconfig.org');
      }
      if (options.root) {
        //# Add root to top of the file
        fs.writeFileSync('.editorconfig', '# editorconfig.org\n root = true');
      }
    });
  }

  fs.appendFile('.editorconfig', str, function (err) {
    if (err) throw console.log(err);

    console.log(chalk.green('.editorconfig has been generated with success! ✔'));
  });
});