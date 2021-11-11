import React from "react";
const server = "https://raw.githubusercontent.com/prof-tejera/assignment-2-ROK862/main/src/audio/";
const clips = {
  onClick: `${server}goalVolume01.mp3`,
  paused: `${server}goalVolume02.mp3`,
  timing: `${server}goalVolume03.mp3`,
  default: `${server}goalVolume01.mp3`,
};

// I am no longer using Hawler due to problems while getting 
// audio url from createObjectURL. Not to mention the inconsistancy.
// Will leave this here for reference to changes made.
const SoundEffect = () => {
  // deprecated.
  return <></>;
};

// New function for playing audio. 
// Clips are predefined, and can only be changed from the [clips] Associative array.
export const playAudio = ({clip, volume}) => {
    const audio = new Audio(clips[clip] || clips.default);
    audio.volume = volume || 0.25;
    audio.play();
}


// Still exporting sound effects, because generally, after changes we don't remove code. 
// Old habits die hard. :(
export default SoundEffect;
