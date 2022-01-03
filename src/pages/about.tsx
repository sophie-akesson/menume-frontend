import Layout from '@components/Layout';
import Box from '@components/Box';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const About: NextPage = () => {
  const router = useRouter();

  return (
    <Layout isLoggedIn={false}>
      <>
        <h1>Om</h1>
        <Box>
          <h2>Vad är MenuMe?</h2>
          <p>
            MenuMe skapades för att hjälpa dig planera dina middagar för veckan,
            med dina recept som du tycker om. Menyn sätts åt dig och du slipper
            tänka på vad du ska äta. Du kommer få tillgång till en aggregerad
            inköptslista som du kan använda medan du handlar, eller en
            inköpslista för dagen om du handlar dag för dag.
          </p>
          <h2>Hur funkar det?</h2>
          <p>
            Du fyller i dina favoritrecept och vi skapar en meny för veckan
            baserat på de recept du har fyllt i. Du behöver minst 14 recept för
            att kunna nyttja menyfunktionaliten, detta för att undvika att du
            äter samma maträtt varje vecka. När du har din meny har du också
            åtkomst till inköpslistor. Varorna är sorterade per kategori för att
            undvika onödigt spring i affären. Du kan välja att se hela
            inköpslistan med en gång eller se listan för ett specifikt recept.
          </p>
          <div>
            <Button type='button' onClick={() => router.push('/register')}>
              Registrera dig här
            </Button>
          </div>
        </Box>
      </>
    </Layout>
  );
};

export default About;
