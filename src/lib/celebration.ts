import confetti from 'canvas-confetti';

let customConfetti: any = null;

export const getConfetti = () => {
    if (typeof window === 'undefined') return () => {};
    if (!customConfetti) {
        let canvas = document.getElementById('henosis-confetti-canvas') as HTMLCanvasElement;
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'henosis-confetti-canvas';
            canvas.style.position = 'fixed';
            canvas.style.top = '0px';
            canvas.style.left = '0px';
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '999999';
            if (typeof canvas.getBoundingClientRect !== 'function') {
                canvas.getBoundingClientRect = function() {
                   return { width: window.innerWidth, height: window.innerHeight, top: 0, left: 0, right: window.innerWidth, bottom: window.innerHeight, x: 0, y: 0, toJSON: () => this } as any;
                };
            }
            document.body.appendChild(canvas);
        }
        customConfetti = confetti.create(canvas, { resize: true, useWorker: false });
    }
    return customConfetti;
};

export const triggerCelebration = () => {
    window.dispatchEvent(new CustomEvent("app-pulse-logo"));
    getConfetti()({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fde047', '#3b82f6', '#ef4444', '#22c55e']
    });
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate([100, 50, 100, 50, 150]); // Distinct triple pulse pattern for celebration milestone
    }
};
