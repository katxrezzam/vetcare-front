import styles from '../../../css/Profile/User/UserInfo.module.css'
import profilePic from '../../../img/profilePic.jpg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressCard, faEdit, faPhone, faTimes, faUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, updateUser} from "../../../features/auth/authSlice";
import {useState} from "react";
import {useUpdateUserMutation} from "../../../features/profile/user/userApiSlice";
import InputForm from "../../Form/InputForm";
import Button from "../../Form/Button";
import InfoMessage from "../../InfoMessage";

const  User = () => {

    const user = useSelector(selectCurrentUser)

    const [edit, setEdit] = useState(false)

    const [updatePersonal, {isLoading}] = useUpdateUserMutation()

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [phone, setPhone] = useState(user.phone)
    const [dni, setDni] = useState(user.dni)
    const [success, setSuccess] = useState('')
    const id = user._id
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {


        e.preventDefault()
        try{
            const response = await updatePersonal({firstName, lastName, phone, dni, id}).unwrap()
            console.log(response)
            dispatch(updateUser(response))
            setSuccess('Perfil actualizado correctamente')
            setEdit(!edit)
        }catch (err){
            console.log(err)
        }
    }

    const onEdit = () => {
        setSuccess('')
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setPhone(user.phone)
        setDni(user.dni)
        setEdit(!edit)
    }

    return(
        <section className={styles.personalInfo}>
            <h1>Informacion Personal</h1>

            <InfoMessage message={success} setMessage={setSuccess} />

            {/*
            <div className={styles.successContent}>
                <span className={success ? styles.successMsg : 'offScream'}>{success}</span>
            </div>*/}
            <div className={styles.faEdit}>
                <Button onClick={onEdit}>
                    {edit
                        ? <FontAwesomeIcon icon={faTimes}/>
                        : <FontAwesomeIcon icon={faEdit}/>
                    }
                </Button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.formContainer}>
                    <div className={styles.fields}>
                        <div className={styles.inputField}>
                            <label htmlFor=""><FontAwesomeIcon icon={faUser}/> Nombres: </label>
                            <InputForm type={'text'} edit={!edit} values={firstName} setValues={setFirstName}/>
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor=""><FontAwesomeIcon icon={faUser}/> Apellidos: </label>
                            <InputForm type={'text'} edit={!edit} values={lastName} setValues={setLastName}/>
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor=""><FontAwesomeIcon icon={faPhone}/> Telefono: </label>
                            <InputForm  type={'text'} edit={!edit} values={phone} setValues={setPhone}/>
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor=""><FontAwesomeIcon icon={faAddressCard}/> DNI: </label>
                            <InputForm type={'text'} edit={!edit} values={dni} setValues={setDni}/>
                        </div>
                    </div>
                    <div className={styles.profilePicture}>
                        <img src={profilePic} alt="profilePic"/>
                    </div>
                </div>
                <div className={edit ? styles.buttonField : 'offScream'}>
                    <Button>Enviar</Button>
                </div>
            </form>
        </section>
    )
}
export default User