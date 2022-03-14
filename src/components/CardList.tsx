import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // TODO SELECTED IMAGE URL STATE
  const [imageUrl, setImageUrl] = useState('')

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    onOpen();
    setImageUrl(url)
  }

  return (
    <>
      <SimpleGrid columns={3} spacing={40}>
        {cards.map((card) => (
          <Card 
            data={card} 
            viewImage={url => handleViewImage(card.url)} 
            key={card.id}
          />
        ))}
      </SimpleGrid>

      {isOpen && (
        <ModalViewImage 
          isOpen={isOpen} 
          onClose={onClose} 
          imgUrl={imageUrl} 
        />
      )}
    </>
  );
}
