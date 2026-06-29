// Mock data access point. Defined in Phase 1 (schema), consumed from Phase 2 on.
// Importing here gives feature code a single, swappable source — if this ever
// moves behind an async/mock-API layer, only this file changes.
import assets from './assets.json'
import collections from './collections.json'
import users from './users.json'
import activity from './activity.json'

export { assets, collections, users, activity }
