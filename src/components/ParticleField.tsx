import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  velocity: number;
  angle: number;
  size: number;
  alpha: number;
  hue: number;
};

const createParticle = (width: number, height: number): Particle => ({
  x: Math.random() * width,
  y: Math.random() * height,
  velocity: 0.2 + Math.random() * 0.7,
  angle: Math.random() * Math.PI * 2,
  size: 1 + Math.random() * 1.8,
  alpha: 0.15 + Math.random() * 0.55,
  hue: 190 + Math.random() * 80
});

const PARTICLE_COUNT = 60;

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const setCanvasSize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    setCanvasSize();

    let particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height));

    const updateParticles = () => {
      particles = particles.map((particle) => ({
        ...particle,
        angle: particle.angle + (Math.random() - 0.5) * 0.02,
        x:
          particle.x +
          Math.cos(particle.angle) * particle.velocity +
          (Math.random() - 0.5) * 0.2,
        y:
          particle.y +
          Math.sin(particle.angle) * particle.velocity +
          (Math.random() - 0.5) * 0.2
      })).map((particle) => {
        let x = particle.x;
        let y = particle.y;
        if (x > width) x = 0;
        if (x < 0) x = width;
        if (y > height) y = 0;
        if (y < 0) y = height;
        return { ...particle, x, y };
      });
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        context.beginPath();
        context.globalAlpha = particle.alpha;
        context.fillStyle = `hsla(${particle.hue}, 80%, 65%, 1)`;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 110) {
            context.beginPath();
            context.globalAlpha = 0.08;
            context.strokeStyle = "rgba(14, 165, 233, 0.55)";
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.stroke();
          }
        }
      }
    };

    let animationFrameId: number;

    const animate = () => {
      updateParticles();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
      particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-10 opacity-80"
      aria-hidden
    />
  );
};

export default ParticleField;
