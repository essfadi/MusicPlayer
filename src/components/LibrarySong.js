import React from "react";

const LibrarySong = ({
  audioRef,
  id,
  songs,
  setCurrentSong,
  currentSong,
  isPlaying,
  setSongs,
}) => {
  const SongSelectHandler = async () => {
    await setCurrentSong(currentSong);
    // Set Active Song:
    const newsong = songs.map((song) =>
      song.id === id ? { ...song, active: true } : { ...song, active: false }
    );
    setSongs(newsong);
    currentSong.active = true;
  };
  return (
    <div
      onClick={SongSelectHandler}
      className={`library-song ${currentSong.active ? "selected" : ""}`}
    >
      <img src={currentSong.cover} alt="Cover of the Album" />
      <div className="song-description">
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
