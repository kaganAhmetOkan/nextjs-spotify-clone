import style from "./CurrentTrack.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import useSpotify from "@/hooks/useSpotify";

export default function CurrentTrack({ track: track }) {
  const spotifyApi = useSpotify();
  const [mainActive, setMainActive] = useState(false);
  const image = track?.album?.images[0];
  if (!track) console.log("no track");

  useEffect(() => {
    if (spotifyApi.getAccessToken() && spotifyApi.getMyDevices()) {
      if (track) setMainActive(true);
      else setMainActive(false);
    };
  }, [track, spotifyApi])

  return (
    <div className={style.main} data-active={mainActive}>
      <div className={style.thumbnail}>
        <Image alt={track?.name} src={image?.url} height={48} width={48} />
      </div>
      <div className={style.content}>
        <div>{track?.name}</div>
        <div className={style.artists}>
          {track?.artists?.map((artist, index) => {
            let returnValue;
            if (index === 0) returnValue = artist?.name;
            else returnValue = `, ${artist?.name}`;
            return (
              <div key={artist?.id} className={style.artist}>
                {returnValue}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};