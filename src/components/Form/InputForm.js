import styles from '../../css/Form/InputForm.module.css'

const InputForm = ({ edit, values, setValues, type, placeholder}) => {

    return (
        <input
            type={type}
            placeholder={placeholder}
            className={styles.inputForm}
            readOnly={edit}
            value={values}
            onChange={(e) => setValues(e.target.value)}
        />
    )
}

export default InputForm