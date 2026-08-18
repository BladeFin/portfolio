import FullPublication from './FullPublication';
import type { Publication } from '../content/data';

interface FeaturedPublicationsProps {
  publications: Publication[];
}

/**
 * Renders one full-height section per featured publication. The first one
 * carries the `id="publications"` anchor so the navbar's "Publications" link
 * jumps to the top of the featured set.
 */
export default function FeaturedPublications({
  publications,
}: FeaturedPublicationsProps) {
  const total = publications.length;

  return (
    <>
      {publications.map((publication, index) => {
        const sectionId =
          index === 0 ? 'publications' : `publication-${index + 1}`;
        return (
          <FullPublication
            key={publication.title}
            sectionId={sectionId}
            index={index}
            total={total}
            publication={publication}
          />
        );
      })}
    </>
  );
}
