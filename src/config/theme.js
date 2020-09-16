import React from 'react'

export const themes = {
  light: {
    fg: '#000',
    bg: '#eee'
  },
  dark: {
    fg: '#fff',
    bg: '#222'
  }
}

export const ThemeCtx = React.createContext(themes.light)
