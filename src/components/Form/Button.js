import styles from '../../css/Form/Button.module.css'

const Button = ({ children, onClick, disabled = false }) => {

    return(
        <button className={styles.button} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button