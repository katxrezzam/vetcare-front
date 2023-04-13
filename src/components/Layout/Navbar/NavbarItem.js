import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from '../../../css/Navbar/NavbarItem.module.css'

const NavbarItem = ({path, icon, name}) => {
    return(
        <Link to={path} className={styles.navItem}>
            <FontAwesomeIcon icon={icon}/>
            {name}
        </Link>
    )
}
export default NavbarItem