import { IMG } from './images'

/**
 * Style icon profiles.
 *
 * These are deliberately not written to the same template. A pop performer, a
 * hip-hop producer, a footballer and a couturier influenced fashion through
 * completely different mechanisms, and flattening them into one "icon" format
 * would misrepresent the period.
 */

export const ICON_FIELDS = [
  { id: 'all', label: 'All Contacts' },
  { id: 'pop', label: 'Pop' },
  { id: 'rnb', label: 'R&B & Hip-Hop' },
  { id: 'fame', label: 'Fame & Reality' },
  { id: 'design', label: 'Design' },
  { id: 'sport', label: 'Sport & Screen' },
]

export const ICONS = [
  {
    id: 'britney-spears',
    name: 'Britney Spears',
    field: 'pop',
    years: 'Active from 1998',
    image: 'britneyNfl',
    portraitNote: 'Photograph from September 2003.',
    bio: 'A pop performer whose videos and stage wardrobe were, for roughly five years, the most efficient distribution system in fashion. Whatever Spears wore in a music video appeared in mall retail within weeks.',
    signature: [
      'Crop tops and low-rise denim',
      'School-uniform references, reworked',
      'Crystallised stage costumes',
      'Straightened blonde hair with centre parting',
    ],
    moment:
      'The 2001 American Music Awards, arriving in full denim alongside Justin Timberlake — the era’s most reproduced red-carpet photograph.',
    influence:
      'Spears made the pop video a fashion channel with global reach at exactly the moment that music television and the early internet were peaking together. The looks were not artistic statements so much as instructions, and millions of people followed them literally.',
  },
  {
    id: 'christina-aguilera',
    name: 'Christina Aguilera',
    field: 'pop',
    years: 'Active from 1999',
    image: 'christinaMtv',
    portraitNote: 'Photograph from the 2006 MTV Video Music Awards.',
    bio: 'A vocalist who used styling as a deliberate counter-argument, moving from teen pop into an aggressively sexual, heavily accessorised aesthetic that borrowed from burlesque, fetish and hip-hop wardrobes.',
    signature: [
      'Heavy crystal and rhinestone application',
      'Coloured and black hair with chunky highlights',
      'Low-slung leather and denim',
      'Visible piercings and heavy eyeliner',
    ],
    moment:
      'The "Dirrty" video in 2002, a styling statement so deliberate that it functioned as a rebrand rather than a costume change.',
    influence:
      'Aguilera gave pop permission to look deliberately unwholesome. The "Dirrty" image is one of the reasons the early-2000s pop register was able to include leather, chaps and body modification rather than only sparkle.',
  },
  {
    id: 'destinys-child',
    name: "Destiny's Child",
    field: 'rnb',
    years: '1990s–2005',
    image: 'destinyChildLive',
    portraitNote: 'Photograph from a 2005 tour date.',
    bio: 'A vocal group whose matching, co-ordinated visual identity made group styling an idea in its own right — three people dressed as one statement, and then as three different statements, within a single performance.',
    signature: [
      'Co-ordinated group colour palettes',
      'Crystallised and sequinned stagewear',
      'Camouflage-print co-ords',
      'Boots and wide belts built for choreography',
    ],
    moment:
      'The camouflage-and-mesh wardrobe of the early-2000s tours, which turned a left-field streetwear fabric into a mainstream stage uniform.',
    influence:
      'Group styling had always existed, but Destiny’s Child made it photographic — designed for the still image as much as the performance. Their wardrobe also gave Black American stylists and costume designers a visible, high-budget platform inside the pop industry.',
  },
  {
    id: 'aaliyah',
    name: 'Aaliyah',
    field: 'rnb',
    years: '1994–2001',
    image: 'aaliyahPortrait',
    portraitNote: 'Photograph from 2000, the year before her death.',
    bio: 'A singer and actor whose style was quieter than her contemporaries and, for that reason, more durable. Her wardrobe mixed baggy tomboy tailoring with a distinctly feminine softness, and she wore both without negotiating between them.',
    signature: [
      'Baggy trousers with a cropped fitted top',
      'Bandanas and dark sunglasses',
      'Hoops, layered chains and body jewellery',
      'A bare midriff as a deliberate silhouette rather than an accident',
    ],
    moment:
      'The 2000 trend of wearing a bandana as a head covering rather than a prop — a look that reappeared in almost every subsequent revival of Y2K style.',
    influence:
      'Aaliyah is the clearest example of R&B styling that did not read as costume. Her death in 2001 at the age of twenty-two ended the work at its most interesting point, and her clothes have been referenced continuously since — more than any other figure on this list.',
  },
  {
    id: 'jennifer-lopez',
    name: 'Jennifer Lopez',
    field: 'fame',
    years: 'Active from 1999',
    image: 'jloMarc',
    portraitNote: 'Photograph from 2007. The image associated with the 2000 Grammys dress is copyrighted and is not reproduced here.',
    bio: 'A performer and actor who produced the single most consequential red-carpet garment of the period, and whose style insisted on the body as the subject of the outfit rather than the frame around it.',
    signature: [
      'Plunging, engineered necklines',
      'Body-con silhouettes and cut-outs',
      'Statement hoops and stacked bracelets',
      'Logo-heavy accessories',
    ],
    moment:
      'The green Versace silk chiffon gown, designed by Donatella Versace, worn to the 42nd Grammy Awards on 23 February 2000.',
    influence:
      'That dress is the reference point for how a single outfit became a global event in this period — and it is frequently cited in histories of image search, because the demand to see it was one of the largest early spikes in the behaviour that became everyday.',
  },
  {
    id: 'paris-hilton',
    name: 'Paris Hilton',
    field: 'fame',
    years: 'Active from 2001',
    image: 'parisHilton',
    portraitNote: 'Photograph from 2005.',
    bio: 'For roughly four years the most photographed young woman in the United States, and the reason a certain register of Y2K dressing — velour, tiny bags, enormous sunglasses — remained visible in celebrity media long after designers had moved on.',
    signature: [
      'Velour tracksuits as daywear',
      'Juicy Couture branding worn visibly',
      'Vintage T-shirts under designer jackets',
      'Oversized sunglasses and a phone in one hand',
    ],
    moment:
      'Visiting the Juicy Couture store became a documented paparazzi routine, which tells you as much about the period as any runway.',
    influence:
      'Hilton made being photographed professionally into a role. Her styling was photo-friendly over everything else — high contrast, readable at a distance, and designed to be reproduced in a tabloid magazine. It is the direct ancestor of the influencer image.',
  },
  {
    id: 'nicole-richie',
    name: 'Nicole Richie',
    field: 'fame',
    years: 'Active from 2003',
    image: null,
    portraitNote:
      'No openly licensed period portrait of Nicole Richie was available for this archive. Rather than illustrate the entry with an unrelated photograph, this contact sheet prints a typographic plate.',
    standing: 'Typographic plate — no photograph used.',
    bio: 'Richie’s value to this archive is as a contrast case. Alongside her screen partner she pulled the Y2K celebrity look in an entirely different direction: boho, layered, relaxed, and eventually more influential on the later 2000s than on this period.',
    signature: [
      'Oversized sunglasses and scarves',
      'Layered boho tunics over denim',
      'Large statement jewellery',
      'Narrow, high-waisted denim from around 2006',
    ],
    moment:
      'The early seasons of The Simple Life, where she and Hilton wore the same costume idea — tiny bag, big sunglasses — in two completely different registers.',
    influence:
      'Richie’s later style is the bridge out of Y2K and into the 1970s-referencing boho revival of 2005–2008. She is included because that transition is part of the story: the era did not simply end, it changed direction.',
  },
  {
    id: 'gwen-stefani',
    name: 'Gwen Stefani',
    field: 'pop',
    years: 'Active from 1992',
    image: 'gwenNoDoubt',
    portraitNote: 'Photograph from a 2003 No Doubt tour date.',
    bio: 'A performer who arrived from a ska-punk band rather than a pop machine, and used her wardrobe to import fashion references — Harajuku, japanese street style, red-carpet glamour — into a space where none of them were expected.',
    signature: [
      'Cropped tops with a structured trouser',
      'Red lipstick as a permanent fixture',
      'Bindis and forehead jewellery during the late 1990s',
      'Her own L.A.M.B. label from 2003',
    ],
    moment:
      'The 1998 Rock Steady-era styling, which brought Harajuku street references into American music television.',
    influence:
      'Stefani is the earliest example in this list of a musician using her own wardrobe as design research and then launching a label from it. L.A.M.B. showed in 2003 and made that path — celebrity to designer, rather than celebrity to licensee — a viable model.',
  },
  {
    id: 'missy-elliott',
    name: 'Missy Elliott',
    field: 'rnb',
    years: 'Active from 1997',
    image: 'missyElliott',
    portraitNote: 'Photograph from 2006.',
    bio: 'The most formally inventive music video performer of the period, and the one whose wardrobe is least separable from the technology used to film it. Her videos treated costume as animation, inflatable object and special effect.',
    signature: [
      'Inflatable and moulded costumes',
      'Tracksuits re-engineered as video props',
      'Colour-block graphics built for the screen',
      'Bling that functions as set design',
    ],
    moment:
      'The videos for "The Rain (Supa Dupa Fly)" and "She’s a Bitch" (with a then little-known designer named Bob Mackie), which used scale and mutation rather than realism.',
    influence:
      'Elliott’s wardrobe took the idea of a music video costume literally: clothing invented for the camera that could not exist as a garment. Her influence is most visible in contemporary video and stage design, where the outfit is often generated digitally rather than made.',
  },
  {
    id: 'pharrell-williams',
    name: 'Pharrell Williams',
    field: 'rnb',
    years: 'Active from 1999',
    image: 'pharrell',
    portraitNote: 'Photograph from 2007 in Tokyo.',
    bio: 'A producer and performer who dressed like a skateboarder and a jeweller at the same time, and did more than any single person to make BAPE and the wider Ura-Harajuku vocabulary legible to an American audience.',
    signature: [
      'BAPE and fitted caps',
      'Luxury jewellery over streetwear basics',
      'Skate-brand sweatshirts under tailored coats',
      'Ice-cream and skate graphics, worn completely straight',
    ],
    moment:
      'The N.E.R.D and early solo period, when a producer’s outfit became as discussed as the records.',
    influence:
      'Williams is the origin point of the modern idea that a rapper or producer is also a designer — through Billionaire Boys Club, Ice Cream and later collaborations with luxury houses. He made the streetwear-to-luxury transfer look normal.',
  },
  {
    id: 'david-beckham',
    name: 'David Beckham',
    field: 'sport',
    years: 'Active from 1995',
    image: 'beckham',
    portraitNote: 'Photograph from 2006.',
    bio: 'A footballer whose styling made sportswear a fashion category rather than a fitness one, and whose willingness to be photographed wearing something unexpected made him the first male sports figure of the period to be treated as a style subject.',
    signature: [
      'Sarongs and unconventional tailoring, worn without explanation',
      'Diamond studs and visible jewellery',
      'Sharp suits with trainers',
      'Bleached, mohawk and grown-out hair phases',
    ],
    moment:
      'The late-1990s sarong, which provoked a tabloid reaction large enough to demonstrate that a footballer’s clothes were now a news story.',
    influence:
      'Beckham is why the sportswear-luxury crossover of the 2000s happened in menswear first. His willingness to be a stylised subject rather than just an athlete made the ground on which every later athlete-brand partnership stands.',
  },
  {
    id: 'sarah-jessica-parker',
    name: 'Sarah Jessica Parker',
    field: 'sport',
    years: 'Active from 1998 (in role)',
    image: 'sjp',
    portraitNote: 'Photograph from 2005.',
    bio: 'The performer whose character in Sex and the City made a specific relationship with clothing — treating accessories as the substance of a personality — the defining idea of early-2000s American style.',
    signature: [
      'A name necklace worn as a permanent signature',
      'Cocktail dresses with a deliberately strange shoe',
      'Small structured bags carried as objects',
      'Looks changed multiple times within a single scene',
    ],
    moment:
      'The scenes in which a Fendi Baguette is the point of the conversation rather than the prop, which helped turn a specific expensive bag into a mainstream cultural reference.',
    influence:
      'The show legitimised the idea that a wardrobe could be the plot. It also gave American viewers a vocabulary for luxury accessories at a moment when many of them had never encountered a designer handbag in person.',
  },
  {
    id: 'john-galliano',
    name: 'John Galliano',
    field: 'design',
    years: 'At Dior 1996–2011',
    image: 'gallianoDior1998',
    portraitNote: 'Museum photograph of a 1998 ensemble by John Galliano for Dior. A period portrait was not available in an openly licensed source.',
    standing: 'Designer',
    bio: 'The designer who made couture dramatic again at the exact moment the world was interested in spectacle. His Dior collections combined historical research, theatrical staging and an approach to the runway as narrative.',
    signature: [
      'Bias cutting and historical references',
      'Newspaper print and Trotter monogram',
      'The Saddle bag, introduced 2000',
      'Show staging as a form of storytelling',
    ],
    moment:
      'The 2000 Saddle bag, one of the small number of Y2K objects that is still instantly identifiable today.',
    influence:
      'Galliano established that a luxury house could be led by personality rather than brand management, and that a single accessory could carry a season. He was dismissed from Dior in 2011 and later joined Maison Margiela, where he worked from 2014 to 2024.',
  },
  {
    id: 'tom-ford',
    name: 'Tom Ford',
    field: 'design',
    years: 'At Gucci 1994–2004',
    image: 'tomFord',
    portraitNote: 'Photograph from 2009, after his Gucci years.',
    standing: 'Designer',
    bio: 'The designer who set the period’s definition of luxury: sharp, sexual, and photographed rather than described. He arrived at Gucci in 1994 and, with CEO Domenico De Sole, rebuilt the house from near-bankruptcy into the most-watched label of the millennial moment.',
    signature: [
      'Velvet hipster trousers worn with a silk shirt',
      'The GG monogram used as a deliberate surface',
      'Slashed jersey and exposed hardware',
      'Advertising campaigns as direct statements of intent',
    ],
    moment:
      'The mid-1990s Gucci reboot, in which a single collection reset what the industry considered modern luxury.',
    influence:
      'Ford made the designer a public figure again and made advertising the primary vehicle for a house’s identity. He also led Yves Saint Laurent from 1999 to 2004 in parallel, and launched his own brand in 2005.',
  },
  {
    id: 'alexander-mcqueen',
    name: 'Alexander McQueen',
    field: 'design',
    years: 'Active 1992–2010',
    image: 'mcqueenGivenchy1998',
    portraitNote: 'Museum photograph of an autumn/winter 1998 Givenchy couture look by McQueen. A period portrait was not available in an openly licensed source.',
    standing: 'Designer',
    bio: 'A tailor by training who used the runway as a place to argue with things. His shows of this period are the most documented and the most cited of any designer working in the era, and they were frequently hostile to the idea of clothing as a product.',
    signature: [
      'Aggressive bias-cut tailoring',
      'Metal corsetry, made with jeweller Shaun Leane',
      'Show environments designed as narratives',
      'The skull scarf from 2003, his most commercially successful object',
    ],
    moment:
      '"Voss", the Spring 2001 show built around a mirrored box and a glass enclosure — the clearest example of the runway used as an installation.',
    influence:
      'McQueen is the reason this period is remembered as one of high fashion rather than only of denim and logos. His influence on later designers is the most frequently cited of anyone in this archive. He died in February 2010.',
  },
]

export function iconImage(icon) {
  return icon.image ? IMG[icon.image] : null
}
