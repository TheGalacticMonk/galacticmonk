"use client";

/* Faithful React/Next port of the CodePen "Celestial Transmutation" by
   VoXelo (https://codepen.io/VoXelo/pen/yygKOVy) — a WebGL/Three.js scene of
   a morphing planet with orbit controls, bloom postprocessing, and custom
   GLSL noise shaders. The shader code below is copied verbatim from the pen;
   only the surrounding scaffolding (module structure, refs instead of
   getElementById, container-relative sizing instead of window/viewport
   sizing, and React lifecycle/cleanup) has been adapted. See
   CelestialTransmutation.module.css for the matching, scoped CSS (originally
   viewport-fixed, now positioned relative to this component's own
   container). */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import styles from "./CelestialTransmutation.module.css";

type Planet = {
  name: string;
  kicker: string;
  description: string;
  accentA: string;
  accentB: string;
};

const PLANETS: Planet[] = [
  {
    name: "Film/Video",
    kicker: "PHOTOGRAPHY IN MOTION",
    description:
      "Los Angeles film and video production from concept through directing, cinematography, editing, sound design, and color grading — for short films, events, brand stories, and documentary work.",
    accentA: "248, 118, 102",
    accentB: "108, 92, 224",
  },
  {
    name: "Photography",
    kicker: "PAUSING TIME",
    description:
      "Editorial portraits, headshots for actors and professionals, event photography, and product imagery shot on location or in studio, with monthly content retainers available.",
    accentA: "255, 212, 73",
    accentB: "248, 118, 102",
  },
  {
    name: "Audio",
    kicker: "FREQUENCY & VIBRATION",
    description:
      "Vocal recording, music mixing and mastering, audiobook production, film ADR, and streaming delivery — you sound major while independent.",
    accentA: "115, 158, 130",
    accentB: "245, 241, 232",
  },
  {
    name: "Digital",
    kicker: "DIVINE WI-FI",
    description:
      "Custom-coded web design, branding, UGC, and social media marketing. Your online presence is amplified. You become 1 of 1. Don't settle for cookiecutter end products from generic web agencies.",
    accentA: "245, 241, 232",
    accentB: "108, 92, 224",
  },
];

const TAU = Math.PI * 2;

const brandGLSL = `
    const vec3 BRAND_INK = vec3(0.0252, 0.0160, 0.0908);
    const vec3 BRAND_INK_DEEP = vec3(0.0103, 0.0070, 0.0395);
    const vec3 BRAND_GOLD = vec3(1.0, 0.6584, 0.0666);
    const vec3 BRAND_CORAL = vec3(0.9387, 0.1812, 0.1329);
    const vec3 BRAND_SAGE = vec3(0.1714, 0.3419, 0.2232);
    const vec3 BRAND_CREAM = vec3(0.9131, 0.8796, 0.8070);
    const vec3 BRAND_CREAM_DIM = vec3(0.5841, 0.5457, 0.7454);
    const vec3 BRAND_INDIGO = vec3(0.1500, 0.1070, 0.7454);
    const vec3 BRAND_INDIGO_DEEP = vec3(0.0284, 0.0194, 0.1221);
`;

const noiseGLSL = `
    ${brandGLSL}

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float saturate(float value) {
        return clamp(value, 0.0, 1.0);
    }

    vec2 safeNormalize(vec2 value) {
        return value * inversesqrt(max(dot(value, value), 1.0e-12));
    }

    vec3 safeNormalize(vec3 value) {
        return value * inversesqrt(max(dot(value, value), 1.0e-12));
    }

    float safeAtan(float y, float x) {
        bool nearOrigin = abs(x) + abs(y) < 1.0e-7;
        return nearOrigin ? 0.0 : atan(y, x);
    }

    float sanitizeFloat(float value, float fallbackValue) {
        bool valid = value == value && abs(value) < 1.0e5;
        return valid ? value : fallbackValue;
    }

    vec3 sanitizeVec3(vec3 value, vec3 fallbackValue) {
        bool invalid = any(notEqual(value, value))
            || any(greaterThan(abs(value), vec3(1.0e5)));
        return invalid ? fallbackValue : value;
    }

    vec3 limitLuminance(vec3 color, float maximumLuminance) {
        vec3 safeColor = max(sanitizeVec3(color, vec3(0.0)), vec3(0.0));
        float luminance = dot(safeColor, vec3(0.2126, 0.7152, 0.0722));
        float scale = min(1.0, maximumLuminance / max(luminance, 1.0e-5));
        return safeColor * scale;
    }

    float snoise(vec3 v) {
        const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);
        vec4 p = permute(
            permute(
                permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0)
            )
            + i.x + vec4(0.0, i1.x, i2.x, 1.0)
        );

        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(
            dot(p0, p0),
            dot(p1, p1),
            dot(p2, p2),
            dot(p3, p3)
        ));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(
            dot(x0, x0),
            dot(x1, x1),
            dot(x2, x2),
            dot(x3, x3)
        ), 0.0);
        m *= m;
        return 42.0 * dot(
            m * m,
            vec4(
                dot(p0, x0),
                dot(p1, x1),
                dot(p2, x2),
                dot(p3, x3)
            )
        );
    }

    mat2 rotate2D(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
    }

    mat3 rotateX3(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat3(
            1.0, 0.0, 0.0,
            0.0, c, -s,
            0.0, s, c
        );
    }

    mat3 rotateZ3(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat3(
            c, -s, 0.0,
            s, c, 0.0,
            0.0, 0.0, 1.0
        );
    }
`;

const planetFunctionsGLSL = `
    const float PI = 3.141592653589793;
    const float TWO_PI = 6.283185307179586;

    float isPreset(float preset, float expected) {
        return 1.0 - step(0.5, abs(preset - expected));
    }

    vec3 aetheraPosition(vec3 seed, vec4 randomData, float time) {
        vec3 direction = safeNormalize(seed);
        float latitude = asin(clamp(direction.y, -1.0, 1.0));
        float continent = snoise(direction * 2.45 + vec3(0.0, time * 0.018, 0.0));
        float currentNoise = snoise(
            direction * 4.2
            + vec3(time * 0.045, -time * 0.018, time * 0.032)
        );
        float current = sin(
            latitude * 10.5
            + dot(direction, safeNormalize(vec3(0.74, 0.11, 0.66))) * 5.4
            + currentNoise * 1.35
            - time * 0.18
        );
        float radius = 2.08 + continent * 0.072 + current * 0.026;
        vec3 p = direction * radius;
        p.y *= 0.975;
        p.xz = rotate2D(sin(latitude * 3.0 + time * 0.08) * 0.018) * p.xz;
        return p;
    }

    vec3 pyraPosition(vec3 seed, vec4 randomData, float time) {
        vec3 direction = safeNormalize(seed);
        float terrain = snoise(direction * 3.4 + vec3(time * 0.012, 0.0, 0.0));
        float secondary = snoise(direction * 8.0 - vec3(0.0, time * 0.024, 0.0));
        float moltenLift = pow(max(secondary * 0.5 + 0.5, 0.0), 8.0);
        float radius = 2.08 + terrain * 0.125 + moltenLift * 0.090;
        return direction * radius;
    }

    vec3 orisonBodyPosition(vec3 seed, vec4 randomData, float time) {
        vec3 direction = safeNormalize(seed);
        float latitude = asin(clamp(direction.y, -1.0, 1.0));
        float bandNoise = snoise(
            direction * vec3(2.2, 5.8, 2.2)
            + vec3(time * 0.018, -time * 0.012, time * 0.014)
        );
        float band = sin(latitude * 18.0 + bandNoise * 1.8 + time * 0.06);
        float storm = snoise(
            direction * 4.15
            + vec3(-time * 0.021, time * 0.013, time * 0.026)
        );
        float radius = 2.07 + band * 0.020 + storm * 0.038;
        vec3 p = direction * radius;
        p.y *= 0.945;
        return p;
    }

    vec3 orisonRingPosition(vec3 seed, vec4 randomData, float time) {
        float radius = mix(2.18, 3.62, pow(randomData.x, 0.74));
        float angle = randomData.y * TWO_PI + time * (0.018 + randomData.w * 0.012);
        float lane = floor(randomData.z * 11.0) / 11.0;
        float gap = 0.92 + 0.08 * sin(lane * 71.0 + randomData.w * 16.0);
        radius *= gap;
        float vertical = (randomData.z - 0.5) * 0.115;
        vertical += snoise(vec3(cos(angle) * 2.1, sin(angle) * 2.1, radius * 1.7)) * 0.035;
        vec3 p = vec3(cos(angle) * radius, vertical, sin(angle) * radius);
        p = rotateZ3(0.34) * rotateX3(0.20) * p;
        return p;
    }

    vec3 vesperPosition(vec3 seed, vec4 randomData, float time) {
        vec3 direction = safeNormalize(seed);
        vec3 stepped = floor(direction * 7.0 + 0.5) / 7.0;
        vec3 facetedDirection = safeNormalize(mix(direction, stepped, 0.68));
        float cell = snoise(facetedDirection * 4.8);
        vec3 axisA = safeNormalize(vec3(0.82, 0.31, 0.48));
        vec3 axisB = safeNormalize(vec3(-0.24, 0.91, 0.34));
        vec3 axisC = safeNormalize(vec3(0.41, -0.17, 0.90));
        float lattice =
            sin(dot(facetedDirection, axisA) * 18.0)
            * sin(dot(facetedDirection, axisB) * 16.0)
            * sin(dot(facetedDirection, axisC) * 14.0);
        float seam = pow(abs(lattice), 5.5);
        float radius = 2.06 + cell * 0.145 + seam * 0.070;
        vec3 p = facetedDirection * radius;
        p.y *= 1.018;
        return p;
    }

    vec3 planetPosition(
        float preset,
        vec3 seed,
        vec4 randomData,
        float kind,
        float time
    ) {
        if (preset < 0.5) return aetheraPosition(seed, randomData, time);
        if (preset < 1.5) return pyraPosition(seed, randomData, time);
        if (preset < 2.5) {
            return kind > 0.5
                ? orisonRingPosition(seed, randomData, time)
                : orisonBodyPosition(seed, randomData, time);
        }
        return vesperPosition(seed, randomData, time);
    }

    vec3 aetheraColor(vec3 p, vec3 seed, vec4 randomData, float time) {
        vec3 direction = safeNormalize(seed);
        float latitude = asin(clamp(direction.y, -1.0, 1.0));
        float current = snoise(
            direction * 3.65
            + vec3(-time * 0.055, time * 0.025, time * 0.04)
        );
        float ribbonNoise = snoise(
            direction * 6.8
            + vec3(time * 0.025, -time * 0.06, time * 0.015)
        );
        float auroraWave = sin(
            latitude * 8.2
            + dot(direction, safeNormalize(vec3(0.71, -0.08, 0.70))) * 7.1
            + ribbonNoise * 1.8
            - time * 0.35
        );
        float aurora = pow(max(0.0, auroraWave), 5.0);
        float polar = smoothstep(0.48, 0.93, abs(direction.y));
        vec3 abyss = BRAND_INK_DEEP;
        vec3 ocean = mix(BRAND_INK, BRAND_INDIGO, 0.72);
        vec3 coralGlow = BRAND_CORAL * 1.08;
        vec3 goldGlow = BRAND_GOLD * 0.92;
        vec3 color = mix(abyss, ocean, current * 0.5 + 0.5);
        color = mix(color, coralGlow, smoothstep(0.22, 0.80, current) * 0.55);
        color += mix(coralGlow, goldGlow, polar) * aurora * (0.28 + polar * 0.62);
        color += mix(BRAND_INDIGO_DEEP, BRAND_CREAM_DIM, 0.20)
            * pow(max(0.0, snoise(direction * 9.0)), 5.0);
        return limitLuminance(color, 1.38);
    }

    vec3 pyraColor(vec3 p, vec3 seed, vec4 randomData, float time) {
        vec3 direction = safeNormalize(seed);
        float crust = snoise(direction * 3.2 + vec3(time * 0.018, 0.0, 0.0));
        float detail = abs(snoise(direction * 9.5 - vec3(0.0, time * 0.05, 0.0)));
        float crack = 1.0 - smoothstep(0.035, 0.18, detail);
        crack *= smoothstep(-0.32, 0.5, crust);
        float ember = pow(max(0.0, snoise(direction * 17.0 + time * 0.08)), 7.0);
        vec3 charcoal = mix(
            BRAND_INK_DEEP,
            mix(BRAND_INK, BRAND_CORAL, 0.15),
            crust * 0.5 + 0.5
        );
        vec3 molten = mix(BRAND_CORAL * 1.08, BRAND_GOLD * 1.18, crack);
        vec3 color = charcoal;
        color += molten * crack * 1.58;
        color += BRAND_CORAL * 1.10 * ember * 0.72;
        return limitLuminance(color, 1.70);
    }

    vec3 orisonColor(vec3 p, vec3 seed, vec4 randomData, float kind, float time) {
        if (kind > 0.5) {
            float ringRadius = length(p.xz);
            float lane = sin(ringRadius * 27.0 + randomData.w * 7.0);
            float dust = snoise(vec3(
                cos(randomData.y * TWO_PI) * 2.2,
                sin(randomData.y * TWO_PI) * 2.2,
                ringRadius * 3.7
            ));
            vec3 antiqueGold = BRAND_GOLD * 0.98;
            vec3 mineralSage = BRAND_SAGE * 1.05;
            vec3 deepIndigo = BRAND_INDIGO_DEEP;
            vec3 color = mix(antiqueGold, mineralSage, lane * 0.5 + 0.5);
            color = mix(color, deepIndigo, smoothstep(0.50, 0.88, dust) * 0.42);
            return limitLuminance(color, 1.12);
        }

        vec3 direction = safeNormalize(seed);
        float latitude = asin(clamp(direction.y, -1.0, 1.0));
        float latitudeMask = abs(latitude) / (PI * 0.5);
        float broadFlow = snoise(
            direction * 2.45
            + vec3(time * 0.014, -time * 0.01, time * 0.018)
        );
        float fineFlow = snoise(
            direction * 7.2
            + vec3(-time * 0.032, time * 0.012, time * 0.024)
        );
        float band = sin(latitude * 18.0 + broadFlow * 2.4 + fineFlow * 0.55 + time * 0.045);
        float storm = snoise(
            direction * 4.3
            + vec3(time * 0.025, time * 0.012, -time * 0.018)
        );
        float stormCell = smoothstep(0.34, 0.88, storm)
            * (1.0 - smoothstep(0.72, 1.0, latitudeMask));

        vec3 midnight = BRAND_INK_DEEP;
        vec3 sageShadow = mix(BRAND_INK, BRAND_SAGE, 0.66);
        vec3 pearl = BRAND_CREAM * 0.90;
        vec3 deepSage = mix(BRAND_INK_DEEP, BRAND_SAGE, 0.48);
        vec3 sageStorm = BRAND_SAGE * 1.15;

        float brightBand = smoothstep(-0.30, 0.88, band);
        vec3 color = mix(midnight, sageShadow, broadFlow * 0.5 + 0.5);
        color = mix(color, pearl, brightBand * 0.48);
        color = mix(color, deepSage, smoothstep(0.06, 0.74, fineFlow) * 0.62);
        color += sageStorm * stormCell * 0.62;
        color *= mix(1.0, 0.78, smoothstep(0.65, 1.0, latitudeMask));
        return limitLuminance(color, 1.32);
    }

    vec3 vesperColor(vec3 p, vec3 seed, vec4 randomData, float time) {
        vec3 direction = safeNormalize(seed);
        float facet = floor((snoise(direction * 4.7) * 0.5 + 0.5) * 7.0) / 7.0;
        float polar = smoothstep(0.48, 0.96, abs(direction.y));
        float seamNoise = abs(snoise(direction * 10.0 + vec3(0.0, time * 0.025, 0.0)));
        float seam = 1.0 - smoothstep(0.025, 0.14, seamNoise);
        vec3 night = BRAND_INK_DEEP;
        vec3 indigoMineral = BRAND_INDIGO_DEEP * 1.05;
        vec3 amethyst = BRAND_INDIGO * 1.18;
        vec3 seamLight = BRAND_CREAM * 1.12;
        vec3 color = mix(night, indigoMineral, facet);
        color = mix(color, amethyst, smoothstep(0.60, 0.96, facet) * 0.72);
        color += seamLight * seam * (0.38 + polar * 1.15);
        color += seamLight * pow(polar, 5.0) * 0.50;
        return limitLuminance(color, 1.56);
    }

    vec3 planetColor(
        float preset,
        vec3 p,
        vec3 seed,
        vec4 randomData,
        float kind,
        float time
    ) {
        if (preset < 0.5) return aetheraColor(p, seed, randomData, time);
        if (preset < 1.5) return pyraColor(p, seed, randomData, time);
        if (preset < 2.5) return orisonColor(p, seed, randomData, kind, time);
        return vesperColor(p, seed, randomData, time);
    }
`;

export default function CelestialTransmutation() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const interactionSurfaceRef = useRef<HTMLDivElement>(null);
  const planetNameRef = useRef<HTMLHeadingElement>(null);
  const planetKickerRef = useRef<HTMLDivElement>(null);
  const planetDescriptionRef = useRef<HTMLParagraphElement>(null);
  const transitionMeterRef = useRef<HTMLDivElement>(null);
  const transitionMeterFillRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const container = canvasContainerRef.current;
    const interactionSurface = interactionSurfaceRef.current;
    const planetName = planetNameRef.current;
    const planetKicker = planetKickerRef.current;
    const planetDescription = planetDescriptionRef.current;
    const transitionMeter = transitionMeterRef.current;
    const transitionMeterFill = transitionMeterFillRef.current;
    const planetButtons = buttonRefs.current.filter(
      (button): button is HTMLButtonElement => button !== null
    );

    if (
      !stage ||
      !container ||
      !interactionSurface ||
      !planetName ||
      !planetKicker ||
      !planetDescription ||
      !transitionMeter ||
      !transitionMeterFill ||
      planetButtons.length !== PLANETS.length
    ) {
      return;
    }

    const isCompact = window.matchMedia("(max-width: 760px)").matches;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = reducedMotionQuery.matches;

    // Everything below reads window.innerWidth/innerHeight in the original
    // (fullscreen) pen. Here it reads the container's own box instead, since
    // this scene now lives inside a section rather than covering the
    // viewport.
    function getContainerSize() {
      const rect = container!.getBoundingClientRect();
      return {
        width: Math.max(1, Math.round(rect.width)),
        height: Math.max(1, Math.round(rect.height)),
      };
    }

    function getStageSize() {
      const rect = stage!.getBoundingClientRect();
      return {
        width: Math.max(1, Math.round(rect.width)),
        height: Math.max(1, Math.round(rect.height)),
      };
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    function responsivePixelRatio() {
      const cap = isCompact ? 1.25 : 1.5;
      return Math.min(window.devicePixelRatio || 1, cap);
    }

    function responsiveCameraDistance() {
      const stageSize = getStageSize();
      const stageAspect = stageSize.width / stageSize.height;

      return stageAspect < 0.66 ? 10.6 : stageAspect < 0.95 ? 9.55 : 8.55;
    }

    function responsiveCameraFov() {
      const stageSize = getStageSize();
      const containerSize = getContainerSize();
      const overscanScale = containerSize.height / stageSize.height;
      const baseHalfFov = THREE.MathUtils.degToRad(39 / 2);

      // Keep the original stage crop and apparent planet size while giving
      // bloom and stars a larger transparent render target around it.
      return THREE.MathUtils.radToDeg(
        2 * Math.atan(Math.tan(baseHalfFov) * overscanScale)
      );
    }

    const initialSize = getContainerSize();
    renderer.setPixelRatio(responsivePixelRatio());
    renderer.setSize(initialSize.width, initialSize.height);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      responsiveCameraFov(),
      initialSize.width / initialSize.height,
      0.08,
      90
    );
    camera.position.set(0, 0.25, responsiveCameraDistance());

    const controls = new OrbitControls(camera, interactionSurface);
    controls.enableDamping = !prefersReducedMotion;
    controls.dampingFactor = 0.045;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI * 0.16;
    controls.maxPolarAngle = Math.PI * 0.84;
    controls.autoRotate = false;
    controls.target.set(0, 0.02, 0);
    controls.update();

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(initialSize.width, initialSize.height),
      0.42,
      0.28,
      0.62
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    const starCount = isCompact ? 4800 : 8200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starSeeds = new Float32Array(starCount);

    for (let i = 0; i < starCount; i += 1) {
      const radius = THREE.MathUtils.lerp(12, 43, Math.pow(Math.random(), 0.62));
      const y = THREE.MathUtils.randFloatSpread(2);
      const theta = Math.random() * TAU;
      const radial = Math.sqrt(Math.max(0, 1 - y * y));

      starPositions[i * 3] = Math.cos(theta) * radial * radius;
      starPositions[i * 3 + 1] = y * radius;
      starPositions[i * 3 + 2] = Math.sin(theta) * radial * radius;
      starSizes[i] = 0.65 + Math.pow(Math.random(), 5) * 4.4;
      starSeeds[i] = Math.random();
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("aSize", new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute("aSeed", new THREE.BufferAttribute(starSeeds, 1));

    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uTransitionEnergy: { value: 0 },
      },
      vertexShader: `
        ${brandGLSL}

        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uTransitionEnergy;
        attribute float aSize;
        attribute float aSeed;
        varying float vAlpha;
        varying vec3 vColor;

        void main() {
            vec3 p = position;
            float drift = uTime * (0.003 + aSeed * 0.004);
            float s = sin(drift);
            float c = cos(drift);
            p.xz = mat2(c, -s, s, c) * p.xz;

            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = aSize * uPixelRatio * (18.0 / max(1.0, -mvPosition.z));
            gl_PointSize *= 1.0 + uTransitionEnergy * (0.08 + aSeed * 0.10);

            float twinkle = 0.55 + 0.45 * sin(uTime * (0.8 + aSeed * 2.0) + aSeed * 31.0);
            vAlpha = (0.18 + aSeed * 0.58) * twinkle * (1.0 - uTransitionEnergy * 0.42);
            vColor = mix(BRAND_CREAM_DIM, BRAND_GOLD, aSeed * aSeed);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying vec3 vColor;

        void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float distanceToCenter = length(uv);
            if (distanceToCenter > 0.5) discard;
            float core = exp(-distanceToCenter * 12.0);
            float glow = exp(-distanceToCenter * 4.5) * 0.3;
            gl_FragColor = vec4(vColor * (core + glow), vAlpha * (core + glow));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const planetGroup = new THREE.Group();
    planetGroup.rotation.z = -0.055;
    scene.add(planetGroup);

    const surfaceGeometry = new THREE.IcosahedronGeometry(1, isCompact ? 5 : 6);

    const sharedPlanetUniforms = {
      uTime: { value: 0 },
      uFromPreset: { value: 0 },
      uToPreset: { value: 0 },
      uTransition: { value: 0 },
      uTransitionEnergy: { value: 0 },
    };

    const surfaceMaterial = new THREE.ShaderMaterial({
      uniforms: sharedPlanetUniforms,
      vertexShader: `
        ${noiseGLSL}
        ${planetFunctionsGLSL}

        uniform float uTime;
        uniform float uFromPreset;
        uniform float uToPreset;
        uniform float uTransition;
        uniform float uTransitionEnergy;

        varying vec3 vWorldPosition;
        varying vec3 vObjectPosition;
        varying vec3 vSeed;
        varying vec3 vNormalApprox;
        varying float vLocalMorph;
        varying float vScanFront;
        varying float vSweepCoordinate;

        float phaseCoordinate(vec3 seed, float time) {
            vec3 axisA = safeNormalize(vec3(0.82, 0.25, 0.52));
            vec3 axisB = safeNormalize(vec3(-0.18, 0.93, 0.32));
            float coordinate = dot(seed, axisA);
            coordinate += sin(dot(seed, axisB) * 6.2 - time * 0.72) * 0.055;
            coordinate += snoise(seed * 3.4 + vec3(0.0, time * 0.10, 0.0)) * 0.035;
            return coordinate;
        }

        void main() {
            vec3 seed = safeNormalize(position);
            vec4 randomData = vec4(
                fract(sin(dot(seed.xy, vec2(12.9898, 78.233))) * 43758.5453),
                fract(sin(dot(seed.yz, vec2(39.3468, 11.135))) * 24634.6345),
                fract(sin(dot(seed.zx, vec2(73.156, 52.235))) * 56445.234),
                fract(sin(dot(seed.xyz, vec3(19.19, 7.17, 41.73))) * 9531.317)
            );

            vec3 fromPosition = sanitizeVec3(
                planetPosition(uFromPreset, seed, randomData, 0.0, uTime),
                seed * 2.08
            );
            vec3 toPosition = sanitizeVec3(
                planetPosition(uToPreset, seed, randomData, 0.0, uTime),
                seed * 2.08
            );

            float coordinate = phaseCoordinate(seed, uTime);
            float scanPosition = mix(-1.24, 1.24, uTransition);
            float scanWidth = 0.115;
            float localMorph = 1.0 - smoothstep(
                scanPosition - scanWidth,
                scanPosition + scanWidth,
                coordinate
            );
            float front = exp(-abs(coordinate - scanPosition) * 19.0);
            float coreFront = exp(-abs(coordinate - scanPosition) * 42.0);

            vec3 objectPosition = mix(fromPosition, toPosition, localMorph);
            vec3 normalDirection = safeNormalize(objectPosition);
            vec3 phaseAxis = safeNormalize(vec3(0.82, 0.25, 0.52));
            vec3 tangent = safeNormalize(cross(normalDirection, phaseAxis + vec3(0.001, 0.002, 0.003)));
            float ripple = sin(
                dot(seed, safeNormalize(vec3(-0.31, 0.79, 0.53))) * 22.0
                - uTime * 5.2
            );
            objectPosition += normalDirection * front * (0.052 + ripple * 0.022);
            objectPosition += tangent * coreFront * ripple * 0.028;
            objectPosition = sanitizeVec3(objectPosition, seed * 2.08);

            vec4 worldPosition = modelMatrix * vec4(objectPosition, 1.0);
            gl_Position = projectionMatrix * viewMatrix * worldPosition;

            vWorldPosition = worldPosition.xyz;
            vObjectPosition = objectPosition;
            vSeed = seed;
            vNormalApprox = safeNormalize(mat3(modelMatrix) * objectPosition);
            vLocalMorph = localMorph;
            vScanFront = front;
            vSweepCoordinate = coordinate;
        }
      `,
      fragmentShader: `
        ${noiseGLSL}
        ${planetFunctionsGLSL}

        uniform float uTime;
        uniform float uFromPreset;
        uniform float uToPreset;
        uniform float uTransition;
        uniform float uTransitionEnergy;

        varying vec3 vWorldPosition;
        varying vec3 vObjectPosition;
        varying vec3 vSeed;
        varying vec3 vNormalApprox;
        varying float vLocalMorph;
        varying float vScanFront;
        varying float vSweepCoordinate;

        void main() {
            vec4 randomData = vec4(
                fract(sin(dot(vSeed.xy, vec2(12.9898, 78.233))) * 43758.5453),
                fract(sin(dot(vSeed.yz, vec2(39.3468, 11.135))) * 24634.6345),
                fract(sin(dot(vSeed.zx, vec2(73.156, 52.235))) * 56445.234),
                fract(sin(dot(vSeed.xyz, vec3(19.19, 7.17, 41.73))) * 9531.317)
            );

            vec3 fromColor = planetColor(
                uFromPreset, vObjectPosition, vSeed, randomData, 0.0, uTime
            );
            vec3 toColor = planetColor(
                uToPreset, vObjectPosition, vSeed, randomData, 0.0, uTime
            );
            vec3 baseColor = mix(fromColor, toColor, vLocalMorph);

            vec3 normal = safeNormalize(vNormalApprox);
            vec3 viewDirection = safeNormalize(cameraPosition - vWorldPosition);
            vec3 keyDirection = safeNormalize(vec3(-0.70, 0.55, 0.85));
            vec3 rimDirection = safeNormalize(vec3(0.65, -0.25, -0.70));

            float ndl = dot(normal, keyDirection);
            float diffuse = saturate(ndl);
            float backLight = saturate(dot(normal, rimDirection));
            float facing = saturate(dot(normal, viewDirection));
            float fresnel = pow(max(1.0 - facing, 0.0), 3.0);
            float terminator = smoothstep(-0.34, 0.56, ndl);

            vec3 color = baseColor * (0.24 + diffuse * 1.04);
            color *= mix(0.46, 1.0, terminator);
            color += baseColor * backLight * 0.17;
            color += mix(BRAND_INDIGO * 1.15, baseColor, 0.46) * fresnel * 0.66;

            float micro = snoise(vSeed * 24.0 + vec3(0.0, uTime * 0.02, 0.0));
            color += baseColor * micro * 0.060;

            float thinCore = pow(clamp(vScanFront, 0.0, 1.0), 3.4);
            float paletteMix = smoothstep(-0.78, 0.78, vSweepCoordinate);
            vec3 phaseGold = BRAND_GOLD * 1.15;
            vec3 phaseCoral = BRAND_CORAL * 1.10;
            vec3 phaseIndigo = BRAND_INDIGO * 1.25;
            vec3 phaseColor = paletteMix < 0.5
                ? mix(phaseGold, phaseCoral, paletteMix * 2.0)
                : mix(phaseCoral, phaseIndigo, (paletteMix - 0.5) * 2.0);
            color = mix(color, phaseColor, vScanFront * 0.38);
            color += phaseColor * thinCore * 0.32;

            float separation = exp(-abs(vScanFront - 0.72) * 22.0) * 0.10;
            color *= 1.0 - separation;

            color = limitLuminance(color, 1.76);
            color = clamp(color, vec3(0.0), vec3(2.0));
            gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: false,
      depthWrite: true,
      depthTest: true,
      side: THREE.FrontSide,
    });

    const surfaceMesh = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    surfaceMesh.renderOrder = 2;
    planetGroup.add(surfaceMesh);

    const particleCount = isCompact ? 46000 : 78000;
    const particleGeometry = new THREE.BufferGeometry();
    const particleSeeds = new Float32Array(particleCount * 3);
    const particleRandom = new Float32Array(particleCount * 4);
    const particleKind = new Float32Array(particleCount);
    const particleLayer = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i += 1) {
      const y = THREE.MathUtils.randFloatSpread(2);
      const angle = Math.random() * TAU;
      const radial = Math.sqrt(Math.max(0, 1 - y * y));

      particleSeeds[i * 3] = Math.cos(angle) * radial;
      particleSeeds[i * 3 + 1] = y;
      particleSeeds[i * 3 + 2] = Math.sin(angle) * radial;

      particleRandom[i * 4] = Math.random();
      particleRandom[i * 4 + 1] = Math.random();
      particleRandom[i * 4 + 2] = Math.random();
      particleRandom[i * 4 + 3] = Math.random();

      particleLayer[i] = 0.075 + Math.pow(Math.random(), 1 / 3) * 0.925;
      particleKind[i] = Math.random() < 0.24 ? 1 : 0;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particleSeeds, 3));
    particleGeometry.setAttribute("aRandom", new THREE.BufferAttribute(particleRandom, 4));
    particleGeometry.setAttribute("aKind", new THREE.BufferAttribute(particleKind, 1));
    particleGeometry.setAttribute("aLayer", new THREE.BufferAttribute(particleLayer, 1));
    particleGeometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8.0);

    const particleUniforms = {
      ...sharedPlanetUniforms,
      uPixelRatio: { value: renderer.getPixelRatio() },
      uPointScale: { value: isCompact ? 0.92 : 1.0 },
    };

    const volumetricVertexShader = `
        ${noiseGLSL}
        ${planetFunctionsGLSL}

        uniform float uTime;
        uniform float uFromPreset;
        uniform float uToPreset;
        uniform float uTransition;
        uniform float uTransitionEnergy;
        uniform float uPixelRatio;
        uniform float uPointScale;

        attribute vec4 aRandom;
        attribute float aKind;
        attribute float aLayer;

        varying vec3 vColor;
        varying float vAlpha;
        varying float vCore;
        varying float vEnergy;
        varying float vRibbon;

        float phaseCoordinate(vec3 seed, float time) {
            vec3 axisA = safeNormalize(vec3(0.82, 0.25, 0.52));
            vec3 axisB = safeNormalize(vec3(-0.18, 0.93, 0.32));
            float coordinate = dot(seed, axisA);
            coordinate += sin(dot(seed, axisB) * 6.2 - time * 0.72) * 0.055;
            coordinate += snoise(seed * 3.4 + vec3(0.0, time * 0.10, 0.0)) * 0.035;
            return coordinate;
        }

        void main() {
            vec3 seed = safeNormalize(position);
            vec3 fromSurface = sanitizeVec3(
                planetPosition(uFromPreset, seed, aRandom, aKind, uTime),
                seed * 2.08
            );
            vec3 toSurface = sanitizeVec3(
                planetPosition(uToPreset, seed, aRandom, aKind, uTime),
                seed * 2.08
            );

            float fromRing = isPreset(uFromPreset, 2.0) * step(0.5, aKind);
            float toRing = isPreset(uToPreset, 2.0) * step(0.5, aKind);
            vec3 fromMatter = mix(fromSurface * mix(0.54, 1.0, aLayer), fromSurface, fromRing);
            vec3 toMatter = mix(toSurface * mix(0.54, 1.0, aLayer), toSurface, toRing);

            float delayedTransition = clamp(uTransition + (aRandom.w - 0.5) * 0.10, 0.0, 1.0);
            float coordinate = phaseCoordinate(seed, uTime);
            float scanPosition = mix(-1.24, 1.24, delayedTransition);
            float localMorph = 1.0 - smoothstep(
                scanPosition - 0.13,
                scanPosition + 0.13,
                coordinate
            );
            float front = exp(-abs(coordinate - scanPosition) * 15.5);
            float coreFront = exp(-abs(coordinate - scanPosition) * 34.0);

            vec3 objectPosition = mix(fromMatter, toMatter, localMorph);
            vec3 normalDirection = safeNormalize(objectPosition);
            vec3 phaseAxis = safeNormalize(vec3(0.82, 0.25, 0.52));
            vec3 tangent = safeNormalize(cross(normalDirection, phaseAxis + vec3(0.001, 0.002, 0.003)));
            float handedness = mix(-1.0, 1.0, step(0.5, aRandom.z));
            float flutter = sin(
                dot(seed, safeNormalize(vec3(-0.31, 0.79, 0.53))) * (16.0 + aRandom.x * 12.0)
                - uTime * (4.0 + aRandom.y * 3.0)
            );
            objectPosition += normalDirection * front * (0.05 + aRandom.x * 0.24);
            objectPosition += tangent * handedness * front * flutter * (0.035 + aRandom.y * 0.16);
            objectPosition = sanitizeVec3(objectPosition, mix(fromMatter, toMatter, localMorph));

            vec4 mvPosition = modelViewMatrix * vec4(objectPosition, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            float distanceScale = 30.0 / max(1.0, -mvPosition.z);
            gl_PointSize = (0.72 + aRandom.x * 1.65 + coreFront * 0.70)
                * distanceScale * uPixelRatio * uPointScale;

            vec3 fromColor = planetColor(
                uFromPreset, fromSurface, seed, aRandom, aKind, uTime
            );
            vec3 toColor = planetColor(
                uToPreset, toSurface, seed, aRandom, aKind, uTime
            );
            vec3 baseColor = mix(fromColor, toColor, localMorph);
            vec3 phaseGold = BRAND_GOLD * 1.15;
            vec3 phaseCoral = BRAND_CORAL * 1.10;
            vec3 phaseIndigo = BRAND_INDIGO * 1.25;
            vec3 phaseColor = aRandom.z < 0.60
                ? mix(phaseGold, phaseCoral, aRandom.z / 0.60)
                : mix(phaseCoral, phaseIndigo, (aRandom.z - 0.60) / 0.40);
            vec3 color = mix(baseColor, phaseColor, 0.62 + coreFront * 0.18);
            color = limitLuminance(color, 1.42);

            vColor = clamp(sanitizeVec3(color, vec3(0.0)), vec3(0.0), vec3(1.60));
            vAlpha = clamp(front * (0.026 + aRandom.w * 0.105), 0.0, 0.14);
            vCore = 0.12 + coreFront * 0.24;
            vEnergy = clamp(uTransitionEnergy, 0.0, 1.0);
            vRibbon = coreFront;
        }
    `;

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: particleUniforms,
      vertexShader: volumetricVertexShader,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vCore;
        varying float vEnergy;
        varying float vRibbon;

        void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float distanceToCenter = length(uv);
            if (distanceToCenter > 0.5) discard;

            float softGlow = exp(-distanceToCenter * mix(9.4, 7.2, vEnergy));
            float core = (1.0 - smoothstep(0.0, 0.25, distanceToCenter)) * vCore;
            float alpha = vAlpha * (softGlow * 0.76 + core * 0.30);
            vec3 color = vColor * (softGlow * (0.88 + vRibbon * 0.12) + core * 0.42);
            gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.19));
        }
      `,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
      depthTest: true,
    });

    const planetParticles = new THREE.Points(particleGeometry, particleMaterial);
    planetParticles.renderOrder = 4;
    planetParticles.visible = false;
    planetGroup.add(planetParticles);

    const filamentCount = isCompact ? 4200 : 7600;
    const filamentGeometry = new THREE.BufferGeometry();
    const filamentSeeds = new Float32Array(filamentCount * 3);
    const filamentRandom = new Float32Array(filamentCount * 4);
    const filamentLayer = new Float32Array(filamentCount);
    const filamentKind = new Float32Array(filamentCount);

    for (let i = 0; i < filamentCount; i += 1) {
      const y = THREE.MathUtils.randFloatSpread(2);
      const angle = Math.random() * TAU;
      const radial = Math.sqrt(Math.max(0, 1 - y * y));
      filamentSeeds[i * 3] = Math.cos(angle) * radial;
      filamentSeeds[i * 3 + 1] = y;
      filamentSeeds[i * 3 + 2] = Math.sin(angle) * radial;
      filamentRandom[i * 4] = Math.random();
      filamentRandom[i * 4 + 1] = Math.random();
      filamentRandom[i * 4 + 2] = Math.random();
      filamentRandom[i * 4 + 3] = Math.random();
      filamentLayer[i] = 0.08 + Math.pow(Math.random(), 1 / 3) * 0.92;
      filamentKind[i] = Math.random() < 0.22 ? 1 : 0;
    }

    filamentGeometry.setAttribute("position", new THREE.BufferAttribute(filamentSeeds, 3));
    filamentGeometry.setAttribute("aRandom", new THREE.BufferAttribute(filamentRandom, 4));
    filamentGeometry.setAttribute("aLayer", new THREE.BufferAttribute(filamentLayer, 1));
    filamentGeometry.setAttribute("aKind", new THREE.BufferAttribute(filamentKind, 1));
    filamentGeometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8.0);

    const filamentUniforms = {
      ...sharedPlanetUniforms,
      uPixelRatio: { value: renderer.getPixelRatio() },
    };

    const filamentMaterial = new THREE.ShaderMaterial({
      uniforms: filamentUniforms,
      vertexShader: `
        ${noiseGLSL}
        ${planetFunctionsGLSL}

        uniform float uTime;
        uniform float uFromPreset;
        uniform float uToPreset;
        uniform float uTransition;
        uniform float uTransitionEnergy;
        uniform float uPixelRatio;

        attribute vec4 aRandom;
        attribute float aLayer;
        attribute float aKind;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vPulse;

        float phaseCoordinate(vec3 seed, float time) {
            vec3 axisA = safeNormalize(vec3(0.82, 0.25, 0.52));
            vec3 axisB = safeNormalize(vec3(-0.18, 0.93, 0.32));
            float coordinate = dot(seed, axisA);
            coordinate += sin(dot(seed, axisB) * 6.2 - time * 0.72) * 0.055;
            coordinate += snoise(seed * 3.4 + vec3(0.0, time * 0.10, 0.0)) * 0.035;
            return coordinate;
        }

        void main() {
            vec3 seed = safeNormalize(position);
            vec3 fromSurface = planetPosition(uFromPreset, seed, aRandom, aKind, uTime);
            vec3 toSurface = planetPosition(uToPreset, seed, aRandom, aKind, uTime);
            float fromRing = isPreset(uFromPreset, 2.0) * step(0.5, aKind);
            float toRing = isPreset(uToPreset, 2.0) * step(0.5, aKind);
            vec3 fromMatter = mix(fromSurface * mix(0.72, 1.0, aLayer), fromSurface, fromRing);
            vec3 toMatter = mix(toSurface * mix(0.72, 1.0, aLayer), toSurface, toRing);

            float delayedTransition = clamp(uTransition + (aRandom.w - 0.5) * 0.075, 0.0, 1.0);
            float coordinate = phaseCoordinate(seed, uTime);
            float scanPosition = mix(-1.24, 1.24, delayedTransition);
            float localMorph = 1.0 - smoothstep(scanPosition - 0.10, scanPosition + 0.10, coordinate);
            float front = exp(-abs(coordinate - scanPosition) * 28.0);

            vec3 p = mix(fromMatter, toMatter, localMorph);
            vec3 normalDirection = safeNormalize(p);
            vec3 phaseAxis = safeNormalize(vec3(0.82, 0.25, 0.52));
            vec3 tangent = safeNormalize(cross(normalDirection, phaseAxis + vec3(0.002, 0.001, 0.003)));
            float ray = step(0.73, aRandom.w);
            float pulse = front * ray;
            float wave = sin(aRandom.x * 22.0 + uTime * (5.0 + aRandom.y * 2.0));
            p += normalDirection * pulse * (0.10 + aRandom.x * 0.42);
            p += tangent * pulse * wave * (0.08 + aRandom.y * 0.24);

            vec4 mvPosition = modelViewMatrix * vec4(sanitizeVec3(p, mix(fromMatter, toMatter, localMorph)), 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = (0.62 + aRandom.x * 1.45 + pulse * 0.80)
                * uPixelRatio * (29.0 / max(1.0, -mvPosition.z));

            vec3 gold = BRAND_GOLD * 1.15;
            vec3 coral = BRAND_CORAL * 1.10;
            vec3 indigo = BRAND_INDIGO * 1.25;
            vColor = aRandom.z < 0.56
                ? mix(gold, coral, aRandom.z / 0.56)
                : mix(coral, indigo, (aRandom.z - 0.56) / 0.44);
            vAlpha = clamp(front * uTransitionEnergy * (0.012 + aRandom.w * 0.040), 0.0, 0.052);
            vPulse = pulse;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vPulse;
        void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            if (d > 0.5) discard;
            float core = exp(-d * 15.0);
            float glow = exp(-d * 8.2) * (0.12 + vPulse * 0.05);
            gl_FragColor = vec4(vColor * (core + glow), clamp(vAlpha * (core + glow), 0.0, 0.075));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
    });

    const transitionFilaments = new THREE.Points(filamentGeometry, filamentMaterial);
    transitionFilaments.renderOrder = 5;
    transitionFilaments.visible = false;
    planetGroup.add(transitionFilaments);

    const portalUniforms = {
      ...sharedPlanetUniforms,
      uTime: { value: 0 },
      uFromAccent: {
        value: new THREE.Color().setRGB(
          248 / 255,
          118 / 255,
          102 / 255,
          THREE.SRGBColorSpace
        ),
      },
      uToAccent: {
        value: new THREE.Color().setRGB(
          108 / 255,
          92 / 255,
          224 / 255,
          THREE.SRGBColorSpace
        ),
      },
    };

    const portalMaterial = new THREE.ShaderMaterial({
      uniforms: portalUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        ${brandGLSL}

        uniform float uTime;
        uniform float uTransition;
        uniform float uTransitionEnergy;
        uniform vec3 uFromAccent;
        uniform vec3 uToAccent;
        varying vec2 vUv;

        float ringLine(float radius, float target, float width) {
            return exp(-abs(radius - target) / max(width, 0.0001));
        }

        void main() {
            vec2 p = (vUv - 0.5) * 2.0;
            float radius = length(p);
            float angle = atan(p.y, p.x);
            float burst = exp(-pow((uTransition - 0.52) / 0.105, 2.0));
            float progress = smoothstep(0.37, 0.72, uTransition);
            float ringRadius = mix(0.18, 1.30, progress);
            float warpedRadius = ringRadius
                + sin(angle * 8.0 - uTime * 4.0) * 0.022
                + sin(angle * 3.0 + uTime * 2.4) * 0.014;
            float shock = ringLine(radius, warpedRadius, 0.017) * burst;
            float echo = ringLine(radius, warpedRadius * 0.72, 0.013) * burst * 0.42;
            float lens = exp(-radius * radius * 7.5) * burst;

            vec3 color = mix(uFromAccent, uToAccent, smoothstep(0.28, 0.74, uTransition));
            vec3 secondary = mix(
                BRAND_GOLD * 1.10,
                BRAND_INDIGO * 1.20,
                smoothstep(0.30, 0.70, uTransition)
            );
            vec3 finalColor = color * shock * 0.58;
            finalColor += secondary * echo * 0.34;
            finalColor += mix(color, secondary, 0.5) * lens * 0.055;

            float alpha = shock * 0.105 + echo * 0.055 + lens * 0.020;
            alpha *= 1.0 - smoothstep(1.40, 1.62, radius);
            if (alpha < 0.0015) discard;
            gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 0.12));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    });

    const portalPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5.6, 5.6, 1, 1),
      portalMaterial
    );
    portalPlane.renderOrder = 8;
    portalPlane.visible = false;
    scene.add(portalPlane);

    const atmosphereGeometry = new THREE.IcosahedronGeometry(1, isCompact ? 4 : 5);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: sharedPlanetUniforms,
      vertexShader: `
        ${noiseGLSL}
        ${planetFunctionsGLSL}

        uniform float uTime;
        uniform float uFromPreset;
        uniform float uToPreset;
        uniform float uTransition;
        uniform float uTransitionEnergy;

        varying vec3 vWorldPosition;
        varying vec3 vNormalApprox;
        varying float vLocalMorph;
        varying float vFront;

        float phaseCoordinate(vec3 seed, float time) {
            vec3 axisA = safeNormalize(vec3(0.82, 0.25, 0.52));
            vec3 axisB = safeNormalize(vec3(-0.18, 0.93, 0.32));
            float coordinate = dot(seed, axisA);
            coordinate += sin(dot(seed, axisB) * 6.2 - time * 0.72) * 0.055;
            coordinate += snoise(seed * 3.4 + vec3(0.0, time * 0.10, 0.0)) * 0.035;
            return coordinate;
        }

        void main() {
            vec3 seed = safeNormalize(position);
            vec4 randomData = vec4(0.17, 0.42, 0.73, 0.91);
            vec3 fromPosition = sanitizeVec3(
                planetPosition(uFromPreset, seed, randomData, 0.0, uTime),
                seed * 2.08
            );
            vec3 toPosition = sanitizeVec3(
                planetPosition(uToPreset, seed, randomData, 0.0, uTime),
                seed * 2.08
            );
            float coordinate = phaseCoordinate(seed, uTime);
            float scanPosition = mix(-1.24, 1.24, uTransition);
            float localMorph = 1.0 - smoothstep(scanPosition - 0.14, scanPosition + 0.14, coordinate);
            float front = exp(-abs(coordinate - scanPosition) * 17.0);
            vec3 objectPosition = mix(fromPosition, toPosition, localMorph) * 1.065;
            objectPosition = sanitizeVec3(objectPosition, seed * 2.20);

            vec4 worldPosition = modelMatrix * vec4(objectPosition, 1.0);
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
            vWorldPosition = worldPosition.xyz;
            vNormalApprox = safeNormalize(mat3(modelMatrix) * objectPosition);
            vLocalMorph = localMorph;
            vFront = front;
        }
      `,
      fragmentShader: `
        ${noiseGLSL}

        uniform float uFromPreset;
        uniform float uToPreset;
        uniform float uTransitionEnergy;

        varying vec3 vWorldPosition;
        varying vec3 vNormalApprox;
        varying float vLocalMorph;
        varying float vFront;

        vec3 atmosphereColor(float preset) {
            if (preset < 0.5) return BRAND_CORAL * 0.72;
            if (preset < 1.5) return BRAND_GOLD * 0.72;
            if (preset < 2.5) return BRAND_SAGE * 0.92;
            return mix(BRAND_INDIGO, BRAND_CREAM, 0.16) * 0.86;
        }

        void main() {
            vec3 normal = safeNormalize(vNormalApprox);
            vec3 viewDirection = safeNormalize(cameraPosition - vWorldPosition);
            float facing = saturate(dot(normal, viewDirection));
            float fresnel = pow(max(1.0 - facing, 0.0), 2.4);
            vec3 color = mix(
                atmosphereColor(uFromPreset),
                atmosphereColor(uToPreset),
                vLocalMorph
            );
            float phaseMix = clamp(vLocalMorph, 0.0, 1.0);
            vec3 phaseTint = phaseMix < 0.5
                ? mix(BRAND_GOLD * 1.15, BRAND_CORAL * 1.10, phaseMix * 2.0)
                : mix(
                    BRAND_CORAL * 1.10,
                    BRAND_INDIGO * 1.25,
                    (phaseMix - 0.5) * 2.0
                );
            color = mix(color, phaseTint, vFront * 0.28);
            float alpha = fresnel * (0.23 + vFront * 0.040);
            color = limitLuminance(color, 1.02);
            alpha = clamp(sanitizeFloat(alpha, 0.0), 0.0, 0.34);
            gl_FragColor = vec4(color * fresnel * 0.92, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });

    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphereMesh.renderOrder = 3;
    planetGroup.add(atmosphereMesh);

    const ringGeometry = new THREE.RingGeometry(2.16, 3.68, 320, 12);
    const ringMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ...sharedPlanetUniforms,
        uOpacity: { value: 0 },
      },
      vertexShader: `
        ${noiseGLSL}

        uniform float uTime;
        uniform float uTransitionEnergy;
        varying vec2 vLocal;
        varying float vNoise;

        void main() {
            vec3 p = position;
            float radius = length(p.xy);
            float angle = safeAtan(p.y, p.x);
            float warp = snoise(vec3(cos(angle), sin(angle), radius * 1.7 + uTime * 0.035));
            p.z += warp * 0.032;
            p.xy = rotate2D(uTime * 0.004) * p.xy;

            vLocal = p.xy;
            vNoise = warp;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        ${noiseGLSL}

        uniform float uTime;
        uniform float uOpacity;
        uniform float uTransitionEnergy;
        varying vec2 vLocal;
        varying float vNoise;

        void main() {
            float radius = length(vLocal);
            vec2 ringDirection = safeNormalize(vLocal + vec2(0.00001));
            float lane = sin(radius * 47.0 + sin(radius * 8.0) * 2.0);
            float fineLane = sin(radius * 126.0 + (ringDirection.x * ringDirection.y) * 7.5);
            float breakNoise = snoise(vec3(
                ringDirection * 2.35,
                radius * 4.8 + uTime * 0.03
            ));
            float gaps = smoothstep(-0.50, 0.16, breakNoise + lane * 0.28);
            float edge = smoothstep(2.16, 2.31, radius) * (1.0 - smoothstep(3.48, 3.68, radius));

            vec3 gold = BRAND_GOLD;
            vec3 sage = BRAND_SAGE * 1.05;
            vec3 deepIndigo = BRAND_INDIGO_DEEP * 1.35;
            vec3 color = mix(gold, sage, lane * 0.5 + 0.5);
            color = mix(color, deepIndigo, smoothstep(0.72, 0.98, fineLane) * 0.40);
            color += BRAND_CREAM_DIM * 0.30 * abs(fineLane) * 0.08;

            float alpha = edge * gaps * (0.115 + abs(lane) * 0.145 + abs(fineLane) * 0.060);
            alpha *= uOpacity;
            color = limitLuminance(color, 1.05);
            alpha = clamp(sanitizeFloat(alpha, 0.0), 0.0, 0.40);
            gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.set(Math.PI * 0.5 + 0.2, 0.0, 0.34);
    ringMesh.renderOrder = 1;
    planetGroup.add(ringMesh);

    const arcCount = isCompact ? 1200 : 2200;
    const arcGeometry = new THREE.BufferGeometry();
    const arcPositions = new Float32Array(arcCount * 3);
    const arcRandom = new Float32Array(arcCount * 2);

    for (let i = 0; i < arcCount; i += 1) {
      const angle = Math.random() * TAU;
      const radius = THREE.MathUtils.lerp(3.9, 5.8, Math.pow(Math.random(), 0.72));
      arcPositions[i * 3] = Math.cos(angle) * radius;
      arcPositions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(0.45);
      arcPositions[i * 3 + 2] = Math.sin(angle) * radius;
      arcRandom[i * 2] = Math.random();
      arcRandom[i * 2 + 1] = Math.random();
    }

    arcGeometry.setAttribute("position", new THREE.BufferAttribute(arcPositions, 3));
    arcGeometry.setAttribute("aRandom", new THREE.BufferAttribute(arcRandom, 2));

    const arcMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uTransitionEnergy: { value: 0 },
      },
      vertexShader: `
        ${brandGLSL}

        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uTransitionEnergy;
        attribute vec2 aRandom;
        varying float vAlpha;
        varying vec3 vColor;

        void main() {
            vec3 p = position;
            float angle = uTime * (0.035 + aRandom.x * 0.055);
            float s = sin(angle);
            float c = cos(angle);
            p.xz = mat2(c, -s, s, c) * p.xz;
            p.y += sin(uTime * 0.45 + aRandom.y * 13.0 + length(p.xz)) * 0.13;
            p *= 1.0 + uTransitionEnergy * 0.035;

            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = (0.7 + aRandom.x * 1.5) * uPixelRatio * (25.0 / max(1.0, -mvPosition.z));
            vAlpha = (0.05 + aRandom.y * 0.16) * (1.0 - uTransitionEnergy * 0.52);
            vColor = mix(BRAND_INDIGO * 0.90, BRAND_CREAM_DIM * 0.72, aRandom.x);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying vec3 vColor;

        void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            if (d > 0.5) discard;
            float glow = exp(-d * 7.0);
            gl_FragColor = vec4(vColor * glow, vAlpha * glow);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const orbitalArcs = new THREE.Points(arcGeometry, arcMaterial);
    orbitalArcs.rotation.set(0.18, 0.0, -0.28);
    planetGroup.add(orbitalArcs);

    const transitionState = {
      active: false,
      from: 0,
      to: 0,
      queued: null as number | null,
      startTime: 0,
      duration: 1.28,
      raw: 0,
      eased: 0,
      energy: 0,
      current: 0,
    };

    function smootherStep(value: number) {
      const x = THREE.MathUtils.clamp(value, 0, 1);
      return x * x * x * (x * (x * 6 - 15) + 10);
    }

    function cinematicEase(value: number) {
      const x = THREE.MathUtils.clamp(value, 0, 1);
      if (x < 0.5) return 0.5 * Math.pow(x * 2, 1.22);
      return 1 - 0.5 * Math.pow((1 - x) * 2, 1.22);
    }

    function transitionEnergy(easedProgress: number) {
      const progress = THREE.MathUtils.clamp(easedProgress, 0, 1);
      const pulse = Math.max(0, Math.sin(Math.PI * progress));
      const energy = Math.pow(pulse, 1.35);
      return Number.isFinite(energy) ? energy : 0;
    }

    function setSharedUniform(
      name: keyof typeof sharedPlanetUniforms,
      value: number
    ) {
      sharedPlanetUniforms[name].value = value;
      particleUniforms[name].value = value;
      ringMaterial.uniforms[name].value = value;
    }

    function accentStringToColor(value: string) {
      const channels = value.split(",").map((part) => Number(part.trim()));
      return new THREE.Color().setRGB(
        Number.isFinite(channels[0]) ? channels[0] / 255 : 248 / 255,
        Number.isFinite(channels[1]) ? channels[1] / 255 : 118 / 255,
        Number.isFinite(channels[2]) ? channels[2] / 255 : 102 / 255,
        THREE.SRGBColorSpace
      );
    }

    function updatePortalPalette(fromIndex: number, toIndex: number) {
      portalUniforms.uFromAccent.value.copy(accentStringToColor(PLANETS[fromIndex].accentA));
      portalUniforms.uToAccent.value.copy(accentStringToColor(PLANETS[toIndex].accentB));
    }

    function setStageAccent(index: number) {
      const planet = PLANETS[index];
      stage!.style.setProperty("--accent-a", planet.accentA);
      stage!.style.setProperty("--accent-b", planet.accentB);
    }

    function updatePlanetCopy(index: number, isTransmuting = false) {
      const planet = PLANETS[index];
      planetKicker!.textContent = isTransmuting
        ? `Phasing into ${planet.kicker.toLowerCase()}`
        : planet.kicker;
      planetName!.textContent = planet.name;
      planetDescription!.textContent = planet.description;
    }

    function updateButtonState(currentIndex: number, targetIndex: number | null = null) {
      planetButtons.forEach((button) => {
        const index = Number(button.dataset.planet);
        const isCurrent = index === currentIndex && targetIndex === null;
        const isTarget = targetIndex !== null && index === targetIndex;
        button.classList.toggle(styles.isActive, isCurrent);
        button.classList.toggle(styles.isTarget, isTarget);
        button.setAttribute("aria-pressed", String(isCurrent || isTarget));
      });
    }

    function applyPlanetImmediately(index: number) {
      transitionState.active = false;
      transitionState.from = index;
      transitionState.to = index;
      transitionState.current = index;
      transitionState.queued = null;
      transitionState.raw = 1;
      transitionState.eased = 1;
      transitionState.energy = 0;

      setSharedUniform("uFromPreset", index);
      setSharedUniform("uToPreset", index);
      setSharedUniform("uTransition", 0);
      setSharedUniform("uTransitionEnergy", 0);

      updatePlanetCopy(index, false);
      updateButtonState(index, null);
      setStageAccent(index);
      transitionMeter!.classList.remove(styles.isActive);
      transitionMeterFill!.style.width = "100%";
    }

    function beginTransition(targetIndex: number, nowSeconds: number) {
      const normalizedTarget = (targetIndex + PLANETS.length) % PLANETS.length;

      if (prefersReducedMotion) {
        if (normalizedTarget === transitionState.current) return;
        applyPlanetImmediately(normalizedTarget);
        invalidateRender();
        return;
      }

      if (transitionState.active) {
        transitionState.queued = normalizedTarget;
        return;
      }

      if (normalizedTarget === transitionState.current) return;

      transitionState.active = true;
      transitionState.from = transitionState.current;
      transitionState.to = normalizedTarget;
      transitionState.startTime = nowSeconds;
      transitionState.raw = 0;
      transitionState.eased = 0;
      transitionState.energy = 0;
      updatePortalPalette(transitionState.from, transitionState.to);

      setSharedUniform("uFromPreset", transitionState.from);
      setSharedUniform("uToPreset", transitionState.to);
      setSharedUniform("uTransition", 0);
      setSharedUniform("uTransitionEnergy", 0);

      updatePlanetCopy(normalizedTarget, true);
      updateButtonState(transitionState.current, normalizedTarget);
      setStageAccent(normalizedTarget);
      transitionMeter!.classList.add(styles.isActive);
      transitionMeterFill!.style.width = "0%";
      invalidateRender(transitionState.duration * 1000 + 600);
    }

    function settleTransition(nowSeconds: number) {
      transitionState.current = transitionState.to;
      transitionState.active = false;
      transitionState.raw = 1;
      transitionState.eased = 1;
      transitionState.energy = 0;
      setSharedUniform("uFromPreset", transitionState.current);
      setSharedUniform("uToPreset", transitionState.current);
      setSharedUniform("uTransition", 0);
      setSharedUniform("uTransitionEnergy", 0);

      updatePlanetCopy(transitionState.current, false);
      updateButtonState(transitionState.current, null);
      setStageAccent(transitionState.current);
      transitionMeter!.classList.remove(styles.isActive);
      transitionMeterFill!.style.width = "100%";
      invalidateRender(600);

      if (transitionState.queued !== null) {
        const queued = transitionState.queued;
        transitionState.queued = null;
        if (queued !== transitionState.current) {
          beginTransition(queued, nowSeconds + 0.001);
        }
      }
    }

    function updateTransition(nowSeconds: number) {
      if (!transitionState.active) return;

      const raw = THREE.MathUtils.clamp(
        (nowSeconds - transitionState.startTime) / transitionState.duration,
        0,
        1
      );
      const eased = cinematicEase(raw);
      const energy = transitionEnergy(eased);

      transitionState.raw = raw;
      transitionState.eased = eased;
      transitionState.energy = energy;

      setSharedUniform("uTransition", eased);
      setSharedUniform("uTransitionEnergy", energy);
      transitionMeterFill!.style.width = `${(raw * 100).toFixed(2)}%`;

      if (raw >= 1) {
        settleTransition(nowSeconds);
      }
    }

    let sceneTime = 0;
    let rafId = 0;
    let lastFrameTimestamp: number | null = null;
    let renderUntilTimestamp = 0;
    let isIntersecting = false;
    let isPageVisible = document.visibilityState === "visible";
    let controlsInteracting = false;
    let disposed = false;

    const IDLE_SETTLE_MS = 700;
    const INITIAL_SETTLE_MS = 900;
    const IDLE_FRAME_INTERVAL_MS = 1000 / 30;
    const idleRotation = 0.035;

    function canRender() {
      return !disposed && isIntersecting && isPageVisible;
    }

    function stopRenderLoop() {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      lastFrameTimestamp = null;
    }

    function scheduleRender() {
      if (rafId === 0 && canRender()) {
        rafId = requestAnimationFrame(renderFrame);
      }
    }

    function invalidateRender(settleMs = 0) {
      if (!prefersReducedMotion && settleMs > 0) {
        renderUntilTimestamp = Math.max(
          renderUntilTimestamp,
          performance.now() + settleMs
        );
      }
      scheduleRender();
    }

    const buttonClickHandlers: Array<() => void> = [];
    planetButtons.forEach((button) => {
      const handler = () => {
        beginTransition(Number(button.dataset.planet), sceneTime);
      };
      buttonClickHandlers.push(handler);
      button.addEventListener("click", handler);
    });

    const onKeydown = (event: KeyboardEvent) => {
      const focusedIndex = planetButtons.indexOf(
        document.activeElement as HTMLButtonElement
      );
      if (focusedIndex < 0) return;

      let targetIndex: number | null = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        targetIndex = (focusedIndex + 1) % PLANETS.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        targetIndex = (focusedIndex - 1 + PLANETS.length) % PLANETS.length;
      } else if (event.key === "Home") {
        targetIndex = 0;
      } else if (event.key === "End") {
        targetIndex = PLANETS.length - 1;
      }

      if (targetIndex !== null) {
        event.preventDefault();
        planetButtons[targetIndex].focus();
        beginTransition(targetIndex, sceneTime);
      }
    };
    window.addEventListener("keydown", onKeydown);

    function handleResize() {
      const { width, height } = getContainerSize();
      const pixelRatio = responsivePixelRatio();

      camera.aspect = width / height;
      camera.fov = responsiveCameraFov();
      camera.position
        .sub(controls.target)
        .setLength(responsiveCameraDistance())
        .add(controls.target);
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height);
      composer.setPixelRatio(pixelRatio);
      composer.setSize(width, height);

      particleUniforms.uPixelRatio.value = pixelRatio;
      filamentUniforms.uPixelRatio.value = pixelRatio;
      starMaterial.uniforms.uPixelRatio.value = pixelRatio;
      arcMaterial.uniforms.uPixelRatio.value = pixelRatio;
      invalidateRender(prefersReducedMotion ? 0 : IDLE_SETTLE_MS);
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize, { passive: true });

    function onControlsStart() {
      controlsInteracting = true;
      invalidateRender();
    }

    function onControlsChange() {
      invalidateRender(prefersReducedMotion ? 0 : IDLE_SETTLE_MS);
    }

    function onControlsEnd() {
      controlsInteracting = false;
      invalidateRender(prefersReducedMotion ? 0 : IDLE_SETTLE_MS);
    }

    controls.addEventListener("start", onControlsStart);
    controls.addEventListener("change", onControlsChange);
    controls.addEventListener("end", onControlsEnd);

    function renderFrame(timestamp: number) {
      rafId = 0;
      if (!canRender()) {
        lastFrameTimestamp = null;
        return;
      }

      const needsFullCadence =
        transitionState.active ||
        controlsInteracting ||
        timestamp < renderUntilTimestamp;
      const idleFrameIsDue =
        lastFrameTimestamp === null ||
        timestamp - lastFrameTimestamp + 0.5 >= IDLE_FRAME_INTERVAL_MS;

      if (!prefersReducedMotion && !needsFullCadence && !idleFrameIsDue) {
        scheduleRender();
        return;
      }

      const delta =
        lastFrameTimestamp === null
          ? 0
          : Math.min((timestamp - lastFrameTimestamp) / 1000, 0.04);
      lastFrameTimestamp = timestamp;

      if (!prefersReducedMotion) {
        sceneTime += delta;
      }
      updateTransition(sceneTime);

      const energy = transitionState.energy;
      surfaceMaterial.depthWrite = true;
      planetParticles.visible = transitionState.active;
      transitionFilaments.visible = transitionState.active;

      sharedPlanetUniforms.uTime.value = sceneTime;
      particleUniforms.uTime.value = sceneTime;
      starMaterial.uniforms.uTime.value = sceneTime;
      starMaterial.uniforms.uTransitionEnergy.value = energy;
      arcMaterial.uniforms.uTime.value = sceneTime;
      arcMaterial.uniforms.uTransitionEnergy.value = energy;
      portalUniforms.uTime.value = sceneTime;
      portalPlane.visible = transitionState.active;
      if (portalPlane.visible) {
        portalPlane.quaternion.copy(camera.quaternion);
        portalPlane.scale.setScalar(1.0);
      }

      const fromHasRing = transitionState.active
        ? Number(transitionState.from === 2)
        : Number(transitionState.current === 2);
      const toHasRing = transitionState.active
        ? Number(transitionState.to === 2)
        : fromHasRing;
      const ringMorph = transitionState.active ? smootherStep(transitionState.eased) : 0;
      ringMaterial.uniforms.uOpacity.value = THREE.MathUtils.lerp(
        fromHasRing,
        toHasRing,
        ringMorph
      );

      if (!prefersReducedMotion) {
        planetGroup.rotation.y += (idleRotation + energy * 0.12) * delta;
        planetGroup.rotation.x = Math.sin(sceneTime * 0.12) * 0.025;
        orbitalArcs.rotation.y = sceneTime * 0.018;
        orbitalArcs.rotation.z = -0.28 + Math.sin(sceneTime * 0.09) * 0.055;
        stars.rotation.y = sceneTime * 0.0016;
      }
      planetGroup.scale.set(1.0, 1.0, 1.0);

      bloomPass.strength = 0.42 + energy * 0.06;
      bloomPass.radius = 0.28 + energy * 0.04;
      bloomPass.threshold = 0.62 + energy * 0.02;
      renderer.toneMappingExposure = 1.05;

      controls.update();
      composer.render();

      if (!prefersReducedMotion) {
        scheduleRender();
      } else {
        lastFrameTimestamp = null;
      }
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const wasIntersecting = isIntersecting;
        isIntersecting = Boolean(entry?.isIntersecting);

        if (!isIntersecting) {
          controlsInteracting = false;
          stopRenderLoop();
        } else if (!wasIntersecting) {
          invalidateRender(prefersReducedMotion ? 0 : INITIAL_SETTLE_MS);
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(stage);

    function onVisibilityChange() {
      isPageVisible = document.visibilityState === "visible";
      if (!isPageVisible) {
        controlsInteracting = false;
        stopRenderLoop();
      } else {
        invalidateRender(prefersReducedMotion ? 0 : INITIAL_SETTLE_MS);
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    function onReducedMotionChange(event: MediaQueryListEvent) {
      prefersReducedMotion = event.matches;
      controls.enableDamping = !prefersReducedMotion;
      renderUntilTimestamp = 0;

      if (prefersReducedMotion && transitionState.active) {
        applyPlanetImmediately(transitionState.to);
      }

      stopRenderLoop();
      invalidateRender(prefersReducedMotion ? 0 : INITIAL_SETTLE_MS);
    }
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);

    updatePortalPalette(0, 0);
    setStageAccent(0);
    updatePlanetCopy(0, false);
    updateButtonState(0, null);
    handleResize();

    return () => {
      disposed = true;
      stopRenderLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", onKeydown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);

      planetButtons.forEach((button, index) => {
        button.removeEventListener("click", buttonClickHandlers[index]);
      });

      controls.removeEventListener("start", onControlsStart);
      controls.removeEventListener("change", onControlsChange);
      controls.removeEventListener("end", onControlsEnd);
      controls.dispose();

      starGeometry.dispose();
      starMaterial.dispose();
      surfaceGeometry.dispose();
      surfaceMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      filamentGeometry.dispose();
      filamentMaterial.dispose();
      portalPlane.geometry.dispose();
      portalMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      arcGeometry.dispose();
      arcMaterial.dispose();

      composer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={stageRef} className={styles.stage}>
      <div ref={canvasContainerRef} className={styles.canvasContainer} aria-hidden="true" />
      <div
        ref={interactionSurfaceRef}
        className={styles.interactionSurface}
        aria-hidden="true"
      />

      <section
        id="celestial-service-detail"
        className={styles.planetCopy}
        aria-live="polite"
      >
        <div ref={planetKickerRef} className={styles.planetKicker}>
          PHOTOGRAPHY IN MOTION
        </div>
        <h3 ref={planetNameRef} className={styles.planetName}>
          Film/Video
        </h3>
        <p ref={planetDescriptionRef} className={styles.planetDescription}>
          Los Angeles film and video production from concept through directing,
          cinematography, editing, sound design, and color grading — for short films, events,
          brand stories, and documentary work.
        </p>
        <div ref={transitionMeterRef} className={styles.transitionMeter} aria-hidden="true">
          <div ref={transitionMeterFillRef} className={styles.transitionMeterFill} />
        </div>
      </section>

      <div className={styles.planetUi} role="group" aria-label="Creative services">
        {PLANETS.map((planet, index) => (
          <button
            key={planet.name}
            type="button"
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            data-planet={index}
            aria-controls="celestial-service-detail"
            aria-pressed={index === 0}
            className={`btn-nova btn-nova-compact ${styles.planetButton} ${
              index === 0 ? styles.isActive : ""
            } text-[11px] font-medium tracking-wide sm:text-xs`}
          >
            <span className="btn-nova-inner">
              <strong className="btn-nova-label">{planet.name}</strong>
              <span className="btn-nova-stars" aria-hidden="true">
                <span className="btn-nova-stars-field" />
              </span>
              <span className="btn-nova-glow" aria-hidden="true">
                <span className="btn-nova-circle" />
                <span className="btn-nova-circle" />
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
