import React from "react";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Props {
  contacts: Contact[];
  updateContact: (contact: Contact) => void;
  updateCallback: () => void;
}

const ContactList: React.FC<Props> = ({ contacts, updateContact, updateCallback }) => {
  const onDelete = async (id: number) => {
    try {
      const options = { method: "DELETE" };
      const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options);
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  const getAvatarColor = (name: string) => {
    const colors = [
      "avatar-amber", "avatar-teal", "avatar-rose",
      "avatar-violet", "avatar-sky", "avatar-lime"
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <p className="empty-title">No contacts yet</p>
        <p className="empty-sub">Click "New Contact" to add your first one.</p>
      </div>
    );
  }

  return (
    <div className="contact-grid">
      {contacts.map((contact, idx) => (
        <div
          className="contact-card"
          key={contact.id}
          style={{ animationDelay: `${idx * 60}ms` }}
        >
          <div className="card-top">
            <div className={`avatar ${getAvatarColor(contact.firstName)}`}>
              {getInitials(contact.firstName, contact.lastName)}
            </div>
            <div className="contact-info">
              <span className="contact-name">{contact.firstName} {contact.lastName}</span>
              <span className="contact-email">{contact.email}</span>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn-ghost" onClick={() => updateContact(contact)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>
            <button className="btn-danger" onClick={() => onDelete(contact.id)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;