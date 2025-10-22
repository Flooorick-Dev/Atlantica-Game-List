import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <section className="text-center space-y-8 fade-in">
      <h1 className="text-8xl md:text-9xl text-[#e8d5a3]" style={{ textShadow: '0 0 15px rgba(232, 213, 163, 0.5)' }}>Atlantica 1963</h1>
      <p className="text-xl text-slate-300 max-w-2xl mx-auto">
        Под вечно дождливым небом, в неоновом блеске подводного города, каждая тень скрывает тайну. <br />Какую из них откроешь ты?
      </p>
      <button 
        onClick={onStart} 
        className="btn text-2xl px-10 py-3"
      >
        Начать новую жизнь
      </button>
    </section>
  );
};

export default WelcomeScreen;
