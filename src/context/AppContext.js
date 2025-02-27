  import React, { createContext, useContext, useState } from "react"

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [sosActive, setSosActive] = useState(false)

  const activateSOS = () => setSosActive(true)
  const deactivateSOS = () => setSosActive(false)

  return (
    <AppContext.Provider value={{ sosActive, activateSOS, deactivateSOS }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
