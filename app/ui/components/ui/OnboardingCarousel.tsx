'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface OnboardingStep {
  icon?: React.ReactNode
  title: string
  description: string
  accent?: string
}

interface OnboardingCarouselProps {
  steps: OnboardingStep[]
  className?: string
}

function OnboardingCarousel({ steps, className }: OnboardingCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center' })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className={clsx('g-onboarding', className)}>
      {/* Carousel viewport */}
      <div className="g-onboarding__viewport" ref={emblaRef}>
        <div className="g-onboarding__container">
          {steps.map((step, i) => (
            <div key={i} className="g-onboarding__slide">
              <div className="g-onboarding__card">
                {step.icon && (
                  <div className="g-onboarding__icon" style={step.accent ? { color: step.accent } : undefined}>
                    {step.icon}
                  </div>
                )}
                <h3 className="g-onboarding__title">{step.title}</h3>
                <p className="g-onboarding__desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="g-onboarding__nav">
        <button
          className="g-onboarding__arrow"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous step"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div className="g-onboarding__dots">
          {steps.map((_, i) => (
            <button
              key={i}
              className={clsx('g-onboarding__dot', i === selectedIndex && 'g-onboarding__dot--active')}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="g-onboarding__arrow"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next step"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Step counter */}
      <p className="g-onboarding__counter">
        Step {selectedIndex + 1} of {steps.length}
      </p>
    </div>
  )
}

export { OnboardingCarousel }
export type { OnboardingCarouselProps, OnboardingStep }
