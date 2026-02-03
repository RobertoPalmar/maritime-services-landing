"use client"

import Image from "next/image"
import { useEffect, useState, useMemo } from "react"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"
import { FadeInSection } from "@/components/fade-in-section"
import { useInView } from "@/hooks/use-in-view"

export function StatsBanner() {
    const { t } = useI18n()
    const stats = t.about.stats

    return (
        <section className="relative h-48 sm:h-45 flex items-center justify-center overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero/hero-ship-2.jpg"
                    alt="Technical operation background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/20" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeInSection direction="up">
                    <div className="grid grid-cols-2 gap-8 md:gap-16 justify-center items-center max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <TranslatedBlock key={index} className="flex flex-col items-center text-center">
                                <AnimatedCounter
                                    value={stat.value}
                                    className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-white mb-2 drop-shadow-lg tracking-tight tabular-nums"
                                />
                                <div className="text-primary-foreground/90 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] drop-shadow-md">
                                    {stat.label}
                                </div>
                            </TranslatedBlock>
                        ))}
                    </div>
                </FadeInSection>
            </div>
        </section>
    )
}


const ANIMATION_DURATION = 2000
const FRAMES_PER_SECOND = 60
const FRAME_DURATION = 1000 / FRAMES_PER_SECOND

function AnimatedCounter({ value, className }: { value: string; className?: string }) {
    // Memoize value parsing to ensure stability
    const parsed = useMemo(() => {
        const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/)
        if (!match) return null
        return {
            prefix: match[1],
            targetValue: parseFloat(match[2]),
            suffix: match[3],
            decimals: match[2].includes('.') ? match[2].split('.')[1].length : 0
        }
    }, [value])

    const [displayValue, setDisplayValue] = useState(0)

    // Use a stable reference for the ref callback or ensure the hook handles ref changes correctly. 
    // The current useInView implementation re-creates the observer if options change.
    // We pass a stable options object.
    const inViewOptions = useMemo(() => ({ threshold: 0.1, triggerOnce: true }), [])
    const { ref, isInView } = useInView(inViewOptions)

    useEffect(() => {
        if (isInView && parsed) {
            const { targetValue } = parsed
            const startTime = performance.now()
            let animationFrameId: number

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / ANIMATION_DURATION, 1)

                // Ease out quart function for smooth counting
                const ease = 1 - Math.pow(1 - progress, 4)

                setDisplayValue(targetValue * ease)

                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(animate)
                } else {
                    setDisplayValue(targetValue) // Ensure we land exactly on target
                }
            }

            animationFrameId = requestAnimationFrame(animate)

            return () => {
                if (animationFrameId) cancelAnimationFrame(animationFrameId)
            }
        }
    }, [isInView, parsed])

    if (!parsed) {
        return <div ref={ref} className={className}>{value}</div>
    }

    return (
        <div ref={ref} className={className}>
            {parsed.prefix}
            {displayValue.toFixed(parsed.decimals)}
            {parsed.suffix}
        </div>
    )
}
