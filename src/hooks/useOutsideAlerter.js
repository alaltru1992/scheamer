import { useEffect } from 'react';

export default function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    
    function handleClickOutside(event) {
      if(typeof(ref) === 'object'){
         ref.filter(elm => elm.current).every(elm => elm.current && !elm.current.contains(event.target)) && callback(event);
      }
      else if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);
}
