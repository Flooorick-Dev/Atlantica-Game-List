import React, { useState } from 'react';
import type { Character, Script } from '../../types';

interface ScriptsProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void;
}

const Scripts: React.FC<ScriptsProps> = ({ character, onUpdateCharacter }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [memoryCost, setMemoryCost] = useState(0);

    const totalMemory = character.omi?.memory || 0;
    const usedMemory = character.scripts.reduce((acc, script) => acc + script.memoryCost, 0);

    const handleAddScript = () => {
        if (!name || memoryCost <= 0) {
            alert("Название и стоимость в ОП должны быть заполнены.");
            return;
        }
        const newScript: Script = {
            id: Date.now().toString(),
            name,
            description,
            memoryCost,
        };
        onUpdateCharacter({ scripts: [...character.scripts, newScript] });
        setName('');
        setDescription('');
        setMemoryCost(0);
    };

    const handleDeleteScript = (id: string) => {
        onUpdateCharacter({ scripts: character.scripts.filter(s => s.id !== id) });
    };
    
    return (
        <div className="p-1">
            <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-3xl">Скрипты и ПО</h2>
                <div className="text-right">
                    <span className="text-sm text-[var(--text-muted-color)]">Память (НП)</span>
                    <p className={`text-xl font-bold ${usedMemory > totalMemory ? 'text-[var(--danger-color)]' : 'text-white'}`}>
                        {usedMemory} / {totalMemory}
                    </p>
                </div>
            </div>
            
            <div className="card mb-6">
                <h3 className="text-2xl mb-4">Добавить новый скрипт</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="Название скрипта" value={name} onChange={e => setName(e.target.value)} className="input-field" />
                    <input type="number" placeholder="Стоимость в ОП (НП)" value={memoryCost || ''} onChange={e => setMemoryCost(parseInt(e.target.value) || 0)} className="input-field" />
                    <textarea placeholder="Краткое описание" value={description} onChange={e => setDescription(e.target.value)} className="textarea-field md:col-span-3" rows={2}></textarea>
                </div>
                <button onClick={handleAddScript} className="btn mt-4">Добавить</button>
            </div>
            
            <div className="space-y-3">
                {character.scripts.length > 0 ? character.scripts.map(script => (
                    <div key={script.id} className="bg-black/20 p-3 rounded-sm flex justify-between items-start">
                        <div>
                            <p className="font-bold text-white">{script.name} <span className="text-sm text-[var(--text-muted-color)]">({script.memoryCost} НП)</span></p>
                            <p className="text-sm text-[var(--text-muted-color)]">{script.description}</p>
                        </div>
                        <button onClick={() => handleDeleteScript(script.id)} className="text-[var(--danger-color)] hover:text-[var(--danger-hover-color)] text-xs uppercase font-bold flex-shrink-0 ml-4">Удалить</button>
                    </div>
                )) : <p className="text-[var(--text-muted-color)] text-center">У вас пока нет добавленных скриптов.</p>}
            </div>
        </div>
    );
};

export default Scripts;