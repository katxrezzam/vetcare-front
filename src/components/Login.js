import { useRef, useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useLoginMutation } from '../features/auth/authApiSlice'
import styles from '../css/Login.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import {setCart} from "../features/cart/cartSlice";

const Login = () => {

    const userRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect( () => {
        userRef.current.focus()
    }, [])

    useEffect( () => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const userData = await login({ email, password }).unwrap()
            console.log(userData)
            dispatch(setCredentials({...userData }))
            dispatch(setCart([]))
            setEmail('')
            setPassword('')
            navigate('/')
        }catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const onChangeEmail = (e) => setEmail(e.target.value)
    const onChangePassword = (e) => setPassword(e.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (

        <section className={styles.login}>
            <div className={styles.formLogin}>
                <div className={styles.formContent}>
                    <header>Iniciar sesión</header>
                    <p ref={errRef} className={errMsg ? styles.errorMsg : styles.offScream}>{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.fieldInput}>
                            <label htmlFor="">
                                <FontAwesomeIcon icon={faEnvelope}/>
                                Correo
                            </label>
                            <input
                                type="email"
                                placeholder={'Correo'}
                                ref={userRef}
                                onChange={onChangeEmail}
                                value={email}
                                autoComplete={'off'}
                                required
                            />
                        </div>
                        <div className={styles.fieldInput}>
                            <label htmlFor="">
                                <FontAwesomeIcon icon={faKey}/>
                                Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder={'Contraseña'}
                                onChange={onChangePassword}
                                value={password}
                                required
                            />
                        </div>
                        <div className={styles.fieldButton}>
                            <button>Ingresar</button>
                        </div>
                        <div className={styles.formLink}>
                            <span>¿No tienes una cuenta? <Link to={'/register'}>Regístrate aquí</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )

    return content
}
export default Login