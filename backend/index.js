const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose"); // through this we can use mongoDB database
const jwt = require("jsonwebtoken");  // through this we can generate the token and verify the token. 
const multer = require("multer"); // used to store the uploaded image
const path = require("path");
const cors = require("cors");  // this allows to application to access the backend.
const crypto = require("crypto"); // for razorpay signature validation 
const bcrypt = require("bcrypt"); // for password hashing

app.use(express.json()); // by this express.josn whatever response we will get from response that will be automatically passed through json;
app.use(cors({
    origin: ['https://ecommerce-y556.vercel.app', 'https://ecommerce-oec8.vercel.app', 'https://ecommerce-ggvm.vercel.app', 'http://localhost:3000'],
    credentials: true
}));


//For Razorpay
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT;
const Razorpay = require("razorpay");
require("dotenv").config()
app.post("/order", async (req, res) => {  // creating razorpay instances 
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = req.body;
        const order = await razorpay.orders.create(options);
        if (!order) {
            return res.status(500).json({ error: "Error creating order" });
        }
        res.json(order);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});



// for payment validation 
app.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
        
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
        return res.status(400).json({ msg: "Transaction is not legit!" });
    }
    res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
    });
})

// Database conection with mongoDB
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
}).then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err.message))


// API creation//An API, or Application Programming Interface, is a set of rules and protocols that allows one software application to interact with another
app.get("/", (req, res) => {
    res.send("Express App is Running");
})

// Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage })

// create upload endpoint for images . In req we get image of user
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    const imageUrl = process.env.BACKEND_URL || `http://localhost:${port}`;
    res.json({
        success: 1,
        image_url: `${imageUrl}/images/${req.file.filename}`
    })
})

//Schema for Creating Products using mongoose library
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true, //if id not present it wont be added in database.
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    new_price: {
        type: Number,
        require: true,
    },
    old_price: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        default:
            Date.now, //when we will add any product the date will be taken from the system current date.
    },
    available: {
        type: Boolean,
        default: true,
    }
})

//Store product in database
app.post('/addproduct', async (req, res) => {
    try {
        // Validate input
        const { name, image, category, new_price, old_price } = req.body;
        
        if (!name || !image || !category || !new_price || !old_price) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }
        
        if (isNaN(new_price) || isNaN(old_price)) {
            return res.status(400).json({ success: false, error: "Prices must be valid numbers" });
        }
        
        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        }
        else {
            id = 1;
        }
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: Number(req.body.new_price),
            old_price: Number(req.body.old_price),
        });
        console.log(product);
        await product.save();  // saved in database
        console.log("Saved");
        res.json({
            // key and value
            success: true,
            name: req.body.name,   // here we will get product name.
        })
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, error: error.message });
    }
})

// Creating API for deleting Products
//this is endpoint for remove prouct by using its ID
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})
// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})



// Schema creting for User model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

//Creating Endpoint for registering  the user
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, error: "existing user found with same email ID or email address" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        cartData: cart,
    })

    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token })

})

// creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email }); // from this we will get user to particular emailID 
    if (user) {
        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ success: true, token, isAdmin: user.isAdmin });
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
})


// creating endpoint for newcollection data
app.get('/newcollection', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})


//creating endpoint for popula in women section
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" });
    }
    else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "please authenticate using a valid token" });
        }
    }
}

//creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
})

// Creating endpoint to remove product from carddata
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("remove");
})


// creating endpoint to get cartdata

app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id });
    if (!userData) {
        return res.status(404).json({ errors: "User not found" });
    }
    res.json(userData.cartData);
})



app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port)
    }
    else {
        console.log("Error :" + error)
    }
})