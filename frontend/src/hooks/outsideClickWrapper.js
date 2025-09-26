export default function listenForOutsideClicks(listening, setListening, menuRef, setIsOpen) {
  if (listening) return;
  if (!menuRef.current) return;
  setListening(true);
  ['click', 'touchstart'].forEach(() => {
      if (!menuRef.current) return document.removeEventListener('click', outsideClickListener); 
      if (menuRef.current.contains(evt.target)) return;
      if (evt.target.classList[0] === 'multi-select-choice') return; // don't close dropdown if user clicked on a choice in a multi-select
      setIsOpen(false);
    });
  });
