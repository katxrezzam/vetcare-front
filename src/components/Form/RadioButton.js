import styles from '../../css/Form/RadioButton.module.css'

const RadioButton = ({name, value, setValue}) => {

    const handleChange = () => {
        setValue(value)
    }

    return(
        <input type="radio" name={name} value={value} onChange={handleChange} className={styles.radioButton}/>
    )
}
export default RadioButton