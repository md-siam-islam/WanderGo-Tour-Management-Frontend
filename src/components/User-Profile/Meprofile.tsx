import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have shadcn/ui
import { Link } from "react-router";
import { Backpack, MoveLeftIcon } from "lucide-react";

const Meprofile = () => {
  const { data: UserData, isLoading, isError } = useUserInfoQuery(undefined);

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="h-32 w-32 rounded-full mx-auto md:mx-0" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !UserData) {
    return (
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <FaTimesCircle className="text-red-500 text-4xl mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Profile</h2>
          <p className="text-red-600">Unable to load user profile. Please try again later.</p>
        </div>
      </div>
    );
  }

  const user = UserData.data || UserData;

  const formatDate = (dateString?: Date) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50";
      case "inactive":
        return "text-yellow-600 bg-yellow-50";
      case "suspended":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/">
        <h3 className="text-xl md:text-3xl font-bold text-gray-800"><MoveLeftIcon className="inline mr-2" />Home</h3>
        </Link>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#E80341] text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FaEdit />
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Profile Header with Gradient */}
        <div className="bg-[url(https://i.ibb.co.com/JFc44XcJ/c58fe54f-1fa4-4dde-a0d9-2700ba8d7ac3-profile-banner-480.png)] md:h-50 relative bg-bg-center bg-cover bg-repeat-0">
          <div className="absolute -bottom-16 left-6 md:left-8">
            <div className="relative">
              {user.picture ? (
                <img
                  src="https://i.ibb.co.com/vCCn6jRj/mr-bean-900-x-900-picture-d5u9ys0cjecowzri.jpg"
                  alt={user.name}
                  className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
               <img
                  src="https://i.ibb.co.com/vCCn6jRj/mr-bean-900-x-900-picture-d5u9ys0cjecowzri.jpg"
                  alt={user.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
                />
                // <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center shadow-lg">
                //   <FaUser className="text-blue-600 text-5xl" />
                // </div>
              )}
              {user.isVerified && (
                <div className="absolute bottom-2 right-2 bg-[#E80341] text-white p-1 rounded-full">
                  <MdVerified className="text-xl" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-20 md:pt-24 pb-6 px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{user.name}</h2>
                {user.role && (
                  <span className="px-3 py-1 bg-blue-100 text-[#E80341] rounded-full text-sm font-medium">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                )}
              </div>
              
              {user.status && (
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                  {user.isActive ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaTimesCircle className="text-red-500" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Contact Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <FaEnvelope className="text-[#E80341]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <FaPhone className="text-[#E80341]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone || "Not provided"}</p>
                  </div>
                </div>

                {user.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mt-1">
                      <FaMapMarkerAlt className="text-[#E80341]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Account Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email Verified</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${user.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {user.isVerified ? "Verified" : "Pending"}
                  </span>
                </div>

                {user.createdAt && (
                  <div className="flex items-center gap-3 pt-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                )}

                {user.auth && user.auth.length > 0 && (
                  <div className="pt-2">
                    <p className="text-sm text-gray-500 mb-1">Connected Accounts</p>
                    <div className="flex gap-2">
                      {user.auth.map((provider : any, index : number) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {provider}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {user.booking && (
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">{user.booking.length}</p>
                <p className="text-gray-600">Total Bookings</p>
              </div>
            )}
            
            {user.guides && (
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-700">{user.guides.length}</p>
                <p className="text-gray-600">Guides Created</p>
              </div>
            )}
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-700">
                {user.createdAt ? 
                  `${Math.floor((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 365))} years` 
                  : "N/A"}
              </p>
              <p className="text-gray-600">Member Duration</p>
            </div>
          </div>

          {/* Quick Actions */}
          {/* <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Update Password
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                View Bookings
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Manage Guides
              </button>
              {!user.isVerified && (
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Verify Email
                </button>
              )}
            </div>
          </div> */}

        </div>
      </div>

      {/* Last Updated Info */}
      {user.updatedAt && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>Last updated: {formatDate(user.updatedAt)}</p>
        </div>
      )}
    </div>
  );
};

export default Meprofile;