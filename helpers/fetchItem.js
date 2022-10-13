const fetchItem = async (param) => {
  const url = `https://api.mercadolibre.com/items/${param}`;

  try {
    const request = await fetch(url);
    const data = await request.json();
    return data;
  } catch (error) {
    console.log('You must provide an url');
  }
};

// fetchItem('MLB1615760527');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
