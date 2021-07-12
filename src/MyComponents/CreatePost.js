import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import {RiPenNibLine} from "react-icons/ri"
import {MdDoneAll} from "react-icons/md"

function CreatePost() {
    let history = useHistory();
    const [user, setUser] = useState({})
    const [input, setInput] = useState({
        title:'',
        desc:''
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
    
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  var aDay = 24*60*60*1000;

    function handleClick(e){
        e.preventDefault();
        const newPost ={
            username: user.username,
            timeStamp: Date.now(),
            title: input.title,
            desc: input.desc
        }
        console.log(newPost) 
        axios.post('https://post-some.herokuapp.com/create', newPost)
        .then(res=>{
            console.log(res);
            history.push("/home")
        })
        .catch(err=>{
            console.log(err);
        });

    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token){
            axios.post('https://post-some.herokuapp.com/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    setUser(res.data);
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }
    },[])




    return (

        <div className="make_post">
            <div className="make_post_icon_container"><RiPenNibLine  className="make_post_icon"/></div>
           <div className="make_post_head">Whats on your mind??</div>
            <form action="">
                <div className='make_post_input_container'>
                <div className="make_post_title_container"><input onChange={handleChange} type="text" name="title" id="title" value={input.title} autoComplete="off" placeholder="What is it about?" className="make_post_title" /></div>
                <div className="make_post_desc_container"> <textarea onChange={handleChange} name="desc" id="desc" cols="50" rows="5" value={input.desc} autoComplete="off" placeholder="More about it..." className="make_post_desc"></textarea></div>
                <div className="make_post_button_container"><button onClick={handleClick} className="make_post_button"><MdDoneAll className="publish_icon"/> PUBLISH</button></div>
                <div className="quote_main">"Beautifully crafted words have the power to captivate the mind of anybody"</div>
                <div className="quote_author">--Sam Veda</div>
                </div>
            </form>            
        </div>
    )
}

export default CreatePost