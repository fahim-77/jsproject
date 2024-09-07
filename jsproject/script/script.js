const searchWord = document.querySelector("#search-word");
const products = document.querySelectorAll(".product-items");

const searchPrice = document.querySelector("#search-price");
const buttonSearch = document.querySelector(".search-button");
const prices = document.querySelectorAll(".item-down");

const filters = document.querySelectorAll(".filters");

const searchWordHandler = (event) => {
  const inputWord = event.target.value.toLowerCase().trim();
  products.forEach((product) => {
    const title = product.children[1].children[0].innerText.toLowerCase();
    if (title.includes(inputWord)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
};

const searchPriceHandler = (event) => {
  const inputPrice = event.target.parentElement.children[0].value
    .toLowerCase()
    .trim();
  event.target.parentElement.children[0].value = null;
  prices.forEach((price) => {
    const priceItem = price.children[1].innerText;
    if (priceItem.includes(inputPrice)) {
      price.parentElement.style.display = "block";
    } else {
      price.parentElement.style.display = "none";
    }
  });
};

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

window.addEventListener("load", () => {
  searchWord.addEventListener("keyup", searchWordHandler);
  buttonSearch.addEventListener("click", searchPriceHandler);
  filters.forEach((button) => button.addEventListener("click", filterHandler));
});
