"use client"

import Modal from 'react-modal';
import "../SideNavbarComponent/index.css"
import { usePassword } from '../../context';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { Bounce, toast } from 'react-toastify';




const DeleteAllContactModal = ({ isOpen, onClose }) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAdmission, setIsAdmission] = useState("Wait..");

  const { contactLoad, setContactLoad } = usePassword();

  const deleteAllContacts = async () => {
    const response = await fetch('/api/contacts', {
      method: 'DELETE',
    });
  
    const data = await response.json();
    console.log('deleteAllContacts ka data --> ',data)
  
    if (data.success) {
    //   alert(data.message); // Show success message
    toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      setContactLoad(true)
    onClose()
    setIsAdding(false)
      // Optionally, refresh your contact list or update your UI
    } else {
    //   alert('Failed to delete contacts');
    toast.error('Failed to delete contacts', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }
  };


const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1001 // Set a higher z-index for overlay
  },
  content: {
    backgroundColor: "#ebe9e9",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '500px',
    width: '90%',
    height: '270px',
    zIndex: 1002,
     // Set a higher z-index for modal content
    
  }
};

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Admission Modal"
    >
       <div className="p-8 w-[450px] h-[230px] mx-auto">
       <h2 className="text-2xl mb-6 mt-[-15px] text-center text-gray-900">
  Do You Want to <span className='text-red-900'>delete</span> all of the Contacts ?
</h2>
      <div className="flex justify-center mt-[15px] mb-[-20px]">
        <button
          className={`bg-red-700 w-[25%]  justify-center items-center text-center text-white px-6 py-3 mr-4 rounded-lg transition duration-300 ${isAdding ? 'opacity-75 cursor-not-allowed' : 'hover:bg-red-900'}`}
          onClick={() => {
            setIsAdding(true);

            deleteAllContacts();
            // Add logic here
            // setTimeout(() => {
            //   setIsAdding(false);
              
            // }, 1000);
          }}
          disabled={isAdding}
        >
          {isAdding ? 'Deleting...' : "Delete"}
        </button>
        <button
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
    </ReactModal>
  );
};

export default DeleteAllContactModal;