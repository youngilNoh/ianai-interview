import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ItemPage from "./pages/item/ItemPage";
import MainLayout from "./pages/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "item",
                element: <ItemPage />,
            },
        ],
    },
    {
        path: "/*",
        element: <div>404 Not Found</div>,
    },
]);

export default router;
