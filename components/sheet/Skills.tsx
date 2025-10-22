import React from 'react';
import type { Character } from '../../types';
import { SKILLS } from '../../constants';

interface SkillsProps {
  character: Character;
}

const Skills: React.FC<SkillsProps> = ({ character }) => {
    const { profession, attributes } = character;
    const sortedSkills = [...SKILLS].sort((a,b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    let currentCategory = '';

    return (
        <div className="p-1">
            <h2 className="text-3xl mb-4">Навыки</h2>
            <div className="space-y-4">
                {sortedSkills.map(skill => {
                    const showCategoryHeader = skill.category !== currentCategory;
                    currentCategory = skill.category;
                    const points = character.skills[skill.name] || 0;
                    
                    if (points === 0 && !profession?.skills.includes(skill.name)) {
                        return null; // Don't show skills with 0 points unless it's a professional skill
                    }

                    const base = skill.formula(attributes);
                    const total = base + points;
                    const isProf = profession?.skills.includes(skill.name);

                    return (
                         <React.Fragment key={skill.name}>
                            {showCategoryHeader && <h3 className="text-2xl pt-4 border-t border-[#b89b70]/20">{skill.category}</h3>}
                            <div className="grid grid-cols-3 md:grid-cols-5 items-center text-sm">
                                <span className={`md:col-span-2 ${isProf ? 'text-[#e8d5a3] font-bold' : 'text-slate-300'}`}>{skill.name}</span>
                                <div className="text-center">
                                    <span className="text-slate-400">База</span>
                                    <p>{base}%</p>
                                </div>
                                <div className="text-center">
                                    <span className="text-slate-400">Очки</span>
                                    <p>+{points}</p>
                                </div>
                                <div className="text-center">
                                    <span className="text-slate-400">Всего</span>
                                    <p className="font-bold text-white text-lg">{total}%</p>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default Skills;
