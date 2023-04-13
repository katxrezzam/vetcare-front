import styles from '../../../css/Store/Product/CardProduct.module.css'
import Button from "../../Form/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBagShopping, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {addProductCart} from "../../../features/cart/cartSlice";


const CardProduct = ({ product }) => {
    let image
    const {name, price, stock, description, _id, category} = product

    const dispatch = useDispatch()

    const handleAddCart = () => {
        const payload = {
            name,
            price,
            stock,
            id: _id,
            category,
            quantity: 1
        }
        dispatch(addProductCart(payload))
    }

    return(
        <div className={styles.cardProduct}>
            <div className={styles.imageContainer}>
                <img src={require(`../../../img/product/${category}.jpg`)} alt="product"/>
            </div>
            <div className={styles.cardContainer}>
                <h1>{name}</h1>
                <span>{description}</span>
                <span className={styles.price}>s/.{price}</span>
            </div>
            <div className={styles.buttonShoppingCart}>
                <Button onClick={handleAddCart}>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                    Añadir al carrito
                </Button>
            </div>
            <div className={styles.buttonShoppingNow}>
                <Button>
                    <FontAwesomeIcon icon={faBagShopping}/>
                    Comprar ahora
                </Button>
            </div>
        </div>
    )
}
export default CardProduct