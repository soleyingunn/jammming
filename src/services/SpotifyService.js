import queryString from "query-string";

const generateRandomString = length => {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    while (text.length <= length) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

const stateKey = "spotify_auth_state";

const queryParams = queryString.parse(window.location.hash);

if(queryParams.access_token){
    console.log('setting access token', queryParams.access_token);
    localStorage.setItem("access_token", queryParams.access_token);
}

const SpotifyService = {
    setAccessToken: function (access_token) {
        localStorage.setItem("access_token", access_token);
    },
    isAuthorized: function () {
        return localStorage.getItem("access_token") ? true : false;
    },
    authorize: function () {
        const client_id = "380b9dfd4d4d4dcb935a8b367c7aa02a";
        const redirect_uri = "http://localhost:3000";
        const scope = "user-read-private user-read-email";
        const state = generateRandomString(16);

        localStorage.setItem(stateKey, state);

        const url = "https://accounts.spotify.com/authorize"
            + "?response_type=token"
            + `&client_id=${encodeURIComponent(client_id)}`
            + `&scope=${encodeURIComponent(scope)}`
            + `&redirect_uri=${encodeURIComponent(redirect_uri)}`
            + `&state=${encodeURIComponent(state)}`;

        window.location = url;
    }
}

export default SpotifyService;