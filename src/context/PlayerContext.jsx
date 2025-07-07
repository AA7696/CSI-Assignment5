import React, { createContext, useEffect, useState } from 'react';
import { songsData } from '../assets/assets';
export const PlayerContext = createContext();


const PlayerProvider = (props) => {

    const audioRef = React.useRef();
    const seekBg = React.useRef();
    const seekBar = React.useRef();




    const [track,setTrack] = useState(songsData[1])
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
      currentTime: {
        seconds: 0,
        minutes: 0,
      },
      totalTime:{
        seconds: 0,
        minutes: 0,
      }
    });

    const play = () => {
      audioRef.current.play();
      setPlayStatus(true);

    }
    const pause = () => {
      audioRef.current.pause();
      setPlayStatus(false);
    }

    const playWithTrack = async (id) => {
      await setTrack(songsData[id]);
      await audioRef.current.play();
      setPlayStatus(true);
    }

    const prev = async () => {
      if( track.id > 0) {
        await setTrack(songsData[track.id - 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }

    }
    const next = async () =>{
      if( track.id < songsData.length - 1) {
        await setTrack(songsData[track.id + 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }

    const seek = (e) => {
      const seekWidth = seekBg.current.offsetWidth;
      const seekX = e.nativeEvent.offsetX;
      const seekPercentage = (seekX / seekWidth) * 100;
      seekBar.current.style.width = seekPercentage + '%';
      audioRef.current.currentTime = (seekPercentage / 100) * audioRef.current.duration;
    }

    useEffect(() =>{
      setTimeout(() => {
        audioRef.current.ontimeupdate = () =>{
          seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + '%';
          setTime({
            currentTime: {
              seconds: Math.floor(audioRef.current.currentTime % 60),
              minutes: Math.floor(audioRef.current.currentTime / 60),
            },
            totalTime:{
              seconds: Math.floor(audioRef.current.duration % 60),
              minutes: Math.floor(audioRef.current.duration / 60),
            }
          })

        }
      },1000)
    },[audioRef])


    const contextValue ={
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithTrack,
        prev,
        next,
        seek
    }

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
}
export default PlayerProvider;