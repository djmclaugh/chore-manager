import { arraySanitizer, identity } from '../util';

import {Chore, sanitizeChore, sanitizePartialChore } from '../entities/chore';

import { Endpoint, Verb, simpleEndpoint } from './endpoints';

// Path for the resource collection
export const COLLECTION_PATH = '/chores'
// Path for one of the resource singletons
export const SINGLETON_PATH = COLLECTION_PATH + '/:choreId'

// Parameters to specify which singleton to access
export interface SingletonParams {
  choreId: string;
}

/**
 * Returns a list of all chores.
 * Currently, no filter parameters are supported.
 */
const listChores: Endpoint<undefined, undefined, Chore[]> = {
  path: COLLECTION_PATH,
  verb: Verb.GET,
  sanitizeRequest: identity,
  sanitizeResponse: arraySanitizer(sanitizeChore),
}

/**
 * Creates and returns a new chore with default values.
 */
const createChore: Endpoint<undefined, undefined, Chore> = {
  path: COLLECTION_PATH,
  verb: Verb.POST,
  sanitizeRequest: identity,
  sanitizeResponse: sanitizeChore,
}

/**
 * Returns the chore with the specified id.
 *
 * Possible errors:
 * 404 - if no chore with the specified id exist.
 */
const getChore: Endpoint<SingletonParams, undefined, Chore> = {
  path: SINGLETON_PATH,
  verb: Verb.GET,
  sanitizeRequest: identity,
  sanitizeResponse: sanitizeChore,
}

/**
 * Updates and returns the chore with the specified id using the data in the request body.
 * Only updates fields that have been set. Fields that are left undefined will not be updated.
 *
 * Possible errors:
 * 404 - if no chore with the specified id exist.
 */
const updateChore: Endpoint<SingletonParams, Partial<Chore>, Chore> = {
  path: SINGLETON_PATH,
  verb: Verb.PUT,
  sanitizeRequest: sanitizePartialChore,
  sanitizeResponse: sanitizeChore,
}

/**
 * Removes the specified chore from the database and returns with satus 204 on success.
 *
 * Possible errors:
 * 404 - if no chore with the specified id exist.
 */
const deleteChore: Endpoint<SingletonParams, undefined, undefined> = {
  path: SINGLETON_PATH,
  verb: Verb.DELETE,
  sanitizeRequest: identity,
  sanitizeResponse: identity,
}

// Collection of all endpoints related to chores.
export const choreEndpoints = {
  list: listChores,
  create: createChore,
  get: getChore,
  update: updateChore,
  delete: deleteChore,
  methodNotAllowed: [
    simpleEndpoint(COLLECTION_PATH, Verb.PUT),
    simpleEndpoint(COLLECTION_PATH, Verb.DELETE),
    simpleEndpoint(SINGLETON_PATH, Verb.POST),
  ],
};
