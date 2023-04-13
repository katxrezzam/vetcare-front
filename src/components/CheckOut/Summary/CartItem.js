import {useDispatch} from "react-redux";
import {removeProductCart} from "../../../features/cart/cartSlice";
import styles from '../../../css/ShoppingCartItem.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const CartItem = ({product, index}) => {

    const {name, price, quantity, category} = product
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(removeProductCart(index))
    }

    return(
        <div className={styles.cartItem}>
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className={styles.trash}/>
            <img src={require(`../../../img/product/${category}.jpg`)} alt={'cartItem'}/>
            <div className={styles.content}>
                <h3>{name}</h3>
                <span>{price}</span>
                <span>{quantity}</span>
            </div>
        </div>
    )
}

export default CartItem