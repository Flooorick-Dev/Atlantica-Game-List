import React, { useState, useMemo } from 'react';
import type { Character, Skill, Attribute } from '../types';
import { ATTRIBUTES_DATA, ATTRIBUTE_VALUES, SKILLS } from '../constants';
import { ArrowLeftIcon, CheckIcon } from './icons';

// --- Helper Components for each step ---

const Step1Info: React.FC<{ character: Character; setCharacter: React.Dispatch<React.SetStateAction<Character>> }> = ({ character, setCharacter }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCharacter(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h3 className="text-3xl mb-4">Концепция и Личность</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div><label htmlFor="name" className="block text-sm text-slate-400">Имя персонажа</label><input type="text" id="name" name="name" value={character.name} onChange={handleChange} className="input-field" placeholder="Джонни Сильверхенд" /></div>
        <div><label htmlFor="player" className="block text-sm text-slate-400">Игрок</label><input type="text" id="player" name="player" value={character.player} onChange={handleChange} className="input-field" placeholder="Ваше имя" /></div>
        <div><label htmlFor="archetype" className="block text-sm text-slate-400">Архетип / Роль</label><input type="text" id="archetype" name="archetype" value={character.archetype} onChange={handleChange} className="input-field" placeholder="Бывший коп" /></div>
        <div><label htmlFor="past" className="block text-sm text-slate-400">Прошлое</label><input type="text" id="past" name="past" value={character.past} onChange={handleChange} className="input-field" placeholder="Подставили и уволили" /></div>
        <div className="md:col-span-2"><label htmlFor="goal" className="block text-sm text-slate-400">Цель / Мотивация</label><textarea id="goal" name="goal" value={character.goal} onChange={handleChange} className="textarea-field" rows={2} placeholder="Найти правду, отомстить"></textarea></div>
        <div className="md:col-span-2"><label htmlFor="flaw" className="block text-sm text-slate-400">Главный Порок / Слабость</label><textarea id="flaw" name="flaw" value={character.flaw} onChange={handleChange} className="textarea-field" rows={2} placeholder="Алкоголь, цинизм"></textarea></div>
      </div>
    </div>
  );
};

const Step2Attributes: React.FC<{ character: Character; setCharacter: React.Dispatch<React.SetStateAction<Character>> }> = ({ character, setCharacter }) => {
    const [selectedVal, setSelectedVal] = useState<{value: number, index: number} | null>(null);

    const availableValues = useMemo(() => {
        const assigned = Object.values(character.attributes).map((a: Attribute) => a.value).filter(v => v > 0);
        const available = [...ATTRIBUTE_VALUES];
        assigned.forEach(val => {
            const indexToRemove = available.indexOf(val);
            if (indexToRemove > -1) {
                available.splice(indexToRemove, 1);
            }
        });
        return available;
    }, [character.attributes]);

    const handleAssign = (key: string) => {
        if (!selectedVal) return;
        if (character.attributes[key].value > 0) return; // Already assigned

        setCharacter(prev => {
            const newAttributes = { ...prev.attributes };
            newAttributes[key].value = selectedVal.value;
            return { ...prev, attributes: newAttributes };
        });
        setSelectedVal(null);
    };
    
    const handleUnassign = (key: string) => {
        if (character.attributes[key].value === 0) return;

        setCharacter(prev => {
            const newAttributes = { ...prev.attributes };
            newAttributes[key].value = 0;
            return { ...prev, attributes: newAttributes };
        });
    };

    return (
        <div>
            <h3 className="text-3xl mb-4 text-center">Распределение Характеристик</h3>
            <p className="text-slate-400 mb-4 text-center">Нажмите на значение, а затем на характеристику, чтобы присвоить его. Нажмите на присвоенное значение, чтобы убрать его.</p>
            <div className="text-center mb-6">
                <h4 className="text-xl mb-2">Доступные значения</h4>
                <div className="flex flex-wrap justify-center gap-2">
                    {ATTRIBUTE_VALUES.map((val, index) => {
                        // This logic correctly handles duplicate values in the source array
                        const totalCount = ATTRIBUTE_VALUES.filter(v => v === val).length;
                        const assignedCount = Object.values(character.attributes).filter((a: Attribute) => a.value === val).length;
                        const isAvailable = assignedCount < totalCount;
                        const isSelected = selectedVal?.index === index;
                        
                        return (
                            <button key={index}
                                onClick={() => isAvailable && setSelectedVal({value: val, index})}
                                disabled={!isAvailable || selectedVal?.value === val}
                                className={`w-12 h-12 flex items-center justify-center font-bold text-lg rounded-sm transition-all duration-200 ${
                                    isSelected ? 'bg-[#e8d5a3] text-[#012a36] ring-2 ring-white/80' :
                                    isAvailable ? 'bg-[#021a22]/80 border border-[#b89b70]/50 hover:bg-[#b89b70]/20' : 'bg-black/20 text-slate-600 cursor-not-allowed opacity-50'
                                }`}
                            >
                                {val}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mx-auto">
                {Object.entries(ATTRIBUTES_DATA).map(([key, attr]) => (
                    <div key={key} className="flex justify-between items-center bg-black/20 p-3 rounded-sm">
                        <span className="text-slate-300 text-lg">{key} ({(attr as Attribute).name})</span>
                        <button
                            onClick={() => character.attributes[key].value > 0 ? handleUnassign(key) : handleAssign(key)}
                            className={`w-20 h-10 flex items-center justify-center font-bold text-xl rounded-sm transition-all duration-200 ${
                                character.attributes[key].value > 0 ? 'bg-[#b89b70] text-[#012a36] cursor-pointer' : 'bg-[#021a22]/80 text-slate-400 ' + (selectedVal ? 'cursor-pointer hover:bg-[#b89b70]/20' : 'cursor-default')
                            }`}
                        >
                            {character.attributes[key].value > 0 ? character.attributes[key].value : '—'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};


const Step3Skills: React.FC<{ character: Character; setCharacter: React.Dispatch<React.SetStateAction<Character>> }> = ({ character, setCharacter }) => {
    const { profPoints, persPoints } = useMemo(() => {
        if (!character.profession) return { profPoints: 0, persPoints: 0 };
        const { ИНТ, ОБР } = character.attributes;
        const profPointsTotal = (ОБР.value * 2) + (ИНТ.value * 2);
        const persPointsTotal = ИНТ.value * 2;
        const spentProf = Object.keys(character.skills).filter(sn => character.profession!.skills.includes(sn)).reduce((acc, sn) => acc + (character.skills[sn] || 0), 0);
        const spentPers = Object.keys(character.skills).filter(sn => !character.profession!.skills.includes(sn)).reduce((acc, sn) => acc + (character.skills[sn] || 0), 0);
        return {
            profPoints: isNaN(profPointsTotal) ? 0 : profPointsTotal - spentProf,
            persPoints: isNaN(persPointsTotal) ? 0 : persPointsTotal - spentPers
        };
    }, [character.attributes, character.skills, character.profession]);

    const handleSkillChange = (skillName: string, change: number) => {
        if (!character.profession) return;
        const currentPoints = character.skills[skillName] || 0;
        const isProf = character.profession.skills.includes(skillName);
        if (change > 0 && (isProf ? profPoints <= 0 : persPoints <= 0)) return;
        const newPoints = Math.max(0, currentPoints + change);
        setCharacter(prev => ({
            ...prev,
            skills: { ...prev.skills, [skillName]: newPoints }
        }));
    };

    const sortedSkills = useMemo(() => [...SKILLS].sort((a,b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name)), []);
    let currentCategory = '';

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl">Настройка Навыков</h3>
                <div className="text-right">
                    <p className="text-sm">Очки Проф. Навыков: <span className="font-bold text-[#e8d5a3] text-lg">{profPoints}</span></p>
                    <p className="text-sm">Очки Личных Интересов: <span className="font-bold text-cyan-400 text-lg">{persPoints}</span></p>
                </div>
            </div>
            <div className="max-h-[55vh] overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {sortedSkills.map((skill: Skill) => {
                    const showCategoryHeader = skill.category !== currentCategory;
                    currentCategory = skill.category;
                    const baseValue = skill.formula(character.attributes);
                    const points = character.skills[skill.name] || 0;
                    const totalValue = baseValue + points;
                    const isProf = character.profession?.skills.includes(skill.name);
                    return (
                        <React.Fragment key={skill.name}>
                            {showCategoryHeader && <h4 className="text-xl md:col-span-2 mt-4 mb-1 text-slate-400">{skill.category}</h4>}
                            <div className="grid grid-cols-5 items-center gap-2">
                                <span className={`col-span-2 ${isProf ? 'text-[#e8d5a3]' : ''}`}>{skill.name}</span>
                                <span className="text-center text-sm text-slate-400">{isNaN(baseValue) ? 0 : baseValue}%</span>
                                <div className="col-span-1 flex items-center">
                                    <button onClick={() => handleSkillChange(skill.name, -1)} className="px-2 rounded-l bg-[#021a22]/80 hover:bg-black/50">-</button>
                                    <span className="w-10 text-center bg-black/30 border-y border-[#b89b70]/50 outline-none">{points}</span>
                                    <button onClick={() => handleSkillChange(skill.name, 1)} className="px-2 rounded-r bg-[#021a22]/80 hover:bg-black/50">+</button>
                                </div>
                                <span className="text-center font-bold text-white">{isNaN(totalValue) ? 0 : totalValue}%</span>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

const Step4Gear: React.FC<{ character: Character; setCharacter: React.Dispatch<React.SetStateAction<Character>> }> = ({ character, setCharacter }) => {
    const gearOptions = useMemo(() => character.profession?.gear.split(' / ') || [], [character.profession]);
    
    const handleGearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCharacter(prev => ({...prev, gear: e.target.value}));
    }

    return (
        <div>
            <h3 className="text-3xl mb-4">Выбор Стартового Снаряжения</h3>
            <p className="text-sm text-slate-400 mb-4">Выберите один из предложенных наборов.</p>
            <div className="space-y-4">
                {gearOptions.map((option, index) => {
                    const items = option.split(';').map(item => item.trim());
                    return (
                        <label key={index} className="block p-4 border border-[#b89b70]/50 rounded-sm cursor-pointer hover:bg-black/20 transition-colors">
                            <input type="radio" name="gear" value={option} onChange={handleGearChange} className="mr-3" checked={character.gear === option} />
                            <span className="text-lg font-semibold text-[#e8d5a3]">Набор {index + 1}</span>
                            <ul className="list-disc list-inside mt-2 text-slate-400">
                                {items.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};


// --- Main Creator Screen Component ---

interface CreatorScreenProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  onBack: () => void;
  onFinalize: () => void;
}

const CreatorScreen: React.FC<CreatorScreenProps> = ({ character, setCharacter, onBack, onFinalize }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const subtitles = ["Шаг 1: Основная Информация", "Шаг 2: Характеристики", "Шаг 3: Навыки", "Шаг 4: Снаряжение"];

  const validateAttributes = () => {
      const assignedCount = Object.values(character.attributes).filter((a: Attribute) => a.value > 0).length;
      if (assignedCount < ATTRIBUTE_VALUES.length) {
          alert("Пожалуйста, распределите все значения характеристик.");
          return false;
      }
      return true;
  };

  const nextStep = () => {
    if (currentStep === 2 && !validateAttributes()) return;
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <section className="w-full max-w-5xl mx-auto fade-in">
      <h2 className="text-5xl text-center mb-2">Создание Персонажа</h2>
      <p className="text-center text-slate-400 mb-6">{subtitles[currentStep - 1]}</p>
      
      <div className="card p-8">
        <div className="min-h-[60vh]">
            {currentStep === 1 && <Step1Info character={character} setCharacter={setCharacter} />}
            {currentStep === 2 && <Step2Attributes character={character} setCharacter={setCharacter} />}
            {currentStep === 3 && <Step3Skills character={character} setCharacter={setCharacter} />}
            {currentStep === 4 && <Step4Gear character={character} setCharacter={setCharacter} />}
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        {currentStep === 1 ? (
            <button onClick={onBack} className="btn"><ArrowLeftIcon /> К Профессиям</button>
        ) : (
            <button onClick={prevStep} className="btn">Назад</button>
        )}
        
        <div>
            {currentStep < totalSteps && (
                <button onClick={nextStep} className="btn">Далее</button>
            )}
            {currentStep === totalSteps && (
                <button onClick={onFinalize} className="btn">Завершить <CheckIcon /></button>
            )}
        </div>
      </div>
    </section>
  );
};

export default CreatorScreen;
