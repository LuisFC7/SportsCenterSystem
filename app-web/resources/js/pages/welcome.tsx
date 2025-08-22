import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ModalPopUp from '@/components/ModalPopUp';

export default function welcome() {
  const { flash } = usePage().props as { flash?: { message?: string } };
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


useEffect(() => {
    if (flash?.message) {
        setModalMessage(flash.message);
        setModalShow(true);
    }
}, [flash]);

  return (
    <div>
      {modalShow && (
        <ModalPopUp
          modalType="success"
          modalMessage={modalMessage}
          modalShow={modalShow}
          onClose={() => setModalShow(false)}
        />
      )}
      
    </div>
  );
}
