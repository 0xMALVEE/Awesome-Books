const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const form = document.querySelector('.form');

const bookList = document.querySelector('.books-list');

class BookList {
  constructor() {
    this.books = [];
  }

  addBook() {
    if (inputTitle.value.length !== 0 && inputAuthor.value.length !== 0) {
      if (this.books.length !== 0) {
        this.books.push({
          title: inputTitle.value,
          author: inputAuthor.value,
          id: this.books[this.books.length - 1].id + 1,
        });
        inputTitle.value = '';
        inputAuthor.value = '';
      } else {
        this.books.push({
          title: inputTitle.value,
          author: inputAuthor.value,
          id: 1,
        });
        inputTitle.value = '';
        inputAuthor.value = '';
      }

      localStorage.setItem('books', JSON.stringify(this.books));
      this.renderBooks();
      this.setRemoveEventListeners();
    }
  }

  renderBooks() {
    let finalHtml = '';
    let i = 0;
    this.books.forEach((book) => {
      let grayBg = '';
      if (i % 2 === 0) {
        grayBg = 'gray-bg';
      }
      const htmlToInsert = `
        <div class="books ${grayBg}">
          <p>"${book.title}" By ${book.author}</p>
          <button id="remove-${book.id}"> Remove </button>
        </div>
      `;
      i += 1;
      finalHtml += htmlToInsert;
    });
    bookList.innerHTML = `<div class="book-wrapper">${finalHtml}</div>`;
  }

  setRemoveEventListeners() {
    this.books.forEach((book) => {
      const removeBtn = document.getElementById(`remove-${book.id}`);
      removeBtn.addEventListener('click', () => {
        this.books = this.books.filter((element) => element.id !== book.id);

        localStorage.setItem('books', JSON.stringify(this.books));
        this.renderBooks();
        this.setRemoveEventListeners();
      });
    });
  }
}

const booksList = new BookList();

const reterevedBooks = localStorage.getItem('books');

if (reterevedBooks) {
  booksList.books.push(...JSON.parse(reterevedBooks));
  booksList.renderBooks();
  booksList.setRemoveEventListeners();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  booksList.addBook();
});
