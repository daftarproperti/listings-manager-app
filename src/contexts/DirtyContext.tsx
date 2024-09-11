import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

interface DirtyContextType {
  isDirty: boolean
  setDirty: (dirty: boolean) => void
}

const DirtyContext = createContext<DirtyContextType>({
  isDirty: false,
  setDirty: () => {},
})

interface DirtyProviderProps {
  children: ReactNode
}

export function DirtyProvider({ children }: DirtyProviderProps) {
  const [isDirty, setDirty] = useState<boolean>(false)

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault()
        event.returnValue =
          'You have unsaved changes! Are you sure you want to leave?'
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty])

  return (
    <DirtyContext.Provider value={{ isDirty, setDirty }}>
      {children}
    </DirtyContext.Provider>
  )
}

export function useDirty() {
  return useContext(DirtyContext)
}
