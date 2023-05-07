import style from "@/styles/Home.module.css";
import Head from "next/head";
import Sidebar from "@/components/Sidebar/Sidebar";
import Browser from "@/components/Browser/Browser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace("/login");
        },
    });

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
                <Browser session={session}/>
            </main>
            <footer>
                {/* PLAYER */}
            </footer>
        </>
    );
}

// Redirect component and withAuth hoc no longer necessary as next-auth provides an in-built
// way of managing unauthenticated sessions.

// TODOS
// Implement layout