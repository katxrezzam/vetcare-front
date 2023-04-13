import {Link} from "react-router-dom";
import styles from '../../css/Header.module.css'
import petcareLogo  from '../../img/petcareLogo.png'
import Navbar from "./Navbar/Navbar";
import NavbarItem from "./Navbar/NavbarItem";
import {
    faBars,
    faPaw, faRightFromBracket,
    faSearch,
    faShoppingCart,
    faTruck,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import NavbarForm from "./Navbar/NavbarForm";
import NavbarShoppingCart from "./Navbar/NavbarShoppingCart";
import NavbarProfileItem from "./Navbar/NavbarProfileItem";
import DropdownProfileItem from "./Dropdown/Profile/DropdownProfileItem";
import DropdownProfile from "./Dropdown/Profile/DropdownProfile";
import {useDispatch} from "react-redux";
import {logOut} from "../../features/auth/authSlice";
import {clearAddress} from "../../features/profile/address/addressSlice";
import { clearPet } from "../../features/profile/pet/petSlice";
import {clearCard} from "../../features/profile/card/cardSlice";
import {clearCart} from "../../features/cart/cartSlice";

const Header = () => {

    const [openSearch, setOpenSearch] = useState(false)
    const [openCart, setOpenCart] = useState(false)
    const [openBars, setOpenBars] = useState(false)

    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(clearAddress())
        dispatch(clearPet())
        dispatch(logOut())
        dispatch(clearCard())
        dispatch(clearCart())
    }

    return(
        <header className={styles.header}>
            <Link to={'/'} className={styles.logo}>
                <img src={petcareLogo} alt="petcareLogo"/>
                PETCARE
            </Link>
            <Navbar openBars={openBars}>
                <NavbarItem path={'/'} name={'SERVICIOS'} icon={faPaw}/>
                <NavbarItem path={'/store'} name={'TIENDA'} icon={faPaw}/>
                <NavbarItem path={'/'} name={'DIRECCIONES'} icon={faPaw}/>
            </Navbar>
            <div className={styles.actions}>
                <div className={styles.icons}>
                    <FontAwesomeIcon className={styles.menuButton} icon={faBars} onClick={() => setOpenBars(!openBars)}/>
                    <FontAwesomeIcon icon={faSearch} onClick={() => setOpenSearch(!openSearch)}/>
                    <FontAwesomeIcon icon={faShoppingCart} onClick={() => setOpenCart(!openCart)}/>
                </div>
                <NavbarProfileItem>
                    <DropdownProfile>
                        <DropdownProfileItem icon={faUser} name={'Mi perfil'} path={'/profile'}/>
                        <DropdownProfileItem icon={faTruck} name={'Mis ordenes'} path={'/orders'}/>
                        <DropdownProfileItem icon={faRightFromBracket} name={'Salir'} path={'/'} action={signOut}/>
                    </DropdownProfile>
                </NavbarProfileItem>
            </div>
            <NavbarForm openSearch={openSearch}/>
            <NavbarShoppingCart openCart={openCart}/>

        </header>
    )
}

export default Header