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

const createProductImageElement = (imageSource, param) => {
  const img = document.createElement('img');
  img.className = param;
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
  section.appendChild(createProductImageElement(thumbnail, 'item__image'));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const cartItemClickListener = (param) => {
  localStorage.clear();
  param.target.closest('li').remove();
  saveCartItems(elementCartList.innerHTML);
};

const removeOnLoadCartList = () => {
  const trashCan = document.querySelectorAll('.item__delete');
  trashCan.forEach((trash) => trash.addEventListener('click', cartItemClickListener));
};


const createNotVisibleId = (innerText) => {
  const p = document.createElement('p');
  p.className = 'cart_id';
  p.style.display = 'none';
  p.innerText = innerText;
  return p;
};

const createDivThumbTittle = (thumbnail, title) => {
  const div = document.createElement('div');
  div.className = 'product_info';
  div.append(createProductImageElement(thumbnail, 'image_cart'));
  div.append(createCustomElement('p', 'cart_tittle', title));
  return div;
};

const createDivPriceTrash = (price) => {
  const div = document.createElement('div');
  div.className = 'price_trash';
  div.append(createCustomElement('span', 'cart_price', `Preço: R$ ${price}`));
  const img = document.createElement('img');
  img.addEventListener('click', cartItemClickListener);
  div.append(img);
  img.className = 'item__delete';
  img.src = 'images/lixo.png';
  return div;
}

const createCartItemElement = ({ id, title, price, thumbnail }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.append(createNotVisibleId(id));
  li.append(createDivThumbTittle(thumbnail,title));
  li.append(createDivPriceTrash(price));
  return li;
};

const addToCart = async (param) => {
  const cartList = document.querySelector('.cart__items');
  const productId = param.target.parentNode.childNodes[0];
  const { id, title, price, thumbnail } = await fetchItem(productId.innerText);
  cartList.append(createCartItemElement({ id, title, price, thumbnail }));
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
  const li = document.querySelectorAll('.cart_price');
  li.forEach((l) => {
    const price = (l.innerText).split(' ');
    totalPrice += ((Number(price[2])));
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
  emptyCart();
  removeOnLoadCartList();
};
