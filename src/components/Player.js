import React, { useEffect } from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa";

const Player = ({
  songInfo,
  setSongInfo,
  audioRef,
  isPlaying,
  setIsPlaying,
  currentSong,
  songs,
  setCurrentSong,
  setSongs,
  TimeUpdateHandler,
}) => {
  const activeLibraryHandler = (nextprevious) => {
    const newsong = songs.map((song) =>
      song.id === nextprevious.id
        ? { ...song, active: true }
        : { ...song, active: false }
    );
    setSongs(newsong);
    nextprevious.active = true;
  };
  //Methods
  const playSongHandler = () => {
    if (!isPlaying) audioRef.current.play();
    else audioRef.current.pause();
    setIsPlaying(!isPlaying);
  };

  const FormatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipTrackHandler = async (direction) => {
    let currentSongId = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      currentSongId === songs.length - 1
        ? (currentSongId = 0)
        : (currentSongId += 1);
    } else {
      currentSongId === 0
        ? (currentSongId = songs.length - 1)
        : (currentSongId -= 1);
    }
    await setCurrentSong(songs[currentSongId]);
    activeLibraryHandler(songs[currentSongId]);
    if (isPlaying) audioRef.current.play();
  };
  const songEndHandler = async () => {
    let currentSongId = songs.findIndex((song) => song.id === currentSong.id);
    currentSongId === songs.length - 1
      ? (currentSongId = 0)
      : (currentSongId += 1);
    await setCurrentSong(songs[currentSongId]);
    if (isPlaying) audioRef.current.play();
  };
  //Add Style
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{FormatTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || "00:00"}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p>{FormatTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FaAngleLeft
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
        />
        {!isPlaying ? (
          <FaPlay onClick={playSongHandler} className="play" />
        ) : (
          <FaPause onClick={playSongHandler} className="play" />
        )}
        <FaAngleRight
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
        />
      </div>
      <audio
        onTimeUpdate={TimeUpdateHandler}
        onLoadedMetadata={TimeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
};
export default Player;
