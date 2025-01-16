let items = [];
let cartItems = [];
let details = []
// initial fetching
const getData = (w = "s=i", query='search') => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/${query}.php?${w}`)
    .then((res) => res.json())
    .then((data) => {
      if(query=='lookup'){
        details = data?.drinks;
        console.log(details);
        showDetails('', false);
        return
      }
      items = data?.drinks;
      console.log(items);
      showCards();
    })
    .catch((e) => console.log(e));
};
getData();

const showCards = () => {
  const cardsContainer = document.getElementById("cocktail-items");
  cardsContainer.innerHTML = "";

  items.map((item) => {
    cardsContainer.innerHTML += `
        <div class="card mt-3 mx-auto" style="width: 18rem">
          <img src=${item?.strDrinkThumb} class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text mb-0">
              <span class="fw-bold">Name:</span> ${item?.strDrink}
            </p>
            <p class="card-text">
              <span class="fw-bold">Category:</span> ${item?.strCategory}
            </p>
            <p class="card-text">
              <span class="fw-bold">Instructions:</span> ${item?.strInstructions?.slice(
                0,
                15
              )}...
            </p>
            <div>
                <button class="btn btn-light border-secondary" id="btn-add-to-cart" onclick="addToCart(event, ${
                  item?.idDrink
                })">Add to Cart</button>
                <button class="btn btn-light border-secondary" onclick="showDetails(${item?.idDrink})" data-bs-toggle="modal" data-bs-target="#detailsModal">Details</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
};

const search = () => {
  const inputElement = document.getElementById("search-input");
  const w = inputElement.value;
  getData(`s=${w}`);
  inputElement.value = "";
};

const addToCart = (e, idDrink) => {
  if (cartItems.length == 7) {
    alert("Cart is full!!!");
    return;
  }
  e.target.setAttribute("disabled", true);
  const addedItem = items.find((item) => idDrink + "" === item?.idDrink);
  if (!cartItems.includes(addedItem)) cartItems = [...cartItems, addedItem];
  else return;
  document.getElementById("number-of-selected-carts").innerText =
    cartItems.length;
  const tBody = document.getElementById("cart-table-body");
  tBody.innerHTML += `
  <tr>
    <th scope="row">${cartItems.length}</th>
    <td>
      <img class="img-fluid cart-image rounded-circle" src="${addedItem?.strDrinkThumb}" alt="">
    </td>
    <td>${addedItem?.strDrink}</td>
  </tr>
  `;
};

const showDetails = (idDrink, setItem=true) => {
  if(setItem)
    getData(`i=${idDrink}`, "lookup");
  else{
    console.log('working')
    modalContent = document.getElementById("modal-content");
    modalContent.innerHTML =
    `
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalHeading">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
    `
    
  }
}