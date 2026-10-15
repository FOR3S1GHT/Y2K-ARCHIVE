import { Search, X, SlidersHorizontal } from 'lucide-react'

/** Search field styled as an archive query input. */
export function SearchInput({ value, onChange, label = 'Query archive', placeholder = 'SEARCH RECORDS…', id = 'archive-search' }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="group relative flex items-center border border-chrome/30 bg-[#0c0d12] focus-within:border-cyber/70">
        <Search className="ml-3 size-4 shrink-0 text-chrome/70" aria-hidden="true" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="h-11 w-full bg-transparent px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-metallic placeholder:text-chrome/60 focus:outline-none"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="mr-2 border border-chrome/20 p-1.5 text-chrome/70 transition-colors hover:border-hotpink/60 hover:text-hotpink"
          >
            <X className="size-3" aria-hidden="true" />
          </button>
        ) : (
          <span className="mr-3 hidden font-mono text-[9px] uppercase tracking-[0.2em] text-chrome/60 sm:inline">
            SRCH
          </span>
        )}
      </div>
    </div>
  )
}

/** Category filter rail. Renders as chips with a live count per option. */
export function FilterBar({ options, value, onChange, counts = {}, label = 'Filter by category', className = '' }) {
  return (
    <div className={className}>
      <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-chrome/65">
        <SlidersHorizontal className="size-3" aria-hidden="true" />
        {label}
      </div>
      <div
        role="group"
        aria-label={label}
        className="no-scrollbar -mx-1 flex snap-x gap-1.5 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible"
      >
        {options.map((option) => {
          const isActive = option.id === value
          const count = counts[option.id]
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.id)}
              className={[
                'flex shrink-0 snap-start items-center gap-2 border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-200',
                isActive
                  ? 'border-cyber/70 bg-gradient-to-b from-cyber/25 to-transparent text-cyber'
                  : 'border-chrome/20 text-chrome/70 hover:border-chrome/50 hover:text-metallic',
              ].join(' ')}
            >
              <span className="text-[8px] text-chrome/60">{option.short || option.id.toUpperCase().slice(0, 4)}</span>
              {option.label}
              {typeof count === 'number' ? (
                <span className={isActive ? 'text-cyber/70' : 'text-chrome/60'}>
                  {String(count).padStart(2, '0')}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** Empty state shown whenever filters produce no records. */
export function EmptyState({ title = 'No records match', body, onReset, resetLabel = 'Clear filters' }) {
  return (
    <div className="flex flex-col items-center border border-dashed border-chrome/25 bg-[#0b0c11]/60 px-6 py-16 text-center">
      <span aria-hidden="true" className="flex gap-1">
        <span className="size-1.5 bg-chrome/30" />
        <span className="size-1.5 bg-chrome/20" />
        <span className="size-1.5 bg-chrome/10" />
      </span>
      <p className="mt-5 font-display text-2xl leading-tight tracking-tight text-metallic">{title}</p>
      {body ? (
        <p className="mt-3 max-w-md font-editorial text-sm italic leading-relaxed text-chrome/70">{body}</p>
      ) : null}
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 border border-chrome/35 bg-gradient-to-b from-[#2c2f37] to-[#15161b] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-metallic transition-colors hover:border-cyber/70 hover:text-cyber"
        >
          {resetLabel}
        </button>
      ) : null}
    </div>
  )
}

export default SearchInput
