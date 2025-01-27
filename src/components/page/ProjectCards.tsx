import "./ProjectCards.css";

export interface ProjectCard {
    title: string;
    description: string;
    image: string;
    link: string;
}

export default function ProjectCards(
    { projects }: { projects: ProjectCard[] }
) {
    return (
        <div className="project-card-container">
            {projects.map((project, index) => (
                <div 
                    className="project-card"
                    key={index}
                    onClick={() => location.href = project.link}
                >
                    <div className="project-card-image">
                        <img src={project.image} alt={project.title} />
                    </div>
                    <div className="project-card-content">
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}