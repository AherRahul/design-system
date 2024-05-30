<p align="center">
  <a href="https://sysvale.github.io/cuida">
    <img src="https://framerusercontent.com/images/xz7CrU73qctPY2Vm79XMnTAVM.svg" alt="Take care soon" width="250" />
  </a>
</p>

<div align="center">
  <p align="center">A design system built by Sysvale, using storybook and Vue components</p>
  <p align="center">https://cuida.framer.wiki/</p>
  <p align="center">https://main--6168a1779cac8c003ab99c2d.chromatic.com</p>
</div>

## Installing

- Cuida can be installed with npm:

```bash
npm i @sysvale/cuida;
```

## Using

- To use Cuida, import the library into your entry point, it will probably be your main.js or app.js:

```js
import Cuida from "@sysvale/cuida";
```

- Import Cuida styles:
```js
import '@sysvale/cuida/dist/style.css';
```

- And install Cuida:

```js
Vue.use(Care);
```

- Now to use the components, just use them in your template. As an example, to use the
  [Badge](https://sysvale.github.io/cuida/?path=/docs/componentes-display-badge--badge):

```html
<cds-badge variant="gray"> Contents </cds-badge>
```

- To use tokens, import them into your script tag.

```html
<style lang="scss" scoped>
  @import 'node_modules/@sysvale/cuida/dist/@sysvale/tokens.scss';
  ...
</style>
```

## Developing

### Configuring the project

- Clone the repository:

```bash
git clone https://github.com/Sysvale/cuida.git
```

- Install the dependencies and upload the docker container:

```bash
docker-compose up -d
```

The application will be available on port `6006`, at [http://localhost:6006/](http://localhost:6006).

- If you don't want to use Docker, install the dependencies with:

```bash
npm i
```

### Executing Care

- After executing the command `docker-composer up -d` the application will start with installation and build in the background and will be accessible after a few seconds at [http://localhost:6006/](http://localhost:6006) . Progress can also be tracked by running `docker-compose logs -f main`.
  .
- Or alternatively, without docker, just run:

```bash
npm run storybook
```

### Testing it

- Using docker:

```bash
docker-compose exec takes care of npm run test
```

or

```bash
./on-server.sh npm run test
```

- Without docker:

```bash
npm run test
```

## Contributing

For information on how to contribute to the project, visit [CONTRIBUTING.MD](https://github.com/Sysvale/cuida/blob/main/CONTRIBUTING.md)