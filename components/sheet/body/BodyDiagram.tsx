import React from 'react';
import type { Character, BodyPart } from '../../../types';

interface BodyDiagramProps {
    implants: Character['implants'];
    selectedPart: BodyPart | null;
    onSelectPart: (part: BodyPart) => void;
}

const BodyPartComponent: React.FC<{
    partId: BodyPart;
    path: string;
    isSelected: boolean;
    hasImplants: boolean;
    onClick: (partId: BodyPart) => void;
}> = ({ partId, path, isSelected, hasImplants, onClick }) => {
    const baseClasses = "transition-all duration-200 cursor-pointer";
    let stateClasses = '';

    if (isSelected) {
        stateClasses = "fill-[var(--accent-color)] stroke-[var(--header-color)]";
    } else if (hasImplants) {
        stateClasses = "fill-[var(--accent-color)]/30 hover:fill-[var(--accent-color)]/60 stroke-[var(--accent-color)]";
    } else {
        stateClasses = "fill-transparent hover:fill-[var(--accent-color)]/30 stroke-[var(--accent-color)]";
    }

    return <path d={path} className={`${baseClasses} ${stateClasses}`} onClick={() => onClick(partId)} />;
};


const BodyDiagram: React.FC<BodyDiagramProps> = ({ implants, selectedPart, onSelectPart }) => {
    const bodyParts: { id: BodyPart, path: string }[] = [
        { id: 'head', path: "M 49.8,11.5 C 55.4,11.5 60,16.1 60,21.7 60,27.3 55.4,32 49.8,32 44.2,32 39.6,27.3 39.6,21.7 39.6,16.1 44.2,11.5 49.8,11.5 Z" },
        { id: 'torso', path: "M 67.5,35.5 63,51.5 62,81.5 38,81.5 37,51.5 32.5,35.5 Z" },
        { id: 'rightArm', path: "M 32,36 29,51.5 24,79.5 18,78 21,49.5 26,35.5 Z" },
        { id: 'leftArm', path: "m 68,36 6.5,23.5 3.5,20 -6,1.5 -3,-26.5 z" },
        { id: 'rightLeg', path: "M 37.5,82 33,117.5 28.5,140.5 38.5,140.5 43,82 Z" },
        { id: 'leftLeg', path: "M 62.5,82 57.5,116 53,140.5 61.5,140.5 67.5,82 Z" },
    ];
    
    return (
        <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" className="max-w-[200px] w-full">
            <g strokeWidth="1.5">
                {bodyParts.map(part => (
                    <BodyPartComponent
                        key={part.id}
                        partId={part.id}
                        path={part.path}
                        isSelected={selectedPart === part.id}
                        hasImplants={(implants[part.id]?.length || 0) > 0}
                        onClick={onSelectPart}
                    />
                ))}
            </g>
        </svg>
    );
};

export default BodyDiagram;