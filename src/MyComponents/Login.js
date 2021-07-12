import React,{useState} from 'react'
import axios from 'axios'
import {Redirect, useHistory, Link} from 'react-router-dom'
import {RiPenNibLine} from "react-icons/ri"


const mystyle={
    color:"white"
}

function Login() {
    let history = useHistory();
    const [usernameError, setusernameError] = useState("")
    const [emailError, setemailError] = useState("")
    const [passwordError, setpasswordError] = useState("")
    const [user, setUser] = useState({})
    const [input, setInput] = useState({
        email:'',
        password:''
    })


    function handleChange(event){
        const{name,value} = event.target;
        setInput((prevInput)=>{
            return{
                ...prevInput,
                [name]:value
            }
        })
    }



    function handleClick(e){
        e.preventDefault();


        const newUser ={

            email: input.email,
            password: input.password
        }
        console.log(newUser)
    
        axios.post('https://post-some.herokuapp.com/login', newUser)

            .then(async (res)=>{
            
            const data = await res.data;

            if(data.errors){
                setusernameError(data.errors.username)
                setemailError(data.errors.email)
                setpasswordError(data.errors.password)

            }else{
                console.log("data", data)
                localStorage.setItem("token", data)
                history.push("/home")
            }
            
            })
            .catch((err)=>{ 
                console.log("only this works");        
                console.log(err);
  
            })

    }
    return (
        <div className="container1">
        <div className='login_container'>
           
            <div className="login_text">
                <h2 className="login_text_head">Postsome<RiPenNibLine/></h2>
                <div className='login_text_body'>Where your words, come alive!!</div>
            </div>
            <div className="login_text2">
                <h2>Postsome</h2>
            </div>

            <div className="login">
            
            <h2 className="login_head">Log in to Postsome</h2>
            <form action="">
                <div><input onChange={handleChange} type="email" name="email" id="email" className="login_input" value={input.email} autoComplete="off" placeholder="email"/></div>
                <div className="signuperror">{emailError}</div>
                 
                <div><input onChange={handleChange} type="password" name="password" id="password" className="login_input" value={input.password} autoComplete="off"placeholder="password"/></div>
                <div className="signuperror">{passwordError}</div>
                <button className="login_button" onClick={handleClick}>Login</button>
            </form>

            <h2 className="login_notuser">Not an user?</h2>
            <Link className="login_signup_out" to="/"><h4 className="login_signup">Sign Up here</h4></Link>
            
            </div>
            


        </div>
        </div
        
        
        >
    )
}

export default Login
