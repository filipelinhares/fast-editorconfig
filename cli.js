#!/usr/bin/env node

'use strict';

var fs        = require('fs');
var chalk     = require('chalk');
var multiline = require('multiline');
var pkg       = require('./package.json');
var argv      = require('yargs')
  .alias('t', 'type')
  .alias('s', 'style')
  .alias('l', 'size')
  .alias('r', 'root')
  .alias('w', 'whitespace')
  .alias('m', 'maxline')
  .alias('n', 'newline')
  .alias('h', 'help')
  .alias('v', 'version')
  .argv;

var str    = [];
var header = ['# editorconfig.org'];

var options = {
      fileType   : argv.type,
      indentSize : argv.size,
      indentStyle: argv.style,
      whitespace : argv.whitespace,
      maxline    : argv.maxline,
      newLine    : argv.newline,
      root       : argv.root,
      help       : argv.help,
      version    : argv.version
    };

//# Information logs

if (options.version) {
  console.log(chalk.yellow('Fast Editorconfig: ' + pkg.version));
  process.exit();
}

if (options.help) {
  var help = multiline (function() {/*
    88888  888888  888888
    88     8888    88
    888    8888    88
    88     888888  888888

    Options

    -t, --type         Define the type of the file
    -s, --style        Define indent_style
    -l, --size         Define indent_style
    -w, --whitespace   Define trim_trailing_whitespace
    -m, --maxline      Define max_line_length
    -n, --newline      Define insert_final_newline

--
  */});

  console.log(help);
  process.exit();
}

//# ============ Handling same cases
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
    if (options.fileType === 'all') {
      str.push('\n\n[*]');
    }
    else {
      str.push('\n\n[*.' + options.fileType + ']');
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
  str.push('indent_size = ' + options.indentSize);
}

//# Indent Style
if (options.indentStyle) {
  if (options.indentStyle === 'tab' || options.indentStyle === 'space') {
    str.push('indent_style = ' + options.indentStyle);
  } else if (options.indentStyle !== 'tab' || options.indentStyle !== 'space') {
    console.log(chalk.red('Style only accept space and tab!'));
    process.exit();
  }
}

//# Trim trailing whitespace
if (options.whitespace) {
  if (options.whitespace === 'false') {
    str.push('trim_trailing_whitespace = false');
  } else {
    str.push('trim_trailing_whitespace = true');
  }
}

//# Max-line
if (options.maxline) {
    str.push('max_line_length = ' + options.maxline);
}

//# Insert new line
if (options.newLine) {
  if (options.newLine === 'false') {
      str.push('insert_final_newline = false');
  } else {
    str.push('insert_final_newline = true');
  }
}

var existFile = fs.existsSync('.editorconfig');

if(!existFile) {

  if (!argv.root) {
    fs.writeFileSync('.editorconfig', header.join('\n'));
  }
  if (options.root) {
    //# Add root to top of the file
    header.push('root = true');
    fs.writeFileSync('.editorconfig', header.join('\n'));
  }
}

fs.appendFile('.editorconfig', str.join('\n'), function (err) {
  if (err) throw console.log(err);
  console.log(chalk.green('.editorconfig has been generated with success! ✔'));
});
