/* ============================================================
   data/pages/demo.js

   Demo page — FitPlan 30-Day Home Workout Program.
   Demonstrates the engine with a completely different product
   category, color theme, and content structure.

   To preview: index.html?page=demo
   ============================================================ */

window.PAGE_DATA = {

  meta: {
    title:        'FitPlan | Start Your 30-Day Transformation',
    description:  'Home workout program. No equipment. Real results in 30 days.',
    primaryColor: '#10b981',
    lang:         'en'
  },

  blocks: [

    {
      type:     'hero',
      badge:    '30-day money-back guarantee',
      image:    null,
      title:    'FitPlan',
      subtitle: '30-day home workout program — no equipment needed',
      price:    { old: '89', new: '39', currency: '$' },
      cta:      { label: 'Start for $39', anchor: '#order-form' }
    },

    {
      type:  'countdown',
      key:   'demo',
      label: 'Launch price expires in',
      hours: 48
    },

    {
      type:  'features-list',
      title: 'Everything included',
      items: [
        { icon: '📱', text: '30 daily workouts — 20 min each, zero equipment' },
        { icon: '🥗', text: 'Nutrition guide with simple meal plans' },
        { icon: '📊', text: 'Progress tracker to keep you accountable' },
        { icon: '♾️',  text: 'Lifetime access — train at your own pace' }
      ]
    },

    {
      type:    'cta',
      label:   'Get FitPlan — $39',
      anchor:  '#order-form',
      subtext: '30-day money-back guarantee, no questions asked'
    },

    {
      type:     'pain-solution',
      question: 'Gym memberships are expensive and you never actually go?',
      answer:   'FitPlan is designed for real life — 20 minutes, at home, with zero equipment. No commute, no membership, no excuses. Just results.',
      image:    null
    },

    {
      type:     'pain-solution',
      question: 'Started programs before but quit after week one?',
      answer:   'FitPlan builds progressive difficulty day by day. Week 1 is achievable even for beginners. By week 4, you will not recognize what your body can do.',
      image:    null
    },

    {
      type:     'pain-solution',
      question: 'Do not know what to eat and overwhelmed by nutrition?',
      answer:   'The included nutrition guide is simple: real food, no calorie counting, no supplements required. We made it so easy anyone can follow it.',
      image:    null
    },

    {
      type:  'benefits-grid',
      title: 'Why FitPlan works',
      items: [
        { number: '01', title: 'Short',       text: '20 min/day — fits any schedule.' },
        { number: '02', title: 'Progressive', text: 'Gets harder so you keep improving.' },
        { number: '03', title: 'Complete',    text: 'Workouts + nutrition in one place.' },
        { number: '04', title: 'Guaranteed',  text: '30-day refund if not satisfied.' }
      ]
    },

    {
      type:    'cta',
      label:   'Join FitPlan — $39',
      anchor:  '#order-form',
      subtext: 'One-time payment. Lifetime access.'
    },

    {
      type:  'video-section',
      title: 'See a sample workout',
      src:   null
    },

    {
      type:  'testimonials',
      title: 'Real results from real people',
      items: [
        { rating: 5, text: 'Lost 8 lbs in the first 30 days without a single gym visit. The workouts are tough but totally doable.',           author: 'Sarah K.'   },
        { rating: 5, text: 'I have tried every program out there. This is the first one I actually finished. The progression keeps you hooked.', author: 'Marcus L.'  },
        { rating: 5, text: 'The nutrition guide alone is worth the price. Simple, practical, and I finally stopped feeling confused about food.', author: 'Priya D.'   }
      ]
    },

    {
      type:  'text-section',
      title: 'No equipment. No gym. No excuses.',
      body:  'Every workout in FitPlan uses only your bodyweight. You can do it in your living room, hotel room, or backyard. The only thing you need is 20 minutes and the decision to start.',
      align: 'center'
    },

    {
      type:  'specs-list',
      title: "What's included",
      items: [
        '30 guided workout videos (20 min each)',
        'Beginner, intermediate, and advanced tracks',
        'Printable 30-day calendar',
        'Simple nutrition guide (PDF)',
        'Progress tracking worksheet',
        'Lifetime access — no subscription'
      ]
    },

    {
      type:    'cta',
      label:   'Start My Transformation — $39',
      anchor:  '#order-form',
      subtext: null
    },

    {
      type:  'process-steps',
      title: 'How it works',
      items: [
        { icon: '💳', title: 'Purchase once',    text: 'One payment of $39 — no recurring charges.' },
        { icon: '📧', title: 'Get instant access', text: 'Check your email for the access link — usually within 2 minutes.' },
        { icon: '📅', title: 'Start day 1',       text: 'Open your day-1 workout and press play. It is that simple.' },
        { icon: '🏆', title: 'See results',       text: 'Follow the plan and track your transformation over 30 days.' }
      ]
    },

    {
      type:        'form',
      id:          'order-form',
      title:       'Get instant access',
      subtitle:    "Enter your email and we'll send you the access link right away",
      fields: [
        { type: 'text',  name: 'name',  placeholder: 'Your name',     required: true, autocomplete: 'name'  },
        { type: 'email', name: 'email', placeholder: 'Email address', required: true, autocomplete: 'email' }
      ],
      submitLabel: 'Send me access',
      note:        '30-day money-back guarantee. Cancel anytime.'
    },

    {
      type:     'callback-cta',
      title:    'Have a question first?',
      subtitle: 'Fill in the form above and we will get back to you within the hour.',
      label:    'Go to form',
      anchor:   '#order-form'
    }

  ]
};
