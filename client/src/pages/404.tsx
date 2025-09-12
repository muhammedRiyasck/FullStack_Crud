
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-4xl mb-4">Page Not Found</p>
      <Link to="/" className="text-blue-500 underline">Go Home</Link>
    </div>
  );
};

export default NotFound;
