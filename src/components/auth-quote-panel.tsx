type AuthQuotePanelProps = {
  eyebrow: string;
  children: React.ReactNode;
  cite: string;
};

export default function AuthQuotePanel({
  eyebrow,
  children,
  cite,
}: AuthQuotePanelProps) {
  return (
    <aside className="auth-right">
      <p className="auth-eyebrow-dark">{eyebrow}</p>
      <blockquote className="auth-quote">{children}</blockquote>
      <p className="auth-eyebrow-dark">{cite}</p>
    </aside>
  );
}
