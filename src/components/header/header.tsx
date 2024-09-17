import styles from './header.module.scss'

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <img src="../../../public/logo.svg" alt="logo" />
                <div className={styles.menu}>
                    <img className={styles.icons} src="../../../public/Favorite.svg" alt="Favourite" />
                    <img className={styles.icons} src="../../../public/Notification.svg" alt="Notification" />
                    <img className={styles.photo} src="../../../public/Foto.png" alt="foto" />
                    <p className={styles.name}>ivan123</p>
                </div>
            </div>
        </div>
    )
}