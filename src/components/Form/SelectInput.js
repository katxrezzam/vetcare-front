import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import styles from '../../css/Form/SelectInput.module.css'

const SelectInput = ({ options, value, setValue}) => {

    const [open, setOpen] = useState(false)

    const handleOpenOptions = (option) => {
        setValue(option)
        setOpen(false)
    }

    return(
        <div className={styles.selectContainer}>
            <div className={styles.selectBtn} onClick={()=> setOpen(!open)}>
                {
                    !value ? <span>Seleccione una opcion</span>
                        : <span>{value}</span>
                }
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className={ open ? styles.selectContent : 'offScream'}>
                <ul className={styles.options}>
                    {
                        options?.length
                            ? (options.map( (option, i) => {
                                return <li key={i} onClick={() => handleOpenOptions(option)}>{option}</li>
                            }))
                            : <p>No hay opciones para mostrar</p>
                    }
                </ul>
            </div>
        </div>
    )
}

export default SelectInput