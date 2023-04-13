import Header from "../Layout/Header";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../features/auth/authSlice";
import CheckOutLayout from "../Layout/CheckOutLayout/CheckOutLayout";
import CheckOutAddress from "./CheckOutAddress/CheckOutAddress";
import CheckOutPayment from "./CheckOutPayment/CheckOutPayment";
import Summary from "./Summary/Summary";
import styles from '../../css/CheckOut/CheckOut.module.css'
import Modal from "../Modal/Modal";
import AddressForm from "../Profile/Address/AddressForm";
import Button from "../Form/Button";

const CheckOut = () => {

    const [openAddress, setOpenAddress] = useState(false)

    const [addressFocus, setAddressFocus] = useState(true)
    const [values, setValues] = useState('')

    const handleOpen = (isAddress = true) => {
        if(isAddress){
            setAddressFocus(true)
            return
        }
        setAddressFocus(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
    }

    return(
        <>
            <Header/>
            <form className={styles.main} onSubmit={handleSubmit}>
                <div className={styles.paymentProcess}>
                    <div className={styles.paymentNavigation}>
                        <span className={ addressFocus ? styles.active : styles.blur} onClick={() => handleOpen()}>Direcciones</span>
                        <span className={ addressFocus ? styles.blur : styles.active} onClick={() => handleOpen(false)}>Pagos</span>
                    </div>

                        {
                            addressFocus ?
                                (
                                    <CheckOutAddress>
                                        <Button onClick={() => setOpenAddress(!openAddress)}>
                                            Agregar nueva dirección
                                        </Button>
                                    </CheckOutAddress>
                                )
                                : <CheckOutPayment/>
                        }
                </div>
                <Summary>
                    <Button>
                        Comprar
                    </Button>
                </Summary>
            </form>
            <Modal open={openAddress} setOpen={setOpenAddress} title={'Agregar nueva direccion'}>
                <AddressForm edit={false} openModal={setOpenAddress}/>
            </Modal>
        </>
    )
}

export default CheckOut