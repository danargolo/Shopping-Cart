require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('Verifica se ao executar fetchItem com argumento, fetch é chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('Verifica o endpoint utilizado ao chamar a função fetchItem', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Verifica o retorno da função fetchItem', async () => {
    const request = await fetchItem('MLB1615760527');
    expect(request).toEqual(item);
  });
  it('Verifica se função retorna erro, ao chama-la sem argumento', () => {
    try {
      fetchItem();
    }
    catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });

});
