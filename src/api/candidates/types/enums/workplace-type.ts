export const WorkplaceType = Object.freeze({
  OnSite: 'on_site',
  Remote: 'remote',
  Hybrid: 'hybrid',
})

export type WorkplaceType = (typeof WorkplaceType)[keyof typeof WorkplaceType]
