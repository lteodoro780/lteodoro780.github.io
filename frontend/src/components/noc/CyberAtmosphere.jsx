import { useEffect, useRef } from "react";

// Fundo decorativo local: Canvas 2D, sem bibliotecas externas,
// chamadas à rede ou dados de monitoramento inventados.
const ALPHABET = "01ABCDEF#<>/+".split("");

const pseudoRandom = (seed) => {
  let value = seed >>> 0;
  return () => {
    value = (1664525 * value + 1013904223) >>> 0;
    return value / 4294967296;
  };
};

export const CyberAtmosphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let nodes = [];
    let beams = [];
    let frame = 0;
    let lastFrame = 0;
    let disposed = false;

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const random = pseudoRandom(2391 + Math.round(width) * 7);
      const density = width < 768 ? 23 : Math.min(94, Math.round(width / 17));
      nodes = Array.from({ length: density }, (_, id) => ({
        x: random() * width,
        y: random() * height,
        speed: 0.075 + random() * 0.19,
        char: ALPHABET[Math.floor(random() * ALPHABET.length)],
        phase: random() * 6.283,
        id,
      }));
      beams = Array.from({ length: width < 768 ? 4 : 12 }, () => ({
        x: random() * width,
        y: random() * height,
        length: 40 + random() * 100,
        speed: 0.4 + random() * 1.1,
        alpha: 0.04 + random() * 0.11,
      }));
      draw(true);
    };

    const draw = (still = false) => {
      ctx.clearRect(0, 0, width, height);

      // Feixes esparsos, inspirados em HUDs, sem indicadores operacionais fictícios.
      beams.forEach((beam) => {
        if (!still) {
          beam.y -= beam.speed;
          if (beam.y + beam.length < 0) beam.y = height + beam.length;
        }
        const grad = ctx.createLinearGradient(beam.x, beam.y, beam.x, beam.y + beam.length);
        grad.addColorStop(0, `rgba(13, 211, 163, ${beam.alpha})`);
        grad.addColorStop(1, "rgba(13, 211, 163, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(beam.x, beam.y);
        ctx.lineTo(beam.x, beam.y + beam.length);
        ctx.stroke();
      });

      // Linhas de proximidade: rede abstrata ilustrativa, não topologia real.
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 > 140 * 140) continue;
          const alpha = (1 - Math.sqrt(dist2) / 140) * 0.13;
          ctx.strokeStyle = `rgba(82, 211, 202, ${alpha})`;
          ctx.lineWidth = 0.65;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.font = width < 768 ? "10px monospace" : "11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      nodes.forEach((node) => {
        if (!still) {
          node.y += node.speed;
          if (node.y > height + 12) node.y = -12;
        }
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const near = dx * dx + dy * dy < 155 * 155;
        if (near && !still && frame % 13 === node.id % 13) {
          node.char = ALPHABET[(node.id + Math.floor(frame / 13)) % ALPHABET.length];
        }
        if (near && !still && width >= 768) {
          ctx.strokeStyle = "rgba(41, 229, 181, 0.16)";
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        const alpha = near ? 0.65 : 0.2 + 0.07 * Math.sin(node.phase + frame * 0.018);
        ctx.fillStyle = `rgba(92, 238, 194, ${alpha})`;
        ctx.fillText(node.char, node.x, node.y);
      });
      frame += 1;
    };

    const animate = (now) => {
      if (disposed || document.hidden || reducedMotion.matches) return;
      frameRequest = requestAnimationFrame(animate);
      if (now - lastFrame < 33) return; // limita a aproximadamente 30 FPS
      lastFrame = now;
      draw();
    };

    let frameRequest = 0;
    const schedule = () => {
      cancelAnimationFrame(frameRequest);
      if (!disposed && !document.hidden && !reducedMotion.matches) {
        lastFrame = 0;
        frameRequest = requestAnimationFrame(animate);
      } else {
        draw(true);
      }
    };

    const onPointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const resize = new ResizeObserver(() => { setup(); schedule(); });
    resize.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    reducedMotion.addEventListener("change", schedule);
    setup();
    schedule();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameRequest);
      resize.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="v7-cyber-atmosphere"
      aria-hidden="true"
      className="cyber-atmosphere pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};
