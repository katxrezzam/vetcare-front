import styles from '../../../css/Store/Filter/Filter.module.css'
import {useEffect, useState} from "react";
import {useGetCategoriesMutation} from "../../../features/category/categoryApiSlice";

const Filter = () => {

    const [getCategoriesApi, {isLoading}] = useGetCategoriesMutation()
    const [categories, setCategories] = useState([])


    useEffect(() => {
        const getCategories = async () => {
            try{
                const response = await getCategoriesApi().unwrap()
                setCategories(response)
            }
            catch (err){

            }
        }
        getCategories()
    }, [])

    return(
        <section className={styles.filter}>
            <h1>Categorias</h1>
            {
                categories?.length
                    ? (categories.map( (category, i) => {
                       return <div className={styles.categoryContainer} key={i}>
                           <input type="checkbox" onChange={() => console.log(category._id)}/>
                           <label htmlFor="">{category.name}</label>
                       </div>
                    }))
                    : <p>No hay</p>
            }
        </section>
    )
}
export default Filter