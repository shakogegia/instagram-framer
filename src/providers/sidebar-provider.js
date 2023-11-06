'use client'
import { createContext, useContext, useState } from 'react'

export const SideBarContext = createContext([])

export const useSideBar = () => useContext(SideBarContext)

export const SideBarProvider = ({ children }) => {
  const [sideBar, setSideBar] = useState(false)

  return (
    <SideBarContext.Provider value={{ sideBar, setSideBar }}>
      {children}
    </SideBarContext.Provider>
  )
}
