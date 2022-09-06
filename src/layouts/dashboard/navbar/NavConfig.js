// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  achievement: getIcon('ic_achievement'),
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
    subheader: 'Home',
    items: [
      {
        title: 'Home',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.home,
      },
      {
        title: 'News',
        path: PATH_PAGE.maintenance,
        icon: ICONS.news,
      },
      {
        title: 'Achievement',
        path: PATH_PAGE.maintenance,
        icon: ICONS.achievement,
      },
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

      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //     subheader: 'Post',
  //     items: [
  //
  //         // MANAGEMENT : BLOG
  //         {
  //             title: 'Post',
  //             path: PATH_DASHBOARD.blog.root,
  //             icon: ICONS.blog,
  //             children: [
  //                 {title: 'All posts', path: PATH_DASHBOARD.blog.posts},
  //                 {title: 'new post', path: PATH_DASHBOARD.blog.newPost},
  //                 {title: 'Trending Posts', path: PATH_PAGE.maintenance},
  //                 {title: 'search post', path:  PATH_PAGE.maintenance},
  //                 {title: 'Bookmarked', path:  PATH_PAGE.maintenance},
  //
  //             ],
  //         },
  //
  //         // MANAGEMENT : USER
  //         // {
  //         //   title: 'user',
  //         //   path: PATH_DASHBOARD.user.root,
  //         //   icon: ICONS.user,
  //         //   children: [
  //         //     { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         //     { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         //     { title: 'list', path: PATH_DASHBOARD.user.list },
  //         //     { title: 'create', path: PATH_DASHBOARD.user.newUser },
  //         //     { title: 'edit', path: PATH_DASHBOARD.user.editById },
  //         //     { title: 'account', path: PATH_DASHBOARD.user.account },
  //         //   ],
  //         // },
  //
  //         // MANAGEMENT : E-COMMERCE
  //         // {
  //         //   title: 'e-commerce',
  //         //   path: PATH_DASHBOARD.eCommerce.root,
  //         //   icon: ICONS.cart,
  //         //   children: [
  //         //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         //     { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
  //         //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         //     { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
  //         //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
  //         //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //         //     { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice },
  //         //   ],
  //         // },
  //
  //
  //     ],
  // },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: (
          <Label variant="outlined" color="error">
            +32
          </Label>
        ),
      },
      { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      // {
      //   title: 'kanban',
      //   path: PATH_DASHBOARD.kanban,
      //   icon: ICONS.kanban,
      // },
    ],
  },
];

export default navConfig;
