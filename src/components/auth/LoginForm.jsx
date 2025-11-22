import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      alert("User not found. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-secondary-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-secondary-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-secondary-600">
            Please sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                Email address
              </label>
              <input
                {...register("email")}
                type="email"
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-secondary-300 focus:ring-primary-500 focus:border-primary-500"
                } placeholder-secondary-400 text-secondary-900 rounded-lg focus:outline-none focus:ring-2 transition-colors sm:text-sm`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-secondary-300 focus:ring-primary-500 focus:border-primary-500"
                } placeholder-secondary-400 text-secondary-900 rounded-lg focus:outline-none focus:ring-2 transition-colors sm:text-sm`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
          
          <div className="text-center text-sm text-secondary-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
