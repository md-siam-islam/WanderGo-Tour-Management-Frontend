import { useState } from "react";
import {
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
  type IReview,
} from "@/redux/features/review/review.api";
import {
  Star,
  Search,
  Filter,
  Trash2,
  RefreshCw,
  User,
  MapPin,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function AdminReviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | "ALL">("ALL");
  const [reviewToDelete, setReviewToDelete] = useState<IReview | null>(null);

  const { data: reviewsData, isLoading, refetch } = useGetAllReviewsQuery(undefined);
  const [deleteReview] = useDeleteReviewMutation();

  const allReviews = (reviewsData?.data || []) as IReview[];

  // Filter reviews
  const filteredReviews = allReviews.filter((r) => {
    const matchesRating = ratingFilter === "ALL" || r.rating === ratingFilter;

    const userName = r.user?.name?.toLowerCase() || "";
    const userEmail = r.user?.email?.toLowerCase() || "";
    const tourTitle =
      typeof r.tour === "object" ? r.tour.title?.toLowerCase() || "" : "";
    const comment = r.comment?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      userName.includes(term) ||
      userEmail.includes(term) ||
      tourTitle.includes(term) ||
      comment.includes(term);

    return matchesRating && matchesSearch;
  });

  // Calculate Metrics
  const totalCount = allReviews.length;
  const avgRating =
    totalCount > 0
      ? (
          allReviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) / totalCount
        ).toFixed(1)
      : "5.0";
  const fiveStarCount = allReviews.filter((r) => r.rating === 5).length;
  const criticalCount = allReviews.filter((r) => r.rating <= 2).length;

  const handleDelete = async () => {
    if (!reviewToDelete) return;
    const toastId = toast.loading("Removing review...");
    try {
      const res = await deleteReview(reviewToDelete._id).unwrap();
      if (res.success) {
        toast.success("Review deleted successfully", { id: toastId });
        setReviewToDelete(null);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to delete review", {
        id: toastId,
      });
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF1A53]/10 text-[#EF1A53] text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="size-3.5 fill-[#EF1A53]" />
            <span>Customer Feedback</span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground font-nunito tracking-tight">
            Reviews Moderation
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Oversee traveler ratings, moderate comments, and maintain community review quality.
          </p>
        </div>

        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
          className="rounded-xl font-semibold gap-2 border-border/80"
        >
          <RefreshCw className="size-4" />
          <span>Refresh Reviews</span>
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5">
            <MessageSquare className="size-3.5 text-blue-500" /> Total Reviews
          </p>
          <p className="text-3xl font-black text-foreground font-nunito">{totalCount}</p>
          <p className="text-[11px] text-muted-foreground">Submitted by travelers</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-amber-500 tracking-wider flex items-center gap-1.5">
            <Star className="size-3.5 fill-amber-500" /> Platform Average
          </p>
          <p className="text-3xl font-black text-amber-500 font-nunito">{avgRating} / 5.0</p>
          <p className="text-[11px] text-muted-foreground">Overall traveler satisfaction</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-emerald-600 tracking-wider flex items-center gap-1.5">
            <ThumbsUp className="size-3.5" /> 5-Star Praise
          </p>
          <p className="text-3xl font-black text-emerald-600 font-nunito">{fiveStarCount}</p>
          <p className="text-[11px] text-muted-foreground">Top tier ratings</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-red-600 tracking-wider flex items-center gap-1.5">
            <AlertCircle className="size-3.5" /> Critical (1-2 Stars)
          </p>
          <p className="text-3xl font-black text-red-600 font-nunito">{criticalCount}</p>
          <p className="text-[11px] text-muted-foreground">Requires attention</p>
        </div>
      </div>

      {/* Search & Rating Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/70 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search traveler, tour, or review comment..."
            className="pl-9 rounded-xl h-10 text-sm border-border/80"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(["ALL", 5, 4, 3, 2, 1] as const).map((r) => (
            <Button
              key={r.toString()}
              size="sm"
              variant={ratingFilter === r ? "default" : "outline"}
              onClick={() => setRatingFilter(r)}
              className={`rounded-xl text-xs font-bold h-8 px-2.5 shrink-0 ${
                ratingFilter === r
                  ? "bg-[#EF1A53] hover:bg-[#d81548] text-white"
                  : "border-border/70"
              }`}
            >
              {r === "ALL" ? (
                "All Stars"
              ) : (
                <span className="flex items-center gap-1">
                  <span>{r}</span>
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-card rounded-3xl border border-border/80 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border/60 text-xs font-bold uppercase text-muted-foreground tracking-wider">
              <tr>
                <th className="py-4 px-6">Traveler</th>
                <th className="py-4 px-6">Tour Package</th>
                <th className="py-4 px-6">Rating</th>
                <th className="py-4 px-6 max-w-sm">Feedback Comment</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="size-6 animate-spin text-[#EF1A53]" />
                      <span>Loading review records...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    <p className="text-base font-semibold">No reviews found</p>
                    <p className="text-xs">Adjust your search or star filters.</p>
                  </td>
                </tr>
              ) : (
                filteredReviews.map((rev) => (
                  <tr key={rev._id} className="hover:bg-muted/30 transition-colors">
                    {/* Traveler */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2.5 max-w-[170px] truncate">
                        <img
                          src={
                            rev.user?.picture ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                          }
                          alt={rev.user?.name || "Traveler"}
                          className="size-9 rounded-full object-cover border border-border/70 shadow-xs"
                        />
                        <div className="truncate">
                          <p className="font-bold text-foreground text-xs truncate">
                            {rev.user?.name || "Anonymous Traveler"}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {rev.user?.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Tour */}
                    <td className="py-4 px-6">
                      <div className="max-w-[200px]">
                        <p className="font-semibold text-foreground text-xs line-clamp-1">
                          {typeof rev.tour === "object" ? rev.tour?.title : "Tour Package"}
                        </p>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`size-3.5 ${
                              idx < rev.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-muted border-border"
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-foreground ml-1.5 font-nunito">
                          {rev.rating}.0
                        </span>
                      </div>
                    </td>

                    {/* Feedback Comment */}
                    <td className="py-4 px-6 max-w-sm">
                      <p className="text-xs text-foreground/90 line-clamp-2 leading-relaxed">
                        "{rev.comment}"
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(rev.createdAt || Date.now()).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReviewToDelete(rev)}
                        className="rounded-xl h-8 px-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-500/10 gap-1"
                      >
                        <Trash2 className="size-3.5" />
                        <span>Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={!!reviewToDelete} onOpenChange={() => setReviewToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-nunito font-bold">
              Moderate & Delete Review?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete this customer review? It will be permanently removed
              from the tour page and cannot be restored.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl text-xs font-semibold">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Review
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
