import { nanoid } from "nanoid";
import { books } from "./books.js";

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if ( name == null ) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    } else if ( readPage > pageCount ) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    } else {
        const id = nanoid(16);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;

        if ( readPage === pageCount ) {
            var finished = true;
        } else {
            var finished = false;
        }

        const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };

        books.push(newBook);


        const isSuccess = books.filter( (book) => book.id === id ).length > 0;

        if (isSuccess) {
            const response = h.response({
                "status": "success",
                "message": "Buku berhasil ditambahkan",
                "data": {
                    "bookId": id
                }
            });
            response.code(201);
            return response;
        } else {
            const response = h.response({
                "status": "error",
                "message": "Buku gagal ditambahkan"
            });
            response.code(500);
            return response;
        }
    }
}

const viewBookHandler = (request, h) => {
    const { name, reading, finished } = request.query;
    const filtered = []

    //cara ini tidak bisa multiquery
    for (let i = 0; i<books.length; i++) {
        if ( name != null ) {
            if ( books[i].name.toUpperCase() == name.toUpperCase() ) {
                const id = books[i].id;
                const name = books[i].name;
                const publisher = books[i].publisher;
        
                const tempBook = { id, name, publisher };
        
                filtered.push(tempBook);
            }
        }
        if ( reading != null ) {
            if ( books[i].reading == reading ) {
                const id = books[i].id;
                const name = books[i].name;
                const publisher = books[i].publisher;
        
                const tempBook = { id, name, publisher };
        
                filtered.push(tempBook);
            }
        }
        if ( finished != null ) {
            if ( books[i].finished == finished ) {
                const id = books[i].id;
                const name = books[i].name;
                const publisher = books[i].publisher;
        
                const tempBook = { id, name, publisher };
        
                filtered.push(tempBook);
            }
        } else {
            const id = books[i].id;
            const name = books[i].name;
            const publisher = books[i].publisher;
    
            const tempBook = { id, name, publisher };
    
            filtered.push(tempBook);
        }
    }

    const response = h.response({
        "status": "success",
        "data": {
            "books": filtered
        }
    });
    response.code(200);
    return response;
};

const viewBookDetails = (request, h) => {
    const { bookId } = request.params;
    const theBook = books.filter((book) => book.id === bookId );
    const isPresent = theBook.length > 0;

    if (isPresent) {
        const response = h.response({
            "status": "success",
            "data": {
                "book": theBook[0]
            }
        });
        response.code(200);
        return response;
    } else {
        const response = h.response({
            "status": "fail",
            "message": "Buku tidak ditemukan"
        });
        response.code(404);
        return response;
    }
};

const editBookHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const theBook = books.filter( (book) => book.id === id );
    const isNotPresent = theBook.length < 1;

    if (isNotPresent) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan",
        });
        response.code(404);
        return response;
    } else {
        if ( name == null ) {
            const response = h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. Mohon isi nama buku",
            });
            response.code(400);
            return response;
        } else if ( readPage > pageCount ) {
            const response = h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
            });
            response.code(400);
            return response;
        } else {
            const { insertedAt } = theBook[0];
            const updatedAt = new Date().toISOString();

            if ( readPage === pageCount ) {
                var finished = true;
            } else {
                var finished = false;
            }

            const editedBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };

            const index = books.indexOf(theBook[0]);
            books.splice(index, 1, editedBook);

            const isSuccess = books[index] == editedBook;

            if (isSuccess) {
                const response = h.response({
                    "status": "success",
                    "message": "Buku berhasil diperbarui",
                });
                response.code(200);
                return response;
            } else {
                const response = h.response({
                    "status": "fail",
                    "message": "Gagal memperbarui buku",
                });
                response.code(500);
                return response;
            }
        }
    }
};

const deleteBookHandler = (request, h) => {
    const { bookId } = request.params;
    const theBook = books.filter( (book) => book.id === bookId );
    const isNotPresent = theBook.length < 1;

    if (isNotPresent) {
        const response = h.response({
            "status": "fail",
            "message": "Buku gagal dihapus. Id tidak ditemukan",
        });
        response.code(404);
        return response;
    } else {
        const index = books.indexOf(theBook[0]);
        books.splice(index, 1);
        const isSuccess = books.filter( (book) => book.id === bookId ).length < 1;

        if (isSuccess) {
            const response = h.response({
                "status": "success",
                "message": "Buku berhasil dihapus"
            });
            response.code(200);
            return response;
        } else {
            const response = h.response({
                "status": "fail",
                "message": "Buku tidak berhasil dihapus"
            });
            response.code(500);
            return response;
        }
    }
};
export { addBookHandler, viewBookHandler, viewBookDetails, editBookHandler, deleteBookHandler };