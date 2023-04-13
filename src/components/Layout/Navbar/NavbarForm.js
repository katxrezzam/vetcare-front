import styles from "../../../css/Navbar/NavbarForm.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const NavbarForm = ({ openSearch }) => {
    return(
        <form className={ openSearch ? `${styles.searchForm} ${styles.active}` : styles.searchForm}>
            <input type="search" className={styles.box} placeholder={'Buscar...'}/>
            <button><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
        </form>
    )
}
export default  NavbarForm