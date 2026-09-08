# Replace the hero artwork and refresh the dark palette

## Direction
Use the selected **Elegant bakery hero** direction: a deep near-black base with soft blush-pink illumination and restrained warm-gold accents. Keep the existing site structure, wording, typography, and functionality.

## Implementation
1. **Add the supplied artwork**
   - Upload `IMG_2440.jpeg` through the project asset service and reference its generated asset pointer.
   - Replace the homepage’s current cake photo with the supplied Wendy’s Bakehouse billboard image.
   - Change the image frame from portrait to a responsive wide ratio so the billboard text and cake remain visible without awkward cropping.

2. **Refine the homepage banner**
   - Preserve the current two-column desktop layout and stacked mobile layout.
   - Give the banner a dark black-to-rose blend with subtle blush illumination and fine gold framing inspired by the uploaded artwork.
   - Keep the existing headline, buttons, and trust points readable; do not overlay them on the artwork because it already contains text.

3. **Replace the brown treatment everywhere it is shared**
   - Update the semantic `cocoa` background and foreground colors to the new near-black/blush/gold family, including the dark-mode equivalents.
   - Apply one reusable blended dark-surface style to the announcement bar, page headers, dark content bands, mobile menu, and footer.
   - Retain accessible contrast for body text, links, borders, icons, and buttons.

4. **Verify the result**
   - Check the homepage at desktop and mobile widths for image cropping, text fit, and contrast.
   - Check another page header, the mobile menu, a dark content band, and the footer to confirm every former brown area uses the same treatment.
   - Confirm the uploaded image loads from the project asset service and no existing navigation or calls to action regress.

## Technical details
- Expected presentation files: `src/routes/index.tsx`, `src/styles.css`, and the new image asset pointer.
- Shared components already use the semantic `cocoa` role, so the site-wide replacement can remain centralized rather than duplicating raw colors across components.
- No database, checkout, cart, admin, or content changes are included.
