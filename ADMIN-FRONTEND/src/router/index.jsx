import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AddProduct from "../pages/AddProduct";
import AppLayout from "../components/AppLayout";
import AllProducts from "../pages/AllProducts";
import PublicRoute from "./publicRoutes";
import ProtectedRoute from "./protectedRoutes";
import AppNotFound from "../components/NotFound";
import AllOrders from "../pages/AllOrders";
import AllFeedbacks from "../components/AllFeedbacks";
import Dashboard from "../components/Dashboard"

function AppRouter(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<PublicRoute element={<Login />} />} />
            <Route path="/signup" element={<PublicRoute element={<Signup />} />}/>
            <Route path="/dashboard" element={<ProtectedRoute element={<AppLayout><Dashboard/></AppLayout>}/>}/>
            <Route path="/addproduct" element={<ProtectedRoute element={<AppLayout><AddProduct/></AppLayout>} />}/>
            <Route path="/allproducts" element={<ProtectedRoute element={<AppLayout><AllProducts/></AppLayout>} />}/>
            <Route path="/allorders" element={<ProtectedRoute element={<AppLayout><AllOrders/></AppLayout>}/>}/>
            <Route path="/feedback" element={<ProtectedRoute element={<AppLayout><AllFeedbacks/></AppLayout>}/>}/>
            <Route path="*" element={<AppNotFound/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;


