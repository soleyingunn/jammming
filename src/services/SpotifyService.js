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
        const client_id = process.env.SPOTIFY_APP_ID;
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
    },
    search: function(searchTerm) {
        // This stores the access token that Spotify gives us after we authorize
        const access_token = localStorage.getItem("access_token");
        // the url is the spotify search endpoint we want to hit 
        const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`;
        // This is the options object that tells fetch to include our access token in the request headers
        const options = {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        };
        // fetch sends a request to the url and returns a promise. 
        return fetch(url, options)
            // we call .then on the promise and pass it a callback function that takes the response and converts it to json
            .then(response => response.json())
            // we call .then on the promise and pass it a callback function that takes the json and returns the array of tracks
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    };
                });
            });
    }
}

export default SpotifyService;