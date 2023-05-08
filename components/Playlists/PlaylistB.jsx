import style from "./PlaylistB.module.css";
import songIcon from "@/public/icons8-music-24.png";
import Image from "next/image";

export default function PlaylistB({ playlist: playlist}) {
    const {name, images, type} = playlist;
    const image = images[0]?.url ?? songIcon;
    const owner = playlist.owner.display_name;

    return (
        <div className={style.main} data-type={type}>
            <div className={style.thumbnail}>
                <Image
                    alt={name}
                    src={image}
                    width={images[0]?.url ? 128 : 24}
                    height={images[0]?.url ? 128 : 24}
                />
            </div>
            <div className={style.contents}>
                <div className={style.title}>{name}</div>
                <div className={style.details}>{owner}</div>
            </div>
        </div>
    );
}