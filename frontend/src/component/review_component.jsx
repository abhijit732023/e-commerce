import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { ENV_File, useAuth } from '../FilesPaths/all_path'
const ReviewSection = ({ productId, userId }) => {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${ENV_File.backendURL}/review/${productId}`);
      // console.log('review got',res.data.reviews);

      setReviews(res.data.reviews);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axios.post(`${ENV_File.backendURL}/review/${productId}`, {
        rating: reviewRating,
        comment: reviewText,
        userId,
        productId,
        userName: user.username // Optional if user is decoded from token on backend
      });
      // console.log('review',res.data);


      setReviewRating(0);
      setReviewText("");
      fetchReviews();
    } catch (err) {
      console.error("Failed to submit review:", err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length
      : 0;

  return (
    <div className="mt-10 bg-gray-50 p-4">
      <h3 className="text-2xl font-bold text-rose-700 mb-4 flex items-center gap-2">
        <FaStar className="text-yellow-400" /> Reviews & Ratings
      </h3>

      {reviews.length > 0 && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-semibold text-yellow-500">
            {averageRating.toFixed(1)}
          </span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm">
            ({reviews.length} reviews)
          </span>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
        {reviews.length === 0 && (
          <div className="text-gray-400 text-base">
            No reviews yet. Be the first to review!
          </div>
        )}
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-white/80 border border-rose-100 rounded-lg p-3 shadow flex flex-col"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-rose-700">
                {review.userName || "User"}
              </span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <span className="text-xs text-gray-400 mt-1">
              {review.createdAt
                ? new Date(review.createdAt).toLocaleDateString("en-GB")
                : ""}
            </span>

          </div>
        ))}
      </div>

      {/* Add Review Form */}
      <form
        onSubmit={handleReviewSubmit}
        className="bg-white/90 border border-rose-200 rounded-xl p-4 shadow flex flex-col gap-2"
      >
        <label className="font-medium text-gray-700 mb-1">Your Rating</label>
        <div className="flex gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setReviewRating(i + 1)}
              className="focus:outline-none"
            >
              <FaStar
                className={`text-2xl transition ${i < reviewRating ? "text-yellow-400" : "text-gray-300"
                  }`}
              />
            </button>
          ))}
        </div>
        <textarea
          className="border border-rose-200 rounded p-2 mb-2 resize-none focus:ring-rose-400 focus:border-rose-400"
          rows={3}
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-rose-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-rose-700 transition"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
