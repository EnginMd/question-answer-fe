import React, { useEffect, useState } from 'react'
import Post from '../components/Post';
import { makeStyles } from 'tss-react/mui';
import PostForm from '../components/PostForm';

const useStyles = makeStyles()((theme) =>
{
  return {
      container: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f5ff"
    }
  };
});

const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const { classes } = useStyles();
    
    const refreshPosts = () =>
    {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) =>
                {
                    setIsLoaded(true);
                    setPostList(result);
                    
                })
            .catch((error) =>
                {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() =>
    {
        refreshPosts();
    }, [])

    if (error)
    {
        return (
            <div>Error !!!</div>
        )
    }
    else if (!isLoaded)
    {
        return (
            <div>Loading...</div>
        )
    }
    else
    {
        return (
            
            <div className={classes.container} >
                {localStorage.getItem("currentUser") == null ? "" :
                    <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")}
                        refreshPosts={refreshPosts} />
                }
                {postList.map(post => (
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName}
                        title={post.title} text={post.text} />
                ))}
            </div>
           
        )
    }
}

export default Home
