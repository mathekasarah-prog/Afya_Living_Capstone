# Afya Living | Natural Wellness & Self-Care

**Natural • Simple • Beautiful**

Afya Living is a responsive e-commerce web application for discovering and shopping for natural skincare, haircare, wellness products, and self-care gift sets. The project combines a clean, nature-inspired storefront with product management, shopping cart functionality, and an order checkout experience.

Developed as an individual Frontend Capstone project, Afya Living demonstrates the practical application of React, reusable components, state management, API integration, routing, and responsive user interface design.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Application Structure](#application-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Store Location](#store-location)
- [Security and Limitations](#security-and-limitations)
- [Future Improvements](#future-improvements)
- [Author](#author)

## Project Overview

Afya Living promotes convenient access to natural wellness and self-care products through a user-friendly online shopping experience.

The interface uses a nature-inspired visual identity, with earthy colors, clean layouts, and responsive components designed to provide a consistent experience across desktop and mobile devices.

The application includes a React frontend and a separate Node.js/Express backend for product data and order processing.

## Features

### Customer Experience

- **Product catalog:** Retrieve and display products from the backend API.
- **Product discovery:** Browse products by category, including Skincare, Haircare, Wellness, and Gift Sets.
- **Product details:** View product information, pricing, images, and available stock.
- **Shopping cart:** Add products, adjust quantities, and review selected items.
- **Checkout:** Enter customer details and submit an order.
- **Delivery options:** Choose store pickup or home delivery.
- **Payment selection:** Select an available payment method, including M-Pesa or bank transfer.
- **Order confirmation:** View an order reference after a successful order submission.
- **Account access:** Register and log in to the application.
- **Contact and subscription forms:** Submit enquiries and newsletter subscription requests.
- **Store directions:** Open Google Maps to find the physical pickup location.

### Inventory Administration

- **Protected admin interface:** Restrict inventory management to authorized administrators.
- **Product inventory:** View product names, categories, prices, and stock quantities.
- **Stock management:** Update product quantities through the backend API.
- **Validation and feedback:** Display loading states, errors, and success messages when managing inventory.

### User Interface

- Responsive layouts for different screen sizes.
- Reusable React components.
- Client-side routing with React Router.
- Tailwind CSS styling.
- Form validation and user feedback.
- Loading, error, and empty states where implemented.

## Technologies Used

| Technology | Purpose |
|---|---|
| React | Building reusable UI components |
| JavaScript (ES6+) | Application logic and interactions |
| Vite | Frontend development server and build tooling |
| Tailwind CSS | Responsive styling and UI design |
| React Router | Client-side navigation |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API and server-side request handling |
| JSON files | File-based product, user, and order storage in the current backend |
| JWT | Authentication tokens and authorization |
| bcrypt | Password hashing |
| Git and GitHub | Version control and source code management |

## Application Structure

The application is organized into a frontend React project and a separate backend project.

```text
Afya-Living/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── Images/
│   ├── package.json
│   └── README.md
│
└── backend/
    ├── server.js
    ├── products.json
    ├── users.json
    ├── orders.json
    └── .env
```

*Note: This is an illustrative structure. Actual folder names and file locations may differ in your repository.*

## Getting Started

Follow these steps to run Afya Living locally.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) and npm
- Git
- A code editor such as Visual Studio Code

### 1. Clone the Repository

Replace the placeholder below with your actual GitHub repository URL.

```bash
git clone <https://github.com/mathekasarah-prog/Afya_Living_Capstone.git>
cd <Afya_Living_Capstone>
```

### 2. Install Frontend Dependencies

Open a terminal in the React frontend directory and run:

```bash
npm install
```

### 3. Configure the Backend

Open another terminal in the backend directory and install its dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory and configure the environment variables listed below.

Ensure that the required JSON data files exist and contain valid JSON before starting the server.

### 4. Start the Backend Server

From the backend directory, run:

```bash
node server.js
```

The API is configured to run at:

```text
http://localhost:3000
```

### 5. Start the Frontend

In a separate terminal, navigate to the frontend directory and run:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser. It is commonly `http://localhost:5173`, but the port may vary.

### 6. Build the Frontend

To check that the application can be built for production, run:

```bash
npm run build
```

To preview the production build locally, run:

```bash
npm run preview
```

If a lint script is configured in `package.json`, you can also run:

```bash
npm run lint
```


## API Endpoints

The current Express backend provides endpoints for the application's main operations.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products` | Retrieve the product catalog |
| PUT | `/api/products/:id/stock` | Update a product's stock quantity |
| POST | `/api/orders` | Submit a customer order |
| POST | `/api/signup` | Register a customer |
| POST | `/api/login` | Authenticate a customer |
| POST | `/api/contact` | Submit a contact enquiry |
| POST | `/api/subscribe` | Submit a newsletter subscription |
| POST | `/api/cart` | Submit cart-related data |

Protected operations require the appropriate authentication and authorization checks.

## Store Location

**Afya Living**

Store 11A, Second Floor  
RNG Plaza, Ronald Ngala Street  
Nairobi, Kenya

Customers selecting store pickup can use Google Maps to locate the store and plan their journey.

[Find Afya Living on Google Maps](https://www.google.com/maps/search/?api=1&query=Afya%20Living%2C%20Store%2011A%2C%20Second%20Floor%2C%20RNG%20Plaza%2C%20Ronald%20Ngala%20Street%2C%20Nairobi%2C%20Kenya)

## Security and Limitations

Afya Living is an educational capstone project. The current backend uses JSON-file storage for application data.

Before deploying the application for real customers, the following areas require additional attention:

- Move persistent product, customer, and order data to a suitable database.
- Enforce authorization and input validation on every protected API endpoint.
- Avoid trusting prices, totals, stock quantities, or user roles supplied by the client.
- Use secure authentication practices, HTTPS, and appropriate token handling.
- Handle simultaneous orders and stock updates safely.
- Configure production environment variables and restrict access to sensitive data.
- Verify payment receipts before marking orders as paid.

Selecting M-Pesa or bank transfer does not, by itself, process a payment. Actual payment processing requires a suitable payment integration or a verified manual-payment workflow.

## Future Improvements

Potential improvements include:

- Integrating a production database such as Firebase Firestore or MongoDB.
- Adding order history and customer account management.
- Introducing a complete admin dashboard for products and orders.
- Integrating a payment provider for supported payment methods.
- Adding delivery fee calculation and order tracking.
- Improving product search, filtering, and sorting.
- Adding automated tests and accessibility checks.
- Deploying the frontend and backend to production hosting.

## Author

**Sarah Matheka**

Frontend Capstone Project

Afya Living — Natural Wellness & Self-Care

---

*Built with React, JavaScript, Tailwind CSS, and a commitment to making natural self-care easier to discover.*
