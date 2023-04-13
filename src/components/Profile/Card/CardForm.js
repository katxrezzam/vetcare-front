import styles from '../../../css/Profile/Card/CardForm.module.css'
import InputForm from "../../Form/InputForm";
import Button from "../../Form/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressCard, faCalendar, faCreditCard, faUser} from "@fortawesome/free-solid-svg-icons";
import {useCreateCardByUserMutation} from "../../../features/profile/card/cardApiSlice";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCard} from "../../../features/profile/card/cardSlice";
import {selectCurrentUser} from "../../../features/auth/authSlice";
import InfoMessage from "../../InfoMessage";

const CardForm = ({openModal}) =>{

    const user = useSelector(selectCurrentUser)
    const id = user._id

    const [createCard, {isLoading}] = useCreateCardByUserMutation()

    const [errMsg, setErrMsg] = useState('')
    const dispatch = useDispatch()

    const [number, setNumber] = useState('')
    const [cvv, setCvv] = useState('')
    const [expiresAt, setExpiresAt] = useState('')
    const [name, setName] = useState('')
    const [dni, setDni] = useState('')

    const handleSubmit = async(e)  => {
        e.preventDefault()
        if(!number||!cvv||!expiresAt||!name||!dni){
            setErrMsg('Debe llenar los campos')
            return
        }

        try{
            const response = await createCard({number,cvv,expiresAt,name,dni, id}).unwrap()
            console.log(response)
            dispatch(addCard({...response}))
            setNumber('')
            setCvv('')
            setExpiresAt('')
            setName('')
            setDni('')
            openModal(false)
        } catch (err){
            console.error(err)
        }

    }

    return(
        <form className={`${styles.cardForm}`} onSubmit={handleSubmit}>
            <InfoMessage message={errMsg} setMessage={setErrMsg} success={false}/>
            <div className={styles.singleField}>
                <label htmlFor="">
                    <FontAwesomeIcon icon={faCreditCard}/>
                    Numero de tarjeta</label>
                <InputForm
                    placeholder={'1234 xxxx xxxx xxxx'}
                    type={'text'}
                    values={number}
                    setValues={setNumber}
                />
            </div>
            <div className={styles.fields}>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faCreditCard}/>
                        Codigo CVV
                    </label>
                    <InputForm
                        placeholder={'xxx'}
                        type={'text'}
                        values={cvv}
                        setValues={setCvv}
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faCalendar}/>
                        Fecha de caducidad
                    </label>
                    <InputForm
                        type={'text'}
                        placeholder={'MM/YYYY'}
                        values={expiresAt}
                        setValues={setExpiresAt}
                    />
                </div>
            </div>
            <div className={styles.singleField}>
                <label htmlFor="">
                    <FontAwesomeIcon icon={faUser}/>
                    Nombre
                </label>
                <InputForm
                    type={'text'}
                    placeholder={'Nombre'}
                    values={name}
                    setValues={setName}
                />
            </div>
            <div className={styles.singleField}>
                <label htmlFor="">
                    <FontAwesomeIcon icon={faAddressCard}/>
                    DNI
                </label>
                <InputForm
                    type={'text'}
                    placeholder={'DNI'}
                    values={dni}
                    setValues={setDni}
                />
            </div>
            <div className={styles.singleField}>
                <Button>Registrar</Button>
            </div>
        </form>
    )
}
export default CardForm