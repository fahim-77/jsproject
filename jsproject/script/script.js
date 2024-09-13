////////// search word //////////
const searchWord = document.querySelector("#search-word");
const itemsDown = document.querySelectorAll(".item-down");

////////// search price //////////
const priceCount = document.querySelectorAll(".price-count");
const buttonSearch = document.querySelector(".search-button");
const searchPrice = document.querySelector("#search-price");

////////// filters //////////
const filters = document.querySelectorAll(".filters");
const products = document.querySelectorAll(".product-items");

////////////////////////////////////////////////////////
const cart = { item: [], totalPrice: 0 };

/////////////
const list = document.querySelector(".list");
const linkShop = document.querySelector(".fa");
const buttonsAdd = document.querySelectorAll(".add");
const divInsert = document.querySelectorAll(".insert-count");

////////// search word //////////
const searchWordHandler = (event) => {
  const inputWord = event.target.value.toLowerCase().trim();
  itemsDown.forEach((item) => {
    const title = item.children[0].innerText.toLowerCase();
    if (title.includes(inputWord)) {
      item.parentElement.style.display = "block";
    } else {
      item.parentElement.style.display = "none";
    }
  });
};

////////// search price //////////
const searchPriceHandler = (event) => {
  const inputPrice = event.target.previousElementSibling.value.trim();
  priceCount.forEach((price) => {
    const prices = price.children[0].innerText;
    if (prices === inputPrice) {
      price.parentElement.parentElement.style.display = "block";
    } else {
      price.parentElement.parentElement.style.display = "none";
    }
  });
};

////////// filter //////////
const filterHandler = (event) => {
  filters.forEach((item) => {
    item.classList.remove("active");
  });

  event.target.classList.add("active");
  products.forEach((product) => {
    const dataset = product.dataset.category;
    const eventDataset = event.target.dataset.filter;
    if (eventDataset === "all") {
      product.style.display = "block";
    } else if (dataset.includes(eventDataset)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
};

////////// check //////////
function loadLocalStorage() {
  const unParsedCart = localStorage.getItem("cart");
  if (unParsedCart) {
    const parsed = JSON.parse(unParsedCart);
    cart.item = [...parsed.item];
    cart.totalPrice = parsed.totalPrice;
    console.log(cart);
  }
}

////////// insert new item & remove item //////////
const insertHandler = (event) => {
  if (event.target.innerText === "Add") {
    if (event.target.previousElementSibling.value) {
      event.target.style.width = "60px";
      event.target.innerText = "remove";
      const buttonsAdd2 = [...buttonsAdd];
      const productItem = {
        id: buttonsAdd2.indexOf(event.target),
        title:
          event.target.parentElement.parentElement.previousElementSibling
            .innerText,
        price: event.target.parentElement.previousElementSibling.innerText,
        count: event.target.previousElementSibling.value,
        total:
          event.target.parentElement.previousElementSibling.innerText *
          event.target.previousElementSibling.value,
      };
      for (let i in cart.item) {
        if (cart.item[i].id === productItem.id) {
          productItem.count =
            +cart.item[i].count + +event.target.previousElementSibling.value;
          cart.item.splice(i, i + 1);
        }
      }
      if (productItem.total !== 0) {
        cart.item.push(productItem);
        cart.totalPrice = cart.item.reduce(
          (acc, cur) => acc + cur.count * cur.price,
          0
        );
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      event.target.parentElement.value = null;
    }
  } else if (event.target.innerText === "remove") {
    const buttonsAdd2 = [...buttonsAdd];
    for (let i in cart.item) {
      if (cart.item[i].id === buttonsAdd2.indexOf(event.target)) {
        cart.item.splice(i, i + 1);
      }
    }
    if (cart.total !== 0) {
      cart.totalPrice = cart.item.reduce(
        (acc, cur) => cur.count * cur.price - acc,
        0
      );
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    event.target.previousElementSibling.value = null;
    event.target.innerText = "Add";
  }
};

////////// event //////////
window.addEventListener("load", () => {
  loadLocalStorage();
  searchWord.addEventListener("keyup", searchWordHandler);
  buttonSearch.addEventListener("click", searchPriceHandler);

  filters.forEach((button) => button.addEventListener("click", filterHandler));

  buttonsAdd.forEach((button) => {
    button.addEventListener("click", insertHandler);
  });
});
