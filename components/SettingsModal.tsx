import React, { useRef } from 'react';

interface SettingsModalProps {
    onClose: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    onSave: () => void;
    onLoad: (file: File) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, theme, onToggleTheme, onSave, onLoad }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLoadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onLoad(file);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="card w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h2 className="text-3xl mb-6 text-center">Настройки</h2>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg">Тема оформления</span>
                        <button onClick={onToggleTheme} className="btn">
                            Переключить на {theme === 'dark' ? 'светлую' : 'темную'}
                        </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-lg">Сохранение</span>
                        <button onClick={onSave} className="btn">
                            Сохранить персонажа
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-lg">Загрузка</span>
                        <button onClick={handleLoadClick} className="btn">
                            Загрузить персонажа
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".json"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button onClick={onClose} className="btn">Закрыть</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;