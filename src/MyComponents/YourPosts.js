import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import YourOnePost from "./YourOnePost"

function YourPosts() {


  let history = useHistory();
  const [msg, setmsg] = useState([])
  const[user, setUser] = useState({
    _id:"",
    username:"",
    email:"",
    password:"",
    postsLiked:[],
    postsDisliked:[]
  })
  const [posts, setPosts] = useState([{
    dislikedBy: [],
    likedBy: [],
    _id: "",
    username: "",
    timeStamp: "",
    title: "",
    desc: "",
    comments:[{
      user:"",
      comment:""
    }]
  },
]);

const onDelete = (post) =>{
  console.log('I am OnDelete')
  setPosts(posts.filter((e)=>{
      return e!==post;
  }))
  let upobj = {
    id: post._id,
    user: user._id,
  };
  axios.post('https://postsome-backend-production.up.railway.app/delete', upobj)
  .then(res=>{
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
}


useEffect(() => {
  fetch("https://postsome-backend-production.up.railway.app/posts")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((jsonRes) => {
      jsonRes.sort(function(a,b){
        let timea = Date.now() - a.timeStamp
        let timeb = Date.now() - b.timeStamp
        return timea - timeb
      })
      setPosts(jsonRes);
    });
            let token = localStorage.getItem('token');
        if(token){
            axios.post('https://postsome-backend-production.up.railway.app/auth', {token:token})
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

},[]);




const upvote = (post) =>{
  window.location.reload()
  let upobj = {
    id: post._id,
    user: user._id,
  };

  setPosts(posts=>{posts.map(object=>{
    if(object._id===post._id){
      object.likedBy.push(user._id)
      return object  
    }



  })
  console.log(posts)
  return posts
  })
  setUser(user=>{
    user.postsLiked.push(post._id)
    console.log(user)
    return user
  })

  axios
  .post("https://postsome-backend-production.up.railway.app/upvote", upobj)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
}





return(

  





    <div  className="posts_column">
      {posts.map(post=>{
        
        if(post.username === user.username){
        return(

            <YourOnePost post={post} user={user} onDelete={onDelete}/>

        )}
      })}  
    </div>  
  )
  
}

export default YourPosts;

