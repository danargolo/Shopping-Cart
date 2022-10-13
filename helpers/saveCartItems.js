const saveCartItems = (param) => {
  localStorage.setItem('cartItem', param);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
