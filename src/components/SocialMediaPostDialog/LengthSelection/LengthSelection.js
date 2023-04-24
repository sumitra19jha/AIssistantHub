import React from 'react';
import './LengthSelection.css';

const LengthSelection = ({ onLengthSelect, selectedLength }) => {
    return (
        <div className="length-selection">
            <LengthCard
                label="Short"
                value="SHORT"
                onSelect={onLengthSelect}
                isSelected={selectedLength === 'SHORT'}
            />
            <LengthCard
                label="Medium"
                value="MEDIUM"
                onSelect={onLengthSelect}
                isSelected={selectedLength === 'MEDIUM'}
            />
            <LengthCard
                label="Long"
                value="LONG"
                onSelect={onLengthSelect}
                isSelected={selectedLength === 'LONG'}
            />
        </div>
    );
};


const LengthCard = ({ label, value, onSelect, isSelected }) => {
    return (
        <div
            className={`length-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(value)}
        >
            <div className="length-card-name">{label}</div>
        </div>
    );
};


export default LengthSelection;