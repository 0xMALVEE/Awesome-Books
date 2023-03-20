const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const form = document.querySelector('.form');

const bookList = document.querySelector('.books-list');

let books = [];

const reterevedBooks = localStorage.getItem('books');

function renderBooks() {
  let finalHtml = '';

  books.forEach((book) => {
    const htmlToInsert = `
      <div>
        <p>${book.title}</p>
        <p>${book.author}</p>
        <button id="remove-${book.id}"> Remove </button>
      </div>
      <hr>
    `;
    finalHtml += htmlToInsert;
  });
  bookList.innerHTML = finalHtml;
}

if (reterevedBooks) {
  books.push(...JSON.parse(reterevedBooks));
  renderBooks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputTitle.value.length !== 0 && inputAuthor.value.length !== 0) {
    if (books.length !== 0) {
      books.push({
        title: inputTitle.value,
        author: inputAuthor.value,
        id: books[books.length - 1].id + 1,
      });
    } else {
      books.push({
        title: inputTitle.value,
        author: inputAuthor.value,
        id: 1,
      });
    }

    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
  }
});

books.forEach((book) => {
  const removeBtn = document.querySelector('#remove-' + book.id);

  removeBtn.addEventListener('click', function () {
    const id = book.id;

    books = books.filter((element) => element.id !== book.id);

    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
  });
});
