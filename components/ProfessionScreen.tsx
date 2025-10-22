import React, { useState } from 'react';
import { PROFESSIONS } from '../constants';
import type { Profession } from '../types';
import { ArrowLeftIcon } from './icons';

interface ProfessionScreenProps {
  onSelectProfession: (profession: Profession) => void;
  onBack: () => void;
}

const ProfessionModal: React.FC<{ profession: Profession; onClose: () => void; onSelect: () => void; }> = ({ profession, onClose, onSelect }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 fade-in">
            <div className="card w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                 <div className="p-2">
                    <h2 className="text-4xl mb-4">{profession.name}</h2>
                    <p className="text-lg mb-6 text-slate-300">{profession.description}</p>
                    <div className="mb-4"><h4 className="text-2xl mb-2">Проф. навыки:</h4><p className="text-slate-300">{profession.skills.join(', ')}</p></div>
                    <div className="mb-4"><h4 className="text-2xl mb-2">Кредитный рейтинг:</h4><p className="text-slate-300">{profession.credit}</p></div>
                    <div className="mb-6"><h4 className="text-2xl mb-2">Стартовое снаряжение:</h4><p className="text-slate-300" dangerouslySetInnerHTML={{ __html: profession.gear.replace(/;/g, '<br>') }}></p></div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button onClick={onClose} className="btn bg-black/20">Закрыть</button>
                        <button onClick={onSelect} className="btn bg-[#b89b70] text-[#012a36]">Выбрать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ProfessionScreen: React.FC<ProfessionScreenProps> = ({ onSelectProfession, onBack }) => {
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);

  const handleSelect = () => {
      if (selectedProfession) {
          onSelectProfession(selectedProfession);
      }
  };

  return (
    <section className="w-full max-w-7xl mx-auto fade-in">
        <button onClick={onBack} className="btn mb-4"><ArrowLeftIcon /> Назад</button>
        <h2 className="text-5xl text-center mb-8">Выберите свой путь</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROFESSIONS.map(prof => (
                <div key={prof.name} 
                    className="card cursor-pointer h-full flex flex-col transition-all duration-300 hover:border-[#b89b70]/80 hover:bg-black/50"
                    onClick={() => setSelectedProfession(prof)}
                >
                    <h3 className="text-3xl mb-2 ">{prof.name}</h3>
                    <p className="text-slate-400 flex-grow">{prof.description}</p>
                </div>
            ))}
        </div>
        {selectedProfession && (
            <ProfessionModal 
                profession={selectedProfession} 
                onClose={() => setSelectedProfession(null)} 
                onSelect={handleSelect}
            />
        )}
    </section>
  );
};

export default ProfessionScreen;
