import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { isAuthenticated, isEmployer, isCandidate, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-gray-900">
                JobLink
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
                <Link to="/jobs" className="hover:text-gray-900 transition">Find Jobs</Link>
                {isEmployer() && (
                    <>
                        <Link to="/my-jobs" className="hover:text-gray-900 transition">My Jobs</Link>
                        <Link to="/post-job" className="hover:text-gray-900 transition">Post a Job</Link>
                        <Link to="/company" className="hover:text-gray-900 transition">Company</Link>
                    </>
                )}
                {isCandidate() && (
                    <>
                        <Link to="/my-applications" className="hover:text-gray-900 transition">My Applications</Link>
                        <Link to="/profile" className="hover:text-gray-900 transition">Profile</Link>
                    </>
                )}
                <Link to="/" className="hover:text-gray-900 transition">About Us</Link>
                <Link to="/" className="hover:text-gray-900 transition">Contact</Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
                {!isAuthenticated() ? (
                    <Link
                        to="/login"
                        className="px-4 py-2 text-sm border border-gray-800 rounded-full text-gray-800 hover:bg-gray-800 hover:text-white transition"
                    >
                        Login / Register
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">{user?.name || user?.email}</span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm border border-gray-800 rounded-full text-gray-800 hover:bg-gray-800 hover:text-white transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}