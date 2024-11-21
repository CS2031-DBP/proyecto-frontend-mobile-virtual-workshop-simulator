import { useState } from 'react';

function useUsuarioId() {
  const getUsuarioId = () => {
    const UsuarioNumber = localStorage.getItem('UsuarioId');
    return UsuarioNumber ? JSON.parse(UsuarioNumber) : null;
  };

  const [usuarioId, setUsuarioId] = useState(getUsuarioId());

  const saveUsuarioId = (id: string) => {
    localStorage.setItem('UsuarioId', JSON.stringify(id));
    setUsuarioId(id);
  };

  return {
    setUsuarioId: saveUsuarioId,usuarioId
  };
}

export default useUsuarioId;
