'use client'
import Navbar from '@/components/seller/Navbar'
import Sidebar from '@/components/seller/Sidebar'
import Loading from '@/components/Loading'
import NotFoundPage from '@/components/NotFoundPage'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Layout = ({ children }) => {
  const { isLoaded, user } = useUser()

  if (!isLoaded) return <Loading />
  if (!user || user.publicMetadata?.role !== 'seller') return <NotFoundPage />

  return (
    <div>
      <Navbar />
      <div className='flex w-full'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default Layout