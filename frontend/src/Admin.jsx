import { useEffect, useState } from "react";
import "./Admin.css";

const API_BASE = "/api";

const modules = {
    profile: {
        label: "Profile",
        endpoint: "/profile",
        fields: [
            ["name", "Name", "text"],
            ["headline", "Headline", "text"],
            ["bio", "Bio", "textarea"],
            ["location", "Location", "text"],
            ["email", "Email", "email"],
            ["linkedinUrl", "LinkedIn URL", "url"],
            ["githubUrl", "GitHub URL", "url"],
            ["websiteUrl", "Website URL", "url"],
            ["profileImageUrl", "Profile Image URL", "url"]
        ]
    },

    career: {
        label: "Career",
        endpoint: "/career",
        fields: [
            ["company", "Company", "text"],
            ["role", "Role", "text"],
            ["location", "Location", "text"],
            ["startDate", "Start Date", "date"],
            ["endDate", "End Date", "date"],
            ["current", "Current Position", "checkbox"],
            ["description", "Description", "textarea"]
        ]
    },

    skills: {
        label: "Skills",
        endpoint: "/skills",
        fields: [
            ["name", "Name", "text"],
            ["category", "Category", "text"],
            ["proficiency", "Proficiency", "text"]
        ]
    },

    education: {
        label: "Education",
        endpoint: "/education",
        fields: [
            ["institution", "Institution", "text"],
            ["degree", "Degree", "text"],
            ["fieldOfStudy", "Field of Study", "text"],
            ["startYear", "Start Year", "number"],
            ["endYear", "End Year", "number"],
            ["description", "Description", "textarea"]
        ]
    },

    achievements: {
        label: "Achievements",
        endpoint: "/achievements",
        fields: [
            ["title", "Title", "text"],
            ["description", "Description", "textarea"],
            ["achievementDate", "Date", "date"]
        ]
    },

    certifications: {
        label: "Certifications",
        endpoint: "/certifications",
        fields: [
            ["name", "Name", "text"],
            ["issuer", "Issuer", "text"],
            ["issueDate", "Issue Date", "date"],
            ["credentialUrl", "Credential URL", "url"]
        ]
    },

    hobbies: {
        label: "Hobbies",
        endpoint: "/hobbies",
        fields: [
            ["name", "Name", "text"],
            ["description", "Description", "textarea"]
        ]
    },

    projects: {
        label: "Projects",
        endpoint: "/projects",
        fields: [
            ["name", "Name", "text"],
            ["title", "Title", "text"],
            ["description", "Description", "textarea"],
            ["technologies", "Technologies", "textarea"],
            ["role", "Role", "text"],
            ["startDate", "Start Date", "date"],
            ["endDate", "End Date", "date"],
            ["githubUrl", "GitHub URL", "url"],
            ["demoUrl", "Demo URL", "url"],
            ["imageUrl", "Image URL", "url"],
            ["featured", "Featured", "checkbox"],
            ["displayOrder", "Display Order", "number"]
        ]
    }
};

function emptyForm(config) {
    const result = {};

    config.fields.forEach(([name, , type]) => {
        result[name] = type === "checkbox" ? false : "";
    });

    return result;
}

/*
 * Common API helper.
 *
 * Every request from the Admin UI automatically gets:
 *
 * Authorization: Bearer <JWT>
 */
async function apiRequest(url, options = {}) {

    const token = localStorage.getItem("jwtToken");

    const headers = {
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    /*
     * Phase 5.6 Gateway will return 401 when
     * the JWT is invalid or expired.
     */
    if (response.status === 401) {

        localStorage.removeItem("jwtToken");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        window.location.reload();

        throw new Error("Session expired. Please login again.");
    }

    return response;
}

function Admin() {

    /*
     * Authentication state
     */
    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(localStorage.getItem("jwtToken"))
    );

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    /*
     * Existing Admin state
     */
    const [activeModule, setActiveModule] = useState("profile");
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const config = modules[activeModule];

    /*
     * Login
     */
    async function handleLogin(event) {

        event.preventDefault();

        setLoginLoading(true);
        setLoginError("");

        try {

            const response = await fetch(
                `${API_BASE}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: loginUsername,
                        password: loginPassword
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Invalid username or password"
                );
            }

            /*
             * Store JWT
             */
            localStorage.setItem(
                "jwtToken",
                data.token
            );

            localStorage.setItem(
                "username",
                data.username
            );

            localStorage.setItem(
                "role",
                data.role
            );

            /*
             * Update React state
             */
            setIsAuthenticated(true);

            setLoginUsername("");
            setLoginPassword("");
            setLoginError("");

        } catch (err) {

            console.error("Login error:", err);

            setLoginError(
                err.message || "Login failed"
            );

        } finally {

            setLoginLoading(false);
        }
    }

    /*
     * Logout
     */
    function handleLogout() {

        localStorage.removeItem("jwtToken");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        setIsAuthenticated(false);

        setItems([]);
        setForm({});
        setEditingId(null);
        setMessage("");
        setError("");
    }

    /*
     * Load records whenever the selected module changes.
     */
    useEffect(() => {

        if (!isAuthenticated) {
            return;
        }

        loadItems();

    }, [activeModule, isAuthenticated]);

    async function loadItems() {

        setLoading(true);
        setError("");

        try {

            const response = await apiRequest(
                `${API_BASE}${config.endpoint}`
            );

            if (!response.ok) {
                throw new Error("Failed to load data");
            }

            const data = await response.json();

            setItems(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);
        }
    }

    function startCreate() {

        setEditingId(null);
        setForm(emptyForm(config));
        setMessage("");
        setError("");
    }

    function startEdit(item) {

        setEditingId(item.id);
        setForm({ ...item });
        setMessage("");
        setError("");
    }

    function handleChange(name, type, value) {

        setForm(previous => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? value
                    : type === "number"
                        ? value === ""
                            ? ""
                            : Number(value)
                        : value
        }));
    }

    async function handleSubmit(event) {

        event.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {

            const url = editingId
                ? `${API_BASE}${config.endpoint}/${editingId}`
                : `${API_BASE}${config.endpoint}`;

            const method = editingId
                ? "PUT"
                : "POST";

            const response = await apiRequest(
                url,
                {
                    method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            if (!response.ok) {

                const text = await response.text();

                throw new Error(
                    text || "Save failed"
                );
            }

            setMessage(
                editingId
                    ? `${config.label} updated successfully.`
                    : `${config.label} created successfully.`
            );

            setEditingId(null);
            setForm(emptyForm(config));

            await loadItems();

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);
        }
    }

    async function deleteItem(id) {

        const confirmed = window.confirm(
            `Delete this ${config.label.toLowerCase()} record?`
        );

        if (!confirmed) {
            return;
        }

        setLoading(true);
        setMessage("");
        setError("");

        try {

            const response = await apiRequest(
                `${API_BASE}${config.endpoint}/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            setMessage(
                `${config.label} deleted successfully.`
            );

            if (editingId === id) {
                startCreate();
            }

            await loadItems();

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);
        }
    }

    function formatValue(value) {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "—";
        }

        if (typeof value === "boolean") {
            return value ? "Yes" : "No";
        }

        return String(value);
    }

    /*
     * ============================================================
     * LOGIN SCREEN
     * ============================================================
     */

    if (!isAuthenticated) {

        return (
            <div className="admin-page">

                <header className="admin-header">

                    <div>
                        <p className="admin-eyebrow">
                            ADMINISTRATION
                        </p>

                        <h1>Admin Login</h1>

                        <p>
                            Login to manage your personal website.
                        </p>
                    </div>

                    <a
                        href="/"
                        className="admin-back-button"
                    >
                        ← Back to Website
                    </a>

                </header>

                <div
                    style={{
                        maxWidth: "500px",
                        margin: "60px auto",
                        padding: "0 20px"
                    }}
                >

                    <div className="admin-form-card">

                        <h3>
                            Login
                        </h3>

                        <form onSubmit={handleLogin}>

                            <div className="admin-form-grid">

                                <label className="admin-field full">

                                    <span>
                                        Username
                                    </span>

                                    <input
                                        type="text"
                                        value={loginUsername}
                                        onChange={event =>
                                            setLoginUsername(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter username"
                                        autoComplete="username"
                                        required
                                    />

                                </label>

                                <label className="admin-field full">

                                    <span>
                                        Password
                                    </span>

                                    <input
                                        type="password"
                                        value={loginPassword}
                                        onChange={event =>
                                            setLoginPassword(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter password"
                                        autoComplete="current-password"
                                        required
                                    />

                                </label>

                            </div>

                            {loginError && (
                                <div className="admin-message error">
                                    {loginError}
                                </div>
                            )}

                            <div className="admin-form-actions">

                                <button
                                    type="submit"
                                    className="admin-primary-button"
                                    disabled={loginLoading}
                                >
                                    {loginLoading
                                        ? "Logging in..."
                                        : "Login"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>
        );
    }

    /*
     * ============================================================
     * EXISTING ADMIN CRUD UI
     * ============================================================
     */

    return (
        <div className="admin-page">

            <header className="admin-header">

                <div>

                    <p className="admin-eyebrow">
                        ADMINISTRATION
                    </p>

                    <h1>
                        Content Management
                    </h1>

                    <p>
                        Manage the information displayed on your
                        personal website.
                    </p>

                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    }}
                >

                    <span>
                        {localStorage.getItem("username")}
                        {" "}
                        ({localStorage.getItem("role")})
                    </span>

                    <button
                        className="admin-secondary-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                    <a
                        href="/"
                        className="admin-back-button"
                    >
                        ← Back to Website
                    </a>

                </div>

            </header>

            <div className="admin-layout">

                <aside className="admin-sidebar">

                    <h3>
                        Content
                    </h3>

                    {Object.entries(modules).map(
                        ([key, value]) => (

                            <button
                                key={key}
                                className={
                                    activeModule === key
                                        ? "admin-nav-item active"
                                        : "admin-nav-item"
                                }
                                onClick={() => {

                                    setActiveModule(key);
                                    setForm({});
                                    setEditingId(null);
                                    setMessage("");
                                    setError("");

                                }}
                            >
                                {value.label}
                            </button>

                        )
                    )}

                </aside>

                <main className="admin-content">

                    <div className="admin-content-header">

                        <div>

                            <p className="admin-eyebrow">
                                MANAGE
                            </p>

                            <h2>
                                {config.label}
                            </h2>

                        </div>

                        <button
                            className="admin-primary-button"
                            onClick={startCreate}
                        >
                            + Add {config.label}
                        </button>

                    </div>

                    {message && (
                        <div className="admin-message success">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="admin-message error">
                            {error}
                        </div>
                    )}

                    <div className="admin-form-card">

                        <h3>
                            {editingId
                                ? `Edit ${config.label}`
                                : `Add ${config.label}`}
                        </h3>

                        <form onSubmit={handleSubmit}>

                            <div className="admin-form-grid">

                                {config.fields.map(
                                    ([name, label, type]) => {

                                        if (type === "checkbox") {

                                            return (
                                                <label
                                                    key={name}
                                                    className="admin-checkbox"
                                                >

                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            Boolean(
                                                                form[name]
                                                            )
                                                        }
                                                        onChange={event =>
                                                            handleChange(
                                                                name,
                                                                type,
                                                                event.target.checked
                                                            )
                                                        }
                                                    />

                                                    <span>
                                                        {label}
                                                    </span>

                                                </label>
                                            );
                                        }

                                        return (
                                            <label
                                                key={name}
                                                className={
                                                    type === "textarea"
                                                        ? "admin-field full"
                                                        : "admin-field"
                                                }
                                            >

                                                <span>
                                                    {label}
                                                </span>

                                                {type === "textarea" ? (

                                                    <textarea
                                                        value={
                                                            form[name] ?? ""
                                                        }
                                                        onChange={event =>
                                                            handleChange(
                                                                name,
                                                                type,
                                                                event.target.value
                                                            )
                                                        }
                                                    />

                                                ) : (

                                                    <input
                                                        type={type}
                                                        value={
                                                            form[name] ?? ""
                                                        }
                                                        onChange={event =>
                                                            handleChange(
                                                                name,
                                                                type,
                                                                event.target.value
                                                            )
                                                        }
                                                    />

                                                )}

                                            </label>
                                        );
                                    }
                                )}

                            </div>

                            <div className="admin-form-actions">

                                <button
                                    type="submit"
                                    className="admin-primary-button"
                                    disabled={loading}
                                >
                                    {editingId
                                        ? "Update"
                                        : "Create"}
                                </button>

                                <button
                                    type="button"
                                    className="admin-secondary-button"
                                    onClick={startCreate}
                                >
                                    Clear
                                </button>

                            </div>

                        </form>

                    </div>

                    <div className="admin-table-card">

                        <div className="admin-table-header">

                            <h3>
                                {config.label} Records
                            </h3>

                            <span>
                                {items.length} record(s)
                            </span>

                        </div>

                        {loading && items.length === 0 ? (

                            <p className="admin-empty">
                                Loading...
                            </p>

                        ) : items.length === 0 ? (

                            <p className="admin-empty">
                                No {config.label.toLowerCase()}
                                {" "}records found.
                            </p>

                        ) : (

                            <div className="admin-table-wrapper">

                                <table className="admin-table">

                                    <thead>

                                    <tr>
                                        <th>Record</th>
                                        <th>Details</th>
                                        <th>Actions</th>
                                    </tr>

                                    </thead>

                                    <tbody>

                                    {items.map(item => {

                                        const displayField =
                                            item.name ||
                                            item.title ||
                                            item.company ||
                                            item.institution ||
                                            item.id;

                                        const detailField =
                                            item.title ||
                                            item.role ||
                                            item.description ||
                                            item.category ||
                                            "";

                                        return (
                                            <tr key={item.id}>

                                                <td>
                                                    <strong>
                                                        {formatValue(
                                                            displayField
                                                        )}
                                                    </strong>
                                                </td>

                                                <td>
                                                    {formatValue(
                                                        detailField
                                                    )}
                                                </td>

                                                <td>

                                                    <div className="admin-actions">

                                                        <button
                                                            onClick={() =>
                                                                startEdit(item)
                                                            }
                                                            className="edit-button"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                deleteItem(
                                                                    item.id
                                                                )
                                                            }
                                                            className="delete-button"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        );
                                    })}

                                    </tbody>

                                </table>

                            </div>
                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Admin;