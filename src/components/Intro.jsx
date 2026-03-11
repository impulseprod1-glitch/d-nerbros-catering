import React, { useState, useEffect } from 'react';
import './Intro.css';

const Intro = ({ onComplete }) => {
    const [phase, setPhase] = useState('glow'); // glow → logo → exit

    useEffect(() => {
        console.log("Intro mounted - Phase: glow");
        // Phase 1: Slow glow (0 → 1.0s)
        const logoTimer = setTimeout(() => {
            console.log("Intro Phase: logo");
            setPhase('logo');
        }, 1000);

        // Phase 2: Exit (2.8s → 3.6s)
        const exitTimer = setTimeout(() => {
            console.log("Intro Phase: exit");
            setPhase('exit');
        }, 2800);

        // Final Complete
        const completeTimer = setTimeout(() => {
            console.log("Intro Complete - Unmounting");
            onComplete();
        }, 3600);

        // Safety fallback: Force complete after 5 seconds no matter what
        const safetyTimer = setTimeout(() => {
            console.log("Intro Safety Fallback Triggered");
            onComplete();
        }, 5000);

        return () => {
            clearTimeout(logoTimer);
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
            clearTimeout(safetyTimer);
        };
    }, [onComplete]);

    // Handle skip on click
    const handleSkip = () => {
        console.log("Intro skipped by user click");
        onComplete();
    };

    // Generate premium floating fire embers
    const fireEmbers = Array.from({ length: 45 }, (_, i) => {
        const x = Math.random() * 100;
        const y = 80 + Math.random() * 40; // Start mostly from bottom
        const delay = Math.random() * 3;
        const duration = 3 + Math.random() * 4;
        const size = 1 + Math.random() * 4;
        const drift = (Math.random() - 0.5) * 100; // Horizontal drift

        return (
            <div
                key={i}
                className="fire-ember"
                style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    '--drift': `${drift}px`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                }}
            />
        );
    });

    return (
        <div className={`intro-overlay ${phase}`} onClick={handleSkip}>
            <div className="fire-container">
                {fireEmbers}
            </div>

            {/* A cinematic central glow instead of burst */}
            <div className="cinematic-glow"></div>

            <div className="intro-logo">
                <span className="intro-logo-accent">Döner</span>Bros
                <div className="intro-tagline">Premium Catering Berlin</div>
            </div>
        </div>
    );
};

export default Intro;
