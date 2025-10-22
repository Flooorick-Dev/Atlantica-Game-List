
import React, { useRef, useEffect } from 'react';

const BackgroundCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let lines: Line[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Line {
            x: number;
            y: number;
            speed: number;
            length: number;
            width: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.speed = Math.random() * 0.5 + 0.1;
                this.length = Math.random() * 200 + 50;
                this.width = Math.random() * 1.5 + 0.5;
                this.color = `rgba(168, 85, 247, ${Math.random() * 0.5 + 0.1})`;
            }
            update() {
                this.y += this.speed;
                if (this.y > canvas.height) {
                    this.y = -this.length;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.length);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = this.width;
                ctx.stroke();
            }
        }

        const initLines = () => {
            lines = [];
            for (let i = 0; i < 100; i++) {
                lines.push(new Line());
            }
        };

        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            lines.forEach(line => {
                line.update();
                line.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            resizeCanvas();
            initLines();
        };

        resizeCanvas();
        initLines();
        animate();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-30"></canvas>;
};

export default BackgroundCanvas;
