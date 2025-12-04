import React, { useState } from 'react';
import { Skull, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CrashOverlayProps {
    onRepair: () => void;
}

export const CrashOverlay: React.FC<CrashOverlayProps> = ({ onRepair }) => {
    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setSliderValue(value);
        if (value >= 98) {
            onRepair();
        }
    };

    const handleSliderEnd = () => {
        if (sliderValue < 98) {
            setSliderValue(0);
        }
    };

    return (
        <div className="crash-overlay">
            <div className="crash-content">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        filter: [
                            'drop-shadow(0 0 20px rgba(239, 68, 68, 0.5))',
                            'drop-shadow(0 0 50px rgba(239, 68, 68, 0.8))',
                            'drop-shadow(0 0 20px rgba(239, 68, 68, 0.5))'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="neon-skull-container"
                >
                    <Skull size={120} color="#ef4444" strokeWidth={1.5} />
                </motion.div>

                <h2 className="crash-title" data-text="GÜVENLİK DUVARI AŞILDI">GÜVENLİK DUVARI AŞILDI</h2>
                <p className="crash-subtitle">Sistem bütünlüğü bozuldu. Acil onarım gerekiyor.</p>

                <div className="slider-container">
                    <div className="slider-track">
                        <span className="slider-text" style={{ opacity: Math.max(0.3, 1 - sliderValue / 50) }}>
                            Sistemi Onarmak İçin Kaydır
                        </span>
                    </div>
                    <div
                        className="slider-thumb-visual"
                        style={{
                            left: `calc(${sliderValue}% - ${sliderValue * 0.5}px)`
                        }}
                    >
                        <ChevronRight size={24} color="#fff" />
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={handleSliderChange}
                        onTouchEnd={handleSliderEnd}
                        onMouseUp={handleSliderEnd}
                        className="slider-input"
                    />
                </div>
            </div>
        </div>
    );
};
