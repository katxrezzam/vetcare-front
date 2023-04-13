import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import styles from '../../css/Carousel/Carousel.module.css'
import Button from "../Form/Button";

const Carousel = ({ data, children, setCarouselItem, setCarouselIndex }) => {

    const [selectedIndex, setSelectedIndex ] = useState(0)

    const selectNewImage = (index, data, next = true) => {
        const condition = next ? index < data.length - 1 : index > 0
        const nextIndex = next
            ? condition ? index + 1 : 0
            : condition ? index - 1 : data.length - 1
        setCarouselItem(data[nextIndex])
        setSelectedIndex(nextIndex)
        setCarouselIndex(nextIndex)
    }

    const previous = () => {
        selectNewImage(selectedIndex, data, false)
    }
    const next = () => {
        selectNewImage(selectedIndex, data)
    }

    useEffect(()=> {
        setCarouselItem(data[0])
        setCarouselIndex(0)
    }, [])

    useEffect(()=> {
        next()
    }, [data])

    return (
        <div className={styles.carousel}>
            <div className={styles.buttonField}>
                <Button onClick={previous}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Button>
            </div>
            {children}
            <div className={styles.buttonField}>
                <Button onClick={next}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </Button>
            </div>
        </div>
    )
}

export default Carousel