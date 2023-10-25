import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    const productFound = await Product.findOne({ name });

    if(productFound){
      console.log({productFound})
      return res.status(400).json({ message: 'Product already exists.' });
    }

    const product = new Product({
      name,
      price
    });

    const savedProduct = await product.save();

    return res.status(201).json({
      message: 'Product saved succesfully!',
      data: savedProduct
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const [ products, total ] = await Promise.all([
      Product.find(),
      Product.countDocuments()
    ]);

    return res.status(200).json({
      data: products,
      total
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const productFound = await Product.findById(productId);

    if(!productFound)
      return res.status(404).json({ message: 'Product not found.' });

    return res.status(200).json({
      data: productFound
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};