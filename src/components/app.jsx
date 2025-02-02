import {Route, Routes} from "react-router-dom";
import {HomePage} from "./home-page.jsx";
import {LoginPage} from "./login-page.jsx";
import {Secret} from "./Secret.jsx";
import {ProtectedRoutes} from '../routes/protected-routes.jsx'
import {Secret2} from "./Secret2.jsx";
import {Dashboard} from "./dashboard/Dashboard.jsx";
import {Contexts} from "../contexts/contexts.jsx";
import {ThemeProvider} from "@mui/material";
import { theme } from '../themes/main.js'

function App() {
    return (
        <Contexts>
            <ThemeProvider theme={theme}>
                <Dashboard>
                    <Routes>
                        <Route path={'/'} element={<HomePage/>}/>
                        <Route path={'/login'} element={<LoginPage/>}/>
                        <Route element={<ProtectedRoutes/>}>
                            <Route path={'/secret'} element={<Secret/>}/>
                            <Route path={'/secret2'} element={<Secret2/>}/>
                        </Route>
                    </Routes>
                </Dashboard>
            </ThemeProvider>
        </Contexts>
    )
}

export default App
