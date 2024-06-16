<p align="center">
 <a href="https://rahulaher.netlify.app">
  <img src="https://rahulaher.netlify.app/img/logo/glyph-black-colored.svg" alt="Take care soon" width="250" />
 </a>
</p>

<p align="center">
  <a href="https://github.com/aherrahul/design-system/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aherrahul/design-system" alt="License"></a>
  <a href="https://github.com/aherrahul/design-system"><img src="https://img.shields.io/jsdelivr/npm/hy/@aherrahul/design-system" alt="Downloads"></a>
  <a href="https://bundlephobia.com/package/@aherrahul/design-system" target="_blank"><img src="https://img.shields.io/bundlephobia/minzip/@aherrahul/design-system" alt="minzipped size"></a>
  <a href="https://www.npmjs.com/package/@aherrahul/design-system"><img src="https://img.shields.io/npm/v/@aherrahul/design-system" alt="Version"></a>
  <a href="https://github.com/aherrahul/design-system/pulls"><img src="https://img.shields.io/github/issues-pr/aherrahul/design-system" alt="Pull Request"></a>
  <a href="https://github.com/aherrahul/design-system/issues"><img src="https://img.shields.io/github/issues/aherrahul/design-system" alt="Issues"></a>
</p>

<div align="center">
<p align="center">

A design system built by [Rahul Aher](https://rahulaher.netlify.app) using storybook and Vue components

</p>
 <p align="center">
	 
**RDS Design System** is an open source tool for building UI Design Systems with [Vue.js](https://vuejs.org), It provides you and your team a set of organized tools, patterns & practices that work as the foundation for your application development.

The tool is built on top of [Vue.js](https://vuejs.org), [Vue storybook](https://storybook.js.org/docs/get-started), [Webpack](https://webpack.js.org), and is aimed for designers and front-end developers who have at least basic knowledge of component based workflows + HTML, SCSS & JavaScript.

 **Made by [@aherrahul](https://github.com/AherRahul) and other contributors. See also [the official website](https://rds-design-system.netlify.app) of RDS Design System and [read my article](https://rahulaher.netlify.app/projects/rds-design-system/) on the How to use RDS design system**
 </p>
</div>

## Features

- A set of interconnected patterns & practices for you and your team.
- A well thought-out terminology, naming conventions, and hierarchy.
- Get an automated overview of how your design system progresses over time.
- Automatic generation of living, user editable documentation.
- Easily export and use your Design System as an NPM dependency in another Vue.js or Nuxt.js project.
- Create a token, an element, or a pattern, and it’s immediately available across all components.
- Pre-configured Prettier setup for auto-formatting code on both save and before commit.
- Live Reloading, Autoprefixing, SCSS, and helper functions + simple and sane defaults for SVG and Webfont usage out-of-the-box.
- Documentation and the app logic are separated, so you can have public docs while the app itself stays private.
- [And more…](https://rds-design-system.netlify.app)
 
## Documentation

- [Getting Started](https://rds-design-system.netlify.app/?path=/docs/foundation-principles--page): How to install and run Vue Design System.
- [Cores](https://rds-design-system.netlify.app/?path=/docs/foundation-cores--color-palete): Colors are important for identifying our product, in addition to helping to create consistent experiences across our solutions.
- [Typography](https://rds-design-system.netlify.app/?path=/docs/foundation-typography--tokens): RDS's default typography is Satoshi. We use the Satoshi variable with OpenType resources.
- [Font Weight](https://rds-design-system.netlify.app/?path=/docs/foundation-font-weight--font-weight): Font weight is a typographic token that can be used to change the default value of the typographic scale weight and add emphasis to certain text or phrase.
- [Spacing](https://rds-design-system.netlify.app/?path=/docs/foundation-spacing--escala): Spacing tokens are an essential part of building interfaces using RDS. 

etc.


## Examples

- [Official Documentation](https://rds-design-system.netlify.app)
- [Using RDS Design System as NPM dependency on VueJS project/starter-pack](https://github.com/aherrahul/RDS-design-system-example) 
- [How to use?](https://rahulaher.netlify.app/projects/rds-design-system/)


## Installation

Add this package to your project:

```bash
npm i @aherrahul/design-system;
```

Import the `style.css` for general styling like fonts, etc. in the root file of your application or in you root styling file.

```js
import '@aherrahul/design-system/dist/style.css';
```


- To use RDS, import the library into your entry point, it will probably be your main.js or app.js:

```js
import RDS from "@aherrahul/design-system";
```

- And install RDS:
```js
Vue.use(RDS);
```

## Development

These guides are useful if you want to contribute this component library.

### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run storybook
```

#### Compiles and minifies for production

```
npm run build-storybook
```

#### Run your interaction tests (running Storybook instance is needed)

```
npm run test
```

#### Lints and fixes files

```
npm run lint
```

#### Build the bundled component library

```
npm run build-vue
```

### Writing interaction tests

All interaction tests are written in `component-name.interactive.stories.js` files. The title needs to be prefixed with `Interaction Tests/`. These interaction tests are hidden in the final build but are visible in the Storybook development watcher.

Example:

```js
import meta from "./cds-button.stories";

export default {
 ...meta,
 title: "Interaction Tests/base/cds-button",
 component: CdsButton,
};
```

### Writing visual tests

Stories for visual tests need to start with `VisualTest`.

Example:

```js
import { describe, test, expect } from 'vitest';
import ActionBar from '../components/ActionBar.vue';
import { mount } from '@vue/test-utils';

const actions = ['Button1', 'Button2', 'Button3'];

describe('ActionBar snapshot test', () => {
	test('renders correctly', async () => {
		const wrapper = mount(ActionBar, {
			props: {
				show: true,
				actions,
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});

```

The screenshot will be generated at the end of the Play function. If no Play function is defined then it will be created immediatly.

For reduced flakiness all animations are automatically disabled from Playwright.

## Roadmap

- See [Roadmap tag](https://github.com/aherrahul/design-system/issues?q=is%3Aissue+is%3Aopen+label%3Aroadmap) in the issues.

## Changelog

- `1.0.6` is the latest release.
- See [Releases page](https://github.com/aherrahul/design-system/releases) for the full changelog.

## Need more help?

About to get started with a new design system? I’m an independent designer and developer, specialized in helping companies to build [design systems](https://rds-design-system.netlify.app/). You can also contact me via [Link](https://rahulaher.netlify.app/contact/) and schedule a meeting with me. [Let’s talk!](https://twitter.com/rahulvijayaher) 

## Authors and License

[Rahul Aher](https://rahulaher.netlify.app/).

Licensed under the [MIT license](https://github.com/aherrahul/design-system/blob/master/LICENSE).
