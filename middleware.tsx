export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/table', '/table/:id*'],
}
