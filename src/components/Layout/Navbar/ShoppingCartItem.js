import {useDispatch} from "react-redux";
import {removeProductCart} from "../../../features/cart/cartSlice";
import styles from "../../../css/Navbar/NavbarShoppingCart.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import carItem from "../../../img/cartItem.jpg";

const ShoppingCartItem = ({ picture, product, index}) => {
    const {name, price, quantity} = product
    const nameAbbr = `${name.slice(0,15)}...`
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(removeProductCart(index))
    }

    return(
            <div className={styles.box}>
                <FontAwesomeIcon className={styles.trash} icon={faTrash} onClick={handleDelete}/>
                <img src={carItem} alt="cartItem"/>
                <div className={styles.content}>
                    <h3>{nameAbbr}</h3>
                    <span className={styles.price}>s/.{price}</span>
                    <span className={styles.quantity}>Cant: {quantity}</span>
                </div>
            </div>
    )
}

export default ShoppingCartItem