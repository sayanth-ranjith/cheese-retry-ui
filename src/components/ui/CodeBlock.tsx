import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { ThemeMode } from '../../types/theme';
import './CodeBlock.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  theme: ThemeMode;
  compact?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'java',
  theme,
  compact = false,
}) => {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className={`code-block ${compact ? 'code-block--compact' : ''}`}>
      <button
        className="code-block__copy"
        onClick={() => copy(code)}
        aria-label={copied ? 'Copied' : 'Copy code'}
        title={copied ? 'Copied!' : 'Copy'}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        <span>{copied ? 'Copied!' : 'Copy'}</span>
      </button>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? vscDarkPlus : vs}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 10px 10px',
          fontSize: compact ? '0.78rem' : '0.85rem',
          background: 'transparent',
          padding: compact ? '1rem 1.25rem' : '1.5rem',
        }}
        showLineNumbers={!compact}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
