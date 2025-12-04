import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Trophy, Clock, Play, RefreshCw, Zap, Save, Globe } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

const LEVELS = {
    1: {
        duration: 10,
        commands: ["ls", "pwd", "cd ..", "git status", "npm start", "code .", "clear", "whoami", "date", "top"]
    },
    2: {
        duration: 7,
        commands: ["git commit -m", "npm install", "docker ps", "git checkout", "python3 app.py", "mkdir project", "touch index.js", "rm -rf dist", "chmod +x script.sh"]
    },
    3: {
        duration: 5,
        commands: ["git commit -m 'feat: init'", "npm install react-router-dom", "docker run -d -p 80:80 nginx", "git push origin main", "scp user@host:/path", "tar -czvf archive.tar.gz .", "sudo systemctl restart nginx"]
    }
};

interface GameModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface HighScore {
    id: string;
    name: string;
    score: number;
    date: any;
}

export const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [timeLeft, setTimeLeft] = useState(10);
    const [currentCommand, setCurrentCommand] = useState("");
    const [userInput, setUserInput] = useState("");
    const [highScore, setHighScore] = useState(0);
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
    const [commandsSolved, setCommandsSolved] = useState(0);

    // Firebase States
    const [playerName, setPlayerName] = useState("");
    const [leaderboard, setLeaderboard] = useState<HighScore[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedHighScore = localStorage.getItem('cli_challenge_highscore');
        if (storedHighScore) {
            setHighScore(parseInt(storedHighScore));
        }
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(10));
            const querySnapshot = await getDocs(q);
            const scores: HighScore[] = [];
            querySnapshot.forEach((doc) => {
                scores.push({ id: doc.id, ...doc.data() } as HighScore);
            });
            setLeaderboard(scores);
        } catch (error) {
            console.error("Error fetching leaderboard: ", error);
        }
    };

    const saveScore = async () => {
        if (!playerName.trim()) return;
        setIsSaving(true);
        try {
            await addDoc(collection(db, "scores"), {
                name: playerName,
                score: score,
                date: new Date()
            });
            await fetchLeaderboard();
            setShowLeaderboard(true);
        } catch (error) {
            console.error("Error adding document: ", error);
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('cli_challenge_highscore', score.toString());
        }
    }, [score, highScore]);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isPlaying) {
            endGame();
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    useEffect(() => {
        if (isOpen && inputRef.current && gameState === 'playing') {
            inputRef.current.focus();
        }
    }, [isOpen, gameState, currentCommand]);

    const startGame = () => {
        setScore(0);
        setLevel(1);
        setCommandsSolved(0);
        setIsPlaying(true);
        setGameState('playing');
        setUserInput("");
        setShowLeaderboard(false);
        startLevel(1);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const startLevel = (lvl: number) => {
        const levelConfig = LEVELS[lvl as keyof typeof LEVELS];
        setTimeLeft(levelConfig.duration);
        generateCommand(lvl);
    };

    const endGame = () => {
        setIsPlaying(false);
        setGameState('finished');
    };

    const generateCommand = (lvl: number) => {
        const levelConfig = LEVELS[lvl as keyof typeof LEVELS];
        const randomCmd = levelConfig.commands[Math.floor(Math.random() * levelConfig.commands.length)];
        setCurrentCommand(randomCmd);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserInput(value);

        if (value === currentCommand) {
            handleCorrectInput();
        }
    };

    const handleCorrectInput = () => {
        const newScore = score + (level * 10);
        setScore(newScore);

        const newSolved = commandsSolved + 1;
        setCommandsSolved(newSolved);

        // Level Up Logic
        let nextLevel = level;
        if (newSolved % 5 === 0 && level < 3) {
            nextLevel = level + 1;
            setLevel(nextLevel);
        }

        setUserInput("");

        // Reset timer for the next command based on current (or new) level
        const levelConfig = LEVELS[nextLevel as keyof typeof LEVELS];
        setTimeLeft(levelConfig.duration);

        generateCommand(nextLevel);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="game-overlay"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="game-modal"
                    >
                        <button className="game-close-btn" onClick={onClose}>
                            <X size={24} />
                        </button>

                        <div className="game-header">
                            <div className="game-title">
                                <Terminal className="text-accent" size={28} />
                                <h2>Mini CLI Challenge</h2>
                            </div>
                            <div className="game-stats">
                                <button
                                    className="stat-item"
                                    onClick={() => setShowLeaderboard(!showLeaderboard)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <Globe size={18} className="text-accent" />
                                    <span>Leaderboard</span>
                                </button>
                                <div className="stat-item">
                                    <Trophy size={18} className="text-yellow" />
                                    <span>High: {highScore}</span>
                                </div>
                            </div>
                        </div>

                        <div className="game-content">
                            {showLeaderboard ? (
                                <div className="leaderboard-view" style={{ textAlign: 'center' }}>
                                    <h3 style={{ marginBottom: '1.5rem', color: 'white' }}>Top Hackers</h3>
                                    <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {leaderboard.map((entry, index) => (
                                            <div key={entry.id} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '0.5rem 1rem',
                                                background: 'rgba(255,255,255,0.05)',
                                                borderRadius: '0.5rem',
                                                color: index === 0 ? '#fbbf24' : 'var(--text-secondary)'
                                            }}>
                                                <span>#{index + 1} {entry.name}</span>
                                                <span>{entry.score}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="btn btn-secondary" onClick={() => setShowLeaderboard(false)} style={{ marginTop: '1.5rem' }}>
                                        Geri Dön
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {gameState === 'idle' && (
                                        <div className="game-intro">
                                            <p>Hacker modunu açmaya hazır mısın?</p>
                                            <p className="game-instruction">
                                                Komutları süre bitmeden yaz!<br />
                                                Her 5 doğru komutta seviye artar ve süre kısalır.
                                            </p>
                                            <button className="btn btn-primary game-start-btn" onClick={startGame}>
                                                <Play size={20} />
                                                Oyunu Başlat
                                            </button>
                                        </div>
                                    )}

                                    {gameState === 'playing' && (
                                        <div className="game-play-area">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div className="game-timer">
                                                    <Clock size={20} />
                                                    <span style={{ color: timeLeft < 4 ? 'var(--error-color, #ef4444)' : 'inherit' }}>
                                                        {timeLeft}s
                                                    </span>
                                                </div>
                                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                    <div className="stat-item">
                                                        <Zap size={18} className="text-accent" />
                                                        <span>Level {level}</span>
                                                    </div>
                                                    <div className="game-score-display">
                                                        Score: {score}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="command-display">
                                                <span className="command-prompt">$</span>
                                                <span className="command-text">{currentCommand}</span>
                                            </div>

                                            <div className="input-container">
                                                <span className="input-prompt">{'>'}</span>
                                                <input
                                                    ref={inputRef}
                                                    type="text"
                                                    value={userInput}
                                                    onChange={handleInputChange}
                                                    className="game-input"
                                                    placeholder="Komutu yaz..."
                                                    autoFocus
                                                    spellCheck={false}
                                                />
                                            </div>

                                            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                                <motion.div
                                                    initial={{ width: '100%' }}
                                                    animate={{ width: `${(timeLeft / LEVELS[level as keyof typeof LEVELS].duration) * 100}%` }}
                                                    transition={{ duration: 1, ease: "linear" }}
                                                    style={{ height: '100%', background: 'var(--accent-color)' }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {gameState === 'finished' && (
                                        <div className="game-result">
                                            <h3>Süre Doldu!</h3>
                                            <div className="final-score">
                                                <span>Skorun:</span>
                                                <span className="score-value">{score}</span>
                                            </div>

                                            <div style={{ margin: '1.5rem 0', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Adını yaz..."
                                                    value={playerName}
                                                    onChange={(e) => setPlayerName(e.target.value)}
                                                    style={{
                                                        background: 'rgba(255,255,255,0.1)',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '0.5rem',
                                                        color: 'white',
                                                        outline: 'none'
                                                    }}
                                                />
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={saveScore}
                                                    disabled={isSaving || !playerName}
                                                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                                >
                                                    <Save size={16} />
                                                    {isSaving ? '...' : 'Kaydet'}
                                                </button>
                                            </div>

                                            <div style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                                                Level {level} • {commandsSolved} Komut
                                            </div>
                                            <button className="btn btn-secondary game-restart-btn" onClick={startGame}>
                                                <RefreshCw size={20} />
                                                Tekrar Dene
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
