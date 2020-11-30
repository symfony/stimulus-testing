/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountDOM = exports.clearDOM = void 0;

var mountDOM = function mountDOM() {
  var htmlString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var div = document.createElement('div');
  div.innerHTML = htmlString;
  document.body.appendChild(div);
  return div;
};

exports.mountDOM = mountDOM;

var clearDOM = function clearDOM() {
  document.body.innerHTML = '';
};

exports.clearDOM = clearDOM;