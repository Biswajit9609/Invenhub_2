import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx"
import Loader from "./components/Loader.jsx";
import Inventory from "./pages/Inventory.jsx"
import OtpVerification from "./pages/otpVerification"
import AIPredictionPage from './pages/AIPredictionPage.jsx'
import ManageStockPage from './pages/ManageStockPage.jsx'
import NewSalePage from './pages/NewSalePage.jsx'
import PurchaseHistoryPage from './pages/PurchaseHistoryPage.jsx'
import SalesHistoryPage from './pages/SalesHistoryPage.jsx'

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/sign-up", element: <Signup /> },
  { path: "/otpVerification", element: <OtpVerification />},
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/inventory", element: <Inventory />},
  { path: "/prediction", element: <AIPredictionPage />},
  { path: "/add-product", element: <ManageStockPage />},
  { path: "/new-sale", element: <NewSalePage />},
  { path: "/purchase-transaction", element: <PurchaseHistoryPage />},
  { path: "/sales-transaction", element: <SalesHistoryPage />},
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      {loading ? <Loader /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
