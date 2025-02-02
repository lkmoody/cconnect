import {Route, Routes} from "react-router-dom";
import {HomePage} from "./home-page.jsx";
import {LoginPage} from "./login-page.jsx";
import {Secret} from "./secret.jsx";
import {ProtectedRoutes} from '../routes/protected-routes.jsx'
import {Secret2} from "./secret2.jsx";
import {Contexts} from "../contexts/contexts.jsx";
import {ThemeProvider} from "@mui/material";
import {theme} from '../themes/main.js'
import {PublicRoutes} from "../routes/public-routes.jsx";

function App() {
    return (
        <Contexts>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route element={<PublicRoutes/>}>
                        <Route path={'/'} element={<HomePage/>}/>
                        <Route path={'/login'} element={<LoginPage/>}/>
                    </Route>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path={'/secret'} element={<Secret/>}/>
                        <Route path={'/secret2'} element={<Secret2/>}/>
                    </Route>
                </Routes>
            </ThemeProvider>
        </Contexts>
    )
}

export default App
