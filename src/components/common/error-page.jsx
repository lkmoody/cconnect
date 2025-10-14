import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-500 mb-6">Please try again later.</p>
            <Link to="/" className="text-blue-500 underline">
                Go Home
            </Link>
        </div>
    );
}