/**
 * Helper to identify if the argument is a function
 * @param {object} obj
 * @returns bool
 */
function isFunction(obj) {
  return typeof obj === 'function';
}

/**
 * Function to notify that a function is deprecated or a method in a object
 * @param {Object|Function} obj
 * @param {Object} config
 * @returns Object|Function
 */
function deprecated(obj, config) {
  const {
    method = null,
    message = 'This will be deprecated soon',
    logger = console,
    sendMetrics = () => {},
  } = config || {};

  if (obj == null) {
    throw new Error('The param obj is required');
  }

  if (isFunction(obj)) {
    logger.warn(message);
    sendMetrics();
    return (...args) => obj(...args);
  }

  if (!isFunction(obj[method])) {
    throw new Error('The object not have the method defined');
  }

  return new Proxy(obj, {
    get(_, property) {
      if (property === method) {
        logger.warn(message);
        sendMetrics();
      }
      // eslint-disable-next-line prefer-rest-params
      return Reflect.get(...arguments);
    },
  });
}

module.exports = deprecated;
