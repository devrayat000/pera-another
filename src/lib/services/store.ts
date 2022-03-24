import { darkTheme, theme } from '$lib/styles/theme'
import { Theme } from '@mui/material'
import { useLayoutEffect } from 'react'
import create, { UseBoundStore } from 'zustand'
import createContext from 'zustand/context'
import { devtools, persist } from 'zustand/middleware'

export interface InitialState {
  drawer: {
    state: boolean
  }
  theme: {
    state: 'dark' | 'light'
  }
}

export interface StoreModel extends InitialState {
  drawer: {
    state: boolean
    toggle(): void
    setState(newState: boolean): void
  }
  theme: {
    state: 'dark' | 'light'
    toggle(): void
  }
}

let store: UseBoundStore<StoreModel> | undefined

const initialState: InitialState = {
  drawer: { state: false },
  theme: { state: 'light' },
}

const zustandContext = createContext<StoreModel>()

export const Provider = zustandContext.Provider
export const useStore = zustandContext.useStore

export const initializeStore = (
  preloadedState: InitialState = initialState
) => {
  return create<StoreModel>(
    devtools(
      (set, get) => ({
        drawer: {
          ...preloadedState?.drawer,
          toggle() {
            set(prev => ({
              ...prev,
              drawer: {
                ...prev.drawer,
                state: !prev.drawer.state,
              },
            }))
          },
          setState(newState) {
            set(prev => ({
              ...prev,
              drawer: {
                ...prev.drawer,
                state: newState,
              },
            }))
          },
        },
        theme: {
          ...preloadedState?.theme,
          toggle() {
            set(prev => ({
              ...prev,
              theme: {
                ...prev.theme,
                state: prev.theme.state === 'light' ? 'dark' : 'light',
              },
            }))
          },
        },
      }),
      { name: 'pera-store' }
    )
  )
}

export function useCreateStore(initialState?: InitialState) {
  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState)
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(initialState)
  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        drawer: {
          ...initialState.drawer,
          ...store.getState().drawer,
        },
        theme: {
          ...initialState.theme,
          ...store.getState().theme,
        },
      })
    }
  }, [initialState])

  return () => store!
}
