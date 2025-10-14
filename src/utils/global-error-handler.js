import {getGlobalNavigate} from "../router/naviagtion.js";

export function setupGlobalErrorHandlers() {
    window.addEventListener("error", (event) => {
        console.error("Global error:", event.error);
        const navigate = getGlobalNavigate();
        if (navigate) navigate("/error");
    });

    window.addEventListener("unhandledrejection", (event) => {
        console.error("Unhandled promise rejection:", event.reason);
        const navigate = getGlobalNavigate();
        if (navigate) navigate("/error");
    });
}