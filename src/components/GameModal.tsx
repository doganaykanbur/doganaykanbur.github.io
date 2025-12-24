import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Trophy, Clock, Play, RefreshCw, Zap, Save, Globe, Skull } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

// Anti-Cheat Salt (Client-side obfuscation)
const SALT = "ANTIGRAVITY_PROTOCOL_V2_SECURE_HASH";

const generateSignature = (score: number, timestamp: number) => {
    // Include timestamp in hash to prevent replay attacks
    return btoa(`${score}-${timestamp}-${SALT}-${score * 123}`).split('').reverse().join('');
};

const verifySignature = (score: number, timestamp: number, signature: string) => {
    if (!signature || !timestamp) return false;
    const expected = generateSignature(score, timestamp);
    return signature === expected;
};

const LEVELS = {
    1: {
        duration: 15,
        commands: [
            "ls", "pwd", "cd ..", "git status", "npm start", "code .", "clear", "whoami", "date", "top",
            "cat file.txt", "mkdir test", "touch app.js", "rm file", "cp a b", "mv a b", "git add .",
            "npm test", "node app", "echo hello", "ps aux", "kill 9", "history", "man ls", "du -h",
            "ls -la", "mkdir -p src", "rm -rf junk", "touch .gitignore", "head file.txt", "tail log.txt",
            "less readme.md", "nano config", "vim index.js", "cd ~", "cp -r dir1 dir2", "mv *.txt dest/",
            "grep hello file", "find . -name '*'", "wc -l file", "sort names.txt", "uniq list", "diff a b",
            "cal", "uptime", "free -h", "df -h", "id", "groups", "uname -r", "hostname"
        ]
    },
    2: {
        duration: 12,
        commands: [
            "git commit -m", "npm install", "docker ps", "git checkout", "python3 app.py", "mkdir project",
            "touch index.js", "rm -rf dist", "chmod +x script.sh", "git push origin", "npm run build",
            "docker build .", "docker-compose up", "ssh user@host", "scp file host:", "grep -r 'text'",
            "find . -name '*.js'", "tar -czvf data.tar", "curl google.com", "wget file.zip", "ping 8.8.8.8",
            "git diff", "git log --oneline", "git remote -v", "git pull origin", "npm audit", "yarn install",
            "docker images", "docker stop container", "docker rm container", "docker logs app", "netstat -tulnp",
            "ssh-keygen -t rsa", "chmod 600 key.pem", "chown user:group file", "ln -s target link",
            "zip -r archive.zip .", "unzip file.zip", "gunzip file.gz", "ps -ef | grep node", "killall node",
            "curl -I google.com", "dig domain.com", "nslookup ip", "traceroute host", "ifconfig"
        ]
    },
    3: {
        duration: 10,
        commands: [
            "git commit -m 'feat: init'", "npm install react-router-dom", "docker run -d -p 80:80 nginx",
            "git push origin main", "scp user@host:/path", "tar -czvf archive.tar.gz .", "sudo systemctl restart nginx",
            "git merge --no-ff develop", "kubectl get pods -n prod", "aws s3 cp file s3://bucket",
            "npm run build && firebase deploy", "docker exec -it container bash", "git reset --hard HEAD~1",
            "git cherry-pick hash", "git rebase main", "git stash pop", "git branch -d feat/x", "git tag v1.0",
            "kubectl logs -f pod", "kubectl describe pod", "kubectl get services", "kubectl apply -f .",
            "systemctl status service", "journalctl -u service", "ufw allow 80/tcp", "ip addr show",
            "rsync -avz src/ dest/", "awk '{print $1}' log", "sed -i 's/a/b/g' file", "xargs rm",
            "lsof -i :3000", "nc -zv localhost 80", "openssl req -new", "crontab -l", "env | grep PATH"
        ]
    },
    4: { // Sysadmin / Advanced Linux
        duration: 8,
        commands: [
            "sudo visudo", "journalctl -xe", "netstat -tulpn", "chmod 777 script.sh", "chown user:group file",
            "vim /etc/hosts", "systemctl status sshd", "iptables -L", "crontab -e", "htop", "df -h",
            "awk '{print $1}' file", "sed -i 's/foo/bar/g' file", "lsof -i :8080", "dig google.com",
            "traceroute 8.8.8.8", "rsync -avz /src /dest", "mount /dev/sda1 /mnt", "uname -a"
        ]
    },
    5: { // Cloud / DevOps / Speed Typing
        duration: 6,
        commands: [
            "kubectl apply -f pod.yaml", "terraform init", "aws ec2 describe-instances", "gcloud compute instances list",
            "ansible-playbook site.yml", "helm install my-app ./chart", "docker stack deploy -c stack.yml",
            "az group create --name RG", "openssl genrsa -out key.pem", "git rebase -i HEAD~3",
            "npm install --save-dev typescript", "yarn add @types/react", "go run main.go", "rustc main.rs"
        ]
    }
};

interface GameModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCrash: () => void;
}

interface HighScore {
    id: string;
    name: string;
    score: number;
    signature?: string;
    timestamp?: number; // Added timestamp
    date: any;
}

export const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose, onCrash }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [timeLeft, setTimeLeft] = useState(15);
    const [currentCommand, setCurrentCommand] = useState("");
    const [userInput, setUserInput] = useState("");
    const [highScore, setHighScore] = useState(0);
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished' | 'cheated'>('idle');
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
            const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(20)); // Increased limit to filter cheaters
            const querySnapshot = await getDocs(q);
            const scores: HighScore[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data() as Omit<HighScore, 'id'>;
                // Client-side verification: Filter out scores with invalid signatures
                // Note: Legacy scores without signature/timestamp will be shown if low score
                if (data.signature && data.timestamp && verifySignature(data.score, data.timestamp, data.signature)) {
                    scores.push({ id: doc.id, ...data });
                } else if (!data.signature && data.score < 500) {
                    // Allow low legacy scores, suspect high ones without signature
                    scores.push({ id: doc.id, ...data });
                }
            });
            setLeaderboard(scores.slice(0, 10)); // Take top 10 valid scores
        } catch (error) {
            console.error("Error fetching leaderboard: ", error);
        }
    };

    const saveScore = async () => {
        if (!playerName.trim()) return;
        setIsSaving(true);
        try {
            const timestamp = Date.now();
            await addDoc(collection(db, "scores"), {
                name: playerName,
                score: score,
                timestamp: timestamp, // Send timestamp
                signature: generateSignature(score, timestamp), // Sign with timestamp
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
                setTimeLeft((prev) => prev - 0.1); // Smoother timer
            }, 100);
        } else if (timeLeft <= 0 && isPlaying) {
            setTimeLeft(0);
            endGame();
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    useEffect(() => {
        if (isOpen) {
            setGameState('idle');
            setScore(0);
            setUserInput("");
            setCommandsSolved(0);
            fetchLeaderboard(); // Refresh leaderboard on open
        }
    }, [isOpen]);

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
        // Safe level access, max cap at level 5
        const actualLvl = Math.min(lvl, 5) as keyof typeof LEVELS;
        const levelConfig = LEVELS[actualLvl];
        setTimeLeft(levelConfig.duration);
        generateCommand(actualLvl);
    };

    const endGame = () => {
        setIsPlaying(false);
        setGameState('finished');
    };

    const triggerCheat = () => {
        setIsPlaying(false);
        setGameState('cheated');
        onCrash(); // Trigger effect in parent
        // Don't close immediately so they see the error
        // onClose(); 
    };

    const generateCommand = (lvl: number) => {
        const actualLvl = Math.min(lvl, 5) as keyof typeof LEVELS;
        const levelConfig = LEVELS[actualLvl];
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

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        triggerCheat();
    };

    const handleCorrectInput = () => {
        const baseScore = 10;
        const speedBonus = Math.floor(timeLeft); // Bonus for speed
        const newScore = score + (level * baseScore) + speedBonus;
        setScore(newScore);

        const newSolved = commandsSolved + 1;
        setCommandsSolved(newSolved);

        // Level Up Logic - every 5 commands
        let nextLevel = level;
        if (newSolved % 5 === 0 && level < 5) { // Cap at level 5
            nextLevel = level + 1;
            setLevel(nextLevel);
        }

        setUserInput("");

        // Difficulty scaling: Reduce time slightly as you progress within a level
        // But reset to base duration when leveling up
        const actualNextLvl = Math.min(nextLevel, 5) as keyof typeof LEVELS;
        const levelConfig = LEVELS[actualNextLvl];

        let newDuration = levelConfig.duration;
        // Minor speed increase for every 2 commands solved within the same level
        if (nextLevel === level) {
            newDuration = Math.max(3, levelConfig.duration - (newSolved % 5) * 0.5);
        }

        setTimeLeft(newDuration);
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
                                <h2>Mini CLI Challenge v2.0</h2>
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
                            {gameState === 'cheated' ? (
                                <div className="cheat-view" style={{ textAlign: 'center', color: '#ef4444' }}>
                                    <motion.div
                                        animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                                    >
                                        <Skull size={80} />
                                    </motion.div>
                                    <h3 style={{ fontSize: '2rem', margin: '1rem 0' }}>SİSTEM ÇÖKTÜ!</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                        Kopyala-Yapıştır yapmak yasak! <br />
                                        İllegal işlem tespit edildi.
                                    </p>
                                    <button className="btn btn-secondary" onClick={onClose}>
                                        Kapat
                                    </button>
                                </div>
                            ) : showLeaderboard ? (
                                <div className="leaderboard-view" style={{ textAlign: 'center' }}>
                                    <h3 style={{ marginBottom: '1.5rem', color: 'white' }}>Top Hackers (Verified)</h3>
                                    <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {leaderboard.length === 0 ? (
                                            <p style={{ color: 'gray' }}>Henüz skor yok...</p>
                                        ) : (
                                            leaderboard.map((entry, index) => (
                                                <div key={entry.id} style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '0.5rem 1rem',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    borderRadius: '0.5rem',
                                                    color: index === 0 ? '#fbbf24' : 'var(--text-secondary)'
                                                }}>
                                                    <span>#{index + 1} {entry.name} {entry.signature ? '✓' : ''}</span>
                                                    <span>{entry.score}</span>
                                                </div>
                                            ))
                                        )}
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
                                                Seviye arttıkça hızlanır.
                                            </p>
                                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                                <div className="badge">New: Lv.4-5 Added</div>
                                                <div className="badge" style={{ borderColor: '#ef4444', color: '#ef4444' }}>Anti-Cheat: Active</div>
                                            </div>
                                            <button className="btn btn-primary game-start-btn" onClick={startGame} style={{ marginTop: '2rem' }}>
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
                                                        {Math.ceil(timeLeft)}s
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
                                                    onPaste={handlePaste}
                                                    className="game-input"
                                                    placeholder="Komutu yaz..."
                                                    autoFocus
                                                    spellCheck={false}
                                                />
                                            </div>

                                            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                                <motion.div
                                                    initial={{ width: '100%' }}
                                                    animate={{ width: `${(timeLeft / LEVELS[Math.min(level, 5) as keyof typeof LEVELS].duration) * 100}%` }}
                                                    transition={{ duration: 0.1, ease: "linear" }}
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
                                                    maxLength={15}
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
