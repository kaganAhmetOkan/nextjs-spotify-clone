import style from "./Sidebar.module.css";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import homeIcon from "@/public/home-icon.svg";
import searchIcon from "@/public/search-icon.svg";
import plusIcon from "@/public/plus-icon32.png";
import arrowIcon from "@/public/arrowRight-icon32.png";
import libraryIcon from "@/public/library-icon32.png";
import gridIcon from "@/public/grid-icon.png";
import listIcon from "@/public/playlist-icon.png";
import smallArrowIcon from "@/public/smallArrow-icon.png";

export default function Sidebar() {
    const [enlarged, setEnlarged] = useState(false);
    const [gridMode, setGridMode] = useState(false);
    const [searching, setSearching] = useState(false);
    const [displaySorting, setDisplaySorting] = useState(false);
    const [sortingBy, setSortingBy] = useState("recents");
    const [iconsOnly, setIconsOnly] = useState(false);
    
    const miniSearchBar = useRef();

    const displayOptions = ["Playlists", "Podcasts & Shows", "Albums", "Artists"];

    function handleSearch(event) {
        event.preventDefault();
        const value = event.target[0].value;
        if (value) {
            console.log(value);
        };
    };

    function handleSortOptions(event) {
        if (event.target.className) return; // failsafe
        const value = event.target.textContent;
        if (value !== "sort by") {
            setSortingBy(value)
            setDisplaySorting(false);
        };
    };

    useEffect(() => {
        if (searching) miniSearchBar?.current?.focus();
    }, [searching, setSearching]);

    return (
        <div className={style.main} data-enlarged={enlarged} data-icons-only={iconsOnly}>
            <div className={style.locations}>
                <div className={style.location}>
                    <Image src={homeIcon} alt="Home" height={22} width={"auto"}/>
                    <div>Home</div>
                </div>
                <div className={style.location}>
                    <Image src={searchIcon} alt="Search" height={22} width={"auto"} />
                    <div>Search</div>
                </div>
            </div>
            <div>
                <div className={style.yourLibrary}>
                    <div className={style.title} title="Collapse Your Library" onClick={() => setIconsOnly(!iconsOnly)}>
                        <Image src={libraryIcon} alt="Library" height={20} width={"auto"} />
                        <div>Your Library</div>
                    </div>
                    <Image
                        src={plusIcon}
                        alt="Create New Playlist"
                        height={16} width={"auto"}
                        className={style.icon}
                        title="Create"
                    />
                    <Image
                        src={gridMode ? listIcon : gridIcon}
                        alt="Change View Mode"
                        height={16} width={"auto"}
                        className={`${style.icon} ${style.viewMode}`}
                        onClick={() => setGridMode(!gridMode)}
                        title={gridMode ? "Switch to list view" : "Switch to grid view"}
                    />
                    <Image
                        src={arrowIcon}
                        alt="Enlarge Sidebar"
                        height={16} width={"auto"}
                        className={`${style.icon} ${style.enlarge}`}
                        onClick={() => setEnlarged(!enlarged)}
                        title={enlarged ? "Reduce Your Library" : "Enlarge Your Library"}
                    />
                </div>
                <div className={style.options}>
                    <div className={style.displayOptions}>
                    {
                        displayOptions.map((option) => {
                            return (
                                <div key={option} className={style.displayOption}>
                                    {option}
                                </div>
                            );
                        })
                    }
                    </div>
                    <div className={style.searchOptions}>
                        <form className={style.searchForm} data-searching={searching} onSubmit={(event) => handleSearch(event)}>
                            <Image
                                src={searchIcon}
                                alt="Search in Library"
                                title="Search in Your Library"
                                height={18} width={"auto"}
                                className={style.icon}
                                onClick={() => setSearching(!searching)}
                            />
                            <input ref={miniSearchBar} placeholder="Search in Your Library"></input>
                        </form>
                        <div className={style.recents} data-display={displaySorting}>
                            <div className={style.title} onClick={() => {
                                    setDisplaySorting(!displaySorting);
                                    setSearching(false);
                                }}>
                                {sortingBy}
                                <Image
                                    src={smallArrowIcon}
                                    height={12} width={"auto"}
                                    alt="expand"
                                    title="Expand"
                                />
                            </div>
                            <div className={style.sortOptions} onClick={(event) => handleSortOptions(event)} onMouseLeave={() => setDisplaySorting(false)}>
                                <div>sort by</div>
                                <div data-selected={sortingBy === "recents"}>recents</div>
                                <div data-selected={sortingBy === "recently added"}>recently added</div>
                                <div data-selected={sortingBy === "alphabetical"}>alphabetical</div>
                                <div data-selected={sortingBy === "creator"}>creator</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.playlists}>
                    <div>
                        <div className={style.playlistHead}>Title</div>
                        <div className={style.playlistBody}>Date Added</div>
                        <div className={style.playlistFoot}>Played</div>
                    </div>
                    {/* map the playlists */}
                </div>
            </div>
        </div>
    );
};