const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Verifica se "localStorage.setItem" é chamado ao executar função.', () => {
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Verifica se "localStorage.setItem" é chamado com 2 parâmetros: "cartItem" e cartItem', () => {
    const cartItem = 'teste';
    saveCartItems(cartItem);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItem', cartItem);
  })
});
