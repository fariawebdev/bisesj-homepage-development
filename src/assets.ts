/**
 * Local assets served directly from public/
 * Clean lowercase filenames, no external WordPress dependencies.
 */

export const ASSETS = {
  logo: '/images/logo.png',
  schoolLogo: '/images/school-logo.png',
  hero: '/images/hero-campus.png',
  campus1: '/images/campus-1.jpg',
  admissionsNotice: '/images/admissions-notice.jpg',
  scholarship: '/images/scholarship.jpg',
  twentyYearsCambridge: '/images/twenty-years-cambridge.jpeg',
  chairman: '/images/chairman.jpg',
  principal: '/images/principal.jpeg',
  kindergarten: '/images/kindergarten-classroom.png',
  playground: '/images/playground-canopy.png',
  campus: [
    '/images/campus-1.jpg',
    '/images/campus-2.webp',
    '/images/campus-3.jpg',
    '/images/campus-4.jpeg',
    '/images/campus-5.jpg',
  ],
  partners: {
    cambridge: '/images/partner-cambridge.png',
    edexcel: '/images/partner-edexcel.svg',
    oxfordAqa: '/images/partner-oxfordaqa.webp',
    saudiEducation: '/images/partner-saudi-education.png',
    idp: '/images/partner-idp.jpeg',
  },
} as const
