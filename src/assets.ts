/**
 * Image sources, currently hotlinked from the existing school website.
 * Swap any URL here to update it everywhere on the homepage.
 */

const UPLOADS = 'https://bisesjsa.com/wp-content/uploads'

export const ASSETS = {
  logo: `${UPLOADS}/2024/06/logo1.png`,
  // IMG_4677.webp (supplied as the hero) is a scanned admissions notice, so a
  // campus photo is used instead. [REPLACE] with a wide, high-res campus shot.
  hero: `${UPLOADS}/2024/06/20230508_114914.jpg`,
  admissionsNotice: `${UPLOADS}/2026/04/IMG_4677.webp`,
  scholarship: `${UPLOADS}/2026/01/img_3634-1.jpg`,
  twentyYearsCambridge: `${UPLOADS}/2025/11/WhatsApp-Image-2025-10-27-at-9.23.26-AM.jpeg`,
  chairman: `${UPLOADS}/2025/10/Chairman-Pic-copy-3.jpg`,
  principal: `${UPLOADS}/2025/11/WhatsApp-Image-2025-11-03-at-6.59.15-AM.jpeg`,
  campus: [
    `${UPLOADS}/2024/06/20230508_114914.jpg`,
    `${UPLOADS}/2024/06/bisesjold-2-1.webp`,
    `${UPLOADS}/2024/06/20230521_072400.jpg`,
    `${UPLOADS}/2024/06/113.jpeg`,
    `${UPLOADS}/2024/06/IMG_20211110_194240.jpg`,
  ],
  partners: {
    cambridge: `${UPLOADS}/2024/06/cambridg.jpg`,
    edexcel: `${UPLOADS}/2024/06/Edexel.jpeg`,
    oxfordAqa: `${UPLOADS}/2024/06/oxfor-aqa.jpg`,
    saudiEducation: `${UPLOADS}/2024/06/saedu.jpg`,
    idp: `${UPLOADS}/2024/06/idp.jpg`,
  },
} as const
