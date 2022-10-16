import { m } from 'framer-motion';
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography, Stack } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
  },
}));

// const HeroOverlayStyle = styled(m.img)({
//   zIndex: 9,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   position: 'absolute',
// });

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '80vh',
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <MotionContainer>
      <RootStyle>
        {/*<HeroOverlayStyle alt="overlay" src="https://minimals.cc/assets/overlay.svg" variants={varFade().in} />*/}

        <HeroImgStyle alt="hero" src="/community-3d.png" variants={varFade().inUp} />

        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ color: 'common.white' }}>
                Welcome to <br />
                <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                  APSIT Community
                </Typography>
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography sx={{ color: 'common.white' }}>To continue,</Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Stack spacing={2.5} direction={'row'} alignItems={'center'}>
                <NextLink href={PATH_AUTH.login} passHref>
                  <Button
                    size="large"
                    variant="contained"
                    startIcon={<Iconify icon="material-symbols:login-rounded" width={20} height={20} />}
                  >
                    Sign In
                  </Button>
                </NextLink>
                <Typography sx={{ color: 'common.white' }}>Or</Typography>
                <NextLink href={PATH_AUTH.register} passHref>
                  <Button
                    size="large"
                    variant="outlined"
                    startIcon={<Iconify icon="ant-design:user-add-outlined" width={20} height={20} />}
                  >
                    Create a new Account
                  </Button>
                </NextLink>
              </Stack>
            </m.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </MotionContainer>
  );
}
