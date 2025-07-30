# 🏝️ Mahaweli Tours & Holidays – Tour Website

A comprehensive full-stack **tourism website** developed using **React, Node.js, Express, and MongoDB**. This project allows users to explore tour packages, view a gallery, read blog articles, and make tour inquiries. It also includes a secure **Admin Dashboard** to manage content dynamically in real-time.

---

## ✅ Features

### 🌐 Public Website
- Browse **Day Tours** and **Round Tours**
- View **Tour Details** with descriptions and pricing
- **Booking Form** with EmailJS integration
- Read **Travel Blog** posts
- Browse stunning images in the **Gallery**
- View homepage stats and highlights

### 🔐 Admin Panel
- Secure **Admin Login**
- Add, Edit, and Delete:
  - Tour Packages (Day & Round)
  - Blog Posts
  - Gallery Images (GridFS-based)
  - Homepage content (title, intro, stats, etc.)
- All changes reflect live on the public website

---

## 🛠️ Technologies Used

### Frontend
- React (Functional Components)
- React Router DOM
- EmailJS (Booking form integration)
- CSS with inline styles

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- GridFS for image storage
- Multer (file uploads)
- CORS, dotenv

---

## 🗃️ Database Collections (MongoDB)

### 1. `tours`
| Field         | Description              |
|---------------|--------------------------|
| title         | Name of the tour         |
| location      | Tour location            |
| type          | Day Tour or Round Tour   |
| duration      | Length of the tour       |
| rating        | Rating (1–10)            |
| price         | Price per person         |
| description   | Detailed tour info       |
| image         | Image path or GridFS ID  |

### 2. `blogs`
| Field       | Description         |
|-------------|---------------------|
| title       | Blog title          |
| content     | Blog content        |
| image       | Blog image (GridFS) |

### 3. `gallery`
| Field       | Description         |
|-------------|---------------------|
| filename    | Image file name     |
| contentType | Image MIME type     |
| fileId      | GridFS ID           |

### 4. `homecontent`
| Field     | Description               |
|-----------|---------------------------|
| title     | Homepage headline         |
| intro     | Short introduction text   |
| stats     | Visitor stats/achievements|

### 5. `comments` *(optional for blog feedback)*
| Field     | Description               |
|-----------|---------------------------|
| name      | Commenter's name          |
| comment   | Comment message           |

---

## 📷 Video



---

## 📩 Contact

   Safeeya Munawwar - shafiyasha0036@gmail.com     

