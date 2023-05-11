import React from 'react';
import styles from './LengthSelection.module.css';

const LengthSelection = ({ onLengthSelect, selectedLength }) => {
    return (
        <div className={styles.length_selection}>
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
            className={`${styles.length_card} ${isSelected ? styles.selected : ''}`}
            onClick={() => onSelect(value)}
        >
            <div className={styles.length_card_name}>{label}</div>
        </div>
    );
};


export default LengthSelection;