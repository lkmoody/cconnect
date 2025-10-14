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
import {ElectedHome} from "./components/elected/elected-home.js";
import {ProfilePage} from "./components/profile/profile-page.jsx";
import GlobalErrorBoundary from "./components/global-error-boundary.js";
import ErrorPage from "./components/common/error-page.jsx";
import {useRegisterNavigate} from "./router/naviagtion.js";

function handleRedirectCallback(appState) {
    //Redirect stuff here
}

const CcRoutes = () => {
    useRegisterNavigate();// makes navigate available globally

    return (
        <Routes>
            <Route element={<DashboardRoot/>}>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/logout'} element={<LogoutPage/>}/>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route element={<Dashboard/>}>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route element={<ProtectedRoutes roles={['internal']}/>}>
                        <Route path={'/internal'} element={<InternalHome/>}/>
                    </Route>
                    <Route element={<ProtectedRoutes roles={['elected']}/>}>
                        <Route path={'/elected'} element={<ElectedHome/>}/>
                    </Route>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path={'/profile'} element={<ProfilePage/>}/>
                    </Route>
                </Route>
            </Route>I
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
                <GlobalErrorBoundary>
                    <ContextProvider>
                        <CssBaseline/>
                        <CcRoutes/>
                    </ContextProvider>
                </GlobalErrorBoundary>
            </BrowserRouter>

        </Suspense>
    )
}

export default CcRoot