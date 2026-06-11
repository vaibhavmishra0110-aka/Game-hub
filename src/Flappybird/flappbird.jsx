import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import flappyWallpaper from '../assets/flappy bird wallpaper.png';
import birdImg from '../assets/du0i1k2io4j6iveqeul81b2nme.png';
import pipeTop from '../assets/toppng.com-flappy-bird-pipe-transparent-281x1080.png';
import pipeBottom from '../assets/opppng.com-flappy-bird-pipe-transparent-281x1080.png';

function Flappbird() {
    const [point, setPoint] = useState(0);
    const [pipes, setPipes] = useState([]);
    const [gameState, setGameState] = useState('MENU');
    
    const bird = useRef(null);

    function incPoint() {
        setPoint(prev => prev + 1 / 2);
    }

    function startGame() {
        setPoint(0);
        setPipes([]);
        setGameState('PLAYING');
    }

    useEffect(() => {
        if (gameState !== 'PLAYING') return;

        let velocityX = -2;
        let animationFrameId;
        
        let bvelocityY = 0; 
        let bcurrentY = 0;  
        let gravity = 0.2;
        let endY = 450;   
        let topY = -180;  
        let lastSpawnTime = 0;
        let spawnInterval = 1500;
        
        function handleKeyDown(e) {
            if (e && typeof e.preventDefault === 'function') {
                e.preventDefault();
            }
            bvelocityY = -4;
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleKeyDown, { passive: false });

        function update(timestamp) {
            if (!lastSpawnTime) lastSpawnTime = timestamp;

            if (timestamp - lastSpawnTime > spawnInterval) {
                const randomTopY = Math.floor(Math.random() * -140) - 40; 
                
                setPipes(prevPipes => [
                    ...prevPipes,
                    {
                        id: Date.now(),
                        x: 450,
                        topY: randomTopY,
                        passed: false
                    }
                ]);
                lastSpawnTime = timestamp;
            }

            setPipes(prevPipes => {
                return prevPipes
                    .map(pipe => {
                        const nextX = pipe.x + velocityX;
                        
                        if (!pipe.passed && pipe.x >= 40 && nextX < 40) {
                            incPoint();
                            return { ...pipe, x: nextX, passed: true };
                        }
                        return { ...pipe, x: nextX };
                    })
                    .filter(pipe => pipe.x > -100);
            });
            
            bvelocityY += gravity;
            bcurrentY += bvelocityY;
            
            if (bird.current) {
                bird.current.style.transform = `translateY(${bcurrentY}px)`;
            }

            if (bcurrentY > endY || bcurrentY < topY) {
                cancelAnimationFrame(animationFrameId); 
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('touchstart', handleKeyDown);
                setGameState('MENU');
                alert("Game Over - Hit Boundaries!");
                return; 
            }

            if (bird.current) {
                const birdRect = bird.current.getBoundingClientRect();
                const activePipes = document.querySelectorAll('.game-pipe');
                
                for (let pipeEl of activePipes) {
                    const pipeRect = pipeEl.getBoundingClientRect();
                    
                    if (
                        birdRect.left < pipeRect.right &&
                        birdRect.right > pipeRect.left &&
                        birdRect.top < pipeRect.bottom &&
                        birdRect.bottom > pipeRect.top
                    ) {
                        cancelAnimationFrame(animationFrameId);
                        window.removeEventListener('keydown', handleKeyDown);
                        window.removeEventListener('touchstart', handleKeyDown);
                        setGameState('MENU');
                        alert("Game Over - Crashed into a Pipe!");
                        return;
                    }
                }
            }

            animationFrameId = requestAnimationFrame(update);
        }

        animationFrameId = requestAnimationFrame(update);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleKeyDown);
        };
    }, [gameState]);

    return (
        <div>
            <Link to="/">← Back</Link>
    
            <div id="body" className="flex w-screen justify-center items-center">
                <div id="main" className="bg-blue-400 w-110 relative flex overflow-hidden"> 
           
                    <img src={flappyWallpaper} style={{ height: '100%' }} alt="background" />
   
                    <div id="points" className='absolute ml-[5%] z-20 text-4xl text-white font-bold'>{point}</div>
                    
                    <div ref={bird} className='z-10 h-10 w-12 object-contain absolute top-40 translate-x-10 '>
                        <img src={birdImg} alt="bird" className='overflow-hidden scale-[2] ' />
                    </div>
                    
                    {pipes.map(pipe => (
                        <React.Fragment key={pipe.id}>
                            <div 
                                className='absolute z-11 game-pipe' 
                                style={{ transform: `translate3d(${pipe.x}px, ${pipe.topY}px, 0)` }}
                            >
                                <img src={pipeTop} alt="pipe-top" className='h-65' />
                            </div>
                            
                            <div 
                                className='absolute z-11 game-pipe' 
                                style={{ transform: `translate3d(${pipe.x}px, ${pipe.topY}px, 0) translateY(380px)` }}
                            >
                                <img src={pipeBottom} alt="pipe-bottom" className='h-65' />
                            </div>
                        </React.Fragment>
                    ))}

                    {gameState === 'MENU' && (
                        <div className="absolute inset-0 bg-black/50 z-30 flex flex-col justify-center items-center gap-4">
                            <h1 className="text-4xl text-white font-extrabold tracking-wider drop-shadow-md">
                                FLAPPY BIRD
                            </h1>
                            <button 
                                onClick={startGame}
                                className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-lg hover:bg-orange-600 transition active:scale-95 text-xl cursor-pointer"
                            >
                                {point > 0 ? 'Play Again' : 'Start Game'}
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Flappbird;
