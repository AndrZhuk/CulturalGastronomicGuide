import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-secondary-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary-50 p-2 rounded-full group-hover:bg-primary-100 transition-colors duration-300">
              <UtensilsCrossed className="h-6 w-6 text-primary-600" />
            </div>
            <span className="text-xl font-bold text-secondary-900 tracking-tight">
              World
              <span className="text-primary-600 group-hover:text-primary-700 transition-colors duration-300">
                Cuisine
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/regions" 
              className="text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors"
            >
              Regions
            </Link>
            <Link 
              to="/establishments" 
              className="text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors"
            >
              Establishments
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/saved" 
                  className="text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  Saved Places
                </Link>
                <div className="flex items-center space-x-4 pl-4 border-l border-secondary-200">
                  <Link 
                    to="/profile" 
                    className="text-sm font-medium text-secondary-900 hover:text-primary-600 transition-colors"
                  >
                    {user?.name}
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="text-sm font-medium text-secondary-500 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 pl-4 border-l border-secondary-200">
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-md hover:bg-secondary-50"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-sm font-medium bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-secondary-600 hover:text-primary-600 hover:bg-secondary-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-2 bg-white border-t border-secondary-100 absolute w-full left-0 shadow-lg">
            <div className="flex flex-col space-y-2">
              <Link
                to="/regions"
                className="block px-4 py-2 rounded-md text-base font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Regions
              </Link>
              <Link
                to="/establishments"
                className="block px-4 py-2 rounded-md text-base font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Establishments
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/saved" 
                    className="block px-4 py-2 rounded-md text-base font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Saved Places
                  </Link>
                  <div className="border-t border-secondary-100 my-2 pt-2">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 rounded-md text-base font-medium text-secondary-900 hover:bg-primary-50 transition-colors"
                    >
                      {user?.name}
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="block w-full text-left px-4 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-secondary-100 my-2 pt-4 px-4 flex flex-col gap-3">
                  <Link 
                    to="/login" 
                    className="block w-full text-center px-4 py-2 rounded-lg border border-secondary-300 text-secondary-700 font-medium hover:bg-secondary-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block w-full text-center px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 shadow-sm transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
