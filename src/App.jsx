import { useState, useEffect } from 'react';

const rawProjects = [
  ['hyatt-place-yuhang-china', ['Hyatt Place', '余杭凯悦嘉轩酒店'], ['Yuhang, China', '中国 余杭'], 'hotels', '04'],
  ['boutique-hotel-jingdezhen-china', ['Boutique Hotel', '景德镇精品酒店'], ['Jingdezhen, China', '中国 景德镇'], 'hotels', '01'],
  ['the-pujun-hotel-guangzhou-china', ['The Pujun Hotel', '广州璞隽酒店'], ['Guangzhou, China', '中国 广州'], 'hotels', '02'],
  ['the-pujun-hotel-shanghai-china', ['The Pujun Hotel', '上海璞隽酒店'], ['Shanghai, China', '中国 上海'], 'hotels', '05'],
  ['the-unbound-collection-by-hyatt-yixing-china', ['The Unbound Collection by Hyatt', '宜兴凯悦臻选酒店'], ['Yixing, China', '中国 宜兴'], 'hotels', '03'],
  ['hyatt-regency-hangzhou-bay-cixi-china', ['Hyatt Regency Hangzhou Bay', '杭州湾凯悦酒店'], ['Cixi, China', '中国 慈溪'], 'hotels', '01'],
  ['hyatt-place-jingdezhen-china', ['Hyatt Place', '景德镇凯悦嘉轩酒店'], ['Jingdezhen, China', '中国 景德镇'], 'hotels', '05'],
  ['hyatt-place-shaoxing-china', ['Hyatt Place', '绍兴凯悦嘉轩酒店'], ['Shaoxing, China', '中国 绍兴'], 'hotels', '05'],
  ['parkfleet-hotel-shanghai-china', ['Boutique Hotel', '上海奉贤精品酒店'], ['Shanghai, China', '中国 上海'], 'hotels', '14'],
  ['h2-architecture-office-shanghai-china', ['H2 Architecture Office', '赫图建筑办公室'], ['Shanghai, China', '中国 上海'], 'residential', '04'],
  ['guishan-villa-shenzhen-china', ['Guishan Villa', '深圳龟山别墅'], ['Shenzhen, China', '中国 深圳'], 'residential', '05'],
  ['artists-villa-yixing-china', ['Artist’s Villa', '宜兴艺术家别墅'], ['Yixing, China', '中国 宜兴'], 'residential', '03'],
  ['private-residence-of-yada-yixing-china', ['Private Residence of Yada', '宜兴雅达私宅'], ['Yixing, China', '中国 宜兴'], 'residential', '03'],
].map(([slug, title, location, category, coverImage = '01']) => ({
  slug,
  imageFolder: slug,
  coverImage,
  title,
  location: { en: location[0], cn: location[1] },
  category,
  year: '—',
}));

const copy = {
  en: {
    nav: { projects: 'Projects', products: 'Products', styling: 'Styling', studio: 'Philosophy', magazine: 'Magazine', contact: 'Contact' },
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
    nav: { projects: '项目', products: '产品', styling: '陈设', studio: 'PHILOSOPHY', magazine: 'MAGAZINE', contact: '联系' },
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
const projectAssetModules = import.meta.glob('./assets/projects/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const getProjectFolder = (path) => path.replace(/\\/g, '/').match(/assets\/projects\/([^/]+)\//)?.[1] || '';
const getImageFilename = (path) => path.replace(/\\/g, '/').split('/').pop() || '';
const getImageIndex = (path) => {
  const match = path.match(/\/(\d+)\.[a-z]+$/i);
  return match ? Number(match[1]) : 0;
};
const comingSoonProjectSlugs = new Set([
  'hyatt-place-yuhang-china',
  'the-pujun-hotel-guangzhou-china',
]);

const projectAssets = Object.entries(projectAssetModules).reduce((assets, [path, url]) => {
  const folder = getProjectFolder(path);
  const filename = getImageFilename(path);
  assets[folder] = { ...assets[folder], [filename]: url };
  return assets;
}, {});

const loadProjectImages = async (project) => {
  if (project.isComingSoon) return [project.cover].filter(Boolean);

  return Object.entries(projectAssets[project.imageFolder] || {})
    .sort(([a], [b]) => getImageIndex(`/${a}`) - getImageIndex(`/${b}`))
    .map(([, url]) => url);
};

const projects = rawProjects.map((project) => {
  const folderAssets = projectAssets[project.imageFolder] || {};
  const coverName = String(project.coverImage);
  const coverFilename = Object.keys(folderAssets).find((filename) => (
    filename === coverName || filename.replace(/\.[^.]+$/, '') === coverName
  ));

  return {
    ...project,
    cover: folderAssets[coverFilename] || null,
    isComingSoon: comingSoonProjectSlugs.has(project.slug),
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
  const menuLabel = lang === 'cn' ? '菜单' : 'Menu';
  const backLabel = lang === 'cn' ? '返回' : 'Back';

  return (
    <header className={`site-header${isHome ? ' site-header-home' : ''}${isMenuOpen ? ' menu-is-open' : ''}${lang === 'cn' ? ' site-header-cn' : ''}`}>
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
          {isMenuOpen ? backLabel : menuLabel}
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
    ['#magazine', t.nav.magazine],
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

function IntroGate({ onEnter }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onEnter();
    }
  };

  return (
    <button className="intro-gate" type="button" onClick={onEnter} onKeyDown={handleKeyDown} aria-label="Enter MIN Studio">
      <span className="intro-kicker">Architecture & Interior Design</span>
      <span className="intro-heading">
        <span>We design the</span>
        <span>experience of</span>
        <em>space.</em>
      </span>
      <span className="intro-copy">
        Through atmosphere, light, nature, and ritual, we create places that{' '}
        <br />
        support connection and solitude, energy and stillness.
      </span>
      <span className="intro-prompt" aria-hidden="true">
        <span />
        Click to Enter
      </span>
      <span className="intro-mark" aria-hidden="true">MIN STUDIO</span>
    </button>
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
      className={`project-card${project.isComingSoon ? ' project-card-coming-soon' : ''}`}
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
        {project.isComingSoon && <span className="coming-soon-badge">coming soon</span>}
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

function ProjectCarousel({ title, images, lang, isComingSoon = false }) {
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
    <div className={`project-gallery${isComingSoon ? ' project-gallery-coming-soon' : ''}`}>
      <div className={`project-carousel-frame${images.length === 1 ? ' project-carousel-frame-single' : ''}`}>
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
            {isComingSoon && <span className="coming-soon-badge">coming soon</span>}
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
          <div className="fullscreen-image-wrap" onClick={(event) => event.stopPropagation()}>
            <img src={images[index]} alt={`${title} ${t.project.image} ${index + 1}`} decoding="async" />
            {isComingSoon && <span className="coming-soon-badge">coming soon</span>}
          </div>
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
            <ProjectCarousel title={projectTitle} images={images} lang={lang} isComingSoon={project.isComingSoon} />
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
  const [isMobileHome, setIsMobileHome] = useState(() =>
    window.matchMedia('(max-width: 900px), (orientation: portrait)').matches
  );
  const activeHomeSlides = isMobileHome && mobileHomeSlides.length ? mobileHomeSlides : homeSlides;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px), (orientation: portrait)');
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
  const [openServiceIndex, setOpenServiceIndex] = useState(-1);
  const philosophy = {
    en: {
      label: 'Studio Philosophy',
      hero: ['We design spaces that', 'hold solitude', 'and shape stories.'],
      values: [
        'Nature as art.',
        'Architecture as shelter.',
        'Light as atmosphere.',
        'Details as intention.',
        'Experiences as memory.',
      ],
      tagline: 'Thoughtful by nature. Human by heart.',
      manifesto: ['We aspire to create places that', 'reveal themselves over time.'],
      cards: [
        {
          title: 'On Novelty',
          text: 'Min Studio does not pursue novelty for its own sake. We believe meaningful spaces emerge through observation, refinement, and time.',
        },
        {
          title: 'On Guiding Values',
          text: 'Our work is guided by patience rather than urgency, atmosphere rather than spectacle, and presence rather than decoration.',
        },
        {
          title: 'On Frameworks',
          text: 'We design frameworks that allow light, material, nature, and human life to interact naturally.',
        },
        {
          title: 'On Completion',
          text: 'A project is not complete when construction ends. It continues to evolve through occupation, memory, weather, and use.',
        },
      ],
      servicesLabel: 'What We Do',
      servicesHeading: ['A full-spectrum creative', 'partnership', '— from concept to culture.'],
      closingQuote: ['A room should not only accommodate activities.', 'It should accommodate moods.'],
      services: [
        {
          title: 'Studio Philosophy',
          text: 'We help you refine and articulate your core manifesto and design principles — the foundation from which all creative decisions emerge. Clear thinking made visible.',
        },
        {
          title: 'Brand Language',
          text: 'Finding the words that sound unmistakably like Min Studio — from taglines to tone-of-voice guidelines. Language that carries the weight of the work.',
        },
        {
          title: 'Hotel Concepts',
          text: 'Guest journeys, room planning, public spaces, destination narratives, and full hospitality experiences — designed around how people want to feel, not just where they sleep.',
        },
        {
          title: 'Moodboards & Art Direction',
          text: 'Curating visual references and narratives that align with your philosophy rather than simply looking beautiful. Vision boards with conviction.',
        },
        {
          title: 'Client Presentations',
          text: 'Turning ideas into compelling, story-driven client-facing narratives. We structure thinking so it lands with clarity, warmth, and purpose.',
        },
        {
          title: 'Studio Culture',
          text: 'Articulating how your team designs, critiques, collaborates, and develops projects — building an internal culture document that becomes a compass.',
        },
        {
          title: 'Website & Publications',
          text: 'Crafting the language, structure, and storytelling for your studio website and monograph — assembling projects and philosophy into a lasting published work.',
        },
      ],
    },
    cn: {
      label: '空间理念',
      hero: ['我们设计的空间', '容纳独处', '也承载故事。'],
      values: [
        '自然如艺术。',
        '建筑如庇护。',
        '光线如氛围。',
        '细节如意图。',
        '体验如记忆。',
      ],
      tagline: '顺应自然，回应人心。',
      manifesto: ['我们希望创造的空间', '会随时间慢慢显现。'],
      cards: [
        {
          title: '关于新意',
          text: 'MIN Studio 不为了新而追求新。我们相信有意义的空间来自观察、推敲与时间。',
        },
        {
          title: '关于价值',
          text: '我们的工作更相信耐心，而非急迫；更重视氛围，而非奇观；更在意存在感，而非装饰。',
        },
        {
          title: '关于框架',
          text: '我们设计的是一种框架，让光、材料、自然与人的生活自然地发生关系。',
        },
        {
          title: '关于完成',
          text: '一个项目并不会在施工结束时真正完成。它会在使用、记忆、天气与时间中继续生长。',
        },
      ],
      servicesLabel: '我们做什么',
      servicesHeading: ['从概念到文化的', '完整创意协作', '。'],
      closingQuote: ['一个房间不应只容纳活动。', '它也应容纳情绪。'],
      services: [
        {
          title: '空间理念',
          text: '我们协助梳理并表达你的核心理念与设计原则，让所有创意决策都有清晰的出发点。让思考被看见。',
        },
        {
          title: '品牌语言',
          text: '找到听起来真正属于 MIN Studio 的语言：从标语到语气规范，让文字承载作品的重量。',
        },
        {
          title: '酒店概念',
          text: '从宾客动线、客房规划、公共空间到目的地叙事与完整的酒店体验，我们围绕人的感受来设计，而不只是睡在哪里。',
        },
        {
          title: '情绪板与艺术指导',
          text: '策划与理念一致的视觉参考和叙事，而不只是好看。让视觉方向拥有判断与信念。',
        },
        {
          title: '客户提案',
          text: '把想法转化为有故事、有结构、能打动客户的表达。让思考以清晰、温度和目的感抵达。',
        },
        {
          title: '工作室文化',
          text: '梳理团队如何设计、评审、协作与推进项目，形成一份能够指引内部工作的文化文本。',
        },
        {
          title: '网站与出版物',
          text: '为工作室网站与作品集构建语言、结构和叙事，把项目与理念整合为可长期留存的表达。',
        },
      ],
    },
  }[lang];

  return (
    <section className="page-section philosophy-section" id="studio" aria-label={copy[lang].nav.studio}>
      <div className="philosophy-inner">
        <div className="philosophy-label">
          <span />
          {philosophy.label}
        </div>

        <div className="philosophy-hero">
          <h2>
            {philosophy.hero[0]}
            <em>{philosophy.hero[1]}</em>
            {philosophy.hero[2]}
          </h2>
          <ul>
            {philosophy.values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          <div className="philosophy-label philosophy-tagline">
            <span />
            {philosophy.tagline}
          </div>
        </div>

        <div className="philosophy-manifesto">
          <h2>
            {philosophy.manifesto[0]}
            <em>{philosophy.manifesto[1]}</em>
          </h2>
          <div className="philosophy-card-grid">
            {philosophy.cards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="philosophy-services">
          <div className="philosophy-services-heading">
            <div className="philosophy-label">
              <span />
              {philosophy.servicesLabel}
            </div>
            <h2>
              {philosophy.servicesHeading[0]} <em>{philosophy.servicesHeading[1]}</em>{philosophy.servicesHeading[2]}
            </h2>
          </div>
          <div className="philosophy-service-list">
            {philosophy.services.map((service, index) => (
              <article key={service.title} className={openServiceIndex === index ? 'open' : ''}>
                <button
                  type="button"
                  className="philosophy-service-trigger"
                  onClick={() => setOpenServiceIndex((current) => (current === index ? -1 : index))}
                  aria-expanded={openServiceIndex === index}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{service.title}</h3>
                  <b aria-hidden="true">{openServiceIndex === index ? '×' : '+'}</b>
                </button>
                {openServiceIndex === index ? <p>{service.text}</p> : null}
              </article>
            ))}
          </div>
        </div>

        <blockquote className="philosophy-closing-quote">
          {philosophy.closingQuote.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </blockquote>
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
    <section className="page-section placeholder-section" id="styling" aria-label={copy[lang].nav.styling}>
      <p>Coming soon...</p>
    </section>
  );
}

function Magazine({ lang }) {
  return (
    <section className="page-section placeholder-section" id="magazine" aria-label={copy[lang].nav.magazine}>
      <p>Coming soon...</p>
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
  const [hasEntered, setHasEntered] = useState(false);

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
    if (route === '#magazine') return <Magazine lang={lang} />;
    if (route === '#contact') return <Contact lang={lang} />;
    return <HomeLanding lang={lang} />;
  };

  const enterSite = () => {
    setHasEntered(true);
    setIsMenuOpen(false);
    if (window.location.hash !== '#home') {
      window.location.hash = '#home';
      setRoute('#home');
    }
  };

  if (!hasEntered) {
    return <IntroGate onEnter={enterSite} />;
  }

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
