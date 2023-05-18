import style from "@/styles/Home.module.css";
import Head from "next/head";
import Sidebar from "@/components/Sidebar/Sidebar";
import Browser from "@/components/Browser/Browser";
import Player from "@/components/Player/Player";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSpotify from "@/hooks/useSpotify";
import { useSetAtom } from "jotai";
import { playlistsAtom, featuredsAtom, currentSongAtom } from "@/atoms/atoms";

export default function Home() {
    const spotifyApi = useSpotify();
    const setPlaylists = useSetAtom(playlistsAtom);
    const setFeatureds = useSetAtom(featuredsAtom);
    const setCurrentSong = useSetAtom(currentSongAtom);

    const router = useRouter();

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace("/login");
        },
    });

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body);
            });
            spotifyApi.getFeaturedPlaylists({limit: 5}).then((data) => {
                setFeatureds(data.body.playlists.items)
            });
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                if (data.body) {
                    setCurrentSong(data.body.item);
                    console.log(data);
                };
            });
        };
    }, [session, spotifyApi, setPlaylists, setFeatureds, setCurrentSong]);

    return (
        <>
            <Head>
                <title>NextJS Spotify Clone</title>
                <meta name="description" content="A Spotify Clone made using NextJS, for education purposes."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href="/Spotify_Icon_RGB_Black.png" rel="icon"/>
            </Head>
            <main className={style.main}>
                <Sidebar />
                <Browser session={session}/>
            </main>
            <footer className={style.footer}>
                <Player />
            </footer>
        </>
    );
}

// BUGS
// Playlist fetch seems to refetch needlessly whenever the BROWSER is back in focus

// NOTES
// Redirect component and withAuth hoc no longer necessary as next-auth provides an in-built way of managing unauthenticated sessions.

// TODOS
// Implement layout