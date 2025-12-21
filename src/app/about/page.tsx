export const metadata = {
  title: 'About Us | Timeless Luxury',
  description: 'Learn about our passion for curating exceptional luxury artifacts.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-serif mb-6">About Timeless Luxury</h1>
            <p className="text-xl text-primary/70 leading-relaxed">
              We are purveyors of extraordinary artifacts, bridging centuries of craftsmanship
              with discerning collectors of today.
            </p>
          </div>

          {/* Story Section */}
          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-serif mb-4">Our Story</h2>
            <p className="text-primary/80 mb-4">
              Founded on a passion for preserving history and celebrating exceptional craftsmanship,
              Timeless Luxury has become a trusted source for museum-quality artifacts and luxury
              collectibles.
            </p>
            <p className="text-primary/80 mb-4">
              Each piece in our collection tells a story—of ancient civilizations, master artisans,
              and the enduring human pursuit of beauty and excellence. We travel the world to
              discover these remarkable treasures, ensuring their authenticity and provenance.
            </p>
            <p className="text-primary/80">
              Our commitment goes beyond commerce. We are custodians of history, connecting
              collectors with pieces that deserve to be preserved, appreciated, and passed down
              through generations.
            </p>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-primary/5 p-8 rounded-lg">
              <h3 className="text-xl font-serif mb-3">Authenticity</h3>
              <p className="text-primary/70">
                Every piece is thoroughly vetted and comes with complete provenance documentation.
              </p>
            </div>
            <div className="bg-primary/5 p-8 rounded-lg">
              <h3 className="text-xl font-serif mb-3">Expertise</h3>
              <p className="text-primary/70">
                Our team includes historians, appraisers, and specialists in ancient arts.
              </p>
            </div>
            <div className="bg-primary/5 p-8 rounded-lg">
              <h3 className="text-xl font-serif mb-3">Discretion</h3>
              <p className="text-primary/70">
                We understand the importance of privacy in high-value transactions.
              </p>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="border-t border-primary/10 pt-16">
            <h2 className="text-3xl font-serif mb-6">Our Philosophy</h2>
            <blockquote className="text-2xl font-serif italic text-primary/80 border-l-4 border-accent pl-6 mb-8">
              "True luxury is not about possession—it's about stewardship of beauty, history, and
              human achievement."
            </blockquote>
            <p className="text-primary/70">
              We believe that owning a piece of history comes with responsibility. That's why we
              work closely with museums, cultural institutions, and ethical collectors to ensure
              our artifacts are acquired and sold with integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
