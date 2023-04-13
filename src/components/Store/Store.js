import Header from "../Layout/Header";
import styles from '../../css/Store/Store.module.css'
import Filter from "./Filter/Filter";
import Product from "./Product/Product";

const Store = () => {

    return(
        <>
            <Header/>
            <main className={styles.main}>
                <Filter/>
                <Product/>
            </main>
        </>
    )
}

export default Store