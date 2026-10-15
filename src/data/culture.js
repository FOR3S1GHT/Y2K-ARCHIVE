import { IMG } from './images'

/**
 * Culture magazine features.
 *
 * Each chapter takes a different form on the page (feature, spread, essay,
 * index) because the surrounding culture of this period was not one thing.
 * `scope` records whose culture is being described — an important honesty
 * check, since "Y2K fashion" was never universal.
 */

export const CULTURE_CHAPTERS = [
  {
    id: 'mtv',
    index: '01',
    layout: 'feature',
    title: 'Music Television Was The Distribution System',
    standfirst:
      'Before a trend could be photographed in a magazine it had to appear in a music video, and the video reached further and faster than any print page.',
    image: 'trlStudios',
    scope:
      'Primarily the United States, the United Kingdom and Western Europe, where music television channels were available in most households.',
    body: [
      'In the late 1990s, music television was the single most efficient way for a garment to become visible to millions of people at once. A video could be requested, replayed and discussed; a magazine page could only be looked at. The result was a compression of the trend cycle that had not existed before.',
      'The physical studio mattered too. MTV’s Total Request Live broadcast from a glass-fronted studio in Times Square from 1998, which meant the audience could stand outside and watch the show being made. Fans appeared on camera. Their clothing became part of the broadcast.',
      'By the mid-2000s this function was migrating. On-demand video and file sharing meant a viewer no longer had to wait for a programme slot, and the deliberate sequencing that had made music television so powerful lost its grip.',
    ],
    pull: 'A music video costume had to read at a glance, from the back of a room, on a small screen. That constraint shaped the whole decade of stagewear.',
  },
  {
    id: 'hip-hop',
    index: '02',
    layout: 'spread',
    title: 'Hip-Hop Built A Fashion Industry',
    standfirst:
      'The most commercially significant fashion development of this period was the point at which music labels became apparel companies.',
    image: 'eckoShirt',
    scope:
      'American urban centres first, then national and international retail. The labels described here were primarily US companies; parallel scenes in the UK, France and Japan developed on their own terms.',
    body: [
      'Before the millennium, musicians had endorsed clothing. During it, they owned it. Rocawear was founded in 1999 by the co-founders of Roc-A-Fella Records. Sean John launched in 1998. Baby Phat began in 1999 as the womenswear counterpart to Phat Farm.',
      'These were not vanity projects. Rocawear reported annual sales in the hundreds of millions of dollars, and Sean John won CFDA Menswear Designer of the Year in 2004 — an award from the industry’s own governing body.',
      'The commercial spread also changed what was available. Baggy denim, oversized graphics and branded outerwear moved out of specialist stores and into malls, where they were bought by people who had never listened to the records.',
    ],
    stats: [
      ['1998', 'Sean John launches'],
      ['1999', 'Rocawear founded'],
      ['1999', 'Baby Phat established'],
      ['2004', 'Sean John wins CFDA Menswear'],
      ['2007', 'Rocawear sold for ~$204m'],
    ],
  },
  {
    id: 'paparazzi',
    index: '03',
    layout: 'essay',
    title: 'The Paparazzi Photograph Became A Fashion Format',
    standfirst:
      'Celebrity photography produced a different kind of image: unposed, repeated daily, and readable in a supermarket queue.',
    image: 'parisHilton',
    scope:
      'Concentrated in Los Angeles, New York and London, and circulated through weekly magazines sold internationally.',
    body: [
      'The red carpet had always been photographed. What changed at the millennium was the volume of unposed images — someone leaving a shop, walking to a car, holding a coffee — and the speed at which they were published.',
      'This created a new styling brief. An outfit had to work as a still image at a distance, in daylight or flash, cropped square for a magazine page. Velour tracksuits, oversized sunglasses and small structured bags all satisfy that brief precisely.',
      'It also made fashion criticism democratic. Readers could see what a garment looked like on a person with an ordinary body, in an ordinary street, which is something a runway photograph has never shown.',
    ],
  },
  {
    id: 'teen-screen',
    index: '04',
    layout: 'index',
    title: 'Teen Film & Television',
    standfirst:
      'Fiction supplied characters whose wardrobes could be copied wholesale, which is a more powerful mechanism than a single outfit.',
    scope:
      'Mostly North American productions with international distribution. Comparable broadcast cultures existed in the UK, Germany, Brazil, Japan and elsewhere, with their own style references.',
    entries: [
      {
        title: 'Sex and the City',
        years: '1998–2004',
        note: 'Turned accessories into plot devices and made a specific shoulder bag a mainstream reference point.',
        image: 'sjp',
      },
      {
        title: 'The Simple Life',
        years: '2003–2007',
        note: 'Put two stylistically opposite wardrobes side by side weekly, and made personal style itself the format.',
        image: 'parisHilton2',
      },
      {
        title: 'US teen film cycle',
        years: '1999–2004',
        note: 'Comedies built around a prom or a makeover gave costume designers a reason to dress a character in a full Y2K wardrobe on screen.',
        image: null,
      },
      {
        title: 'Music television programming',
        years: '1998–2006',
        note: 'Countdown shows mixed performance, interview and audience footage, so viewers saw stagewear and everyday clothes in the same hour.',
        image: 'trlStudios',
      },
    ],
  },
  {
    id: 'early-internet',
    index: '05',
    layout: 'diptych',
    title: 'The First Social Internet',
    standfirst:
      'Before the feed, there were profile pages: a chosen photograph, a chosen song, and a list of interests you edited by hand.',
    image: 'myspaceShirt',
    secondaryImage: 'imacG3',
    scope:
      'Access was uneven. Broadband reached wealthy households and universities years before it reached rural areas or lower-income neighbourhoods, and many readers encountered this culture through a school or library computer.',
    body: [
      'Social platforms of the early 2000s were built around self-description rather than a stream of images. You selected one photograph, wrote in a fixed-width text box, and chose a song that played automatically.',
      'For style, this mattered in a specific way: the profile picture was the first widely used self-portrait. The webcam — cheap, low-resolution, and pointed at whatever the desk lamp happened to light — made a particular look legible, and photographs were often taken specifically to be uploaded.',
      'The aesthetic of the personal homepage also shaped the era’s graphic design: hard borders, default fonts, animated elements, and a disregard for professional typography that later resurfaced as a deliberate style.',
    ],
  },
  {
    id: 'devices',
    index: '06',
    layout: 'index',
    title: 'Portable Technology',
    standfirst:
      'The devices of this period were objects with surfaces, which is why they were accessorised, customised and worn.',
    scope: 'Global, though availability and price varied enormously between countries.',
    entries: [
      {
        title: 'Nokia 3310',
        years: '2000',
        note: 'Small, colourful, with interchangeable covers and a battery life measured in weeks. The phone became something you decorated.',
        image: 'nokia3310',
      },
      {
        title: 'Apple iPod',
        years: '2001',
        note: 'White acrylic and a circular wheel. The white earbud cable became a visible status marker across the decade.',
        image: 'ipodFirst',
      },
      {
        title: 'Motorola Razr V3',
        years: 'Late 2004',
        note: 'Thin enough to vanish into a jeans pocket, which is exactly why clothing and handsets started being designed together.',
        image: 'motorolaRazr',
      },
      {
        title: 'T-Mobile Sidekick',
        years: '2002–2008',
        note: 'A physical keyboard, a swivelling screen, and a design that made messaging feel like a distinct activity.',
        image: 'sidekick',
      },
      {
        title: 'BlackBerry',
        years: '1999 onward',
        note: 'The device that moved email onto the body and put a keyboard in a jacket pocket.',
        image: 'blackberry',
      },
      {
        title: 'MiniDisc / Discman / Walkman',
        years: '1990s–2000s',
        note: 'Physical media meant a physical case, a case meant a bag, and a bag was an accessory.',
        image: 'minidisc',
      },
      {
        title: 'Tamagotchi',
        years: '1996 onward',
        note: 'A keychain that required attention. The first object worn on the body that beeped for you.',
        image: 'tamagotchi',
      },
    ],
  },
  {
    id: 'cyber',
    index: '07',
    layout: 'essay',
    title: 'Cyber Aesthetics Were Regional, Not Universal',
    standfirst:
      'There was never one "cyber look". There were several scenes, in different countries, that happened to share materials.',
    image: 'gothWeekend',
    scope:
      'European techno and fetish scenes, the North American rave circuit, and a distinct Japanese cyber-goth scene each assembled different references. Treating them as one style flattens real differences.',
    body: [
      'Cyber styling borrowed from industrial music, military surplus, motorcycle gear and science fiction production design. The shared component was not a garment but a material: PVC, latex, neoprene, webbing and reflective tape.',
      'In Germany and the Netherlands the emphasis was technical and severe. In the United States, rave styling of the same period was more colourful and more communal, built around clothing that could be worn for twelve hours. In Japan, cyber-goth combined industrial look with elaborate hair extensions and respiratory masks.',
      'Mainstream fashion extracted the surfaces and left the meanings behind. By 2003 a designer could put a PVC panel on a dress without any relationship to the scenes that had developed the material — and that transfer is the story of how subculture becomes trend.',
    ],
  },
  {
    id: 'sportswear',
    index: '08',
    layout: 'diptych',
    title: 'The Sportswear Takeover',
    standfirst:
      'Track jackets, shell-toe trainers and technical fabrics moved from the field to the street, and stayed there.',
    image: 'adidasSuperstar',
    secondaryImage: 'platformBuffalo',
    scope:
      'Global. Sportswear manufacturers had international distribution decades before this period, which is why the crossover happened everywhere at once.',
    body: [
      'Sportswear was already everyday clothing before 1997. What the millennium added was the collapse of the hierarchy: trainers worn with tailoring, a tracksuit top worn over a cocktail dress, technical outerwear treated as a statement rather than a convenience.',
      'Prada’s Linea Rossa sport line, launched in 1997, is one useful marker — a fashion house deliberately building a technical range. The Adidas Superstar, in production since 1969, is another: an old shoe that became a fashion object again through music culture rather than a marketing campaign.',
      'The result is the period’s most durable legacy. Of everything described in this archive, the sportswear crossover is the one that never reversed.',
    ],
  },
  {
    id: 'advertising',
    index: '09',
    layout: 'essay',
    title: 'Advertising, Photography & The Magazine',
    standfirst:
      'Fashion magazines of this period were thick enough to be collected, and the advertising inside them was treated as editorial content by readers.',
    image: 'vintageRack',
    scope:
      'The international edition system meant Vogue, Elle and their competitors appeared in dozens of countries with local photography and global advertising.',
    body: [
      'Print was still the primary place a fashion image was seen at its intended quality. A campaign photograph was commissioned at the same level as an editorial shoot, with photographers who worked for both, and readers distinguished between them less than editors did.',
      'The thickness of the magazines is a useful measure of the advertising market. At their peak these publications ran to several hundred pages in a single issue, most of it advertising, most of it photographed specifically for the page.',
      'The period photographs in this archive were largely taken for a different purpose — press, performance or documentation. They show what people actually wore to be photographed, which is a slightly different question from what a campaign wanted them to want.',
    ],
  },
  {
    id: 'revival',
    index: '10',
    layout: 'diptych',
    title: 'The Modern Y2K Revival',
    standfirst:
      'The look returned in the 2020s, but the reasons were entirely different. This is the most important distinction in the whole archive.',
    image: 'revivalGenZ',
    secondaryImage: 'revivalShanghai',
    scope:
      'A genuinely global phenomenon, distributed through social platforms rather than broadcast media, and driven substantially by resale rather than new production.',
    body: [
      'The 2020s revival reproduces the surfaces of the period — low-rise waistbands, tiny sunglasses, butterfly clips, velour — without its economic conditions. Original garments were manufactured in a specific industrial moment; the revival version is often a new product designed to look like the old one.',
      'The mechanism differs too. Trends of 1999 circulated through television and print, on a schedule set by broadcasters and publishers, over a period of months. Trends of the revival circulate through short video, in some cases over a period of days.',
      'The most interesting difference is sourcing. Much of the revival is built on second-hand and archival clothing, which means the revival has physically consumed part of the original period. The racks in this section are what is left.',
      'None of this makes the revival inauthentic. It does mean that a garment manufactured in 2024 should never be presented as a document of 2002 — which is why every later photograph in this archive is labelled with its own date.',
    ],
  },
]

export function chapterImage(chapter, which = 'image') {
  const key = chapter[which]
  return key ? IMG[key] : null
}
