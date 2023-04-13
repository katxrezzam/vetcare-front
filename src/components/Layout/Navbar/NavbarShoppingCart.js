import styles from '../../../css/Navbar/NavbarShoppingCart.module.css'

import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCart} from "../../../features/cart/cartSlice";
import {useEffect, useState} from "react";
import ShoppingCartItem from "./ShoppingCartItem";


const NavbarShoppingCart = ({ openCart}) => {

    const cart = useSelector(getCart)
    const [totalPrice, setTotalPrice] = useState(0.0)

    useEffect(() => {
        let total = 0
        for(let product in cart){
            total = total + cart[product].price
        }
        setTotalPrice(total)
    }, [])

    useEffect(() => {
        let total = 0
        for(let product in cart){
            total = total + cart[product].price
        }
        setTotalPrice(total)
    }, [cart])

    return(
        <div className={openCart ? `${styles.shoppingCart} ${styles.active}` : styles.shoppingCart}>
            {
                cart.length
                    ? ( cart.map( (product, i) => {
                        return <ShoppingCartItem key={i} index={i} product={product}/>
                    }))
                    : (<p className={styles.cartEmpty}>No ha añadido productos al carrito</p>)
            }
            <div className={styles.total}>Total : s/.{totalPrice}</div>
            <Link to={'/checkout'} className={styles.btn}>Pagar ahora</Link>
        </div>
    )
}

export default NavbarShoppingCart