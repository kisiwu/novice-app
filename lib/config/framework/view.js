/**
 * 
 * @param {Object} current 
 * @param {Object} added 
 */
function configFrameworkView(current, added) {
  var v = {};
  Object.keys(current).forEach(
    key => {
      v[key] = current[key];
    });

  if (added && typeof added === 'object') {
    Object.keys(added).forEach(
      key => {
        switch (key) {
          case 'engine':
            if (typeof added[key] === 'string') {
              v[key] = added[key];
            }
            break;
          default:
            break;
        }
      });
  }

  return v;
}

module.exports = configFrameworkView;
