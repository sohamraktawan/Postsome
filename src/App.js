
import './comp.css';
import Header from "./MyComponents/Header";

import Right from "./MyComponents/Right";
import Left from "./MyComponents/Left";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Posts from "./MyComponents/Posts";
import CreatePost from "./MyComponents/CreatePost";
import SignUp from './MyComponents/SignUp'
import Login from './MyComponents/Login'
import YourPosts from './MyComponents/YourPosts'
import Post from './MyComponents/Post'
import OnePost from './MyComponents/OnePost'
import Trending from './MyComponents/Trending'
import Menu from "./MyComponents/Menu"

function App() {
  return (
    <div className="body">

        <Router>


        <Switch>
          <Route exact path='/home'>
          <Header/>
          <div className="posts_container">
            <Left/>
            <Posts/>
            <Right/>
          </div>
          </Route>
          <Route exact path='/create'>
          <Header/>
          <div className="posts_container">
            <Left/>
            <CreatePost/>
            <Right/>
          </div>
          </Route>

          <Route exact path='/'>

            <SignUp/>
          </Route>
          <Route exact path='/login'>
            
            <Login/>
          </Route>
          <Route exact path='/yourposts'>
          <Header/>
          <div className="posts_container">
            <Left/>

            <YourPosts/>
            <Right/>
          </div>
          </Route>
          <Route exact path='/post'>
          <Header/>
          <div className="posts_container">
            <div className="posts_column">            
            <OnePost/>
            </div>
            <Right/>
            </div>
          </Route>

          <Route exact path ="/trending">
          <Header/>
          <div className="posts_container">
            <Left/>
            <Trending/>
            <Right/>
          </div>
          </Route>
          <Route exact path="/dropdown">
            <Header/>
              <div className="posts_container">
                <Menu/>
                <Right/>
              </div>

          </Route>


        </Switch>
       
        </Router>




    </div>
  );
}

export default App;
