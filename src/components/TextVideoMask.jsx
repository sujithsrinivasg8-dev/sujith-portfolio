import React from 'react'

/**
 * TextVideoMask — recreation of the Framer marketplace "TextVideoMask"
 * Text acts as a mask over a video/gradient/image background, so the
 * background shows only inside the letters.
 */
export default function TextVideoMask({
  text = 'SUJITH',
  videoSrc,
  fallbackGradient = 'linear-gradient(135deg, #FF6B1A 0%, #7C5CFC 50%, #00FFB2 100%)',
  fontSize = '20vw',
  fontWeight = 700,
  fontFamily = "'Instrument Serif', serif",
  className = '',
}) {
  const uniqueId = React.useId().replace(/:/g, '')

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ lineHeight: 0.9 }}
    >
      <svg
        viewBox="0 0 1200 280"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <mask id={`mask-${uniqueId}`}>
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="white"
              style={{
                fontFamily,
                fontWeight,
                fontSize: '260px',
                letterSpacing: '-0.04em',
              }}
            >
              {text}
            </text>
          </mask>
        </defs>

        {/* Background that gets masked */}
        <foreignObject
          x="0"
          y="0"
          width="100%"
          height="100%"
          mask={`url(#mask-${uniqueId})`}
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {videoSrc ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                src={videoSrc}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: fallbackGradient,
                  animation: 'gradientShift 8s ease infinite',
                  backgroundSize: '200% 200%',
                }}
              />
            )}
          </div>
        </foreignObject>

        {/* Outline for legibility */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="none"
          stroke="rgba(245,241,234,0.06)"
          strokeWidth="1"
          style={{
            fontFamily,
            fontWeight,
            fontSize: '260px',
            letterSpacing: '-0.04em',
          }}
        >
          {text}
        </text>
      </svg>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
