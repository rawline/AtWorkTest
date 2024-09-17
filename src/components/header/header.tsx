import styles from './header.module.scss'
import logo from '../../../public/logo.svg'
import fav from "../../../public/Favorite.svg"
import not from "../../../public/Notification.svg"
import photo from "../../../public/Foto.png"

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <img src={logo} alt="logo" />
                <div className={styles.menu}>
                    <img className={styles.icons} src={fav} alt="Favourite" />
                    <img className={styles.icons} src={not} alt="Notification" />
                    <img className={styles.photo} src={photo} alt="foto" />
                    <p className={styles.name}>ivan123</p>
                </div>
            </div>
        </div>
    )
}