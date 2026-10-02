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
            <div className="loading">
                Loading personal website...
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-page">
                <h2>Something went wrong</h2>
                <p>{error}</p>
                <button onClick={loadData}>Retry</button>
            </div>
        );
    }

    return (
        <div className="app">

            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        {profile?.name || "Personal Website"}
                    </div>

                    <nav>
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

                {/* HERO */}

                <section className="hero" id="about">
                    <div className="hero-content">

                        {profile?.profileImageUrl && (
                            <img
                                className="profile-image"
                                src={profile.profileImageUrl}
                                alt={profile.name}
                            />
                        )}

                        <div>
                            <p className="eyebrow">
                                WELCOME
                            </p>

                            <h1>
                                {profile?.name || "Your Name"}
                            </h1>

                            <h2>
                                {profile?.headline || "Technology Professional"}
                            </h2>

                            <p className="bio">
                                {profile?.bio ||
                                    "Welcome to my personal website."}
                            </p>

                            <div className="profile-meta">
                                {profile?.location && (
                                    <span>📍 {profile.location}</span>
                                )}

                                {profile?.email && (
                                    <span>✉ {profile.email}</span>
                                )}
                            </div>

                            <div className="social-links">
                                {profile?.linkedinUrl && (
                                    <a
                                        href={profile.linkedinUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                )}

                                {profile?.githubUrl && (
                                    <a
                                        href={profile.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CAREER */}

                <section className="section" id="career">
                    <div className="section-header">
                        <p className="eyebrow">EXPERIENCE</p>
                        <h2>Career</h2>
                    </div>

                    {career.length === 0 ? (
                        <EmptyState message="No career information available." />
                    ) : (
                        <div className="timeline">
                            {career.map((item) => (
                                <article
                                    className="timeline-item"
                                    key={item.id}
                                >
                                    <div className="timeline-marker" />

                                    <div className="card">
                                        <div className="card-header">
                                            <div>
                                                <h3>{item.role}</h3>
                                                <h4>{item.company}</h4>
                                            </div>

                                            {item.current && (
                                                <span className="badge">
                                                    Current
                                                </span>
                                            )}
                                        </div>

                                        <p className="muted">
                                            {formatDate(item.startDate)}
                                            {" — "}
                                            {item.current
                                                ? "Present"
                                                : formatDate(item.endDate)}
                                        </p>

                                        {item.location && (
                                            <p className="muted">
                                                📍 {item.location}
                                            </p>
                                        )}

                                        {item.description && (
                                            <p>{item.description}</p>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* SKILLS */}

                <section className="section section-alt" id="skills">
                    <div className="section-header">
                        <p className="eyebrow">EXPERTISE</p>
                        <h2>Skills</h2>
                    </div>

                    {skills.length === 0 ? (
                        <EmptyState message="No skills available." />
                    ) : (
                        <div className="skills-grid">
                            {skills.map((skill) => (
                                <article className="skill-card" key={skill.id}>
                                    <h3>{skill.name}</h3>

                                    {skill.category && (
                                        <p className="muted">
                                            {skill.category}
                                        </p>
                                    )}

                                    {skill.proficiency && (
                                        <span className="badge">
                                            {skill.proficiency}
                                        </span>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* EDUCATION */}

                <section className="section" id="education">
                    <div className="section-header">
                        <p className="eyebrow">ACADEMIC BACKGROUND</p>
                        <h2>Education</h2>
                    </div>

                    {education.length === 0 ? (
                        <EmptyState message="No education information available." />
                    ) : (
                        <div className="cards-grid">
                            {education.map((item) => (
                                <article className="card" key={item.id}>
                                    <h3>{item.degree}</h3>

                                    {item.fieldOfStudy && (
                                        <p className="highlight">
                                            {item.fieldOfStudy}
                                        </p>
                                    )}

                                    <h4>{item.institution}</h4>

                                    <p className="muted">
                                        {item.startYear || ""}
                                        {item.startYear && item.endYear
                                            ? " — "
                                            : ""}
                                        {item.endYear || ""}
                                    </p>

                                    {item.description && (
                                        <p>{item.description}</p>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* ACHIEVEMENTS */}

                <section
                    className="section section-alt"
                    id="achievements"
                >
                    <div className="section-header">
                        <p className="eyebrow">HIGHLIGHTS</p>
                        <h2>Achievements</h2>
                    </div>

                    {achievements.length === 0 ? (
                        <EmptyState message="No achievements available." />
                    ) : (
                        <div className="cards-grid">
                            {achievements.map((item) => (
                                <article
                                    className="card"
                                    key={item.id}
                                >
                                    <h3>{item.title}</h3>

                                    {item.achievementDate && (
                                        <p className="muted">
                                            {formatDate(
                                                item.achievementDate
                                            )}
                                        </p>
                                    )}

                                    {item.description && (
                                        <p>{item.description}</p>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* CERTIFICATIONS */}

                <section className="section" id="certifications">
                    <div className="section-header">
                        <p className="eyebrow">CREDENTIALS</p>
                        <h2>Certifications</h2>
                    </div>

                    {certifications.length === 0 ? (
                        <EmptyState message="No certifications available." />
                    ) : (
                        <div className="cards-grid">
                            {certifications.map((item) => (
                                <article
                                    className="card"
                                    key={item.id}
                                >
                                    <h3>{item.name}</h3>

                                    {item.issuer && (
                                        <p className="highlight">
                                            {item.issuer}
                                        </p>
                                    )}

                                    {item.issueDate && (
                                        <p className="muted">
                                            Issued{" "}
                                            {formatDate(item.issueDate)}
                                        </p>
                                    )}

                                    {item.credentialUrl && (
                                        <a
                                            href={item.credentialUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="card-link"
                                        >
                                            View Credential →
                                        </a>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* HOBBIES */}

                <section
                    className="section section-alt"
                    id="hobbies"
                >
                    <div className="section-header">
                        <p className="eyebrow">PERSONAL</p>
                        <h2>Hobbies</h2>
                    </div>

                    {hobbies.length === 0 ? (
                        <EmptyState message="No hobbies available." />
                    ) : (
                        <div className="hobbies-grid">
                            {hobbies.map((item) => (
                                <article
                                    className="hobby-card"
                                    key={item.id}
                                >
                                    <h3>{item.name}</h3>

                                    {item.description && (
                                        <p>{item.description}</p>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

            </main>

            <footer>
                <p>
                    © {new Date().getFullYear()}{" "}
                    {profile?.name || "Personal Website"}
                </p>
            </footer>

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