# Malibu Resort Motel prototype

Seven-page static HTML/CSS/vanilla JS prototype. No framework or build step. For Render, create a Static Site with publish directory `.` and no build command. Open `index.html` locally for a quick preview.

## Files

```text
malibu/ (repository root)
  index.html
  rooms.html
  property.html
  local-guide.html
  group-booking.html
  faq-policies.html
  contact.html
  assets/
    style-v2.css
    script.js
    images/
  download_images.py
  DESIGN-RESEARCH.md
  README.md
```

All complete page code is in the HTML files. The pages share `assets/style-v2.css` and `assets/script.js`. `download_images.py` lists every local image filename and its supplied source URL. The downloaded files are included in `assets/images/`. Pages serve WebP copies (`name-800.webp`, `name-1600.webp`) through `srcset`; the original JPGs stay as masters for the WordPress rebuild.

## Owner confirmation needed

- Provide approved Crusty Pelican live-music and pet photos. The live-music poster and the pet graphic are labeled placeholders.
- Confirm usage rights for the Local Guide attraction photos (Fort De Soto, John's Pass, Busch Gardens, St. Pete Beach). They were taken from the current Squarespace site and are likely third-party images. The sunset photo is from Unsplash.
- Confirm the outdoor bar patio photo (`property-06`) shows the Crusty Pelican area.
- Provide more room-specific gallery photos if desired. Each detailed room currently uses its supplied room photo plus shared property photos.
- Connect the front-end-only Rewards, group inquiry, and contact forms in WordPress.
- Confirm Cloudbeds date and guest URL parameters if the booking bar should prefill the reservation page. It currently validates dates and opens the supplied general booking URL.
- Confirm exact office hours and pet restrictions/fees before publication.
