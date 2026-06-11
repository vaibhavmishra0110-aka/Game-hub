import React from 'react'

function Boxes({onBoxclick,value}) {
  return (
    <div id='box' className="rounded-md border-2 grid justify-center  text-9xl select-none" onClick={onBoxclick} >{value}</div>
  )
}

export default Boxes