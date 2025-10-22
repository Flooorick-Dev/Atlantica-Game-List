import React, { useState } from 'react';
import type { Character, BodyPart, Implant } from '../../../types';

interface ImplantManagerProps {
    part: BodyPart;
    implants: Implant[];
    character: Character;
    onUpdateCharacter: (updates: Partial<Character>) => void;
}

const partNames: Record<BodyPart, string> = {
    head: "Голова",
    torso: "Торс",
    leftArm: "Левая рука",
    rightArm: "Правая рука",
    leftLeg: "Левая нога",
    rightLeg: "Правая нога",
};

const ImplantManager: React.FC<ImplantManagerProps> = ({ part, implants, character, onUpdateCharacter }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleAddImplant = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;

        const newImplant: Implant = {
            id: Date.now().toString(),
            name,
            description,
        };

        const newImplantsForPart = [...(character.implants[part] || []), newImplant];
        const updatedImplants = { ...character.implants, [part]: newImplantsForPart };
        
        onUpdateCharacter({ implants: updatedImplants });

        setName('');
        setDescription('');
    };

    const handleRemoveImplant = (implantId: string) => {
        const newImplantsForPart = (character.implants[part] || []).filter(imp => imp.id !== implantId);
        const updatedImplants = { ...character.implants, [part]: newImplantsForPart };
        onUpdateCharacter({ implants: updatedImplants });
    };

    return (
        <div>
            <h3 className="text-2xl mb-4">Импланты: {partNames[part]}</h3>
            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-2">
                {implants.length > 0 ? (
                    implants.map(implant => (
                        <div key={implant.id} className="bg-black/20 p-3 rounded-sm">
                           <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold">{implant.name}</p>
                                    <p className="text-sm text-[var(--text-muted-color)]">{implant.description}</p>
                                </div>
                                <button onClick={() => handleRemoveImplant(implant.id)} className="text-[var(--danger-color)] hover:text-[var(--danger-hover-color)] text-xs uppercase font-bold flex-shrink-0 ml-4">
                                    Удалить
                                </button>
                           </div>
                        </div>
                    ))
                ) : (
                    <p className="text-[var(--text-muted-color)]">Нет имплантов в этой части тела.</p>
                )}
            </div>

            <form onSubmit={handleAddImplant} className="border-t border-[var(--card-border-color)] pt-4">
                <h4 className="text-xl mb-2">Добавить имплант</h4>
                <div className="space-y-3">
                    <input 
                        type="text" 
                        placeholder="Название импланта" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="input-field"
                    />
                    <textarea 
                        placeholder="Описание и эффекты"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="textarea-field"
                        rows={3}
                    />
                    <button type="submit" className="btn">Добавить</button>
                </div>
            </form>
        </div>
    );
};

export default ImplantManager;