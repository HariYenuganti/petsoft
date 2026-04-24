import { describe, it, expect } from 'vitest';
import {
  authSchema,
  markGivenSchema,
  medicationIdSchema,
  medicationSchema,
  petFormSchema,
  petIdSchema,
  timelineEventIdSchema,
  timelineEventSchema,
  TIMELINE_KINDS,
} from './validations';

const VALID_CUID = 'ckpj7n7ez0000qzrmh6kp3q7i';

describe('petIdSchema', () => {
  it('accepts a valid cuid', () => {
    expect(petIdSchema.safeParse(VALID_CUID).success).toBe(true);
  });

  it('rejects empty string', () => {
    expect(petIdSchema.safeParse('').success).toBe(false);
  });

  it('rejects a UUID (not cuid format)', () => {
    expect(
      petIdSchema.safeParse('550e8400-e29b-41d4-a716-446655440000').success,
    ).toBe(false);
  });

  it('rejects non-string input', () => {
    expect(petIdSchema.safeParse(42).success).toBe(false);
    expect(petIdSchema.safeParse(null).success).toBe(false);
  });
});

describe('petFormSchema', () => {
  const valid = {
    name: 'Juniper',
    ownerName: 'Marion Delacroix',
    imageUrl: 'https://example.com/juniper.jpg',
    age: 4,
    notes: 'Loves the quiet yard.',
  };

  it('accepts valid form values', () => {
    expect(petFormSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts empty imageUrl (literal "")', () => {
    expect(petFormSchema.safeParse({ ...valid, imageUrl: '' }).success).toBe(
      true,
    );
  });

  it('accepts empty notes (literal "")', () => {
    expect(petFormSchema.safeParse({ ...valid, notes: '' }).success).toBe(true);
  });

  it('rejects invalid imageUrl', () => {
    expect(
      petFormSchema.safeParse({ ...valid, imageUrl: 'not-a-url' }).success,
    ).toBe(false);
  });

  it('rejects empty name', () => {
    expect(petFormSchema.safeParse({ ...valid, name: '' }).success).toBe(false);
  });

  it('rejects name over 100 chars', () => {
    expect(
      petFormSchema.safeParse({ ...valid, name: 'a'.repeat(101) }).success,
    ).toBe(false);
  });

  it('rejects empty ownerName', () => {
    expect(petFormSchema.safeParse({ ...valid, ownerName: '' }).success).toBe(
      false,
    );
  });

  it('rejects non-positive age', () => {
    expect(petFormSchema.safeParse({ ...valid, age: 0 }).success).toBe(false);
    expect(petFormSchema.safeParse({ ...valid, age: -1 }).success).toBe(false);
  });

  it('rejects age over 100', () => {
    expect(petFormSchema.safeParse({ ...valid, age: 101 }).success).toBe(false);
  });

  it('rejects non-integer age', () => {
    expect(petFormSchema.safeParse({ ...valid, age: 2.5 }).success).toBe(false);
  });

  it('accepts notes up to 1000 chars', () => {
    expect(
      petFormSchema.safeParse({ ...valid, notes: 'a'.repeat(1000) }).success,
    ).toBe(true);
  });

  it('rejects notes over 1000 chars', () => {
    expect(
      petFormSchema.safeParse({ ...valid, notes: 'a'.repeat(1001) }).success,
    ).toBe(false);
  });

  it('trims whitespace from name before validating', () => {
    const r = petFormSchema.safeParse({ ...valid, name: '  Juniper  ' });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.name).toBe('Juniper');
  });
});

describe('authSchema', () => {
  it('accepts a valid email + password', () => {
    expect(
      authSchema.safeParse({ email: 'iris@kennelry.co', password: 'secret' })
        .success,
    ).toBe(true);
  });

  it('rejects invalid email', () => {
    expect(
      authSchema.safeParse({ email: 'not-email', password: 'secret' }).success,
    ).toBe(false);
  });

  it('rejects password shorter than 4 chars', () => {
    expect(
      authSchema.safeParse({ email: 'a@b.co', password: '123' }).success,
    ).toBe(false);
  });

  it('accepts password exactly 4 chars', () => {
    expect(
      authSchema.safeParse({ email: 'a@b.co', password: '1234' }).success,
    ).toBe(true);
  });
});

describe('timelineEventSchema', () => {
  const valid = {
    kind: 'yard' as const,
    title: 'Morning yard',
    note: 'Group A — fetch for 18 min',
    handler: 'Iris',
  };

  it('accepts a valid event', () => {
    expect(timelineEventSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts every known kind', () => {
    for (const kind of TIMELINE_KINDS) {
      expect(
        timelineEventSchema.safeParse({ ...valid, kind }).success,
      ).toBe(true);
    }
  });

  it('rejects an unknown kind', () => {
    expect(
      timelineEventSchema.safeParse({ ...valid, kind: 'party' }).success,
    ).toBe(false);
  });

  it('accepts empty note and handler', () => {
    expect(
      timelineEventSchema.safeParse({ ...valid, note: '', handler: '' })
        .success,
    ).toBe(true);
  });

  it('accepts missing optional fields', () => {
    expect(
      timelineEventSchema.safeParse({ kind: 'nap', title: 'Nap time' }).success,
    ).toBe(true);
  });

  it('rejects empty title', () => {
    expect(
      timelineEventSchema.safeParse({ ...valid, title: '' }).success,
    ).toBe(false);
  });

  it('rejects title over 100 chars', () => {
    expect(
      timelineEventSchema.safeParse({ ...valid, title: 'a'.repeat(101) })
        .success,
    ).toBe(false);
  });

  it('rejects note over 500 chars', () => {
    expect(
      timelineEventSchema.safeParse({ ...valid, note: 'a'.repeat(501) })
        .success,
    ).toBe(false);
  });
});

describe('medicationSchema', () => {
  const valid = {
    name: 'Carprofen',
    dose: '75 mg',
    scheduledAt: new Date('2026-04-24T09:00:00Z'),
  };

  it('accepts a valid medication', () => {
    expect(medicationSchema.safeParse(valid).success).toBe(true);
  });

  it('coerces ISO date strings via z.coerce.date', () => {
    expect(
      medicationSchema.safeParse({
        ...valid,
        scheduledAt: '2026-04-24T09:00:00Z',
      }).success,
    ).toBe(true);
  });

  it('rejects empty name', () => {
    expect(medicationSchema.safeParse({ ...valid, name: '' }).success).toBe(
      false,
    );
  });

  it('rejects empty dose', () => {
    expect(medicationSchema.safeParse({ ...valid, dose: '' }).success).toBe(
      false,
    );
  });

  it('rejects name over 80 chars', () => {
    expect(
      medicationSchema.safeParse({ ...valid, name: 'a'.repeat(81) }).success,
    ).toBe(false);
  });

  it('rejects dose over 40 chars', () => {
    expect(
      medicationSchema.safeParse({ ...valid, dose: 'a'.repeat(41) }).success,
    ).toBe(false);
  });

  it('rejects non-date scheduledAt', () => {
    expect(
      medicationSchema.safeParse({ ...valid, scheduledAt: 'not-a-date' })
        .success,
    ).toBe(false);
  });
});

describe('markGivenSchema', () => {
  const valid = { medicationId: VALID_CUID, handler: 'Iris' };

  it('accepts valid input', () => {
    expect(markGivenSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects an invalid medicationId', () => {
    expect(
      markGivenSchema.safeParse({ ...valid, medicationId: 'bad-id' }).success,
    ).toBe(false);
  });

  it('rejects empty handler', () => {
    expect(markGivenSchema.safeParse({ ...valid, handler: '' }).success).toBe(
      false,
    );
  });

  it('rejects handler over 60 chars', () => {
    expect(
      markGivenSchema.safeParse({ ...valid, handler: 'a'.repeat(61) }).success,
    ).toBe(false);
  });
});

describe('id schemas', () => {
  it('medicationIdSchema accepts a cuid', () => {
    expect(medicationIdSchema.safeParse(VALID_CUID).success).toBe(true);
  });

  it('medicationIdSchema rejects non-cuid', () => {
    expect(medicationIdSchema.safeParse('not-a-cuid').success).toBe(false);
  });

  it('timelineEventIdSchema accepts a cuid', () => {
    expect(timelineEventIdSchema.safeParse(VALID_CUID).success).toBe(true);
  });

  it('timelineEventIdSchema rejects non-cuid', () => {
    expect(timelineEventIdSchema.safeParse('').success).toBe(false);
  });
});
