const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0, // Ensure the price cannot be negative
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        createdBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Admin"
            // type: String,
            // required: true,
            // trim: true, 
        }, // Reference to the User model
        imageURL: [
            {
                type: String, // URLs or paths to the product images
                required: true,
            },
        ],
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
