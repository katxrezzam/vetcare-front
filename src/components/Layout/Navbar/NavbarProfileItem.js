import styles from '../../../css/Navbar/NavbarProfileItem.module.css'
import profilePic from '../../../img/profilePic.jpg'
import {useEffect, useState} from "react";

const NavbarProfileItem = ({ children }) => {

    const [open, setOpen] = useState(false)

    return(
        <div className={styles.profilePortrait} onClick={() => setOpen(!open)}>
            <img src={profilePic} alt="profilePic"/>
            { open && children }
        </div>
    )
}

export default NavbarProfileItem