import React from 'react'

function Container({children}) {
  return (
    <div className='mx-auto w-[80%]'>
        {children}
    </div>
  )
}

export default Container