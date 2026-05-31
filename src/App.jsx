import { useState, useEffect } from 'react';

const rawProjects = [
  ['hyatt-place-yuhang-china', 'Hyatt Place', ['Yuhang, China', '中国 余杭'], 'hotels'],
  ['boutique-hotel-jingdezhen-china', 'Boutique Hotel', ['Jingdezhen, China', '中国 景德镇'], 'hotels'],
  ['the-pujun-hotel-guangzhou-china', 'The Pujun Hotel', ['Guangzhou, China', '中国 广州'], 'hotels'],
  ['the-pujun-hotel-shanghai-china', 'The Pujun Hotel', ['Shanghai, China', '中国 上海'], 'hotels'],
  ['the-unbound-collection-by-hyatt-yixing-china', 'The Unbound Collection by Hyatt', ['Yixing, China', '中国 宜兴'], 'hotels'],
  ['hyatt-regency-hangzhou-bay-cixi-china', 'Hyatt Regency Hangzhou Bay', ['Cixi, China', '中国 慈溪'], 'hotels'],
  ['hyatt-place-jingdezhen-china', 'Hyatt Place', ['Jingdezhen, China', '中国 景德镇'], 'hotels'],
  ['hyatt-place-shaoxing-china', 'Hyatt Place', ['Shaoxing, China', '中国 绍兴'], 'hotels'],
  ['parkfleet-hotel-shanghai-china', ['Boutique Hotel', '上海奉贤精品酒店'], ['Shanghai, China', '中国 上海'], 'hotels'],
  ['h2-architecture-office-shanghai-china', 'H2 Architecture Office', ['Shanghai, China', '中国 上海'], 'residential'],
  ['guishan-villa-shenzhen-china', 'Guishan Villa', ['Shenzhen, China', '中国 深圳'], 'residential'],
  ['artists-villa-yixing-china', 'Artist’s Villa', ['Yixing, China', '中国 宜兴'], 'residential'],
  ['private-residence-of-yada-yixing-china', 'Private Residence of Yada', ['Yixing, China', '中国 宜兴'], 'residential'],
].map(([slug, title, location, category]) => ({
  slug,
  imageFolder: slug,
  title,
  location: { en: location[0], cn: location[1] },
  category,
  year: '—',
}));

const copy = {
  en: {
    nav: { projects: 'Projects', products: 'Products', styling: 'Styling', studio: 'Studio', contact: 'Contact' },
    categories: { all: 'All', residential: 'Residential', hotels: 'Hotels', restaurant: 'Restaurant & Bar' },
    home: {
      aria: 'Home',
      imageAlt: 'Studio interior',
      fallback: 'Home image coming soon',
      principles: [
        [
          'M — Modern',
          [
            'Modern is not a style, but an understanding of contemporary life.',
            'Design should respond to the way people truly live today — their habits, needs, and emotions.',
            'We value clarity, restraint, and purpose.',
          ],
        ],
        [
          'I — Intuition',
          [
            'Intuition is shaped by experience and perception.',
            'It is the ability to make decisions beyond pure logic.',
            'It allows a space to feel not only “correct,” but naturally balanced and deeply appropriate.',
          ],
        ],
        [
          'N — Nature',
          [
            'Nature is not decoration, but foundation.',
            'It is reflected in the honesty of materials, the movement of light, and the way a space is felt.',
            'A return to calmness, authenticity, and quiet presence.',
          ],
        ],
      ],
      closing: [
        [
          'From intuition to space, from nature to atmosphere,',
          'we are concerned not only with design itself,',
          'but with how space shapes emotions and everyday living.',
        ],
        [
          'A space should not exist merely to please the eye,',
          'but to be experienced, inhabited, and felt over time.',
        ],
      ],
    },
    project: {
      openGallery: 'Open gallery for',
      coverComing: 'Cover image coming soon',
      noImages: 'No images for this project',
      previous: 'Previous image',
      next: 'Next image',
      openFullscreen: 'Open fullscreen image',
      closeFullscreen: 'Close fullscreen image',
      thumbnails: 'thumbnails',
      notFoundTitle: 'Project not found',
      notFoundText: 'The requested project does not exist.',
      back: 'Back to Projects',
      label: 'Project',
      location: 'Location',
      category: 'Category',
      image: 'image',
    },
    products: [
      { name: 'Chair', material: 'Oak, linen, steel' },
      { name: 'Table', material: 'Walnut, honed stone' },
      { name: 'Lighting', material: 'Paper, brushed aluminum' },
      { name: 'Object', material: 'Ceramic, cast bronze' },
    ],
    stylingProjects: [
      { title: 'Private Apartment', location: 'Shanghai, China', category: 'Residential Styling' },
      { title: 'Table Composition', location: 'Hangzhou, China', category: 'Object Styling' },
      { title: 'Hotel Suite', location: 'Ningbo, China', category: 'Hospitality Styling' },
      { title: 'Material Study', location: 'Shanghai, China', category: 'Editorial Styling' },
      { title: 'Seasonal Room', location: 'Suzhou, China', category: 'Residential Styling' },
      { title: 'Still Life', location: 'Shanghai, China', category: 'Object Styling' },
    ],
    contact: 'Contact',
  },
  cn: {
    nav: { projects: '项目', products: '产品', styling: '陈设', studio: '工作室', contact: '联系' },
    categories: { all: '全部', residential: '住宅', hotels: '酒店', restaurant: '餐厅与酒吧' },
    home: {
      aria: '首页',
      imageAlt: '工作室室内',
      fallback: '首页图片即将呈现',
      principles: [
        [
          'M — 现代（Modern）',
          [
            '现代不是风格，而是一种对当下生活的理解。',
            '设计应回应当代人的生活方式与真实需求。',
            '强调清晰、克制与有效性。',
          ],
        ],
        [
          'I — 直觉（Intuition）',
          [
            '直觉源于经验与感知，是超越逻辑的判断能力。',
            '它让空间不仅“正确”，更“恰到好处”。',
          ],
        ],
        [
          'N — 自然（Nature）',
          [
            '自然不是装饰，而是基础。',
            '体现在材料的真实、光线的变化，以及人的感受之中。',
            '让空间回归平静与真实。',
          ],
        ],
      ],
      closing: [
        [
          '从直觉到空间，从自然到氛围，',
          '我们关注的不只是设计本身，',
          '而是空间如何影响人的感受与生活方式。',
        ],
        [
          '空间不为取悦视觉而存在，',
          '而是为了被长期感受与使用。',
        ],
      ],
    },
    project: {
      openGallery: '打开项目图集',
      coverComing: '项目封面即将呈现',
      noImages: '此项目暂无图片',
      previous: '上一张',
      next: '下一张',
      openFullscreen: '打开全屏图片',
      closeFullscreen: '关闭全屏图片',
      thumbnails: '缩略图',
      notFoundTitle: '未找到项目',
      notFoundText: '请求的项目不存在。',
      back: '返回项目',
      label: '项目',
      location: '地点',
      category: '类别',
      image: '图片',
    },
    products: [
      { name: '椅', material: '橡木、亚麻、钢' },
      { name: '桌', material: '胡桃木、哑光石材' },
      { name: '灯', material: '纸、拉丝铝' },
      { name: '器物', material: '陶瓷、铸铜' },
    ],
    stylingProjects: [
      { title: '私人公寓', location: '中国 上海', category: '住宅陈设' },
      { title: '桌面构成', location: '中国 杭州', category: '器物陈设' },
      { title: '酒店套房', location: '中国 宁波', category: '酒店陈设' },
      { title: '材料研究', location: '中国 上海', category: '编辑陈设' },
      { title: '季节房间', location: '中国 苏州', category: '住宅陈设' },
      { title: '静物', location: '中国 上海', category: '器物陈设' },
    ],
    contact: '联系',
  },
};

const homeModules = import.meta.glob('./assets/home/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const homeSlideModules = import.meta.glob('./assets/home-desktop-web/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const mobileHomeSlideModules = import.meta.glob('./assets/home-mobile-web/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const projectCoverModules = import.meta.glob('./assets/projects/*/01.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const projectImageLoaders = import.meta.glob([
  './assets/projects/*/*.{jpg,jpeg,png,webp}',
  '!./assets/projects/*/01.{jpg,jpeg,png,webp}',
], {
  query: '?url',
  import: 'default',
});

const getProjectFolder = (path) => path.replace(/\\/g, '/').match(/assets\/projects\/([^/]+)\//)?.[1] || '';
const getImageIndex = (path) => {
  const match = path.match(/\/(\d+)\.[a-z]+$/i);
  return match ? Number(match[1]) : 0;
};

const projectCovers = Object.entries(projectCoverModules).reduce((covers, [path, url]) => {
  covers[getProjectFolder(path)] = url;
  return covers;
}, {});

const loadProjectImages = async (project) => {
  const entries = Object.entries(projectImageLoaders)
    .filter(([path]) => getProjectFolder(path) === project.imageFolder)
    .sort(([a], [b]) => getImageIndex(a) - getImageIndex(b));
  const urls = await Promise.all(entries.map(([, load]) => load()));
  return [project.cover, ...urls].filter(Boolean);
};

const projects = rawProjects.map((project) => {
  return {
    ...project,
    cover: projectCovers[project.imageFolder] || null,
  };
});

const homeImage = Object.values(homeModules)[0] || projects[0]?.cover || null;
const customHomeSlides = Object.entries(homeSlideModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);
const homeSlides = customHomeSlides.length ? customHomeSlides : [homeImage].filter(Boolean);
const mobileHomeSlides = Object.entries(mobileHomeSlideModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);
const projectCategories = ['residential', 'hotels'];
const localized = (value, lang) => {
  if (Array.isArray(value)) return lang === 'cn' ? value[1] : value[0];
  return typeof value === 'object' ? value[lang] || value.en : value;
};

function Header({ route, lang, onLanguageChange, isMenuOpen, onMenuToggle }) {
  const isHome = route === '#home' || route === '' || route === '#';

  return (
    <header className={`site-header${isHome ? ' site-header-home' : ''}${isMenuOpen ? ' menu-is-open' : ''}`}>
      <a className="brand" href="#home" aria-label="Min Studio home">
        MIN STUDIO
      </a>
      <div className="header-actions">
        <button
          className="menu-toggle"
          type="button"
          onClick={onMenuToggle}
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
        >
          {isMenuOpen ? 'Back' : 'Menu'}
        </button>
        <div className="language-toggle" aria-label="Language">
          <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => onLanguageChange('en')} aria-pressed={lang === 'en'}>
            EN
          </button>
          <span aria-hidden="true" />
          <button type="button" className={lang === 'cn' ? 'active' : ''} onClick={() => onLanguageChange('cn')} aria-pressed={lang === 'cn'}>
            CN
          </button>
        </div>
      </div>
    </header>
  );
}

function MenuPanel({ route, lang, isOpen }) {
  const t = copy[lang];
  const isActive = (target) => {
    if (target === '#projects') return route === '#projects' || route.startsWith('#project/');
    return route === target;
  };
  const links = [
    ['#projects', t.nav.projects],
    ['#products', t.nav.products],
    ['#styling', t.nav.styling],
    ['#studio', t.nav.studio],
    ['#contact', t.nav.contact],
  ];

  return (
    <div className={`menu-panel${isOpen ? ' open' : ''}`} id="site-menu" aria-hidden={!isOpen}>
      <nav className={`menu-panel-nav ${lang === 'cn' ? 'main-nav-cn' : ''}`} aria-label="Main navigation">
        {links.map(([href, label]) => (
          <a key={href} className={isActive(href) ? 'active' : ''} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </div>
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

function ProjectCard({ project, lang, onOpenGallery, onCategoryClick }) {
  const t = copy[lang];
  const projectTitle = localized(project.title, lang);

  return (
    <article
      className="project-card"
      onClick={onOpenGallery}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpenGallery();
      }}
      role="button"
      tabIndex={0}
      aria-label={`${t.project.openGallery} ${projectTitle}`}
    >
      <div className="project-cover">
        {project.cover ? (
          <img src={project.cover} alt={`${projectTitle} cover`} loading="lazy" decoding="async" />
        ) : (
          <div className="project-cover-fallback">{t.project.coverComing}</div>
        )}
      </div>
      <div className="project-copy">
        <h3>{projectTitle}</h3>
        <p>{localized(project.location, lang)}</p>
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
          {t.categories[project.category]}
        </button>
        {project.year && project.year !== '—' ? <span>{project.year}</span> : null}
      </div>
    </article>
  );
}

function ProjectCarousel({ title, images, lang }) {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const t = copy[lang];

  const prevImage = () => {
    setIndex((current) => (current - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setIndex((current) => (current + 1) % images.length);
  };

  useEffect(() => {
    setIndex(0);
    setIsFullscreen(false);
  }, [images]);

  useEffect(() => {
    if (!isFullscreen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsFullscreen(false);
      if (event.key === 'ArrowLeft') prevImage();
      if (event.key === 'ArrowRight') nextImage();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isFullscreen]);

  if (!images.length) {
    return <div className="project-cover-fallback">{t.project.noImages}</div>;
  }

  return (
    <div className="project-gallery">
      <div className="project-carousel-frame">
        {images.length > 1 && (
          <button className="carousel-arrow carousel-arrow-prev" type="button" onClick={prevImage} aria-label={t.project.previous}>‹</button>
        )}
        <div className="project-main-shell">
          <button
            className="project-main-button"
            type="button"
            onClick={() => setIsFullscreen(true)}
            aria-label={`${t.project.openFullscreen}: ${title} ${index + 1}`}
          >
            <img src={images[index]} alt={`${title} ${t.project.image} ${index + 1}`} decoding="async" />
          </button>
        </div>
        {images.length > 1 && (
          <button className="carousel-arrow carousel-arrow-next" type="button" onClick={nextImage} aria-label={t.project.next}>›</button>
        )}
      </div>
      {images.length > 1 && (
        <div className="project-thumbnails" aria-label={`${title} ${t.project.thumbnails}`}>
          {images.map((image, imageIndex) => (
            <button
              key={image}
              type="button"
              className={imageIndex === index ? 'active' : ''}
              onClick={() => setIndex(imageIndex)}
              aria-label={`${t.project.image} ${imageIndex + 1}`}
              aria-pressed={imageIndex === index}
            >
              <img src={image} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
      {isFullscreen && (
        <div
          className="fullscreen-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} ${t.project.openFullscreen}`}
          onClick={() => setIsFullscreen(false)}
        >
          <button className="fullscreen-close" type="button" onClick={() => setIsFullscreen(false)} aria-label={t.project.closeFullscreen}>
            ×
          </button>
          {images.length > 1 && (
            <button
              className="fullscreen-arrow fullscreen-arrow-prev"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                prevImage();
              }}
              aria-label={t.project.previous}
            >
              ‹
            </button>
          )}
          <img src={images[index]} alt={`${title} ${t.project.image} ${index + 1}`} decoding="async" onClick={(event) => event.stopPropagation()} />
          {images.length > 1 && (
            <button
              className="fullscreen-arrow fullscreen-arrow-next"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              aria-label={t.project.next}
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ProjectDetail({ slug, lang }) {
  const project = projects.find((p) => p.slug === slug);
  const [images, setImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const t = copy[lang];
  const projectTitle = project ? localized(project.title, lang) : '';

  useEffect(() => {
    let isMounted = true;

    if (!project) {
      setImages([]);
      setIsLoadingImages(false);
      return undefined;
    }

    setIsLoadingImages(true);
    loadProjectImages(project).then((loadedImages) => {
      if (!isMounted) return;
      setImages(loadedImages);
      setIsLoadingImages(false);
    });

    return () => {
      isMounted = false;
    };
  }, [project?.imageFolder]);

  if (!project) {
    return (
      <section className="page-section">
        <SectionHeader label={t.nav.projects} title={t.project.notFoundTitle} />
        <p style={{ marginTop: 24 }}>{t.project.notFoundText}</p>
      </section>
    );
  }

  return (
    <section className="page-section project-detail" aria-labelledby="project-title">
      <div className="project-detail-inner">
        <div className="project-detail-nav">
          <a href="#projects">← {t.project.back}</a>
        </div>
        <div className="project-detail-header">
          <div>
            <p className="project-detail-label">{t.project.label}</p>
            <h2 id="project-title">{projectTitle}</h2>
          </div>
          <dl className="project-detail-meta">
            <div>
              <dt>{t.project.location}</dt>
              <dd>{localized(project.location, lang)}</dd>
            </div>
            <div>
              <dt>{t.project.category}</dt>
              <dd>{t.categories[project.category]}</dd>
            </div>
          </dl>
        </div>

        <div className="project-main-image">
          {isLoadingImages ? (
            <div className="project-cover-fallback">{t.project.coverComing}</div>
          ) : (
            <ProjectCarousel title={projectTitle} images={images} lang={lang} />
          )}
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

function HomeLanding({ lang }) {
  const t = copy[lang].home;
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMobileHome, setIsMobileHome] = useState(() => window.matchMedia('(max-width: 720px)').matches);
  const activeHomeSlides = isMobileHome && mobileHomeSlides.length ? mobileHomeSlides : homeSlides;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 720px)');
    const updateMode = () => setIsMobileHome(mediaQuery.matches);

    updateMode();
    mediaQuery.addEventListener('change', updateMode);
    return () => mediaQuery.removeEventListener('change', updateMode);
  }, []);

  useEffect(() => {
    setSlideIndex(0);
    if (activeHomeSlides.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % activeHomeSlides.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, [activeHomeSlides.length]);

  return (
    <section className="home-landing" id="home" aria-label={t.aria}>
      <div className="home-background" aria-hidden="true">
        {activeHomeSlides.map((image, index) => (
          <div
            className={`home-background-slide${index === slideIndex ? ' active' : ''}`}
            key={image}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      {!activeHomeSlides.length && <div className="project-cover-fallback">{t.fallback}</div>}
    </section>
  );
}

function Studio({ lang }) {
  const t = copy[lang].home;

  return (
    <section className="page-section studio-section" id="studio" aria-label={copy[lang].nav.studio}>
      <div className="studio-copy">
        <div className="home-philosophy-list">
          {t.principles.map(([title, paragraphs]) => (
            <article key={title}>
              <h3>{title}</h3>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
          <div className="home-philosophy-closing">
            {t.closing.map((group) => (
              <p key={group.join(' ')}>
                {group.map((line) => (
                  <span key={line}>{line} </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ lang }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const t = copy[lang];
  const categories = ['all', ...projectCategories];
  const filtered = projects.filter((p) => selectedCategory === 'all' || p.category === selectedCategory);

  return (
    <section className="page-section" id="projects" aria-label={t.nav.projects}>
      <div className="category-row" role="tablist" aria-label={t.nav.projects}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-item${selectedCategory === category ? ' active' : ''}`}
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
          >
            {t.categories[category]}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filtered.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            lang={lang}
            onOpenGallery={() => (window.location.hash = `#project/${project.slug}`)}
            onCategoryClick={(cat) => setSelectedCategory(cat)}
          />
        ))}
      </div>
    </section>
  );
}

function Products({ lang }) {
  return (
    <section className="page-section placeholder-section" id="products" aria-label={copy[lang].nav.products}>
      <p>Coming soon...</p>
    </section>
  );
}

function Styling({ lang }) {
  return (
    <section className="page-section styling-section" id="styling" aria-label={copy[lang].nav.styling}>
      <div className="project-grid">
        {copy[lang].stylingProjects.map((project) => (
          <article className="project-card styling-card" key={`${project.title}-${project.location}`}>
            <div className="project-cover styling-cover" aria-label={`${project.title} image placeholder`} />
            <div className="project-copy">
              <h3>{project.title}</h3>
              <p>{project.location}</p>
            </div>
            <div className="card-meta">
              <span>{project.category}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact({ lang }) {
  return (
    <section className="contact-section" id="contact">
      <address className="contact-list">
        <div className="company-info">
          <p className="contact-heading">{copy[lang].contact}</p>

          <div className="company-name">
            <p>上海敏恩室内设计咨询有限公司</p>
            <p>MIN.STUDIO DESIGN CONSULTANT SHANGHAI LTD.</p>
          </div>

          <div className="company-address">
            <p>上海市徐汇区淮海中路1273弄19B</p>
            <p className="company-address-en">NO.19B, LANE 1273 HUAIHAI ZHONG ROAD,</p>
            <p className="company-address-en">XUHUI DISTRICT, SHANGHAI, P.R. CHINA 200031</p>
          </div>

          <div className="company-contact">
            <p>T: <a href="tel:+862154015398">+86 021 5401 5398</a></p>
            <p>E: <a href="mailto:info@min-studio.net">info@min-studio.net</a></p>
          </div>
        </div>
      </address>
    </section>
  );
}

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#home');
  const [lang, setLang] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash || '#home');
      setIsMenuOpen(false);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [route]);

  useEffect(() => {
    document.documentElement.lang = lang === 'cn' ? 'zh-CN' : 'en';
  }, [lang]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const renderRoute = () => {
    if (route.startsWith('#project/')) {
      const slug = route.replace('#project/', '');
      return <ProjectDetail key={slug} slug={slug} lang={lang} />;
    }
    if (route === '#projects') return <Projects lang={lang} />;
    if (route === '#products' || route === '#services') return <Products lang={lang} />;
    if (route === '#styling') return <Styling lang={lang} />;
    if (route === '#studio') return <Studio lang={lang} />;
    if (route === '#contact') return <Contact lang={lang} />;
    return <HomeLanding lang={lang} />;
  };

  return (
    <div lang={lang === 'cn' ? 'zh-CN' : 'en'}>
      <Header
        route={route}
        lang={lang}
        onLanguageChange={setLang}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((open) => !open)}
      />
      <MenuPanel route={route} lang={lang} isOpen={isMenuOpen} />
      <main className={route === '#home' || route === '' || route === '#' ? 'home-main' : ''}>
        {renderRoute()}
      </main>
    </div>
  );
}
