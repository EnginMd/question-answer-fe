import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { lightBlue, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Link, useNavigate } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { ApiCallWithAuth } from '../api/HttpService';

const useStyles = makeStyles()((theme) =>
{
  return {
    link: {
      textDecoration: "none",
      boxShadow: "none",
      color: "white"
    }
  };
});

const ExpandMore = styled((props) =>
{
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Post = (props) =>
{
    const { title, text, userId, userName, postId, likes } = props;
    const [expanded, setExpanded] = useState(false);
    const { classes } = useStyles();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [likeId, setLikeId] = useState();
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const userNotLoggedIn = localStorage.getItem("currentUser") == null ? true : false

    const setRefreshComment = () =>
    {
        setRefresh(true);
    }

    const handleExpandClick = () =>
    {
        setExpanded(!expanded);

        if (!expanded)
        {
            refreshComments();
        }
    };

    const handleLike = () =>
    {
        setIsLiked(!isLiked);
        if (!isLiked)
            saveLike();
        else
            deleteLike();
    };

    const refreshComments = async () =>
    {
        setIsLoaded(false);
        
        await fetch(`/comments?postId=${postId}`)
            .then(res => res.json())
            .then((data) =>
            {
                setCommentList(data);
                setIsLoaded(true);

            })
            .catch((error) =>
            {
                setIsLoaded(true);
                console.log(error, "error")
            })
        
        setRefresh(false);
    }

    const saveLike = async() =>
    {
        const body =  JSON.stringify({
            postId: postId,
            userId: localStorage.getItem("currentUser")
        });

        const [res, data, logout] = await ApiCallWithAuth("/likes", "POST", body)

        if (logout)
        {
            navigate("/auth");
        }
        else if (data.id)
        {
            setLikeId(data.id);
            setLikeCount(likeCount + 1);
        }
    }

    const deleteLike = async() =>
    {
        const [res, data, logout] = await ApiCallWithAuth(`/likes/${likeId}`, "DELETE", null)

        if (logout)
        {
            navigate("/auth");  
        }
        else if (res != undefined && res.status == 200)
        {
            setLikeCount(likeCount - 1);
            setLikeId(null);
        }
    }

    useEffect(() =>
    {
        let likeFound = likes.find(like => ""+like.userId === localStorage.getItem("currentUser"));
        if (likeFound != null)
        {
            setIsLiked(true);
            setLikeId(likeFound.id);
        }

        if (refresh)
            refreshComments();
    }, [refresh])

    return (
        <div key={postId}>
            <Card sx={{ width: 600, textAlign: "left", margin:"20px"}}>
                <CardHeader
                    avatar={
                        <Link className={classes.link} to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ bgcolor: lightBlue[800] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites"
                        disabled={userNotLoggedIn}
                        onClick={handleLike}>
                        <FavoriteIcon sx={isLiked ? { color: "red" } : null} />
                    </IconButton>
                    {likeCount}
                    
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    
                    <Container fixed className={classes.container}>
                        {isLoaded ? commentList.map(comment => (
                            <div key={comment.id}>
                               <Comment userId={comment.userId} userName={comment.userName} text = {comment.text} />
                            </div>
                        )) : 'loading...'}
                        {userNotLoggedIn ? "" :
                            <CommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} postId={postId} setRefreshComment={setRefreshComment} />
                        }
                    </Container>
                    
                    {/* <CardContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {isLoaded ? commentList.map(comment => (
                                <div key={comment.id}>
                                    {comment.text}  
                                </div>
                              )) : 'loading...'}
                        </Typography>
                    </CardContent> */}
                </Collapse>
            </Card>
           
        </div>
    )
}

export default Post
