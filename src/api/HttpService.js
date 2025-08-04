import { Logout } from "../utils/Common"

export const PostWithAuth = (url, body) =>
{

    var request = fetch("/api" + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify(body),
    })

    return request
}

export const PostWithoutAuth = (url, body) =>
{

    var request = fetch("/api" + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })

    return request
}

export const PutWithAuth = (url, body) =>
{

    var request = fetch("/api" + url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
    })

    return request
}

export const GetWithAuth = (url) =>
{

    var request = fetch("/api" + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        },
    })

    return request
}

export const DeleteWithAuth = (url) =>
{

    var request = fetch("/api" + url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        },
    })

    return request
}

export const DeleteWithAuth2 = async(url) =>
{    
    let response = undefined;
    let dataResponse = undefined;

    await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        },
    })
        .then((res) =>
        {
            if (res.status == 401)
            {
                console.log("0");
                RefreshToken()
                    .then((res) =>
                    {
                        if (res.ok)
                            res.json();
                        else
                        {
                            Logout();
                        }
                    })
                    .then((data) =>
                    {
                        if (data != undefined)
                        {
                            localStorage.setItem("token", data.accessToken);
                            DeleteWithAuth2(url);
                        }
                    })
            }
            console.log("1")
            response = res;
        })
        .then(data => { dataResponse = data });
        
        console.log("2")
    return [response, dataResponse, logout];
}

const RefreshToken = () =>
{
    var request = fetch("/auth/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: localStorage.getItem("currentUser"),
            refreshToken: localStorage.getItem("refreshToken"),
        }),
    })
    return request
}



