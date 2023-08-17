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
const client_secret = process.env.REACT_APP_SPOTIFY_APP_SECRET;

const queryParams = queryString.parse(window.location.hash);

if(queryParams.access_token){
    console.log('setting access token', queryParams.access_token);
    localStorage.setItem("access_token", queryParams.access_token);
    const access_token = localStorage.getItem("access_token");
    const options = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    };
    // const getUserProfile = await fetch("https://api.spotify.com/v1/me", options)
    // // when we call fetch, it returns a promise and the resolve value is the response object
    // // then we need to get the json from the response object
    //     .then(response => response.json())
    //     // the data is the json from the response
    //     // the data is the user profile (my spotify profile in this case/ then whatever user logs in to use the playlist app)
    //     .then(data => {
    //         console.log('data:', data);
    //         localStorage.setItem("profile", JSON.stringify(data));
    //     });

    try {
        const getUserProfileResponse = await fetch("https://api.spotify.com/v1/me", options);
        const userProfileData = await getUserProfileResponse.json();
        console.log('User Profile:', userProfileData);
        localStorage.setItem("profile", JSON.stringify(userProfileData));
    
        // moved the second part to "getPlaylists"
    
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  

}

const SpotifyService = {
    setAccessToken: function (access_token) {
        localStorage.setItem("access_token", access_token);
    },
    isAuthorized: function () {
        return localStorage.getItem("access_token") ? true : false;
    },
    // the authorize uses implicit grant flow
    // it's sends the user to the Spotify authorize gateway (accounts.spotify.com) to login and authorize the app
    authorize: function () {
        const client_id = process.env.REACT_APP_SPOTIFY_APP_ID;
        const redirect_uri = "http://localhost:3000";
        const scope = "playlist-modify-public";
        const state = generateRandomString(16);

        localStorage.setItem(stateKey, state);

        const url = "https://accounts.spotify.com/authorize"
            + "?response_type=token"
            + `&client_id=${encodeURIComponent(client_id)}`
            + `&client_secret=${encodeURIComponent(client_secret)}`
            + `&scope=${encodeURIComponent(scope)}`
            + `&redirect_uri=${encodeURIComponent(redirect_uri)}`
            + `&state=${encodeURIComponent(state)}`;

        window.location = url;
    },
    // the search is GET(ting) data from the Spotify API while the save is POST(ing) data to the Spotify API
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
            .then(function(response){
                if(response.status==401){
                    SpotifyService.authorize(); 
                }
                console.log('response:', response);

                return response;    

            })
            .catch(error => console.log(error))
            // we call .then on the promise and pass it a callback function that takes the response and converts it to json
            .then(response => response.json())
            // we call .then on the promise and pass it a callback function that takes the json and returns the array of tracks
            // response.json() returns a promise that resolves to an object - jsonResponse is the object that response.json resolves to.
            // we call .then on the promise and pass it a callback function that takes the jsonResponse and returns an array of tracks
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                console.log('jsonResponse:', jsonResponse)
                return jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    };
                })
            });
    },
    save: function(playlist) {
        const access_token = localStorage.getItem("access_token");
        // JSON.parse converts the string to an object - 
        // hydration: because local storage can only take strings 
        // but then when we want to use it in our app we need to convert it back to an object
        const profile = JSON.parse(localStorage.getItem("profile"));
        const user_id = profile.id;
        // crates url for creating a playlist
        // url is an endpoint that creates an empty playlist for the user
        const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
        // creates options object for creating a playlist, headers and body
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            // we have to stringify the body to JSON because the content is json and fetch only accepts strings
            body: JSON.stringify({
                name: playlist.name
            })
        };
        // fetch sends a POST request to the url and returns a promise. 
        // This saves an empty playlist to the user's account.
        return fetch(url, options)
            // when we send a fetch request, it creates a promise and that promise resolves with a response, 
            // but the response has not been read yet. 
            // To read the response, we need to convert it to json. 
            // Response.json() is an asyncronous function/method that also returns a promise.
            .then(response => response.json())
            // response.json resolves with jsonResponse.
            // once response.json resolves, we use jsonResponse to get the playlist id and create a new url (to do what we write in the function)
            // here we are adding tracks to the playlist from the selected tracks we picked in the search results to the playlist we created
            .then(jsonResponse => {
                const playlist_id = jsonResponse.id;
                const url = `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`;
                const options = {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        uris: playlist.tracks.map(track => track.uri)
                    })
                };
                // this fetch saves the playlist with the tracks we picked in our playlist
                return fetch(url, options);
                // need to update this method so that it updates an existing playlist line 161-174
                // when I pass a playlist that I want to update I need to include the id of the playlist 
                // when it gets passed into this method
            });
    },
    getPlaylists: async function(callback) {
        const access_token = localStorage.getItem("access_token");
        const options = {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        };
        // Now let's fetch the user's playlists
        const getPlaylistsResponse = await fetch("https://api.spotify.com/v1/me/playlists", options);
        const playlistsData = await getPlaylistsResponse.json();
        console.log('User Playlists:', playlistsData);
        callback(playlistsData);
    },
    loadPlaylist: function() {
        // make a fetch call to load the specified playlist
        // i need to pass the playlist as a param
        // find out what the endpoint is to load a playlist (spotify documentation or other)
        // either use callback after the playlist has loaded to return the playlist data form this function
        // or a return statement (preferred)
    }
}

export default SpotifyService;