import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md w-full">
        <div className="text-7xl mb-4">🚫</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
          >
            <FaArrowLeft /> Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
          >
            <FaHome /> Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
