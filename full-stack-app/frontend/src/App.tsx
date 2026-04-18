import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "./App.css";
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (contact: object) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <h1 className="brand-title">Contacts</h1>
              <p className="brand-subtitle">{contacts.length} {contacts.length === 1 ? "person" : "people"} in your network</p>
            </div>
          </div>
          <button className="btn-primary" onClick={openCreateModal}>
            <span className="btn-icon">+</span>
            New Contact
          </button>
        </div>
      </header>

      <main className="app-main">
        <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-panel">
            <div className="modal-header">
              <h2 className="modal-title">
                {Object.entries(currentContact).length !== 0 ? "Edit Contact" : "New Contact"}
              </h2>
              <button className="modal-close" onClick={closeModal} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
