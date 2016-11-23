# ipynb-loader

IPython/Jupyter notebook loader for [webpack](https://webpack.github.io/).

## Requirements

ipynb-loader requires [jupyter](http://jupyter.org/) to be installed ([jupyter installation page](http://jupyter.org/install.html)).

Make sure that `jupyter` is available in your `$PATH`.

## Usage

Like any other webpack loader:

```js
// webpack.config.js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.ipynb$/,
        exclude: /node_modules/,
        loader: 'ipynb?cellsOnly=true'
      }
    ]
  }
}

```

## Query options

- `to`: export format
  - options: `custom`, `html`, `latex`, `markdown`, `notebook`, `pdf`, `python`, `rst`, `script`, `slides`
  - default: `html`
- `cellsOnly`: only return `.cell` elements instead of returning the entire document (`<html></html>`)
  - options: `true`, `false`
  - default: `false`
