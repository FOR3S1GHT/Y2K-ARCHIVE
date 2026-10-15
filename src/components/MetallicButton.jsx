import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const SIZES = {
  sm: 'h-9 px-3.5 text-[10px] tracking-[0.22em] gap-2',
  md: 'h-11 px-5 text-[11px] tracking-[0.24em] gap-2.5',
  lg: 'h-14 px-7 text-xs tracking-[0.26em] gap-3',
}

const TONES = {
  chrome:
    'border-chrome/45 bg-gradient-to-b from-[#3a3d47] via-[#20222a] to-[#141519] text-metallic hover:border-cyber/70 hover:from-[#454958] hover:via-[#262932] hover:to-[#171922]',
  cyan: 'border-cyber/60 bg-gradient-to-b from-cyber/25 via-cyber/10 to-transparent text-cyber hover:border-cyber hover:from-cyber/40',
  pink: 'border-hotpink/60 bg-gradient-to-b from-hotpink/25 via-hotpink/10 to-transparent text-hotpink hover:border-hotpink hover:from-hotpink/40',
  electric:
    'border-electric/70 bg-gradient-to-b from-electric via-electric/80 to-[#1a3ac4] text-metallic hover:border-cyber hover:from-[#3f68ff]',
  ghost: 'border-chrome/20 bg-transparent text-chrome hover:border-chrome/60 hover:text-metallic',
}

/**
 * Squared metallic control modelled on late-90s interface hardware.
 * Renders as a router Link, an anchor, or a button depending on props.
 */
export default function MetallicButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  tone = 'chrome',
  size = 'md',
  icon = true,
  Icon,
  className = '',
  disabled = false,
  ...rest
}) {
  const Tag = to ? Link : href ? 'a' : 'button'
  const extra = to ? { to } : href ? { href, target: '_blank', rel: 'noreferrer noopener' } : { type }

  const classes = [
    'group relative inline-flex select-none items-center justify-center overflow-hidden',
    'border font-mono uppercase transition-[transform,box-shadow,border-color,background-color] duration-300',
    'shadow-[0_1px_0_0_rgba(255,255,255,0.14)_inset,0_10px_26px_-14px_rgba(0,0,0,0.9)]',
    'hover:-translate-y-px active:translate-y-0 active:shadow-[0_1px_3px_0_rgba(0,0,0,0.7)_inset]',
    'disabled:pointer-events-none disabled:opacity-40',
    SIZES[size] || SIZES.md,
    TONES[tone] || TONES.chrome,
    className,
  ].join(' ')

  return (
    <Tag className={classes} onClick={onClick} disabled={Tag === 'button' ? disabled : undefined} {...extra} {...rest}>
      {/* reflective sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-8 -left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:animate-[marquee_0.9s_ease-out] group-hover:opacity-100"
      />
      <span className="relative z-10 whitespace-nowrap font-semibold">{children}</span>
      {Icon ? (
        <Icon className="relative z-10 size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      ) : icon ? (
        <ArrowRight className="relative z-10 size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </Tag>
  )
}
