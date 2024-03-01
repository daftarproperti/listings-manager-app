import React from 'react';

interface PopUpModalProps {
  mouseX: number;
  mouseY: number;
  onRequestClose: () => void;
  tooltipContent: string;
}

const PopUpModal = ({
  mouseX,
  mouseY,
  onRequestClose,
  tooltipContent,
}: PopUpModalProps) => {
  const offset = 20;

  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: `${mouseY - offset}px`,
    left: `${mouseX + offset}px`,
    right: `10px`,
    bottom: `10px`,
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    padding: '10px',
    zIndex: 9999,
  };

  return (
    <div style={modalStyle}>
      <p>{tooltipContent}</p>
    </div>
  );
};

export default PopUpModal;