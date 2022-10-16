const elementCartList = document.querySelector('.cart__items');
const cart = document.querySelector('.cart');
const emptyBtn = document.querySelector('.empty-cart');

const loadingText = () => {
  const items = document.querySelector('.items');
  const loading = document.createElement('span');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  items.appendChild(loading);
};

const removeLoading = () => {
  const load = document.querySelector('.loading');
  load.remove();
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const cartItemClickListener = (param) => {
  localStorage.clear();
  param.target.remove();
  saveCartItems(elementCartList.innerHTML);
};

const removeOnLoadCartList = () => {
  const li = document.querySelectorAll('li');
  li.forEach((l) => l.addEventListener('click', (cartItemClickListener)));
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addToCart = async (param) => {
  const cartList = document.querySelector('.cart__items');
  const productId = param.target.parentNode.childNodes[0];
  const { id, title, price } = await fetchItem(productId.innerText);
  cartList.append(createCartItemElement({ id, title, price }));
  saveCartItems(elementCartList.innerHTML);
};

const createBtnListener = () => {
  const addButtons = document.querySelectorAll('.item__add');
  addButtons.forEach((addBtn) => addBtn.addEventListener('click', addToCart));
};

const createProductList = async () => {
  const items = document.querySelector('.items');
  const { results } = await fetchProducts('computador');
  results.forEach(async ({ id, title, thumbnail }) => {
    items.append(createProductItemElement({ id, title, thumbnail }));
  });
  createBtnListener();
  removeLoading();
};

const emptyCart = () => {
  emptyBtn.addEventListener('click', () => {
    elementCartList.innerHTML = '';
    saveCartItems(elementCartList.innerHTML);
  });
};

const createPriceSpan = async () => {
  const span = document.createElement('span');
  span.className = 'total-price';
  cart.insertBefore(span, emptyBtn);
  span.innerText = 'Valor Total: R$ ';
};

const findCartPrice = async () => {
  let totalPrice = 0;
  const li = document.querySelectorAll('li');
  li.forEach((l) => {
    const price = (l.innerText).split(' ').find((priceString) => priceString.includes('$'));
    totalPrice += ((Number(price.replace('$', ''))));
  });
  return totalPrice;
};

const elementListener = async () => {
  createPriceSpan();
  const span = document.querySelector('.total-price');
  elementCartList.addEventListener('DOMSubtreeModified', async () => {
    const price = await findCartPrice();
    span.innerText = `Valor Total: R$ ${price}`;
  });
};

const localStorageLoad = async () => {
  elementCartList.innerHTML = getSavedCartItems();
};

window.onload = () => {
  loadingText();
  elementListener();
  localStorageLoad();
  createProductList();
  removeOnLoadCartList();
  emptyCart();  
};
