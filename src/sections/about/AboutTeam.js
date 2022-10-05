import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Card, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { CarouselArrows } from '../../components/carousel';
import SocialsButton from '../../components/SocialsButton';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutTeam() {
  const carouselRef = useRef(null);
  const theme = useTheme();

  const settings = {
    arrows: false,
    slidesToShow: 4,
    centerMode: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  const _members = [
    {
      name: 'Abhishek Tiwari',
      role: 'Full stack developer',
      avatar: '/about/abhishek.jpeg',
    },
    {
      name: 'Sana Sheikh',
      role: 'Designer',
      avatar: '/about/sana.jpeg',
    },
    // {
    //   name: 'Vaidik Vadhawana',
    //   role: 'Backend developer',
    //   avatar: '/about/sana.jpeg',
    // },
    // {
    //   name: 'Abhay Sharma',
    //   role: 'Backend developer',
    //   avatar: '/about/sana.jpeg',
    // },
  ];

  return (
    <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
          Dream team
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Great team is the key
        </Typography>
      </m.div>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          <Slider ref={carouselRef} {...settings}>
            {_members.map((member) => (
              <Box key={Math.random() * 10000} component={m.div} variants={varFade().in} sx={{ px: 1.5, py: 10 }}>
                <MemberCard member={member} />
              </Box>
            ))}
          </Slider>
        </CarouselArrows>
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};

function MemberCard({ member }) {
  const { name, role, avatar } = member;

  return (
    <Card key={name} sx={{ p: 1 }}>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {role}
      </Typography>
      <Image alt={name} src={avatar} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      <Stack alignItems="center" sx={{ mt: 2, mb: 1 }}>
        <SocialsButton sx={{ color: 'action.active' }} />
      </Stack>
    </Card>
  );
}
