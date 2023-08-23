let counter = 0;
const books = [];
const cart = [];

fetch("https://striveschool-api.herokuapp.com/books")
  .then((responseObj) => responseObj.json())
  .then((bookObj) => {
    bookObj.forEach((book) => {
      cardGenerator(book);
    });
  })
  .then((bookObj) => {
    addButton();
    scartButton();
  })
  .catch((error) => console.log(error));

const cardGenerator = function (book) {
  const row = document.querySelector(".row");

  const bookPicture = book.img;
  const bookTitle = book.title;
  const bookPrice = book.price;
  counter++;

  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `<div class="card" id="card-${counter}">
                        <img src="${bookPicture}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${bookTitle}</h5>
                        <div class=" d-flex flex-column justify-content-bectween align-items-center">
                            <p class="card-text m-0">Price: ${bookPrice}$</p>
                            <div class="mt-2">
                                <a href="#" class="btn btn-primary" id="add-${counter}">Aggiungi</a>
                                <a href="#" class="btn btn-danger" id="delete-${counter}">Scarta</a>
                            </div>
                        </div>
                        </div>
                        </div>`;

  row.appendChild(col);

  const bookObject = {
    id: counter,
    img: bookPicture,
    title: bookTitle,
    price: bookPrice,
  };

  books.push(bookObject);
};

const addButton = function () {
  const AddButtons = document.querySelectorAll(".btn-primary");

  AddButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const btnId = btn.id;
      const btnIdSplitted = btnId.split("-");

      const counterId = btnIdSplitted[1];
      const cardId = "card-" + counterId;

      console.log(cart);

      const selectedBook = books[counterId - 1];
      cart.push(selectedBook);

      const convertedCart = JSON.stringify(cart);

      localStorage.setItem("carrello", convertedCart);

      const cartStorage = localStorage.getItem("carrello");

      const convertedStorage = JSON.parse(cartStorage);

      const ul = document.querySelector("ul");

      const li = document.createElement("li");
      li.className = "list-group-item d-flex";

      li.innerHTML = `${
        convertedStorage[counterId - 1]
      }<button class="btn btn-secondary p-1 rounded-2 d-flex ms-auto">elimina</button>`;

      ul.appendChild(li);
    });
  });
};

const scartButton = function () {
  const deleteBtns = document.querySelectorAll(".btn-danger");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const btnId = btn.id;
      const btnIdSplitted = btnId.split("-");
      const counterId = btnIdSplitted[1];
      const cardId = "card-" + counterId;
      document.getElementById(cardId).style.display = "none";
    });
  });
};

console.log(books);
