const express = require('express');
const router = express.Router();
const {addProduct, viewAllProducts, deleteProduct, updateProduct, viewProductById} = require('../AdminControllers/ProductController')
const { verifyToken } = require('../middlewares/verifyToken');

const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Configure Multer storage
// Ensure the uploads directory exists
const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); // Use the verified directory path
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

const upload = multer({ storage });

// Route to add a new product
router.post('/add', verifyToken, upload.single('image'), addProduct);
//router.post('/add', addProduct);


// Route to view all products of a seller
router.get('/all', viewAllProducts);

// DELETE product by ID
//router.delete('/delete/:productId', deleteProduct); // Route to delete a product by ID
// router.delete('/delete/:productId', (req, res, next) => {
//     console.log('Request received to delete product:', req.params.productId);
//     next();
//   });
router.delete('/delete/:productId', deleteProduct);

// Route to update product
router.put('/edit/:id', upload.single('image'), updateProduct);

router.get('/product/:id', viewProductById);

module.exports = router;