import styles from '../css/Pagination.module.css'

const Pagination = ({ totalData, dataPerPage, currentData, setCurrentData}) => {

    let pages = []

    for(let i = 1; i <= Math.ceil(totalData / dataPerPage) ; i++){
        pages.push(i)
    }

    return(
        <div className={styles.pagination}>
            {
                pages.map( (page, i) => {
                    return <button
                        key={i}
                        onClick={() => setCurrentData(page)}
                        className={page == currentData ? styles.active : ''}
                        >
                        {page}
                            </button>
                })
            }
        </div>
    )
}

export default Pagination