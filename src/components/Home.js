import Header from "./Layout/Header";
import styles from '../css/Home.module.css'
import imagen from '../img/profilePic.jpg'
import Button from "./Form/Button";
import {useNavigate} from "react-router-dom";

const Home = () => {

    const navigate = useNavigate()

    const handleClick = () =>{
        navigate('/profile')
    }
    
    return(
        <>

            <Header/>
            <main className={styles.main}>
                <div className={styles.wrapper}>
                    <h1 className={styles.titulo}>PetCare Peru</h1>
                </div>
                <div className={styles.wrapperVertical}>
                    <div className={styles.wrapper}>
                        <img src={imagen} className={styles.pad} alt="cuy"/>
                        <img src={imagen} className={styles.pad} alt="cuy"/>
                        <img src={imagen} className={styles.pad} alt="cuy"/>
                    </div>
                    <div>
                        <Button onClick={handleClick}>Comprar</Button>
                    </div>
                </div>


                <div className={styles.wrapperVertical}>
                <h1 className={styles.titulo}>Acerca de nosotros</h1>
                    <p>PetCare Perú es una empresa especializada en el cuidado y salud de mascotas con un recorrido de más de 5 años de experiencia en el rubro.
                        La empresa está equipada con tecnología especializada para el cuidado de la salud y bienestar de las mascotas, además de contar con médicos veterinarios altamente capacitados para reaccionar ante cualquier emergencia.</p>
                </div>
                <footer className={styles.wrapperVertical}>
                    <div className={styles.bottom}>
                        <div>
                            Avenida de los Patriota. 857 <br/>
                            San Miguel, Lima
                        </div>
                        <div className={styles.horizontal}>
                            <div>
                                Encuentranos
                                <ul>
                                    <li><a href="#">Facebook</a></li>
                                    <li><a href="#">Twitter</a></li>
                                    <li><a href="#">Instagram</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    PetCare Peru
                </footer>
            </main>
        </>
    )
}


export default Home