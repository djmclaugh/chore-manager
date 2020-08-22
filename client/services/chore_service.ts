import { choreEndpoints } from '../../shared/endpoints/chore_endpoints';
import { Chore } from '../../shared/entities/chore';

import { call, simpleCall, callWithParams, callWithRequest } from './api_service';

export function listChores(): Promise<Chore[]> {
  return simpleCall(choreEndpoints.list);
}

export function createChore(): Promise<Chore> {
  return simpleCall(choreEndpoints.create);
}

export function getChore(choreId: number): Promise<Chore> {
  return callWithParams(choreEndpoints.get, {choreId: '' + choreId});
}

export function updateChore(chore: Partial<Chore>): Promise<Chore> {
  return call(choreEndpoints.update, {choreId: '' + chore.id}, chore);
}

export function deleteChore(chore: Chore): Promise<undefined> {
  return callWithParams(choreEndpoints.delete, {choreId: '' + chore.id});
}
