import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Language } from '../types';
import { triggerHaptic } from '../utils/haptics';
import {
  Play,
  Pause,
  RotateCcw,
  Sun,
  Layers,
  Zap,
  BatteryCharging,
  Maximize2,
  Sliders,
  Sparkles,
  MousePointer
} from 'lucide-react';

interface AppleSolarCanvasSequenceProps {
  currentLang: Language;
  onNavigateToCalc?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  type: 'photon' | 'electron';
}

const TOTAL_FRAMES = 120;

export const AppleSolarCanvasSequence: React.FC<AppleSolarCanvasSequenceProps> = ({
  currentLang,
  onNavigateToCalc
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation & Frame tracking
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt for Apple 3D card perspective
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Refs for smooth 60fps rendering without React re-render lag
  const frameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const isPlayingRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(performance.now());

  // Labels by language
  const labels = {
    EN: {
      badge: 'APPLE-STYLE INTERACTIVE CANVAS',
      scrollHint: 'Scroll or drag timeline to scrub sequence',
      play: 'Play Cinematic',
      pause: 'Pause',
      reset: 'Reset Sequence',
      phase1: '07:30 AM • Sunrise Activation',
      phase2: '12:00 PM • Peak 1,000 W/m²',
      phase3: '05:30 PM • Storage Charge',
      phase4: 'X-Ray • Optical Layers',
      irradiance: 'Solar Irradiance',
      powerOutput: 'System Output',
      efficiency: 'Cell Efficiency',
      elevation: 'Sun Elevation',
      status: 'GRID SYNCHRONIZED',
      scrollMode: 'Scroll-Sync Active',
      dragMode: 'Timeline Scrub'
    },
    KH: {
      badge: 'ផ្ទាំងបង្ហាញអន្តរកម្ម CANVAS បែប APPLE',
      scrollHint: 'រំកិលទំព័រ ឬអូសបន្ទាត់ពេលវេលាដើម្បីមើលលំដាប់',
      play: 'ចាក់វីដេអូស្វ័យប្រវត្តិ',
      pause: 'ផ្អាក',
      reset: 'ចាប់ផ្តើមឡើងវិញ',
      phase1: '០៧:៣០ ព្រឹក • ស្រូបពន្លឺព្រឹក',
      phase2: '១២:០០ ថ្ងៃត្រង់ • កំពូល 1,000 W/m²',
      phase3: '០៥:៣០ ល្ងាច • បញ្ចូលអាគុយ',
      phase4: 'X-Ray • ស្រទាប់បច្ចេកវិទ្យា',
      irradiance: 'កម្រិតពន្លឺព្រះអាទិត្យ',
      powerOutput: 'ថាមពលផលិតបាន',
      efficiency: 'ប្រសិទ្ធភាពសូឡា',
      elevation: 'មុំកម្ពស់ព្រះអាទិត្យ',
      status: 'ភ្ជាប់បណ្តាញជាតិរួចរាល់',
      scrollMode: 'រំកិលតាមទំព័រ',
      dragMode: 'អូសពេលវេលា'
    },
    VI: {
      badge: 'CANVAS TƯƠNG TÁC CHUẨN APPLE',
      scrollHint: 'Cuộn trang hoặc kéo thanh tua để xem chuỗi chuyển động',
      play: 'Phát Điện Ảnh',
      pause: 'Tạm Dừng',
      reset: 'Khởi Động Lại',
      phase1: '07:30 Sáng • Đón Bình Minh',
      phase2: '12:00 Trưa • Đỉnh 1.000 W/m²',
      phase3: '17:30 Chiều • Sạc Pin Lưu Trữ',
      phase4: 'X-Ray • Bóc Tách Linh Kiện',
      irradiance: 'Bức Xạ Quang Năng',
      powerOutput: 'Công Suất Hệ Thống',
      efficiency: 'Hiệu Suất Tấm Pin',
      elevation: 'Góc Cao Mặt Trời',
      status: 'HÒA LƯỚI ĐỒNG BỘ',
      scrollMode: 'Đồng Bộ Theo Cuộn',
      dragMode: 'Tua Thủ Công'
    }
  }[currentLang];

  // Initialize photon and electron particle pool
  useEffect(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * 500,
        y: Math.random() * 320,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 0.8 + Math.random() * 1.2,
        size: 1 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.6,
        type: i % 3 === 0 ? 'electron' : 'photon'
      });
    }
    particlesRef.current = particles;
  }, []);

  // Update target frame smoothly based on window scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isPlayingRef.current) return;

      const heroEl = document.getElementById('hero-section');
      if (!heroEl) return;

      const rect = heroEl.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Calculate scroll progress through hero section + first part of page
      // Rect.top goes from 0 to -rect.height
      const totalScrollable = rect.height + windowH * 0.4;
      const scrolled = Math.max(0, -rect.top);
      const ratio = Math.min(1, Math.max(0, scrolled / totalScrollable));

      // Map ratio to 0..TOTAL_FRAMES
      targetFrameRef.current = Math.round(ratio * (TOTAL_FRAMES - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sync isPlaying state to ref
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Handle 3D mouse parallax tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  // Procedural Canvas Sequence Rendering Engine
  const renderFrame = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, frame: number) => {
    const progress = frame / (TOTAL_FRAMES - 1); // 0.0 to 1.0

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Dynamic background sky color gradient interpolating across daylight hours
    // Dawn -> High Noon -> Golden Sunset -> Clean Studio Blueprint (Exploded view)
    let skyGradient = ctx.createLinearGradient(0, 0, 0, height);
    if (progress < 0.3) {
      // Dawn (soft rose & morning cyan sky)
      const p = progress / 0.3;
      skyGradient.addColorStop(0, '#0F172A');
      skyGradient.addColorStop(0.5, '#1E293B');
      skyGradient.addColorStop(1, '#334155');
    } else if (progress < 0.7) {
      // High noon (deep clear architectural obsidian-blue)
      skyGradient.addColorStop(0, '#090D16');
      skyGradient.addColorStop(0.6, '#0F172A');
      skyGradient.addColorStop(1, '#1A2436');
    } else if (progress < 0.88) {
      // Golden dusk (warm amber ambient horizon)
      skyGradient.addColorStop(0, '#120D1A');
      skyGradient.addColorStop(0.6, '#26141D');
      skyGradient.addColorStop(1, '#3D1C1B');
    } else {
      // X-Ray Precision Tech Studio
      skyGradient.addColorStop(0, '#0B0F19');
      skyGradient.addColorStop(0.7, '#111827');
      skyGradient.addColorStop(1, '#080C14');
    }

    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle technical grid overlay (Apple schematic aesthetic)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 24;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Dynamic Sun Trajectory
    // Arc across the sky: rises at left, peaks in center-high, sets at right-mid
    const sunArcProgress = Math.min(1, progress / 0.85);
    const sunAngle = (1 - sunArcProgress) * Math.PI; // PI to 0
    const sunCenterX = width * 0.15 + sunArcProgress * (width * 0.7);
    const sunCenterY = height * 0.55 - Math.sin(sunAngle) * (height * 0.42);
    const sunRadius = 24 + (1 - Math.abs(progress - 0.5) * 2) * 8;

    // Sun Rays & Atmospheric Flare (only during solar daylight phases)
    if (progress < 0.88) {
      // Sun outer glow
      const sunGlow = ctx.createRadialGradient(
        sunCenterX,
        sunCenterY,
        sunRadius * 0.2,
        sunCenterX,
        sunCenterY,
        sunRadius * 4.5
      );
      const sunColor = progress > 0.65 ? '245, 158, 11' : progress < 0.3 ? '251, 146, 60' : '254, 240, 138';
      sunGlow.addColorStop(0, `rgba(${sunColor}, 0.85)`);
      sunGlow.addColorStop(0.3, `rgba(${sunColor}, 0.35)`);
      sunGlow.addColorStop(0.7, `rgba(${sunColor}, 0.08)`);
      sunGlow.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunCenterX, sunCenterY, sunRadius * 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Sun core
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(sunCenterX, sunCenterY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Volumetric light beams towards solar panels
      const panelCenterX = width * 0.5;
      const panelCenterY = height * 0.62;

      ctx.save();
      const beamGrad = ctx.createLinearGradient(sunCenterX, sunCenterY, panelCenterX, panelCenterY);
      beamGrad.addColorStop(0, `rgba(${sunColor}, 0.35)`);
      beamGrad.addColorStop(0.6, `rgba(${sunColor}, 0.12)`);
      beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.01)');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(sunCenterX - sunRadius * 1.5, sunCenterY);
      ctx.lineTo(sunCenterX + sunRadius * 1.5, sunCenterY);
      ctx.lineTo(panelCenterX + width * 0.35, panelCenterY + height * 0.25);
      ctx.lineTo(panelCenterX - width * 0.35, panelCenterY + height * 0.25);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Solar Panel Array Dimensions (in 3D isometric perspective)
    const isExploded = progress >= 0.85;
    const explodeT = isExploded ? (progress - 0.85) / 0.15 : 0;

    const baseCenterX = width * 0.5;
    const baseCenterY = height * 0.64;
    const arrayW = width * 0.72;
    const arrayH = height * 0.42;

    // Draw Exploded Architecture Layers OR Unified Solar Panel Array
    if (isExploded) {
      // Phase 4: Apple Exploded Technical Layers
      // Layer 5: Aluminum Mounting Rail & Anodized Frame
      drawLayer(
        ctx,
        baseCenterX,
        baseCenterY + explodeT * 40,
        arrayW,
        arrayH,
        '#1E293B',
        '#334155',
        '05. Aerospace Anodized Aluminum 6063-T6 Frame & Rail'
      );

      // Layer 4: High-Resistance Fluoropolymer Backsheet
      drawLayer(
        ctx,
        baseCenterX,
        baseCenterY + explodeT * 15,
        arrayW * 0.98,
        arrayH * 0.98,
        '#0F172A',
        '#1E293B',
        '04. Multi-Layer Dielectric Tedlar Backsheet'
      );

      // Layer 3: N-Type TOPCon Bifacial Silicon Photovoltaic Cells
      drawLayer(
        ctx,
        baseCenterX,
        baseCenterY - explodeT * 12,
        arrayW * 0.96,
        arrayH * 0.96,
        '#0A192F',
        '#38BDF8',
        '03. 16-Busbar N-Type TOPCon Silicon Wafers (22.8% Eff.)',
        true
      );

      // Layer 2: Cross-linked EVA Encapsulation Foil
      drawLayer(
        ctx,
        baseCenterX,
        baseCenterY - explodeT * 38,
        arrayW * 0.98,
        arrayH * 0.98,
        'rgba(56, 189, 248, 0.15)',
        'rgba(56, 189, 248, 0.4)',
        '02. Optical POE / EVA Encapsulation Shield'
      );

      // Layer 1: 3.2mm Anti-Reflective Low-Iron Tempered Glass
      drawLayer(
        ctx,
        baseCenterX,
        baseCenterY - explodeT * 65,
        arrayW,
        arrayH,
        'rgba(255, 255, 255, 0.18)',
        'rgba(255, 255, 255, 0.7)',
        '01. 3.2mm Prismatic Anti-Reflective Solar Glass'
      );
    } else {
      // Normal Solar Array with Realistic Monocrystalline Grid & Specular Sheen
      ctx.save();

      // Perspective tilt
      const topW = arrayW * 0.78;
      const botW = arrayW;
      const topY = baseCenterY - arrayH * 0.5;
      const botY = baseCenterY + arrayH * 0.5;

      const p1 = { x: baseCenterX - topW * 0.5, y: topY };
      const p2 = { x: baseCenterX + topW * 0.5, y: topY };
      const p3 = { x: baseCenterX + botW * 0.5, y: botY };
      const p4 = { x: baseCenterX - botW * 0.5, y: botY };

      // Outer Anodized Black Frame
      ctx.fillStyle = '#0F172A';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(p1.x - 8, p1.y - 6);
      ctx.lineTo(p2.x + 8, p2.y - 6);
      ctx.lineTo(p3.x + 10, p3.y + 6);
      ctx.lineTo(p4.x - 10, p4.y + 6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Dark Monocrystalline Silicon Cell Surface
      const cellGrad = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
      if (progress < 0.3) {
        // Dawn cool tint
        cellGrad.addColorStop(0, '#0D1B2A');
        cellGrad.addColorStop(0.5, '#1B263B');
        cellGrad.addColorStop(1, '#0F172A');
      } else if (progress < 0.7) {
        // High noon deep iridescent blue-black
        cellGrad.addColorStop(0, '#07101E');
        cellGrad.addColorStop(0.4, '#0A192F');
        cellGrad.addColorStop(0.8, '#0E2443');
        cellGrad.addColorStop(1, '#050B14');
      } else {
        // Sunset amber edge reflection
        cellGrad.addColorStop(0, '#1E1417');
        cellGrad.addColorStop(0.5, '#1A1829');
        cellGrad.addColorStop(1, '#130C10');
      }

      ctx.fillStyle = cellGrad;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.fill();

      // Individual Silicon Cells Grid & Silver Busbars (4x6 modules)
      const cols = 6;
      const rows = 4;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;

      for (let c = 1; c < cols; c++) {
        const t = c / cols;
        const xTop = p1.x + (p2.x - p1.x) * t;
        const xBot = p4.x + (p3.x - p4.x) * t;
        ctx.beginPath();
        ctx.moveTo(xTop, p1.y);
        ctx.lineTo(xBot, p4.y);
        ctx.stroke();

        // Silver micro-busbar ribbons
        ctx.save();
        ctx.strokeStyle = 'rgba(224, 231, 255, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(xTop - 2, p1.y);
        ctx.lineTo(xBot - 2, p4.y);
        ctx.moveTo(xTop + 2, p1.y);
        ctx.lineTo(xBot + 2, p4.y);
        ctx.stroke();
        ctx.restore();
      }

      for (let r = 1; r < rows; r++) {
        const t = r / rows;
        const y = p1.y + (p4.y - p1.y) * t;
        const wAtY = topW + (botW - topW) * t;
        ctx.beginPath();
        ctx.moveTo(baseCenterX - wAtY * 0.5, y);
        ctx.lineTo(baseCenterX + wAtY * 0.5, y);
        ctx.stroke();
      }

      // Dynamic Specular Sunlight Sheen across glass
      const sheenPos = (progress * 2.2) % 1.6 - 0.3; // sweeps across
      const sheenX = baseCenterX - arrayW * 0.6 + sheenPos * arrayW * 1.2;
      const sheenGrad = ctx.createLinearGradient(sheenX - 60, topY, sheenX + 60, botY);
      sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)');
      sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = sheenGrad;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.fill();

      // Kinetic Photon Particles & Power Current Waves
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        // Update particle
        pt.y += pt.vy * (progress > 0.3 && progress < 0.7 ? 1.6 : 0.8);
        pt.x += pt.vx;

        if (pt.y > height * 0.85) {
          pt.y = height * 0.2;
          pt.x = baseCenterX - arrayW * 0.4 + Math.random() * arrayW * 0.8;
        }

        ctx.beginPath();
        if (pt.type === 'photon') {
          ctx.fillStyle =
            progress > 0.65
              ? `rgba(245, 158, 11, ${pt.alpha})`
              : `rgba(254, 240, 138, ${pt.alpha})`;
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        } else {
          // Electric current
          ctx.fillStyle = `rgba(56, 189, 248, ${pt.alpha * 1.2})`;
          ctx.arc(pt.x, pt.y, pt.size * 1.2, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      ctx.restore();
    }

    // Dynamic Technical Metric Values for HUD based on progress
    const irradianceVal = Math.round(
      progress < 0.2
        ? 320 + progress * 2400
        : progress < 0.65
        ? 980 + Math.sin(progress * 10) * 45
        : progress < 0.85
        ? 1000 - (progress - 0.65) * 3500
        : 850
    );

    const outputKW = (
      progress < 0.2
        ? 18.5 + progress * 150
        : progress < 0.65
        ? 85.0 + Math.sin(progress * 15) * 3.4
        : progress < 0.85
        ? Math.max(12, 85 - (progress - 0.65) * 280)
        : 88.5
    ).toFixed(1);

    const sunElevDeg = Math.round(18 + Math.sin(sunAngle) * 64);

    // Apple-Style Technical HUD Watermark Overlay
    drawAppleHud(ctx, width, height, frame, progress, irradianceVal, outputKW, sunElevDeg);
  }, []);

  // Helper to draw an exploded layer with Apple callout label
  const drawLayer = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    h: number,
    fill: string,
    stroke: string,
    label: string,
    hasCells: boolean = false
  ) => {
    ctx.save();
    const topW = w * 0.82;
    const botW = w;
    const topY = cy - h * 0.45;
    const botY = cy + h * 0.45;

    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(cx - topW * 0.5, topY);
    ctx.lineTo(cx + topW * 0.5, topY);
    ctx.lineTo(cx + botW * 0.5, botY);
    ctx.lineTo(cx - botW * 0.5, botY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (hasCells) {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1;
      for (let i = 1; i < 5; i++) {
        const t = i / 5;
        const xT = cx - topW * 0.5 + topW * t;
        const xB = cx - botW * 0.5 + botW * t;
        ctx.beginPath();
        ctx.moveTo(xT, topY);
        ctx.lineTo(xB, botY);
        ctx.stroke();
      }
    }

    // Callout label pin
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 10px JetBrains Mono, monospace';
    ctx.fillText(label, cx - botW * 0.5 + 8, botY - 8);
    ctx.restore();
  };

  // Helper to draw Apple-grade HUD overlay
  const drawAppleHud = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    frame: number,
    progress: number,
    irradiance: number,
    outputKW: string,
    elevation: number
  ) => {
    ctx.save();

    // Top HUD Bar: Frame counter + Live Time-of-Day
    const timeOfDay =
      progress < 0.3
        ? '07:45 AM'
        : progress < 0.7
        ? '12:15 PM'
        : progress < 0.85
        ? '05:30 PM'
        : 'TECH SPEC';

    ctx.font = '700 9px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText(
      `FRAME ${String(frame + 1).padStart(3, '0')} / ${TOTAL_FRAMES}  •  ${timeOfDay}`,
      16,
      24
    );

    // Live Grid Sync Badge
    ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
    ctx.fillRect(width - 130, 14, 114, 18);
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(width - 130, 14, 114, 18);

    ctx.fillStyle = '#22C55E';
    ctx.beginPath();
    ctx.arc(width - 120, 23, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '700 8px JetBrains Mono, monospace';
    ctx.fillText('GRID 50.0Hz SYNC', width - 110, 26);

    // Bottom HUD Metric Bar
    const barY = height - 28;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(12, barY - 14, width - 24, 32);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(12, barY - 14, width - 24, 32);

    ctx.font = '600 8.5px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('IRRADIANCE', 24, barY);
    ctx.fillStyle = '#F59E0B';
    ctx.font = '700 11px JetBrains Mono, monospace';
    ctx.fillText(`${irradiance} W/m²`, 24, barY + 12);

    const col2X = width * 0.36;
    ctx.font = '600 8.5px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('OUTPUT', col2X, barY);
    ctx.fillStyle = '#38BDF8';
    ctx.font = '700 11px JetBrains Mono, monospace';
    ctx.fillText(`${outputKW} kWp`, col2X, barY + 12);

    const col3X = width * 0.68;
    ctx.font = '600 8.5px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('SUN ELEV', col3X, barY);
    ctx.fillStyle = '#E03E2D';
    ctx.font = '700 11px JetBrains Mono, monospace';
    ctx.fillText(`${elevation}° DEG`, col3X, barY + 12);

    ctx.restore();
  };

  // Main 60fps Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const animate = (currentTime: number) => {
      if (!isRunning) return;

      // Handle auto-playing mode
      if (isPlayingRef.current) {
        targetFrameRef.current = (targetFrameRef.current + 0.4) % TOTAL_FRAMES;
      }

      // Smooth inertia lerp (Apple scroll smoothness)
      const diff = targetFrameRef.current - frameRef.current;
      if (Math.abs(diff) > 0.01) {
        frameRef.current += diff * 0.085;
      } else {
        frameRef.current = targetFrameRef.current;
      }

      const currentIntFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(frameRef.current))
      );
      setFrameIndex(currentIntFrame);

      // Handle high-dpi retina canvas sizing
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const desiredW = Math.round(rect.width * dpr);
      const desiredH = Math.round(rect.height * dpr);

      if (canvas.width !== desiredW || canvas.height !== desiredH) {
        canvas.width = desiredW;
        canvas.height = desiredH;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      renderFrame(ctx, rect.width, rect.height, currentIntFrame);
      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  // Jump to specific landmark phase
  const jumpToPhase = (target: number) => {
    triggerHaptic('selection');
    targetFrameRef.current = target;
    setIsPlaying(false);
  };

  const togglePlay = () => {
    triggerHaptic('light');
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    triggerHaptic('selection');
    targetFrameRef.current = 0;
    setIsPlaying(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.14)] border border-[#1A1A1A]/15 bg-[#0B0F19] text-white transition-all duration-300 select-none"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
      }}
    >
      {/* Top Apple-Style Header Ribbon */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141B2D] border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ED1C24]/15 border border-[#ED1C24]/30 text-[#ED1C24] font-mono text-[10px] font-bold">
            <Sparkles className="w-3 h-3" />
            <span>{labels.badge}</span>
          </div>
          <span className="hidden sm:inline text-[11px] text-white/50 font-mono">
            TOPCon 620W Bifacial Architecture
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-[11px] font-semibold text-white transition-all cursor-pointer touch-manipulation"
            title={isPlaying ? labels.pause : labels.play}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#F59E0B]" />
                <span className="hidden sm:inline">{labels.pause}</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#22C55E]" />
                <span className="hidden sm:inline">{labels.play}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/15 active:scale-90 text-white/70 hover:text-white transition-all cursor-pointer touch-manipulation"
            title={labels.reset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 60fps High-DPI Canvas Viewport */}
      <div className="relative w-full h-[320px] sm:h-[350px] bg-black">
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-ew-resize"
          onMouseDown={() => setIsPlaying(false)}
        />

        {/* Ambient Corner Technical Watermark */}
        <div className="absolute top-3 left-3 pointer-events-none opacity-40 hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-mono tracking-widest text-white/70">
            METFONE SOLAR ENGINEERING • V3.8
          </span>
        </div>
      </div>

      {/* Apple-Style Interactive Timeline Scrubber Bar */}
      <div className="p-3.5 bg-[#0F172A] border-t border-white/10 space-y-2.5">
        {/* Progress Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
            <span className="flex items-center gap-1">
              <Sliders className="w-3 h-3 text-[#E03E2D]" />
              <span>{labels.scrollHint}</span>
            </span>
            <span className="text-white font-bold">
              {Math.round((frameIndex / (TOTAL_FRAMES - 1)) * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max={TOTAL_FRAMES - 1}
            value={frameIndex}
            onChange={(e) => {
              setIsPlaying(false);
              targetFrameRef.current = Number(e.target.value);
            }}
            className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-ew-resize accent-[#ED1C24] transition-all touch-manipulation active:scale-y-125"
            aria-label="Solar sequence scrub timeline"
          />
        </div>

        {/* Phase Quick-Jumps (Apple Landmark Buttons) */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => jumpToPhase(10)}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition-all text-center cursor-pointer touch-manipulation ${
              frameIndex >= 0 && frameIndex < 35
                ? 'bg-[#ED1C24]/20 border-[#ED1C24] text-white shadow-xs'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}
          >
            <span className="hidden sm:inline">🌅 </span>Dawn 07:30
          </button>

          <button
            type="button"
            onClick={() => jumpToPhase(55)}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition-all text-center cursor-pointer touch-manipulation ${
              frameIndex >= 35 && frameIndex < 80
                ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-white shadow-xs'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}
          >
            <span className="hidden sm:inline">☀️ </span>Noon 1,000W
          </button>

          <button
            type="button"
            onClick={() => jumpToPhase(90)}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition-all text-center cursor-pointer touch-manipulation ${
              frameIndex >= 80 && frameIndex < 105
                ? 'bg-[#22C55E]/20 border-[#22C55E] text-white shadow-xs'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}
          >
            <span className="hidden sm:inline">🔋 </span>Storage
          </button>

          <button
            type="button"
            onClick={() => jumpToPhase(115)}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition-all text-center cursor-pointer touch-manipulation ${
              frameIndex >= 105
                ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-white shadow-xs'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}
          >
            <span className="hidden sm:inline">🔬 </span>X-Ray
          </button>
        </div>
      </div>
    </div>
  );
};
