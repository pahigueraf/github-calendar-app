import React, {useState,useContext} from 'react'
import {Form,Button,Alert} from 'react-bootstrap'
import {NavBar} from './NavBar'
import '../styles/Login.css'
import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';

export const Login = () => {

    const {users,authUser,setAuthUser} = useContext(UserContext)
    const history = useHistory()

    const [formValues, setFormValues] = useState({
        email:"",
        password:""
    })

    const [formStatus, setFormStatus] = useState({
        isValid:false,
        errors:{},
    })

    const {email,password} = formValues
    const {errors} = formStatus

    
    const handleInputChange = ({target}) =>{
        setFormValues({...formValues,[target.name]:target.value})
    }

    const handleSubmit= (e)=>{
        e.preventDefault()
        let checkCredentials = users.filter(user=> user.email === email && user.password === password)
        const formIsValid = (checkCredentials)=>{
            let formStatus = {errors:{}}
            if (checkCredentials.length===0){
                formStatus.isValid = false
                formStatus.errors.password = "Email and password are not correct."
                return formStatus
            }
                
            else{
                formStatus.isValid = true
                return formStatus
            }
                
        }
        let checkForm = formIsValid(checkCredentials)
        if(checkForm.isValid){
            setFormStatus({...formStatus,isValid:true,errors:checkForm.errors})
            if (checkCredentials.length>0){
                setAuthUser(email)
                window.localStorage.setItem('token',"this is a token")
                history.push('/repos')
            }
                
            
        }
        else{
            setFormStatus({...formStatus,isValid:false,errors:checkForm.errors})
        }
    }

    return (
        <>
        <NavBar></NavBar>
        <div id="login-container"> 
            <h3>Login</h3>           
            <Form id="login-form" onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleInputChange} />
                    {(errors.email) && <Alert variant="danger">{errors.email}</Alert>}
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange}/>
                    {(errors.password) && <Alert variant="danger">{errors.password}</Alert>}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        </>
    )
}
