# gatsby-plugin-react-svg [![npm version](https://badge.fury.io/js/gatsby-plugin-react-svg.svg)](https://badge.fury.io/js/gatsby-plugin-react-svg)

Adds [`svg-react-loader`](https://github.com/jhamlet/svg-react-loader) to gatsby webpack config.

> **Note**: the plugin can **remove `SVG`s from the built-in `url-loader` config** in case invalid configuration.

## Install

`npm install --save gatsby-plugin-react-svg`

## How to use

```js
// In your gatsby-config.js

plugins: [
  {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /assets/ // See below to configure properly
      }
    }
  }
];
```

## Configuration

The `rule` plugin option can be used to pass [rule options](https://webpack.js.org/configuration/module/#rule). If either `include` or `exclude` options are present, `svg-react-loader` will use them and `url-loader` will be re-enabled with the inverse.

The following configuration uses `svg-react-loader` to process SVGs from a path matching `/assets/`, and `url-loader` to process SVGs from everywhere else.

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

From now on you can import SVGs and use them as Components:

```js
import Icon from "./path/assets/icon.svg";

// ...

<Icon />;
```

Another common configuration:

- name SVGs used in React components like `something.inline.svg` and process them with `svg-react-loader`
- name other SVGs (e.g. used in css/scss) `something.svg` and process them with the default `url-loader`

```js
{
  resolve: 'gatsby-plugin-react-svg',
  options: {
    rule: {
      include: /\.inline\.svg$/
    }
  }
}
```

In React components:

```js
import Something from "./path/something.inline.svg";

// ...

<Something />;
```

In styles file:

```css
.header-background {
  background-image: url(./path/something.svg);
}
```

## Using with typescript

To use SVGs with Typescript, create a custom type definition like this:

```typescript
declare module "*.svg" {
  const content: any;
  export default content;
}
```

Make sure the file is contained in your `tsconfig.json` `include`.

### SVG-React-Loader options

Any of the svg-react-loader [query parameters](https://github.com/jhamlet/svg-react-loader#query-params) can be passed down via the webpack config by including an `options` prop within the `rule` prop.

```js
// In your gatsby-config.js

plugins: [
  {
    resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
          options: {
            tag: "symbol",
            name: "MyIcon",
            props: {
              className: "my-class",
              title: "example"
            },
            filters: [value => console.log(value)]
          }
        }
      }
  }
];
```
They can also be defined at the import level:

```js
  import Fork from "-!svg-react-loader?props[]=className:w-4 h-4!../components/Icons/Fork.inline.svg";
```

### Removing svg props (filters)
Unwanted SVG props can be removed with filters. Since filters are quite complex this plugin adds a simple key `omitKeys` to allow end users to quickly remove props that are problematic from their svg files.

```js
{
  resolve: `gatsby-plugin-react-svg`,
  options: {
    rule: {
      include: /images\/.*\.svg/,
      omitKeys: ['xmlnsDc', 'xmlnsCc', 'xmlnsRdf', 'xmlnsSvg', 'xmlnsSodipodi', 'xmlnsInkscape']
      ///OR
      filters: [(value) => { console.log(value); }]
    }
  }
},
```

## Troubleshooting

### I get "InvalidCharacterError" overlay in my browser during development

Example of this error:
```bash
InvalidCharacterError: Failed to execute 'createElement' on 'Document':
The tag name provided ('data:image/svg+xml; ...
```

It's likely that you use SVG in your React component, that is processed by `url-loader` instead of `svg-react-loader` due to incorrect configuration.

### I get endless spinner (with an infinite loop in the background) in my browser during development

It's likely that some of your SVGs used in css/sass files are processed by `svg-react-loader` instead of `url-loader` due to incorrect configuration.

### I get error "Module parse failed" in console

Example of this error:
```bash
ERROR in ./src/images/some-image.png 1:0
Module parse failed: Unexpected character '�' (1:0)
```

In case you see such error, it's likely that you configured `exclude/include` rule options incorrectly. Please check configuration section above.
