import { useEffect, useState } from "react";
import "./App.css";
import Admin from "./Admin";

function App() {
    const [profile, setProfile] = useState(null);
    const [career, setCareer] = useState([]);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [education, setEducation] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [hobbies, setHobbies] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    if (window.location.pathname === "/admin") {
        return <Admin />;
    }


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
                fetch("/api/projects"),
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
                projectsData,
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
            setProjects(projectsData || []);
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
            <div className="loading-page">
                <div className="loading-spinner" />
                <p>Loading personal website...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-page">
                <div className="error-card">
                    <div className="error-icon">!</div>
                    <h2>Something went wrong</h2>
                    <p>{error}</p>
                    <button onClick={loadData}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="app">

            {/* Header */}
            <header className="header">
                <div className="container header-content">

                    <a className="logo" href="#about">
                        {profile?.name || "Personal Website"}
                    </a>

                    <nav className="navigation">
                        <a href="#about">About</a>
                        <a href="#career">Career</a>
                        <a href="#skills">Skills</a>
                        <a href="#projects">Projects</a>
                        <a href="#resume">Resume</a>
                        <a href="#education">Education</a>
                        <a href="#achievements">Achievements</a>
                        <a href="#certifications">Certifications</a>
                        <a href="#hobbies">Hobbies</a>
                    </nav>

                </div>
            </header>

            <main>

                {/* Hero */}
                <section className="hero" id="about">
                    <div className="container hero-content">

                        <div className="hero-text">

                            <p className="eyebrow">WELCOME</p>

                            <h1>
                                {profile?.name || "Your Name"}
                            </h1>

                            <h2>
                                {profile?.headline || "Technology Professional"}
                            </h2>

                            <p className="hero-bio">
                                {profile?.bio ||
                                    "Welcome to my personal website."}
                            </p>

                            <div className="profile-meta">

                                {profile?.location && (
                                    <span>
                                        <span className="meta-icon">●</span>
                                        {profile.location}
                                    </span>
                                )}

                                {profile?.email && (
                                    <span>
                                        <span className="meta-icon">✉</span>
                                        {profile.email}
                                    </span>
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

                        </div>

                    </div>
                </section>

                {/* Career */}
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

                                        <div className="timeline-marker" />

                                        <div className="content-card">

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

                                            <p className="date-text">
                                                {formatDate(item.startDate)}
                                                {" — "}
                                                {item.current
                                                    ? "Present"
                                                    : formatDate(item.endDate)}
                                            </p>

                                            {item.location && (
                                                <p className="muted">
                                                    {item.location}
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

                {/* Skills */}
                <section className="section section-light" id="skills">
                    <div className="container">

                        <SectionHeader
                            eyebrow="EXPERTISE"
                            title="Skills"
                            description="Technologies and capabilities used across projects."
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
                                        <div className="skill-icon">
                                            {getInitials(skill.name)}
                                        </div>

                                        <div>
                                            <h3>{skill.name}</h3>

                                            {skill.category && (
                                                <p>{skill.category}</p>
                                            )}

                                            {skill.proficiency && (
                                                <span className="skill-level">
                                                    {skill.proficiency}
                                                </span>
                                            )}
                                        </div>
                                    </article>
                                ))}

                            </div>
                        )}

                    </div>
                </section>

                {/* Projects */}
                <section className="section" id="projects">
                    <div className="container">

                        <SectionHeader
                            eyebrow="SELECTED WORK"
                            title="Projects"
                            description="Selected technology projects and engineering initiatives."
                        />

                        {projects.length === 0 ? (
                            <EmptyState message="No projects available." />
                        ) : (
                            <div className="projects-grid">

                                {projects
                                    .sort(
                                        (a, b) =>
                                            (a.displayOrder ?? 0) -
                                            (b.displayOrder ?? 0)
                                    )
                                    .map((project) => (
                                        <article
                                            className={`project-card ${
                                                project.featured
                                                    ? "featured-project"
                                                    : ""
                                            }`}
                                            key={project.id}
                                        >

                                            {project.imageUrl ? (
                                                <div className="project-image">
                                                    <img
                                                        src={project.imageUrl}
                                                        alt={project.title || project.name}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="project-image-placeholder">
                                                    <span>
                                                        {getInitials(
                                                            project.name
                                                        )}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="project-content">

                                                <div className="project-top">

                                                    <div>
                                                        <h3>
                                                            {project.title ||
                                                                project.name}
                                                        </h3>

                                                        {project.title &&
                                                            project.name &&
                                                            project.title !==
                                                            project.name && (
                                                                <p className="project-name">
                                                                    {
                                                                        project.name
                                                                    }
                                                                </p>
                                                            )}
                                                    </div>

                                                    {project.featured && (
                                                        <span className="featured-badge">
                                                            Featured
                                                        </span>
                                                    )}

                                                </div>

                                                {project.description && (
                                                    <p className="project-description">
                                                        {project.description}
                                                    </p>
                                                )}

                                                {project.role && (
                                                    <div className="project-role">
                                                        <span>Role</span>
                                                        <strong>
                                                            {project.role}
                                                        </strong>
                                                    </div>
                                                )}

                                                {(project.startDate ||
                                                    project.endDate) && (
                                                    <p className="project-date">
                                                        {formatDate(
                                                            project.startDate
                                                        )}
                                                        {" — "}
                                                        {project.endDate
                                                            ? formatDate(
                                                                project.endDate
                                                            )
                                                            : "Present"}
                                                    </p>
                                                )}

                                                {project.technologies && (
                                                    <div className="technology-list">

                                                        {project.technologies
                                                            .split(",")
                                                            .map(
                                                                (
                                                                    technology,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        className="technology-tag"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {technology.trim()}
                                                                    </span>
                                                                )
                                                            )}

                                                    </div>
                                                )}

                                                <div className="project-links">

                                                    {project.githubUrl && (
                                                        <a
                                                            href={
                                                                project.githubUrl
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            GitHub →
                                                        </a>
                                                    )}

                                                    {project.demoUrl && (
                                                        <a
                                                            href={
                                                                project.demoUrl
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            Live Demo →
                                                        </a>
                                                    )}

                                                </div>

                                            </div>

                                        </article>
                                    ))}

                            </div>
                        )}

                    </div>
                </section>

                <section className="resume-section" id="resume">
                    <div className="container">

                        <div className="resume-card">

                            <div className="resume-content">

                                <p className="eyebrow">PROFESSIONAL PROFILE</p>

                                <h2>Resume</h2>

                                <p>
                                    Download my resume to learn more about my professional
                                    experience, technical expertise, projects and career
                                    background.
                                </p>

                            </div>

                            <div className="resume-actions">

                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="primary-button"
                                >
                                    View Resume
                                </a>

                                <a
                                    href="/resume.pdf"
                                    download
                                    className="secondary-button"
                                >
                                    Download Resume
                                </a>

                            </div>

                        </div>

                    </div>
                </section>

                {/* Education */}
                <section className="section section-light" id="education">
                    <div className="container">

                        <SectionHeader
                            eyebrow="ACADEMIC BACKGROUND"
                            title="Education"
                            description="Academic background and qualifications."
                        />

                        {education.length === 0 ? (
                            <EmptyState message="No education information available." />
                        ) : (
                            <div className="cards-grid">

                                {education.map((item) => (
                                    <article
                                        className="content-card"
                                        key={item.id}
                                    >

                                        <h3>{item.degree}</h3>

                                        {item.fieldOfStudy && (
                                            <p className="highlight">
                                                {item.fieldOfStudy}
                                            </p>
                                        )}

                                        <h4>{item.institution}</h4>

                                        <p className="date-text">
                                            {item.startYear || ""}
                                            {item.startYear &&
                                                item.endYear &&
                                                " — "}
                                            {item.endYear || ""}
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

                {/* Achievements */}
                <section className="section" id="achievements">
                    <div className="container">

                        <SectionHeader
                            eyebrow="HIGHLIGHTS"
                            title="Achievements"
                            description="Professional milestones and accomplishments."
                        />

                        {achievements.length === 0 ? (
                            <EmptyState message="No achievements available." />
                        ) : (
                            <div className="cards-grid">

                                {achievements.map((item) => (
                                    <article
                                        className="content-card"
                                        key={item.id}
                                    >

                                        <div className="achievement-icon">
                                            ✓
                                        </div>

                                        <h3>{item.title}</h3>

                                        {item.achievementDate && (
                                            <p className="date-text">
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

                                    </article>
                                ))}

                            </div>
                        )}

                    </div>
                </section>

                {/* Certifications */}
                <section className="section section-light" id="certifications">
                    <div className="container">

                        <SectionHeader
                            eyebrow="CREDENTIALS"
                            title="Certifications"
                            description="Professional certifications and credentials."
                        />

                        {certifications.length === 0 ? (
                            <EmptyState message="No certifications available." />
                        ) : (
                            <div className="cards-grid">

                                {certifications.map((item) => (
                                    <article
                                        className="content-card"
                                        key={item.id}
                                    >

                                        <div className="certificate-icon">
                                            ◈
                                        </div>

                                        <h3>{item.name}</h3>

                                        {item.issuer && (
                                            <p className="highlight">
                                                {item.issuer}
                                            </p>
                                        )}

                                        {item.issueDate && (
                                            <p className="date-text">
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

                    </div>
                </section>

                {/* Hobbies */}
                <section className="section" id="hobbies">
                    <div className="container">

                        <SectionHeader
                            eyebrow="PERSONAL"
                            title="Hobbies"
                            description="Things I enjoy exploring outside of work."
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
                                        <h3>{item.name}</h3>

                                        {item.description && (
                                            <p>{item.description}</p>
                                        )}
                                    </article>
                                ))}

                            </div>
                        )}

                    </div>
                </section>

            </main>

            <footer className="footer">
                <div className="container">

                    <p>
                        © {new Date().getFullYear()}{" "}
                        {profile?.name || "Personal Website"}
                    </p>

                    <p>
                        Built with React, Spring Boot & PostgreSQL
                    </p>

                </div>
            </footer>

        </div>
    );
}

function SectionHeader({ eyebrow, title, description }) {
    return (
        <div className="section-header">

            <p className="eyebrow">{eyebrow}</p>

            <h2>{title}</h2>

            {description && <p>{description}</p>}

        </div>
    );
}

function EmptyState({ message }) {
    return (
        <div className="empty-state">
            <p>{message}</p>
        </div>
    );
}

function getInitials(value) {
    if (!value) {
        return "PW";
    }

    return value
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
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