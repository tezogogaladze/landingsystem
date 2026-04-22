/* ============================================================
   blocks.js — Block template renderers

   Each exported function receives a block config object and
   returns an HTML string. No DOM mutations happen here.

   To add a new block type:
     1. Write a render function below
     2. Register it in the REGISTRY map at the bottom

   Block types:
     hero          — product title, image, price, first CTA
     countdown     — urgency timer (sessionStorage-persisted)
     features-list — icon + text bullet rows
     cta           — full-width CTA button (repeatable)
     pain-solution — italic question + answer paragraph
     benefits-grid — 2-column numbered benefit cards
     text-section  — heading + body paragraph
     image-section — single image or placeholder
     video-section — embed iframe or placeholder
     specs-list    — technical specification rows
     testimonials  — star-rated customer review cards
     process-steps — icon + title + text step list
     form          — lead capture form (name, phone, etc.)
     callback-cta  — bordered "call me" card linking to form
   ============================================================ */

const Blocks = (() => {
  'use strict';

  const e = Utils.esc; // shorthand

  /* ── Shared partials ──────────────────────────────────────── */

  function btn(label, anchor) {
    return `<a href="${e(anchor)}" class="btn btn--primary btn--full btn--lg">${e(label)}</a>`;
  }

  function priceDisplay(price) {
    if (!price) return '';
    const cur = e(price.currency || '');
    return `
      <div class="price-display">
        ${price.old ? `<span class="price-display__old">${e(price.old)}${cur}</span>` : ''}
        <span class="price-display__new">${e(price.new)}${cur}</span>
      </div>`;
  }

  /* ── hero ─────────────────────────────────────────────────── */
  function hero(b) {
    const visual = b.image
      ? `<div class="block-hero__image-wrap">
           <img src="${e(b.image)}" alt="${e(b.title)}" class="block-hero__image">
         </div>`
      : `<div class="block-hero__img-placeholder">Product visual</div>`;

    return `
      <section class="block block-hero">
        <div class="lp-container">
          ${b.badge ? `<span class="block-hero__badge">${e(b.badge)}</span>` : ''}
          ${visual}
          <h1 class="block-hero__title">${e(b.title)}</h1>
          ${b.subtitle ? `<p class="block-hero__subtitle">${e(b.subtitle)}</p>` : ''}
          ${priceDisplay(b.price)}
          ${b.cta ? btn(b.cta.label, b.cta.anchor) : ''}
        </div>
      </section>`;
  }

  /* ── countdown ────────────────────────────────────────────── */
  function countdown(b) {
    const key = e(b.key || 'main');
    const hours = Number(b.hours || 24);
    return `
      <section class="block block-countdown block--dark">
        <div class="lp-container">
          <p class="block-countdown__label">${e(b.label || 'Offer ends in')}</p>
          <div class="countdown-timer"
               data-countdown-key="${key}"
               data-countdown-hours="${hours}">
            <div class="countdown-unit">
              <span class="countdown-unit__val" data-unit="d">00</span>
              <span class="countdown-unit__label">Days</span>
            </div>
            <span class="countdown-sep">:</span>
            <div class="countdown-unit">
              <span class="countdown-unit__val" data-unit="h">00</span>
              <span class="countdown-unit__label">Hours</span>
            </div>
            <span class="countdown-sep">:</span>
            <div class="countdown-unit">
              <span class="countdown-unit__val" data-unit="m">00</span>
              <span class="countdown-unit__label">Min</span>
            </div>
            <span class="countdown-sep">:</span>
            <div class="countdown-unit">
              <span class="countdown-unit__val" data-unit="s">00</span>
              <span class="countdown-unit__label">Sec</span>
            </div>
          </div>
        </div>
      </section>`;
  }

  /* ── features-list ────────────────────────────────────────── */
  function featuresList(b) {
    const rows = (b.items || []).map(item => `
      <li class="block-features__item">
        ${item.icon ? `<span class="block-features__icon" aria-hidden="true">${item.icon}</span>` : ''}
        <span class="block-features__text">${e(item.text)}</span>
      </li>`).join('');

    return `
      <section class="block block-features">
        <div class="lp-container">
          ${b.title ? `<h2 class="block-features__title">${e(b.title)}</h2>` : ''}
          <ul class="block-features__list">${rows}</ul>
        </div>
      </section>`;
  }

  /* ── cta ──────────────────────────────────────────────────── */
  function cta(b) {
    return `
      <section class="block block-cta">
        <div class="lp-container">
          ${btn(b.label, b.anchor)}
          ${b.subtext ? `<p class="block-cta__subtext">${e(b.subtext)}</p>` : ''}
        </div>
      </section>`;
  }

  /* ── pain-solution ────────────────────────────────────────── */
  function painSolution(b) {
    const img = b.image
      ? `<div class="block-pain-solution__image-wrap">
           <img src="${e(b.image)}" alt="" loading="lazy">
         </div>` : '';
    return `
      <section class="block block-pain-solution">
        <div class="lp-container">
          <p class="block-pain-solution__question">${e(b.question)}</p>
          <p class="block-pain-solution__answer">${e(b.answer)}</p>
          ${img}
        </div>
      </section>`;
  }

  /* ── benefits-grid ────────────────────────────────────────── */
  function benefitsGrid(b) {
    const cards = (b.items || []).map(item => `
      <li class="benefit-card">
        <span class="benefit-card__number">${e(item.number)}</span>
        <h3 class="benefit-card__title">${e(item.title)}</h3>
        <p class="benefit-card__text">${e(item.text)}</p>
      </li>`).join('');

    return `
      <section class="block block-benefits block--surface">
        <div class="lp-container">
          ${b.title ? `<h2 class="block-benefits__title">${e(b.title)}</h2>` : ''}
          <ul class="block-benefits__grid">${cards}</ul>
        </div>
      </section>`;
  }

  /* ── text-section ─────────────────────────────────────────── */
  function textSection(b) {
    const mod = b.align === 'center' ? ' block-text--center' : '';
    return `
      <section class="block block-text${mod}">
        <div class="lp-container">
          ${b.title ? `<h2 class="block-text__title">${e(b.title)}</h2>` : ''}
          ${b.body  ? `<p  class="block-text__body">${e(b.body)}</p>`   : ''}
        </div>
      </section>`;
  }

  /* ── image-section ────────────────────────────────────────── */
  function imageSection(b) {
    const inner = b.src
      ? `<img src="${e(b.src)}" alt="${e(b.alt || '')}" class="block-image__img" loading="lazy">`
      : `<div class="block-image__placeholder">Product image</div>`;
    return `
      <section class="block block-image">
        <div class="lp-container">
          <div class="block-image__wrap">${inner}</div>
          ${b.caption ? `<p class="block-image__caption">${e(b.caption)}</p>` : ''}
        </div>
      </section>`;
  }

  /* ── video-section ────────────────────────────────────────── */
  function videoSection(b) {
    const inner = b.src
      ? `<div class="block-video__embed-wrap">
           <iframe src="${e(b.src)}" allowfullscreen loading="lazy"
                   title="${e(b.title || 'Product video')}"></iframe>
         </div>`
      : `<div class="block-video__placeholder">
           <span class="block-video__placeholder-icon" aria-hidden="true">▶</span>
           <span class="block-video__placeholder-label">Video coming soon</span>
         </div>`;
    return `
      <section class="block block-video">
        <div class="lp-container">
          ${b.title ? `<h2 class="block-video__title">${e(b.title)}</h2>` : ''}
          ${inner}
        </div>
      </section>`;
  }

  /* ── specs-list ───────────────────────────────────────────── */
  function specsList(b) {
    const rows = (b.items || []).map(item =>
      `<li class="block-specs__item">${e(item)}</li>`
    ).join('');
    return `
      <section class="block block-specs">
        <div class="lp-container">
          ${b.title ? `<h2 class="block-specs__title">${e(b.title)}</h2>` : ''}
          <ul class="block-specs__list">${rows}</ul>
        </div>
      </section>`;
  }

  /* ── testimonials ─────────────────────────────────────────── */
  function testimonials(b) {
    const cards = (b.items || []).map(item => {
      const n     = Math.min(5, Math.max(0, item.rating || 5));
      const stars = '★'.repeat(n) + '☆'.repeat(5 - n);
      return `
        <div class="testimonial-card">
          <div class="testimonial-card__stars" aria-label="${n} out of 5 stars">${stars}</div>
          <p class="testimonial-card__text">"${e(item.text)}"</p>
          <p class="testimonial-card__author">— ${e(item.author)}</p>
        </div>`;
    }).join('');

    return `
      <section class="block block-testimonials block--surface">
        <div class="lp-container">
          ${b.title ? `<h2 class="block-testimonials__title">${e(b.title)}</h2>` : ''}
          <div class="block-testimonials__list">${cards}</div>
        </div>
      </section>`;
  }

  /* ── process-steps ────────────────────────────────────────── */
  function processSteps(b) {
    const steps = (b.items || []).map(item => `
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
          ${b.title ? `<h2 class="block-steps__title">${e(b.title)}</h2>` : ''}
          <ol class="block-steps__list">${steps}</ol>
        </div>
      </section>`;
  }

  /* ── form ─────────────────────────────────────────────────── */
  function form(b) {
    const idAttr = b.id ? ` id="${e(b.id)}"` : '';
    const fields = (b.fields || []).map(f => `
      <div class="form-field">
        <input
          type="${e(f.type || 'text')}"
          name="${e(f.name)}"
          placeholder="${e(f.placeholder || '')}"
          ${f.required    ? 'required'                              : ''}
          ${f.autocomplete ? `autocomplete="${e(f.autocomplete)}"` : ''}
          class="form-input"
          aria-label="${e(f.placeholder || f.name)}"
        >
      </div>`).join('');

    return `
      <section class="block block-form"${idAttr}>
        <div class="lp-container">
          ${b.title    ? `<h2 class="block-form__title">${e(b.title)}</h2>`          : ''}
          ${b.subtitle ? `<p  class="block-form__subtitle">${e(b.subtitle)}</p>`     : ''}
          <form class="block-form__form" novalidate>
            ${fields}
            <button type="submit" class="btn btn--primary btn--full btn--lg">
              ${e(b.submitLabel || 'Submit')}
            </button>
          </form>
          ${b.note ? `<p class="block-form__note">${e(b.note)}</p>` : ''}
        </div>
      </section>`;
  }

  /* ── callback-cta ─────────────────────────────────────────── */
  function callbackCta(b) {
    return `
      <section class="block block-callback">
        <div class="lp-container">
          <div class="block-callback__card">
            ${b.title    ? `<p class="block-callback__title">${e(b.title)}</p>`    : ''}
            ${b.subtitle ? `<p class="block-callback__sub">${e(b.subtitle)}</p>`  : ''}
            ${btn(b.label, b.anchor)}
          </div>
        </div>
      </section>`;
  }

  /* ── Registry ─────────────────────────────────────────────── */
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
