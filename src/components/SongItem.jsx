import React from 'react'
import { PlayerContext } from '../context/PlayerContext.jsx'


const SongItem = ({name, image, desc, id}) => {
  const { playWithTrack } = React.useContext(PlayerContext);
  return (
    
        <div onClick={() => playWithTrack(id)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
            <img className='rounded' src={image} alt="" />
            <p className='font-bold mt-2 mb-1'>{name}</p>
            <p className='text-sm text-slate-200'>{desc}</p>
        </div>
  
  )
}

export default SongItem