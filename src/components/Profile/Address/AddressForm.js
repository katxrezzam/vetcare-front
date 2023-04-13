import styles from '../../../css/Profile/Address/AddressForm.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {
    useCreateAddressByUserMutation,
    useUpdateAddressByUserAndIdMutation
} from "../../../features/profile/address/addressApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../../features/auth/authSlice";
import {addAddress, updateAddress} from "../../../features/profile/address/addressSlice";
import InputForm from '../../Form/InputForm';
import Button from "../../Form/Button";
import InfoMessage from "../../InfoMessage";

const AddressForm = ({ openModal, data = {}, edit = false, index = 0 }) => {

    const user = useSelector(selectCurrentUser)
    const id = user._id
    const [name, setName] = useState( data.name ?? '')
    const [phone, setPhone] = useState(data.phone ?? '')
    const [street, setStreet] = useState(data.street ?? '')
    const [streetNumber, setStreetNumber] = useState( data.streetNumber ?? '')
    const [district, setDistrict] = useState(data.district ?? '')
    const [region, setRegion] = useState( data.region ?? '')
    const [errMsg, setErrMsg] = useState('')

    const [success, setSuccess] = useState('')
    const dispatch = useDispatch()

    const [createAddress, {isLoading}] = useCreateAddressByUserMutation()
    const [modifyAddress, {isLoadingE}] = useUpdateAddressByUserAndIdMutation()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(edit) editAddress()
        else newAddress()
    }

    const editAddress = async () => {
        const payload = {
            id: data.user,
            id_address: data._id,
            body: {name, phone, street, streetNumber, district, region}
        }

        try{
            const response = await modifyAddress(payload).unwrap()
            dispatch(updateAddress({index, response}))
            openModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    const newAddress = async () => {
        if(!name || !phone || !street || !streetNumber || !district || !region ){
            setErrMsg('Debe llenar los campos')
            return
        }

        try{
            const response = await createAddress({name, phone, street, streetNumber, district, region, id}).unwrap()
            console.log(response)
            dispatch(addAddress({...response}))
            setSuccess('¡Dirección registrada correctamente!')
            setName('')
            setPhone('')
            setStreet('')
            setStreetNumber('')
            setDistrict('')
            setRegion('')
            openModal(false)
        } catch (err){
            console.error(err)
        }
    }

    return(
        <form className={styles.formAddress} onSubmit={handleSubmit}>
            <InfoMessage message={errMsg} setMessage={setErrMsg} success={false}/>

            {/*            <span className={ success ? styles.successMsg : styles.offScream}>{success}</span>
            <span className={ errMsg ? styles.errorMsg : styles.offScream}>{errMsg}</span>*/}
            <div className={styles.fields}>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faLocationDot}/>
                        Nombre
                    </label>
                    <InputForm values={name} setValues={setName} type='text' placeholder={'Nombre'}/>
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faLocationDot}/>
                        Celular
                    </label>
                    <InputForm  values={phone} setValues={setPhone} type={'text'} placeholder={'Celular'}/>
                </div>
            </div>
            <div className={styles.fields}>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faLocationDot}/>
                        Calle
                    </label>
                    <InputForm  values={street} setValues={setStreet} type={'text'} placeholder={'Calle'}/>
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faLocationDot}/>
                        Numero de calle
                    </label>
                    <InputForm  values={streetNumber} setValues={setStreetNumber} type={'text'} placeholder={'Numero de calle'}/>
                </div>
            </div>
            <div className={styles.fields}>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faLocationDot}/>
                        Distrito
                    </label>
                    <InputForm  values={district} setValues={setDistrict} type={'text'} placeholder={'Distrito'}/>
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faLocationDot}/>
                        Region
                    </label>
                    <InputForm  values={region} setValues={setRegion} type={'text'} placeholder={'Region'}/>
                </div>
            </div>
            <div className={styles.buttonField}>
                <Button>Registrar</Button>
            </div>
        </form>
    )
}

export default AddressForm