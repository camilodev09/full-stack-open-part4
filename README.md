# Bloglists API 🚀

A robust, test-driven REST API for managing blog posts, developed as part of the **Full Stack Open** curriculum (Part 4). Built with Node.js, Express, and MongoDB, featuring comprehensive integration testing and strict schema serialization.

## 🛠️ Tech Stack & Tools

* **Runtime:** Node.js (`node:test` runner)
* **Framework:** Express.js
* **Database & ODM:** MongoDB, Mongoose
* **Testing:** Supertest, Node.js native assert
* **Environment Management:** Cross-env, Dotenv

---

## 📂 Architecture Overview

```text
src/
├── app.js            # Express app configuration & middleware binding
├── index.js          # Server entry point & HTTP listener bootstrap
├── controllers/      # Asynchronous request handlers (Business Logic Layer)
├── models/           # Mongoose schemas & JSON serialization transform hooks
├── routes/           # Express router definitions & endpoint mapping
├── utils/            # Configuration, logger, and helper functions
└── tests/            # Integration and unit test suites (Supertest)
