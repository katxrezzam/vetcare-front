import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../../css/Profile/Pet/PetInfo.module.css'
import { selectCurrentUser } from '../../../features/auth/authSlice'
import { useGetPetsByUserMutation } from '../../../features/profile/pet/petApiSlice'
import { getPet, setPet } from '../../../features/profile/pet/petSlice'
import Modal from '../../Modal/Modal'
import PetForm from './PetForm'
import Carousel from "../../Carousel/Carousel";
import Button from "../../Form/Button";
import PetSlider from "../../Carousel/Pet/PetSlider";
import InfoMessage from "../../InfoMessage";

const PetInfo = () => {

    const user = useSelector(selectCurrentUser)
    const id = user._id
    const dispatch = useDispatch()
    const [getPetsApi, {isLoading}] = useGetPetsByUserMutation()
    const pets = useSelector(getPet)

    const [openModal, setOpenModal] = useState(false)

    const [carouselItem, setCarouselItem] = useState([])
    const [carouselIndex, setCarouselIndex] = useState(0)

    const [success, setSuccess] = useState('')

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    useEffect(()=> {
        const selectPets = async () => {
            try{
                const response = await getPetsApi(id).unwrap()
                dispatch(setPet(response))
            }
            catch (err){
                console.error(err)
            }
        }
        selectPets()
    }, [])

    return (
        <>
            <section className={styles.personalPet}>
                <h1 className={styles.title}>Mascotas</h1>
                <InfoMessage message={success} setMessage={setSuccess}/>
                <div className={styles.petContainer}>
                    {pets?.length
                        ? (
                            <Carousel setCarouselIndex={setCarouselIndex} setCarouselItem={setCarouselItem} data={pets}>
                                <PetSlider data={carouselItem} index={carouselIndex} setSuccess={setSuccess}/>
                            </Carousel>
                        )
                        : <p className={styles.petEmpty}>No hay mascotas agregadas</p>
                    }
                    <div className={styles.buttonField}>
                        <Button onClick={handleOpenModal}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </Button>
                    </div>
                </div>
            </section>
            <Modal title={'Agregar nueva mascota'} open={openModal} setOpen={setOpenModal}>
                <PetForm openModal={setOpenModal} id={id}/>
            </Modal>
        </>
    )
}

export default PetInfo