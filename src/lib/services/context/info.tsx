import { createContext, useContext } from 'react'

const InfoContext = createContext<{
  name: string
  roll: RegExp
  rollPlaceholder: string
}>({
  name: 'ME 2020',
  roll: /^2010(\d{3})$/,
  rollPlaceholder: '2010***',
})

export const useInfo = () => useContext(InfoContext)

const InfoProvider: React.FC = ({ children }) => {
  return (
    <InfoContext.Provider
      value={{
        name: process.env.NEXT_PUBLIC_DEPT_NAME ?? 'ME 2020',
        roll: process.env.NEXT_PUBLIC_ROLL_REGEXP
          ? new RegExp(process.env.NEXT_PUBLIC_ROLL_REGEXP)
          : /^2010(\d{3})$/,
        rollPlaceholder: process.env.NEXT_PUBLIC_ROLL_PLACEHOLDER ?? '2010***',
      }}
    >
      {children}
    </InfoContext.Provider>
  )
}

export default InfoProvider
