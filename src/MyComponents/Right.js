import React, {useState, useEffect} from 'react'
import { useHistory} from 'react-router-dom'
import axios from 'axios'




function Right() {
    const [user, setUser] = useState({})

    let history = useHistory();
    
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
    return (
        <div className="right">
            <div>
                <h1>Hello {user.username}</h1>
                <button onClick={authToken1} type="button" name="create">Make a post</button>
                <button onClick={authToken} type="button" name="home">Home</button>
                <button onClick={logOut} type="button" name="logout">Log Out</button>
                <button onClick={yourPosts} type='button' name='yourposts'>Your Posts</button>
                
            </div>
        </div>
    )
}

export default (Right);
