# 🏀 Talksport

**Talksport** is a sports-focused platform where users can create, share, and engage with articles about sports.  
It provides a clean, user-friendly interface to explore sports content, interact with posts, and connect with other fans.

---

## 📚 Frameworks & Libraries
- **Frontend:** [Angular](https://angular.io/)
- **Backend:** [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)  
*(No additional front-end frameworks or libraries besides Angular were used.)*

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash

git clone <https://github.com/deniskaragyozov/Talksport.git>

```

---

### 2️⃣ Run the Client

```bash

cd D:/Talksport/client/Talksport
ng serve

```

---

### 3️⃣ Run the Server

```bash

cd D:/Talksport/server
npm start

```

---

### 4️⃣ Open in Browser

```bash

[http://localhost:4200](http://localhost:4200)

```

---

## ✨ Features
- **User Authentication** — Register & log in
- **Post Management** — Create, edit, and delete your own posts
- **Likes System** — Like posts from other users
- **User Profiles** 🏀 — View profile picture, username, bio, and posts
- **Home Page Highlights** — See the 3 latest and 3 most popular posts

---

## 🏗 Project Architecture

### **Models**
- `User`
- `Article`

### **Components**
- `Header` | `Footer` | `Error`
- `Home` | `Register` | `Login`
- `Post` | `Articles` (catalog page) | `ArticleDetails` | `Profile`

### **Services**
- `errorService` — Handles API error messages and passes them to the `Error` component
- `authService` — Manages authentication logic
- `articleService` — Handles article CRUD requests

### **Interceptors**
- **Error Interceptor** — Captures API errors and sends them to `errorService`

### **Guards**
- `authGuard` — Restricts access to logged-in users
- `guestGuard` — Restricts access to guests

---

## 🗂 Architecture Diagram

```

+-------------+ +-------------------+ +-----------------+
| Components | ---> | Services | ---> | Backend |
| (UI Layer) | | (Auth / Articles) | | (Node + Express)|
+-------------+ +-------------------+ +-----------------+
| |
v v
+--------+ +--------------+
| Guards | | MongoDB |
+--------+ +--------------+

```

---

## 📄 License
This project was developed for educational purposes as part of an Angular course.


