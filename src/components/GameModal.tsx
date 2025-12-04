                                                </button >
                                            </div >

                                            <div style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                                                Level {level} • {commandsSolved} Komut
                                            </div>
                                            <button className="btn btn-secondary game-restart-btn" onClick={startGame}>
                                                <RefreshCw size={20} />
                                                Tekrar Dene
                                            </button>
                                        </div >
                                    )}
                                </>
                            )}
                        </div >
                    </motion.div >
                </motion.div >
            )}
        </AnimatePresence >
    );
};
