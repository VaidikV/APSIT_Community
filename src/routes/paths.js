// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/home'),
    news: path(ROOTS_DASHBOARD, '/news'),
    achievement: path(ROOTS_DASHBOARD, '/achievement'),
  },

  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account'),
  },

  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post'),
    trendingPosts: path(ROOTS_DASHBOARD, '/blog/post/trending-posts'),
    bookmarkedPost: path(ROOTS_DASHBOARD, '/blog/post/bookmarked-post/:user'),
  },
  news: {
    root: path(ROOTS_DASHBOARD, '/news'),
    allNews: path(ROOTS_DASHBOARD, '/news/allNews'),
    postById: path(ROOTS_DASHBOARD, '/news/post/:title'),
    newPost: path(ROOTS_DASHBOARD, '/news/new-post'),
    trendingPosts: path(ROOTS_DASHBOARD, '/news/post/trending-posts'),
    bookmarkedPost: path(ROOTS_DASHBOARD, '/news/post/bookmarked-post/:user'),
  },
};
