// Renders a 180x180 PNG touch icon from an inline SVG at build time.
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#1c44a8"/>
  <text x="90" y="117" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="#fff" letter-spacing="-3">MH</text>
</svg>`;

export async function GET() {
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
