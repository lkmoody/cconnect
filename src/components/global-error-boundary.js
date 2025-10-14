import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

class ErrorBoundaryCore extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Caught by GlobalErrorBoundary:", error, info);
        if (this.props.onError) {
            this.props.onError(error, info);
        }
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || null;
        }

        return this.props.children;
    }
}

// Functional wrapper (so we can use hooks)
export default function GlobalErrorBoundary({ children }) {
    const navigate = useNavigate();

    const handleError = () => {
        navigate("/error");
    };

    return (
        <ErrorBoundaryCore fallback={null} onError={handleError}>
            {children}
        </ErrorBoundaryCore>
    );
}