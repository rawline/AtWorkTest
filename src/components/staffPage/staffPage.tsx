import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { setCards, archiveCard, activeCard } from '../../redux/staffSlice';
import Card from '../card/card';
import useStaffService from '../../services/services';
import ErrorMessage from '../error/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { UserCard } from '../../services/services';
import styles from './staffPage.module.scss';

const StaffPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [newItemLoading, setNewItemLoading] = useState(false);

  // Получаем карточки из хранилища
  const cards = useSelector((state: RootState) => state.staff.cards);

  const { loading, error, getUsers } = useStaffService();

  useEffect(() => {
    // Если в хранилище нет карточек, загружаем их по API
    if (cards.length === 0) {
      onRequest(true);
    } else {
      setNewItemLoading(true);
    }
  }, [cards, dispatch]); // Зависимость от `cards`, чтобы обновляться при изменениях

  const onRequest = (initial: boolean) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getUsers()
      .then(onUsersLoaded)
      .catch(() => setNewItemLoading(false)); // Обработка ошибок
  };

  const onUsersLoaded = (newUserList: UserCard[]) => {
    dispatch(setCards(newUserList)); // Сохраняем карточки в хранилище
    setNewItemLoading(false);
  };

  const handleArchive = (id: number) => {
    dispatch(archiveCard(id)); // Архивируем карточку
  };

  const handleActive = (id: number) => {
    dispatch(activeCard(id)); // Активируем карточку
  };

  const renderUsers = () => {

    const activeUsers = cards
      .filter((card) => !card.archived) // Фильтруем неархивированные карточки
      .map((card) => (
        <Card key={card.id} card={card} onArchive={handleArchive} />
      ))

    const archiveUsers = cards
      .filter((card) => card.archived) // Фильтруем архивированные карточки
      .map((card) => (
        <Card key={card.id} card={card} onActive={handleActive} />
      ))

    return (
      <>
        <h2 className={styles.title}>Активные</h2>
        <div className={styles.cardsWrapper}>
          {activeUsers}
        </div>

        <h2 className={styles.title}>Архив</h2>
        <div className={styles.cardsWrapper}>
          {archiveUsers}
        </div>
      </>
    )

  };

  const users = renderUsers();
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className={styles.container}>
      {errorMessage}
      {spinner}
      {users}
    </div>
  );
};

export default StaffPage;
