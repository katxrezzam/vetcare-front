import styles from '../../../css/CheckOut/AddressOption.module.css'
import RadioButton from "../../Form/RadioButton";

const AddressOption = ({children, address}) => {

    const { user, _id, name, phone, street, streetNumber, district, region } = address

    return(
        <div className={styles.cardAddressOption}>
            <div className={styles.radioButton}>
                { children }
            </div>
            <h3>{name}, {phone}</h3>
            <div className={styles.cardBody}>
                <span>{street}</span>
                <span>#{streetNumber}</span>
                <span>{district}, {region}</span>
            </div>
        </div>
    )
}

export default AddressOption