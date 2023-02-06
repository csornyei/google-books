# Google Book API 

The project can be started with the Dockerfile. It builds the client and server, copy the client to the server and starts the server.

The docker image accepts PORT as environment variable. The default port is 3000.

After the server is started, the client can be accessed at http://localhost:3000
And the book endpoint at http://localhost:3000/books and expects a query parameter `title` with the search term. It also accepts a `all=true` parameter to return all data from the API.

The client is a simple React app with a search field and a list of books. It has some tests with React Testing Library for the search field and the book list.