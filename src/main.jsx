import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './components/app.jsx'
import {BrowserRouter} from "react-router-dom";
import CcRoot from "./cc-root.jsx";
import './i18n.js'

// createRoot(document.getElementById('root')).render(
//     <StrictMode>
//         <BrowserRouter>
//             <App/>
//         </BrowserRouter>
//     </StrictMode>
// )

createRoot(document.getElementById('root')).render(<CcRoot />)
