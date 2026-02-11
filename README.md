# E-Commerce MERN Stack Application

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, product management, shopping cart, and payment integration.

## Features

- **User Authentication**: Secure signup/login with bcrypt password hashing and JWT tokens
- **Product Management**: Admin panel to add, view, and delete products
- **Shopping Cart**: Add/remove items, apply promo codes (SAVE10, SAVE20)
- **Payment Integration**: Razorpay payment gateway integration
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Category Filtering**: Browse products by Men, Women, and Kids categories
- **Image Upload**: Product image upload functionality

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- React Toastify
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- Razorpay for payments

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Razorpay account (for payment integration)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
BACKEND_URL=http://localhost:4000
```

4. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:4000
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
```

4. Start the frontend development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
E-commerce MERN Stack/
├── backend/
│   ├── upload/images/          # Uploaded product images
│   ├── .env                    # Environment variables
│   ├── .gitignore
│   ├── index.js                # Main server file
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── Components/         # React components
    │   ├── Context/           # Context API
    │   ├── Pages/             # Page components
    │   ├── App.js
    │   └── index.js
    ├── .env                   # Environment variables
    ├── .gitignore
    └── package.json
```

## API Endpoints

### Authentication
- `POST /signup` - Register new user
- `POST /login` - User login

### Products
- `GET /allproducts` - Get all products
- `GET /newcollection` - Get new collection (latest 8 products)
- `GET /popularinwomen` - Get popular women products
- `POST /addproduct` - Add new product (Admin)
- `POST /removeproduct` - Delete product (Admin)

### Cart
- `POST /addtocart` - Add item to cart
- `POST /removefromcart` - Remove item from cart
- `POST /getcart` - Get user's cart

### Payment
- `POST /order` - Create Razorpay order
- `POST /order/validate` - Validate payment

### Upload
- `POST /upload` - Upload product image

## Environment Variables

### Backend
- `PORT` - Server port (default: 4000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `RAZORPAY_KEY_ID` - Razorpay API key
- `RAZORPAY_SECRET` - Razorpay secret key
- `BACKEND_URL` - Backend URL for image paths

### Frontend
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_RAZORPAY_KEY` - Razorpay public key

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT-based authentication
- Environment variables for sensitive data
- Input validation on API endpoints
- Secure payment processing with Razorpay

## Deployment

### Backend Deployment
1. Set all environment variables on your hosting platform
2. Ensure MongoDB connection string is updated for production
3. Update CORS settings for production frontend URL

### Frontend Deployment
1. Update `REACT_APP_API_URL` to production backend URL
2. Build the production version: `npm run build`
3. Deploy the build folder to your hosting service

## Important Notes

- Existing users with plain text passwords need to re-register after bcrypt implementation
- Ensure `.env` files are in `.gitignore` and never committed to version control
- Update CORS configuration for production to allow only specific origins
- Use strong, randomly generated JWT secrets in production

## Promo Codes

- `SAVE10` - 10% discount
- `SAVE20` - 20% discount

## License

This project is open source and available under the MIT License.

## Author

Adarsh Raut
