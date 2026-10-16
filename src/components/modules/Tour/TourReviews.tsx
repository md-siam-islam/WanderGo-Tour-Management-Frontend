import { useState } from "react";
import { Link } from "react-router";
import {
  Star,
  MessageSquare,
  Trash2,
  Calendar,
  Send,
  LogIn,
  Sparkles,
} from "lucide-react";
import {
  useGetReviewsByTourQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
} from "@/redux/features/review/review.api";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface TourReviewsProps {
  tourId: string;
  currentUser?: {
    _id?: string;
    name?: string;
    email?: string;
    picture?: string;
  };
}

export const TourReviews = ({ tourId, currentUser }: TourReviewsProps) => {
  const { data, isLoading, refetch } = useGetReviewsByTourQuery(tourId);
  const [addReview, { isLoading: isSubmitting }] = useAddReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const reviews = data?.data || [];

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
      : 5.0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.email) {
      toast.error("Please log in to submit a review");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please enter your review comment");
      return;
    }
    if (comment.trim().length < 3) {
      toast.error("Comment must be at least 3 characters");
      return;
    }

    try {
      const res = await addReview({
        tour: tourId,
        rating,
        comment: comment.trim(),
      }).unwrap();

      if (res?.success) {
        toast.success("Thank you! Your review has been posted.");
        setComment("");
        setRating(5);
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete your review?")) return;
    try {
      const res = await deleteReview(reviewId).unwrap();
      if (res?.success) {
        toast.success("Review deleted successfully");
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="space-y-8 mt-6">
      {/* Rating Overview Header */}
      <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <div className="size-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col items-center justify-center text-amber-500">
            <span className="text-3xl font-black font-nunito leading-none">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`size-2.5 ${
                    s <= Math.round(averageRating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground font-nunito">
              Traveler Ratings & Reviews
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Based on {reviews.length} {reviews.length === 1 ? "review" : "verified reviews"} from real travelers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-3.5 py-2 rounded-full border border-emerald-500/20">
          <Sparkles className="size-4" /> 100% Verified Community Feedback
        </div>
      </div>

      {/* Review Submission Form */}
      <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-xs space-y-4">
        <h4 className="font-bold text-lg text-foreground font-nunito flex items-center gap-2">
          <MessageSquare className="size-5 text-[#EC003F]" />
          Leave Your Tour Review
        </h4>

        {currentUser?.email ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Interactive Stars */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Your Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-hidden"
                  >
                    <Star
                      className={`size-7 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-3 text-sm font-bold text-foreground">
                  {hoverRating || rating} / 5 Stars
                </span>
              </div>
            </div>

            {/* Comment Area */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Your Travel Experience & Tips
              </label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience! How was the guide, scenery, accommodation, and hospitality?"
                required
                className="w-full p-3.5 rounded-xl border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-[#EC003F] resize-y"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#EC003F] hover:bg-[#d30037] text-white flex items-center gap-2"
            >
              <Send className="size-4" />
              {isSubmitting ? "Submitting..." : "Post Review"}
            </Button>
          </form>
        ) : (
          <div className="p-6 rounded-xl bg-muted/30 border text-center space-y-3">
            <LogIn className="size-8 text-[#EC003F] mx-auto" />
            <h5 className="font-semibold text-foreground text-sm">Want to review this tour?</h5>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              You need to be logged into your WanderGo traveler account to post a review and rating.
            </p>
            <Button asChild size="sm" className="bg-[#EC003F] hover:bg-[#d30037] text-white">
              <Link to="/login" state={{ from: `/tour-details/${tourId}` }}>
                Log In to Leave Review
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h4 className="font-bold text-lg text-foreground font-nunito">
          Traveler Reviews ({reviews.length})
        </h4>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-28 rounded-xl bg-muted/40 animate-pulse" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground border rounded-2xl bg-muted/10">
            Be the first traveler to share a review for this tour!
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((rev) => {
              const isOwner = currentUser?._id && rev.user?._id === currentUser._id;

              return (
                <div
                  key={rev._id}
                  className="p-5 rounded-2xl border bg-card text-card-foreground shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10 border">
                        <AvatarImage src={rev.user?.picture} />
                        <AvatarFallback className="bg-pink-500/10 text-[#EC003F] font-bold text-sm">
                          {rev.user?.name ? rev.user.name.charAt(0).toUpperCase() : "T"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h5 className="font-bold text-sm text-foreground">
                          {rev.user?.name || "Traveler"}
                        </h5>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`size-3 ${
                                  s <= rev.rating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Calendar className="size-3" />
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isOwner && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(rev._id)}
                        disabled={isDeleting}
                        className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs h-8"
                      >
                        <Trash2 className="size-3.5 mr-1" /> Delete
                      </Button>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed pl-13">
                    {rev.comment}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourReviews;
