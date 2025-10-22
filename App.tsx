import React, { useState, useCallback, useEffect } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import WelcomeScreen from './components/WelcomeScreen';
import ProfessionScreen from './components/ProfessionScreen';
import CreatorScreen from './components/CreatorScreen';
import InteractiveSheet from './components/sheet/InteractiveSheet';
import SettingsModal from './components/SettingsModal';
import { ATTRIBUTES_DATA } from './constants';
import type { Character, Profession, OMI, OS, Script, Implant, BodyPart } from './types';
import { SettingsIcon } from './components/icons';

type Screen = 'welcome' | 'profession' | 'creator' | 'sheet';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>('welcome');
    const [theme, setTheme] = useState<Theme>('dark');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'light') {
            root.classList.add('light');
        } else {
            root.classList.remove('light');
        }
    }, [theme]);

    const getInitialCharacterState = (): Character => ({
        name: '',
        player: '',
        archetype: '',
        past: '',
        goal: '',
        flaw: '',
        profession: null,
        attributes: JSON.parse(JSON.stringify(ATTRIBUTES_DATA)),
        skills: {},
        luck: (Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1) * 5,
        gear: '',
        omi: null,
        os: null,
        scripts: [],
        implants: {
            head: [], torso: [], leftArm: [], rightArm: [], leftLeg: [], rightLeg: []
        },
    });

    const [character, setCharacter] = useState<Character>(getInitialCharacterState);
    
    const handleStart = () => setScreen('profession');
    
    const handleBackToWelcome = () => setScreen('welcome');

    const handleSelectProfession = useCallback((profession: Profession) => {
        const newCharacter = getInitialCharacterState();
        newCharacter.profession = profession;
        if (profession.gear) {
            newCharacter.gear = profession.gear.split(' / ')[0];
        }
        setCharacter(newCharacter);
        setScreen('creator');
    }, []);

    const handleBackToProfessions = () => {
        setCharacter(getInitialCharacterState());
        setScreen('profession');
    }
    
    const handleFinalize = () => setScreen('sheet');

    const handleEdit = () => setScreen('creator');
    
    const updateCharacter = (updates: Partial<Character>) => {
        setCharacter(prev => ({...prev, ...updates}));
    };

    const handleSaveCharacter = () => {
        try {
            const charString = JSON.stringify(character, null, 2);
            const blob = new Blob([charString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${character.name || 'character'}_atlantica1963.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to save character:", error);
            alert("Ошибка при сохранении персонажа.");
        }
    };

    const handleLoadCharacter = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const result = event.target?.result;
                if (typeof result === 'string') {
                    const loadedChar = JSON.parse(result);
                    // Basic validation
                    if (loadedChar.attributes && loadedChar.skills) {
                        // Merge with initial state to ensure all keys are present
                        const initialState = getInitialCharacterState();
                        const finalChar = { ...initialState, ...loadedChar };
                        setCharacter(finalChar);
                        setScreen('sheet');
                        setIsSettingsOpen(false);
                    } else {
                        throw new Error("Invalid character file structure.");
                    }
                }
            } catch (error) {
                console.error("Failed to load character:", error);
                alert("Ошибка при загрузке: файл поврежден или имеет неверный формат.");
            }
        };
        reader.readAsText(file);
    };

    const renderScreen = () => {
        switch(screen) {
            case 'welcome':
                return <WelcomeScreen onStart={handleStart} />;
            case 'profession':
                return <ProfessionScreen onSelectProfession={handleSelectProfession} onBack={handleBackToWelcome} />;
            case 'creator':
                return <CreatorScreen character={character} setCharacter={setCharacter} onBack={handleBackToProfessions} onFinalize={handleFinalize} />;
            case 'sheet':
                return <InteractiveSheet 
                    character={character} 
                    onEdit={handleEdit}
                    onUpdateCharacter={updateCharacter}
                />;
            default:
                return <WelcomeScreen onStart={handleStart} />;
        }
    }

    return (
        <>
            <BackgroundCanvas />
            <button onClick={() => setIsSettingsOpen(true)} className="fixed top-4 right-4 z-[100] btn p-3">
                <SettingsIcon />
            </button>

            {isSettingsOpen && (
                <SettingsModal
                    onClose={() => setIsSettingsOpen(false)}
                    theme={theme}
                    onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                    onSave={handleSaveCharacter}
                    onLoad={handleLoadCharacter}
                />
            )}

            <main className="relative min-h-screen w-full flex items-center justify-center p-4">
                {renderScreen()}
            </main>
        </>
    );
};

export default App;