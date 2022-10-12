const { fetchProducts } = require('../helpers/fetchProducts');
const fetchSimulator = require('../mocks/fetchSimulator');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se fetchProducts é uma função.', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it('Ao executar função, verifica se fetch é chamada.', async () => {
    expect.assertions(1);
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica o endpoint utilizado, ao chamar a função fetchProducts.', async () => {
    expect.assertions(1);
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });

  it('Verifica o retorno da função fetchProducts.', async () => {
    const request = await fetchProducts('computador')
    expect(request).toEqual(computadorSearch);
  })
  it('Verifica se função retorna erro, ao chama-la sem argumento', async () => {
    try {
      await fetchProducts();
    }
    catch (error) {
      expect(error).toEqual(new Error('You must provide an url'))
    }
  })
});
