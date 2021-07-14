import React from 'react'
import axios from "axios";
import  { useEffect, useState } from "react";
import { useHistory, useLocation, Link} from 'react-router-dom'

function Left() {

    let history = useHistory();
    const [counter, setcounter] = useState(1)
    const [user, setUser] = useState({
      postsLiked: [],
      postsDisliked: [],
    });
    const [trendBar, settrendBar] = useState([])
  
    const [posts, setPosts] = useState([
      {
        dislikedBy: [],
        likedBy: [],
        _id: "",
        username: "",
        timeStamp: "",
        title: "",
        desc: "",
        likes:"",
        dislikes:""
      },
    ]);
  
    const deletePost = (post) =>{
      let upobj = {
          id: post._id,
          user: user._id,
      };
      axios.post('https://post-some.herokuapp.com/delete', upobj)
      .then(res=>{
          console.log(res)
      })
      .catch((err)=>{
          console.log(err)
      })
    }
    useEffect(() => {
      fetch("https://post-some.herokuapp.com/posts")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((jsonRes) => {
          jsonRes.sort(function(a,b){
              let usersReacteda = a.likes+a.dislikes+a.nocomments
              let usersReactedb = b.likes+b.dislikes+b.nocomments
              return usersReactedb - usersReacteda
          })

          setPosts(jsonRes);


 
        });

        let token = localStorage.getItem("token");
        if (token) {
          axios
            .post("https://post-some.herokuapp.com/auth", { token: token })
            .then((res) => {
              if (res.data === false) {
                history.push("/login");
              } else {
                setUser(res.data);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }

    }, []);
  
    const auth = () => {

    };
  
    // useEffect(() => {
    //   auth();
    //   const timer = setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    //   return () => clearTimeout(timer);
    // }, [user]);
  const handleClick = () =>{
    window.location.href="/post"
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

var count = 1

    return (

        
      <div className="trending_column">
          <div className="trending_bar_head">Trending Now!!</div>

          

        {posts.map(post=>{
          return(
    
            <Link  className="trending_link_out" to={{
                pathname: '/post',
                state: { post: post, user:user }
                
            }}>
              <div onClick={handleClick} className="trending_link_in">
              <div className="trending_user_container"><div className="trending_user">{post.username}</div> <div className="trending_time">{timeSince(post.timeStamp)} ago</div></div>
              <div className="trending_title">{post.title}</div>
              </div>
           </Link>
           

          

  



          )


        })}

        </div>
    );
  }

export default Left
