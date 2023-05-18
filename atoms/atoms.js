import { atom } from "jotai";

export const sidebarEnlargedAtom = atom(false);
export const gridModeAtom = atom(false);
export const iconsOnlyAtom = atom(false);
export const playlistsAtom = atom([]);
export const featuredsAtom = atom([]);
export const currentSongAtom = atom({});