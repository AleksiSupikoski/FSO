const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return <div className="notify">{message}</div>
  }

  const Errormessage = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return <div className="error">{message}</div>
  }
  
  
  export { Notification, Errormessage };