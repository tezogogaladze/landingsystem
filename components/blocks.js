/* ============================================================
   blocks.js — Block template renderers

   SCHEMA (every block received here follows this shape):
   ┌─────────────────────────────────────────────────────────┐
   │  {                                                      │
   │    id:      string   unique block ID                    │
   │    type:    string   block type key                     │
   │    order:   number   render position (1-based)          │
   │    enabled: boolean  false = skip (filtered upstream)   │
   │    content: object   all editorial / copy fields        │
   │    media:   object   all asset URLs (images, video)     │
   │    config:  object   type-specific technical options    │
   │  }                                                      │
   └─────────────────────────────────────────────────────────┘

   Renderer filters disabled blocks and sorts by order BEFORE
   calling Blocks.render(), so individual functions can assume
   the block is visible and order is already correct.

   Google Sheets mapping:
     content fields  → "Blocks" sheet columns prefixed content_*
     media fields    → "Blocks" sheet columns prefixed media_*
     config fields   → "Blocks" sheet columns prefixed config_*
     items arrays    → separate "Items" sheet with block_id FK

   To add a new block type:
     1. Write a render function below (destructure c/m/cfg)
     2. Register it in REGISTRY at the bottom
   ============================================================ */

const Blocks = (() => {
  'use strict';

  const e = Utils.esc;

  /* ── Shared partials ────────────────────────────────────── */

  function btn(label, anchor) {
    return `
      <a href="${e(anchor)}" class="btn btn--primary btn--full btn--lg">
        ${e(label)}<span class="btn__arrow" aria-hidden="true"> →</span>
      </a>`;
  }

  function priceDisplay(c) {
    if (!c || !c.priceNew) return '';
    const cur = e(c.priceCurrency || '');
    const oldLbl = e(c.priceOldLabel || 'ძველი ფასი');
    const newLbl = e(c.priceNewLabel || 'ახალი ფასი');
    return `
      <div class="price-display">
        ${c.priceOld ? `
          <div class="price-display__row price-display__row--old">
            <span class="price-display__label">${oldLbl}</span>
            <span class="price-display__old">${e(c.priceOld)}${cur}</span>
          </div>` : ''}
        <div class="price-display__row price-display__row--main">
          <span class="price-display__label price-display__label--main">${newLbl}</span>
          <span class="price-display__new">${e(c.priceNew)}${cur}</span>
        </div>
      </div>`;
  }

  /* ── hero ───────────────────────────────────────────────── */
  function hero(b) {
    const c   = b.content || {};
    const m   = b.media   || {};

    const visual = m.image
      ? `<div class="block-hero__image-wrap">
           <img src="${e(m.image)}" alt="${e(c.title)}" class="block-hero__image">
         </div>`
      : `<div class="block-hero__img-placeholder">პროდუქტის ვიზუალი</div>`;

    return `
      <section class="block block-hero">
        <div class="lp-container">
          ${c.badge ? `<span class="block-hero__badge">${e(c.badge)}</span>` : ''}
          ${visual}
          <h1 class="block-hero__title">${e(c.title)}</h1>
          ${c.subtitle ? `<p class="block-hero__subtitle">${e(c.subtitle)}</p>` : ''}
          ${priceDisplay(c)}
          ${c.ctaLabel ? btn(c.ctaLabel, c.ctaAnchor || '#') : ''}
        </div>
      </section>`;
  }

  /* ── countdown ──────────────────────────────────────────── */
  function countdown(b) {
    const c   = b.content || {};
    const cfg = b.config  || {};
    const key   = e(cfg.key   || b.id || 'main');
    const hours = Number(cfg.hours || 24);

    return `
      <section class="block block-countdown block--dark">
        <div class="lp-container">
          <p class="block-countdown__label">${e(c.label || 'აქციის დასრულებამდე დარჩა')}</p>
          <div class="countdown-timer"
               data-countdown-key="${key}"
               data-countdown-hours="${hours}">
            <div class="countdown-unit">
              <span class="countdown-unit__val" data-unit="d">00</span>
              <span class="countdown-unit__label">დღე</span>
            </div>
            <span class="countdown-sep">:</span>
            <div class="countdown-unit">
              <span class="countdown-unit__val" data-unit="h">00</span>
              <span class="countdown-unit__label">სთ</span>
            </div>
            <span class="countdown-sep">:</span>
            <div class="countdown-unit">
              <span class="countdown-unit__val" data-unit="m">00</span>
              <span class="countdown-unit__label">წთ</span>
            </div>
            <span class="countdown-sep">:</span>
            <div class="countdown-unit">
              <span class="countdown-unit__val" data-unit="s">00</span>
              <span class="countdown-unit__label">წმ</span>
            </div>
          </div>
        </div>
      </section>`;
  }

  /* ── features-list ──────────────────────────────────────── */
  function featuresList(b) {
    const c = b.content || {};
    const rows = (c.items || []).map(item => `
      <li class="block-features__item">
        ${item.icon ? `<span class="block-features__icon" aria-hidden="true">${item.icon}</span>` : ''}
        <span class="block-features__text">${e(item.text)}</span>
      </li>`).join('');

    return `
      <section class="block block-features">
        <div class="lp-container">
          ${c.title ? `<h2 class="block-features__title">${e(c.title)}</h2>` : ''}
          <ul class="block-features__list">${rows}</ul>
        </div>
      </section>`;
  }

  /* ── cta ────────────────────────────────────────────────── */
  function cta(b) {
    const c = b.content || {};
    return `
      <section class="block block-cta">
        <div class="lp-container">
          ${btn(c.label, c.anchor || '#')}
          ${c.subtext ? `<p class="block-cta__subtext">${e(c.subtext)}</p>` : ''}
        </div>
      </section>`;
  }

  /* ── pain-solution ──────────────────────────────────────── */
  function painSolution(b) {
    const c = b.content || {};
    const m = b.media   || {};
    const img = m.image
      ? `<div class="block-pain-solution__image-wrap">
           <img src="${e(m.image)}" alt="" loading="lazy">
         </div>` : '';

    return `
      <section class="block block-pain-solution">
        <div class="lp-container">
          <p class="block-pain-solution__question">${e(c.question)}</p>
          <p class="block-pain-solution__answer">${e(c.answer)}</p>
          ${img}
        </div>
      </section>`;
  }

  /* ── benefits-grid ──────────────────────────────────────── */
  function benefitsGrid(b) {
    const c = b.content || {};
    const cards = (c.items || []).map(item => `
      <li class="benefit-card">
        <span class="benefit-card__number">${e(item.number)}</span>
        <h3 class="benefit-card__title">${e(item.title)}</h3>
        <p class="benefit-card__text">${e(item.text)}</p>
      </li>`).join('');

    return `
      <section class="block block-benefits block--surface">
        <div class="lp-container">
          ${c.title ? `<h2 class="block-benefits__title">${e(c.title)}</h2>` : ''}
          <ul class="block-benefits__grid">${cards}</ul>
        </div>
      </section>`;
  }

  /* ── text-section ───────────────────────────────────────── */
  function textSection(b) {
    const c   = b.content || {};
    const cfg = b.config  || {};
    const mod = cfg.align === 'center' ? ' block-text--center' : '';

    return `
      <section class="block block-text${mod}">
        <div class="lp-container">
          ${c.title ? `<h2 class="block-text__title">${e(c.title)}</h2>` : ''}
          ${c.body  ? `<p  class="block-text__body">${e(c.body)}</p>`   : ''}
        </div>
      </section>`;
  }

  /* ── image-section ──────────────────────────────────────── */
  function imageSection(b) {
    const c = b.content || {};
    const m = b.media   || {};

    const inner = m.image
      ? `<img src="${e(m.image)}" alt="${e(c.alt || '')}" class="block-image__img" loading="lazy">`
      : `<div class="block-image__placeholder">
           <span class="block-image__placeholder-icon" aria-hidden="true">📷</span>
           <span class="block-image__placeholder-text">${e(c.alt || 'პროდუქტის სურათი')}</span>
         </div>`;

    return `
      <section class="block block-image">
        <div class="lp-container">
          <div class="block-image__wrap">${inner}</div>
          ${c.caption ? `<p class="block-image__caption">${e(c.caption)}</p>` : ''}
        </div>
      </section>`;
  }

  /* ── video-section ──────────────────────────────────────── */
  function videoSection(b) {
    const c = b.content || {};
    const m = b.media   || {};

    const inner = m.video
      ? `<div class="block-video__embed-wrap">
           <iframe src="${e(m.video)}" allowfullscreen loading="lazy"
                   title="${e(c.title || 'ვიდეო')}"></iframe>
         </div>`
      : `<div class="block-video__placeholder">
           <span class="block-video__placeholder-icon" aria-hidden="true">▶</span>
           <span class="block-video__placeholder-label">ვიდეო მალე</span>
         </div>`;

    return `
      <section class="block block-video">
        <div class="lp-container">
          ${c.title ? `<h2 class="block-video__title">${e(c.title)}</h2>` : ''}
          ${inner}
        </div>
      </section>`;
  }

  /* ── specs-list ─────────────────────────────────────────── */
  function specsList(b) {
    const c = b.content || {};
    const rows = (c.items || []).map(item =>
      `<li class="block-specs__item">${e(item)}</li>`
    ).join('');

    return `
      <section class="block block-specs">
        <div class="lp-container">
          ${c.title ? `<h2 class="block-specs__title">${e(c.title)}</h2>` : ''}
          <ul class="block-specs__list">${rows}</ul>
        </div>
      </section>`;
  }

  /* ── testimonials ───────────────────────────────────────── */
  function testimonials(b) {
    const c = b.content || {};
    const cards = (c.items || []).map(item => {
      const n     = Math.min(5, Math.max(0, item.rating || 5));
      const stars = '★'.repeat(n) + '☆'.repeat(5 - n);
      return `
        <div class="testimonial-card">
          <div class="testimonial-card__stars" aria-label="${n} 5-დან">${stars}</div>
          <p class="testimonial-card__text">"${e(item.text)}"</p>
          <p class="testimonial-card__author">— ${e(item.author)}</p>
        </div>`;
    }).join('');

    return `
      <section class="block block-testimonials block--surface">
        <div class="lp-container">
          ${c.title ? `<h2 class="block-testimonials__title">${e(c.title)}</h2>` : ''}
          <div class="block-testimonials__list">${cards}</div>
        </div>
      </section>`;
  }

  /* ── process-steps ──────────────────────────────────────── */
  function processSteps(b) {
    const c = b.content || {};
    const steps = (c.items || []).map(item => `
      <li class="step-item">
        <div class="step-item__icon" aria-hidden="true">${item.icon || '●'}</div>
        <div class="step-item__body">
          <h3 class="step-item__title">${e(item.title)}</h3>
          <p class="step-item__text">${e(item.text)}</p>
        </div>
      </li>`).join('');

    return `
      <section class="block block-steps">
        <div class="lp-container">
          ${c.title ? `<h2 class="block-steps__title">${e(c.title)}</h2>` : ''}
          <ol class="block-steps__list">${steps}</ol>
        </div>
      </section>`;
  }

  /* ── form ───────────────────────────────────────────────── */
  function form(b) {
    const c   = b.content || {};
    const cfg = b.config  || {};

    /* config.formId is the HTML anchor (<section id="...">)
       b.id is the block's unique data ID — keep them separate */
    const sectionId = cfg.formId ? ` id="${e(cfg.formId)}"` : '';

    const fields = (c.fields || []).map(f => `
      <div class="form-field">
        <input
          type="${e(f.type || 'text')}"
          name="${e(f.name)}"
          placeholder="${e(f.placeholder || '')}"
          ${f.required     ? 'required'                              : ''}
          ${f.autocomplete ? `autocomplete="${e(f.autocomplete)}"` : ''}
          class="form-input"
          aria-label="${e(f.placeholder || f.name)}"
        >
      </div>`).join('');

    return `
      <section class="block block-form"${sectionId}>
        <div class="lp-container">
          ${c.title    ? `<h2 class="block-form__title">${e(c.title)}</h2>`       : ''}
          ${c.subtitle ? `<p  class="block-form__subtitle">${e(c.subtitle)}</p>`  : ''}
          <form class="block-form__form" novalidate>
            ${fields}
            <button type="submit" class="btn btn--primary btn--full btn--lg">
              ${e(c.submitLabel || 'გაგზავნა')}
            </button>
          </form>
          ${c.note ? `<p class="block-form__note">${e(c.note)}</p>` : ''}
        </div>
      </section>`;
  }

  /* ── callback-cta ───────────────────────────────────────── */
  function callbackCta(b) {
    const c = b.content || {};
    return `
      <section class="block block-callback">
        <div class="lp-container">
          <div class="block-callback__card">
            ${c.title    ? `<p class="block-callback__title">${e(c.title)}</p>`   : ''}
            ${c.subtitle ? `<p class="block-callback__sub">${e(c.subtitle)}</p>`  : ''}
            ${btn(c.label, c.anchor || '#')}
          </div>
        </div>
      </section>`;
  }

  /* ── contact-info ───────────────────────────────────────── */
  function contactInfo(b) {
    const c = b.content || {};

    const items = (c.items || []).map(item => {
      const val = item.href
        ? `<a href="${e(item.href)}" class="block-contact__value block-contact__value--link">${e(item.value)}</a>`
        : `<span class="block-contact__value">${e(item.value)}</span>`;
      return `
        <li class="block-contact__item">
          ${item.icon ? `<span class="block-contact__icon" aria-hidden="true">${item.icon}</span>` : ''}
          <div class="block-contact__body">
            ${item.label ? `<span class="block-contact__label">${e(item.label)}</span>` : ''}
            ${val}
          </div>
        </li>`;
    }).join('');

    const links = (c.links || []).map(link =>
      `<a href="${e(link.href || '#')}" class="block-contact__link">${e(link.label)}</a>`
    ).join('');

    return `
      <section class="block block-contact block--dark">
        <div class="lp-container">
          ${c.title ? `<p class="block-contact__title">${e(c.title)}</p>` : ''}
          ${items ? `<ul class="block-contact__list">${items}</ul>` : ''}
          ${links ? `<hr class="block-contact__divider"><nav class="block-contact__links">${links}</nav>` : ''}
        </div>
      </section>`;
  }

  /* ── Registry ───────────────────────────────────────────── */
  const REGISTRY = {
    'hero':           hero,
    'countdown':      countdown,
    'features-list':  featuresList,
    'cta':            cta,
    'pain-solution':  painSolution,
    'benefits-grid':  benefitsGrid,
    'text-section':   textSection,
    'image-section':  imageSection,
    'video-section':  videoSection,
    'specs-list':     specsList,
    'testimonials':   testimonials,
    'process-steps':  processSteps,
    'form':           form,
    'callback-cta':   callbackCta,
    'contact-info':   contactInfo,
  };

  return {
    render(block) {
      const fn = REGISTRY[block.type];
      if (!fn) {
        console.warn('[Blocks] Unknown block type: "' + block.type + '"');
        return '';
      }
      return fn(block);
    }
  };
})();
