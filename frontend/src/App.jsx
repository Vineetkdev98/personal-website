import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [profile, setProfile] = useState(null);
    const [career, setCareer] = useState([]);
    const [skills, setSkills] = useState([]);
    const [education, setEducation] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [hobbies, setHobbies] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            setError("");

            const responses = await Promise.all([
                fetch("/api/profile"),
                fetch("/api/career"),
                fetch("/api/skills"),
                fetch("/api/education"),
                fetch("/api/achievements"),
                fetch("/api/certifications"),
                fetch("/api/hobbies")
            ]);

            for (const response of responses) {
                if (!response.ok) {
                    throw new Error("Failed to load website data");
                }
            }

            const [
                profileData,
                careerData,
                skillsData,
                educationData,
                achievementsData,
                certificationData,
                hobbiesData
            ] = await Promise.all(
                responses.map((response) => response.json())
            );

            setProfile(profileData?.[0] || null);
            setCareer(careerData || []);
            setSkills(skillsData || []);
            setEducation(educationData || []);
            setAchievements(achievementsData || []);
            setCertifications(certificationData || []);
            setHobbies(hobbiesData || []);
        } catch (err) {
            console.error(err);
            setError("Unable to load website data.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner" />
                <p>Loading portfolio...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-page">
                <div className="error-box">
                    <span className="error-icon">!</span>
                    <h2>Something went wrong</h2>
                    <p>{error}</p>
                    <button onClick={loadData}>Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="app">

            {/* ================= HEADER ================= */}

            <header className="header">
                <div className="header-content">

                    <a href="#about" className="logo">
                        {profile?.name || "Personal Website"}
                    </a>

                    <nav className="navigation">
                        <a href="#about">About</a>
                        <a href="#career">Career</a>
                        <a href="#skills">Skills</a>
                        <a href="#education">Education</a>
                        <a href="#achievements">Achievements</a>
                        <a href="#certifications">Certifications</a>
                        <a href="#hobbies">Hobbies</a>
                    </nav>

                </div>
            </header>

            <main>

                {/* ================= HERO ================= */}

                <section className="hero" id="about">
                    <div className="container hero-container">

                        <div className="hero-layout">

                            <div className="hero-text">

                                <p className="eyebrow hero-eyebrow">
                                    TECHNOLOGY PROFESSIONAL
                                </p>

                                <h1>
                                    {profile?.name || "Your Name"}
                                </h1>

                                <h2>
                                    {profile?.headline ||
                                        "Technology Professional"}
                                </h2>

                                {profile?.bio && (
                                    <p className="hero-bio">
                                        {profile.bio}
                                    </p>
                                )}

                                <div className="hero-meta">

                                    {profile?.location && (
                                        <span>
                                            <span className="meta-icon">
                                                ●
                                            </span>
                                            {profile.location}
                                        </span>
                                    )}

                                    {profile?.email && (
                                        <a href={`mailto:${profile.email}`}>
                                            <span className="meta-icon">
                                                @
                                            </span>
                                            {profile.email}
                                        </a>
                                    )}

                                </div>

                                <div className="hero-actions">

                                    {profile?.linkedinUrl && (
                                        <a
                                            href={profile.linkedinUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="primary-button"
                                        >
                                            LinkedIn
                                            <span>↗</span>
                                        </a>
                                    )}

                                    {profile?.githubUrl && (
                                        <a
                                            href={profile.githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="secondary-button"
                                        >
                                            GitHub
                                            <span>↗</span>
                                        </a>
                                    )}

                                </div>

                            </div>

                            <div className="hero-profile">

                                {profile?.profileImageUrl ? (
                                    <img
                                        className="profile-image"
                                        src={profile.profileImageUrl}
                                        alt={profile.name}
                                    />
                                ) : (
                                    <div className="profile-placeholder">
                                        {getInitials(profile?.name)}
                                    </div>
                                )}

                                <div className="profile-decoration" />

                            </div>

                        </div>

                    </div>
                </section>

                {/* ================= CAREER ================= */}

                <section className="section" id="career">
                    <div className="container">

                        <SectionHeader
                            eyebrow="EXPERIENCE"
                            title="Career"
                            description="Professional experience and career journey."
                        />

                        {career.length === 0 ? (
                            <EmptyState message="No career information available." />
                        ) : (
                            <div className="timeline">

                                {career.map((item) => (
                                    <article
                                        className="timeline-item"
                                        key={item.id}
                                    >

                                        <div className="timeline-line" />

                                        <div className="timeline-dot" />

                                        <div className="timeline-content">

                                            <div className="career-top">

                                                <div>
                                                    <h3 className="career-role">
                                                        {item.role}
                                                    </h3>

                                                    <p className="career-company">
                                                        {item.company}
                                                    </p>
                                                </div>

                                                {item.current && (
                                                    <span className="current-badge">
                                                        Current
                                                    </span>
                                                )}

                                            </div>

                                            <div className="career-meta">

                                                <span>
                                                    {formatDate(item.startDate)}
                                                    {" — "}
                                                    {item.current
                                                        ? "Present"
                                                        : formatDate(
                                                              item.endDate
                                                          )}
                                                </span>

                                                {item.location && (
                                                    <span>
                                                        {item.location}
                                                    </span>
                                                )}

                                            </div>

                                            {item.description && (
                                                <p className="career-description">
                                                    {item.description}
                                                </p>
                                            )}

                                        </div>

                                    </article>
                                ))}

                            </div>
                        )}

                    </div>
                </section>

                {/* ================= SKILLS ================= */}

                <section
                    className="section section-light"
                    id="skills"
                >
                    <div className="container">

                        <SectionHeader
                            eyebrow="EXPERTISE"
                            title="Skills"
                            description="Technologies and areas of professional expertise."
                        />

                        {skills.length === 0 ? (
                            <EmptyState message="No skills available." />
                        ) : (
                            <div className="skills-grid">

                                {skills.map((skill) => (
                                    <article
                                        className="skill-card"
                                        key={skill.id}
                                    >

                                        <div className="skill-top">
                                            <div className="skill-icon">
                                                {getInitials(skill.name)}
                                            </div>

                                            {skill.proficiency && (
                                                <span className="skill-level">
                                                    {skill.proficiency}
                                                </span>
                                            )}
                                        </div>

                                        <h3>{skill.name}</h3>

                                        {skill.category && (
                                            <p>{skill.category}</p>
                                        )}

                                    </article>
                                ))}

                            </div>
                        )}

                    </div>
                </section>

                {/* ================= EDUCATION ================= */}

                <section className="section" id="education">
                    <div className="container">

                        <SectionHeader
                            eyebrow="ACADEMIC BACKGROUND"
                            title="Education"
                            description="Academic qualifications and educational background."
                        />

                        {education.length === 0 ? (
                            <EmptyState message="No education information available." />
                        ) : (
                            <div className="content-grid">

                                {education.map((item) => (
                                    <article
                                        className="content-card"
                                        key={item.id}
                                    >

                                        <div className="card-accent" />

                                        <p className="card-period">
                                            {item.startYear || ""}
                                            {item.startYear && item.endYear
                                                ? " — "
                                                : ""}
                                            {item.endYear || ""}
                                        </p>

                                        <h3>{item.degree}</h3>

                                        {item.fieldOfStudy && (
                                            <p className="card-highlight">
                                                {item.fieldOfStudy}
                                            </p>
                                        )}

                                        <p className="card-institution">
                                            {item.institution}
                                        </p>

                                        {item.description && (
                                            <p className="card-description">
                                                {item.description}
                                            </p>
                                        )}

                                    </article>
                                ))}

                            </div>
                        )}

                    </div>
                </section>

                {/* ================= ACHIEVEMENTS ================= */}

                <section
                    className="section section-light"
                    id="achievements"
                >
                    <div className="container">

                        <SectionHeader
                            eyebrow="HIGHLIGHTS"
                            title="Achievements"
                            description="Selected professional achievements and milestones."
                        />

                        {achievements.length === 0 ? (
                            <EmptyState message="No achievements available." />
                        ) : (
                            <div className="content-grid">

                                {achievements.map((item) => (
                                    <article
                                        className="achievement-card"
                                        key={item.id}
                                    >

                                        <div className="achievement-number">
                                            +
                                        </div>

                                        <div>
                                            <h3>{item.title}</h3>

                                            {item.achievementDate && (
                                                <p className="card-period">
                                                    {formatDate(
                                                        item.achievementDate
                                                    )}
                                                </p>
                                            )}

                                            {item.description && (
                                                <p className="card-description">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>

                                    </article>
                                ))}

                            </div>
                        )}

                    </div>
                </section>

                {/* ================= CERTIFICATIONS ================= */}

                <section
                    className="section"
                    id="certifications"
                >
                    <div className="container">

                        <SectionHeader
                            eyebrow="CREDENTIALS"
                            title="Certifications"
                            description="Professional certifications and credentials."
                        />

                        {certifications.length === 0 ? (
                            <EmptyState message="No certifications available." />
                        ) : (
                            <div className="content-grid">

                                {certifications.map((item) => (
                                    <article
                                        className="certification-card"
                                        key={item.id}
                                    >

                                        <div className="certificate-icon">
                                            ✓
                                        </div>

                                        <div className="certificate-content">

                                            <h3>{item.name}</h3>

                                            {item.issuer && (
                                                <p className="certificate-issuer">
                                                    {item.issuer}
                                                </p>
                                            )}

                                            {item.issueDate && (
                                                <p className="card-period">
                                                    Issued{" "}
                                                    {formatDate(
                                                        item.issueDate
                                                    )}
                                                </p>
                                            )}

                                            {item.credentialUrl && (
                                                <a
                                                    href={
                                                        item.credentialUrl
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="card-link"
                                                >
                                                    View Credential
                                                    <span>↗</span>
                                                </a>
                                            )}

                                        </div>

                                    </article>
                                ))}

                            </div>
                        )}

                    </div>
                </section>

                {/* ================= HOBBIES ================= */}

                <section
                    className="section section-light"
                    id="hobbies"
                >
                    <div className="container">

                        <SectionHeader
                            eyebrow="BEYOND WORK"
                            title="Hobbies & Interests"
                            description="A few interests outside of professional work."
                        />

                        {hobbies.length === 0 ? (
                            <EmptyState message="No hobbies available." />
                        ) : (
                            <div className="hobbies-grid">

                                {hobbies.map((item) => (
                                    <article
                                        className="hobby-card"
                                        key={item.id}
                                    >

                                        <div className="hobby-icon">
                                            ✦
                                        </div>

                                        <div>
                                            <h3>{item.name}</h3>

                                            {item.description && (
                                                <p>
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>

                                    </article>
                                ))}

                            </div>
                        )}

                    </div>
                </section>

            </main>

            {/* ================= FOOTER ================= */}

            <footer className="footer">
                <div className="container footer-content">

                    <div>
                        <p className="footer-name">
                            {profile?.name || "Personal Website"}
                        </p>

                        <p className="footer-copy">
                            Technology • Architecture • Engineering
                        </p>
                    </div>

                    <p className="footer-copyright">
                        © {new Date().getFullYear()}{" "}
                        {profile?.name || "Personal Website"}
                    </p>

                </div>
            </footer>

        </div>
    );
}


/* =========================================================
   COMPONENTS
   ========================================================= */

function SectionHeader({ eyebrow, title, description }) {
    return (
        <div className="section-header">
            <p className="eyebrow">{eyebrow}</p>

            <h2>{title}</h2>

            {description && (
                <p className="section-description">
                    {description}
                </p>
            )}
        </div>
    );
}


function EmptyState({ message }) {
    return (
        <div className="empty-state">
            {message}
        </div>
    );
}


/* =========================================================
   HELPERS
   ========================================================= */

function getInitials(name) {
    if (!name) {
        return "P";
    }

    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");
}


function formatDate(value) {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short"
    });
}


export default App;
