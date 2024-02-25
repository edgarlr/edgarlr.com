"use client"
import { ThemeProvider } from 'next-themes'
import React, { ReactNode } from 'react'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
