import style from "./Sidebar.module.css";

export default function Sidebar() {

    return (
        <div className={style.main}>
            <div className={style.locations}>
                <div className={style.location}>
                    Home
                </div>
                <div className={style.location}>
                    Search
                </div>
                <div className={style.location}>
                    Your Library
                </div>
                <div className={style.location}>
                    Create Playlist
                </div>
                <div className={style.location}>
                    Liked Songs
                </div>
                <div className={style.location}>
                    Your Episodes
                </div>
            </div>
        </div>
    );
};