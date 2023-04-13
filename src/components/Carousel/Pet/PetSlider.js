import styles from '../../../css/Carousel/PetSlider.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faMars, faTrash, faVenus} from "@fortawesome/free-solid-svg-icons";
import Button from "../../Form/Button";
import {useDeletePetByUserAndIdMutation} from "../../../features/profile/pet/petApiSlice";
import {useDispatch} from "react-redux";
import {removePet} from "../../../features/profile/pet/petSlice";

const PetSlider = ({ data, index, setSuccess }) => {
    const {name, kind, breed, age, sex, _id, user} = data
    const [deletePet, {isLoading}] = useDeletePetByUserAndIdMutation()

    const dispatch = useDispatch()


    const handleDelete = async () => {
        const params = {
            id: user,
            id_pet: _id
        }
        try{
            const response = await deletePet(params).unwrap()
            console.log(response)
            dispatch(removePet(index))
            setSuccess('Mascota borrada exitosamente')
        }catch (err){
            console.error(err)
        }
    }

    return(
        <div className={styles.petSlider}>
            <div className={styles.imgPetSlider}>
                <img src={require(`../../../img/PetSlider/${kind}.png`)} alt="imagen-mascota"/>
            </div>
            <div className={styles.content}>
                <h1>
                    {name}
                    {sex ==='Hembra'
                        ? <span className={styles.femaleIcon}><FontAwesomeIcon icon={faVenus}/></span>
                        : <span className={styles.maleIcon}><FontAwesomeIcon icon={faMars}/></span>
                    }
                </h1>
                <span>{kind}</span>
                <span>{breed}</span>
                <span>{sex}</span>
                <span>{age} años</span>
            </div>
            <div className={styles.buttons}>
                <Button>
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </div>
        </div>
    )
}

export default PetSlider