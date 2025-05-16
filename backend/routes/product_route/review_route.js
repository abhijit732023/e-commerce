import express from 'express';
import Review from '../../models/product_model/review_model.js';
// import { verifyUser } from '../middlewares/auth.js'; // replace with your actual auth middleware

const router = express.Router();

// Get all reviews for a product
router.get('/:productId', async (req, res) => {
  // console.log('iddd',req.params.productId);
  const productId=req.params.productId
  

  try {
    const reviews = await Review.find({ productId:productId });
    res.status(201).json({ message: 'Review gott', reviews });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get reviews.' });
  }
});

// Post a review
router.post('/:productId', async (req, res) => {
  const { rating, comment,productId,userId,userName } = req.body;
  // console.log(req.body);
  

  try {
    const review = new Review({
      userId,
      productId,
      rating,
      comment,
      userName
    });

    await review.save();
    res.status(201).json({ message: 'Review submitted', review });
  } catch (err) {
    res.status(400).json({ message: 'Review submission failed.' });
  }
});

export default router;
