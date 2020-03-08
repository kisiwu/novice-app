/**
 * 
 * @param {Function[]} current 
 * @param {Function|Function[]} added 
 */
function configFrameworkValidators(current, added) {
  var v = [];
  v = v.concat((current || []));

  if (typeof added === 'function') {
    v.push(added);
  } else if(Array.isArray(added)) {
    added.forEach(
      element => {
        if (typeof element === 'function') {
          v.push(element);
        }
      });
  }

  return v;
}

module.exports = configFrameworkValidators;