import React from 'react';
import type { Character, Attribute } from '../../types';

interface PersonalProps {
  character: Character;
}

const Personal: React.FC<PersonalProps> = ({ character }) => {
    const { name, player, archetype, past, goal, flaw, profession, attributes, luck } = character;
    const { СИЛ, ЛОВ, ТЕЛ, ВОС, ВОЛ } = attributes;

    const derivedStats = {
        health: isNaN(ТЕЛ.value) || isNaN(СИЛ.value) ? 0 : Math.ceil((ТЕЛ.value + СИЛ.value) / 10),
        sanity: isNaN(ВОЛ.value) ? 0 : ВОЛ.value,
        initiative: isNaN(ЛОВ.value) || isNaN(ВОС.value) ? 0 : Math.ceil((ЛОВ.value + ВОС.value) / 2),
        overheat: isNaN(ТЕЛ.value) ? 0 : Math.ceil(ТЕЛ.value / 10),
        luck: luck,
    };

    return (
        <div className="p-1">
            <div className="border-b-2 border-[#b89b70]/30 pb-2 mb-4 text-center">
                <h1 className="text-4xl">{name || "Безымянный"}</h1>
                <div className="grid grid-cols-2 text-sm text-slate-300">
                    <p><strong>Игрок:</strong> {player || "Аноним"}</p>
                    <p><strong>Профессия:</strong> {profession?.name || 'Не выбрана'}</p>
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2 pb-1 border-b border-[#b89b70]/20">Концепция</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-300">
                    <p><strong>Архетип:</strong> {archetype}</p>
                    <p><strong>Прошлое:</strong> {past}</p>
                    <p className="col-span-2"><strong>Цель:</strong> {goal}</p>
                    <p className="col-span-2"><strong>Слабость:</strong> {flaw}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-2xl font-bold mb-2 pb-1 border-b border-[#b89b70]/20">Характеристики</h3>
                    <div className="grid grid-cols-4 gap-4 mt-2">
                        {Object.entries(attributes).map(([key, attr]) => (
                            <div key={key} className="text-center bg-black/20 p-2 rounded-sm">
                                <p className="text-sm uppercase text-slate-400">{(attr as Attribute).name}</p>
                                <p className="text-3xl font-bold text-white">{(attr as Attribute).value || 0}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-2 pb-1 border-b border-[#b89b70]/20">Параметры</h3>
                     <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-300 mt-2">
                        <p><strong>Здоровье (ЗДР):</strong> {derivedStats.health}</p>
                        <p><strong>Рассудок (РАС):</strong> {derivedStats.sanity}</p>
                        <p><strong>Инициатива (ИНЦ):</strong> {derivedStats.initiative}</p>
                        <p><strong>Перегрев (ПП):</strong> {derivedStats.overheat}</p>
                        <p><strong>Удача (УДЧ):</strong> {derivedStats.luck}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Personal;
