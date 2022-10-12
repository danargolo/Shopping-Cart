const fetchProducts = async (param) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
  
  try {
    const request = await fetch(url);
    const data = await request.json();
    return data; 
  } catch (error) {
    console.log('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
