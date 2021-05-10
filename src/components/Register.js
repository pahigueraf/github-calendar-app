import React, {useState,useContext} from 'react'
import {Form,Button,Alert} from 'react-bootstrap'
import {NavBar} from './NavBar'
import '../styles/Login.css'
import validator from 'validator';
import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';

export const Register = () => {
    const {users,setUsers} = useContext(UserContext)
    const history = useHistory()

    const [formValues, setFormValues] = useState({
        name:"",
        email:"",
        password:"",
        confirm:""
    })

    const [formStatus, setFormStatus] = useState({
        isValid:false,
        errors:{},
    })

    const {email,password,name,confirm} = formValues
    const {errors} = formStatus

    
    const handleInputChange = ({target}) =>{
        setFormValues({...formValues,[target.name]:target.value})
    }

    const handleSubmit= (e)=>{
        e.preventDefault()
        const formIsValid = ()=>{
            let formStatus = {errors:{}}
            if (!validator.isEmail(email)){
                formStatus.isValid = false
                formStatus.errors.email = "The email is not correct."
                return formStatus
            }
                
            else if (password.length < 5){
                formStatus.isValid = false
                formStatus.errors.password = "The password must be at least 5 characters long."
                return formStatus
            }

            else if (password !== confirm){
                formStatus.isValid = false
                formStatus.errors.confirm = "Passwords are not the same"
                return formStatus
            }
                
            else{
                formStatus.isValid = true
                return formStatus
            }
                
        }
        let checkForm = formIsValid()
        if(checkForm.isValid){
            setFormStatus({...formStatus,isValid:true,errors:checkForm.errors})
            setUsers([...users,{
                name:name,
                email:email,
                password:password
            }])
            history.push('/login')
        }
        else{
            setFormStatus({...formStatus,isValid:false,errors:checkForm.errors})
        }
    }

    return (
        <>
        <NavBar></NavBar>
        <div id="login-container">    
        <h3>Sign Up</h3>            
            <Form id="login-form" onSubmit={handleSubmit}>

                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Enter your name" name="name" value={name} onChange={handleInputChange}/>
                </Form.Group>

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

                <Form.Group controlId="confirm">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm assword" name="confirm" value={confirm} onChange={handleInputChange}/>
                    {(errors.confirm) && <Alert variant="danger">{errors.confirm}</Alert>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        </>
    )
}
