/**
 * Customer testimonials — the one copy.
 *
 * These are real, attributed quotes already published on the site. They lived
 * inline in `components/platform/TrustedBy.tsx`; anything that shows a customer
 * quote reads them from here so a correction lands once. Never add an entry
 * without a real, attributable source.
 */

export interface Testimonial {
  company: string
  quote: string
  author: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    company: 'Damon Motorcycles',
    quote:
      'Hanzo has transformed our approach to electric motorcycle development. Their platform gives us the tools to innovate at a pace that would be impossible with traditional infrastructure.',
    author: 'Jay Giraud',
    role: 'Founder & CEO at Damon Motorcycles',
  },
  {
    company: 'SKULLY',
    quote:
      'Working with Hanzo has transformed our ability to create the highest successfully funded Indiegogo project in history. Their DX platform streamlines our development processes while maintaining the highest standards of quality and safety.',
    author: 'Marcus Weller',
    role: 'CEO at SKULLY',
  },
  {
    company: 'Bellabeat',
    quote:
      "As a company focused on women's health technology, we need partners who understand both tech and human needs. Hanzo has been instrumental in helping us scale our infrastructure while maintaining the personal touch our customers expect.",
    author: 'Sandro Mur',
    role: 'Co-founder & CEO at Bellabeat',
  },
  {
    company: 'Karma',
    quote:
      "Hanzo's platform transformed our growth strategy and catalyzed sales for our crowdfunding campaign. Their AI-driven insights helped us connect with our audience in ways we never thought possible, making our latest collection launch our most successful to date.",
    author: 'Antje Worring',
    role: 'CEO at Karma Fashion',
  },
  {
    company: 'Triller',
    quote:
      "With Trillerfest reaching over 169M people, Hanzo's platform has been essential to our success. Their scalable solutions have allowed us to deliver exceptional user experiences at a global scale.",
    author: 'Vincent Butta',
    role: 'Board Member at Triller',
  },
  {
    company: 'Lifemed AI',
    quote:
      "Hanzo's AI Cloud and DX Platform have been transformative for our healthcare AI initiatives. Their solution enables us to deploy sophisticated ML models with confidence while meeting strict compliance requirements.",
    author: 'Matthew Joynes',
    role: 'Co-founder at Lifemed AI',
  },
]
