import React from 'react'

function aboutLayout({children}) {
  return (
    <div>
        <h1 className='text-2xl text-blue-500  text-center'>about layout</h1>
        {children}
    </div>
  )
}

export default aboutLayout