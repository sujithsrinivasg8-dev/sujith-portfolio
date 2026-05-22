import { useState, Children, cloneElement } from 'react'

/**
 * Unfocused — recreation of the Framer marketplace "Unfocused"
 * On hover of any sibling, OTHER siblings blur — focusing attention
 * on the one being hovered.
 */
export default function Unfocused({ children, blurAmount = 4, className = '' }) {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const childArr = Children.toArray(children)

  return (
    <div className={className}>
      {childArr.map((child, idx) => {
        const isOther = hoveredIdx !== null && hoveredIdx !== idx
        return (
          <div
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              filter: isOther ? `blur(${blurAmount}px)` : 'blur(0)',
              opacity: isOther ? 0.5 : 1,
              transition: 'filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease',
              transform: hoveredIdx === idx ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}
