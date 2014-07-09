# Fast Editorconfig 0.3.1

An easy way to generate your [editorconfig](http://editorconfig.org) files.

## Instalation

`npm install --global fast-editorconfig`

## Using

After install Fast Editorconfig you have a command called `fec` in your console.

>FE create a new file of `.editorconfig` but if you already have an `.editorconfig` file in your project and need just add more options to him don't worry, you can do it as well.

Go to the directory which you want add an `.editorconfig` file and type:

`fec --type js --size 2 --style space`

it's will generate an `.editorconfig` with this content:

```
#editorconfig.org

[*.js]
ident-size = 2
ident-style = space
```

## Options

#### Help

- Command: `--help`
- Alias: `-h`

#### Version

- Command: `--version`
- Alias: `-v`

#### File type

- Command: `--type`
- Alias: `-t`
- Values: `all`,`none` - any language type.

***`none` is the same that `all` in this case***

##### Some features:
You can type the entire name of the language, eg:

`fec -t ruby -l 2 -s space`

And the results is:

```
[*.rb]
ident-size = 2
ident-style = 2
```

But wait, the languages supported for now is:

- `javascript` - `.js`
- `ruby` - `.rb`
- `python` - `.py`

If you type all time all name of the language and want this feature just open an issue.

####  Size of the ident

- Command: `--size`
- Alias: `-l`
- Values: `integer`


#### Style of the ident

- Command: `--style`
- Alias: `-s`
- Values: `space` - `tab`

#### Root

- Command: `--root`
- Alias: `-r`
- Values: `none`.

***`none` is the same as true***

#### Trim Trailing Whitespace

- Command: `--whitespace`
- Alias: `-e`
- Values: `none` - `false`

***`none` is the same as true***

#### Max line length

- Command: `--maxline`
- Alias: `-m`
- Values: `integer`

#### New line

- Command: `--newline`
- Alias: `-n`
- Values: `none` - `false`

***`none` is the same as true***

## Contributing

Fork the project and send pull requests.  
Open [issues](https://github.com/filipelinhares/fast-editorconfig/issues)

## Author

[Filipe Linhares](http://twitter.com/ofilipelinhares)

## License

MIT