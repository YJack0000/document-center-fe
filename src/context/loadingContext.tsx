import { createContext } from "react"

const LoadingContext = createContext([false, () => {}] as [
  boolean,
  (loading: boolean) => void
])

export default LoadingContext
