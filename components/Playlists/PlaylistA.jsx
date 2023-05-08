import style from "./PlaylistA.module.css";
import Image from "next/image";
import songIcon from "@/public/icons8-music-24.png";

export default function PlaylistA({ playlist: playlist }) {
    const {name, images, description, type} = playlist;
    const image = images[0]?.url ?? songIcon;

    return (
        <div className={style.main}>
            <div className={style.body}>
                <div className={style.thumbnail}>
                    <Image
                        alt={name}
                        src={image}
                        width={images[0]?.url ? 48 : 24}
                        height={images[0]?.url ? 48 : 24}
                        title={description}
                    />
                </div>
                <div className={style.contents}>
                    <div className={style.title}>{name}</div>
                    <div>{`${type} • ${playlist?.owner?.display_name}`}</div>
                </div>
            </div>
            <div className={style.dateAdded}>
                {/* Playlist Add Date */}
            </div>
            <div className={style.lastPlayed}>
                {/* Playlist Last Played At */}
            </div>
        </div>
    );
};