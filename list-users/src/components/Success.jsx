import React from 'react';
import success from '../assets/success.svg';

export const Success = ({ count, onBack }) => {
    return (
        <div className="success-block">
            <img src={success} alt="Success" />
            <h3>Успешно!</h3>
            <p>Всем {count} пользователям отправлено приглашение.</p>
            <button className="send-invite-btn" onClick={onBack}>Назад</button>
        </div>
    );
};
