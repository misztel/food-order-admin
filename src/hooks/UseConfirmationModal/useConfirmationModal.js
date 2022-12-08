import { useState } from 'react';

const useConfirmationModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return [
    isShowing,
    toggle
  ]
}

export default useConfirmationModal;
