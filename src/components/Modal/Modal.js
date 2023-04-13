import styles from '../../css/Modal.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const Modal = ({ open, setOpen, title, children }) => {

    return(
        open &&
        <>
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <header>
                        <h3>{title}</h3>
                        <button onClick={() => setOpen(!open)}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </header>
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
export default Modal