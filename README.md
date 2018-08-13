Adds [`svg-react-loader`][loader] to gatsby webpack config (and removes `svg`s from the built-in `url-loader` config).

The `rule` plugin option can be specified to pass [rule options](https://webpack.js.org/configuration/module/#rule).

The following uses `svg-react-loader` to process svgs from a path matching `/assets/`, and `url-loader` to process svgs from everywhere else.

```js
{
    resolve: 'gatsby-plugin-react-svg',
    options: {
        rule: {
          include: /assets/
        }
    }
}
```

[loader]: https://github.com/jhamlet/svg-react-loader
