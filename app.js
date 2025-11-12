/* ========= Portfolio Filter (safe) ========= */
(function () {
  const filterBar = document.querySelector('.filters');
  const cards = Array.from(document.querySelectorAll('.grid .card'));
  if (!filterBar || !cards.length) return;

  const ALL = '*';

  const apply = (key = ALL) => {
    cards.forEach(card => {
      // cat 없으면 기본적으로 보이게
      const cats = (card.dataset.cat || ALL)
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const show = key === ALL || cats.includes(key);
      card.classList.toggle('is-hidden', !show);
    });
  };

  const setActive = (btn) => {
    filterBar.querySelectorAll('.filter').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  };

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    const key = btn.dataset.filter || ALL;
    setActive(btn);
    apply(key);
  });

  // 초기 적용 (활성 버튼 없으면 전체)
  const current = filterBar.querySelector('.filter.is-active')?.dataset.filter || ALL;
  apply(current);
})();

/* ========= Core UX: JS flag, Reveal on scroll, Smooth scroll, Mobile nav ========= */
(function () {
  // 0) Flag <html> that JS is running (for progressive enhancement)
  document.documentElement.classList.add('has-js');

  // 1) Reveal-on-scroll
  const items = Array.from(document.querySelectorAll('.reveal-up'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -10% 0px' });
    items.forEach(el => io.observe(el));
  } else {
    // Fallback: show everything
    items.forEach(el => el.classList.add('in'));
  }

  // 2) Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav after click
        const nav = document.querySelector('.nav');
        nav?.classList.remove('open');
      }
    });
  });

  // 3) Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle?.addEventListener('click', () => {
    nav?.classList.toggle('open');
  });
})();


// // ✅ Project Summary Floating Animation (No Conflict)
// (function () {
//   const floats = document.querySelectorAll('.summary-floating');
//   if (!floats.length) return;

//   floats.forEach((card, i) => {
//     card.style.opacity = 0;
//     card.style.transform = 'translateY(20px)';
//     setTimeout(() => {
//       card.style.transition = '0.8s ease';
//       card.style.opacity = 1;
//       card.style.transform = 'translateY(0)';
//     }, 400 * (i + 1));
//   });
// })();


document.addEventListener("DOMContentLoaded", () => {
  const gauges = document.querySelectorAll(".gauge-fill");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const percent = fill.getAttribute("data-percent");
        fill.style.width = percent + "%";
      }
    });
  }, { threshold: 0.3 });

  gauges.forEach(gauge => observer.observe(gauge));
});


document.addEventListener("DOMContentLoaded", () => {
  const gauges = document.querySelectorAll(".gauge-fill");
  const labels = document.querySelectorAll(".gauge-label");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const percent = parseInt(fill.dataset.percent);
        fill.style.width = percent + "%";

        // 해당 게이지의 label 찾기
        const label = fill.closest(".gauge-item").querySelector(".gauge-label");
        const target = parseInt(label.dataset.target);
        let count = 0;

        const counter = setInterval(() => {
          count++;
          label.textContent = count + "%";
          if (count >= target) {
            clearInterval(counter);
          }
        }, 20); // 숫자 증가 속도 조절 (20ms마다 1씩 증가)
      }
    });
  }, { threshold: 0.3 });

  gauges.forEach(gauge => observer.observe(gauge));
});
