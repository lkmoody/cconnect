import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

let globalNavigate;

export function useRegisterNavigate() {
    const navigate = useNavigate();
    useEffect(() => {
        globalNavigate = navigate;
    }, [navigate]);
}

export function getGlobalNavigate() {
    return globalNavigate;
}