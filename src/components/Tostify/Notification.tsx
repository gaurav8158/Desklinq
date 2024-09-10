import React, { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  theme?: 'dark' | 'light' | 'colored'
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left'
  hideProgressBar?: boolean
  rtl?: boolean
  limit?: number
  style?: object
  autoClose?: number
}

const Notification: FC<Props> = ({
  theme = 'colored',
  position = 'top-right',
  hideProgressBar = false,
  rtl = false,
  limit = 3,
  autoClose = 2000,
  style,
}) => {
  return (
    <div>
      <ToastContainer
        position={position}
        autoClose={autoClose}
        hideProgressBar={hideProgressBar}
        newestOnTop
        closeOnClick
        rtl={rtl}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        limit={limit}
        style={style}
      />
    </div>
  )
}

export default Notification
