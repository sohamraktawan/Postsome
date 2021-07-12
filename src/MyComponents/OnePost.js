import React from 'react'
import axios from "axios";
import  { useEffect, useState } from "react";
import { useHistory, useLocation, Link } from 'react-router-dom'
import {FaUser, FaRegCommentDots} from "react-icons/fa"
import {RiPenNibLine} from "react-icons/ri"
import {CgChevronDoubleUpR ,CgChevronDoubleDownR} from "react-icons/cg"



function Post() {
  let history = useHistory()
  let data = useLocation();
  
    
  console.log(data.state.post)
  console.log(data.state.user)
  const [msg, setMsg] = useState("Upvote")
  const [msgD, setMsgD] = useState("Downvote")
  const [upvotes, setupvotes] = useState(data.state.post.likes)
  const [downvotes, setdownvotes] = useState(data.state.post.dislikes)
  const [comments, setcomments] = useState(data.state.post.comments)
  const [nocomments, setNocomments] = useState(data.state.post.nocomments)
  const [styleUp, setstyleUp] = useState({color:"white"})
  const [styleDown, setstyleDown] = useState({color:"white"})
  const [input, setInput] = useState({
    comment:""
})
  const [post1, setpost1] = useState(data.state.post)
  const [user1, setuser1] = useState(data.state.user)

  useEffect(() => {

    


    let upobj={
        id:post1._id
    }
    axios.post("http://localhost:3001/onepost", upobj)
    .then(res=>{
        setpost1(res.data)
    })
    let token = localStorage.getItem('token');
    if(token){
        axios.post('http://localhost:3001/auth', {token:token})
        .then(res=>{
            if(res.data === false){
                
                history.push("/login");
            }else{
                console.log("settting")
                setuser1(res.data);
            }
        })
        .catch((err) =>{
            console.log(err);
        })
    }
    setupvotes(post1.likes)
    setdownvotes(post1.dislikes)
    setNocomments(post1.nocomments)
    setcomments(post1.comments)
    if(user1.postsLiked.includes(post1._id)){
      setMsg("Upvoted")
      setstyleUp({color:"skyblue"})

    }
    if(user1.postsDisliked.includes(post1._id)){
      setMsgD("Downvoted")
      setstyleDown({color:"skyblue"})

    }

  }, [])



  const upvote = () =>{
    console.log(user1._id)
    let upobj = {
      id: post1._id,
      user: user1._id,
    };
    setMsg("Upvoted")
    setstyleUp({color:"skyblue"})

    setupvotes(upvotes=>{return upvotes+1})


    setuser1(user=>{
      
      user.postsLiked.push(post1._id)
      console.log(user)
      return user
    })
  
    axios
    .post("http://localhost:3001/upvote", upobj)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const downvote = ()=>{
    console.log(user1._id)
    let upobj = {
      id: post1._id,
      user: user1._id,
    };
    setMsgD("Downvoted")
    setstyleDown({color:"skyblue"})

    setdownvotes(downvotes=>{return downvotes+1})


    setuser1(user=>{
      
      user.postsDisliked.push(post1._id)
      console.log(user)
      return user
    })
  
    axios
    .post("http://localhost:3001/downvote", upobj)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  const unupvote = () =>{
    console.log(user1._id)
    let upobj = {
      id: post1._id,
      user: user1._id,
    };
    setMsg("Upvote")
    setstyleUp({color:"white"})

    setupvotes(upvotes=>{return upvotes-1})


    setuser1(user=>{
      
    user.postsLiked = user.postsLiked.filter(e=>{
        return e!==post1._id
    })
      console.log(user)
      return user
    })
  
    axios
    .post("http://localhost:3001/unupvote", upobj)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const undownvote = () =>{
    console.log(user1._id)
    let upobj = {
      id: post1._id,
      user: user1._id,
    };
    setMsgD("Downvote")
    setstyleDown({color:"white"})

    setdownvotes(downvotes=>{return downvotes-1})


    setuser1(user=>{
      
    user.postsDisliked = user.postsDisliked.filter(e=>{
        return e!==post1._id
    })
      console.log(user)
      return user
    })
  
    axios
    .post("http://localhost:3001/undownvote", upobj)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleClick(){

    const newComment ={
      user:user1.username,
      comment:input.comment
    }
    const upobj={
      id:post1._id,
      user:user1.username,
      comment:input.comment
    }
    setcomments(comms=>{
      comms.push(newComment)
      return comms
    })
    setNocomments(prev=>{return prev+1})
    axios.post('http://localhost:3001/comment', upobj)
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    });

  
  
  
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

  function handleChange(event){
    const{value} = event.target;
    setInput({comment:value})
}

  return(
    <div className="post">
        <div className="post_head">
          <div className="user_container">
          <FaUser className="user_icon"/> 
          <div className="post_head_user"> {post1.username}</div>
          </div>
          <RiPenNibLine className="user_icon"/>
          <div className="post_head_timestamp">{timeSince(post1.timeStamp)} ago</div>
        </div>
        <div className="post_body">
          <div className="post_body_title">{post1.title}</div>
          <div className="post_body_desc">{post1.desc}</div>

        </div>
        <div className="upvote_container">
        <button style={styleUp} onClick={()=>{
      if (msg === "Upvote" && msgD === "Downvote") {
        upvote();
      } else if (msg === "Upvoted" && msgD === "Downvote") {
        unupvote();
      } else if (msg === "Upvote" && msgD === "Downvoted") {
        undownvote();
        upvote();
      }
        }}
        className="upvote_button"
        ><CgChevronDoubleUpR className="upvote_icon"/>{msg}</button>
        <button style={styleDown} onClick={()=>{
      if (msg === "Upvote" && msgD === "Downvote") {
        downvote();
      } else if (msg === "Upvote" && msgD === "Downvoted") {
        undownvote();
      } else if (msg === "Upvoted" && msgD === "Downvote") {
        unupvote();
        downvote();
      }
        }
        }
        className="upvote_button">
          <CgChevronDoubleDownR className="upvote_icon"/>{msgD}</button>
        </div>
      <div>
        <div className="upvote_number_container">
        <div  className="upvote_number">{upvotes} Upvotes </div>  
        <div className="upvote_number">{downvotes} Downvotes</div>
      </div>
      </div> 
      <form className="comment_form_container" action="">
           <div className="comment_input_container"><input className="comment_input" onChange={handleChange} type="text" id="comment"  value={input.comment} autoComplete="off" placeholder="Add a comment..."/></div>
       
         </form>
      <div className="post_comment_container"><button className="post_comment_button" onClick={handleClick}><FaRegCommentDots className="upvote_icon"/> Comment</button></div>
      <div className="comment_number">{nocomments} Comments</div>
         <div>{
            comments.map(comm=>{
              
              return(
               <div className="comment">
             <div className="comment_user"><FaUser className="upvote_icon"/>{comm.user}</div>
               <div className="comment_comment">{comm.comment}</div>
             </div>
             )
            })}</div>

      </div>

  )

}
export default Post


// {/* <form action="">
//           <div>Comment your thoughts!</div>
//           <div><input onChange={handleChange} type="text" id="comment"  value={input.comment} autoComplete="off"/></div>
       
//         </form>
//     <button onClick={handleClick}>Comment</button>
//     </div> 
//         <div>{
//             comments.map(comm=>{
              
//             return(
//               <div>
//               <div>{comm.user}</div>
//               <div>{comm.comment}</div>
//               </div>
//              )
//             })}</div> */}
            