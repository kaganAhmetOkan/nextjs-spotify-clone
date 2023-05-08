import { useEffect } from "react";
import spotifyApi from "@/utils/spotify";
import { useSession } from "next-auth/react";

export default function useSpotify() {
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            // incase refresh access token fails
            if (session.error === "RefreshAccessTokenError") signIn();

            spotifyApi.setAccessToken(session.user.accessToken);
        };
    }, [session]);

    return spotifyApi;
};