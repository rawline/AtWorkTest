import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { updateCard } from '../../redux/staffSlice';
import { UserCard } from '../../services/services';
import styles from './CardDetailsPage.module.scss'; // Подключаем стили
import bigPhoto from '../../../public/bigPhoto.png';
import success from '../../../public/success.svg'

const CardDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем параметр id из URL
  const navigate = useNavigate(); // Хук для навигации
  const dispatch = useDispatch<AppDispatch>();
  const card = useSelector((state: RootState) =>
    state.staff.cards.find((card: UserCard) => card.id === Number(id))
  );

  const [editedCard, setEditedCard] = useState(card || {
    id: 0,
    name: '',
    username: '',
    email: '',
    city: '',
    phone: '',
    companyName: '',
    archived: false
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    if (card) {
      setEditedCard(card);
    }
  }, [card]);

  const handleSave = () => {
    if (editedCard) {
      dispatch(updateCard(editedCard));
      setIsPopupVisible(true); // Показываем попап после сохранения

      // Автоматически закрываем попап через 4 секунды
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 4000);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.backBtn} onClick={handleBack}>
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.125 11H0.875" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 17.125L0.875 11L7 4.875" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <button className={styles.backButton}>Назад</button>
      </div>

      <div className={styles.profileContainer}>
        <div className={styles.profileImageSection}>
          <img className={styles.profileImage} src={bigPhoto} alt="User" />
          <ul className={styles.profileMenu}>
            <li><strong>Данные профиля</strong></li>
            <li>Рабочее пространство</li>
            <li>Приватность</li>
            <li>Безопасность</li>
          </ul>
        </div>

        <div className={styles.profileDetailsSection}>
          <h2 className={styles.title}>Данные профиля</h2>

          <hr className={styles.line} />

          <div className={styles.form}>
            <label>Имя</label>
            <input
              type="text"
              value={editedCard.name}
              placeholder='Иван'
              onChange={(e) => setEditedCard({ ...editedCard, name: e.target.value })}
            />

            <label>Никнейм</label>
            <input
              type="text"
              value={editedCard.username}
              placeholder='ivan123'
              onChange={(e) => setEditedCard({ ...editedCard, username: e.target.value })}
            />

            <label>Почта</label>
            <input
              type="email"
              placeholder='example@mail.com'
              value={editedCard.email}
              onChange={(e) => setEditedCard({ ...editedCard, email: e.target.value })}
            />

            <label>Город</label>
            <input
              type="text"
              placeholder='Санкт-Петербург'
              value={editedCard.city}
              onChange={(e) => setEditedCard({ ...editedCard, city: e.target.value })}
            />

            <label>Телефон</label>
            <input
              type="tel"
              placeholder='+79895955'
              value={editedCard.phone}
              onChange={(e) => setEditedCard({ ...editedCard, phone: e.target.value })}
            />

            <label>Название компании</label>
            <input
              type="text"
              placeholder='CompanyName'
              value={editedCard.companyName}
              onChange={(e) => setEditedCard({ ...editedCard, companyName: e.target.value })}
            />

            <button className={styles.saveButton} onClick={handleSave}>Сохранить</button>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <>
          <div className={styles.popupOverlay} onClick={handleClosePopup}></div>
          <div className={styles.popup}>
            <span className={styles.closePopup} onClick={handleClosePopup}>×</span>
            <div className={styles.popUpWrapper}>
              <img className={styles.success} src={success} alt="scccss" />
              <p>Данные успешно сохранены!</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardDetailsPage;
