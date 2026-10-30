import { useState } from "react";
import {
  useGetTourGuidesQuery,
  useUpdateUserRoleStatusMutation,
  useDeleteUserMutation,
} from "@/redux/features/auth/auth.api";
import {
  useGetAllGuideApplicationsQuery,
  useReviewGuideApplicationMutation,
  useDeleteGuideApplicationMutation,
  type IGuideApplication,
} from "@/redux/features/guideApplication/guideApplication.api";
import {
  Compass,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  MoreVertical,
  ShieldCheck,
  UserCheck,
  UserX,
  Trash2,
  RefreshCw,
  Eye,
  Send,
  Phone,
  Mail,
  MapPin,
  Languages,
  FileText,
  ExternalLink,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminGuides() {
  const [activeTab, setActiveTab] = useState<string>("applications");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Guide Applications queries & mutations
  const {
    data: applicationsData,
    isLoading: isAppsLoading,
    refetch: refetchApps,
  } = useGetAllGuideApplicationsQuery(undefined);
  const [reviewApplication, { isLoading: isReviewing }] = useReviewGuideApplicationMutation();
  const [deleteApplication] = useDeleteGuideApplicationMutation();

  // Certified Guides queries & mutations
  const {
    data: guidesData,
    isLoading: isGuidesLoading,
    refetch: refetchGuides,
  } = useGetTourGuidesQuery(undefined);
  const [updateUser] = useUpdateUserRoleStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Modals state
  const [selectedApp, setSelectedApp] = useState<IGuideApplication | null>(null);
  const [reviewAction, setReviewAction] = useState<"APPROVED" | "REJECTED" | null>(null);
  const [adminFeedback, setAdminFeedback] = useState("");
  const [guideToDemote, setGuideToDemote] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const applications: IGuideApplication[] = applicationsData?.data || [];
  const certifiedGuides: any[] = guidesData?.data || [];

  // Metrics
  const pendingCount = applications.filter((a) => a.status === "PENDING").length;
  const approvedCount = applications.filter((a) => a.status === "APPROVED").length;
  const rejectedCount = applications.filter((a) => a.status === "REJECTED").length;
  const totalGuidesCount = certifiedGuides.length;

  // Filtered Applications
  const filteredApps = applications.filter((app) => {
    const matchesStatus =
      statusFilter === "ALL" || app.status.toLowerCase() === statusFilter.toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      app.fullName.toLowerCase().includes(term) ||
      app.email.toLowerCase().includes(term) ||
      app.phone.toLowerCase().includes(term) ||
      app.nidOrPassport.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  // Filtered Certified Guides
  const filteredGuides = certifiedGuides.filter((guide) => {
    const term = searchTerm.toLowerCase();
    return (
      guide.name?.toLowerCase().includes(term) ||
      guide.email?.toLowerCase().includes(term) ||
      guide.phone?.toLowerCase().includes(term)
    );
  });

  // Handle Review (Approve or Reject)
  const handleConfirmReview = async () => {
    if (!selectedApp || !reviewAction) return;

    const toastId = toast.loading(
      reviewAction === "APPROVED"
        ? "Approving guide application and elevating role to GUIDE..."
        : "Rejecting guide application..."
    );

    try {
      await reviewApplication({
        id: selectedApp._id,
        data: {
          status: reviewAction,
          adminFeedback: adminFeedback.trim() || undefined,
        },
      }).unwrap();

      toast.success(
        reviewAction === "APPROVED"
          ? `Application approved! ${selectedApp.fullName} is now an official Tour Guide.`
          : `Application rejected with feedback.`,
        { id: toastId }
      );

      setSelectedApp(null);
      setReviewAction(null);
      setAdminFeedback("");
      refetchApps();
      refetchGuides();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to submit review", {
        id: toastId,
      });
    }
  };

  // Demote Guide to User
  const handleDemoteGuide = async () => {
    if (!guideToDemote) return;
    const toastId = toast.loading("Demoting tour guide to traveler role...");
    try {
      await updateUser({ id: guideToDemote._id, data: { role: "USER" } }).unwrap();
      toast.success(`${guideToDemote.name} has been demoted to traveler role`, { id: toastId });
      setGuideToDemote(null);
      refetchGuides();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to demote guide", { id: toastId });
    }
  };

  // Toggle Guide Account Status (Active / Blocked)
  const handleToggleStatus = async (guide: any) => {
    const newStatus = guide.isActive === "active" ? "blocked" : "active";
    const toastId = toast.loading(`Updating status to ${newStatus}...`);
    try {
      await updateUser({ id: guide._id, data: { isActive: newStatus } }).unwrap();
      toast.success(`Guide account is now ${newStatus}`, { id: toastId });
      refetchGuides();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to update status", { id: toastId });
    }
  };

  // Delete Guide Account
  const handleDeleteGuide = async () => {
    if (!userToDelete) return;
    const toastId = toast.loading("Deleting guide account...");
    try {
      await deleteUser(userToDelete._id).unwrap();
      toast.success("Guide account deleted successfully", { id: toastId });
      setUserToDelete(null);
      refetchGuides();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to delete guide", { id: toastId });
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF1A53]/10 text-[#EF1A53] text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="size-3.5" />
            <span>Tour Guide Administration</span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground font-nunito tracking-tight">
            Tour Guides & Applications Hub
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review incoming guide verification requests, promote qualified users to certified Tour Guides, and oversee all active guides.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              refetchApps();
              refetchGuides();
            }}
            variant="outline"
            size="sm"
            className="rounded-xl font-semibold gap-2 border-border/80"
          >
            <RefreshCw className="size-4" />
            <span>Refresh All</span>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-amber-600 tracking-wider flex items-center gap-1.5">
            <Clock className="size-3.5" /> Pending Applications
          </p>
          <p className="text-3xl font-black text-amber-600 font-nunito">{pendingCount}</p>
          <p className="text-[11px] text-muted-foreground">Awaiting admin decision</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-emerald-600 tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" /> Certified Guides
          </p>
          <p className="text-3xl font-black text-emerald-600 font-nunito">{totalGuidesCount}</p>
          <p className="text-[11px] text-muted-foreground">Active guide network</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-blue-600 tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5" /> Approved Requests
          </p>
          <p className="text-3xl font-black text-blue-600 font-nunito">{approvedCount}</p>
          <p className="text-[11px] text-muted-foreground">Successfully verified</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-rose-600 tracking-wider flex items-center gap-1.5">
            <XCircle className="size-3.5" /> Rejected Requests
          </p>
          <p className="text-3xl font-black text-rose-600 font-nunito">{rejectedCount}</p>
          <p className="text-[11px] text-muted-foreground">Did not meet criteria</p>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <TabsList className="bg-muted/60 p-1 rounded-2xl h-11 border border-border/60">
            <TabsTrigger
              value="applications"
              className="rounded-xl px-5 py-2 text-xs font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Guide Applications</span>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-extrabold animate-pulse">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="guides"
              className="rounded-xl px-5 py-2 text-xs font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Certified Tour Guides</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold">
                {totalGuidesCount}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Search & Filter bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, email, phone, NID..."
                className="pl-9 rounded-xl h-10 text-sm border-border/80"
              />
            </div>

            {activeTab === "applications" && (
              <div className="flex items-center gap-1 bg-card p-1 rounded-xl border border-border/70">
                {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={statusFilter === status ? "default" : "ghost"}
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-lg text-xs font-bold h-8 px-2.5 capitalize ${
                      statusFilter === status
                        ? "bg-[#EF1A53] hover:bg-[#d81548] text-white"
                        : "text-muted-foreground"
                    }`}
                  >
                    {status === "ALL" ? "All Status" : status.toLowerCase()}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TAB 1: GUIDE APPLICATIONS */}
        <TabsContent value="applications" className="space-y-4 m-0">
          <div className="bg-card rounded-3xl border border-border/80 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 border-b border-border/60 text-xs font-bold uppercase text-muted-foreground tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Applicant</th>
                    <th className="py-4 px-6">Contact & NID</th>
                    <th className="py-4 px-6">Experience</th>
                    <th className="py-4 px-6">Specialties & Languages</th>
                    <th className="py-4 px-6">Applied Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {isAppsLoading ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-muted-foreground">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <RefreshCw className="size-6 animate-spin text-[#EF1A53]" />
                          <span>Loading guide applications...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredApps.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-muted-foreground">
                        <p className="text-base font-semibold">No guide applications found</p>
                        <p className="text-xs">Incoming applications will appear here for review.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredApps.map((app) => (
                      <tr key={app._id} className="hover:bg-muted/30 transition-colors">
                        {/* Applicant Profile */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                app.user?.picture ||
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                              }
                              alt={app.fullName}
                              className="size-10 rounded-full object-cover border border-border/80 shadow-xs"
                            />
                            <div className="max-w-[180px] truncate">
                              <p className="font-bold text-foreground truncate">{app.fullName}</p>
                              <p className="text-xs text-muted-foreground truncate">{app.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Contact & NID */}
                        <td className="py-4 px-6 text-xs text-muted-foreground">
                          <p className="font-mono font-medium text-foreground">{app.phone}</p>
                          <p className="text-[11px] mt-0.5">
                            ID: <span className="font-mono text-muted-foreground">{app.nidOrPassport}</span>
                          </p>
                        </td>

                        {/* Experience */}
                        <td className="py-4 px-6">
                          <Badge variant="outline" className="border-border/80 text-xs font-semibold">
                            {app.experienceYears} {app.experienceYears === 1 ? "Yr" : "Yrs"} Guiding
                          </Badge>
                        </td>

                        {/* Specialties & Languages */}
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1 max-w-[220px]">
                            {app.specialties?.slice(0, 2).map((s) => (
                              <Badge key={s} variant="secondary" className="text-[10px] truncate max-w-[100px]">
                                {s}
                              </Badge>
                            ))}
                            {(app.specialties?.length || 0) > 2 && (
                              <Badge variant="outline" className="text-[10px]">
                                +{(app.specialties?.length || 0) - 2}
                              </Badge>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-1 truncate max-w-[200px]">
                            🗣️ {app.languages?.join(", ")}
                          </p>
                        </td>

                        {/* Applied Date */}
                        <td className="py-4 px-6 text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(app.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          {app.status === "APPROVED" ? (
                            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-semibold gap-1">
                              <CheckCircle2 className="size-3" /> Approved
                            </Badge>
                          ) : app.status === "REJECTED" ? (
                            <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 font-semibold gap-1">
                              <XCircle className="size-3" /> Rejected
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 font-semibold gap-1">
                              <Clock className="size-3 animate-spin" /> Pending
                            </Badge>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedApp(app)}
                              className="h-8 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" /> Details
                            </Button>

                            {app.status === "PENDING" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setSelectedApp(app);
                                    setReviewAction("APPROVED");
                                    setAdminFeedback("Application approved. Welcome to WanderGo Guide Guild!");
                                  }}
                                  className="h-8 px-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white gap-1 rounded-xl shadow-xs"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedApp(app);
                                    setReviewAction("REJECTED");
                                    setAdminFeedback("");
                                  }}
                                  className="h-8 px-3 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-500/10 border-rose-500/30 gap-1 rounded-xl"
                                >
                                  <XCircle className="w-3.5 h-3.5" /> Reject
                                </Button>
                              </>
                            )}

                            {app.status !== "PENDING" && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground">
                                    <MoreVertical className="size-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-44 rounded-xl">
                                  {app.status === "REJECTED" ? (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedApp(app);
                                        setReviewAction("APPROVED");
                                        setAdminFeedback("Re-evaluated and approved.");
                                      }}
                                      className="text-emerald-600 text-xs font-semibold cursor-pointer"
                                    >
                                      <CheckCircle2 className="size-3.5 mr-2" /> Approve Application
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedApp(app);
                                        setReviewAction("REJECTED");
                                        setAdminFeedback("Revoked approval.");
                                      }}
                                      className="text-rose-600 text-xs font-semibold cursor-pointer"
                                    >
                                      <XCircle className="size-3.5 mr-2" /> Revoke Approval
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={async () => {
                                      try {
                                        await deleteApplication(app._id).unwrap();
                                        toast.success("Application removed");
                                        refetchApps();
                                      } catch (e: any) {
                                        toast.error("Failed to delete application");
                                      }
                                    }}
                                    className="text-destructive text-xs cursor-pointer"
                                  >
                                    <Trash2 className="size-3.5 mr-2" /> Delete Record
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: CERTIFIED TOUR GUIDES */}
        <TabsContent value="guides" className="space-y-4 m-0">
          <div className="bg-card rounded-3xl border border-border/80 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 border-b border-border/60 text-xs font-bold uppercase text-muted-foreground tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Guide Profile</th>
                    <th className="py-4 px-6">Contact & Location</th>
                    <th className="py-4 px-6">Role & Status</th>
                    <th className="py-4 px-6">Account Standing</th>
                    <th className="py-4 px-6">Certified Since</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {isGuidesLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-muted-foreground">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <RefreshCw className="size-6 animate-spin text-[#EF1A53]" />
                          <span>Loading certified tour guides...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredGuides.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-muted-foreground">
                        <p className="text-base font-semibold">No tour guides registered yet</p>
                        <p className="text-xs">When you approve applications, certified guides will appear here.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredGuides.map((guide) => (
                      <tr key={guide._id} className="hover:bg-muted/30 transition-colors">
                        {/* Guide Profile */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                guide.picture ||
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                              }
                              alt={guide.name}
                              className="size-10 rounded-full object-cover border border-emerald-500/40 shadow-xs"
                            />
                            <div className="max-w-[180px] truncate">
                              <div className="flex items-center gap-1.5">
                                <p className="font-bold text-foreground truncate">{guide.name}</p>
                                <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              </div>
                              <p className="text-xs text-muted-foreground truncate">{guide.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Contact & Location */}
                        <td className="py-4 px-6 text-xs text-muted-foreground">
                          <p className="font-mono">{guide.phone || "Not provided"}</p>
                          <p className="truncate max-w-[160px] text-[11px] text-muted-foreground">
                            {guide.address || "Bangladesh"}
                          </p>
                        </td>

                        {/* Role & Status */}
                        <td className="py-4 px-6">
                          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-bold text-xs gap-1">
                            <Compass className="size-3" /> Certified Guide
                          </Badge>
                        </td>

                        {/* Account Standing */}
                        <td className="py-4 px-6">
                          {guide.isActive === "active" ? (
                            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-semibold gap-1">
                              <CheckCircle2 className="size-3" /> Active
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30 font-semibold gap-1">
                              <XCircle className="size-3" /> Blocked
                            </Badge>
                          )}
                        </td>

                        {/* Joined Date */}
                        <td className="py-4 px-6 text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(guide.createdAt || Date.now()).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
                              >
                                <MoreVertical className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52 rounded-xl">
                              <DropdownMenuLabel className="text-xs">Guide Permissions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => setGuideToDemote(guide)}
                                className="text-amber-600 font-medium text-xs cursor-pointer"
                              >
                                <UserX className="size-3.5 mr-2" /> Revoke Status (Demote to User)
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />
                              <DropdownMenuLabel className="text-xs">Access Standing</DropdownMenuLabel>
                              {guide.isActive !== "blocked" ? (
                                <DropdownMenuItem
                                  onClick={() => handleToggleStatus(guide)}
                                  className="text-amber-600 font-medium text-xs cursor-pointer"
                                >
                                  <UserX className="size-3.5 mr-2" /> Suspend / Block Guide
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => handleToggleStatus(guide)}
                                  className="text-emerald-600 font-medium text-xs cursor-pointer"
                                >
                                  <UserCheck className="size-3.5 mr-2" /> Unblock Guide
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => setUserToDelete(guide)}
                                className="text-red-600 font-medium text-xs cursor-pointer"
                              >
                                <Trash2 className="size-3.5 mr-2" /> Delete Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* VIEW DETAILS MODAL */}
      <Dialog open={!!selectedApp && !reviewAction} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  {selectedApp?.fullName}'s Application
                </DialogTitle>
                <DialogDescription>
                  Submitted on {selectedApp?.createdAt ? new Date(selectedApp.createdAt).toLocaleString() : ""}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedApp && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-muted/40 border">
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-semibold">Email</span>
                  <p className="text-sm font-medium">{selectedApp.email}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-semibold">Phone</span>
                  <p className="text-sm font-medium">{selectedApp.phone}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-semibold">National ID / Passport</span>
                  <p className="text-sm font-mono font-medium">{selectedApp.nidOrPassport}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-semibold">Guiding Experience</span>
                  <p className="text-sm font-medium">{selectedApp.experienceYears} Years</p>
                </div>
              </div>

              <div>
                <span className="text-xs text-muted-foreground uppercase font-semibold block mb-1.5">
                  Specialties & Preferred Regions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApp.specialties?.map((s) => (
                    <Badge key={s} variant="outline" className="border-primary/40 text-primary text-xs">
                      <MapPin className="w-3 h-3 mr-1" /> {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-muted-foreground uppercase font-semibold block mb-1.5">
                  Spoken Languages
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApp.languages?.map((l) => (
                    <Badge key={l} variant="secondary" className="text-xs">
                      <Languages className="w-3 h-3 mr-1" /> {l}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-muted-foreground uppercase font-semibold block mb-1">
                  Applicant Bio & Guiding Style
                </span>
                <p className="text-sm text-foreground/90 p-3 rounded-xl bg-card border leading-relaxed whitespace-pre-line">
                  "{selectedApp.bio}"
                </p>
              </div>

              {selectedApp.portfolioUrl && (
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-semibold block mb-1">
                    Portfolio / Certificate Link
                  </span>
                  <a
                    href={selectedApp.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open Document / Link ({selectedApp.portfolioUrl})
                  </a>
                </div>
              )}

              {selectedApp.status !== "PENDING" && (
                <div className="p-3 rounded-xl bg-muted/60 border text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Review Status: {selectedApp.status}</span>
                    {selectedApp.reviewedAt && (
                      <span className="text-muted-foreground">
                        {new Date(selectedApp.reviewedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  {selectedApp.reviewedBy && (
                    <p className="text-muted-foreground">
                      Reviewed by: {selectedApp.reviewedBy.name} ({selectedApp.reviewedBy.email})
                    </p>
                  )}
                  {selectedApp.adminFeedback && (
                    <p className="text-foreground pt-1">
                      Feedback: "{selectedApp.adminFeedback}"
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            {selectedApp?.status === "PENDING" && (
              <div className="flex items-center gap-2 w-full justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setReviewAction("REJECTED");
                    setAdminFeedback("");
                  }}
                  className="text-rose-600 border-rose-500/30 hover:bg-rose-500/10"
                >
                  Reject Application
                </Button>
                <Button
                  onClick={() => {
                    setReviewAction("APPROVED");
                    setAdminFeedback("Application approved. Welcome to WanderGo Guide Guild!");
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Approve as Guide
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* APPROVE / REJECT CONFIRMATION DIALOG */}
      <Dialog open={!!reviewAction} onOpenChange={() => setReviewAction(null)}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <div className="flex items-center gap-2.5">
              {reviewAction === "APPROVED" ? (
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-600">
                  <XCircle className="w-6 h-6" />
                </div>
              )}
              <div>
                <DialogTitle className="text-lg font-bold">
                  {reviewAction === "APPROVED"
                    ? `Approve ${selectedApp?.fullName} as Guide?`
                    : `Reject ${selectedApp?.fullName}'s Application?`}
                </DialogTitle>
                <DialogDescription className="text-xs">
                  {reviewAction === "APPROVED"
                    ? "Approving will automatically elevate this user's account role to GUIDE."
                    : "The applicant will be informed and can review your feedback before resubmitting."}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <label className="text-xs font-semibold text-muted-foreground block">
              Admin Note / Feedback for Applicant
            </label>
            <Textarea
              rows={3}
              value={adminFeedback}
              onChange={(e) => setAdminFeedback(e.target.value)}
              placeholder={
                reviewAction === "APPROVED"
                  ? "e.g. Congratulations! Your guide credentials have been verified."
                  : "e.g. Please provide a clearer copy of your NID or more guiding experience details."
              }
              className="text-xs"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setReviewAction(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmReview}
              disabled={isReviewing}
              className={
                reviewAction === "APPROVED"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-rose-600 hover:bg-rose-700 text-white"
              }
            >
              {isReviewing
                ? "Processing..."
                : reviewAction === "APPROVED"
                ? "Confirm & Promote to Guide"
                : "Confirm Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DEMOTE GUIDE CONFIRMATION */}
      <AlertDialog open={!!guideToDemote} onOpenChange={() => setGuideToDemote(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-nunito font-bold">
              Revoke Tour Guide Status for {guideToDemote?.name}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs leading-relaxed">
              This action will revoke guide privileges for <strong>{guideToDemote?.email}</strong> and return their account role to a regular traveler (USER).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl text-xs font-semibold">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDemoteGuide}
              className="rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white"
            >
              Confirm Demotion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* DELETE GUIDE CONFIRMATION */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-nunito font-bold">
              Permanently Delete Guide {userToDelete?.name}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              This will permanently delete {userToDelete?.email}'s account from WanderGo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl text-xs font-semibold">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteGuide}
              className="rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Guide Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
