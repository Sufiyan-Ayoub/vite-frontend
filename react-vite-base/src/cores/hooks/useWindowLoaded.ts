import { useEffect, useState } from 'react'

const useWindowLoaded = () => {
  const [loaded, setLoaded] = useState(document.readyState === 'complete')

  useEffect(() => {
    if (loaded) return
    const handleLoad = () => setLoaded(true)
    window.addEventListener('load', handleLoad)
    return () => window.removeEventListener('load', handleLoad)
  }, [loaded])

  return loaded
}
export default useWindowLoaded