// Dialog/Dialog.js
import React from 'react';
import classes from './Dialog.module.css';

const Dialog = ({ isOpen, title, data, renderItem, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={classes.dialogOverlay}>
            <div className={classes.dialog}>
                <div className={classes.dialogHeader}>
                    <h3 className={classes.dialogTitle}>{title}</h3>
                    <button className={classes.dialogCloseButton} onClick={onClose}>&times;</button>
                </div>
                <ul className={classes.dialogList}>
                    {data.map(renderItem)}
                </ul>
            </div>
        </div>
    );
};

export default Dialog;
