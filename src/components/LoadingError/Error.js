import React from 'react'

const Message = ({ variant = 'alert-info', children }) => {
   return <div className={`alert ${variant}`}>{children}</div>
}

export default Message
