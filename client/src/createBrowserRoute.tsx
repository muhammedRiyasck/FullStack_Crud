import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/user/Home";
import AuthForm from "./pages/user/LoginRegisterForm";
import App from "./App";

const route = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        errorElement: <div>404 Not Found</div>,
        children: [
            {
            path:'/', 
            element: <Home />,
            },
            {
                path:'/authForm',
                element:<AuthForm />
            },
        ]
    }

])

export default route;
