"use client"

import React from "react"
import { JSX } from "react" // Import JSX to fix the undeclared variable error

import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

interface TranslatedTextProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function TranslatedText({ 
  children, 
  className,
  as: Component = "span" 
}: TranslatedTextProps) {
  const { isTransitioning } = useI18n()
  
  return (
    <Component 
      className={cn(
        "lang-transition inline-block",
        isTransitioning && "transitioning",
        className
      )}
    >
      {children}
    </Component>
  )
}

interface TranslatedBlockProps {
  children: React.ReactNode
  className?: string
}

export function TranslatedBlock({ children, className }: TranslatedBlockProps) {
  const { isTransitioning } = useI18n()
  
  return (
    <div 
      className={cn(
        "lang-transition",
        isTransitioning && "transitioning",
        className
      )}
    >
      {children}
    </div>
  )
}
