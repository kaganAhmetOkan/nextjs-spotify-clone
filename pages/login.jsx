/* eslint-disable @next/next/no-img-element */
import style from "@/styles/Login.module.css";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";
import spotifyLogo from "@/public/Spotify_Logo_RGB_Green.png";

export default function Login({ providers }) {

    return (
        <>
            <Head>
                <title>NextJS Spotify Clone | Login</title>
                <meta name="description" content="Login Page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href="/Spotify_Icon_RGB_Black.png" rel="icon"/>
            </Head>
            <main className={style.main}>
                <img alt="Spotify Logo" src={spotifyLogo.src} className={style.logo}></img>
                {Object.values(providers).map((provider) => (
                    <div key={provider.id} className={style.buttonContainer}>
                        <button onClick={() => signIn(provider.id, { callbackUrl: "/"})}>Login with Spotify</button>
                    </div>
                ))}
            </main>
        </>
    );
};

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    };
};