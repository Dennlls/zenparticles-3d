export enum ParticleShape {
  HEART = 'HEART',
  FLOWER = 'FLOWER',
  SATURN = 'SATURN',
  BUDDHA = 'BUDDHA', // Approximated geometric shape
  FIREWORKS = 'FIREWORKS'
}

export interface ParticleConfig {
  count: number;
  color: string;
  shape: ParticleShape;
}

export interface HandGestureState {
  isDetected: boolean;
  pinchDistance: number; // Normalized 0 to 1 (0 = closed/pinch, 1 = open)
  handPosition: { x: number; y: number }; // Normalized -1 to 1
}

export type PointGenerator = (count: number) => Float32Array;