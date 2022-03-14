import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody maxW='900px' maxH="600px" >
          <Image src={imgUrl} />
        </ModalBody>

        <ModalFooter>
            <Link href={imgUrl} isExternal >
              Abrir original
            </Link>
        </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  )
}
