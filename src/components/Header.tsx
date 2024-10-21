import { CaretLeft } from '@phosphor-icons/react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBackClick = () => {
    if (location.pathname !== '/') {
      navigate('/')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex items-center">
      <div className="w-full flex items-center justify-between gap-5">
        <CaretLeft
          size={26}
          weight="bold"
          className="text-white mt-1 cursor-pointer"
          onClick={handleBackClick}
        />

        <h2 className="flex-1 text-2xl text-white text-center">EnergyReport</h2>
      </div>
    </div>
  )
}
