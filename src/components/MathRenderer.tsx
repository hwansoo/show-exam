'use client'

import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface MathRendererProps {
  text: string
}

export default function MathRenderer({ text }: MathRendererProps) {
  // Split text by both inline ($...$) and block ($$...$$) math
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]*?\$)/g)
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          // Block math
          const math = part.slice(2, -2)
          return <BlockMath key={index} math={math} />
        } else if (part.startsWith('$') && part.endsWith('$')) {
          // Inline math
          const math = part.slice(1, -1)
          return <InlineMath key={index} math={math} />
        } else {
          // Regular text
          return <span key={index}>{part}</span>
        }
      })}
    </>
  )
}