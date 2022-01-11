import GroceryList from '@components/GroceryList';
import Layout from '@components/Layout';
import { NextPage } from 'next';

const About: NextPage = () => {
  const menu = [
    {
      date: 'Mon, 10 Jan 2022 12:52:39 GMT',
      recipe: {
        ingredients: [
          {
            amount: '2',
            metric: 'st',
            name: 'Sprödbakad torsk',
            category: 'Fisk & skaldjur',
          },
          {
            name: 'Potatis',
            amount: '4',
            category: 'Frukt & grönsaker',
            metric: 'st',
          },
          {
            name: 'Ärtor',
            amount: '50',
            category: 'Frukt & grönsaker',
            metric: 'g',
          },
          {
            name: 'Crème fraiche',
            amount: '1',
            category: 'Mejeri & ägg',
            metric: 'dl',
          },
          {
            name: 'Majonäs',
            amount: '1',
            category: 'Kryddor & smaksättning',
            metric: 'msk',
          },
          {
            name: 'Bostongurka',
            amount: '2',
            category: 'Skafferi',
            metric: 'msk',
          },
          {
            name: 'Kapris',
            amount: '1',
            category: 'Skafferi',
            metric: 'msk',
          },
          {
            name: 'Hackad persilja',
            amount: '1.5',
            category: 'Frukt & grönsaker',
            metric: 'msk',
          },
          {
            name: 'Dragon',
            amount: '0.5',
            category: 'Kryddor & smaksättning',
            metric: 'msk',
          },
        ],
        published_at: '2022-01-05T14:37:27.418Z',
        servings: 1,
        created_at: '2022-01-05T14:37:27.428Z',
        author: {
          created_at: '2022-01-01T22:19:01.318Z',
          blocked: null,
          provider: 'local',
          role: 1,
          username: 'Sophie',
          updated_at: '2022-01-08T00:25:43.733Z',
          id: 1,
          email: 'sophie.akesson@gmail.com',
          confirmed: true,
        },
        name: 'Sophies rätt',
        updated_at: '2022-01-05T14:37:27.458Z',
        id: 13,
        description:
          'Koka upp vatten till pastan. Skär soltorkade tomater och oliver i små bitar och blanda med olivolja och balsamvinäger. Skär kycklingen i bitar och stek (eller använd quorn istället för kyckling). Koka pastan enligt anvisningarna. Riv parmesanosten. Blanda pasta med kyckling, soltorkade tomater och oliver. Häll på parmesanosten och toppa med en stor näve roccula.',
        menu: null,
      },
    },
    {
      date: 'Tue, 11 Jan 2022 12:52:39 GMT',
      recipe: {
        ingredients: [
          {
            amount: '3',
            metric: 'dl',
            name: 'Couscous',
            category: 'Skafferi',
          },
          {
            name: 'Paprika',
            amount: '1',
            category: 'Frukt & grönsaker',
            metric: 'st',
          },
          {
            name: 'Ärtor',
            amount: '1',
            category: 'Fryst',
            metric: 'dl',
          },
          {
            name: 'Broccoli, små bitar',
            amount: '10',
            category: 'Frukt & grönsaker',
            metric: 'st',
          },
          {
            name: 'Halloumi',
            amount: '1',
            category: 'Mejeri & ägg',
            metric: 'st',
          },
        ],
        published_at: '2022-01-07T12:21:27.250Z',
        servings: 4,
        created_at: '2022-01-07T12:21:27.254Z',
        author: {
          created_at: '2022-01-01T22:19:01.318Z',
          blocked: null,
          provider: 'local',
          role: 1,
          username: 'Sophie',
          updated_at: '2022-01-08T00:25:43.733Z',
          id: 1,
          email: 'sophie.akesson@gmail.com',
          confirmed: true,
        },
        name: 'Couscous med halloumi',
        updated_at: '2022-01-07T12:21:27.263Z',
        id: 22,
        description:
          'Skär grönsaker och halloumi. Koka upp vatten i vattenkokare och höll över couscousen i kastrull och lägg locket på. Stek halloumin. Blanda grönsaker och halloumin med couscous.',
        menu: null,
      },
    },
  ];

  return (
    <Layout isLoggedIn={false}>
      <GroceryList menu={menu} />
    </Layout>
  );
};

export default About;
