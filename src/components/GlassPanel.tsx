import { type MouseEvent, type ReactNode, useRef } from 'react'

type Props = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
}

export function GlassPanel({ children, className = '', as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)

  const onMove = (e: MouseEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--gx', `${x}%`)
    el.style.setProperty('--gy', `${y}%`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--gx', '22%')
    el.style.setProperty('--gy', '0%')
  }

  return (
    <Tag
      ref={ref as never}
      className={`glass ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="glass__shine" aria-hidden />
      {children}
    </Tag>
  )
}
