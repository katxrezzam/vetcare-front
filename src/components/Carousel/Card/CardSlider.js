import styles from "../../../css/Carousel/CardSlider.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useDeleteCardByUserAndIdMutation} from "../../../features/profile/card/cardApiSlice";
import {useDispatch} from "react-redux";
import {removeCard} from "../../../features/profile/card/cardSlice";

const CardSlider = ({data, index, setSuccess}) => {

    const {number, cvv, expiresAt, name, dni, user, _id} = data
    const [deleteCard, {isLoading}] = useDeleteCardByUserAndIdMutation()

    const dispatch = useDispatch()

    const handleDelete = async () => {
        const params = {
            id: user,
            id_card: _id
        }
        try{
            await deleteCard(params).unwrap()
            dispatch(removeCard(index))
            setSuccess('Tarjeta borrada correctamente')
        } catch (error){
            console.error(error)
        }
    }

    return(
        <div className={styles.addressCard}>
            <h3>
                <FontAwesomeIcon icon={faCreditCard}/>
                {number}
            </h3>
            <div className={styles.cardBody}>
                <div className={styles.cardInfo}>
                    <span>{expiresAt}</span><br></br>
                    <span>{cvv}</span>
                </div>
                <span>{name}</span>
                <span>{dni}</span>
            </div>
            <button className={styles.addressDelete} onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
    )
}

export default CardSlider