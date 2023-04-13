import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import styles from '../css/InfoMessage.module.css'

const InfoMessage = ({ message, setMessage,success = true }) => {

    const handleClick = () => {
        setMessage('')
    }

    return(
        <>
            {message &&
                <div className={ success ? 'successMsg' : 'errorMsg'}>
                    <h3>{message}</h3>
                    <button className={styles.closeMsg} onClick={handleClick} >
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
            }
        </>
    )
}

export default InfoMessage