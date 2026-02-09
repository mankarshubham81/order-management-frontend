# 🎨 Order Management Frontend – Food Delivery App

This repository contains the frontend implementation for the **Order Management** feature of a food delivery application.

It provides a simple and intuitive UI for browsing the menu, placing orders, and tracking order status.

---

## 🛠 Tech Stack

- React (Vite)
- JavaScript (ES6+)
- Fetch API
- Vitest
- React Testing Library

---

## ✨ Features

- Menu display with food items (name, description, price)
- Cart management (add items, update quantity, remove items)
- Checkout flow with customer details
- Order placement via REST APIs
- Order status tracking with simulated real-time updates
- Frontend tests following a TDD approach

---

## 🧠 Application Flow

1. User views the menu
2. Adds items to the cart
3. Proceeds to checkout
4. Places the order
5. Tracks order status in real time

---

## 🔁 Real-Time Updates

Order status is updated in near real time using **polling**.

- The frontend polls the backend every few seconds
- The backend simulates order status changes
- Polling stops once the order is delivered

---

## 🧪 Testing

Component and interaction tests are written using **Vitest** and **React Testing Library**.

Test coverage includes:
- Menu rendering
- Cart interactions
- Checkout form submission
- Order status updates

Run tests using:

```bash
npm test

## ▶️ Running Locally
npm install
npm run dev

App runs on http://localhost:5173

Backend APIs are available here:
👉 Order Management Backend Repository
