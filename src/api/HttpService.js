import { Logout } from "../utils/Common"


export const ApiCallWithAuth = async (url, httpMethod, body) =>
{    
    let response = undefined;
    let dataResponse = undefined;
    let logout = false;
    let requestBody = "";

    if (body != null)
    {
        requestBody = body;
    }

    var apiCall =  await fetch(url, {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        },
        body: requestBody,
    })
        
    if (apiCall.status == 401)
    {
        const refreshResponse = await RefreshToken();
        if (refreshResponse.ok)
        {
            const data = await refreshResponse.json();
            if (data != undefined)
            {
                console.log("Token renewed.")
                localStorage.setItem("token", data.accessToken);
                

                var apiCall2 = await fetch(url, {
                    method: httpMethod,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token"),
                    },
                    body: requestBody,
                })

                response = apiCall2;
                try
                {
                    dataResponse = await apiCall.json();
                }
                catch (Exception) { }
            }
        }
        else
        {
            console.log("logout triggered.")
            logout = true;
            Logout();
        }
    }
    else
    {
        response = apiCall; 
        try
        {
            dataResponse = await apiCall.json();
        }
        catch(Exception){}
    }
        
    return [response, dataResponse, logout];
}


const RefreshToken = async() =>
{
    var request = await fetch("/auth/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: localStorage.getItem("currentUser"),
            refreshToken: localStorage.getItem("refreshToken"),
            //refreshToken: "sdfsdfsdf23423423dsf",
        }),
    })
    return request
}



