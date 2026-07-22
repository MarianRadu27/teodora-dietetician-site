type LegalPlaceholderProps = {
  children: string;
};

export function LegalPlaceholder({ children }: LegalPlaceholderProps) {
  return <code className="legal-placeholder">{children}</code>;
}

type LegalValueProps = {
  value: string;
};

export function LegalValue({ value }: LegalValueProps) {
  if (value.startsWith("[")) {
    return <LegalPlaceholder>{value}</LegalPlaceholder>;
  }

  return <>{value}</>;
}
