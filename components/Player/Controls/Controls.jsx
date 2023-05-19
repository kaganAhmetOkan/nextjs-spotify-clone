import style from "./Controls.module.css";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import shuffleIcon from "@/public/icons8-shuffle-50.png";
import greenShuffleIcon from "@/public/icons8-shuffle-50-green.png";
import previousIcon from "@/public/icons8-skip-to-start-50.png";
import pauseIcon from "@/public/icons8-pause-50.png";
import unpauseIcon from "@/public/icons8-play-50.png";
import nextIcon from "@/public/icons8-end-50.png";
import repeatIcon from "@/public/icons8-repeat-50.png";
import greenRepeatIcon from "@/public/icons8-repeat-50-green.png";
import oneRepeatIcon from "@/public/icons8-repeat-one-50.png";
import { getMins, getSecs } from "@/utils/time";
import useSpotify from "@/hooks/useSpotify";
import { useSetAtom } from "jotai";
import { currentSongAtom } from "@/atoms/atoms";
import { debounce } from "throttle-debounce";

export default function Controls({ track }) {
  const spotifyApi = useSpotify();

  const setCurrentSong = useSetAtom(currentSongAtom);
  const [shuffle, setShuffle] = useState(false);
  const [paused, setPaused] = useState(false);
  const [repeat, setRepeat] = useState(0);
  const repeatIcons = [repeatIcon, greenRepeatIcon, oneRepeatIcon];
  const [progressCurrent, setProgressCurrent] = useState(0);
  const trackDuration = track.duration_ms;

  const updateTrack = useCallback(debounce(1000, () => {
    spotifyApi.getMyCurrentPlayingTrack().then((data) => {setCurrentSong(data?.body?.item); console.log(data)});
  }), []);


  return (
    <div className={style.main}>
      <div className={style.controls}>
        <Image
          title={shuffle ? "unshuffle" : "shuffle"}
          alt="shuffle"
          src={shuffle ? greenShuffleIcon : shuffleIcon}
          width={24} height={24}
          onClick={() => {
            spotifyApi.setShuffle(!shuffle);
            setShuffle(!shuffle)
          }}
          className={style.icon}
        />
        <Image
          title="previous song"
          alt="previous"
          src={previousIcon}
          width={24} height={24}
          className={style.icon}
          onClick={() => {
            spotifyApi.skipToPrevious();
            updateTrack();
          }}
        />
        <Image
          alt="pause/unpause"
          src={paused ? unpauseIcon : pauseIcon}
          width={24} height={24}
          onClick={() => {
            if (paused) spotifyApi.play();
            else spotifyApi.pause();
            setPaused(!paused);
          }}
          className={style.pause}
        />
        <Image
          title="next song"
          alt="next"
          src={nextIcon}
          width={24} height={24}
          className={style.icon}
          onClick={() => {
            spotifyApi.skipToNext();
            updateTrack();
          }}
        />
        <Image
          title="repeat song"
          alt="repeat"
          src={repeatIcons[repeat]}
          width={24} height={24}
          className={style.icon}
          onClick={() => {
            if (repeat === 0) {
              spotifyApi.setRepeat("context");
              setRepeat(1);
            }
            else if (repeat === 1) {
              spotifyApi.setRepeat("track");
              setRepeat(2);
            }
            else {
              spotifyApi.setRepeat("off");
              setRepeat(0);
            }
          }}
        />
      </div>
      <div className={style.progress}>
        <div>{`${getMins(progressCurrent)}:${getSecs(progressCurrent)}`}</div>
        <input
          className={style.bar}
          onChange={(event) => setProgressCurrent(event.target.value)}
          type="range"
          max={trackDuration ?? 0}
          step={1000}
        ></input>
        <div>{`${getMins(trackDuration)}:${getSecs(trackDuration)}`}</div>
      </div>
    </div>
  );
};