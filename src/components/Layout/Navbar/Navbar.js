import styles from '../../../css/Navbar/Navbar.module.css'

const Navbar = ({children, openBars}) => {
    return(
        <nav className={openBars ? `${styles.navbar} ${styles.active}` : styles.navbar}>
            {children}
        </nav>
    )
}

export default Navbar