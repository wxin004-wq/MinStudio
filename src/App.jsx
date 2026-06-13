import { useState, useEffect } from 'react';

const rawProjects = [
  ['hyatt-place-yuhang-china', ['Hyatt Place', '余杭凯悦嘉轩酒店'], ['Yuhang, China', '中国 余杭'], 'hotels'],
  ['boutique-hotel-jingdezhen-china', ['Boutique Hotel', '景德镇精品酒店'], ['Jingdezhen, China', '中国 景德镇'], 'hotels'],
  ['the-pujun-hotel-guangzhou-china', ['The Pujun Hotel', '广州璞隽酒店'], ['Guangzhou, China', '中国 广州'], 'hotels'],
  ['the-pujun-hotel-shanghai-china', ['The Pujun Hotel', '上海璞隽酒店'], ['Shanghai, China', '中国 上海'], 'hotels'],
  ['the-unbound-collection-by-hyatt-yixing-china', ['The Unbound Collection by Hyatt', '宜兴凯悦臻选酒店'], ['Yixing, China', '中国 宜兴'], 'hotels'],
  ['hyatt-regency-hangzhou-bay-cixi-china', ['Hyatt Regency Hangzhou Bay', '杭州湾凯悦酒店'], ['Cixi, China', '中国 慈溪'], 'hotels'],
  ['hyatt-place-jingdezhen-china', ['Hyatt Place', '景德镇凯悦嘉轩酒店'], ['Jingdezhen, China', '中国 景德镇'], 'hotels'],
  ['hyatt-place-shaoxing-china', ['Hyatt Place', '绍兴凯悦嘉轩酒店'], ['Shaoxing, China', '中国 绍兴'], 'hotels'],
  ['parkfleet-hotel-shanghai-china', ['Boutique Hotel', '上海奉贤精品酒店'], ['Shanghai, China', '中国 上海'], 'hotels'],
  ['h2-architecture-office-shanghai-china', ['H2 Architecture Office', '赫图建筑办公室'], ['Shanghai, China', '中国 上海'], 'residential'],
  ['guishan-villa-shenzhen-china', ['Guishan Villa', '深圳龟山别墅'], ['Shenzhen, China', '中国 深圳'], 'residential'],
  ['artists-villa-yixing-china', ['Artist’s Villa', '宜兴艺术家别墅'], ['Yixing, China', '中国 宜兴'], 'residential'],
  ['private-residence-of-yada-yixing-china', ['Private Residence of Yada', '宜兴雅达私宅'], ['Yixing, China', '中国 宜兴'], 'residential'],
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
    studio: {
      heroEyebrow: 'Architecture & Interior Design',
      heroTitle: ['We design the', 'experience of', 'space.'],
      heroText: 'Through atmosphere, light, nature, and ritual, we create places that support connection and solitude, energy and stillness.',
      philosophyLabel: 'Studio Philosophy',
      philosophyTitle: [
        'We are not interested in creating',
        'spaces that impress for a moment.',
        'We aspire to create places that',
        'reveal themselves over time.',
      ],
      manifesto: [
        ['On Novelty', 'Min Studio does not pursue novelty for its own sake. We believe meaningful spaces emerge through observation, refinement, and time.'],
        ['On Guiding Values', 'Our work is guided by patience rather than urgency, atmosphere rather than spectacle, and presence rather than decoration.'],
        ['On Frameworks', 'We design frameworks that allow light, material, nature, and human life to interact naturally.'],
        ['On Completion', 'A project is not complete when construction ends. It continues to evolve through occupation, memory, weather, and use.'],
      ],
      storyLabel: 'Studio Story',
      storyTitle: ['Where', 'Min Studio', 'began.'],
      storyKicker: 'Architecture & Interior Design',
      story: [
        'Min Studio was founded on a simple but persistent question: why do some spaces make us feel fully alive, while others leave us hollow? The answer, we came to believe, is never in the objects. It is always in the atmosphere — the quality of light at a particular hour, the temperature of a material under your hand, the way a room holds sound.',
        'We are not decorators of walls. We are architects of feeling.',
        'Our practice grew from a conviction that design should begin with deep listening — to the land, to the light, to the people who will live or work or rest within what we make.',
        'Today, Min Studio works across architecture, interior design, and hospitality — drawn to projects where the experience of space is as important as its construction.',
      ],
      processLabel: 'Our Process',
      processTitle: ['How we move from', 'feeling to form.'],
      processIntro: 'Every Min Studio project follows a five-phase process rooted in curiosity, restraint, and care. We do not rush from brief to blueprint. We take the time to understand deeply before we begin to propose.',
      process: [
        ['01', 'Listen', 'We begin in silence. Visiting the site, studying the light, understanding the culture and the people.'],
        ['02', 'Feel', 'Before we speak in form, we define the emotional register. What should this space feel like?'],
        ['03', 'Distil', 'We resist the impulse to add, finding the essential idea and protecting it against noise.'],
        ['04', 'Make', 'Design develops through dialogue between client, team, material, and site.'],
        ['05', 'Inhabit', 'We consider our work complete only when the space has been lived in, revisited, refined, and cared for.'],
      ],
    },
    contact: 'Contact',
  },
  cn: {
    nav: { projects: '项目', products: '产品', styling: '陈设', studio: '简介', contact: '联系' },
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
    studio: {
      heroEyebrow: '建筑与室内设计',
      heroTitle: ['我们设计的', '不仅是空间，', '而是体验。'],
      heroText: '通过氛围、光线、自然与日常仪式，我们创造能够承载连接、独处、能量与安静的场所。',
      philosophyLabel: '工作室理念',
      philosophyTitle: [
        '我们并不追求',
        '只在瞬间令人惊艳的空间。',
        '我们希望创造',
        '会随着时间展开的场所。',
      ],
      manifesto: [
        ['关于新意', 'Min Studio 不追求为新而新的形式。我们相信，有意义的空间来自观察、推敲与时间。'],
        ['关于价值', '我们的工作由耐心而非急切、氛围而非奇观、存在感而非装饰性所引导。'],
        ['关于框架', '我们设计的是一种框架，使光线、材料、自然与人的生活能够自然互动。'],
        ['关于完成', '项目并不在施工结束时完成。它会在使用、记忆、气候与时间中继续生长。'],
      ],
      storyLabel: '工作室故事',
      storyTitle: ['Min Studio', '从何处', '开始。'],
      storyKicker: '建筑与室内设计',
      story: [
        'Min Studio 源于一个简单而持续的问题：为什么有些空间让人感到真正鲜活，而另一些空间却让人空洞？我们相信答案从不只在物件之中，而在氛围之中。',
        '我们不是墙面的装饰者。我们是感受的建造者。',
        '我们的实践始于深入聆听：聆听土地、光线，以及将在空间中生活、工作或停留的人。',
        '今天，Min Studio 的工作横跨建筑、室内与酒店空间。我们有意保持小规模，只承接有限项目，以给予每一个项目充分的注意力。',
      ],
      processLabel: '工作方法',
      processTitle: ['我们如何从', '感受走向形式。'],
      processIntro: '每一个 Min Studio 项目都遵循五个阶段：好奇、克制与关照。我们不会急于从任务书走向图纸，而是先花时间真正理解。',
      process: [
        ['01', '聆听', '我们从安静开始。走访现场，观察光线，理解文化与使用者。'],
        ['02', '感受', '在形式出现之前，我们先定义空间应有的情绪与氛围。'],
        ['03', '提炼', '我们克制添加的冲动，寻找最核心的概念，并保护它不被噪音淹没。'],
        ['04', '生成', '设计在客户、团队、材料与场地之间的对话中逐步发展。'],
        ['05', '使用', '只有当空间被真实使用、回访、修正并持续照看时，工作才真正完整。'],
      ],
    },
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
const comingSoonProjectSlugs = new Set([
  'hyatt-place-yuhang-china',
  'the-pujun-hotel-guangzhou-china',
]);

const projectCovers = Object.entries(projectCoverModules).reduce((covers, [path, url]) => {
  covers[getProjectFolder(path)] = url;
  return covers;
}, {});

const loadProjectImages = async (project) => {
  if (project.isComingSoon) return [project.cover].filter(Boolean);

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
        {project.isComingSoon && <span className="coming-soon-badge">Coming Soon...</span>}
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
            {isComingSoon && <span className="coming-soon-badge">Coming Soon...</span>}
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
            {isComingSoon && <span className="coming-soon-badge">Coming Soon...</span>}
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
            <h2 id="project-title">{projectTitle}</h2>
          </div>
          <dl className="project-detail-meta">
            <div>
              <dd>{localized(project.location, lang)}</dd>
            </div>
            <div>
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
  const t = copy[lang].studio;

  return (
    <section className="page-section studio-section" id="studio" aria-label={copy[lang].nav.studio}>
      <div className="studio-page">
        <div className="studio-hero">
          <p className="studio-eyebrow">{t.heroEyebrow}</p>
          <h1>
            {t.heroTitle.slice(0, 2).map((line) => (
              <span key={line}>{line}</span>
            ))}
            <em>{t.heroTitle[2]}</em>
          </h1>
          <p>{t.heroText}</p>
        </div>

        <div className="studio-block studio-philosophy">
          <p className="studio-label">{t.philosophyLabel}</p>
          <h2>
            {t.philosophyTitle.slice(0, 3).map((line) => (
              <span key={line}>{line}</span>
            ))}
            <em>{t.philosophyTitle[3]}</em>
          </h2>
          <div className="studio-manifesto">
            {t.manifesto.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="studio-block studio-story">
          <p className="studio-label">{t.storyLabel}</p>
          <div className="studio-story-grid">
            <div>
              <h2>
                {t.storyTitle.map((line, index) => (
                  index === t.storyTitle.length - 1 ? <em key={line}>{line}</em> : <span key={line}>{line}</span>
                ))}
              </h2>
              <p className="studio-kicker">{t.storyKicker}</p>
            </div>
            <div className="studio-story-copy">
              {t.story.map((paragraph, index) => (
                <p key={paragraph} className={index === 1 ? 'studio-pull' : ''}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="studio-block studio-process">
          <p className="studio-label">{t.processLabel}</p>
          <div className="studio-process-intro">
            <h2>
              <span>{t.processTitle[0]}</span>
              <em>{t.processTitle[1]}</em>
            </h2>
            <p>{t.processIntro}</p>
          </div>
          <div className="studio-process-steps">
            {t.process.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
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
