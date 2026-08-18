import { useEffect, useState } from "react";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "./api/api";

import "./styles/App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getCurrentUser()
        .then((data) => {
          setUser(data);
          setPage("dashboard");
        })
        .catch(() => {
          localStorage.removeItem("token");
          setPage("login");
        });
    }
  }, []);

  const handleLogin = async (email, password) => {
    const data = await loginUser({
      Email: email,
      Password: password,
    });

    localStorage.setItem("token", data.accestoken);

    const currentUser = await getCurrentUser();

    setUser(currentUser);
    setPage("dashboard");
  };

  const handleRegister = async (username, email, password) => {
    await registerUser({
      UserName: username,
      Email: email,
      Password: password,
    });

    alert("Registration successful! Please login.");

    setPage("login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setPage("login");
  };

  if (page === "login") {
    return (
      <Login onLogin={handleLogin} onRegister={() => setPage("register")} />
    );
  }

  if (page === "register") {
    return (
      <Register onRegister={handleRegister} onLogin={() => setPage("login")} />
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

// ================= LOGIN =================

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await onLogin(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">📱</div>

        <h1>Contact Manager</h1>

        <p className="subtitle">Login to manage your contacts</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p className="switch-text">
          Don't have an account?
          <button className="link-button" onClick={onRegister}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

// ================= REGISTER =================

function Register({ onRegister, onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await onRegister(username, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">📱</div>

        <h1>Create Account</h1>

        <p className="subtitle">Register for Contact Manager</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>

        <p className="switch-text">
          Already have an account?
          <button className="link-button" onClick={onLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

// ================= DASHBOARD =================

function Dashboard({ user, onLogout }) {
  const [contacts, setContacts] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingContact, setEditingContact] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadContacts = async () => {
    try {
      setLoading(true);

      const data = await getContacts();

      setContacts(data.contacts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleSaveContact = async (contactData) => {
    try {
      if (editingContact) {
        await updateContact(editingContact._id, contactData);
      } else {
        await createContact(contactData);
      }

      setShowForm(false);
      setEditingContact(null);

      await loadContacts();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteContact(id);

      await loadContacts();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  return (
    <div className="dashboard">
      {/* NAVBAR */}

      <nav className="navbar">
        <div className="brand">📱 Contact Manager</div>

        <div className="user-area">
          <span>Welcome, {user?.UserName}</span>

          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN */}

      <main className="main-content">
        <div className="dashboard-header">
          <div>
            <h1>My Contacts</h1>

            <p>Manage all your contacts in one place</p>
          </div>

          <button
            className="add-button"
            onClick={() => {
              setEditingContact(null);
              setShowForm(true);
            }}
          >
            + Add Contact
          </button>
        </div>

        {/* FORM */}

        {showForm && (
          <ContactForm
            contact={editingContact}
            onSave={handleSaveContact}
            onCancel={() => {
              setShowForm(false);
              setEditingContact(null);
            }}
          />
        )}

        {error && <div className="error">{error}</div>}

        {/* CONTACTS */}

        {loading ? (
          <p className="loading">Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">📇</div>

            <h2>No contacts yet</h2>

            <p>Add your first contact to get started.</p>
          </div>
        ) : (
          <div className="contacts-grid">
            {contacts.map((contact) => (
              <ContactCard
                key={contact._id}
                contact={contact}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ================= CONTACT FORM =================

function ContactForm({ contact, onSave, onCancel }) {
  const [username, setUsername] = useState(contact?.UserName || "");

  const [email, setEmail] = useState(contact?.Email || "");

  const [phone, setPhone] = useState(contact?.Phone || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      UserName: username,
      Email: email,
      Phone: phone,
    });
  };

  return (
    <div className="contact-form-card">
      <h2>{contact ? "Edit Contact" : "Add New Contact"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="John"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="john@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="text"
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit" className="save-button">
            {contact ? "Update Contact" : "Add Contact"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ================= CONTACT CARD =================

function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-card">
      <div className="contact-avatar">
        {contact.UserName?.charAt(0).toUpperCase()}
      </div>

      <div className="contact-info">
        <h3>{contact.UserName}</h3>

        <p>📧 {contact.Email}</p>

        <p>📞 {contact.Phone}</p>
      </div>

      <div className="contact-actions">
        <button className="edit-button" onClick={() => onEdit(contact)}>
          Edit
        </button>

        <button className="delete-button" onClick={() => onDelete(contact._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default App;
