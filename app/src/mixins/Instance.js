import * as config from '@/api/config'

export const instance = () => {
  const url = window.location.origin
  const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)
  const domain = matches && matches[1]
  const instance = (config.NODE_ENV === 'development') ? 'localhost' : domain

  return instance
}
