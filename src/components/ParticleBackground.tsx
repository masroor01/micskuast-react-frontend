import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PagePalette {
  primary: string;
  secondary: string;
  accent: string;
  aurora1: string;
  aurora2: string;
  waveOpacity: number;
  plexusOpacity: number;
  meshFacetOpacity: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const location = useLocation();

  // Determine dynamic palette and transparency per route
  const getPagePalette = (pathname: string, theme: string): PagePalette => {
    const isDark = theme === 'dark';
    const isWarm = theme === 'warm';

    if (pathname === '/' || pathname === '') {
      // Homepage: Fresh Emerald, Vibrant Teal & Soft Gold
      return {
        primary: isDark ? '#22c55e' : isWarm ? '#15803d' : '#16a34a',
        secondary: isDark ? '#06b6d4' : isWarm ? '#0d9488' : '#0284c7',
        accent: isDark ? '#fbbf24' : isWarm ? '#d97706' : '#f59e0b',
        aurora1: isDark ? 'rgba(34, 197, 94, 0.18)' : 'rgba(22, 163, 74, 0.08)',
        aurora2: isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(14, 165, 233, 0.06)',
        waveOpacity: isDark ? 0.35 : 0.22,
        plexusOpacity: isDark ? 0.32 : 0.20,
        meshFacetOpacity: isDark ? 0.045 : 0.025,
      };
    } else if (pathname.startsWith('/forecast')) {
      // Forecasts: AI Cyber Cyan, Neural Emerald & Deep Indigo
      return {
        primary: isDark ? '#38bdf8' : '#0284c7',
        secondary: isDark ? '#34d399' : '#10b981',
        accent: isDark ? '#818cf8' : '#6366f1',
        aurora1: isDark ? 'rgba(56, 189, 248, 0.18)' : 'rgba(2, 132, 199, 0.08)',
        aurora2: isDark ? 'rgba(52, 211, 153, 0.15)' : 'rgba(16, 185, 129, 0.06)',
        waveOpacity: isDark ? 0.38 : 0.25,
        plexusOpacity: isDark ? 0.35 : 0.22,
        meshFacetOpacity: isDark ? 0.05 : 0.028,
      };
    } else if (pathname.startsWith('/ews')) {
      // EWS / Early Warning: Amber Volatility, Coral & Teal
      return {
        primary: isDark ? '#fbbf24' : '#d97706',
        secondary: isDark ? '#f87171' : '#dc2626',
        accent: isDark ? '#2dd4bf' : '#0d9488',
        aurora1: isDark ? 'rgba(251, 191, 36, 0.16)' : 'rgba(217, 119, 6, 0.07)',
        aurora2: isDark ? 'rgba(248, 113, 113, 0.14)' : 'rgba(220, 38, 38, 0.05)',
        waveOpacity: isDark ? 0.34 : 0.22,
        plexusOpacity: isDark ? 0.32 : 0.20,
        meshFacetOpacity: isDark ? 0.045 : 0.025,
      };
    } else if (pathname.startsWith('/markets')) {
      // APMC Mandis: Wholesale Market Blue, Forest Green & Amber
      return {
        primary: isDark ? '#60a5fa' : '#2563eb',
        secondary: isDark ? '#4ade80' : '#16a34a',
        accent: isDark ? '#f59e0b' : '#d97706',
        aurora1: isDark ? 'rgba(96, 165, 250, 0.16)' : 'rgba(37, 99, 235, 0.07)',
        aurora2: isDark ? 'rgba(74, 222, 128, 0.14)' : 'rgba(22, 163, 74, 0.06)',
        waveOpacity: isDark ? 0.32 : 0.20,
        plexusOpacity: isDark ? 0.30 : 0.18,
        meshFacetOpacity: isDark ? 0.04 : 0.022,
      };
    } else if (pathname.startsWith('/publications') || pathname.startsWith('/outlooks')) {
      // Publications: Academic Violet, Deep Sapphire & Emerald
      return {
        primary: isDark ? '#a78bfa' : '#7c3aed',
        secondary: isDark ? '#38bdf8' : '#0284c7',
        accent: isDark ? '#34d399' : '#059669',
        aurora1: isDark ? 'rgba(167, 139, 250, 0.16)' : 'rgba(124, 58, 237, 0.07)',
        aurora2: isDark ? 'rgba(56, 189, 248, 0.14)' : 'rgba(2, 132, 199, 0.06)',
        waveOpacity: isDark ? 0.30 : 0.18,
        plexusOpacity: isDark ? 0.28 : 0.16,
        meshFacetOpacity: isDark ? 0.035 : 0.02,
      };
    } else if (pathname.startsWith('/about') || pathname.startsWith('/team')) {
      // University / Team: Prestigious SKUAST Forest Green & Golden Amber
      return {
        primary: isDark ? '#4ade80' : '#15803d',
        secondary: isDark ? '#fbbf24' : '#ca8a04',
        accent: isDark ? '#2dd4bf' : '#0f766e',
        aurora1: isDark ? 'rgba(74, 222, 128, 0.16)' : 'rgba(21, 128, 61, 0.07)',
        aurora2: isDark ? 'rgba(251, 191, 36, 0.14)' : 'rgba(202, 138, 4, 0.06)',
        waveOpacity: isDark ? 0.32 : 0.20,
        plexusOpacity: isDark ? 0.30 : 0.18,
        meshFacetOpacity: isDark ? 0.04 : 0.022,
      };
    } else {
      // Admin / Other: Clean Slate, Emerald & Blue
      return {
        primary: isDark ? '#94a3b8' : '#475569',
        secondary: isDark ? '#22c55e' : '#16a34a',
        accent: isDark ? '#38bdf8' : '#0284c7',
        aurora1: isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(71, 85, 105, 0.05)',
        aurora2: isDark ? 'rgba(34, 197, 94, 0.12)' : 'rgba(22, 163, 74, 0.05)',
        waveOpacity: isDark ? 0.25 : 0.15,
        plexusOpacity: isDark ? 0.22 : 0.14,
        meshFacetOpacity: isDark ? 0.03 : 0.015,
      };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle / Plexus node details
    interface PlexusNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      hueShift: number;
    }

    const nodes: PlexusNode[] = [];
    const nodeCount = Math.min(55, Math.max(30, Math.floor((width * height) / 28000)));

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() < 0.2 ? Math.random() * 2.5 + 3.5 : Math.random() * 1.5 + 1.8,
        hueShift: Math.random(),
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;

    const animate = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      const theme = document.documentElement.getAttribute('data-theme') || 'light';
      const palette = getPagePalette(location.pathname, theme);

      // ==========================================
      // 1. SOFT AMBIENT AURORA GLOWS (IMAGE 2)
      // ==========================================
      const grad1 = ctx.createRadialGradient(width * 0.15, height * 0.25, 10, width * 0.15, height * 0.25, width * 0.55);
      grad1.addColorStop(0, palette.aurora1);
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.85, height * 0.65, 10, width * 0.85, height * 0.65, width * 0.6);
      grad2.addColorStop(0, palette.aurora2);
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // ==========================================
      // 2. FLOWING SINE-WAVE RIBBONS (IMAGE 1)
      // ==========================================
      const waveStrands = 14;
      const waveYBase = height * 0.52;

      for (let s = 0; s < waveStrands; s++) {
        const offset = (s - waveStrands / 2) * 16;
        const progress = s / waveStrands;

        // Create linear gradient along the wave
        const waveGrad = ctx.createLinearGradient(0, height * 0.2, width, height * 0.8);
        waveGrad.addColorStop(0, palette.primary);
        waveGrad.addColorStop(0.45, palette.secondary);
        waveGrad.addColorStop(0.85, palette.accent);
        waveGrad.addColorStop(1, palette.primary);

        ctx.beginPath();
        ctx.strokeStyle = waveGrad;
        ctx.globalAlpha = palette.waveOpacity * (1 - Math.abs(progress - 0.5) * 0.8);
        ctx.lineWidth = 1.15 + (s % 3 === 0 ? 0.6 : 0);

        const step = Math.max(12, Math.floor(width / 70));
        let first = true;

        for (let x = 0; x <= width + step; x += step) {
          // Double harmonic wave equation creating smooth undulating ribbons
          const normalizedX = x / width;
          const y =
            waveYBase +
            offset +
            Math.sin(normalizedX * 3.8 + time * 1.2 + s * 0.08) * (height * 0.14) +
            Math.cos(normalizedX * 2.2 - time * 0.9 + s * 0.05) * (height * 0.09) +
            Math.sin(normalizedX * 6.5 + time * 1.8) * (height * 0.03);

          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // ==========================================
      // 3. PLEXUS CONSTELLATION & MESH FACETS (IMAGE 2)
      // ==========================================
      // Move and bounce nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });

      const maxDist = Math.min(150, width * 0.16);

      // Draw triangular facets between 3 nearby nodes (low-poly constellation mesh)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d1 = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d1 > maxDist) continue;

          for (let k = j + 1; k < nodes.length; k++) {
            const d2 = Math.hypot(nodes[j].x - nodes[k].x, nodes[j].y - nodes[k].y);
            const d3 = Math.hypot(nodes[i].x - nodes[k].x, nodes[i].y - nodes[k].y);

            if (d2 < maxDist && d3 < maxDist) {
              const avgDist = (d1 + d2 + d3) / 3;
              const facetAlpha = (1 - avgDist / maxDist) * palette.meshFacetOpacity;

              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.lineTo(nodes[k].x, nodes[k].y);
              ctx.closePath();

              ctx.fillStyle = palette.secondary;
              ctx.globalAlpha = facetAlpha;
              ctx.fill();
            }
          }
        }
      }

      // Draw connecting lines between pairs
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ni = nodes[i];
          const nj = nodes[j];
          const dist = Math.hypot(ni.x - nj.x, ni.y - nj.y);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * palette.plexusOpacity;
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);
            ctx.strokeStyle = ni.hueShift > 0.5 ? palette.primary : palette.secondary;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.95;
            ctx.stroke();
          }
        }
      }

      // Draw constellation vertex nodes & halos
      nodes.forEach((n) => {
        const nodeColor = n.hueShift > 0.6 ? palette.accent : n.hueShift > 0.3 ? palette.primary : palette.secondary;

        // Outer glow halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = palette.plexusOpacity * 0.35;
        ctx.fill();

        // Core vertex circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = palette.plexusOpacity * 1.5;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [location.pathname]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        backgroundColor: 'var(--color-bg)',
      }}
    />
  );
};
