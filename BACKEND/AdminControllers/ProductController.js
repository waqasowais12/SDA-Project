const Product = require('../Models/Product');
const mongoose = require('mongoose');
// Assuming Product model is imported correctly

const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // Assuming you are storing user info in req.user
    const userId = req.user.userId; 

    // Ensure all required fields are present, including the image
    if (!name || !price || !description || !req.file) {
      return res.status(400).json({ message: 'All fields are required, including an image' });
    }

    // Log the uploaded file name for debugging
    console.log("Uploaded file name:", req.file.filename);

    // Create the product object
    const product = new Product({
      name,
      price,
      description,
      createdBy: userId,
      imageURL: `/uploads/${req.file.filename}`, // Save the image path in the database
    });

    // Save the product to the database
    const savedProduct = await product.save();

    // Send a success response with the saved product
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    // Log and return an error response if something goes wrong
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

const viewAllProducts = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
        
        // Send the products as a response to the client
        res.status(200).json({ products });

    } catch (error) {
        console.error("Error fetching products:", error);
        // Send an error response
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Delete product by ID
// const deleteProduct = async (req, res) => {
//     try {
//       const productId = req.params.id;
  
//       // Find and delete the product
//       const product = await Product.findByIdAndDelete(productId);
  
//       if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//       }
  
//       res.status(200).json({ message: 'Product deleted successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };

const deleteProduct = async (req, res) => {
  try {
      const { productId } = req.params;

      // Log the product ID
      console.log('Deleting product with ID:', productId);

      // Validate product ID
      if (!mongoose.Types.ObjectId.isValid(productId)) {
          console.log('Invalid product ID format');
          return res.status(400).json({ message: 'Invalid product ID' });
      }

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
          console.log('Product not found');
          return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
      console.error('Error in deleteProduct:', error);
      return res.status(500).json({ message: 'Server error' });
  }
};

// Update product
const updateProduct = async (req, res) => {
  // try {
  //   const { id } = req.params;
  //   const { name, price, description } = req.body;

  //   let product = await Product.findById(id);
  //   if (!product) {
  //     return res.status(404).send('Product not found');
  //   }

  //   // Update the product details
  //   product.name = name;
  //   product.price = price;
  //   product.description = description;

  //   if (req.file) {
  //     product.imageURL = `/uploads/${req.file.filename}`; // Save image path to DB
  //   }

  //   await product.save();

  //   res.status(200).send({ product });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('Server error');
  // }
  try {
    const { name, price, description, imageURL } = req.body;

    let imagePath = imageURL; // Use existing image if no new image is provided

    // If new image is uploaded, save it and update imagePath
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // Assuming you're using local storage
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, imageURL: imagePath },
      { new: true }
    );

    res.json({ product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

const viewProductById = async (req, res) => {
  try {
    const { id } = req.params; // Get the product ID from the request params

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Find the product by ID
    const product = await Product.findById(id);

    // Check if product is found
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return the product data
    res.status(200).json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

module.exports = {
    addProduct,
    viewAllProducts,
    deleteProduct,
    updateProduct,
    viewProductById,
};