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
    contact: 9876543210,
  },
  {
    label: 'FE IT',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'FE ELTC',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'FE MECH',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'FE CIVIL',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'SE COMP',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'SE IT',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'SE ELTC',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'SE MECH',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'SE CIVIL',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'TE COMP',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'TE IT',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'TE ELTC',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'TE MECH',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'TE CIVIL',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'BE COMP',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'BE IT',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'BE ELTC',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'BE MECH',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
  },
  {
    label: 'BE CIVIL',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    contact: 9876543210,
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
          lg: 'repeat(5, 1fr)',
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
    contact: PropTypes.number,
  }),
};

function CategoryCard({ category }) {
  const { label, icon, contact } = category;

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
      <Typography variant="body2">{contact}</Typography>
    </Paper>
  );
}
