import React, { useState } from 'react';
import type { Character, OMI, OS, BodyPart } from '../../types';
import { OMIS, OPERATING_SYSTEMS } from '../../constants';
import BodyDiagram from './body/BodyDiagram';
import ImplantManager from './body/ImplantManager';

interface CyberneticsProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void;
}

const SelectionModal: React.FC<{
    items: (OMI | OS)[];
    title: string;
    onSelect: (item: any) => void;
    onClose: () => void;
}> = ({ items, title, onSelect, onClose }) => {

    const renderItemDetails = (item: OMI | OS) => {
        if ('memory' in item) { // It's an OMI
            return `Слоты: ${item.slots} | Память: ${item.memory}НП | ПП: ${item.overheatMod > 0 ? '+' : ''}${item.overheatMod} | ${item.price} кр.`;
        } else { // It's an OS
            return `Совместимость: ${item.omiCompat.join(', ')} | ${item.price} кр.`;
        }
    }

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="card w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <h3 className="text-3xl mb-4 text-center">{title}</h3>
                <div className="overflow-y-auto space-y-2 pr-2">
                    {items.map(item => (
                        <div key={item.id} onClick={() => { onSelect(item); onClose(); }} 
                             className="p-3 bg-black/20 border border-transparent hover:border-[#b89b70]/50 rounded-sm cursor-pointer">
                            <p className="font-bold text-[var(--header-color)]">{item.name}</p>
                            <p className="text-xs text-slate-400">{renderItemDetails(item)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const Cybernetics: React.FC<CyberneticsProps> = ({ character, onUpdateCharacter }) => {
    const [omiModalOpen, setOmiModalOpen] = useState(false);
    const [osModalOpen, setOsModalOpen] = useState(false);
    const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
    const { omi, os } = character;

    return (
        <div className="p-1">
            <h2 className="text-3xl mb-4">Кибернетика</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* OMI Section */}
                <div className="card">
                    <h3 className="text-2xl mb-2">Мозговой Имплант (ОМИ)</h3>
                    {omi ? (
                        <div className="space-y-1 text-sm">
                            <p className="text-xl text-white font-bold">{omi.name}</p>
                            <p><strong>Производитель:</strong> {omi.manufacturer}</p>
                            <p><strong>Нейро-память (НП):</strong> {omi.memory}</p>
                            <p><strong>Мод. Перегрева (ПП):</strong> {omi.overheatMod > 0 ? '+' : ''}{omi.overheatMod}</p>
                            <p><strong>Слоты ПО:</strong> {omi.slots}</p>
                            <p><strong>Цена:</strong> {omi.price} кр.</p>
                            <p className="text-xs text-slate-400 pt-2">{omi.note}</p>
                            <button onClick={() => onUpdateCharacter({ omi: null })} className="btn text-sm mt-2">Удалить</button>
                        </div>
                    ) : (
                        <button onClick={() => setOmiModalOpen(true)} className="btn">Выбрать ОМИ</button>
                    )}
                </div>

                {/* OS Section */}
                <div className="card">
                    <h3 className="text-2xl mb-2">Операционная Система (ОС)</h3>
                    {os ? (
                         <div className="space-y-1 text-sm">
                            <p className="text-xl text-white font-bold">{os.name}</p>
                            <p><strong>Производитель:</strong> {os.manufacturer}</p>
                            <p><strong>Бонус:</strong> {os.bonus}</p>
                            <p><strong>Защита:</strong> {os.defense}</p>
                            <p><strong>Скрипты:</strong> {os.scripts.join(', ')}</p>
                             <p><strong>Цена:</strong> {os.price} кр.</p>
                            <button onClick={() => onUpdateCharacter({ os: null })} className="btn text-sm mt-2">Удалить</button>
                        </div>
                    ) : (
                        <button onClick={() => setOsModalOpen(true)} className="btn">Выбрать ОС</button>
                    )}
                </div>
            </div>

            <div className="mt-6">
                 <h3 className="text-2xl mb-2">Импланты тела</h3>
                 <div className="card grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 flex justify-center items-start">
                        <BodyDiagram
                            implants={character.implants}
                            selectedPart={selectedPart}
                            onSelectPart={setSelectedPart}
                        />
                    </div>
                    <div className="lg:col-span-2">
                        {selectedPart ? (
                            <ImplantManager
                                part={selectedPart}
                                implants={character.implants[selectedPart]}
                                onUpdateCharacter={onUpdateCharacter}
                                character={character}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400">
                                <p>Выберите часть тела на схеме для управления имплантами.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {omiModalOpen && <SelectionModal items={OMIS} title="Выберите ОМИ" onSelect={(item) => onUpdateCharacter({ omi: item })} onClose={() => setOmiModalOpen(false)} />}
            {osModalOpen && <SelectionModal items={OPERATING_SYSTEMS} title="Выберите ОС" onSelect={(item) => onUpdateCharacter({ os: item })} onClose={() => setOsModalOpen(false)} />}
        </div>
    );
}

export default Cybernetics;