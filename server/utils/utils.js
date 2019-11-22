/* Helper fuction that takes in a string and
** removes the empty space and converts it to 
** lowercase
*/
const getKeyword = keyword => keyword.toLocaleLowerCase().split(' ', keyword.length);

// Exporting function
module.exports = { getKeyword };
