/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const mountDOM = (htmlString = '') => {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    document.body.appendChild(div);

    return div;
};

const clearDOM = () => {
    document.body.innerHTML = '';
};

export { clearDOM, mountDOM };
