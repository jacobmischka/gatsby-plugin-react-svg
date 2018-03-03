Adds [`svg-react-loader`][loader] to gatsby webpack config (and removes `svg`s from the built-in `url-loader` config).

`include` and `exclude` plugin options can be specified, if either is present then `svg-react-loader` will use them and `url-loader` will be reenabled with the inverse.

The following uses `svg-react-loader` to process svgs from a path matching `/assets/`, and `url-loader` to process svgs from everywhere else.

```js
{
    resolve: 'gatsby-plugin-react-svg',
    options: {
        include: /assets/
    }
}
```

[loader]: https://github.com/jhamlet/svg-react-loader
