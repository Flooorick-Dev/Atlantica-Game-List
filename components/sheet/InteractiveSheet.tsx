import React, { useState } from 'react';
import type { Character } from '../../types';
import { EditIcon, UserIcon, SparklesIcon, CpuChipIcon, CodeBracketIcon, ShoppingBagIcon } from '../icons';

import Personal from './Personal';
import Skills from './Skills';
import Cybernetics from './Cybernetics';
import Scripts from './Scripts';
import Gear from './Gear';


interface InteractiveSheetProps {
  character: Character;
  onEdit: () => void;
  onUpdateCharacter: (updates: Partial<Character>) => void;
}

type Tab = 'personal' | 'skills' | 'cybernetics' | 'scripts' | 'gear';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'personal', label: 'Личное дело', icon: <UserIcon /> },
    { id: 'skills', label: 'Навыки', icon: <SparklesIcon /> },
    { id: 'cybernetics', label: 'Кибернетика', icon: <CpuChipIcon /> },
    { id: 'scripts', label: 'Скрипты', icon: <CodeBracketIcon /> },
    { id: 'gear', label: 'Снаряжение', icon: <ShoppingBagIcon /> },
];

const InteractiveSheet: React.FC<InteractiveSheetProps> = ({ character, onEdit, onUpdateCharacter }) => {
    const [activeTab, setActiveTab] = useState<Tab>('personal');

    const renderContent = () => {
        switch (activeTab) {
            case 'personal': return <Personal character={character} />;
            case 'skills': return <Skills character={character} />;
            case 'cybernetics': return <Cybernetics character={character} onUpdateCharacter={onUpdateCharacter} />;
            case 'scripts': return <Scripts character={character} onUpdateCharacter={onUpdateCharacter} />;
            case 'gear': return <Gear character={character} />;
            default: return null;
        }
    }

    return (
        <section className="w-full max-w-7xl mx-auto fade-in h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <button onClick={onEdit} className="btn"><EditIcon /> Редактировать</button>
                <h2 className="text-4xl md:text-5xl text-center hidden md:block">Личное дело персонажа</h2>
                <div />
            </div>

            <div className="card w-full flex-grow flex flex-col md:flex-row overflow-hidden">
                {/* Desktop Tabs */}
                <aside className="hidden md:flex flex-col w-48 border-r border-[#b89b70]/30 pr-4 flex-shrink-0">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 p-3 my-1 rounded-sm text-left transition-colors duration-200 ${activeTab === tab.id ? 'bg-[var(--accent-color)] text-[var(--primary-contrast-color)]' : 'text-[var(--header-color)] hover:bg-black/10'}`}>
                            {tab.icon}
                            <span className="font-bold">{tab.label}</span>
                        </button>
                    ))}
                </aside>

                {/* Mobile Tabs */}
                 <aside className="md:hidden flex-shrink-0 mb-4 pb-4 border-b border-[#b89b70]/30">
                    <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
                         {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center flex-shrink-0 gap-2 p-2 rounded-sm transition-colors duration-200 ${activeTab === tab.id ? 'bg-[var(--accent-color)] text-[var(--primary-contrast-color)]' : 'bg-black/20'}`}>
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </aside>

                <div className="flex-grow overflow-y-auto md:pl-6">
                    {renderContent()}
                </div>
            </div>
        </section>
    );
};

export default InteractiveSheet;