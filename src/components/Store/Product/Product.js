import styles from '../../../css/Store/Product/Product.module.css'
import CardProduct from "./CardProduct";
import {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../../Pagination";
import {useGetProductsMutation} from "../../../features/product/productApiSlice";

const Product = () => {

    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [productPerPage, setProductPerPage] = useState(4)
    const [getProductsApi, {isLoading}] = useGetProductsMutation()

    useEffect( () => {
        const callApi = async () => {
            try{
                const response = await getProductsApi().unwrap()
                setProducts(response)
            }catch (error){
                console.log(error)
            }
        }
        callApi()
    }, [])

    const lastPostIndex = currentPage * productPerPage
    const firstPostIndex = lastPostIndex - productPerPage

    const currentProducts = products.slice(firstPostIndex, lastPostIndex)
    console.log(currentProducts)

    return(
        <section className={styles.productContainer}>
            {
                currentProducts?.length
                    ? (currentProducts.map( (product, i) => {
                        return <CardProduct key={i} product={product}/>
                    }))
                    : (<p>No hay productos</p>)

            }
            <div>
                <Pagination totalData={products.length} dataPerPage={productPerPage} currentData={currentPage} setCurrentData={setCurrentPage}/>
            </div>
        </section>
    )
}

export default Product