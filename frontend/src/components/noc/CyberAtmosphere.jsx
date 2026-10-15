import { useEffect, useRef } from "react";

// Efeito decorativo de baixo custo. Não representa dados de monitoramento.
const CHARS = "01ABCDEF#<>/+";

function randomSeed(seed) {
  let value = seed >>> 0;
  return () => {
    value = (1664525 * value + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export const CyberAtmosphere = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const slowPointer = window.matchMedia("(pointer: coarse)");
    const mouse = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let nodes = [];
    let beams = [];
    let raf = 0;
    let last = 0;
    let frame = 0;
    let disposed = false;

    // Em celulares, dispositivos touch e modo acessível: quadro estático.
    const isAnimated = () => !reduce.matches && !mobile.matches && !slowPointer.matches;
    const draw = (staticFrame = false) => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 0.65;
      beams.forEach((b) => {
        if (!staticFrame) {
          b.y -= b.speed;
          if (b.y + b.length < 0) b.y = height + b.length;
        }
        ctx.strokeStyle = "rgba(28,205,224,0.11)";
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x, b.y + b.length);
        ctx.stroke();
      });

      // Máximo 36 nós no desktop: 630 pares por quadro, em vez de até 4371.
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy > 135 * 135) continue;
          ctx.strokeStyle = "rgba(82,211,202,0.095)";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      nodes.forEach((n) => {
        if (!staticFrame) {
          n.y += n.speed;
          if (n.y > height + 14) n.y = -14;
        }
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const near = isAnimated() && dx * dx + dy * dy < 145 * 145;
        if (near && frame % 19 === n.id % 19) {
          n.char = CHARS[(n.id + Math.floor(frame / 19)) % CHARS.length];
        }
        ctx.fillStyle = near ? "rgba(105,245,222,0.65)" : "rgba(105,245,222,0.27)";
        ctx.fillText(n.char, n.x, n.y);
      });
      frame += 1;
    };

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (w === width && h === height && nodes.length) return;
      width = w;
      height = h;
      const dpr = isAnimated() ? Math.min(window.devicePixelRatio || 1, 1.25) : 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = randomSeed(2391 + width * 7);
      const amount = isAnimated() ? Math.min(36, Math.round(width / 38)) : 12;
      nodes = Array.from({ length: amount }, (_, id) => ({
        x: rand() * width,
        y: rand() * height,
        speed: 0.08 + rand() * 0.16,
        char: CHARS[Math.floor(rand() * CHARS.length)],
        id,
      }));
      beams = Array.from({ length: isAnimated() ? 7 : 2 }, () => ({
        x: rand() * width,
        y: rand() * height,
        length: 40 + rand() * 85,
        speed: 0.35 + rand() * 0.8,
      }));
    };

    const tick = (now) => {
      if (disposed || document.hidden || !isAnimated()) return;
      raf = requestAnimationFrame(tick);
      if (now - last < 66) return; // ~15 FPS, suficiente para um fundo discreto
      last = now;
      draw();
    };

    const refresh = () => {
      cancelAnimationFrame(raf);
      if (disposed) return;
      // Também recompõe o canvas ao trocar modo/densidade.
      width = 0;
      setup();
      const active = isAnimated();
      canvas.dataset.motion = active ? "animated" : "static";
      draw(true);
      if (active && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const onPointer = (event) => {
      if (!isAnimated()) return;
      const bounds = canvas.getBoundingClientRect();
      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
    };
    const resize = new ResizeObserver(() => {
      const r = canvas.getBoundingClientRect();
      if (Math.round(r.width) !== width || Math.round(r.height) !== height) refresh();
    });

    resize.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", refresh);
    reduce.addEventListener("change", refresh);
    mobile.addEventListener("change", refresh);
    slowPointer.addEventListener("change", refresh);
    refresh();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resize.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", refresh);
      reduce.removeEventListener("change", refresh);
      mobile.removeEventListener("change", refresh);
      slowPointer.removeEventListener("change", refresh);
    };
  }, []);

  return (
    <canvas ref={ref} data-testid="v7-cyber-atmosphere" aria-hidden="true"
      className="cyber-atmosphere pointer-events-none absolute inset-0 h-full w-full" />
  );
};
