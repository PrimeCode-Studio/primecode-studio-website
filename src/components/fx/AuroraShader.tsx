"use client";

import { useEffect, useRef } from "react";
import styles from "./AuroraShader.module.css";

/**
 * Custom WebGL backdrop — no three.js.
 *
 * Renders a domain-warped fBm noise field to a low-resolution canvas that CSS
 * scales up, plus a cursor-reactive light. Cheap (renders at ~0.55× device
 * pixels), pauses when off-screen or the tab is hidden, and falls back to a
 * static CSS gradient when WebGL is unavailable or reduced motion is set.
 */

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;

uniform float uTime;
uniform vec2  uRes;
uniform vec2  uMouse;
uniform float uIntensity;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p = rot * p * 2.02;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / uRes.y;

  float t = uTime * 0.055;

  vec2 q = vec2(
    fbm(p * 1.5 + vec2(0.0, t)),
    fbm(p * 1.5 + vec2(5.2, 1.3) - t)
  );
  vec2 r = vec2(
    fbm(p * 1.5 + 4.0 * q + vec2(1.7, 9.2) + t * 1.4),
    fbm(p * 1.5 + 4.0 * q + vec2(8.3, 2.8) - t * 1.1)
  );

  float f = fbm(p * 1.5 + 4.0 * r);

  vec3 c1 = vec3(0.024, 0.027, 0.043);
  vec3 c2 = vec3(0.129, 0.176, 0.478);
  vec3 c3 = vec3(0.357, 0.435, 1.0);
  vec3 c4 = vec3(0.133, 0.827, 0.933);

  vec3 col = mix(c1, c2, clamp(f * 1.6, 0.0, 1.0));
  col = mix(col, c3, clamp(length(q) * 0.85, 0.0, 1.0) * 0.72);
  col = mix(col, c4, clamp(r.x * r.x * 1.4, 0.0, 1.0) * 0.34);

  float d = distance(uv, uMouse);
  float halo = smoothstep(0.6, 0.0, d);
  col += halo * vec3(0.16, 0.2, 0.52) * 0.95;

  float vig = smoothstep(1.3, 0.15, length(p));
  col *= mix(0.5, 1.0, vig);
  col *= smoothstep(0.0, 0.42, uv.y);

  float grain = hash(gl_FragCoord.xy + fract(uTime) * 100.0) * 0.036;
  col += grain - 0.018;

  gl_FragColor = vec4(col * uIntensity, 1.0);
}
`;

export default function AuroraShader({
  className = "",
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });

    if (!gl || reduced) {
      host.dataset.fallback = "true";
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    const prog = gl.createProgram();

    if (!vs || !fs || !prog) {
      host.dataset.fallback = "true";
      return;
    }

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      host.dataset.fallback = "true";
      return;
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uInt = gl.getUniformLocation(prog, "uIntensity");

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    const SCALE = 0.55;

    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width * DPR * SCALE));
      h = Math.max(1, Math.floor(rect.height * DPR * SCALE));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const mouse = { x: 0.5, y: 0.62 };
    const target = { x: 0.5, y: 0.62 };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(host);

    let raf = 0;
    const start = performance.now();

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (!visible || document.hidden) return;

      mouse.x += (target.x - mouse.x) * 0.045;
      mouse.y += (target.y - mouse.y) * 0.045;

      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uRes, w, h);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uInt, intensity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [intensity]);

  return (
    <div
      ref={hostRef}
      className={`${styles.host} ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.fallback} />
    </div>
  );
}
