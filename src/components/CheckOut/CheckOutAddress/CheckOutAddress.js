import styles from '../../../css/CheckOut/CheckOut.module.css'
import {useSelector} from "react-redux";
import {getAddress} from "../../../features/profile/address/addressSlice";
import AddressForm from "../../Profile/Address/AddressForm";
import AddressCard from "../../Profile/Address/AddressCard";
import Button from "../../Form/Button";
import AddressOption from "./AddressOption";
import RadioButton from "../../Form/RadioButton";

const CheckOutAddress = ({ children }) => {

    const addresses = useSelector(getAddress)

    return(
        <div className={styles.addressCheckOut}>
           <div className={styles.addressContainer}>
               {
                   addresses?.length
                       ? (addresses.map( (address, i) => {
                           return <AddressOption address={address}>
                               <RadioButton name={'cardOption'}/>
                           </AddressOption>
                       }))
                       : <p>No hay direcciones agregadas</p>
               }
               {
                   addresses?.length >= 3
                       ? <></>
                       : children
               }
           </div>
        </div>
    )
}

export default CheckOutAddress