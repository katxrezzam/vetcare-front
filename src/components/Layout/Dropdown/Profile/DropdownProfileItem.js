import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import styles from '../../../../css/Dropdown/Profile/DropdownProfileItem.module.css'

const DropdownProfileItem = ({ path,icon, name, action }) => {
    return(
        <li className={styles.profileItem} onClick={action}>
            <Link to={path}>
                <FontAwesomeIcon icon={icon}/>
                {name}
            </Link>
        </li>
    )
}

export default DropdownProfileItem