import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// 1. Standard Vite Asset Imports (Solves the 'npm run build' asset mismatch)
import flappyWallpaper from '../assets/flappy bird wallpaper.png';
import birdImg from '../assets/du0i1k2io4j6iveqeul81b2nme.png';
import pipeTop from '../assets/toppng.com-flappy-bird-pipe-transparent-281x1080.png';
import pipeBottom from '../assets/opppng.com-flappy-bird-pipe-transparent-281x1080.png';

function Flappbird() {
    const [point, setPoint] = useState(0);
    const [pipes, setPipes] = useState([]);
    
    const bird = useRef(null);

    function incPoint() {
        setPoint(prev => prev + 1 / 2);
    }

    useEffect(() => {
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
            // Prevent default behavior for actual key events (like spacebar scrolling down)
            if (e && typeof e.preventDefault === 'function') {
                e.preventDefault();
            }
            bvelocityY = -4;
        }

        // Attach event listeners to window
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleKeyDown, { passive: false });

        function update(timestamp) {
            if (!lastSpawnTime) lastSpawnTime = timestamp;

            // Spawn pipes
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

            // Move pipes and evaluate point increments
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
            
            // Apply gravity to the bird
            bvelocityY += gravity;
            bcurrentY += bvelocityY;
            
            if (bird.current) {
                bird.current.style.transform = `translateY(${bcurrentY}px)`;
            }

            // Boundary collision handling
            if (bcurrentY > endY || bcurrentY < topY) {
                cancelAnimationFrame(animationFrameId); 
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('touchstart', handleKeyDown);
                alert("Game Over - Hit Boundaries!");
                return; 
            }

            // Pipe collision checking
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
                        alert("Game Over - Crashed into a Pipe!");
                        return;
                    }
                }
            }

            animationFrameId = requestAnimationFrame(update);
        }

        animationFrameId = requestAnimationFrame(update);
        
        // Clean up subscriptions
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleKeyDown);
        };
    }, []);

    return (
        <div>
            <Link to="/">← Back</Link>
    
            <div id="body" className="flex w-screen justify-center items-center">
                <div id="main" className="bg-blue-400 w-110 relative flex overflow-hidden"> 
           
                    {/* Using imported asset hooks */}
                    <img src={flappyWallpaper} style={{ height: '100%' }} alt="background" />
   
                    <div id="points" className='absolute ml-[5%] z-20 text-4xl text-white font-bold'>{point}</div>
                    
                    <div ref={bird} className='z-10 h-10 w-12 object-contain absolute top-40 translate-x-10 '>
                        <img src={birdImg} alt="bird" className='overflow-hidden scale-[2] ' />
                    </div>
                    
                    {pipes.map(pipe => (
                        <React.Fragment key={pipe.id}>
                            {/* Top Pipe */}
                            <div 
                                className='absolute z-11 game-pipe' 
                                style={{ transform: `translate3d(${pipe.x}px, ${pipe.topY}px, 0)` }}
                            >
                                <img src={pipeTop} alt="pipe-top" className='h-65' />
                            </div>
                            
                            {/* Bottom Pipe */}
                            <div 
                                className='absolute z-11 game-pipe' 
                                style={{ transform: `translate3d(${pipe.x}px, ${pipe.topY}px, 0) translateY(380px)` }}
                            >
                                <img src={pipeBottom} alt="pipe-bottom" className='h-65' />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Flappbird;
