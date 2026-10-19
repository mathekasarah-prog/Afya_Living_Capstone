# Afya Living 🌿
### Natural Wellness & Self-Care

Afya Living is a responsive e-commerce web application designed to make natural-inspired skincare, haircare, wellness essentials, and self-care products easy to explore and purchase.

The project is built with React and connects to a separate Express.js backend API to retrieve product information and process application requests. It combines a clean, nature-inspired design with interactive shopping features to provide a simple and enjoyable user experience.

## ✨ Features

### Product Shopping
- Browse products retrieved from the backend API.
- View individual product details.
- Explore products by category.
- Sort products using available sorting options.
- View product prices and stock availability.
- Add products to the shopping cart.
- Update product quantities and remove items from the cart.
- View the cart subtotal.

### Checkout and Orders
- Enter customer and delivery information.
- Choose a delivery method.
- Submit orders to the backend.
- View an order confirmation and order reference after successful checkout.
- Receive feedback when requests fail or are being processed.

### User Accounts
- Register a new account.
- Log in using account credentials.
- Display account-related navigation options.
- Provide administrative access to inventory management for authorized users.

### Additional Pages
- About Afya Living.
- Contact form.
- Newsletter subscription.
- Product inventory management for authorized administrators.

### User Experience
- Responsive layouts for desktop, tablet, and mobile screens.
- Reusable React components.
- Form validation and error feedback.
- Loading and empty states where implemented.
- Persistent shopping cart and user state using browser local storage.

## 🛠️ Technologies Used

### Frontend
- React
- JavaScript (ES6+)
- Vite
- React Router
- Tailwind CSS
- HTML5
- CSS3
- Fetch API

### Backend
- Node.js
- Express.js
- REST API
- JSON files for data storage
- bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication

### Development Tools
- Visual Studio Code
- Git and GitHub
- npm
- Browser Developer Tools

## 📁 Project Structure

The frontend and backend are maintained in separate project directories.

### React Frontend

```text
Afya_living_capstone/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   ├── Checkout.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── ...
│   ├── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

### Express Backend

```text
Fetch_API_Afya_Living/
├── Images/
├── products.json
├── orders.json
├── users.json
├── subscribers.json
├── server.js
└── package.json
```

The backend entry file and data files may have different names depending on the final project structure.

## 🚀 Getting Started

Follow these instructions to run the application locally.

### Prerequisites

Install the following:

- Node.js and npm
- Git
- Visual Studio Code or another code editor

### 1. Set Up the Backend

Open a terminal and navigate to the backend directory:

```bash
cd path/to/Fetch_API_Afya_Living
```

Install the backend dependencies:

```bash
npm install
```

Start the Express server using the appropriate script in the backend `package.json`. For example:

```bash
node server.js
```

The backend should be available at:

```text
http://localhost:3000
```

### 2. Verify the Backend API

Open the following URL in your browser:

```text
http://localhost:3000/api/products
```

The endpoint should return the product data in JSON format.

Product images should also be accessible through the backend, for example:

```text
http://localhost:3000/Images/baobab.jpeg
```

Use the actual image filename available in the `Images` directory.

### 3. Set Up the Frontend

Open a second terminal and navigate to the React project:

```bash
cd path/to/Afya_living_capstone
```

Install the frontend dependencies:

```bash
npm install
```

Create a `.env` file in the frontend root directory and configure the backend URL:

```env
VITE_API_URL=http://localhost:3000
```

Restart the Vite development server whenever you change environment variables.

### 4. Run the Frontend

```bash
npm run dev
```

```text
http://localhost:5173
```


## 🔌 API Endpoints

The frontend communicates with the Express backend through HTTP requests.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products` | Retrieve products |
| PUT | `/api/products/:id/stock` | Update product stock with authorized access |
| POST | `/api/orders` | Submit a customer order |
| POST | `/api/signup` | Register a user |
| POST | `/api/login` | Authenticate a user |
| POST | `/api/contact` | Submit a contact message |
| POST | `/api/subscribe` | Submit a newsletter subscription |
| POST | `/api/cart` | Submit cart data to the backend |

Endpoint availability and validation depend on the backend implementation.

## 🧩 React Concepts Demonstrated

This project applies core frontend development concepts, including:

- **Components:** Building reusable interface elements.
- **Props:** Passing product data and event handlers between components.
- **State:** Managing products, cart contents, form inputs, and user information.
- **Events:** Handling button clicks, form submissions, and quantity changes.
- **Conditional rendering:** Displaying loading indicators, errors, stock status, and empty states.
- **Hooks:** Using React hooks such as `useState` and `useEffect`.
- **React Router:** Navigating between pages without full page reloads.
- **API integration:** Retrieving and submitting data through asynchronous HTTP requests.
- **Responsive design:** Adapting the interface to different screen sizes.



## 🌱 Future Improvements

Potential future enhancements include:

- Integrating a production database such as MongoDB.
- Adding automated frontend and backend tests.
- Implementing secure order history and order tracking.
- Improving inventory management.
- Integrating a secure payment provider.
- Deploying the frontend and backend to production hosting.

## 👩‍💻 Author

**Sarah Musenya**

Frontend Capstone Project

Afya Living — Natural Wellness & Self-Care

## 📄 License

This project was developed for educational and portfolio purposes. 