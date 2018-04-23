import Noty from 'noty';

import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';

/**
 * Create a new alert with given type and message
 *
 * @param {string} type
 * @param {string} text
 * @param {Object} options
 */
function alert(type, text, options) {
  let noty = new Noty({
    theme: 'mint',
    layout: 'topRight',
    type,
    text,
    progressBar: false,
    callbacks: {
      onHover: () => {
        noty.stop();
      }
    },
    ...options
  }).show();
}

/**
 * Create error alert
 *
 * @param {string} text
 * @param {Object} options
 */
export function error(text, options) {
  alert('error', text, {
    timeout: 2000,
    ...options
  });
}

export function success(text, options) {
  alert('success', text, {
    timeout: 2000,
    ...options
  });
}
