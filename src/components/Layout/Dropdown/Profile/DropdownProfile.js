import styles from '../../../../css/Dropdown/Profile/DropdownProfile.module.css'
import {selectCurrentUser} from "../../../../features/auth/authSlice";
import {useSelector} from "react-redux";

const DropdownProfile = ({children}) => {

    const user = useSelector(selectCurrentUser)
        return(
            <div className={styles.profileDropdown}>
                <h4>{user.firstName} <br/> <span>{user.email}</span></h4>
                <ul>
                    {children}
                </ul>
            </div>
        )
}



export default DropdownProfile