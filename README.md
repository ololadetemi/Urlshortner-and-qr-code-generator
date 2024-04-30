# Node_JS URL Shortener 

This is a URL shortener service built using Node.js, Express.js, MongoDB, and EJS. It allows users to shorten URLs, customize slugs, and track click counts.

## Features

- Shorten long URLs into concise and easy-to-share links.
- Customize shortened URLs with custom slugs and domain names.
- Track the number of clicks on each shortened URL.
- Generate QR codes for shortened URLs.

## Installation

1. Clone this repository to your local machine:

```
git clone <repository-url>
```

2. Install dependencies:

```
npm install
```

3. Set up a MongoDB database and update the connection URL in `server.js`.

4. Start the server:

```
npm start
```

5. Visit `http://localhost:8080` in your web browser to access the application.

## Usage

1. Enter the long URL you want to shorten in the provided input field.
2. Optionally, enter a custom domain and slug for your shortened URL.
3. Click on the "Shorten your URL!" button to generate the shortened URL.
4. Copy the shortened URL and share it with others.
5. Optionally, view the list of shortened URLs and their click counts on the homepage.
6. Click on a shortened URL to be redirected to the original long URL.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
