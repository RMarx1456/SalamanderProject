"use client";
import React, { createContext, useState } from "react";

// 1. Create the context
export const SettingsContext = createContext();

// 2. Create the provider component
export const SettingsProvider = ({ children }) => {
    // create state to hold filename, color, and threshold
    const [filename, setFilename] = useState("");
    const [color, setColor] = useState("#000000"); // default color black
    const [threshold, setThreshold] = useState(50); // default threshold 0
    const [thumbnail, setThumbnail] = useState(""); 

    return (
        <SettingsContext.Provider value={{
            filename, setFilename,
            color, setColor,
            threshold, setThreshold,
            thumbnail, setThumbnail
        }}>
        {children}
        </SettingsContext.Provider>
    );
};