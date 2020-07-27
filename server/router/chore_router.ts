import { choreEndpoints, SingletonParams } from '../../shared/endpoints/chore_endpoints';
import { Chore } from '../../shared/entities/chore';

import ChoreModel from '../db/chore_model';

import {
  EndpointRouter,
  Result,
  METHOD_NOT_ALLOWED,
  NOT_FOUND,
  NO_CONTENT
} from './endpoint_router';

export const router = new EndpointRouter();

router.addEndpoint(choreEndpoints.list, async () => {
  const allChores = await ChoreModel.fetchAllChores();
  return {
    status: 200,
    response: allChores
  };
});

router.addEndpoint(choreEndpoints.create, async (params: undefined) => {
  const newChore = new ChoreModel();
  newChore.name = 'New Chore';
  await newChore.save();
  return {
    status: 200,
    response: newChore,
  };
});

router.addEndpoint(choreEndpoints.get, async (params: SingletonParams) => {
  const chore = await ChoreModel.fetchChoreById(Number.parseInt(params.choreId));
  return !chore ? NOT_FOUND : {
    status: 200,
    response: chore,
  }
});

router.addEndpoint(choreEndpoints.update, async (params: SingletonParams, req: Partial<Chore>) => {
  const chore = await ChoreModel.findOne(Number.parseInt(params.choreId));
  if (!chore) {
    return NOT_FOUND;
  }

  for (let key in req) {
    // As long as ChoreModel extends Chore and that my request has been sanitized, this is safe.
    if ((req as any)[key] !== undefined) {
      (chore as any)[key] = (req as any)[key];
    }
  }

  await chore.save();
  return {
    status: 200,
    response: chore,
  };
});

router.addEndpoint(choreEndpoints.delete, async (params: SingletonParams) => {
  const chore = await ChoreModel.findOne(Number.parseInt(params.choreId));
  if (!chore) {
    return NOT_FOUND;
  }
  await chore.remove();
  return NO_CONTENT;
});

for (let endpoint of choreEndpoints.methodNotAllowed) {
  router.addEndpoint(endpoint, async () => {
    return METHOD_NOT_ALLOWED;
  });
}
