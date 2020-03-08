/**
 * 
 * @param {Object} current 
 * @param {Object} added 
 */
function configFrameworkDocs(current, added) {
  var v = {};
  Object.keys(current).forEach(
    key => {
      v[key] = current[key];
    });

  if (added && typeof added === 'object') {
    Object.keys(added).forEach(
      key => {
        v[key] = added[key];
      });
  }

  return v;
}

module.exports = configFrameworkDocs;
