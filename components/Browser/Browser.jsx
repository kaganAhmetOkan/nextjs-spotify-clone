import style from "./Browser.module.css";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import smallArrowIcon from "@/public/smallArrow-icon.png";
import playIcon from "@/public/icons8-play-50.png";
import pauseIcon from "@/public/icons8-pause-50.png";

export default function Browser({ session: session}) {
    const [displayProfileOptions, setDisplayProfileOptions] = useState(false);
    const [headerBackground, setHeaderBackground] = useState("");

    const smallArrowIconSize = 20;

    function generateHeaderBackground() {
        const colors = ["cyan", "blue", "violet", "purple"];
        const random = Math.floor(Math.random() * (colors.length - 1));
        setHeaderBackground(colors[random]);
        return colors[random];
    }

    function generateGreeting() {
        const time = new Date();
        const hour = time.getHours();

        if (hour >= 5 && hour < 12) return "Good Morning";
        else if (hour >= 12 && hour < 18) return "Good Afternoon";
        else return "Good Evening";
    };

    function handleProfileOptions(event) {
        if (event.target.className) return; // failsafe
        
        const value = event.target.textContent;
        
        if (value === "log out") {
            signOut();
            return;
        };
    };

    return (
        <div className={style.main}>
            <div className={style.header} data-background={headerBackground}>
                <div className={style.container}>
                    <div className={style.nav}>
                        <div className={style.navOptions}>
                            <Image
                                src={smallArrowIcon}
                                alt="Go Back"
                                height={smallArrowIconSize}
                                width={"auto"}
                                className={style.backward}
                                title="Go Back"
                            />
                            <Image
                                src={smallArrowIcon}
                                alt="Go Forward"
                                height={smallArrowIconSize}
                                width={"auto"}
                                className={style.forward}
                                title="Go Forward"
                            />
                        </div>
                        <div className={style.profile}>
                            <div className={style.container} onClick={() => setDisplayProfileOptions(!displayProfileOptions)}>
                                <Image
                                    alt="User Profile"
                                    src={session?.user?.image}
                                    fill={true}
                                    sizes="256px"
                                    title={session?.user?.name}
                                />
                            </div>
                            <div className={style.profileOptions} data-display={displayProfileOptions} onClick={(event) => handleProfileOptions(event)} onMouseLeave={() => setDisplayProfileOptions(false)}>
                                <div>account</div>
                                <div>profile</div>
                                <div>private session</div>
                                <div>settings</div>
                                <div>log out</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.hero}>
                        {generateGreeting()}
                    </div>
                    <div className={style.recentPlaylists}>
                        <div className={style.playlist} onMouseEnter={() => generateHeaderBackground()}>
                            <div className={style.thumbnail}>{`<3`}</div>
                            <div className={style.content}>
                                <div>Liked Songs</div>
                                <div className={style.playPause}>
                                    <Image
                                        alt="Play / Pause"
                                        src={pauseIcon}
                                        width={32}
                                        height={"auto"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={style.playlist}>
                            <div className={style.thumbnail}>{`<3`}</div>
                            <div className={style.content}>
                                <div>Liked Songs</div>
                                <div className={style.playPause}>
                                    <Image
                                        alt="Play / Pause"
                                        src={pauseIcon}
                                        width={32}
                                        height={"auto"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={style.playlist}>
                            <div className={style.thumbnail}>{`<3`}</div>
                            <div className={style.content}>
                                <div>Liked Songs</div>
                                <div className={style.playPause}>
                                    <Image
                                        alt="Play / Pause"
                                        src={pauseIcon}
                                        width={32}
                                        height={"auto"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={style.playlist}>
                            <div className={style.thumbnail}>{`<3`}</div>
                            <div className={style.content}>
                                <div>Liked Songs</div>
                                <div className={style.playPause}>
                                    <Image
                                        alt="Play / Pause"
                                        src={pauseIcon}
                                        width={32}
                                        height={"auto"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={style.playlist}>
                            <div className={style.thumbnail}>{`<3`}</div>
                            <div className={style.content}>
                                <div>Liked Songs</div>
                                <div className={style.playPause}>
                                    <Image
                                        alt="Play / Pause"
                                        src={pauseIcon}
                                        width={32}
                                        height={"auto"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={style.playlist}>
                            <div className={style.thumbnail}>{`<3`}</div>
                            <div className={style.content}>
                                <div>Liked Songs</div>
                                <div className={style.playPause}>
                                    <Image
                                        alt="Play / Pause"
                                        src={pauseIcon}
                                        width={32}
                                        height={"auto"}
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};