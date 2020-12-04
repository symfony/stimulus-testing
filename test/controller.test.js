/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import { Application, Controller } from 'stimulus';
import { getByTestId, waitFor } from '@testing-library/dom';
import { clearDOM, mountDOM } from '../dist/index';

// Controller used to check the actual controller was properly booted
class AppController extends Controller {
    connect() {
        this.element.classList.add('connected');
    }
}

const startStimulus = () => {
    const application = Application.start();
    application.register('app', AppController);
};

describe('AppController', () => {
    let container;

    beforeEach(() => {
        container = mountDOM(`
            <div data-testid="app" data-controller="app"></div>
        `);
    });

    afterEach(() => {
        clearDOM();
    });

    it('connect', async () => {
        expect(getByTestId(container, 'app')).not.toHaveClass('connected');

        startStimulus();
        await waitFor(() => expect(getByTestId(container, 'app')).toHaveClass('connected'));
    });
});
