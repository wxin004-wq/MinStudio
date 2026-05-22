import { useState, useEffect } from 'react';

const rawProjects = [
  {
    slug: 'hyatt-place-yuhang-china',
    imageFolder: 'hyatt-place-yuhang-china',
    title: 'Hyatt Place',
    location: 'Yuhang, China',
    category: 'Hotels',
    year: '—',
  },
  {
    slug: 'boutique-hotel-jingdezhen-china',
    imageFolder: 'boutique-hotel-jingdezhen-china',
    title: 'Boutique Hotel',
    location: 'Jingdezhen, China',
    category: 'Hotels',
    year: '—',
  },
  {
    slug: 'the-pujun-hotel-guangzhou-china',
    imageFolder: 'the-pujun-hotel-guangzhou-china',
    title: 'The Pujun Hotel',
    location: 'Guangzhou, China',
    category: 'Hotels',
    year: '—',
  },
  {
    slug: 'the-pujun-hotel-shanghai-china',
    imageFolder: 'the-pujun-hotel-shanghai-china',
    title: 'The Pujun Hotel',
    location: 'Shanghai, China',
    category: 'Hotels',
    year: '—',
  },
  {
    slug: 'the-unbound-collection-by-hyatt-yixing-china',
    imageFolder: 'the-unbound-collection-by-hyatt-yixing-china',
    title: 'The Unbound Collection by Hyatt',
    location: 'Yixing, China',
    category: 'Hotels',
    year: '—',
  },
  {
    slug: 'hyatt-regency-hangzhou-bay-cixi-china',
    imageFolder: 'hyatt-regency-hangzhou-bay-cixi-china',
    title: 'Hyatt Regency Hangzhou Bay',
    location: 'Cixi, China',
    category: 'Hotels',
    year: '—',
  },
  {
    slug: 'hyatt-place-jingdezhen-china',
    imageFolder: 'hyatt-place-jingdezhen-china',
    title: 'Hyatt Place',
    location: 'Jingdezhen, China',
    category: 'Hotels',
    year: '—',
  },
  {
    slug: 'hyatt-place-shaoxing-china',
    imageFolder: 'hyatt-place-shaoxing-china',
    title: 'Hyatt Place',
    location: 'Shaoxing, China',
    category: 'Hotels',
    year: '—',
  },
  {
    slug: 'parkfleet-hotel-shanghai-china',
    imageFolder: 'parkfleet-hotel-shanghai-china',
    title: 'Parkfleet Hotel',
    location: 'Shanghai, China',
    category: 'Hotels',
    year: '—',
  },
  {
    slug: 'park-hyatt-ningbo-china',
    imageFolder: 'park-hyatt-ningbo-china',
    title: 'Park Hyatt Ningbo',
    location: 'Ningbo, China',
    category: 'Hotels',
    year: '—',
  },
  {
    slug: 'hyatt-place-chengdu-china',
    imageFolder: 'hyatt-place-chengdu-china',
    title: 'Hyatt Place',
    location: 'Chengdu, China',
    category: 'Hotels',
    year: '—',
  },
  {
    slug: 'hyatt-house-chengdu-china',
    imageFolder: 'hyatt-house-chengdu-china',
    title: 'Hyatt House',
    location: 'Chengdu, China',
    category: 'Hotels',
    year: '—',
  },
  {
    slug: 'h2-architecture-office-shanghai-china',
    imageFolder: 'h2-architecture-office-shanghai-china',
    title: 'H2 Architecture Office',
    location: 'Shanghai, China',
    category: 'Residential',
    year: '—',
  },
  {
    slug: 'guishan-villa-shenzhen-china',
    imageFolder: 'guishan-villa-shenzhen-china',
    title: 'Guishan Villa',
    location: 'Shenzhen, China',
    category: 'Residential',
    year: '—',
  },
  {
    slug: 'artists-villa-yixing-china',
    imageFolder: 'artists-villa-yixing-china',
    title: 'Artist’s Villa',
    location: 'Yixing, China',
    category: 'Residential',
    year: '—',
  },
  {
    slug: 'private-residence-of-yada-yixing-china',
    imageFolder: 'private-residence-of-yada-yixing-china',
    title: 'Private Residence of Yada',
    location: 'Yixing, China',
    category: 'Residential',
    year: '—',
  },
  {
    slug: 'hangzhou-centre-h23-penthouse-china',
    imageFolder: 'hangzhou-centre-h23-penthouse-china',
    title: 'Hangzhou Centre H23 Penthouse',
    location: 'China',
    category: 'Residential',
    year: '—',
  },
];

const imageModules = import.meta.glob('./assets/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const projectImages = {};

Object.entries(imageModules).forEach(([path, url]) => {
  const normalizedPath = path.replace(/\\/g, '/').replace(/^\.\//, '');
  const match = normalizedPath.match(/^assets\/projects\/([^\/]+)\//);
  if (!match) return;
  const projectFolder = match[1];

  projectImages[projectFolder] = projectImages[projectFolder] || [];
  projectImages[projectFolder].push(url);
});

const projects = rawProjects.map((project) => {
  const folder = project.imageFolder || project.slug;
  const images = (projectImages[folder] || []).sort((a, b) => {
    const index = (src) => {
      const match = src.match(/(\d+)\.[a-z]+$/i);
      return match ? Number(match[1]) : 0;
    };
    return index(a) - index(b);
  });

  return {
    ...project,
    images,
    folder,
    cover: images[0] || null,
  };
});

const homeImage = Object.entries(imageModules).find(([path]) => /assets\/home\//i.test(path))?.[1] || projects[0]?.cover || null;

const projectCategories = ['Residential', 'Hotels', 'Restaurant & Bar'];

const products = [
  { name: 'Chair', material: 'Oak, linen, steel' },
  { name: 'Table', material: 'Walnut, honed stone' },
  { name: 'Lighting', material: 'Paper, brushed aluminum' },
  { name: 'Object', material: 'Ceramic, cast bronze' },
];

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Min Studio home">
        Min Studio
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        
        <a href="#projects">Projects</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function SectionHeader({ label, title }) {
  return (
    <div className="section-header">
      <p>{label}</p>
      <h2>{title}</h2>
    </div>
  );
}

function ProjectCard({ project, onOpenGallery, onCategoryClick }) {
  return (
    <article
      className="project-card"
      onClick={onOpenGallery}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpenGallery();
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open gallery for ${project.title}`}
    >
      <div className="project-cover">
        {project.cover ? (
          <img src={project.cover} alt={`${project.title} cover`} />
        ) : (
          <div className="project-cover-fallback">Cover image coming soon</div>
        )}
      </div>
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.location}</p>
      </div>
      <div className="card-meta">
        <button
          className="project-category"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onCategoryClick) onCategoryClick(project.category);
          }}
        >
          {project.category}
        </button>
        {project.year && project.year !== '—' ? <span>{project.year}</span> : null}
      </div>
      {/* Card is clickable — gallery opened via card click */}
    </article>
  );
}

function ProjectCarousel({ title, images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  if (!images.length) {
    return <div className="project-cover-fallback">No images for this project</div>;
  }

  const prevImage = () => {
    setIndex((current) => (current - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setIndex((current) => (current + 1) % images.length);
  };

  return (
    <div className="project-gallery">
      <div className="project-main-shell">
        <img src={images[index]} alt={`${title} image ${index + 1}`} />
        {images.length > 1 && (
          <>
            <div className="carousel-count">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>
            <div className="carousel-controls">
              <button type="button" onClick={prevImage} aria-label="Previous image">‹</button>
              <button type="button" onClick={nextImage} aria-label="Next image">›</button>
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="project-thumbnails" aria-label={`${title} thumbnails`}>
          {images.map((image, imageIndex) => (
            <button
              key={image}
              type="button"
              className={imageIndex === index ? 'active' : ''}
              onClick={() => setIndex(imageIndex)}
              aria-label={`View image ${imageIndex + 1}`}
              aria-pressed={imageIndex === index}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectDetail({ slug }) {
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="page-section">
        <SectionHeader label="Projects" title="Project not found" />
        <p style={{ marginTop: 24 }}>The requested project does not exist.</p>
      </section>
    );
  }

  return (
    <section className="page-section project-detail" aria-labelledby="project-title">
      <div className="project-detail-inner">
        <div className="project-detail-nav">
          <a href="#projects">← Back to Projects</a>
        </div>
        <div className="project-detail-header">
          <div>
            <p className="project-detail-label">Project</p>
            <h2 id="project-title">{project.title}</h2>
          </div>
          <dl className="project-detail-meta">
            <div>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{project.category}</dd>
            </div>
          </dl>
        </div>

        <div className="project-main-image">
          <ProjectCarousel title={project.title} images={project.images || []} />
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-placeholder" aria-label={`${product.name} image placeholder`} />
      <div>
        <h3>{product.name}</h3>
        <p>{product.material}</p>
      </div>
    </article>
  );
}

function HomeLanding() {
  return (
    <section className="home-landing" id="home" aria-label="Home">
      <div className="home-landing-grid">
        <div className="home-landing-image">
          {homeImage ? (
            <img src={homeImage} alt="Studio interior" />
          ) : (
            <div className="project-cover-fallback">Home image coming soon</div>
          )}
        </div>
        <div className="home-landing-copy">
          <p className="home-intro">
            An interior design studio creating calm, precise, and quietly immersive spaces for residential and hospitality projects.
          </p>
          <div className="home-philosophy">
            <div className="home-philosophy-list">
              <article>
                <h3><span className="initial">M</span><span className="rest">odern</span></h3>
                <p>Design responds to contemporary lifestyles and needs.</p>
              </article>
              <article>
                <h3><span className="initial">I</span><span className="rest">ntuition</span></h3>
                <p>A natural sense shaped by experience, maturity, and confidence.</p>
              </article>
              <article>
                <h3><span className="initial">N</span><span className="rest">ature</span></h3>
                <p>A return to human nature, environment, natural materials, reality, and belonging to the real world.</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...projectCategories];

  const filtered = projects.filter((p) => selectedCategory === 'All' || p.category === selectedCategory);

  return (
    <section className="page-section" id="projects" aria-label="Projects">
      <div className="category-row" role="tablist" aria-label="Project categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-item${selectedCategory === category ? ' active' : ''}`}
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filtered.map((project) => (
          <ProjectCard
            key={`${project.title}-${project.location}`}
            project={project}
            onOpenGallery={() => (window.location.hash = `#project/${project.slug}`)}
            onCategoryClick={(cat) => setSelectedCategory(cat)}
          />
        ))}
      </div>
    </section>
  );
}

function Products() {
  return (
    <section className="page-section" id="products">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <address className="contact-list">
        <div className="company-info">
          <div className="company-name">
            <p>上海敏恩室内设计咨询有限公司</p>
            <p>MIN.STUDIO DESIGN CONSULTANT SHANGHAI LTD.</p>
          </div>
          
          <div className="company-address">
            <p>上海市徐汇区淮海中路1273弄19B</p>
            <p>NO.19B, LANE 1273 HUAIHAI ZHONG ROAD,</p>
            <p>XUHUI DISTRICT, SHANGHAI, P.R. CHINA 200031</p>
          </div>
          
          <div className="company-contact">
            <p>T: <a href="tel:+862154015398">+86 021 5401 5398</a></p>
            <p>M: <a href="tel:+8618616644727">+86 186 1664 4727</a></p>
            <p>E: <a href="mailto:info@min-studio.net">info@min-studio.net</a></p>
          </div>
        </div>
      </address>
    </section>
  );
}

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#home');

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const renderRoute = () => {
    if (route.startsWith('#project/')) {
      const slug = route.replace('#project/', '');
      return <ProjectDetail key={slug} slug={slug} />;
    }
    if (route === '#projects') return <Projects />;
    if (route === '#products' || route === '#services') return <Products />;
    if (route === '#contact') return <Contact />;

    // Home route: single calm landing section
    if (route === '#home' || route === '' || route === '#') {
      return <HomeLanding />;
    }

    // Fallback to Home
    return <HomeLanding />;
  };

  return (
    <>
      <Header />
      <main>
        {renderRoute()}
      </main>
    </>
  );
}
