import {CircularProgress, CssBaseline} from "@mui/material";
import {Suspense} from "react";
import ContextProvider, {DashboardContextProvider} from "./contexts/index.jsx";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {HomePage} from "./components/home-page.jsx";
import {LoginPage} from "./components/login-page.jsx";
import {LogoutPage} from "./components/dashboard/logout-page.jsx";
import {ProtectedRoutes} from "./routes/protected-routes.jsx";
import {useTranslation} from "react-i18next";
import {Dashboard} from "./components/dashboard/dashboard.jsx";
import {InternalHome} from "./components/internal/internal-home.js";

function handleRedirectCallback(appState) {
    //Redirect stuff here
}

const CcRoutes = () => {
    return (
        <Routes>
            <Route element={<DashboardRoot/>}>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/logout'} element={<LogoutPage/>}/>
                <Route element={<Dashboard />}>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path={'/internal'} element={<InternalHome />}/>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

const DashboardRoot = () => {
    return (
        <DashboardContextProvider onRedirectCallback={handleRedirectCallback}>
            <Outlet/>
        </DashboardContextProvider>
    )
}

const CcRoot = () => {
    const {t} = useTranslation()
    return (
        <Suspense fallback={<CircularProgress/>}>
            <BrowserRouter>
                <ContextProvider>
                    <CssBaseline/>
                    <CcRoutes/>
                </ContextProvider>
            </BrowserRouter>
        </Suspense>
    )
}

export default CcRoot