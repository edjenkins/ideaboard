export const instance = () => {
  const url = window.location.origin
  const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)
  const domain = matches[1]
  const subdomain = domain.split('.')[0]
  const instance = (!subdomain) ? 'localhost' : subdomain

  return instance
}
