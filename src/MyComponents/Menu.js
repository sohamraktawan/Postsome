import React from 'react'
import { useHistory } from 'react-router'
import axios from "axios"
import { useState, useEffect } from 'react'
import {HiHome} from 'react-icons/hi'
import {HiDuplicate} from 'react-icons/hi'
import {HiFire} from 'react-icons/hi'
import {FiLogOut} from 'react-icons/fi'
import {BsPencilSquare} from 'react-icons/bs'
import '../comp.css'
function Menu() {
    let history = useHistory();
    const [user, setUser] = useState({})
    const yourPosts = () =>{
        let token = localStorage.getItem('token');
        if(token){
            axios.post('http://localhost:3001/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    console.log(res.data)
                    setUser(res.data);
                    console.log(user);
                    history.push("/yourposts")
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }else{
            history.push("/login");
        }
    }

    const authToken = () =>{
        let token = localStorage.getItem('token');
        if(token){
            axios.post('http://localhost:3001/auth', {token:token})
            .then(res=>{
                console.log(res.data)
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    setUser(res.data);
                    console.log(user);
                    history.push("/home")

                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }
    }

    const authToken1 = () =>{
        let token = localStorage.getItem('token');
        if(token){
            axios.post('http://localhost:3001/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    console.log(res.data)
                    setUser(res.data);
                    console.log(user);
                    history.push("/create")
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }else{
            history.push("/login");
        }
    }
    
    const authToken2 = () =>{
        let token = localStorage.getItem('token');
        if(token){
            axios.post('http://localhost:3001/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    console.log(res.data)
                    setUser(res.data);
                    console.log(user);
                    history.push("/dropdown")
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }else{
            history.push("/login");
        }
    }

    const logOut = () => {
        localStorage.removeItem("token");
        history.push('/login');
    }

    
    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token){
            axios.post('http://localhost:3001/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    console.log("settting")
                    setUser(res.data);
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }
    },[])
    const Trending = () =>{
        let token = localStorage.getItem('token');
        if(token){
            axios.post('http://localhost:3001/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    console.log(res.data)
                    setUser(res.data);
                    console.log(user);
                    history.push("/trending")
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }else{
            history.push("/login");
        }
    }
    return (
        <div className="menu_container">
            <button className="menu_button" onClick={authToken}><HiHome  className="makepost_icon"/>Home</button>
            <button className="menu_button" onClick={authToken1} ><BsPencilSquare className="makepost_icon"/>Make a Post</button>
            <button className="menu_button" onClick={yourPosts}><HiDuplicate className="makepost_icon"/>Your Posts</button>
            <button className="menu_button" onClick={Trending}> <HiFire className="makepost_icon"/>Trending</button>
            <button className="menu_button" button onClick={logOut}><FiLogOut className="makepost_icon"/>Log Out</button>
            
        </div>
    )
}

export default Menu
