/**
 * Property 8: cn() Last-Wins for Conflicting Semantic Classes
 *
 * For any two conflicting semantic button class names passed to cn(),
 * the result SHALL contain the last class provided and SHALL NOT contain the first class.
 *
 * Validates: Requirements 10.4
 */

import * as fc from 'fast-check';
import { cn } from '../../lib/utils';

describe('P8 — cn() Last-Wins for Conflicting Semantic Classes', () => {
  /**
   * **Validates: Requirements 10.4**
   *
   * When two conflicting button variant classes are passed to cn(),
   * the last one wins and the first one is not present in the result.
   */
  it('retains the last class and drops the first for all conflicting button variant pairs', () => {
    const buttonVariantPairs: [string, string][] = [
      ['btn-primary', 'btn-secondary'],
      ['btn-secondary', 'btn-outline'],
      ['btn-outline', 'btn-ghost'],
      ['btn-ghost', 'btn-premium'],
      ['btn-primary', 'btn-destructive'],
    ];

    fc.assert(
      fc.property(
        fc.constantFrom(...buttonVariantPairs),
        ([first, second]) => {
          const result = cn(first, second);
          return result.includes(second) && !result.includes(first);
        }
      ),
      { numRuns: buttonVariantPairs.length }
    );
  });
});
