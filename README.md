# Vinted API 🛍️
![Vinted LOGO](https://github.com/MrBalourd/Vinted-API/blob/main/github/vinted-app.jpg)

Welcome to the Vinted API! This API allows you to interact with Vinted's data to search for items, retrieve member information, and more. 💼

## Table of Contents 📚

- [Introduction](#introduction)
- [Endpoints](#endpoints)
- [Usage](#usage)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Introduction 🌟

The Vinted API is built using Express.js and provides various endpoints to access Vinted's data. It supports searching for items, retrieving member information, fetching member items, and more.

## Endpoints 🚀

### Search Items 🔍

Endpoint: `POST /api/items`

Search for items based on specific criteria like text, currency, and order.

### Get Item Info 📦

Endpoint: `POST /api/item`

Retrieve detailed information about a specific item using its identifier.

### Search Members 👥

Endpoint: `GET /api/members/search`

Search for members using a query string to find member profiles.

### Get Member Items 📂

Endpoint: `GET /api/member/:id/items`

Retrieve items listed by a specific member using their ID.

### Get Member Info 👤

Endpoint: `GET /api/member/:memberId`

Retrieve detailed information about a specific member using their ID.

### Get Member Rates ⭐

Endpoint: `GET /api/member/:memberId/rate`

Retrieve ratings and feedback for a specific member using their ID.

### Test Endpoint 🧪

Endpoint: `GET /1`

A test endpoint that returns "1".

## Usage 🛠️

1. Install the required dependencies using `npm install`.
2. Start the server using `npm start`.
3. Access the API using the provided endpoints.

## Installation ⚙️

1. Clone the repository: `git clone https://github.com/your-username/vinted-api.git`
2. Navigate to the project directory: `cd vinted-api`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

## Contributing 🤝

Contributions are welcome! If you find any issues or want to add enhancements, feel free to open a pull request.

## License 📜

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as needed.

---

Feel free to explore the various endpoints and integrate this API with your projects. If you have any questions or feedback, don't hesitate to reach out! 💌
