import React from 'react'
import axios from "axios";
import  { useEffect, useState } from "react";
import { useHistory, useLocation, Link } from 'react-router-dom'
import { set } from 'js-cookie';
import {FaUser, FaRegCommentDots} from "react-icons/fa"
import {RiPenNibLine} from "react-icons/ri"
import {CgChevronDoubleUpR ,CgChevronDoubleDownR} from "react-icons/cg"


function Post(props) {



  console.log(props.post)
  console.log(props.user)
  const [msg, setMsg] = useState("Upvote")
  const [msgD, setMsgD] = useState("Downvote")
  const [upvotes, setupvotes] = useState(props.post.likes)
  const [downvotes, setdownvotes] = useState(props.post.dislikes)
  const [comments, setcomments] = useState(props.post.comments)
  const [nocomments, setNocomments] = useState(props.post.nocomments)
  const [styleUp, setstyleUp] = useState({color:"white"})
  const [styleDown, setstyleDown] = useState({color:"white"})
  const [input, setInput] = useState({
    comment:""
})
  const [post1, setpost1] = useState(props.post)
  const [user1, setuser1] = useState(props.user)

  useEffect(() => {
    setuser1(props.user)
    
    setpost1(props.post)
    setupvotes(props.post.likes)
    setdownvotes(props.post.dislikes)
    setNocomments(props.post.nocomments)
    setcomments(props.post.comments)
    if(props.user.postsLiked.includes(props.post._id)){
      setMsg("Upvoted")
      setstyleUp({color:"skyblue"})
    }
    if(props.user.postsDisliked.includes(props.post._id)){
      setMsgD("Downvoted")
      setstyleDown({color:"skyblue"})
    }
  }, [props.post, props.user])



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
    .post("https://post-some.herokuapp.com/upvote", upobj)
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
    .post("https://post-some.herokuapp.com/downvote", upobj)
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
    .post("https://post-some.herokuapp.com/unupvote", upobj)
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
    .post("https://post-some.herokuapp.com/undownvote", upobj)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
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
          <RiPenNibLine className="user_icon_nib"/>
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

      <div className="comment_container">      
      <Link className="comment_link" to={{pathname: '/post',
                state: { post: post1, user: user1 }}}>
      <button className="comment_button"><FaRegCommentDots className="upvote_icon"/> Comment your thoughts!!</button>

      </Link>
      </div>

      </div>
      </div>
  )

}
export default Post
