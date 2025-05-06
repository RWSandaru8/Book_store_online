# 📘 The PageVault 
A user-friendly and intuative online platform to browse, add, and purchase books (currenly using Google Books API to map books)

## Table of Contents
- [Overview](#overview)
- [Instructions to Run the Project](#instructions-to-run-the-project)
- [Shipping & Purchase Flow](#shipping--purchase-flow)
- [Assumptions](#assumptions)
- [Additional Features](#additional-features)
- [Contribution](#contribution)

---

## Overview

The **PageVault** is an intuitive book-browsing and purchasing platform where visitors can discover books via the Google Books API. Registered users can manage personal carts, enter shipping details, and complete secure checkouts.

### Key Modules:
- **Visitor Browsing**: Anyone can browse available books.
- **Customer Portal**: Registered users can manage carts, initiate checkout, and track purchases.
- **Shipping Flow**: Ensures accurate order dispatch through structured shipping form inputs.

---

## Instructions to Run the Project

### ✅ Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v18.x or higher)
- **PostgreSQL** (v15.x or higher)

---

### 1. Project Folder Structure

```
project-root/
├── backend/
│   ├── .env
│   └── (Node.js backend files)
├── frontend/
│   └── (Next.js frontend files)
```

---

### 2. Environment Variable Configuration

#### Backend (`backend/.env`)

```
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/bookstore
GOOGLE_API_KEY=your_google_books_api_key
JWT_SECRET=your_jwt_secret
```
---

### 3. Install Dependencies

#### Backend Setup

```bash
cd backend
npm install
```
## Backend Integration

This frontend connects to a Node.js/Express backend API. Make sure the backend server is running on port 5000 for the application to work correctly.
```

Make sure to adjust the URL if your backend is running on a different port or host.
#### Frontend Setup

```bash
cd frontend
npm install
```
## Environment Setup

To ensure the application can connect to the backend server properly, create a `.env.local` file in the frontend directory with the following content:

```
# Backend API URL - This needs to be NEXT_PUBLIC_ to be accessible in the browser
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Add other environment variables as needed
NEXT_PUBLIC_APP_URL=http://localhost:3000
---

### 4. Running the Application

Use two terminals to start both the frontend and backend servers:

#### Terminal 1 – Start Backend

```bash
cd backend
npm run dev
```

#### Terminal 2 – Start Frontend

```bash
cd frontend
npm run dev
```

The app will be available at: [http://localhost:3000](http://localhost:3000)

---

## Shipping & Purchase Flow

1. **Browse Books**: Visitors can click the "Browse Books" button to explore titles.
2. **Signup/Login**: Customers must register or sign in to manage their cart.
3. **Cart Management**: 
   - Add books from search results.
   - Remove books from the cart if needed.
4. **Checkout**:
   - User enters shipping details: address, postal code, and country.
   - Books and quantities are recorded, along with total price.
5. **Order Confirmation**:
   - The system saves checkout history and shipping info.
   - A success message is displayed: "Order placed successfully."

---

## Assumptions

1. Only one user role exists: `customer`.
2. Visitors can view books without logging in.
3. Customers must log in to manage a cart or checkout.
4. Shipping information is mandatory before placing an order.
5. No payment integration; order completion is recorded upon shipping submission.
6. Google Books API is used only for viewing—book data is not stored permanently.
7. Each order stores the timestamp of purchase for tracking.
8. One customer can place multiple independent orders.

---

## Additional Features

- Clean and responsive design using Tailwind CSS.
- Integration with Google Books API for real-time book search.
- Persistent cart storage during session.
- Real-time cart total calculation.
- Checkout flow with data validation and order history.

---

## Contribution

### Authors

- [Sandaru Piumantha](https://github.com/yourgithub)  