# URL Shortner

## How to run

- Install [docker](https://docs.docker.com/desktop/install/mac-install/)
- Run `docker compose up` from the root directory
- Open the entry point http://127.0.0.1:8001/ in your preferred browser

## Servers:

- http://127.0.0.1:8001/ a proxy to Frontend which is running at `http://127.0.0.1:3000`
- http://127.0.0.1:80/ a separate server that handles redirects by `shortUrl`. Redirects to Frontend in case of errors

## Frontend

- React Create App as a starter configuration
- Redux Toolkit as a main storage manager as it allows to use Redux itself with some enhancement
- RTK Query for querying and mutation of data with direct mapping to storage
- Material UI for styling components with accessibility support

Folder structure with main folders

```
│─── features # feature based approach with Redux Tool Kit
│    │─ Notifications # Redux Toolkit 
│    │─ ShortUrlCard # Shortened URL itself with ability to update
│    │─ ShortUrlForm # Creating `shortUrl` based on `fullUrl`. Mutation example
│    └─ ShortUrlList # Wrapper component for rendering ShortUrlCards. Only last 10 items is displayed
│    
│─── services # RTK Query services based on `createApi`
│    └─ shortUrl # direct mapping to Backend `/api` url
│
│─── store  # root entry for Redux Toolkit store
│    └─ middleware.ts # rtkQueryErrorLogger to handle all Backend error and show notifications
```

## Backend

### Short URL Redirection Route

- **Route:** `/:shortUrl`
- **Method:** `GET`
- **Description:** Redirects to the full URL associated with the given short URL.

### Retrieves the most recent short URL records

- **Route:** `/api/short-url`
- **Method:** `GET`
- **Description:** Retrieves the most recent short URL records.

#### Response

- The route will respond with an array of the most recent short URL records.
- The records are sorted in descending order based on their unique identifiers (`_id`).
- The response is limited to a maximum of 10 records.

### Creates a new short URL record.

- **Route:** `/api/short-url`
- **Method:** `POST`
- **Description:** Creates a new short URL record.

#### Request Body

- `fullUrl` (string, required): The full URL to be shortened.

#### Response

- If the `fullUrl` parameter is missing, the route will respond with a `400 Bad Request` status.
- If a record already exists for the provided `fullUrl`, the route will respond with the existing record.
- If no record exists, a new short URL record will be created, and the route will respond with the created record.

#### Short URL Generation

- Comprising an 8-character identifier, the generation of 1000 IDs per hour ensures a guarantee of 99 days with a 1%
  probability of collision.
- The identifier generation is based on [Nano ID](https://zelark.github.io/nano-id-cc/).

### Updates the full URL for an existing short URL

- **Route:** `/api/:shortUrl`
- **Method:** `PUT`

#### Request Parameters

- `shortUrl` (string, required): The short URL to be updated.

#### Request Body

- `fullUrl` (string, required): The updated full URL.

#### Response

- If either the `fullUrl` parameter or the `shortUrl` parameter is missing, the route will respond with
  a `400 Bad Request` status.
- If `fullUrl` is equal to `shortUrl`, the route will respond with a `400 Bad Request` status.
- If no record is found for the provided `shortUrl`, the route will respond with a `404 Not Found` status.
- If a valid record is found, the route will update the full URL and respond with the updated short URL record.

## Things to improve

- Enhance test coverage for both the Backend and Frontend applications.
- Optimize Docker Compose configuration for better efficiency.
- Consider moving API documentation to Swagger using JSDoc.
- Implement improved pagination for the `frontend/src/app/features/ShortUrlList`.
- Enhance the handling of environment variables.
- Improve error handling in case of failed redirects on the Frontend.