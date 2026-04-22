/* ============================================================
   data/pages/demo.js — Page data: FitPlan Pro

   Demonstrates a second page with a different product, theme
   colour, and block mix. Same normalised schema as shavlego.js.
   ============================================================ */

window.PAGE_DATA = {

  /* ── Page-level (→ "Pages" sheet row) ─────────────────── */
  slug: 'demo',

  meta: {
    title:       'FitPlan Pro — 30-დღიანი ფიტნეს პროგრამა',
    description: 'პერსონალიზებული ვარჯიშის გეგმა, რომელიც სახლიდან გაუსვლელად მუშაობს.',
    lang:        'ka',
    favicon:     null,
  },

  theme: {
    primaryColor: '#7c3aed',
  },

  settings: {
    currency:  '₾',
    ctaAnchor: '#signup-form',
  },


  /* ── Blocks ────────────────────────────────────────────── */
  blocks: [

    /* 01 — Hero ─────────────────────────────────────────── */
    {
      id:      'demo_hero',
      type:    'hero',
      order:   1,
      enabled: true,
      content: {
        badge:         '🔥 დაწყება — 30 დღე, სახლიდან',
        title:         'FitPlan Pro',
        subtitle:      'პერსონალიზებული ვარჯიშის გეგმა — შენი სხეულისთვის, შენი ტემპისთვის',
        priceOld:      '149',
        priceNew:      '79',
        priceCurrency: '₾',
        priceOldLabel: 'ჩვეულებრივი ფასი',
        priceNewLabel: 'სპეციალური ფასი',
        ctaLabel:      'პროგრამის დაწყება',
        ctaAnchor:     '#signup-form',
      },
      media: {
        image: null,
      },
      config: {},
    },

    /* 02 — Countdown ────────────────────────────────────── */
    {
      id:      'demo_countdown',
      type:    'countdown',
      order:   2,
      enabled: true,
      content: {
        label: '⏰ შეთავაზება სრულდება',
      },
      media: {},
      config: {
        key:   'fitplan',
        hours: 48,
      },
    },

    /* 03 — Features list ────────────────────────────────── */
    {
      id:      'demo_features',
      type:    'features-list',
      order:   3,
      enabled: true,
      content: {
        title: 'რა შედის პაკეტში?',
        items: [
          { icon: '📅', text: '30 სრულად სტრუქტურირებული ვარჯიშის დღე' },
          { icon: '🥗', text: 'კვების გეგმა — კვირა-კვირა, შენი მიზნისთვის' },
          { icon: '📱', text: 'მობილური PDF + ვიდეო გზამკვლევი' },
          { icon: '💬', text: 'ხელმისაწვდომობა WhatsApp-ით — 24/7' },
          { icon: '🔁', text: 'სამუდამო განახლება — ერთი გადახდა' },
        ],
      },
      media: {},
      config: {},
    },

    /* 04 — CTA 1 ────────────────────────────────────────── */
    {
      id:      'demo_cta_01',
      type:    'cta',
      order:   4,
      enabled: true,
      content: {
        label:   '💪 ახლა დავიწყოთ — 79₾',
        anchor:  '#signup-form',
        subtext: 'მყისიერი წვდომა შეძენისთანავე',
      },
      media: {},
      config: {},
    },

    /* 05 — Pain / solution 1 ────────────────────────────── */
    {
      id:      'demo_ps_01',
      type:    'pain-solution',
      order:   5,
      enabled: true,
      content: {
        question: '😩 სპორტდარბაზში ფული გახარჯე, შედეგი კი — ნული?',
        answer:   'FitPlan Pro მუშაობს სახლიდან — 20 კვადრატი, ნება, და ჩვენი გეგმა. სხვა არაფერი.',
      },
      media: { image: null },
      config: {},
    },

    /* 06 — Benefits grid ────────────────────────────────── */
    {
      id:      'demo_benefits',
      type:    'benefits-grid',
      order:   6,
      enabled: true,
      content: {
        title: 'შედეგები 30 დღეში',
        items: [
          { number: '−5kg',  title: 'საშუალო წონის კლება',  text: 'კლიენტების 83%-ს პირველ თვეში' },
          { number: '30',    title: 'ვარჯიშის დღე',          text: 'სტრუქტურირებული, პროგრესული' },
          { number: '20min', title: 'ყოველდღიური სეანსი',   text: 'დრო მინიმალური, შედეგი — ჭეშმარიტი' },
          { number: '0₾',    title: 'სპორტდარბაზის ტარიფი', text: 'საჭირო არ არის — ოთახი გამოგადგება' },
        ],
      },
      media: {},
      config: {},
    },

    /* 07 — Video ────────────────────────────────────────── */
    {
      id:      'demo_video',
      type:    'video-section',
      order:   7,
      enabled: true,
      content: {
        title: '🎬 ნახე, როგორ მუშაობს',
      },
      media: {
        video: null,
      },
      config: {},
    },

    /* 08 — Testimonials ─────────────────────────────────── */
    {
      id:      'demo_reviews',
      type:    'testimonials',
      order:   8,
      enabled: true,
      content: {
        title: '⭐ ისინი უკვე შედეგზე არიან',
        items: [
          { text: 'მე ვცდი ყველაფერი — FitPlan-ი ერთადერთია, სადაც ბოლომდე მივედი.', author: 'ა. გ., თბილისი',  rating: 5 },
          { text: '30 დღეში 6 კგ ჩამოვრდი. ახლა მე-2 რაუნდი მაქვს დაწყებული.',      author: 'ნ. კ., ბათუმი',   rating: 5 },
          { text: 'კვების გეგმა ოქრო ღირს — სხვა ადგილას ამდენს ვერ ნახავ.',         author: 'გ. ჯ., ქუთაისი', rating: 5 },
        ],
      },
      media: {},
      config: {},
    },

    /* 09 — Process steps ────────────────────────────────── */
    {
      id:      'demo_steps',
      type:    'process-steps',
      order:   9,
      enabled: true,
      content: {
        title: 'მარტივი დაწყება',
        items: [
          { icon: '💳', title: 'გადაიხდი',            text: '79₾ — ერთი გადახდა, სამუდამო წვდომა' },
          { icon: '📥', title: 'ჩამოტვირთე',          text: 'PDF + ვიდეო — მყისიერად' },
          { icon: '🔥', title: 'დაიწყე ვარჯიში',      text: 'პირველი ვარჯიში — დღესვე' },
        ],
      },
      media: {},
      config: {},
    },

    /* 10 — Text (guarantee) ─────────────────────────────── */
    {
      id:      'demo_txt_guarantee',
      type:    'text-section',
      order:   10,
      enabled: true,
      content: {
        title: '🛡️ 14-დღიანი გარანტია',
        body:  'თუ შედეგი არ გამოჩნდა 14 დღეში — გიბრუნებთ ფულს. სრულად. კითხვების გარეშე.',
      },
      media: {},
      config: { align: 'center' },
    },

    /* 11 — CTA 2 ────────────────────────────────────────── */
    {
      id:      'demo_cta_02',
      type:    'cta',
      order:   11,
      enabled: true,
      content: {
        label:   '🚀 79₾-ად დავიწყე',
        anchor:  '#signup-form',
        subtext: 'შეზღუდული ადგილები — ახლა ან ვეღარ',
      },
      media: {},
      config: {},
    },

    /* 12 — Form ─────────────────────────────────────────── */
    {
      id:      'demo_form',
      type:    'form',
      order:   12,
      enabled: true,
      content: {
        title:       '📋 დარეგისტრირდი',
        subtitle:    'ჩვენ გამოგიგზავნით წვდომის ბმულს',
        submitLabel: '✅ შეძენა — 79₾',
        note:        '🔒 შენი მონაცემები დაცულია.',
        fields: [
          { name: 'name',  type: 'text',  placeholder: 'სახელი',           required: true,  autocomplete: 'given-name' },
          { name: 'email', type: 'email', placeholder: 'ელ-ფოსტა',         required: true,  autocomplete: 'email'      },
          { name: 'phone', type: 'tel',   placeholder: 'ტელეფონის ნომერი', required: false, autocomplete: 'tel'        },
        ],
      },
      media: {},
      config: {
        formId: 'signup-form',
      },
    },

    /* 13 — Contact info ─────────────────────────────────── */
    {
      id:      'demo_contact',
      type:    'contact-info',
      order:   13,
      enabled: true,
      content: {
        title: 'FitPlan Pro — კონტაქტი',
        items: [
          { icon: '📧', label: 'ელ-ფოსტა', value: 'hello@fitplanpro.ge', href: 'mailto:hello@fitplanpro.ge' },
          { icon: '📞', label: 'მხარდაჭერა', value: '+995 555 00 00 00',  href: 'tel:+995555000000'          },
          { icon: '🌐', label: 'ვებსაიტი',   value: 'fitplanpro.ge',      href: 'https://fitplanpro.ge'      },
        ],
        links: [
          { label: 'წესები და პირობები',         href: '#' },
          { label: 'კონფიდენციალობის პოლიტიკა', href: '#' },
        ],
      },
      media: {},
      config: {},
    },

  ], /* end blocks */

}; /* end PAGE_DATA */
