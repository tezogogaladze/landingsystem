/* ============================================================
   data/pages/shavlego.js

   Page data for the Shavlego electric shaver landing page.
   Registered in data/registry.js under the key "shavlego".

   To preview: index.html?page=shavlego
   ============================================================ */

window.PAGE_DATA = {

  meta: {
    title:        'Shavlego | Order Now — 99₾',
    description:  'Innovative 5-blade electric shaver. Free delivery. Pay on receipt.',
    primaryColor: '#e63946',
    lang:         'en'
  },

  blocks: [

    {
      type:     'hero',
      badge:    'Special offer — limited time',
      image:    null,
      title:    'Shavlego',
      subtitle: 'Innovative 5-blade shaving system',
      price:    { old: '136', new: '99', currency: '₾' },
      cta:      { label: 'Order Now — 99₾', anchor: '#order-form' }
    },

    {
      type:  'countdown',
      key:   'shavlego',
      label: 'Offer ends in',
      hours: 24
    },

    {
      type:  'features-list',
      title: 'Why choose Shavlego?',
      items: [
        { icon: '⚡', text: 'Shaves beard & hair in 90 seconds flat' },
        { icon: '💧', text: 'Cordless and fully waterproof — use anywhere' },
        { icon: '🛡️', text: 'Anti-allergy 5-blade head — no cuts, no irritation' },
        { icon: '✂️', text: '2-in-1: beard AND hair trimming in one device' }
      ]
    },

    {
      type:    'cta',
      label:   'Order Now — 99₾',
      anchor:  '#order-form',
      subtext: 'Free delivery to your door'
    },

    {
      type:     'pain-solution',
      question: 'Tired of razor burns that ruin your morning?',
      answer:   "Shavlego's 5 flexible anti-allergy blades adapt perfectly to the contours of your face, eliminating skin irritation and ingrown hairs. Your skin stays smooth and healthy — every single day.",
      image:    null
    },

    {
      type:     'pain-solution',
      question: 'Running late because shaving takes too long?',
      answer:   'Shavlego shaves 5× faster than a traditional razor. Get a clean, professional result in just 90 seconds — so you are always on time.',
      image:    null
    },

    {
      type:     'pain-solution',
      question: 'Travel often and tired of bulky shavers?',
      answer:   'Shavlego is cordless, waterproof, and compact. Toss it in your bag and shave wherever you are — hotel bathroom, gym, airport. Anywhere.',
      image:    null
    },

    {
      type:  'text-section',
      title: 'Ergonomic design — 3× more control',
      body:  "Shavlego's grip is engineered to fit your hand perfectly. The ergonomic handle gives you 3× more control compared to standard shavers, ensuring a precise and comfortable shave every time.",
      align: 'left'
    },

    {
      type:    'cta',
      label:   'Order Shavlego — 99₾',
      anchor:  '#order-form',
      subtext: 'Limited stock — do not miss out'
    },

    {
      type:     'pain-solution',
      question: 'Hair grows back every 2 weeks but salon visits are expensive?',
      answer:   "Shavlego trims hair just as well as it shaves a beard. Its flexible blades let you get a better-than-salon result at home, in half the time — no appointment needed.",
      image:    null
    },

    {
      type:  'text-section',
      title: 'A confident man is an attractive man',
      body:  "Shavlego's innovative anti-allergy blades leave your skin smooth, attractive, and soft — the foundation of the confidence every man deserves.",
      align: 'center'
    },

    {
      type:  'benefits-grid',
      title: 'Product advantages',
      items: [
        { number: '01', title: 'Speed',   text: 'Full shave in 90 seconds.' },
        { number: '02', title: '2-in-1',  text: 'Works for beard and hair.' },
        { number: '03', title: 'Safety',  text: 'Flexible blades, zero cuts.' },
        { number: '04', title: 'Comfort', text: 'Cordless, waterproof, compact.' }
      ]
    },

    {
      type:    'cta',
      label:   'Get Shavlego Now — 99₾',
      anchor:  '#order-form',
      subtext: null
    },

    {
      type:  'video-section',
      title: 'See it in action',
      src:   null
    },

    {
      type:  'specs-list',
      title: 'Technical specifications',
      items: [
        'Battery life: 200 minutes per charge',
        'Dimensions: 7.62 × 7.62 × 6.35 cm',
        'Weight: 209 g',
        'Includes: product box + USB charger',
        'Country of origin: PRC'
      ]
    },

    {
      type:  'testimonials',
      title: 'What customers say',
      items: [
        { rating: 5, text: 'Best shaver I have ever owned. Takes 90 seconds and leaves my skin perfectly smooth. No irritation at all.',         author: 'David M.'  },
        { rating: 5, text: 'I was skeptical but this thing is incredible. The anti-allergy blades make a real difference — zero redness.',       author: 'George T.' },
        { rating: 5, text: 'The 2-in-1 feature is a game changer. I use it for both beard and hair now. Saves time and money every week.',       author: 'Nika B.'   }
      ]
    },

    {
      type:  'process-steps',
      title: 'How to order',
      items: [
        { icon: '📝', title: 'Fill the form',    text: 'Enter your name and phone number in the form below.' },
        { icon: '📞', title: 'We call you',       text: 'Our operator calls within 15 minutes to confirm address and delivery time.' },
        { icon: '🚚', title: 'We deliver',        text: 'We bring the order to your preferred address — free of charge.' },
        { icon: '💳', title: 'Pay on delivery',   text: 'Pay only after you receive the product — cash or card. No prepayment required.' }
      ]
    },

    {
      type:    'cta',
      label:   'Order Now — 99₾',
      anchor:  '#order-form',
      subtext: null
    },

    {
      type:        'form',
      id:          'order-form',
      title:       'Place your order',
      subtitle:    "Fill in your details and we'll contact you within 15 minutes",
      fields: [
        { type: 'text', name: 'name',  placeholder: 'Your name',    required: true, autocomplete: 'name' },
        { type: 'tel',  name: 'phone', placeholder: 'Phone number', required: true, autocomplete: 'tel'  }
      ],
      submitLabel: 'Submit order',
      note:        'Pay only on delivery. No credit card or prepayment required.'
    },

    {
      type:     'callback-cta',
      title:    'Want us to call you?',
      subtitle: "Submit the form above and we'll call back within 15 minutes.",
      label:    'Go to order form',
      anchor:   '#order-form'
    }

  ]
};
