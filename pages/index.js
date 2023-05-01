import style from "@/styles/Home.module.css";
import Head from "next/head";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();

    console.log(session);

    return (
        <>
            <Head>
                <title>NextJS Spotify Clone</title>
                <meta name="description" content="A Spotify Clone made using NextJS, for education purposes."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href="/Spotify_Icon_RGB_Black.png" rel="icon"/>
            </Head>
            <main className={style.main}>
                <Sidebar/>
                <div>{/* BROWSER */}</div>
            </main>
            <footer>
                {/* PLAYER */}
            </footer>
        </>
    );
}