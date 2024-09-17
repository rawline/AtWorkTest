import styles from './header.module.scss'

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <img src="src\assets\logo.svg" alt="logo" />
                <div className={styles.menu}>
                    <img className={styles.icons} src="src\assets\Favorite.svg" alt="Favourite" />
                    <img className={styles.icons} src="src\assets\Notification.svg" alt="Notification" />
                    <img className={styles.photo} src="src\assets\Foto.png" alt="foto" />
                    <p className={styles.name}>ivan123</p>
                </div>
            </div>
        </div>
    )
}