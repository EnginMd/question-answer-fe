import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MessageBox from '../components/MessageBox'

const Auth = () =>
{
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const boxErr = "error"
    const boxSuccess = "success"
    const [boxMessage, setBoxMessage] = useState("");
    const [boxType, setBoxType] = useState(boxErr);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const errorOccurred = useRef(false);

    const handleLogin = async() =>
    {
        await sendRequest("login");
        if (!errorOccurred.current )
            navigate("/")
    }

    const handleRegister = async() =>
    {
        await sendRequest("register");
        if (!errorOccurred.current)
        {
            setUsername("");
            setPassword("");
        }
    }

    const sendRequest = async(method) =>
    {
        errorOccurred.current = false;

        await fetch(`/auth/${method}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: username,
                password: password
            })
        })
            .then((res) =>
            {
                if (res.status == 201)
                {
                    setBoxMessage("Registration completed successfully.");
                    setBoxType(boxSuccess);
                    setSnackbarOpen(true);
                }
                else if (res.status != 200) 
                {
                    errorOccurred.current = true;
                    setBoxMessage("An error occured.");
                    setBoxType(boxErr);
                    setSnackbarOpen(true);
                }
                return res.json();
                
            })
            .then(data =>
            {
                if (!errorOccurred.current)
                {
                    localStorage.setItem("token", data.accessToken)
                    localStorage.setItem("refreshToken", data.refreshToken)
                    localStorage.setItem("currentUser", data.userId)
                    localStorage.setItem("userName", username)
                }
            })
            .catch((err) => console.log(err, "error"));
        }

  return (
      <div>
          
        <FormControl sx={{top:40}}>
              <InputLabel>Username</InputLabel> 
              <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
              <InputLabel sx={{top:90}}>Password</InputLabel>
              <Input value={password} sx={{ top: 40 }} onChange={(e) => setPassword(e.target.value)} />
              
              <Button variant='contained' sx={{ marginTop: 10 }} onClick={handleLogin}>Login</Button>
              <FormHelperText sx={{ margin: 3 }}>No registered yet?</FormHelperText>
              <Button variant='contained' onClick={handleRegister}>Register</Button>    
          </FormControl>
          <MessageBox boxType={boxType} boxMessage={boxMessage} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen}  />
    </div>
  )
}

export default Auth
