import {
  sanitizeInteger,
  sanitizeNumber,
  sanitizeOptional,
  sanitizePositiveInteger,
  sanitizeString,
} from '../util';

export interface Chore {
  id: number,
  name: string,
  lastCompletedTimestamp: number,
  // daysUntil*Priority is the number of days before the task is considered being of that priority.
  // negative numbers can be used to indicate that the chore should never take that priority.
  // Low = Can be done if you have nothing better to do
  daysUntilLowPriority: number,
  // Medium = Should be done
  daysUntilMediumPriority: number,
  // High = Needs to be done as soon as possible
  daysUntilHighPriority: number,
}

export function sanitizeChore(x: any, name: string): Chore {
  if (typeof x !== 'object') {
    throw new Error(`Expected property "${name}" to be of type Object`);
  }
  return {
    id: sanitizePositiveInteger(x.id, name + '.id'),
    name: sanitizeString(x.name, name + '.name'),
    lastCompletedTimestamp: sanitizeInteger(x.lastCompletedTimestamp, name + '.lastCompletedTimestamp'),
    daysUntilLowPriority: sanitizeNumber(x.daysUntilLowPriority, name + '.daysUntilLowPriority'),
    daysUntilMediumPriority: sanitizeNumber(x.daysUntilMediumPriority, name + '.daysUntilMediumPriority'),
    daysUntilHighPriority: sanitizeNumber(x.daysUntilHighPriority, name + '.daysUntilHighPriority'),
  };
}

export function sanitizePartialChore(x: any, name: string): Partial<Chore> {
  if (typeof x !== 'object') {
    throw new Error(`Expected property "${name}" to be of type Object`);
  }
  return {
    id: sanitizeOptional(sanitizePositiveInteger, x.id, name + '.id'),
    name: sanitizeOptional(sanitizeString, x.name, name + '.name'),
    lastCompletedTimestamp: sanitizeOptional(sanitizeInteger, x.lastCompletedTimestamp, name + '.lastCompletedTimestamp'),
    daysUntilLowPriority: sanitizeOptional(sanitizeNumber, x.daysUntilLowPriority, name + '.daysUntilLowPriority'),
    daysUntilMediumPriority: sanitizeOptional(sanitizeNumber, x.daysUntilMediumPriority, name + '.daysUntilMediumPriority'),
    daysUntilHighPriority: sanitizeOptional(sanitizeNumber, x.daysUntilHighPriority, name + '.daysUntilHighPriority'),
  };
}
