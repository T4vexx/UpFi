import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import  Head from 'next/head';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type fetchImagesResponse = {
  data: Card[];
  after: string | null;
};

export default function Home(): JSX.Element {

  async function fetchImages(pageParam = null): Promise<fetchImagesResponse> {
    if (pageParam) {
      const { data } = await api.get(`/api/images`, {
        params: {
          after: pageParam,
        },
      });

      return data;
    }
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fetchImages
    ,
    {
    getNextPageParam : lastPage => lastPage.after ?? null, 
    }
  );

  const formattedData = useMemo(() => {
    let formattedDataTotal = [] as Card[];
    const dataPages= data?.pages;

    dataPages?.map(page => {
      formattedDataTotal = [...formattedDataTotal, ...page.data]
      return;
    })

    return formattedDataTotal;
  }, [data]);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <Head>
        <title>Upfi</title>
      </Head>

      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button
            mt="1rem"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            role="button"
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
         </Button>)}
      </Box>
    </>
  );
}
