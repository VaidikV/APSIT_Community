// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  achievement: getIcon('ic_achievement'),
  internship: getIcon('ic_internship'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  home: getIcon('ic_home'),
  news: getIcon('ic_news'),
  about: getIcon('ic_about'),
  help: getIcon('ic_help'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      {
        title: 'Home',
        path: PATH_DASHBOARD.home,
        icon: ICONS.home,
      },
      {
        title: 'Internships',
        path: PATH_DASHBOARD.internship,
        icon: ICONS.internship,
      },
      {
        title: 'News',
        path: PATH_DASHBOARD.news.root,
        icon: ICONS.news,
      },
      {
        title: 'Achievements',
        path: PATH_DASHBOARD.achievement,
        icon: ICONS.achievement,
      },
      { title: 'Calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      {
        title: 'About',
        path: PATH_PAGE.about,
        icon: ICONS.about,
      },
      {
        title: 'Help',
        path: PATH_PAGE.faqs,
        icon: ICONS.help,
      },
    ],
  },
];

export default navConfig;
