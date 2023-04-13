import styles from '../css/Register.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressCard, faEnvelope, faInfoCircle, faKey, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useRegisterMutation} from "../features/auth/authApiSlice";


const EMAIL_REGEX = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    const userRef = useRef()
    const errRef = useRef()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [dni, setDni] = useState('')

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [focusEmail, setFocusEmail] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)

    const [matchPassword, setMatchPassword] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    const [register, {isLoading }] = useRegisterMutation()

    useEffect( () => {
        userRef.current.focus()
    }, [])

    useEffect( () => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    useEffect( () => {
        const result = PASSWORD_REGEX.test(password)
        setValidPassword(result)
        const match = matchPassword === password
        setValidMatch(match)
    }, [password, matchPassword])

    useEffect( () => {
        setErrMsg('')
    },[email, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const v1 = EMAIL_REGEX.test(email)
        const v2 = PASSWORD_REGEX.test(password)

        if( !v1 || !v2 ){
            setErrMsg('Entradas invalidas')
            return
        }

        try{
            const response = await register({firstName, lastName, phone, dni, email, password}).unwrap()
            console.log(response)
            setEmail('')
            setPhone('')
            setFirstName('')
            setDni('')
            setPassword('')
            setLastName('')
            setSuccess('Usuario registrado correctamente')
        }catch (err){
            console.log(err)
            errRef.current.focus();
        }
    }

    return(
        <section className={styles.register}>
            <p ref={errRef}>{errMsg}</p>
            <span className={success ? 'successMsg' : 'offScream'}>{success}</span>
            <div className={styles.formRegister}>
                <header>Registrate</header>
                <p ref={errRef} className={errMsg ? styles.errorMsg : styles.offScream}>{errMsg}</p>
                <form onSubmit={handleSubmit}>
                    <div className={styles.fields}>
                        <div className={styles.inputFields}>
                            <label htmlFor="">
                                <FontAwesomeIcon icon={faUser}/>
                                Nombres
                            </label>
                            <input
                                type="text"
                                placeholder={'Nombres'}
                                ref={userRef}
                                value={firstName}
                                onChange={event => setFirstName(event.target.value)}
                                required
                                autoComplete={'off'}
                            />
                        </div>
                        <div className={styles.inputFields}>
                            <label htmlFor="">
                                <FontAwesomeIcon icon={faUser}/>
                                Apellidos
                            </label>
                            <input
                                type="text"
                                placeholder={'Apellidos'}
                                value={lastName}
                                onChange={event => setLastName(event.target.value)}
                                required
                                autoComplete={'off'}
                            />
                        </div>
                    </div>
                    <div className={styles.fields}>
                        <div className={styles.inputFields}>
                            <label htmlFor="">
                                <FontAwesomeIcon icon={faPhone}/>
                                Telefono
                            </label>
                            <input
                                type="text"
                                placeholder={'Telefono'}
                                value={phone}
                                onChange={event => setPhone(event.target.value)}
                                required
                                autoComplete={'off'}
                            />
                        </div>
                        <div className={styles.inputFields}>
                            <label htmlFor="">
                                <FontAwesomeIcon icon={faAddressCard}/>
                                DNI
                            </label>
                            <input
                                type="text"
                                placeholder={'DNI'}
                                value={dni}
                                onChange={event => setDni(event.target.value)}
                                required
                                autoComplete={'off'}
                            />
                        </div>
                    </div>
                    <div className={styles.fields}>
                        <div className={styles.inputEmail}>
                            <label htmlFor="">
                                <FontAwesomeIcon icon={faEnvelope}/>
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder={'Email'}
                                value={email}
                                required
                                autoComplete={'off'}
                                onChange={e => setEmail(e.target.value)}
                                onFocus={() => setFocusEmail(true)}
                                onBlur={() => setFocusEmail(false)}
                            />
                            <p className={focusEmail && email && !validEmail ? styles.instructions : 'offScream'}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Debe ingresar un correo válido: <br/>
                                example@example
                            </p>
                        </div>
                    </div>
                    <div className={styles.fields}>
                        <div className={styles.inputFields}>
                            <label htmlFor="">
                                <FontAwesomeIcon icon={faKey}/>
                                Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder={'Contraseña'}
                                value={password}
                                required
                                onChange={e => setPassword(e.target.value)}
                                onFocus={() => setFocusPassword(true)}
                                onBlur={() => setFocusPassword(false)}
                            />
                            <p className={focusPassword && !validPassword ? styles.instructions : 'offScream'}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                8 a 24 caracteres.<br />
                                Debe al menos una letra mayuscula, minusculas,<br/> numeros  y caracteres especiales. <br />
                                Caracteres permitidos:!@#$%
                            </p>
                        </div>
                        <div className={styles.inputFields}>
                            <label htmlFor="">
                                <FontAwesomeIcon icon={faKey}/>
                                Confirmar contraseña
                            </label>
                            <input
                                type="password"
                                placeholder={'Confirmar contraseña'}
                                value={matchPassword}
                                required
                                onChange={e => setMatchPassword(e.target.value)}
                                onFocus={() => setMatchFocus(true)}
                                onBlur={()=> setMatchFocus(false)}
                            />
                            <p className={matchFocus && !validMatch ? styles.instructions : 'offScream'}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Las contraseñas deben coincidir
                            </p>
                        </div>
                    </div>
                    <div className={styles.buttonField}>
                        <button
                            className={styles.registerButton}
                            disabled={ !validMatch || !validEmail || !validPassword }
                        >Enviar
                        </button>
                    </div>
                    <div className={styles.formLink}>
                        <span>¿Ya tienes una cuenta? <Link to={'/login'}>¡Ingresa ahora!</Link></span>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register