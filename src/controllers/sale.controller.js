import Sale from '../models/Sale.js';

export const createSale = async (req, res) => {
  try {
    const user = req.userId;
    const { product, quantity, date = Date.now() } = req.body;

    const sale = new Sale({
      seller: user,
      saleDetails: [
        {
          product,
          quantity
        }
      ],
      date
    });

    const savedSale = await sale.save();

    return res.status(201).json({
      message: 'Sale saved succesfullu!',
      data: savedSale
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getSales = async (req, res) => {
  try {
    const { startDate = new Date(new Date().setHours(0, 0, 0, 0)), endDate = new Date(new Date().setHours(23, 59, 59, 999)) } = req.query;

    const [ total, data ] = await Promise.all([
      Sale.countDocuments(({"date": {"$gte": startDate, "$lt": endDate}})),
      Sale.find({"date": {"$gte": startDate, "$lt": endDate}}).populate('seller', '-password').populate('saleDetails.product')
    ]);

    const salesPerSeller = {};

    data.forEach((sale) => {
      const sellerId = sale.seller._id
      const saleDetails = sale.saleDetails;

      if (!salesPerSeller[sellerId]) {
        salesPerSeller[sellerId] = {
          seller: sale.seller,
          totalSales: 0,
          totalAmount: 0,
        };
      }

      const sellerResult = salesPerSeller[sellerId];
      saleDetails.forEach((saleDetail) => {
        sellerResult.totalSales += saleDetail.quantity;
        sellerResult.totalAmount += saleDetail.quantity * saleDetail.product.price;
      });
    });

    return res.status(200).json({
      total,
      data: Object.values(salesPerSeller)
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}