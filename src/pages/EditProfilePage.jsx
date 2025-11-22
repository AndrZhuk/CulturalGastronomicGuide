import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthYear: z
    .number()
    .min(1900, "Year must be at least 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  gender: z.enum(["Male", "Female"], "Select a valid gender"),
});

export function EditProfilePage() {
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      birthYear: user?.birthYear || "",
      gender: user?.gender || "",
    },
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data) => {
    try {
      await updateUser(data);
      navigate("/profile");
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const inputClasses = "mt-1 block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors";
  const labelClasses = "block text-sm font-medium text-secondary-700 mb-1";
  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <div className="min-h-screen bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/profile" className="inline-flex items-center text-secondary-500 hover:text-secondary-900 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-secondary-900">Edit Profile</h1>
            <p className="text-secondary-500 mt-1">Update your personal information</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className={labelClasses}>Name</label>
              <input
                {...register("name")}
                className={`${inputClasses} ${errors.name ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""}`}
              />
              {errors.name && (
                <p className={errorClasses}>{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className={labelClasses}>Birth Year</label>
              <input
                type="number"
                {...register("birthYear", { valueAsNumber: true })}
                className={`${inputClasses} ${errors.birthYear ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""}`}
              />
              {errors.birthYear && (
                <p className={errorClasses}>{errors.birthYear.message}</p>
              )}
            </div>

            <div>
              <label className={labelClasses}>Gender</label>
              <div className="relative">
                <select
                  {...register("gender")}
                  className={`${inputClasses} appearance-none`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-secondary-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.gender && (
                <p className={errorClasses}>{errors.gender.message}</p>
              )}
            </div>

            <div className="pt-4 border-t border-secondary-100 flex items-center justify-end space-x-3">
              <Link 
                to="/profile" 
                className="px-4 py-2 bg-white text-secondary-700 font-medium rounded-lg border border-secondary-300 hover:bg-secondary-50 transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
