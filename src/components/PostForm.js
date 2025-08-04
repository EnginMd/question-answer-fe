import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { lightBlue, red } from '@mui/material/colors';
import { Link } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
    // variants: [
    //     {
    //         props: ({ expand }) => !expand,
    //         style: {
    //             transform: 'rotate(0deg)',
    //         },
    //     },
    //     {
    //         props: ({ expand }) => !!expand,
    //         style: {
    //             transform: 'rotate(180deg)',
    //         },
    //     },
    // ],
}));

const PostForm = (props) =>
{
    const { userId, userName, refreshPosts } = props;
    const { classes } = useStyles();
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSubmit = () =>
    {
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text
            })
        })
            .then((res) => res.json())
            .catch((err) => console.log(err, "error"));
        
        setTitle("");
        setText("");
        setSnackbarOpen(true);
        refreshPosts();
    };

    const handleClick = () =>
    {
        snackbarOpen(true);
    };

    const handleClose = (event, reason) =>
    {
        if (reason === 'clickaway')
        {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <div >
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Your post is sent!
                </Alert>
            </Snackbar>
            <Card sx={{ width: 600, textAlign: "left", margin:"20px"}}>
                <CardHeader
                    avatar={
                        <Link className={classes.link} to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ bgcolor: lightBlue[800] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={<OutlinedInput
                        id="outlined-adorment-amount"
                        multiline
                        placeholder='Title'
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={title}
                        onChange={ (i) => setTitle(i.target.value)}
                    >
                    </OutlinedInput>}
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {<OutlinedInput
                            id="outlined-adorment-amount"
                            multiline
                            placeholder='Text'
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <Button variant='contained' onClick={handleSubmit}>
                                        Post
                                    </Button>
                                </InputAdornment>
                            }
                            onChange={(i) => setText(i.target.value)}
                        >
                        </OutlinedInput>}
                    </Typography>
                </CardContent>
                
            </Card>
           
        </div>
    )
}

export default PostForm
