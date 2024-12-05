"use client"
import React, { useState, useRef } from "react";

const Timer = () => {
    const [time, setTime] = useState(0); // Time in seconds
    const [isRunning, setIsRunning] = useState(false); // Timer state
    const timerRef = useRef(null); // Ref to hold the timer interval ID

    const handleCheckIn = () => {
        if (!isRunning) {
            setIsRunning(true);
            setTime(0); // Reset the timer to 0
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
    };

    const handleCheckOut = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(timerRef.current);
        }
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <div className="timer">
            <h1>Check-In/Check-Out Timer</h1>
            <div>
                <h2>{formatTime(time)}</h2>
            </div>
            <div>
                {!isRunning ? (
                    <button
                        onClick={handleCheckIn}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Check In
                    </button>
                ) : (
                    <button
                        onClick={handleCheckOut}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Check Out
                    </button>
                )}
            </div>
        </div>
    );
};

export default function App() {
    return (
        <div className="App">
            <Timer />
        </div>
    );
}
