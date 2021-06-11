import React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
/* Use `…/dist/cjs/…` if you’re not in ESM! */

// list of themes for syntax highlighting
// https://github.com/react-syntax-highlighter/react-syntax-highlighter/tree/master/src/styles/prism
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
// import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
// import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
// import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
// import { materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const CodeBlock = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')

    return !inline && match ? (
      <SyntaxHighlighter
        style={tomorrow}
        language={match[1]}
        children={String(children).replace(/\n$/, '')}
        showLineNumbers={true}
        wrapLines={true}
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    )
  },
}

export default CodeBlock
