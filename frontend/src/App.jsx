import { useEffect, useState } from "react";

function App() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetch("/api/profile")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Unable to load profile");
                }

                return response.json();
            })
            .then(data => {

                if (data.length > 0) {
                    setProfile(data[0]);
                }

                setLoading(false);
            })
            .catch(error => {

                console.error(error);

                setError("Unable to connect to the backend.");

                setLoading(false);
            });

    }, []);

    if (loading) {
        return (
            <div className="container">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <h2>{error}</h2>
                <p>
                    Make sure the API Gateway and Profile Service are running.
                </p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="container">
                <h2>No profile found</h2>
                <p>
                    Add your profile using the POST API.
                </p>
            </div>
        );
    }

    return (
        <div>

            <header className="header">

                <div className="header-content">

                    <h1>{profile.name}</h1>

                    <p>{profile.headline}</p>

                </div>

            </header>

            <main className="container">

                <section className="card">

                    <h2>About Me</h2>

                    <p>
                        {profile.bio}
                    </p>

                </section>

                <section className="card">

                    <h2>Information</h2>

                    <p>
                        <strong>Location:</strong> {profile.location}
                    </p>

                    <p>
                        <strong>Email:</strong> {profile.email}
                    </p>

                </section>

                <section className="card">

                    <h2>Connect With Me</h2>

                    <div className="links">

                        {profile.linkedinUrl && (
                            <a
                                href={profile.linkedinUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>
                        )}

                        {profile.githubUrl && (
                            <a
                                href={profile.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>
                        )}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default App;