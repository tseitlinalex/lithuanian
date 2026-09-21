import React, { useEffect, useRef } from 'react';

/**
 * ParticleCanvas handles high-FPS 2D canvas effects:
 * - Particle bursts on matching words
 * - Floating score text popups (+100, COMBO x3!)
 * - Ice freeze overlay effect
 */
export default function ParticleCanvas({ particles, floatingTexts, isFrozen }) {
  const canvasRef = useRef(null);
  const activeParticlesRef = useRef([]);
  const activeTextsRef = useRef([]);

  // Trigger burst when new particles prop arrives
  useEffect(() => {
    if (particles && particles.length > 0) {
      activeParticlesRef.current.push(...particles);
    }
  }, [particles]);

  // Trigger floating text popups
  useEffect(() => {
    if (floatingTexts && floatingTexts.length > 0) {
      activeTextsRef.current.push(...floatingTexts);
    }
  }, [floatingTexts]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render & update particles
      for (let i = activeParticlesRef.current.length - 1; i >= 0; i--) {
        const p = activeParticlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity || 0.1;
        p.life -= p.decay || 0.02;

        if (p.life <= 0) {
          activeParticlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color || '#3b82f6';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size || 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render & update floating texts
      for (let i = activeTextsRef.current.length - 1; i >= 0; i--) {
        const t = activeTextsRef.current[i];
        t.y -= t.speedY || 1.5;
        t.life -= t.decay || 0.02;

        if (t.life <= 0) {
          activeTextsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, t.life);
        ctx.font = t.font || 'bold 20px sans-serif';
        ctx.fillStyle = t.color || '#f59e0b';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fillText(t.text, t.x, t.y);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <canvas ref={canvasRef} className="w-full h-full" />
      {isFrozen && (
        <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[1px] border-4 border-cyan-400/40 animate-pulse pointer-events-none flex items-start justify-center pt-8">
          <div className="bg-cyan-900/80 text-cyan-200 border border-cyan-400 px-4 py-1 rounded-full text-sm font-bold tracking-widest shadow-lg shadow-cyan-500/30">
            ❄️ TIME FROZEN ❄️
          </div>
        </div>
      )}
    </div>
  );
}

export function createBurstParticles(x, y, count = 25, color = '#38bdf8') {
  const particles = [];
  const colors = [color, '#f43f5e', '#fbbf24', '#a855f7', '#34d399'];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 5 + 2,
      life: 1.0,
      decay: Math.random() * 0.03 + 0.015,
      gravity: 0.12,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
  return particles;
}
