import React from 'react';
import styles from './CreateCard.module.css';

const CreateCard = ({ cardType, onClick }) => {
  return (
    <div className={styles.create_card} onClick={onClick}>
      <div className={styles.create_card__icon}>+</div>
      <div className={styles.create_card__text}>
        {cardType === 'project' ? 'Create Post' : 'Analyse SEO'}
      </div>
    </div>
  );
};

export default CreateCard;