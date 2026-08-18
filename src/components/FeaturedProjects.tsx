import FullProject from './FullProject';
import type { Project } from '../content/data';

interface FeaturedProjectsProps {
  /** Already filtered list of featured projects. */
  projects: Project[];
}

/**
 * Renders one full-height section per featured project. The first featured
 * project carries the `id="projects"` anchor so the navbar's "Projects" link
 * jumps to the top of the featured set.
 */
export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const total = projects.length;

  return (
    <>
      {projects.map((project, index) => {
        const sectionId = index === 0 ? 'projects' : `project-${index + 1}`;
        return (
          <FullProject
            key={project.title}
            sectionId={sectionId}
            index={index}
            total={total}
            project={project}
          />
        );
      })}
    </>
  );
}
