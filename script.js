const header = document.getElementById('header');
const progress = document.getElementById('progress');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 70);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  mobileNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add('visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');

document.querySelectorAll('.gallery-item').forEach((button) => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    lightboxImage.src = image.src.replace(/w=\d+/, 'w=1800');
    lightboxImage.alt = image.alt;
    if (typeof lightbox.showModal === 'function') {
      lightbox.showModal();
    }
  });
});

if (closeLightbox) closeLightbox.addEventListener('click', () => lightbox.close());
if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}

const form = document.getElementById('quoteForm');
const output = document.getElementById('generatedMessage');
const result = document.getElementById('formResult');
const copyButton = document.getElementById('copyMessage');
const copyFeedback = document.getElementById('copyFeedback');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = document.getElementById('name').value.trim();
    const car = document.getElementById('car').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    output.value = `Olá! Meu nome é ${name}. Gostaria de receber uma orientação sobre ${service.toLowerCase()} para meu veículo (${car}).${message ? `\n\nDetalhes adicionais: ${message}` : ''}\n\nPoderiam me explicar como funcionaria o atendimento e o orçamento?`;
    result.hidden = false;
    copyFeedback.textContent = '';
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      copyFeedback.textContent = 'Mensagem copiada com sucesso.';
    } catch {
      output.focus();
      output.select();
      copyFeedback.textContent = 'Selecione o texto acima e copie manualmente.';
    }
  });
}
