import React from 'react'

const page = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-4 my-12">
      <h1 className="text-3xl font-semibold my-4">Update Password</h1>
      <div>
        <p className="mb-2">Old Password</p>
        <input type="password" className="w-[350px] rounded-full" />
      </div>
      <div>
        <p className="mb-2">New Password</p>
        <input type="password" className="w-[350px] rounded-full" />
      </div>
      <div>
        <p className="mb-2">Confirm New Password</p>
        <input type="password" className="w-[350px] rounded-full" />
      </div>
      <button className="bg-[#9a94ff] w-24 h-8 mb-12 rounded-full hover:bg-[#7975c0] mt-4">
        Update
      </button>
    </div>
  )
}

export default page
