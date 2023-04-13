import styles from '../../../css/CheckOut/CheckOut.module.css'
import Button from "../../Form/Button";
import {useSelector} from "react-redux";
import {getCart} from "../../../features/cart/cartSlice";

import ShoppingCartItem from "../../Layout/Navbar/ShoppingCartItem";
import CartItem from "./CartItem";

const Summary = ({ children }) => {

    const cart = useSelector(getCart)

    return(
        <section className={styles.summary}>
            <h1>Resumen</h1>
            <div>
                {
                    cart?.length
                        ? (cart.map( (product, i) => {
                            return <CartItem key={i} product={product} index={i}/>
                        }))
                        : <p>No productos que mostrar</p>
                }
            </div>
            <div className={styles.buttonField}>
                { children }
            </div>
        </section>
    )
}
export default Summary