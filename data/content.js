/* ============================================================
   data/content.js — Page content

   Edit this file to change any text, prices, blocks, or
   contact details on the landing page.

   Each block has:
     type    — which template to use (see components/blocks.js)
     order   — render position (1 = first on page)
     enabled — set to false to hide a block without deleting it
     content — all text / copy fields
     media   — image or video URLs (null = placeholder shown)
     config  — technical options (form ID, countdown settings)
   ============================================================ */

window.PAGE_DATA = {

  meta: {
    title:       'შავლეგო — გაპარსვის პრო კომპლექტი',
    description: '5-თავაკიანი გაპარსვის სისტემა, რომელიც თქვენს სახეს სრულ სირბილეს ანიჭებს.',
    lang:        'ka',
  },

  theme: {
    primaryColor: '#e63946',
  },

  blocks: [

    /* 01 — Hero ─────────────────────────────────────────── */
    {
      type:    'hero',
      order:   1,
      enabled: true,
      content: {
        badge:         '🔥 სპეციალური შეთავაზება — შეზღუდული დრო!',
        title:         'შავლეგო',
        subtitle:      'გაპარსვის 5-თავაკიანი ინოვაციური სისტემა — სიმრბილე, სიზუსტე, სტილი',
        priceOld:      '136',
        priceNew:      '99',
        priceCurrency: '₾',
        priceOldLabel: 'ძველი ფასი',
        priceNewLabel: 'ახალი ფასი',
        ctaLabel:      'შეკვეთის გაფორმება',
        ctaAnchor:     '#order-form',
      },
      media:  { image: 'https://picsum.photos/seed/shavlego1/800/600' },
      config: {},
    },

    /* 02 — Countdown ────────────────────────────────────── */
    {
      type:    'countdown',
      order:   2,
      enabled: true,
      content: { label: '⏳ ფასდაკლება სრულდება — გამოიყენე სანამ ხელმისაწვდომია' },
      media:   {},
      config:  { key: 'shavlego', hours: 24 },
    },

    /* 03 — Product image 1 ──────────────────────────────── */
    {
      type:    'image-section',
      order:   3,
      enabled: true,
      content: { alt: 'შავლეგო — 5-თავაკიანი სისტემა, პროდუქტის ახლო კადრი' },
      media:   { image: 'https://picsum.photos/seed/shavlego2/800/500' },
      config:  {},
    },

    /* 04 — Features ─────────────────────────────────────── */
    {
      type:    'features-list',
      order:   4,
      enabled: true,
      content: {
        title: 'რატომ შავლეგო?',
        items: [
          { icon: '⚡', text: '5-თავაკიანი სისტემა — ყოველი კვეთა ზუსტი და კომფორტული' },
          { icon: '💧', text: 'ალოე ვერა და ვიტამინი E — კანის ღრმა დამცველი ბარიერი' },
          { icon: '🔄', text: 'FlexGlide® ტექნოლოგია — თავი ეგუება სახის კონტურს' },
          { icon: '⏱', text: '3 კვირა ერთ შაშხანაზე — ეკონომიური და პრაქტიკული' },
          { icon: '✅', text: 'ჰიპოალერგიული — მგრძნობიარე კანისთვის შემოწმებული' },
        ],
      },
      media:  {},
      config: {},
    },

    /* 05 — CTA 1 ────────────────────────────────────────── */
    {
      type:    'cta',
      order:   5,
      enabled: true,
      content: {
        label:   '🛒 შეკვეთის გაფორმება — 99₾',
        anchor:  '#order-form',
        subtext: 'უფასო მიწოდება მთელ საქართველოში',
      },
      media:  {},
      config: {},
    },

    /* 06 — Product image 2 ──────────────────────────────── */
    {
      type:    'image-section',
      order:   6,
      enabled: true,
      content: { alt: 'კომფორტული გაპარსვა — შავლეგო სახმარებლად' },
      media:   { image: 'https://picsum.photos/seed/shavlego3/800/500' },
      config:  {},
    },

    /* 07 — Pain / solution 1 ────────────────────────────── */
    {
      type:    'pain-solution',
      order:   7,
      enabled: true,
      content: {
        question: '😩 გაპარსვის შემდეგ გწვა და ახასიათებს გამოწითლება?',
        answer:   'შავლეგოს 5 თავაკი ამცირებს სიხშირეს — ნაკლები გადასვლა, ნაკლები გაღიზიანება. ალოე ვერა კი კანს მყისიერ სიმშვიდეს ანიჭებს.',
      },
      media:  {},
      config: {},
    },

    /* 08 — Pain / solution 2 ────────────────────────────── */
    {
      type:    'pain-solution',
      order:   8,
      enabled: true,
      content: {
        question: '💸 ფულს ხარჯავ სალონზე რეგულარულად?',
        answer:   '99₾-ით — ერთი საათობრივი ვიზიტის ფასად — ხარისხიანი გაპარსვა სახლში შეგიძლია. ყოველ კვირა, ყოველ დღე.',
      },
      media:  {},
      config: {},
    },

    /* 09 — Benefits ─────────────────────────────────────── */
    {
      type:    'benefits-grid',
      order:   9,
      enabled: true,
      content: {
        title: 'რას იღებ 99₾-ად',
        items: [
          { number: '5X',  title: 'უფრო სუფთა კვეთა',    text: '5 თავაკი ერთდროულად — ტყვია-გამტარი სიზუსტე' },
          { number: '3×',  title: 'ნაკლები გაღიზიანება', text: 'ხახვი მინიმალური — კანი ბედნიერი' },
          { number: '21+', title: 'დღე ერთ შაშხანაზე',   text: 'სამ კვირამდე ეკონომიური გამოყენება' },
          { number: '0',   title: 'ვიზიტი სალონში',      text: 'სახლიდან გაუსვლელად — პროფესიული შედეგი' },
        ],
      },
      media:  {},
      config: {},
    },

    /* 10 — CTA 2 ────────────────────────────────────────── */
    {
      type:    'cta',
      order:   10,
      enabled: true,
      content: {
        label:   '🎯 ახლავე შეუკვეთე',
        anchor:  '#order-form',
        subtext: 'მარაგი შეზღუდულია — ნუ გადადებ',
      },
      media:  {},
      config: {},
    },

    /* 11 — Product image 3 ──────────────────────────────── */
    {
      type:    'image-section',
      order:   11,
      enabled: true,
      content: { alt: '5 თავაკი ახლოდან — სიმახვილე, რომელიც ჩანს' },
      media:   { image: 'https://picsum.photos/seed/shavlego4/800/500' },
      config:  {},
    },

    /* 12 — Video ────────────────────────────────────────── */
    {
      type:    'video-section',
      order:   12,
      enabled: true,
      content: { title: '🎬 ნახე სად განსხვავდება' },
      media:   { video: null },
      config:  {},
    },

    /* 13 — Brand story ──────────────────────────────────── */
    {
      type:    'text-section',
      order:   13,
      enabled: true,
      content: {
        title: 'ჩვენ ვართ შავლეგო',
        body:  'გაპარსვა არ უნდა ტკიობდეს. ჩვენი 5-თავაკიანი სისტემა შეიქმნა იმ ადამიანებისთვის, ვისთვისაც სიმრბილე ისეთივე მნიშვნელოვანია, როგორც სტილი. ყოველ დილა — შენი.',
      },
      media:  {},
      config: {},
    },

    /* 14 — Pain / solution 3 ────────────────────────────── */
    {
      type:    'pain-solution',
      order:   14,
      enabled: true,
      content: {
        question: '⏰ დრო გიფასდება — გაპარსვაში ტლანქ დრო კარგავ?',
        answer:   'FlexGlide® ტექნოლოგია კონტურებს ავტომატურად ეგუება — ნაკლები ფრთხილი მოძრაობა, ნაკლები ვარჯიში, სწრაფი შედეგი. სულ 2 წუთი.',
      },
      media:  {},
      config: {},
    },

    /* 15 — Specs ────────────────────────────────────────── */
    {
      type:    'specs-list',
      order:   15,
      enabled: true,
      content: {
        title: '📋 პარამეტრები',
        items: [
          '5 დამოუკიდებლად მოძრავი თავაკი',
          'ლუბრიკანტის ზოლი — ალოე ვერა + ვიტამინი E',
          'FlexGlide® სახსარი — სრული კონტური',
          '3 კვირამდე გამოყენება (1× დღეში)',
          'ჰიპოალერგიული, მგრძნობ. კანისთვის',
          'თავსებადი: Gillette Fusion-ის ტიპთან',
        ],
      },
      media:  {},
      config: {},
    },

    /* 16 — Product image 4 ──────────────────────────────── */
    {
      type:    'image-section',
      order:   16,
      enabled: true,
      content: { alt: 'შავლეგო შეფუთვაში — სუფთა, სასაჩუქრე ვარიანტი' },
      media:   { image: 'https://picsum.photos/seed/shavlego5/800/500' },
      config:  {},
    },

    /* 17 — Pain / solution 4 ────────────────────────────── */
    {
      type:    'pain-solution',
      order:   17,
      enabled: true,
      content: {
        question: '🤔 გიჭირს სწორი სამართებელის არჩევა?',
        answer:   'შავლეგო Gillette Fusion-ის ტიპთან თავსებადია — უკვე გაქვს ყველაფერი, რაც საჭიროა. უბრალოდ გამოიცვალე თავაკი.',
      },
      media:  {},
      config: {},
    },

    /* 18 — Testimonials ─────────────────────────────────── */
    {
      type:    'testimonials',
      order:   18,
      enabled: true,
      content: {
        title: '⭐ ნამდვილი მომხმარებლები',
        items: [
          { text: 'პირველი გამოყენებიდანვე შეიგრძნობა განსხვავება. კანი არ გწვავს, არ წითლდება.',   author: 'გ. ბ., თბილისი',  rating: 5 },
          { text: 'სამ კვირაში ჯერ გამოცვლა არ დამჭირვებია. ეკონომიური და ეფექტური.',               author: 'ლ. კ., ბათუმი',   rating: 5 },
          { text: 'ჩუქება ვაჩუქე ქმარს — ეხლა ჩემი ვერ ასვენებს 😄',                              author: 'ნ. მ., თბილისი',  rating: 5 },
          { text: 'ახლო მეგობარმა ურჩია — ახლა მეც ჩემს მეგობრებს ვურჩევ.',                        author: 'ვ. დ., ქუთაისი', rating: 5 },
        ],
      },
      media:  {},
      config: {},
    },

    /* 19 — CTA 3 ────────────────────────────────────────── */
    {
      type:    'cta',
      order:   19,
      enabled: true,
      content: {
        label:   '🚀 99₾-ად შეკვეთა',
        anchor:  '#order-form',
        subtext: 'მიტანა სახლში — სრულიად უფასოდ',
      },
      media:  {},
      config: {},
    },

    /* 20 — Steps ────────────────────────────────────────── */
    {
      type:    'process-steps',
      order:   20,
      enabled: true,
      content: {
        title: 'შეკვეთა — 3 მარტივი ნაბიჯი',
        items: [
          { icon: '📝', title: 'შეავსე ფორმა',    text: 'სახელი და ნომერი — 30 წამი' },
          { icon: '📞', title: 'დაგირეკავთ',    text: 'ვადასტურებთ — სწრაფად და ადვილად' },
          { icon: '🚚', title: 'მოგიტანთ სახლში', text: 'მთელ საქართველოში — უფასოდ' },
        ],
      },
      media:  {},
      config: {},
    },

    /* 21 — Product image 5 ──────────────────────────────── */
    {
      type:    'image-section',
      order:   21,
      enabled: true,
      content: { alt: 'გაპარსვის შედეგი — გლუვი, გაღიზიანების გარეშე' },
      media:   { image: 'https://picsum.photos/seed/shavlego6/800/500' },
      config:  {},
    },

    /* 22 — Guarantee ────────────────────────────────────── */
    {
      type:    'text-section',
      order:   22,
      enabled: true,
      content: {
        title: '🛡️ 100% გარანტია',
        body:  'თუ პირველი გამოყენების შემდეგ კმაყოფილი არ ხარ — ვიბრუნებთ ფულს. კითხვების გარეშე.',
      },
      media:  {},
      config: { align: 'center' },
    },

    /* 23 — CTA 4 ────────────────────────────────────────── */
    {
      type:    'cta',
      order:   23,
      enabled: true,
      content: {
        label:   '🎁 ახლავე ვუკვეთ — 99₾',
        anchor:  '#order-form',
        subtext: 'რამდენიმე ადგილი რჩება — ნუ გაჰყვები',
      },
      media:  {},
      config: {},
    },

    /* 24 — Product image 6 ──────────────────────────────── */
    {
      type:    'image-section',
      order:   24,
      enabled: true,
      content: { alt: 'შავლეგო — ათასობით კმაყოფილი მომხმარებელი მთელ საქართველოში' },
      media:   { image: 'https://picsum.photos/seed/shavlego7/800/500' },
      config:  {},
    },

    /* 25 — Order form ───────────────────────────────────── */
    {
      type:    'form',
      order:   25,
      enabled: true,
      content: {
        title:       '📦 შეკვეთის გაფორმება',
        subtitle:    'შეავსე — გამოგვიკვეთ 15 წუთში',
        submitLabel: '✅ შეკვეთა — 99₾',
        note:        '🔒 შენი მონაცემები დაცულია. გარე სერვისებს არ ვუგზავნით.',
        fields: [
          { name: 'name',  type: 'text', placeholder: 'შენი სახელი',      required: true, autocomplete: 'given-name' },
          { name: 'phone', type: 'tel',  placeholder: 'ტელეფონის ნომერი', required: true, autocomplete: 'tel'        },
        ],
      },
      media:  {},
      config: { formId: 'order-form' },
    },

    /* 26 — Contact info ─────────────────────────────────── */
    {
      type:    'contact-info',
      order:   26,
      enabled: true,
      content: {
        title: 'კომპანიის ინფორმაცია',
        items: [
          { icon: '📍', label: 'მისამართი', value: 'საქართველო, თბილისი, რუსთაველის გამზ. 10',  href: null },
          { icon: '📞', label: 'ცხელი ხაზი', value: '+995 555 79 35 58',    href: 'tel:+995555793558' },
          { icon: '✉️', label: 'ელ-ფოსტა',   value: 'Shavlego.one@gmail.com', href: 'mailto:Shavlego.one@gmail.com' },
          { icon: '🌐', label: 'ვებსაიტი',   value: 'www.shavlego.one',     href: 'https://www.shavlego.one/' },
        ],
        links: [
          { label: 'წესები და პირობები',         href: '#' },
          { label: 'კონფიდენციალობის პოლიტიკა', href: '#' },
          { label: 'კონტაქტი',                   href: 'mailto:Shavlego.one@gmail.com' },
        ],
      },
      media:  {},
      config: {},
    },

  ],
};
