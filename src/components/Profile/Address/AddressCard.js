import styles from "../../../css/Profile/Address/AddressCard.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faLocationDot, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useDeleteAddressByUserAndIdMutation} from "../../../features/profile/address/addressApiSlice";
import {useDispatch} from "react-redux";
import {removeAddress } from "../../../features/profile/address/addressSlice";
import Modal from "../../Modal/Modal";
import {useState} from "react";
import AddressForm from "./AddressForm";

const AddressCard = ({data, index}) => {

    const { user, _id, name, phone, street, streetNumber, district, region } = data

    const [open, setOpen] = useState(false)
    const [deleteAddress, {isLoadingD}] = useDeleteAddressByUserAndIdMutation()
    const dispatch = useDispatch()



    const handleDelete = async () => {
        const data = {
            id:user,
            id_address: _id
        }
        try{
            const response = await deleteAddress(data).unwrap()
            console.log(response)
            dispatch(removeAddress(index))
        }catch (err){
            console.log(err)
        }
    }

    const handleEdit = async () => {
        setOpen(true)
    }

    return(
        <div className={styles.addressCard}>
            <h3>
                <FontAwesomeIcon icon={faLocationDot}/>
                {name}, {phone}
            </h3>
            <div className={styles.cardBody}>
                <span>{street}</span>
                <span>#{streetNumber}</span>
                <span>{district}, {region}</span>
            </div>
            <button className={styles.addressEdit} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit}/>
            </button>
            <button className={styles.addressDelete} onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
            <Modal open={open} setOpen={setOpen} title={'Actualizar dirección'}>
                <AddressForm openModal={setOpen} data={data} edit={true} index={index}/>
            </Modal>
        </div>
    )
}

export default AddressCard