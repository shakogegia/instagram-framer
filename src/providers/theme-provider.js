'use client'

import * as NextThemes from 'next-themes'

export function ThemeProvider({ children }) {
  return <NextThemes.ThemeProvider>{children}</NextThemes.ThemeProvider>
}
