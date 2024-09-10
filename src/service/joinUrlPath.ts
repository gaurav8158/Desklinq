function joinUrlPath(base: string, path: string) {
  const baseHasTrailingSlash = base.endsWith('/')
  const pathHasLeadingSlash = path.startsWith('/')

  if (baseHasTrailingSlash && pathHasLeadingSlash) {
    return base.slice(0, -1) + path
  } else if (!baseHasTrailingSlash && !pathHasLeadingSlash) {
    return base + '/' + path
  }

  return base + path
}

export default joinUrlPath
