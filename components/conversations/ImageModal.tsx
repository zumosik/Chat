import { FC } from "react";
import Modal from "../Modals/Modal";
import Image from "next/image";

interface ImageModalProps {
  src: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ onClose, src, isOpen }) => {
  if (!src) return null;

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="w-80 h-80">
        <Image alt="Image" src={src} className="object-cover" fill></Image>
      </div>
    </Modal>
  );
};

export default ImageModal;
