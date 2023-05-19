import style from "./Options.module.css";
import Image from "next/image";
import iconAudio from "@/public/audio-50.png";
import iconLowAudio from "@/public/low-volume-50.png";
import iconMuteAudio from "@/public/mute-50.png";
import { useState, useCallback, useEffect } from "react";
import useSpotify from "@/hooks/useSpotify";
import { debounce } from "throttle-debounce";
import { pullLocal, pushLocal } from "@/utils/localStorage";

export default function Options() {
  const spotifyApi = useSpotify();
  const [volume, setVolume] = useState(50);
  const [volumeBuffer, setVolumeBuffer] = useState(0);

  function returnVolumeIcon() {
    if (volume < 1) return iconMuteAudio;
    else if (volume < 50) return iconLowAudio;
    else return iconAudio;
  };

  function toggleMute() {
    if (volumeBuffer === 0) {
      setVolumeBuffer(volume);
      setVolume(0);
    }
    else {
      setVolume(volumeBuffer);
      setVolumeBuffer(0);
    };
  };

  const updateVolume = useCallback(debounce(200, (volume) => {
    spotifyApi.setVolume(volume);
    pushLocal("volume", volume);
  }), []);

  useEffect(() => updateVolume(volume), [volume, setVolume, updateVolume]);

  useEffect(() => {
    const storedVolume = pullLocal("volume");
    if (storedVolume) setVolume(storedVolume);
  }, [])

  return (
    <div className={style.main}>
      <div className={style.sounds}>
        <Image
          alt="sound"
          src={returnVolumeIcon()}
          width={18} height={18}
          onClick={() => toggleMute()}
        />
        <input
          title={volume}
          type="range"
          value={volume}
          step={1}
          onChange={(event) => {
            setVolume(event.target.value);
          }}
        ></input>
      </div>
    </div>
  );
};