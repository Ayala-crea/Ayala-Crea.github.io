window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.nav-links a')];
  const onScroll = () => {
    let current = 'home';
    const headerOffset = 170;
    const scrollPosition = window.scrollY + headerOffset;
    sections.forEach(sec => {
      if (scrollPosition >= sec.offsetTop) current = sec.id;
    });
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
    if (nearBottom && document.getElementById('contact')) current = 'contact';
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const translations = {
    id: {
      'nav.home':'Home','nav.about':'Tentang','nav.academic':'Akademik','nav.skills':'Skills','nav.projects':'Proyek','nav.research':'Riset','nav.contact':'Kontak','nav.connect':'Mari Terhubung',
      'hero.eyebrow':'Halo, selamat datang','hero.available':'Tersedia untuk kolaborasi','hero.stat.projects':'Proyek & eksperimen','hero.stat.research':'Software & riset','hero.stat.ai':'Solusi berbasis data','hero.featured':'Proyek unggulan','hero.viewall':'Lihat semua','hero.lead':'Saya membangun sistem backend yang andal, efisien, dan terukur—menggabungkan rekayasa perangkat lunak, data, dan riset untuk menghasilkan solusi yang nyata.','hero.explore':'Jelajahi Proyek','hero.about':'Tentang Saya',
      'about.label':'Tentang Saya','about.title':'Membangun Solusi Digital yang','about.accent':'Efisien & Bermakna','about.p1':'Saya berfokus pada pengembangan backend, integrasi sistem, pengolahan data, serta riset terapan. Bagi saya, teknologi yang baik bukan sekadar berjalan—tetapi harus mudah dipelihara, aman, dapat dikembangkan, dan benar-benar membantu pengguna.','about.p2':'Dalam setiap proyek, saya mencoba menyeimbangkan kualitas engineering dengan kebutuhan bisnis: arsitektur yang masuk akal, API yang jelas, query yang efisien, deployment yang stabil, serta keputusan berbasis data.',
      'academic.label':'Pendidikan','academic.title':'Latar Belakang','academic.accent':'Akademik','academic.program':'Program Studi','academic.focusLabel':'Fokus','academic.activityLabel':'Aktivitas','academic.activity':'Riset, pengembangan aplikasi, dan proyek teknologi','academic.statusLabel':'Status','academic.status':'Final-year / tugas akhir',
      'skills.label':'Kemampuan','skills.languages':'Bahasa','projects.label':'Proyek','projects.title':'Karya &','projects.accent':'Kontribusi','projects.intro':'Beberapa proyek pengembangan aplikasi, dashboard, integrasi sistem, dan riset yang pernah saya kerjakan.','projects.open':'Buka Sistem','project.pbmp':'Platform monitoring program manajemen proyek dengan dashboard analitik untuk membantu pemantauan progres dan aktivitas.','project.ruang':'Sistem pemesanan dan pengelolaan ruang yang mendukung alur reservasi, administrasi, serta monitoring penggunaan.','project.toefl':'Platform persiapan TOEFL yang membantu latihan, simulasi, pengelolaan materi, dan evaluasi hasil pembelajaran.','project.farm':'Dashboard analitik untuk monitoring kondisi pertanian dengan penyajian informasi yang ringkas dan mudah dipahami.','project.manure':'Sistem informasi berbasis data untuk memprediksi potensi manure ternak dan mendukung estimasi potensi biogas. Proyek mengintegrasikan machine learning, optimasi, interpretabilitas model, dan dashboard informasi.',
      'cert.label':'Pengembangan Profesional','cert.title':'Sertifikasi &','cert.accent':'Keahlian','cert.heading':'Pengembangan Kompetensi Teknologi','cert.desc':'Aktif mengikuti pembelajaran dan sertifikasi yang mendukung pengembangan kompetensi pada software engineering, data, cloud, dan kecerdasan buatan.','cert.button':'Lihat Sertifikat',
      'research.label':'Riset & Publikasi','research.title':'Research &','research.heading':'Machine Learning, Data Analytics, & Sistem Informasi','research.desc':'Minat riset saya berada pada penerapan machine learning, explainable AI, optimasi, dan pengembangan sistem informasi untuk menyelesaikan masalah di dunia nyata.','research.button':'Lihat Proposal Penelitian',
      'contact.label':'Terbuka untuk Kolaborasi','contact.title':'Mari','contact.accent':'Bekerja Sama','contact.desc':'Terbuka untuk diskusi teknologi, pengembangan backend, riset, integrasi sistem, maupun peluang kolaborasi profesional.','contact.button':'Kirim Pesan','contact.phone':'Telepon','contact.base':'Basis',
      'footer.note':'Dibangun dengan fokus pada detail, performa, dan usability.'
    },
    en: {
      'nav.home':'Home','nav.about':'About','nav.academic':'Academic','nav.skills':'Skills','nav.projects':'Projects','nav.research':'Research','nav.contact':'Contact','nav.connect':"Let's Connect",
      'hero.eyebrow':'Hello, welcome','hero.available':'Available for collaboration','hero.stat.projects':'Projects & experiments','hero.stat.research':'Software & research','hero.stat.ai':'Data-driven solutions','hero.featured':'Featured projects','hero.viewall':'View all','hero.lead':'I build reliable, efficient, and scalable backend systems—combining software engineering, data, and research to deliver practical solutions.','hero.explore':'Explore Projects','hero.about':'About Me',
      'about.label':'About Me','about.title':'Building Digital Solutions that are','about.accent':'Efficient & Meaningful','about.p1':'I focus on backend development, system integration, data processing, and applied research. To me, good technology is not only functional—it should be maintainable, secure, scalable, and genuinely useful to people.','about.p2':'In every project, I balance engineering quality with business needs through sensible architecture, clear APIs, efficient queries, stable deployments, and data-informed decisions.',
      'academic.label':'Education','academic.title':'Academic','academic.accent':'Background','academic.program':'Study Program','academic.focusLabel':'Focus','academic.activityLabel':'Activities','academic.activity':'Research, application development, and technology projects','academic.statusLabel':'Status','academic.status':'Final year / final project',
      'skills.label':'Capabilities','skills.languages':'Languages','projects.label':'Projects','projects.title':'Works &','projects.accent':'Contributions','projects.intro':'Selected application, dashboard, system integration, and research projects I have worked on.','projects.open':'Open System','project.pbmp':'A project management monitoring platform with analytical dashboards to track progress and activity.','project.ruang':'A room booking and management system supporting reservation workflows, administration, and usage monitoring.','project.toefl':'A TOEFL preparation platform for practice, simulation, learning material management, and result evaluation.','project.farm':'An analytics dashboard for monitoring agricultural conditions with concise, easy-to-understand information.','project.manure':'A data-driven information system for predicting livestock manure potential and supporting biogas potential estimation. The project integrates machine learning, optimization, model interpretability, and information dashboards.',
      'cert.label':'Professional Development','cert.title':'Certifications &','cert.accent':'Expertise','cert.heading':'Technology Competency Development','cert.desc':'Actively pursuing learning and certifications that strengthen competencies in software engineering, data, cloud, and artificial intelligence.','cert.button':'View Certificate',
      'research.label':'Research & Publications','research.title':'Research &','research.heading':'Machine Learning, Data Analytics, & Information Systems','research.desc':'My research interests include machine learning, explainable AI, optimization, and information systems for solving real-world problems.','research.button':'View Research Proposal',
      'contact.label':'Open for Collaboration','contact.title':"Let's",'contact.accent':'Work Together','contact.desc':'Open to discussions on technology, backend development, research, system integration, and professional collaboration opportunities.','contact.button':'Send Message','contact.phone':'Phone','contact.base':'Based In',
      'footer.note':'Built with a focus on detail, performance, and usability.'
    }
  };

  const roleSets = {
    id: [
      { text: 'Backend Developer.', accent: false },
      { text: 'Problem Solver.', accent: false },
      { text: 'Software Developer.', accent: false },
    ],
    en: [
      { text: 'Backend Developer.', accent: false },
      { text: 'Problem Solver.', accent: false },
      { text: 'Software Developer.', accent: false },
    ]
  };

  let currentLanguage = localStorage.getItem('portfolio-language') || 'id';
  let roleIndex = 0;
  let roleTimer;
  const roleEl = document.getElementById('dynamic-role');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderRole(role) {
    if (!roleEl) return;
    roleEl.textContent = role.text;
    roleEl.classList.toggle('role-accent', role.accent);
  }

  function resetRoleCarousel() {
    clearInterval(roleTimer);
    roleIndex = 0;
    renderRole(roleSets[currentLanguage][roleIndex]);
    if (!roleEl || reducedMotion) return;
    roleTimer = setInterval(() => {
      roleEl.classList.remove('slide-in-left');
      roleEl.classList.add('slide-out-right');
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roleSets[currentLanguage].length;
        renderRole(roleSets[currentLanguage][roleIndex]);
        roleEl.classList.remove('slide-out-right');
        void roleEl.offsetWidth;
        roleEl.classList.add('slide-in-left');
      }, 470);
    }, 2500);
  }

  function setLanguage(lang) {
    currentLanguage = translations[lang] ? lang : 'id';
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = translations[currentLanguage][el.dataset.i18n];
      if (value) el.textContent = value;
    });
    document.querySelectorAll('.language-btn').forEach(btn => {
      const active = btn.dataset.lang === currentLanguage;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    localStorage.setItem('portfolio-language', currentLanguage);
    resetRoleCarousel();
    if (window.lucide) lucide.createIcons();
  }

  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  setLanguage(currentLanguage);
});
