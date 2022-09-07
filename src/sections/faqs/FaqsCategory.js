import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Typography, Box, Paper } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    label: 'FE COMP',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    href: '#',
  },
  {
    label: 'SE COMP',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_payment.svg',
    href: '#',
  },
  {
    label: 'TE COMP',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_delivery.svg',
    href: '#',
  },
  {
    label: 'BE COMP',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_package.svg',
    href: '#',
  },
];

// ----------------------------------------------------------------------

export default function FaqsCategory() {
  return (
    <Box
      component={MotionViewport}
      sx={{
        mb: 15,
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(6, 1fr)',
        },
      }}
    >
      {CATEGORIES.map((category) => (
        <m.div key={category.label} variants={varFade().in}>
          <CategoryCard category={category} />
        </m.div>
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

CategoryCard.propTypes = {
  category: PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string,
  }),
};

function CategoryCard({ category }) {
  const { label, icon } = category;

  return (
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        height: 260,
        borderRadius: 2,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
    >
      <Image alt={icon} visibleByDefault disabledEffect src={icon} sx={{ mb: 2, width: 80, height: 80 }} />
      <Typography variant="subtitle2">{label}</Typography>
    </Paper>
  );
}
