import {createRoot} from 'react-dom/client'
import './index.css'
import CcRoot from "./cc-root.jsx";
import './i18n.js'
import {setupGlobalErrorHandlers} from "./utils/global-error-handler.js";

setupGlobalErrorHandlers(); // initialize before app loads

createRoot(document.getElementById('root')).render(<CcRoot />)
