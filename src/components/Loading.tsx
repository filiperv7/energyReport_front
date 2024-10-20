export const Loading: React.FC<{
  withBackground?: boolean
}> = ({ withBackground }) => {
  return (
    <div
      className={`h-screen flex items-center justify-center ${
        withBackground && 'bg-gradient-to-br from-[#002C1F] to-[#00C26A]'
      }`}
    >
      <p className="text-3xl text-white font-black">Carregando...</p>
    </div>
  )
}
