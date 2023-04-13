import styles from '../../../css/CheckOut/CheckOutLayout.module.css'

const CheckOutLayout = ({ children }) => {
    return(
        <div className={styles.checkOutLayout}>
            {children}
        </div>
    )
}

export default CheckOutLayout
