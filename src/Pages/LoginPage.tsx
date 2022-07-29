import LoginForm from "../Components/Forms/LoginForm"
import { useState } from "react"
import ChangePasswordForm from "../Components/Forms/ChangePasswordForm"

const LoginPage = ({setEmail}: any) => {

    const [user, setUser] = useState()

    return (
        user ? <ChangePasswordForm user={user}/> : <LoginForm setEmail={setEmail} setUser={setUser}/>
        
    )
}

export default LoginPage