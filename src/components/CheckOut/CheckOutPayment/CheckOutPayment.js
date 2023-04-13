import styles from '../../../css/CheckOut/CheckOut.module.css'
import {useState} from "react";
import InputForm from "../../Form/InputForm";

const CheckOutPayment = ({ value, setValue}) => {

    return(
        <div className={styles.paymentCheckOut}>
            <InputForm type="text" value={value} setValues={setValue}/>
        </div>
    )
}

export default CheckOutPayment