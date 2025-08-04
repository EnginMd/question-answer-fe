import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react'
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

const Comment = (props) =>
{
    const { classes } = useStyles();
    const { text, userId, userName, commentId} = props;

  return (
    <div key={commentId}>
        
          <CardContent className={classes.comment}>

              <OutlinedInput sx={{color: "black", background:"white"}}
                disabled
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 25 }}
                  fullWidth
                value={ text }
                  startAdornment={
                      <InputAdornment position='start'>
                          <Link className={classes.link} to={{ pathname: '/users/' + userId }}>
                              <Avatar aria-label='recipe' className={classes.avatar}>
                                  {userName.charAt(0).toUpperCase()}
                              </Avatar>
                          </Link>
                    </InputAdornment>
                }
              >

              </OutlinedInput>  
        </CardContent>
    </div>
  )
}

export default Comment
