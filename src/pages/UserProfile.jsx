import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export function UserProfile() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <p className="text-secondary-500 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800"></div>
          
          <div className="px-8 pb-8">
            <div className="relative flex items-end -mt-16 mb-6">
              <img
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAuNYMYNaRi00Ov27G9c0fNpMJP5NQJ06A6eYNGDPMpfvDvfOPuuA13FcP9ftMIIunqdM&usqp=CAU"}
                alt={`${user.name}'s profile`}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-white"
              />
              <div className="ml-6 mb-2">
                <h1 className="text-3xl font-bold text-secondary-900">{user.name}</h1>
                <p className="text-secondary-500">{user.email}</p>
              </div>
              <div className="ml-auto mb-2 hidden sm:block">
                <button 
                  onClick={handleEditProfile} 
                  className="px-4 py-2 bg-secondary-100 text-secondary-700 font-medium rounded-lg hover:bg-secondary-200 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="p-4 bg-secondary-50 rounded-xl border border-secondary-100">
                <h2 className="text-sm font-medium text-secondary-500 mb-1">Birth Year</h2>
                <p className="text-lg font-semibold text-secondary-900">{user.birthYear}</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-xl border border-secondary-100">
                <h2 className="text-sm font-medium text-secondary-500 mb-1">Gender</h2>
                <p className="text-lg font-semibold text-secondary-900 capitalize">{user.gender}</p>
              </div>
            </div>

            <div className="mt-8 sm:hidden">
              <button 
                onClick={handleEditProfile} 
                className="w-full px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
