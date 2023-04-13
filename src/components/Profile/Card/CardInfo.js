import styles from '../../../css/Profile/Card/CardInfo.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getCards, setCard} from "../../../features/profile/card/cardSlice";
import {useEffect, useState} from "react";
import {useGetCardsByUserMutation} from "../../../features/profile/card/cardApiSlice";
import {selectCurrentUser} from "../../../features/auth/authSlice";
import Button from "../../Form/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Modal/Modal";
import CardForm from "./CardForm";
import CardSlider from "../../Carousel/Card/CardSlider";
import Carousel from "../../Carousel/Carousel";
import InfoMessage from "../../InfoMessage";


const CardInfo = () => {

    const user = useSelector(selectCurrentUser)
    const id = user._id
    const cards = useSelector(getCards)
    const [getCardsApi, {isLoading}] = useGetCardsByUserMutation()
    const dispatch = useDispatch()

    const [carouselItem, setCarouselItem] = useState([])
    const [carouselIndex, setCarouselIndex] = useState(0)
    const [success, setSuccess] = useState('')

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        const selectCards = async () => {
            try{
                const response = await getCardsApi(id).unwrap()
                dispatch(setCard(response))
            }
            catch (err){
                console.error(err)
            }
        }
        selectCards()
    }, [])

    return(
        <>
            <section className={styles.personalCard}>
                <h1>Tarjetas</h1>
                <InfoMessage message={success} setMessage={setSuccess}/>
                <div className={styles.cardContainer}>
                    {
                        cards?.length
                            ? (
                                <Carousel setCarouselIndex={setCarouselIndex} setCarouselItem={setCarouselItem} data={cards}>
                                    <CardSlider data={carouselItem} index={carouselIndex} setSuccess={setSuccess}/>
                                </Carousel>
                            )
                            : <p className={styles.cardEmpty}>No hay tarjetas agregadas</p>
                    }
                    <div className={styles.buttonField}>
                        <Button onClick={handleOpen}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </Button>
                    </div>
                </div>
            </section>
            <Modal open={open} setOpen={setOpen} title={'Agregar nueva tarjeta'}>
                <CardForm openModal={setOpen}/>
            </Modal>
        </>
    )
}

export default CardInfo