const greeting = document.querySelector(".greeting");
const hour = new Date().getHours();
const addBookBtn = document.querySelector(".addBook");
const userBookContainer = document.querySelector(".user-books");
const form = document.querySelector("form");
const bookName = document.querySelector("#book_Name");
const authorName = document.querySelector("#author_Name");
const pagesRead = document.querySelector("#pages_reads");
const tbody = document.querySelector("tbody");
const conditionMsg = document.querySelector(".conditionalMsg");
const table = document.querySelector("table");
const addNewBookBtn = document.querySelector(".add-your-book");
const initalSentence = document.querySelector(".inital-sentence");
const bookData = document.querySelector(".book-data");
const closeBtn = document.querySelector(".close");

let myLibrary = JSON.parse(localStorage.getItem("library") || "[]");

if (hour < 12) {
  greeting.innerHTML = "GOOD MORNING !!!";
} else if (hour < 17) {
  greeting.innerHTML = "GOOD AFTERNOON !!!";
} else {
  greeting.innerHTML = "GOOD EVENING !!!";
}
addBookBtn.addEventListener("click", () => {
  userBookContainer.style.display = "none";
  form.style.display = "block";
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  userBookContainer.style.display = "flex";
  form.style.display = "none";
});

function displayBook() {
  bookData.innerHTML = "";

  myLibrary.forEach((book) => {
    const row = document.createElement("div");
    row.className = "book-card";
    row.innerHTML = `

    <h2 class="user-book-name">Book Name : ${book.bookName} </h2> 
    <p class="user-author-name">Author Name : ${book.authorName}</p>

    <p class="user-pages-read">Pages Read : ${book.pagesRead}<p>

    <div class="book-handler">
    <button class="bookRead">READ</button>
    <button class="deleteBtn">DELETE</button>
    </div>

    `;
    bookData.append(row);

    const deleteBtn = row.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", () => {
      myLibrary = myLibrary.filter(
        (deletedBook) => deletedBook.randomId !== book.randomId
      );
      localStorage.setItem("library", JSON.stringify(myLibrary));
      displayBook();
    });

    const readBookBtn = row.querySelector(".bookRead");

    if (book.isRead) {
      row.style.backgroundColor = "#aaffaa";
      readBookBtn.textContent = "UNREAD";
    } else {
      row.style.backgroundColor = "#fbc7c7";
      readBookBtn.textContent = "READ";
    }

    readBookBtn.addEventListener("click", () => {
      book.isRead = !book.isRead;
      localStorage.setItem("library", JSON.stringify(myLibrary));
      displayBook();
    });
  });

  initalSentence.style.display = myLibrary.length === 0 ? "block" : "none";
}

displayBook();

addNewBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const randomId = crypto.randomUUID();

  const newBook = {
    randomId: randomId,
    bookName: bookName.value,
    authorName: authorName.value,
    pagesRead: pagesRead.value,
    isRead: false,
  };

  if (
    newBook.bookName !== "" &&
    newBook.authorName !== "" &&
    newBook.pagesRead !== ""
  ) {
    myLibrary.push(newBook);
    localStorage.setItem("library", JSON.stringify(myLibrary));
    displayBook();

    bookName.value = "";
    authorName.value = "";
    pagesRead.value = "";

    userBookContainer.style.display = "flex";
    form.style.display = "none";
  } else {
    conditionMsg.innerHTML = "Please fill all the fields";
  }
});
