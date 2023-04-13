import {faMarsAndVenus, faPaw} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import styles from '../../../css/Profile/Address/AddressForm.module.css'
import {useCreatePetByUserMutation} from "../../../features/profile/pet/petApiSlice";
import {useDispatch} from "react-redux";
import {addPet} from "../../../features/profile/pet/petSlice";
import SelectInput from '../../Form/SelectInput';
import {petOptions, petSex} from "../../../util/petOptions";
import InputForm from "../../Form/InputForm";
import Button from "../../Form/Button";
import RadioButton from "../../Form/RadioButton";
import InfoMessage from "../../InfoMessage";

const PetForm = ({ openModal, id }) => {

    const kindOptions = Object.keys(petOptions)
    const [breedSelected, setBreedSelected] = useState([])

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [kind, setKind] = useState('')
    const [breed, setBreed] = useState('')
    const [sex, setSex] = useState('')

    const [errMsg, setErrMsg] = useState('')

    const [createPet, {isLoading}] = useCreatePetByUserMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        setBreedSelected(petOptions[kind])
    }, [kind])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!name || !age || !kind || !breed ){
            setErrMsg('Debe llenar los campos')
            return
        }

        try{
            const response = await createPet({name, age, sex, kind, breed, id}).unwrap()
            dispatch(addPet(response))
            setName('')
            setAge('')
            setKind('')
            setBreed('')
            openModal(false)
        }catch(err){
            console.error(err)
        }
    }

    return(
        <form className={styles.formPet} onSubmit={handleSubmit}>
            <InfoMessage message={errMsg} setMessage={setErrMsg} success={false}/>

            <div className={styles.fields}>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faPaw}/>
                        Nombre
                    </label>
                    <InputForm type={'text'} placeholder={'Nombre'} setValues={setName} values={name}/>
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faPaw}/>
                        Edad
                    </label>
                    <InputForm type={'number'} placeholder={'Edad'} setValues={setAge} values={age}/>
                </div>
            </div>

            <div className={styles.fields}>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faPaw}/>
                        Especie
                    </label>
                   <SelectInput options={kindOptions} value={kind} setValue={setKind}/>
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faPaw}/>
                        Raza
                    </label>
                    <SelectInput options={breedSelected} value={breed} setValue={setBreed}/>
                </div>
            </div>
            <div className={styles.fields}>
                <div className={styles.inputField}>
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faMarsAndVenus} />
                        Sexo
                    </label>
                    <div className={styles.groupRadio}>
                        <label htmlFor="">Hembra</label>
                        <RadioButton name={'sex'} value={'Hembra'} setValue={setSex}/>
                        <label htmlFor="">Macho</label>
                        <RadioButton name={'sex'} value={'Macho'} setValue={setSex}/>
                    </div>
                </div>
            </div>
            <div className={styles.buttonField}>
                <Button>Registrar</Button>
            </div>
        </form>
    )
}

export default PetForm