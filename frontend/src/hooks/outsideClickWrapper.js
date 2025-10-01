export default function listenForOutsideClicks(listening, setListening, menuRef, setIsOpen) {
  if (listening) return;
  if (!menuRef.current) return;
  setListening(true);
  ['click', 'touchstart'].forEach(() => {
    document.addEventListener('click', function outsideClickListener(evt) {
      if (!menuRef.current) return document.removeEventListener('click', outsideClickListener); 
      if (menuRef.current.contains(evt.target)) return;
      setIsOpen(false);
    });
  });
