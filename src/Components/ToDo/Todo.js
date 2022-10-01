import React, {useEffect, useState} from "react";
import "./ToDo.css";
import {signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../Common/firebase";
import {useNavigate} from "react-router-dom";
import {Button, OutlinedInput, TextField} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Todo() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRegistering, setIsRegistering] = useState(false)
    const [registerInformation, setRegisterInformation] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate()
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/homepage")
            }
        })
    }, [])
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate("/homepage")
        }).catch((err) => {
            alert(err.message)
        })
    }
    const handleRegister = () => {
        if (registerInformation.email !== registerInformation.confirmEmail) {
            alert("Please confirm your Email")
            return
        } else if (registerInformation.password !== registerInformation.confirmPassword) {
            alert("Please confirm your Password")
            return
        }
        createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password)
            .then(() => {
                navigate("/homepage")
            })
    }
    return <div className={"todo-list"}>

        <h1>Todo-list</h1>
        <div className={"login-register-container"}>
            {
                isRegistering ? (
                        <>
                            <div>
                                <TextField type={"email"}
                                           label={"Email"}
                                           variant={"outlined"}
                                           value={registerInformation.email}
                                           onChange={(e) => setRegisterInformation({
                                               ...registerInformation,
                                               email: e.target.value
                                           })}
                                />
                            </div>


                            <TextField type={"email"}
                                       variant={"outlined"}
                                       label={"Confirm Email"}
                                       value={registerInformation.confirmEmail}
                                       onChange={(e) => setRegisterInformation({
                                           ...registerInformation,
                                           confirmEmail: e.target.value
                                       })}
                            />
                            <div>
                                <TextField type={"password"}
                                           variant={"outlined"}
                                           label={"Password"}
                                           value={registerInformation.password}
                                           onChange={(e) => setRegisterInformation({
                                               ...registerInformation,
                                               password: e.target.value
                                           })}
                                />
                            </div>

                            <div>
                                <TextField type={"Confirm password"}
                                            variant={"outlined"}
                                            label={"Confirm password"}
                                            value={registerInformation.confirmPassword}
                                            onChange={(e) => setRegisterInformation({
                                                ...registerInformation,
                                                confirmPassword: e.target.value
                                            })}
                            />

                            </div>
                            <Button onClick={handleRegister}>Register</Button>
                            <Button variant={"outlined"}  startIcon={<ArrowBackIcon />} className={"go-back"} onClick={() => setIsRegistering(false)}>Go Back</Button>
                        </>) :
                    <div>

                        <div>
                            <TextField type={"email"}
                                       label="Email"
                                       variant="outlined"
                                       onChange={handleEmailChange}
                                       value={email}/>
                        </div>
                        <div>
                            <TextField type={"password"}
                                       label="Password"
                                       variant="outlined"
                                       onChange={handlePasswordChange}
                                       value={password}/>
                        </div>
                        <div>
                            <Button onClick={handleSignIn}>Sign In</Button>
                        </div>
                        <div>Or</div>
                        <div>
                            <Button className={"create-account-btn"} onClick={() => setIsRegistering(true)}>Create an Account</Button>
                        </div>
                    </div>
            }

        </div>
    </div>
}