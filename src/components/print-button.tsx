'use client';

import { Button } from './ui/button';
import Icon from './icon';

export default function PrintButton({
  label = 'Print run sheet',
}: {
  label?: string;
}) {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => {
        if (typeof window !== 'undefined') {
          document.body.classList.add('print-run-sheet');
          try {
            window.print();
          } finally {
            // Remove class shortly after; afterprint event also fires in most browsers.
            setTimeout(() => {
              document.body.classList.remove('print-run-sheet');
            }, 300);
          }
        }
      }}
      className="no-print"
    >
      <Icon name="check" size={14} />
      {label}
    </Button>
  );
}
