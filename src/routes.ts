/**
 *  Array of routes that accessible to All users
 * These routes do not require auth
 * @type {string[]}
 */
export const publicRoutes = [
    '/',
    '/ophpolicy',
    '/ophpolicy/OHSpolicy',
    '/ophpolicy/QApolicy',
    '/ophpolicy/EVpolicy',
    '/about-us',
    '/ourservices',
    '/contactus',
    '/requestquote',
    '/Ophpolicy',
    '/api/addinquire',
    '/api/addquote',
    '/api/newsletter',
    '/api/newsletter'
]

/**
 * An array of routes used for authentication
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    '/auth/register',
]

/**
 * The prefix for API authentication
 * @type {string}
 */

export const apiAuthPrefix = '/api/auth'


/**
 * Default login redirect
 * @type string
 */
export const DEFAULT_LOGIN_REDIRECT = '/admin/home'