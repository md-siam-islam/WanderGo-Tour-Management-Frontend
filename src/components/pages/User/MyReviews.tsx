import { Link } from "react-router";
import { Star, MessageSquare, Trash2, Calendar, Compass, ExternalLink } from "lucide-react";
import {
  useGetMyReviewsQuery,
  useDeleteReviewMutation,
} from "@/redux/features/review/review.api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MyReviews = () => {
  const { data, isLoading, refetch } = useGetMyReviewsQuery(undefined);
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const reviews = data?.data || [];

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-nunito flex items-center gap-2">
            <MessageSquare className="size-7 text-[#EC003F]" /> My Reviews & Feedback
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            See all the travel reviews and ratings you have shared for WanderGo tours.
          </p>
        </div>
        <Button asChild className="bg-[#EC003F] hover:bg-[#d30037] text-white">
          <Link to="/tour" className="flex items-center gap-2">
            <Compass className="size-4" /> Explore Tours
          </Link>
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl border bg-card/50 animate-pulse"
            />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-2xl border border-dashed bg-muted/20">
          <div className="size-16 mx-auto mb-4 rounded-full bg-pink-500/10 flex items-center justify-center text-[#EC003F]">
            <MessageSquare className="size-8" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No reviews yet</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mt-1 mb-6">
            You haven't reviewed any tours yet. Complete a booking and share your travel experience with fellow explorers!
          </p>
          <Button asChild className="bg-[#EC003F] hover:bg-[#d30037] text-white">
            <Link to="/tour">Find a Tour to Review</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => {
            const tour = typeof rev.tour === "object" ? rev.tour : null;

            return (
              <div
                key={rev._id}
                className="group rounded-2xl border bg-card text-card-foreground p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`size-4 ${
                            star <= rev.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      ({rev.rating}/5)
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 ml-2">
                      <Calendar className="size-3" />
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {tour && (
                    <h3 className="font-bold text-base text-foreground font-nunito flex items-center gap-2">
                      Tour: {tour.title}
                      <Link
                        to={`/tour-details/${tour._id}`}
                        className="text-[#EC003F] hover:underline inline-flex items-center text-xs"
                      >
                        <ExternalLink className="size-3 ml-1" />
                      </Link>
                    </h3>
                  )}

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(rev._id)}
                  disabled={isDeleting}
                  className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 self-end sm:self-center"
                >
                  <Trash2 className="size-4 mr-1.5" /> Delete
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
