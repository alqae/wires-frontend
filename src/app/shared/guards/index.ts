import { LoggedInGuard, LoggedOutGuard } from './authenticated/authenticated.guard';

export const guards = [
  LoggedInGuard,
  LoggedOutGuard,
];

export * from './authenticated/authenticated.guard';
