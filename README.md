# Editorconfig generator

`[sudo] npm install fast-editorconfig -g`

Now you just type:

`fec --type js --size 2 --style space`

And it's will generate an .editorconfig file like this.

```
# editorconfig.org

[*.js]
ident-size = 2
ident-style = space
```
***ps: Generate one block per time.***

## Options

#### Type of the file

`--type (alias -t)`

#### Size of the identation

`--size (alias -l)`

#### Style of the identation

`--style (alias -s)`

#### Trim trailing whitespace

`--whitespace (alias -w)`

#### Root

`--root (alias -r)`

#### Max line length

`--maxline (alias -m)`

## Author
[Filipe Linhares](http://twitter.com/ofilipelinhares)

## License
MIT

