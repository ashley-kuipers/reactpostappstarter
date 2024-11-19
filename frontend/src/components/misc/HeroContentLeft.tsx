import React from 'react'; // Add this import
import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from './HeroContentLeft.module.css';

export function HeroContentLeft () {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>Share your photos with the community</Title>
        <Text className={classes.description} size="xl" mt="xl">
          Welcome to SnapVerse, the ultimate community for photographers to share their stunning captures and the stories behind them. Discover, inspire, and connect through the lens of creativity.
        </Text>

        <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
          Sign Up
        </Button>
      </Container>
    </div>
  );
}
