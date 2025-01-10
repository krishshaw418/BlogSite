import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Initial state should be loading
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch('http://localhost:5000/verify', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, []);
    
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            // Perform redirection after loading and authentication check
            navigate('/signIn', { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) return <div>Loading...</div>;

    return children;
};

export default PrivateRoute;