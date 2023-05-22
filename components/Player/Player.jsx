import style from "./Player.module.css";
import { useAtomValue } from "jotai";
import { currentSongAtom } from "@/atoms/atoms";
import CurrentTrack from "./CurrentTrack/CurrentTrack";
import Controls from "./Controls/Controls";
import Options from "./Options/Options";

export default function Player() {
  const currentSong = useAtomValue(currentSongAtom);

  return (
    <div className={style.main}>
      <div className={style.container}>
        <CurrentTrack track={currentSong} />
        <Controls track={currentSong} />
        <Options />
      </div>
    </div>
  );
};