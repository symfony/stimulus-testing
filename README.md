# Symfony UX Stimulus testing

> [!WARNING]
> **Deprecated**: This package is deprecated and will not receive any further updates.

Because this package only provides very small helpers to help write tests for Stimulus controllers, and is tightly coupled with [Jest](https://jestjs.io/), [jsdom](https://github.com/jsdom/jsdom) and [Testing Library](https://testing-library.com/) dependencies, we can no longer recommend it.

In 2025, we cannot force developers to install Jest (and [~270 sub-dependencies](https://npmgraph.js.org/?q=jest) including [Babel](https://babeljs.io/)) and the like, since [many test runners exist](https://npmtrends.com/ava-vs-japa-vs-jasmine-vs-jest-vs-karma-vs-mocha-vs-tap-vs-vitest), and many of them are more modern and much faster, like [Vitest](https://vitest.dev/).

We want to give you the choice to use the best tools for your needs, and not force you to use what we suggested in the past.

To migrate from `@symfony/stimulus-testing`, you can follow these steps:

1. Install the dev dependencies `@testing-library/jest-dom @testing-library/dom`;
    you may also want to install `mutationobserver-shim regenerator-runtime` if you still have 
    legacy code or _architecture_.
2. In the file `assets/test/setup.js`, replace imports:
```diff
-import '@symfony/stimulus-testing/setup';
+import '@testing-library/jest-dom';
```
3. Create the file `assets/test/stimulus-helpers.js` with the following content:
```js
export function mountDOM(html = '') {
    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);

    return div;
}

export function clearDOM() {
    document.body.innerHTML = '';
}
```
4. In your tests files, replace imports for `mountDOM` and `clearDOM`:
```diff
// assets/test/controllers/hello_controller.test.js
-import { clearDOM, mountDOM } from '@symfony/stimulus-testing';
+import { clearDOM, mountDOM } from '../stimulus-helpers';
```
5. And finally, remove the `@symfony/stimulus-testing` dependency from your project.

---

Symfony UX Stimulus testing is a low-level package to help write tests for Stimulus controllers
in applications and reusable packages.

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
import '@symfony/stimulus-testing/setup';
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
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

5. Finally, create your first test, for instance `hello_controller.test.js`:

```js
import { Application } from '@hotwired/stimulus';
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
