// @flow

import basicAuth from 'basic-auth';
import type { User } from 'basic-auth';
import type { $Request, $Response, NextFunction } from 'express';

function unauthorized(res) {
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  res.sendStatus(401);
}

export function auth(authedUser: User): (req: $Request, res: $Response, next: NextFunction) => void {
  if (!authedUser || !authedUser.name || !authedUser.pass) {
    return function (req: $Request, res: $Response, next: NextFunction) {
      next();
    }
  }
  return function (req: $Request, res: $Response, next: NextFunction) {
    const user = basicAuth(req);

    if (
      !user || !user.name || !user.pass ||
      !(user.name === authedUser.name && user.pass === authedUser.pass)
    ) {
      unauthorized(res);
      return;
    }

    next();
  };
}
