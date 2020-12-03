# Symfony UX Stimulus testing

Symfony UX Stimulus testing is a low-level package to help write tests for Stimulus controllers
in applications and reusable packages.

**If you are developing a project with Symfony Flex, you should probably use the ux-test-pack
instead**. The pack includes this package and configures it automatically in your application.

Symfony UX Stimulus testing is currently considered **experimental**.

## Installation

```sh
yarn add @symfony/stimulus-testing
```

## Usage

Symfony UX Stimulus testing ships several tools to help write tests for Stimulus controllers:

* it uses [Jest](https://jestjs.io/) as test runner ;
* it relies internally on [jsdom](https://github.com/jsdom/jsdom) and mutationobserver-shim to emulate a DOM
  implementation and allow to execute Stimulus controllers in the console ; 
* it provides an integration of [Testing Library](https://testing-library.com/) ;
* it provides helper functions to ease Stimulus tests development in Symfony projects and bundles ;

To start using Symfony UX Testing, you first need to configure a testing environment:

1. Create a `assets/test` directory ;

2. Create a `assets/test/setup.js` file to initialize Symfony UX Testing:   

```js
import '@symfony/ux-testing/setup';
```

3. Create a `assets/jest.config.js` file for Jest configuration:
 
```js
module.exports = {
    'testRegex': 'test/.*\\.test.js',
    'setupFilesAfterEnv': ['./test/setup.js']
};
```

4. Create a `assets/.babelrc` file for Babel configuration (you may need to install Babel, 
`@babel/plugin-proposal-class-properties` and `@babel/preset-env` if you haven't already):

```json
{
    "presets": ["@babel/env"],
    "plugins": ["@babel/plugin-proposal-class-properties"]
```

5. Finally, create your first test, for instance `hello_controller.test.js`:

```js
import { Application } from 'stimulus';
import { clearDOM, mountDOM } from '@symfony/stimulus-testing';
import HelloController from '../controllers/hello_controller.js';

const startStimulus = () => {
    const application = Application.start();
    application.register('hello', HelloController);
};

describe('HelloController', () => {
    let container;

    beforeEach(() => {
        container = mountDOM('<div data-controller="hello"></div>');
    });

    afterEach(() => {
        clearDOM();
    });

    it('connect', async () => {
        startStimulus();

        // Write a test here ...
    });

    // You can create other tests here
});
```
