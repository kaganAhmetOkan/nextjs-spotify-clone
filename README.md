This is a Spotify Client clone made with NextJS for educational purposes.
It uses the Spotify API and NextAuth to some extend, but isn't intended to replace the original Spotify Client.

# Getting Started

Firstly, use your Spotify account to get your Client ID and Client Secret from [Spotify.](https://developer.spotify.com)
In `dashboard > settings > edit`, add `http://localhost:3000/api/auth/callback/spotify` to **redirectURIs**.
You will need to do the same with the relevant URL if you intend to deploy your project.
Back in the app, create a `.env.local` file in the root directory. You need 3 entries:
```
NEXT_PUBLIC_PUBLIC_KEY="publickey"
NEXT_PUBLIC_PRIVATE_KEY="privatekey"
JWT_SECRET="jwtsecret"
```
The public and private keys are the Client ID and Client Secret from the Spotify API.
The JWT Secret is random and can be anything. I used the md5 hash of Client ID and Client Secret.

In the terminal, first make sure all dependencies are installed by running `yarn`.
If everything is done correctly, you should be able to see the website in [localhost:3000](http://localhost:3000) by running `yarn dev`.
You'll need to login with Spotify. The page should redirect you to [localhost:3000/login](http://localhost:3000/login) if you haven't logged in.

Note that the app stores no data, private or not. It is also unable to make any changes to your Spotify Account, saved songs, playlists, etc., since it does not request these permissions from Spotify.

## Features

- Skip to next and previous songs.
- Pause and unpause the current song.
- Shuffle the current queue.
- Repeat off, on, one options.
- Change volume.

## Known Bugs

- NextJS will throw an error if there are no songs being played in the Spotify Client when the page loads.