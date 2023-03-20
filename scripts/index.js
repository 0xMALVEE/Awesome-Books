const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const form = document.querySelector('.form');

const bookList = document.querySelector('.books-list');

const books = [];

const reterevedBooks = localStorage.getItem('books');

function renderBooks() {
  let finalHtml = '';

  books.forEach((book) => {
    const htmlToInsert = `
      <div>
        <p>${book.title}</p>
        <p>${book.author}</p>
        <button> Remove </button>
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
    books.push({
      title: inputTitle.value,
      author: inputAuthor.value,
    });
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
  }
});