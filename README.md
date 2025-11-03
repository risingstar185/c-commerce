<h1 align="center">🛍️ ShopEase — Modern Full-Stack E-Commerce Website</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Full%20Stack-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Backend-Node.js-43853D?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Payment-Razorpay-0A66C2?style=flat-square&logo=razorpay&logoColor=white" />
</p>

<p align="center">
  <b>ShopEase</b> is a modern e-commerce web application built using the MERN stack.  
  It provides a seamless shopping experience with secure payments, an intuitive admin dashboard,  
  and responsive UI powered by React and Tailwind CSS.
</p>

---

## 🚀 Tech Stack
###Live Link 
https://shopeaseone.onrender.com/

| Category | Technologies Used |
|-----------|------------------|
| 🌐 **Frontend** | ![React](https://img.shields.io/badge/React.js-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) ![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat-square&logo=react-router&logoColor=white) |
| ⚙️ **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) |
| 🗄️ **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white) |
| 🔑 **Authentication** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) ![Bcrypt](https://img.shields.io/badge/Bcrypt-003366?style=flat-square) |
| 💳 **Payment Gateway** | ![Razorpay](https://img.shields.io/badge/Razorpay-003366?style=flat-square&logo=razorpay&logoColor=white) |
| 🧠 **State Management** | ![Context API](https://img.shields.io/badge/React%20Context%20API-61DAFB?style=flat-square&logo=react&logoColor=white) |
| 🧑‍💼 **Admin Dashboard** | Protected admin routes with product, order & user management |
| ☁️ **Deployment** | ![Render](https://img.shields.io/badge/Render-000000?style=flat-square&logo=render&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |

---

## ✨ Features

### 🛒 User Side
- Browse and search for products with category & filter options  
- Add items to cart and manage quantities  
- Secure **Razorpay payment integration** 💳  
- Responsive UI for all devices 📱💻  
- View past orders and delivery status  
- Login / Register with JWT authentication 🔐  
- Product images, descriptions, and ratings  

### 🧑‍💼 Admin Panel
- Add, edit, and delete products  
- Manage all orders and update delivery status  
- View sales summaries  
- Add best-seller tags  
- Separate secure admin login system  

---

## 🧩 Folder Structure
ShopEase/
│
├── Backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── config/
│ ├── server.js
│ └── .env
│
<br>
├── Frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ └── App.js
│ ├── public/
│ └── package.json
│
└── README.md
|--/admin 
|    ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ └── App.js
│ ├── public/
│ └── package.json




---

## ⚙️ Installation & Setup

### 🧠 Prerequisites
Make sure you have installed:
- **Node.js** (>= 16)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

---

### 🪶 Clone the Repository

```bash
git clone https://github.com/your-username/ShopEase.git
cd ShopEase

🖥️ Backend Setup
cd Backend
npm install
```
###Create a .env file inside Backend/ and add:
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```
npm start

##Frontend setup

cd Frontend
npm install
npm run dev``
Tools & Libraries
```
Framer Motion – Smooth animations ✨

React Icons – Modern UI icons

Mongoose – MongoDB object modeling

Dotenv – Secure environment config

Axios – Easy API communication

📸 Screenshots (Optional)

Add screenshots of your homepage, cart, checkout, and admin panel here
<img width="1920" height="1020" alt="onecart and 1 more page - Personal - Microsoft​ Edge 04-11-2025 00_25_10" src="https://github.com/user-attachments/assets/5200e5f8-1b1c-44e6-ba05-c6c6a3818927" />

and 1 more page - Personal - Microsoft​ Edge 04-11-2025 00_25_10.png"
💪 Contributing

Pull requests are welcome!
If you'd like to contribute:

Fork the repository

Create your branch: git checkout -b feature/YourFeature

Commit changes: git commit -m "Add feature"

Push to branch: git push origin feature/YourFeature

Open a Pull Request 🚀

🧑‍💻 Author

Ayush Patel
💼 MERN Stack Developer | 💡 AI Enthusiast
📧 patelayush9554@gmail.com

🌐 LinkedIn Profile
https://www.linkedin.com/in/risingstar185/
🪪 License

This project is open-source and available under the MIT License
.

<p align="center"> Built with ❤️ using <b>MERN Stack</b> <br/> <i>“Shop Smart. Shop Easy. — ShopEase 🛍️”</i> </p> ```
