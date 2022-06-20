import LoginForm from "../Components/Forms/LoginForm"
import { useState } from "react"
import ChangePasswordForm from "../Components/Forms/ChangePasswordForm"

const LoginPage = () => {

    const [user, setUser] = useState()

    return (
        user ? <ChangePasswordForm user={user}/> : <LoginForm setUser={setUser}/>
        
    )
}

export default LoginPage