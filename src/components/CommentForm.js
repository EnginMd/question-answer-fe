import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) =>
{
    return {
        comment: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        small: {
            width: theme.spacing(4),
            height: theme.spacing(4)
        },
        link: {
            textDecoration: "none",
            boxShadow: "none",
            color: "white"
        }
    };
});



const CommentForm = (props) =>
{
    const { classes } = useStyles();
    const { userId, userName, postId, setRefreshComment } = props;
    const [text, setText] = useState("");

    const handleSubmit = () =>
    {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
                text: text
            })
        })
            .then((res) => res.json())
            .catch((err) => console.log(err, "error"));

        setText("");
        setRefreshComment();
    }

  return (
      <div key={postId}>
        
          <CardContent className={classes.comment}>

              <OutlinedInput sx={{color: "black", background:"white"}}
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 250 }}
                  fullWidth
                  startAdornment={
                      <InputAdornment position='start'>
                          <Link className={classes.link} to={{ pathname: '/users/' + userId }}>
                              <Avatar aria-label='recipe' className={classes.avatar}>
                                  {userName.charAt(0).toUpperCase()}
                              </Avatar>
                          </Link>
                    </InputAdornment>
                }
                  endAdornment={
                      <InputAdornment position='end'>
                          <Button variant='contained' onClick={handleSubmit}>
                              SEND
                          </Button>
                      </InputAdornment>
                  }
                  value={text}
                  onChange={(i) => setText(i.target.value)}
              >

              </OutlinedInput>  
        </CardContent>
    </div>
  )
}

export default CommentForm
