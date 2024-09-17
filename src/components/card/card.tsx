import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCard } from '../../services/services';
import classNames from 'classnames'; // Для удобного управления классами
import styles from './card.module.scss';
import img from '../../../public/rayul-_M6gy9oHgII-unsplash (1) 1.png'

interface CardProps {
    card: UserCard;
    onArchive?: (id: number) => void;
    onActive?: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ card, onArchive, onActive }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // Состояние для контроля видимости

    // Динамическое добавление класса для изображения, если карточка в архиве
    const imgClass = classNames(styles.img, {
        [styles.grayscale]: card.archived, // Добавляем класс для черно-белого изображения, если карточка архивирована
    });

    const title = classNames(styles.title, {
        [styles.archivedCardTitle]: card.archived,
    });

    const subTitle = classNames(styles.subTitle, {
        [styles.archivedSubTitle]: card.archived,
    });

    const city = classNames(styles.cardCity, {
        [styles.archivedCity]: card.archived,
    });

    const dropDown = classNames(styles.dropdown, {
        [styles.dropdownArchived]: card.archived,
    });

    // Функция для сокрытия карточки
    const handleHide = () => {
        setIsVisible(false); // Устанавливаем видимость карточки в `false`
    };

    if (!isVisible) return null; // Если карточка скрыта, возвращаем `null`, чтобы она не рендерилась

    return (
        <div className={styles.card}>
            <img className={imgClass} src={img} alt="img" />

            <div className={styles.textBlock}>
                <div className={styles.cardTitle}>
                    <h3 className={title}>{card.name}</h3>
                    <svg
                        viewBox="0 0 4 17"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.cardMenu}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <path d="M0 14.5C0 15.6 0.9 16.5 2 16.5C3.1 16.5 4 15.6 4 14.5C4 13.4 3.1 12.5 2 12.5C0.9 12.5 0 13.4 0 14.5ZM0 2.5C0 3.6 0.9 4.5 2 4.5C3.1 4.5 4 3.6 4 2.5C4 1.4 3.1 0.5 2 0.5C0.9 0.5 0 1.4 0 2.5ZM0 8.5C0 9.6 0.9 10.5 2 10.5C3.1 10.5 4 9.6 4 8.5C4 7.4 3.1 6.5 2 6.5C0.9 6.5 0 7.4 0 8.5Z" />
                    </svg>
                </div>
                <p className={subTitle}>{card.companyName}</p>
                <p className={city}>{card.city}</p>
            </div>

            {menuOpen && !card.archived && (
                <div className={styles.dropdown}>
                    <Link className={styles.dropdownItem} to={`/card/${card.id}`}>
                        Редактировать
                    </Link>
                    {onArchive && (
                        <div className={styles.dropdownItem} onClick={() => onArchive(card.id)}>
                            Архивировать
                        </div>
                    )}
                    <div className={styles.dropdownItem} onClick={handleHide}>
                        Скрыть
                    </div>
                </div>
            )}

            {menuOpen && card.archived && (
                <div className={dropDown}>
                    {onActive && (
                        <div className={styles.dropdownItem} onClick={() => onActive(card.id)}>
                            Активировать
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Card;
