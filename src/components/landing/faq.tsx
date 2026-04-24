'use client';

import { useState } from 'react';
import Eyebrow from '@/components/eyebrow';
import Icon from '@/components/icon';

const FAQS = [
  {
    q: 'Is this really a one-time payment?',
    a: 'Yes. $499 once, for as long as you run the floor. No tiers, no per-seat pricing, no yearly renewal. A daycare with two dogs uses the same Kennelry as a daycare with forty.',
  },
  {
    q: 'What happens when you add new features?',
    a: 'You get them. Every feature we build goes to every license holder. We don&rsquo;t split features between "Pro" and "Business."',
  },
  {
    q: 'Do you host the data, or do I?',
    a: 'We host it. Daily backups, encrypted at rest, export any time as CSV or JSON. If you ever want to self-host, we&rsquo;ll walk you through it.',
  },
  {
    q: 'Can my staff use it on iPads at the desk?',
    a: 'Yes. Everything is responsive, works offline for the current day, and syncs when you&rsquo;re back on Wi-Fi.',
  },
  {
    q: 'What if my owners aren&rsquo;t technical?',
    a: 'They don&rsquo;t install anything. Daily recaps arrive by email if you opt in. The web portal has exactly two buttons: see photos, see the day.',
  },
  {
    q: 'Is there a trial?',
    a: 'Yes, two weeks. No card required, full feature access. If it doesn&rsquo;t fit your floor, leave.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq-section">
      <Eyebrow className="mb-4">Chapter VI &middot; the FAQ</Eyebrow>
      <h2 className="section-title !mb-12">
        The things daycare owners <span className="italic">tend to ask.</span>
      </h2>
      <div>
        {FAQS.map((f, i) => (
          <div key={f.q} className="faq-row" data-open={open === i}>
            <button
              className="faq-q"
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <span className="faq-num">0{i + 1}</span>
              <span className="faq-q-text">{f.q}</span>
              <span className="faq-toggle">
                <Icon name="plus" size={16} />
              </span>
            </button>
            <div
              className="faq-a"
              dangerouslySetInnerHTML={{ __html: f.a }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
