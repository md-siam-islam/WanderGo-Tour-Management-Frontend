import { useState } from "react";
import SEO from "@/components/shared/SEO";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleStatusMutation,
  useDeleteUserMutation,
} from "@/redux/features/auth/auth.api";
import {
  Users as UsersIcon,
  Search,
  Filter,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Trash2,
  UserCheck,
  UserX,
  RefreshCw,
  Mail,
  Phone,
  User,
  Shield,
  UserPlus,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const { data: usersData, isLoading, refetch } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUserRoleStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  const allUsers = (usersData?.data || []) as any[];

  // Filter users
  const filteredUsers = allUsers.filter((u) => {
    const matchesRole =
      roleFilter === "ALL" || u.role?.toLowerCase() === roleFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "ALL" ||
      u.isActive?.toLowerCase() === statusFilter.toLowerCase();

    const name = u.name?.toLowerCase() || "";
    const email = u.email?.toLowerCase() || "";
    const phone = u.phone?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      name.includes(term) || email.includes(term) || phone.includes(term);

    return matchesRole && matchesStatus && matchesSearch;
  });

  // Calculate Metrics
  const totalCount = allUsers.length;
  const adminCount = allUsers.filter((u) => u.role === "admin" || u.role === "superAdmin").length;
  const activeCount = allUsers.filter((u) => u.isActive === "active").length;
  const blockedCount = allUsers.filter(
    (u) => u.isActive === "blocked" || u.isActive === "inactive"
  ).length;

  // Change Role Handler
  const handleRoleChange = async (userId: string, newRole: string) => {
    const toastId = toast.loading(`Changing user role to ${newRole}...`);
    try {
      const res = await updateUser({ id: userId, data: { role: newRole } }).unwrap();
      if (res.success) {
        toast.success(`User role updated to ${newRole}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to update role", {
        id: toastId,
      });
    }
  };

  // Change Status Handler
  const handleStatusChange = async (userId: string, newStatus: string) => {
    const toastId = toast.loading(`Updating status to ${newStatus}...`);
    try {
      const res = await updateUser({ id: userId, data: { isActive: newStatus } }).unwrap();
      if (res.success) {
        toast.success(`Account status updated to ${newStatus}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to update status", {
        id: toastId,
      });
    }
  };

  // Delete Handler
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    const toastId = toast.loading("Deleting user account...");
    try {
      const res = await deleteUser(userToDelete._id).unwrap();
      if (res.success) {
        toast.success("User successfully deleted", { id: toastId });
        setUserToDelete(null);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to delete user", {
        id: toastId,
      });
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto font-sans">
      <SEO
        title="User Management | WanderGo Admin"
        description="Manage traveler profiles, control roles and permissions, and oversee platform access."
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF1A53]/10 text-[#EF1A53] text-xs font-bold uppercase tracking-wider mb-2">
            <UsersIcon className="size-3.5" />
            <span>Community & Security</span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground font-nunito tracking-tight">
            User Accounts & Permissions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage traveler profiles, control admin privileges, and oversee platform access.
          </p>
        </div>

        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
          className="rounded-xl font-semibold gap-2 border-border/80"
        >
          <RefreshCw className="size-4" />
          <span>Refresh Users</span>
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5">
            <UsersIcon className="size-3.5 text-blue-500" /> Total Accounts
          </p>
          <p className="text-3xl font-black text-foreground font-nunito">{totalCount}</p>
          <p className="text-[11px] text-muted-foreground">Registered platform users</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-purple-600 tracking-wider flex items-center gap-1.5">
            <Shield className="size-3.5" /> Administrators
          </p>
          <p className="text-3xl font-black text-purple-600 font-nunito">{adminCount}</p>
          <p className="text-[11px] text-muted-foreground">Admin & Super Admin</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-emerald-600 tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5" /> Active Travelers
          </p>
          <p className="text-3xl font-black text-emerald-600 font-nunito">{activeCount}</p>
          <p className="text-[11px] text-muted-foreground">Standard active standing</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-red-600 tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="size-3.5" /> Restricted / Blocked
          </p>
          <p className="text-3xl font-black text-red-600 font-nunito">{blockedCount}</p>
          <p className="text-[11px] text-muted-foreground">Access revoked</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/70 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, email, or phone..."
            className="pl-9 rounded-xl h-10 text-sm border-border/80"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Role Filter */}
          <div className="flex items-center gap-1 border-r border-border/60 pr-2 mr-1">
            {["ALL", "user", "admin"].map((role) => (
              <Button
                key={role}
                size="sm"
                variant={roleFilter === role ? "default" : "ghost"}
                onClick={() => setRoleFilter(role)}
                className={`rounded-xl text-xs font-bold h-8 px-2.5 capitalize ${
                  roleFilter === role
                    ? "bg-[#EF1A53] hover:bg-[#d81548] text-white"
                    : "text-muted-foreground"
                }`}
              >
                {role === "ALL" ? "All Roles" : role}
              </Button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1">
            {["ALL", "active", "blocked"].map((status) => (
              <Button
                key={status}
                size="sm"
                variant={statusFilter === status ? "default" : "outline"}
                onClick={() => setStatusFilter(status)}
                className={`rounded-xl text-xs font-bold h-8 px-2.5 capitalize ${
                  statusFilter === status
                    ? "bg-[#EF1A53] hover:bg-[#d81548] text-white"
                    : "border-border/70"
                }`}
              >
                {status === "ALL" ? "All Status" : status}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Users Table */}
      <div className="bg-card rounded-3xl border border-border/80 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border/60 text-xs font-bold uppercase text-muted-foreground tracking-wider">
              <tr>
                <th className="py-4 px-6">User Profile</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Account Status</th>
                <th className="py-4 px-6">Email Status</th>
                <th className="py-4 px-6">Joined Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="size-6 animate-spin text-[#EF1A53]" />
                      <span>Loading user accounts...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground">
                    <p className="text-base font-semibold">No users matched your criteria</p>
                    <p className="text-xs">Adjust your search or filter settings.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-muted/30 transition-colors">
                    {/* User Profile */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            u.picture ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                          }
                          alt={u.name}
                          className="size-10 rounded-full object-cover border border-border/80 shadow-xs"
                        />
                        <div className="max-w-[180px] truncate">
                          <p className="font-bold text-foreground truncate">{u.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-6 text-xs text-muted-foreground">
                      <p className="font-mono">{u.phone || "Not provided"}</p>
                      <p className="truncate max-w-[140px] text-[11px]">{u.address || "Dhaka, Bangladesh"}</p>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6">
                      <Badge
                        variant="secondary"
                        className={`capitalize font-bold text-xs gap-1 ${
                          u.role === "admin" || u.role === "superAdmin"
                            ? "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30"
                            : "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30"
                        }`}
                      >
                        <Shield className="size-3" />
                        {u.role || "user"}
                      </Badge>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {u.isActive === "active" ? (
                        <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-semibold gap-1">
                          <CheckCircle2 className="size-3" /> Active
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30 font-semibold gap-1">
                          <XCircle className="size-3" /> Blocked
                        </Badge>
                      )}
                    </td>

                    {/* Email Verification */}
                    <td className="py-4 px-6">
                      {u.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                          <ShieldCheck className="size-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                          <Clock className="size-3.5" /> Pending
                        </span>
                      )}
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 px-6 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(u.createdAt || Date.now()).toLocaleDateString("en-GB", {
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
                        <DropdownMenuContent align="end" className="w-48 rounded-xl">
                          <DropdownMenuLabel className="text-xs">User Role</DropdownMenuLabel>
                          {u.role !== "admin" ? (
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(u._id, "admin")}
                              className="text-purple-600 font-medium text-xs cursor-pointer"
                            >
                              <ShieldCheck className="size-3.5 mr-2" /> Make Administrator
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(u._id, "user")}
                              className="text-muted-foreground font-medium text-xs cursor-pointer"
                            >
                              <User className="size-3.5 mr-2" /> Demote to User
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />
                          <DropdownMenuLabel className="text-xs">Access Standing</DropdownMenuLabel>
                          {u.isActive !== "blocked" ? (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(u._id, "blocked")}
                              className="text-amber-600 font-medium text-xs cursor-pointer"
                            >
                              <UserX className="size-3.5 mr-2" /> Block Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(u._id, "active")}
                              className="text-emerald-600 font-medium text-xs cursor-pointer"
                            >
                              <UserCheck className="size-3.5 mr-2" /> Activate Account
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setUserToDelete(u)}
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

      {/* Delete User Confirmation */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-nunito font-bold">
              Delete user {userToDelete?.name}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              This action cannot be undone. It will permanently remove {userToDelete?.email} and their
              associated bookings and wishlist data from the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl text-xs font-semibold">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
