import Header from "../Layout/Header";
import styles from '../../css/Profile/Profile.module.css'
import User from "./User/User";
import AddressInfo from "./Address/AddressInfo";
import PetInfo from "./Pet/PetInfo";
import CardInfo from "./Card/CardInfo";

const Profile = () => {

    return(
        <>
            <Header/>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <User/>
                    <AddressInfo />
                </div>
                <div className={styles.wrapper2}>
                    <PetInfo />
                    <CardInfo />
                </div>
            </div>
        </>
    )
}
export default Profile