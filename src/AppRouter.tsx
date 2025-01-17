import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/sections/Home.tsx";
import Calculator from "./pages/sections/calculator/Calculator.tsx";
import AppProvider from "./context/AppContext.tsx";
import AuthLogin from "./auth/AuthLogin.tsx";
import AuthRegister from "./auth/AuthRegister.tsx";
import {NavBar} from "./navbar/Navbar.tsx";
import Reviews from "./pages/sections/reviews/Reviews.tsx";

export const AppRouter = () => {
    return(
        <Router>
            <AppProvider>
                <Routes>
                    <Route path={'/'} element={<AuthLogin />}></Route>
                    <Route path={'/register'} element={<AuthRegister />}></Route>
                    <Route element={<NavBar />}>
                        <Route path={'/home'} element={<Home />} />
                        <Route path={'/calculator'} element={<Calculator />} />
                        <Route path={'/reviews'} element={<Reviews />} />
                    </Route>
                    <Route path="*" element={<Navigate to='/' />} />
                </Routes>
            </AppProvider>
        </Router>
    )
}