import React from 'react'
import "./StaffDashBanner.scss"
import { useGetUserQuery } from 'services/user.service'
import { avartar } from 'assets/images'

const StaffDashBanner = () => {
  const {data: user} = useGetUserQuery()
  return (
    <div className='staff_banner between'>
      <img src={user?.photo_url || avartar} alt="avatar" className='staff_banner_img'/>
      <div>
        <di>Organization</di>
        <di>{user?.organization_id?.organization_name}</di>
      </div>
    </div>
  )
}

export default StaffDashBanner