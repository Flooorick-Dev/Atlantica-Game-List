import React from 'react';
import type { Character } from '../../types';

interface GearProps {
  character: Character;
}

const Gear: React.FC<GearProps> = ({ character }) => {
    return (
        <div className="p-1">
            <h2 className="text-3xl mb-4">Снаряжение и Имущество</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-2xl mb-2">Стартовое снаряжение</h3>
                    <div className="bg-black/20 p-3 rounded-sm text-slate-300 space-y-1">
                        {character.gear.split(';').map((item, index) => (
                            <p key={index}>- {item.trim()}</p>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl mb-2">Дополнительное имущество</h3>
                    <textarea 
                        className="w-full bg-black/20 border border-[#b89b70]/50 rounded-sm p-3 text-slate-200 min-h-[150px]"
                        placeholder="Запишите здесь другие ваши вещи, контакты, собственность..."
                    />
                </div>
            </div>
        </div>
    );
};

export default Gear;
