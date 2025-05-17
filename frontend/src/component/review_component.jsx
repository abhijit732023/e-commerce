import React, { useEffect, useState } from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { ENV_File, useAuth } from '../FilesPaths/all_path'

const ReviewSection = ({ productId, userId }) => {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${ENV_File.backendURL}/review/${productId}`);
      setReviews(res.data.reviews);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post(`${ENV_File.backendURL}/review/${productId}`, {
        rating: reviewRating,
        comment: reviewText,
        userId,
        productId,
        userName: user.username
      });

      setReviewRating(0);
      setReviewText("");
      setShowReviewForm(false);
      fetchReviews();
    } catch (err) {
      console.error("Failed to submit review:", err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line
  }, [productId]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length
      : 0;

  return (
    <div className="mt-10 bg-gradient-to-br from-white via-gray-50 to-amber-50 p-6 rounded-2xl shadow-lg border border-rose-100">
        <h3 className="text-2xl font-extrabold text-rose-700 flex items-center gap-2">
           Reviews & Ratings
        </h3>
      <div className="flex items-center justify-between mb-4">
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-yellow-500">{averageRating.toFixed(1)}</span>
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
              ({reviews.length} review{reviews.length > 1 ? "s" : ""})
            </span>
          </div>
        )}
      </div>

      {/* Review List */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {reviews.length === 0 && (
          <div className="text-gray-400 text-base text-center py-8">
            No reviews yet. Be the first to review!
          </div>
        )}
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-white border border-rose-100 rounded-xl p-4 shadow flex flex-col md:flex-row md:items-center gap-3"
          >
            <div className="flex items-center gap-3 min-w-[120px]">
              <FaUserCircle className="text-3xl text-rose-400" />
              <div>
                <span className="font-semibold text-rose-700 block">{review.userName || "User"}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }
                    />
                  ))}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-700 mb-1">{review.comment}</p>
              <span className="text-xs text-gray-400">
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                  : ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Button and Form */}
      {user && !showReviewForm && (
        <div className="flex justify-end">
          <button
            className="bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 hover:bg-rose-700 transition-all duration-200"
            onClick={() => setShowReviewForm(true)}
          >
            Add Review
          </button>
        </div>
      )}

      {user && showReviewForm && (
        <form
          onSubmit={handleReviewSubmit}
          className="bg-white border border-rose-200 rounded-xl p-6 shadow flex flex-col gap-3 mt-4"
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
          <div className="flex gap-2 justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="bg-rose-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-rose-700 transition"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
              onClick={() => setShowReviewForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReviewSection;