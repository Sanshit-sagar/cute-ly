import React from 'react';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Button from './Button'; 
import Container from '@material-ui/core/Container';

const FooterLink = ({ href, children }) => {
  return (
    <Button variant="primary" color="primary" passHref style={{ marginRight: '10px', borderRadius: '5px' }}>
      <Link href={href} fontWeight='light'>
        {children}
      </Link>
    </Button>
  );
};

const Footer = () => {
  return (
    <Container style={{ backgroundColor: 'white'}}> 
      <Box display="flex" flexDirection="row" justifyContent='flex-end' bgColor="#efefef">
        <FooterLink href='/'> 
          sanshitsagar.com 
        </FooterLink>
      </Box>
    </Container>
  );
};

export default Footer;