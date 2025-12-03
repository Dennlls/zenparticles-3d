import { ParticleShape, PointGenerator } from './types';

// Helper to get random float
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export const generateHeart: PointGenerator = (count) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    // Spread particles inside the volume
    const r = Math.sqrt(Math.random()); 
    
    // Heart parametric equations
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    let z = rand(-5, 5) * (1 - Math.abs(x)/20); // Add volume tapering at edges

    // Scale down
    x *= 0.1 * r;
    y *= 0.1 * r;
    z *= 0.1;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
};

export const generateFlower: PointGenerator = (count) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const k = 4; // Petals
    
    // Rose curve mostly in 2D, expanded to 3D sphere volume
    const rBase = Math.cos(k * theta);
    const r = Math.abs(rBase) * 2 + 0.5; // Radius variation
    
    const spread = Math.random();

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * spread;
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * spread;
    positions[i * 3 + 2] = (Math.cos(phi) * spread) * 0.5; // Flatten slightly
  }
  return positions;
};

export const generateSaturn: PointGenerator = (count) => {
  const positions = new Float32Array(count * 3);
  const planetRatio = 0.4;
  const planetCount = Math.floor(count * planetRatio);
  const ringCount = count - planetCount;

  // Planet (Sphere)
  for (let i = 0; i < planetCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.5 * Math.cbrt(Math.random()); // Solid sphere distribution

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  // Rings (Disc)
  for (let i = planetCount; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const r = rand(2.2, 4.0); // Ring radius range
    
    positions[i * 3] = r * Math.cos(theta);
    positions[i * 3 + 1] = rand(-0.1, 0.1); // Thin disk
    positions[i * 3 + 2] = r * Math.sin(theta);
    
    // Tilt the ring
    const x = positions[i * 3];
    const y = positions[i * 3 + 1];
    const tilt = 0.4;
    positions[i * 3] = x * Math.cos(tilt) - y * Math.sin(tilt);
    positions[i * 3 + 1] = x * Math.sin(tilt) + y * Math.cos(tilt);
  }
  return positions;
};

// Abstract geometric representation of a meditative figure
export const generateBuddha: PointGenerator = (count) => {
  const positions = new Float32Array(count * 3);
  
  const headCount = Math.floor(count * 0.15);
  const bodyCount = Math.floor(count * 0.35);
  const baseCount = count - headCount - bodyCount;

  // Head
  for (let i = 0; i < headCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 0.6 * Math.cbrt(Math.random());
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 1.8; // Offset Y
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  // Body (Conical/Cylindrical)
  for (let i = headCount; i < headCount + bodyCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const h = Math.random() * 1.8; // Height
    const rBase = 0.8 + (1.8 - h) * 0.3; // Taper up
    const r = rBase * Math.sqrt(Math.random());

    positions[i * 3] = r * Math.cos(theta);
    positions[i * 3 + 1] = h;
    positions[i * 3 + 2] = r * Math.sin(theta);
  }

  // Base/Legs (Flattened wide sphere/Lotus)
  for (let i = headCount + bodyCount; i < count; i++) {
     const theta = Math.random() * Math.PI * 2;
     const r = rand(0, 2.0);
     const h = rand(0, 0.6);
     
     // Lotus petal shape bias
     const rMod = r + Math.sin(theta * 5) * 0.2;

     positions[i * 3] = rMod * Math.cos(theta);
     positions[i * 3 + 1] = h * (1 - r/2.5);
     positions[i * 3 + 2] = rMod * Math.sin(theta);
  }

  return positions;
};

export const generateFireworks: PointGenerator = (count) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Initial sphere, logic handles expansion
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 0.5 * Math.cbrt(Math.random());

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
};

export const getPointsForShape = (shape: ParticleShape, count: number): Float32Array => {
  switch (shape) {
    case ParticleShape.HEART: return generateHeart(count);
    case ParticleShape.FLOWER: return generateFlower(count);
    case ParticleShape.SATURN: return generateSaturn(count);
    case ParticleShape.BUDDHA: return generateBuddha(count);
    case ParticleShape.FIREWORKS: return generateFireworks(count);
    default: return generateHeart(count);
  }
};