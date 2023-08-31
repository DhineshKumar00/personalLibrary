let books = [];

function addBook(book) {
    let table = $("#bookTable tbody");
    table.append(`
    <tr id="${book.id}">
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.genre}</td>
    <td>${book.year}</td>
    <td>
    <button class="mb-1 btn btn-sm btn-warning editBtn" data-id="$(book.id)">
    EDIT
    </button>
    <button class="mb-1 btn btn-sm btn-danger deleteBtn" data-id="$(book.id)">
    DELETE
    </button>
    </td>
    `);

}

function clearForm() {
    $("#bookTitle").val("");
    $("#author").val("");
    $("#genre").val("");
    $("#year").val("");
}

function generateId() {
    return Math.floor(Math.random() * 1000000);
}

$(document).on("click", "clearBtn", function () {
    clearForm();
});

$("#bookForm").submit(function (e) {
    e.preventDefault();

    let book = {
        id: generateId(),
        title: $("#bookTitle").val(),
        author: $("#author").val(),
        genre: $("#genre").val(),
        year: $("#year").val(),
    };

    books.push(book);
    addBook(book);

    clearForm();
});

$("#editForm").submit(function (e) {
    e.preventDefault();

    let bookId = $("#editBookId").val();
    let bookIndex = books.findIndex((book) => book.id == bookId);
    let book = books[bookIndex];

    book.title = $("#editbookTitle").val();
    book.author = $("#editauthor").val();
    book.genre = $("#editgenre").val();
    book.year = $("#edityear").val();

    let row = $(`#${book.id}`);
    row.find("td:eq(0)").text("book.title");
    row.find("td:eq(1)").text("book.author");
    row.find("td:eq(2)").text("book.genre");
    row.find("td:eq(3)").text("book.year");

    $("#editModal").model("hide");
});


$(document).on("click", ".editBtn", function () {

    let bookId = $(this).data("id");
    let bookIndex = books.findIndex((book) => book.id == bookId);
    let book = books[bookIndex];

    $("#editbookTitle").val(book.title);
    $("#editauthor").val(book.author);
    $("#editgenre").val(book.genre);
    $("#edityear").val(book.year);
    $("#editBookId").val(book.id);
    $("#editModal").model("show");

});

$(document).on("click", ".clsBtn", function () {
    $("#editModal").model("hide");
});

$(document).on("click", ".deleteBtn", function () {
    let bookId = $(this).data("id");

    let bookIndex = books.findIndex((book) => book.id == bookId);
    let book = books[bookIndex];

    if (confirm(`Are you sure want to delete ${book, title}`)) {
        books.splice(bookIndex,1);
        $(`#${book.id}`).remove();
    }

});

