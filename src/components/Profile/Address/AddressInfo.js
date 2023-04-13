import {useGetAddressesByUserMutation} from "../../../features/profile/address/addressApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../../features/auth/authSlice";
import  styles from '../../../css/Profile/Address/AddressInfo.module.css'
import AddressCard from "./AddressCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { getAddress, setAddress} from "../../../features/profile/address/addressSlice";
import {useEffect, useState} from "react";
import Modal from "../../Modal/Modal";
import AddressForm from "./AddressForm";


const AddressInfo = () => {
    const user = useSelector(selectCurrentUser)
    const id = user._id
    const dispatch = useDispatch()
    const [address, {isLoading}] = useGetAddressesByUserMutation()
    const addressLocal = useSelector(getAddress)

    const [openModal , setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    useEffect( () => {
        const selectAddress = async () => {
            try{
                const response = await address(id).unwrap()
                dispatch(setAddress(response))
            } catch (err){
                console.log(err)
            }
        }
        selectAddress()
    },[])

    return(
        <> 
            <section className={styles.personalAddress}>
                <h1>Direcciones</h1>
                <div className={styles.container}>
                    {addressLocal?.length
                        ? (
                            addressLocal.map( (address, i) => {
                                return <AddressCard key={i} data={address} index={i}/>
                            })
                        ) : <p className={styles.addressEmpty}>No hay direcciones agregadas</p>
                    }
                    { addressLocal?.length >= 3
                        ? <></>
                        : <button className={styles.addAddressButton} onClick={handleOpenModal}>
                            <FontAwesomeIcon icon={faPlus}/>
                            Agregar direcciones
                        </button>
                    }
                </div>
            </section>
            <Modal title={'Agregar nueva direccion'} open={openModal} setOpen={setOpenModal}>
                <AddressForm openModal={setOpenModal}/>
            </Modal>
        </>
    )
}

export default AddressInfo