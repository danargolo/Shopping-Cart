// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
const olCartItems = document.querySelector('.cart__items');
const emptyBtn = document.querySelector('.empty-cart');

const getProductResults = async () => {
  const data = await fetchProducts('computador');
  return data.results;
};

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const deleteLocalCart = () => {
  localStorage.clear();
};

const cartItemClickListener = (param) => {
  deleteLocalCart();
  param.target.remove();
  saveCartItems(olCartItems.innerHTML);
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getProductId = async (param) => {
  const id = param.parentNode.childNodes[0];
  return id.innerText;
};

const addToCart = async (param) => {
  const cartList = document.querySelector('.cart__items');
  const productId = await getProductId(param);
  const { id, title, price } = await fetchItem(productId);

  cartList.append(createCartItemElement({ id, title, price }));
  saveCartItems(olCartItems.innerHTML);
};

const createBtnListener = () => {
  const addButtons = document.querySelectorAll('.item__add');
  addButtons.forEach((addButton) => addButton.addEventListener('click', (param) => {
    deleteLocalCart();
    addToCart(param.target);
  }));
};

const getProductInfo = async () => {
  const items = document.querySelector('.items');
  const products = await getProductResults();
  products.forEach(async ({ id, title, thumbnail }) => {
    items.append(createProductItemElement(({ id, title, thumbnail })));
  });
  createBtnListener();
};

const removeOnLoadList = () => {
  const li = document.querySelectorAll('li');
  li.forEach((l) => {
    console.log(l.innerText);
    l.addEventListener('click', cartItemClickListener);  
  });
};

// const removeOnLoadList = () => {
//   const li = document.querySelectorAll('li');
//   li.forEach((l) => l.addEventListener('click', cartItemClickListener));  
// };

const load = async () => {
  olCartItems.innerHTML = getSavedCartItems();
};

const emptyCart = () => {
  emptyBtn.addEventListener('click', () => {
    olCartItems.innerHTML = '';
  });
};

window.onload = async () => {
  load();
  getProductInfo();
  removeOnLoadList();
  emptyCart();
};
