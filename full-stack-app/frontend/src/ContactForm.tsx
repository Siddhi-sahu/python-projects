import { useState } from "react";

interface Contact {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface Props {
  existingContact?: Contact;
  updateCallback: () => void;
}

const ContactForm: React.FC<Props> = ({ existingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName]   = useState(existingContact.lastName  || "");
  const [email, setEmail]         = useState(existingContact.email     || "");
  const [loading, setLoading]     = useState(false);

  const updating = Object.entries(existingContact).length !== 0;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = { firstName, lastName, email };
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_contact/${existingContact.id}` : "create_contact");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    setLoading(false);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input
            className="form-input"
            type="text"
            id="firstName"
            placeholder="Jane"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input
            className="form-input"
            type="text"
            id="lastName"
            placeholder="Smith"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="email">Email Address</label>
        <input
          className="form-input"
          type="email"
          id="email"
          placeholder="jane@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button className="btn-submit" type="submit" disabled={loading}>
        {loading ? (
          <span className="spinner" />
        ) : (
          updating ? "Save Changes" : "Create Contact"
        )}
      </button>
    </form>
  );
};

export default ContactForm;