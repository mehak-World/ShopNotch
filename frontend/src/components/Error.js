import React from 'react'

const Error = ({errMsg}) => {
  return (
    <div className = "bg-red-500 p-2 text-white">
      {errMsg}
    </div>
  )
}

export default Error
