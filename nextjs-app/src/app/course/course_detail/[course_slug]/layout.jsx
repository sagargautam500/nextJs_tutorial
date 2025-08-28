import React from 'react'

function courseDetailLayout({ children }) {
  return (
    <div>
      <p className='text-2xl font-bold text-center '>Course details will be displayed here.</p>
      {children}
    </div>
  )
}

export default courseDetailLayout