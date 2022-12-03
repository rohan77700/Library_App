// DOM Elements
const bookForm = document.querySelector('#book-form');
const title = document.querySelector('#book-form-name');
const author = document.querySelector('#book-form-author');
const pages = document.querySelector('#book-form-pages');
const read = document.querySelector('#book-form-read');
const bookSection = document.querySelector('.main');
const openFormBtn = document.querySelector('.add-btn');
const closeFormBtn = document.querySelector('.book-form-close');
const formModal = document.querySelector('.form-modal');


// Open the Modal
openFormBtn.addEventListener('click', () => {
    formModal.classList.add('active');
});


// Close the Modal
closeFormBtn.addEventListener('click', (e) => {
    formModal.classList.remove('active');
    clearInputs();
});


// Book Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


// Local Storage
const LOCAL_STORAGE = 'library.books';
const myLibrary = JSON.parse(localStorage.getItem(LOCAL_STORAGE)) || [];

const saveTodos = () => {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(myLibrary));
};


// Update the Books
Book.prototype.updateBook = function (index, value) {
    myLibrary[index].read = value;
};


// Add Books to Library
bookForm.addEventListener('submit', (e) => {
    formModal.classList.remove('active');
    e.preventDefault();
    const book = new Book(title.value, author.value, pages.value, read.checked);
    myLibrary.push(book);
    clearInputs();
    displayBooks();
});


// Remove Books from Library
function removeBook() {
    const removeBtns = document.querySelectorAll('.card-btn');
    removeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            myLibrary.splice(btn.getAttribute('data'), 1);
            displayBooks();
        });
    });
}


// Function to the Books Read Status
function UpdateRead() {
    const bookCheckbox = document.querySelectorAll('.card-checkbox');
    bookCheckbox.forEach((checkbox) => {
        checkbox.addEventListener('click', (update) => {
            const bookIndex = checkbox.getAttribute('data');
            const readValue = checkbox.checked;
            update = Object.create(Book.prototype);
            update.updateBook(bookIndex, readValue);
            saveTodos();
        });
    });
}


// Display the Books in the Library
function displayBooks() {
    bookSection.textContent = '';
    myLibrary.forEach((book, index) => {
        createBookCard(book, index);
    });
    removeBook();
    UpdateRead();
    saveTodos();
}


// Clear the modal inputs
function clearInputs() {
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}


// Creates the Books Elements
function createBookCard(book, index) {

    // Create the Bookcard
    const bookCard = document.createElement('div');
    bookCard.classList.add('card');

    // Add the cover
    const bookImage = document.createElement("div");
    bookImage.classList.add("card-image");
    bookCard.appendChild(bookImage);

    // Add the title
    const cardTitle = document.createElement('h1');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = book.title;
    bookCard.appendChild(cardTitle);

    // Add the author
    const cardAuthor = document.createElement('p');
    cardAuthor.classList.add('card-author');
    cardAuthor.innerText = book.author;
    bookCard.appendChild(cardAuthor);

    // Add the pages
    const cardPages = document.createElement('p');
    cardPages.classList.add('card-pages');
    cardPages.innerText = book.pages;
    
    // Add icon to the pages
    const cardPagesIcon = document.createElement('img');
    cardPagesIcon.setAttribute('src', 'assets/book-half.svg');
    cardPagesIcon.classList.add('card-pages-svg');
    cardPages.appendChild(cardPagesIcon);
    bookCard.appendChild(cardPages);

    // Add the status
    const cardCheckbox = document.createElement('input');
    cardCheckbox.setAttribute('data', index);
    cardCheckbox.setAttribute('type', 'checkbox');
    cardCheckbox.setAttribute('id', `checkbox${index}`);
    cardCheckbox.setAttribute('name', `checkbox${index}`);
    cardCheckbox.classList.add('card-checkbox');
    cardCheckbox.checked = book.read;
    bookCard.appendChild(cardCheckbox);

    // Add the status label
    const cardCheckboxLabel = document.createElement('label');
    cardCheckboxLabel.setAttribute('for', `checkbox${index}`);
    cardCheckboxLabel.classList.add('card-checkbox-label');

    // Add icon to the status
    const cardCheckboxLabelIcon = document.createElement('img');
    cardCheckboxLabelIcon.setAttribute('src', 'assets/bookmark-check.svg');
    cardCheckboxLabelIcon.classList.add('card-checkbox-label-svg');
    cardCheckboxLabel.appendChild(cardCheckboxLabelIcon);
    bookCard.appendChild(cardCheckboxLabel);

    // Add the remove button
    const cardBtn = document.createElement('button');
    cardBtn.setAttribute('data', index);
    cardBtn.classList.add('card-btn');
    
    // Add icon to the remove button
    const cardBtnIcon = document.createElement('img');
    cardBtnIcon.setAttribute('src', 'assets/trash2.svg');
    cardBtnIcon.classList.add('card-btn-svg');
    cardBtn.appendChild(cardBtnIcon);
    bookCard.appendChild(cardBtn);

    // Add the new Book to Library section
    bookSection.appendChild(bookCard);
}

displayBooks();