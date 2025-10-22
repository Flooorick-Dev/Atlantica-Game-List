export interface Profession {
  name: string;
  description: string;
  skills: string[];
  credit: string;
  gear: string;
}

export interface Attribute {
  name: string;
  value: number;
}

export interface Attributes {
  [key: string]: Attribute;
}

export interface Skill {
  category: string;
  name: string;
  formula: (a: Attributes) => number;
}

export interface OMI {
  id: string;
  name: string;
  manufacturer: string;
  level: string;
  slots: number;
  memory: number; // НП
  overheatMod: number; // ПП
  compatibility: string; // Faction
  price: number;
  note: string;
  faction: 'AAC' | 'SOV' | 'Japan' | 'Black Market';
}

export interface OS {
  id: string;
  name: string;
  manufacturer: string;
  omiCompat: string[];
  bonus: string;
  defense: string;
  scripts: string[];
  price: number | 'Бесплатно' | 'Не продается';
  faction: 'AAC' | 'SOV' | 'Japan' | 'Black Market';
}

export interface Script {
  id: string;
  name: string;
  description: string;
  memoryCost: number;
}

export type BodyPart = 'head' | 'torso' | 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg';

export interface Implant {
  id: string;
  name: string;
  description: string;
}

export interface Character {
  name:string;
  player: string;
  archetype: string;
  past: string;
  goal: string;
  flaw: string;
  profession: Profession | null;
  attributes: Attributes;
  skills: { [key: string]: number };
  luck: number;
  gear: string;
  omi: OMI | null;
  os: OS | null;
  scripts: Script[];
  implants: Record<BodyPart, Implant[]>; 
}