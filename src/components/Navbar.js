import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from 'tss-react/mui';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Logout } from '../Utils/Common';


const useStyles = makeStyles()((theme) =>
{
  return {
    root: {
      color: theme.palette.primary.main,
    },
    apply: {
      marginRight: theme.spacing(2),
    },
    link: {
      textDecoration: "none",
      boxShadow: "none",
      color: "white"
    }
  };
});


const Navbar = () => {
  
  const { classes } = useStyles();
  const navigate = useNavigate();

  const logout = () =>
  {
    Logout();
    navigate(0);
  }

    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"left" }}>
                <Link className={classes.link} to="/">Home</Link>
              </Typography>
              <Typography variant="h6" component="div" >
                {console.log(localStorage.getItem("currentUser"),"currentUser")}
                {localStorage.getItem("currentUser") == null ?
                  <Link className={classes.link} to={{ pathname: '/auth' }}>Login/Register</Link> :
                  <div>
                    {localStorage.getItem("userName")}
                    <IconButton onClick={logout}><LockOpenIcon /></IconButton>
                  </div>
                }
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
          
    </div>
  )
}

export default Navbar
