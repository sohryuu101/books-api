import { addBookHandler, viewBookHandler, viewBookDetails, editBookHandler, deleteBookHandler } from "./handler.js";

const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: viewBookHandler,
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: viewBookDetails,
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: editBookHandler,
    },
    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBookHandler,
    }
  ];
   
export { routes };