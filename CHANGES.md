# Changes

## 1.0.0 2026-11-21

First entry of this change log. Earlier versions are on npm and in the git
history.

* First functional release. The only version on npm, 0.0.2, is a stub
  without entity actions. This release ships the table-driven provider:
  load and save actions for about 20 Eventbrite v3 entities (event, venue,
  order, attendee, ticket class and others), built on the `eventbrite` SDK.
* Seneca 4: the peer dependency is `seneca` `^4.0.0` (was `>=3`).
* New peer dependencies, which the plugin always needed: `@seneca/entity`
  `^29.0.0` and `@seneca/provider` `^5.0.0`.
* The `seneca-promisify` peer dependency is removed. Seneca 4 has promises
  built in; do not call `use('promisify')` (D4).
* Node.js 24 or later (`engines.node` `>=24`).
* When `@seneca/provider` has no `eventbrite` provider, the plugin fails to
  start with `api-key-missing`. Before, the error was created but not
  thrown.
* Runtime dependencies are `eventbrite` and `lodash` only: `msw` is gone,
  and `@types/lodash` is a development dependency.
* The stale `dist/gateway.js` of the 0.0.2 stub is no longer in the
  package.
* Tests load plugins by full name (`@seneca/entity`, `@seneca/provider`) and
  never call the Eventbrite API: a local mock of the Eventbrite v3 API
  (node:http on an ephemeral port) replaces the `msw` handlers, which let
  save requests reach the live API. Live calls were not tested on
  Seneca 4.
* Known issue: the plugin makes its result entities with `make$`, in
  callback mode, so `await ent.save$()` on a loaded entity returns the
  local entity before the save completes. Pass a callback to `save$`, as
  the tests do, to get the saved entity.
* devDependencies: `seneca` `^4.0.0`, `@seneca/entity` `^29.0.0`,
  `@seneca/provider` `^5.0.0` (was `^0.2.0`), `seneca-msg-test` `^5.0.0`,
  `@seneca/doc` `^9.0.0`, `typescript` `^5.9.3` and `@types/node` `^24`.
* README: Seneca 4 install line and an example with the provider key.
* `repository.url` uses `git+https`, `publishConfig` sets public access, and
  the package includes `CHANGES.md`.
