export const PRODUCTS = [
  {
    id: 1,
    name: 'Structured Linen Overshirt',
    category: 'Shirts',
    gender: 'Men',
    price: 4490,
    oldPrice: 5990,
    description: 'Relaxed tailoring meets breathable European flax. Designed with clean drop shoulders, horn button closures, and an architectural square hem.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Oatmeal Ecru', hex: '#E8E2D6' },
      { name: 'Obsidian Black', hex: '#111111' },
      { name: 'Sage Olive', hex: '#636B5F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Normandy Linen (240 GSM)',
    rating: 4.9,
    reviews: 128,
    isNew: true,
    isFeatured: true,
    isBestseller: false,
    details: [
      'Pre-washed for a soft, lived-in drape',
      'Double-stitched flat fell seams',
      'Sustainably sourced natural corozo buttons',
      'Dry clean or gentle hand wash cold'
    ]
  },
  {
    id: 2,
    name: 'Pleated Wool Wide-Leg Trouser',
    category: 'Trousers',
    gender: 'Women',
    price: 6890,
    oldPrice: null,
    description: 'High-waisted tailored trouser featuring deep double front pleats and a fluid wide leg that pools gently over footwear.',
    images: [
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#2C2D30' },
      { name: 'Warm Cream', hex: '#F0ECE1' },
      { name: 'Dark Taupe', hex: '#4A4641' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '85% Virgin Wool, 15% Mulberry Silk',
    rating: 4.8,
    reviews: 94,
    isNew: false,
    isFeatured: true,
    isBestseller: true,
    details: [
      'High-rise waist with concealed zip fly',
      'Extended tab waistband closure',
      'Side slant pockets and back welt pockets',
      'Specialist dry clean only'
    ]
  },
  {
    id: 3,
    name: 'Cocoon Cashmere Wrap Coat',
    category: 'Coats',
    gender: 'Women',
    price: 18490,
    oldPrice: 22990,
    description: 'A monument of minimalist outerwear. Crafted from double-faced brushed cashmere with seamless hand-finished edges and a detachable self-tie belt.',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce667823?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Camel Tan', hex: '#B88B58' },
      { name: 'Pure Noir', hex: '#0D0D0D' },
      { name: 'Stone Grey', hex: '#8F8E8A' }
    ],
    sizes: ['S', 'M', 'L'],
    material: '90% Mongolian Cashmere, 10% Fine Merino',
    rating: 5.0,
    reviews: 62,
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    details: [
      'Hand-stitched double face construction (unlined for lightness)',
      'Shawl collar with relaxed drop shoulders',
      'Deep inset side pockets',
      'Includes breathable canvas dust bag'
    ]
  },
  {
    id: 4,
    name: 'Heavyweight Supima Crew T-Shirt',
    category: 'T-Shirts',
    gender: 'Men',
    price: 2490,
    oldPrice: null,
    description: 'The definitive minimal tee. Woven from long-staple California Supima cotton at 280 GSM for structure that retains shape wash after wash.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Bone White', hex: '#FAF8F5' },
      { name: 'Deep Black', hex: '#111111' },
      { name: 'Washed Ash', hex: '#686765' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '100% Long-Staple Supima Cotton (280 GSM)',
    rating: 4.9,
    reviews: 215,
    isNew: false,
    isFeatured: true,
    isBestseller: true,
    details: [
      'Reinforced ribbed crewneck collar',
      'Pre-shrunk organic yarn',
      'Side seam vents for comfortable drape',
      'Machine wash 30°C delicate'
    ]
  },
  {
    id: 5,
    name: 'Sculpted Column Silk Slip Dress',
    category: 'Dresses',
    gender: 'Women',
    price: 11990,
    oldPrice: 13990,
    description: 'An understated evening silhouette cut on the bias in heavyweight mulberry silk charmeuse. Accented with razor-thin adjustable rouleau straps.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Champagne Silk', hex: '#D6C8B2' },
      { name: 'Midnight Black', hex: '#111111' },
      { name: 'Burnt Ochre', hex: '#945337' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '100% Grade 6A Mulberry Silk (22 Momme)',
    rating: 4.9,
    reviews: 87,
    isNew: true,
    isFeatured: false,
    isBestseller: true,
    details: [
      'Bias cut for natural fluid contouring',
      'Low square back with delicate tie detail',
      'Ankle-grazing length with subtle side slit',
      'Professional silk dry clean'
    ]
  },
  {
    id: 6,
    name: 'Minimalist Single-Breasted Wool Blazer',
    category: 'Jackets',
    gender: 'Men',
    price: 13490,
    oldPrice: 15990,
    description: 'Architectural modern tailoring free of extraneous padding. Cut from crisp Italian tropical wool with notched lapels and clean jetted pockets.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Matte Black', hex: '#161616' },
      { name: 'Desert Sand', hex: '#C2B8A3' }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    material: '98% Super 120s Wool, 2% Elastane',
    rating: 4.8,
    reviews: 73,
    isNew: false,
    isFeatured: false,
    isBestseller: true,
    details: [
      'Half-canvas construction ensures shape memory',
      'Cupro breathable interior lining',
      'Horn button cuff detailing',
      'Specialist dry clean only'
    ]
  },
  {
    id: 7,
    name: 'Fine-Gauge Merino Turtleneck',
    category: 'Knitwear',
    gender: 'Unisex',
    price: 5290,
    oldPrice: null,
    description: 'Spun from extra-fine 19.5 micron Australian Merino wool. Featherlight yet insulating, engineered for smooth layering under tailored jackets.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#F2EDE4' },
      { name: 'Espresso Brown', hex: '#3B2F2F' },
      { name: 'Coal Black', hex: '#121212' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: '100% Extra-Fine Australian Merino Wool',
    rating: 4.7,
    reviews: 110,
    isNew: false,
    isFeatured: true,
    isBestseller: false,
    details: [
      '18-gauge jersey stitch knitting',
      'Seamless tubular neck construction',
      'Ribbed micro-cuffs and hem',
      'Hand wash in cold wool detergent'
    ]
  },
  {
    id: 8,
    name: 'Selvedge Straight-Leg Denim',
    category: 'Jeans',
    gender: 'Men',
    price: 6490,
    oldPrice: null,
    description: 'Crafted from 13.5 oz raw Japanese shuttle-loom denim with signature red selvedge ID line. Clean straight leg with high rise.',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Raw Indigo', hex: '#1C273C' },
      { name: 'Washed Black', hex: '#28282B' }
    ],
    sizes: ['30', '32', '34', '36'],
    material: '100% Kurabo Japanese Cotton Selvedge (13.5 oz)',
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isFeatured: false,
    isBestseller: true,
    details: [
      'Shuttle-loomed self-edge hem',
      'Custom debossed matte copper rivets',
      'Heavy canvas pocket bags',
      'Wash inside out in cold water to preserve patina'
    ]
  },
  {
    id: 9,
    name: 'Full-Grain Leather Tote Bag',
    category: 'Accessories',
    gender: 'Unisex',
    price: 8990,
    oldPrice: 10490,
    description: 'Unstructured minimal tote made of supple Tuscan semi-aniline calfskin. Spacious enough for a 15-inch laptop and daily essentials.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Saddle Tan', hex: '#875133' },
      { name: 'Obsidian Black', hex: '#111111' },
      { name: 'Chalk Beige', hex: '#DDD6C6' }
    ],
    sizes: ['One Size'],
    material: '100% Tuscan Full-Grain Calfskin Leather',
    rating: 5.0,
    reviews: 142,
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    details: [
      'Magnetic bridge closure with subtle logo emboss',
      'Internal zippered valet pocket and key leash',
      'Reinforced twin shoulder straps',
      'Dimensions: 38cm W x 42cm H x 12cm D'
    ]
  },
  {
    id: 10,
    name: 'Brushed Alpaca Chunky Cardigan',
    category: 'Knitwear',
    gender: 'Women',
    price: 8790,
    oldPrice: 9990,
    description: 'An enveloping silhouette spun from cloud-soft Peruvian baby alpaca blend. Dropped shoulders, deep ribbed cuffs, and matte bone buttons.',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Oatmeal Heather', hex: '#DCD4C4' },
      { name: 'Smoked Cedar', hex: '#584338' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '68% Baby Alpaca, 22% Wool, 10% Polyamide',
    rating: 4.8,
    reviews: 51,
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    details: [
      'Textured seed-stitch heavy knit',
      'Real horn buttons with Velora hallmark',
      'Relaxed oversized fit',
      'Lay flat to dry'
    ]
  },
  {
    id: 11,
    name: 'Minimalist Relaxed Poplin Shirt',
    category: 'Shirts',
    gender: 'Women',
    price: 3890,
    oldPrice: null,
    description: 'A contemporary take on menswear tailoring. Spun from crisp 100% organic cotton poplin with a concealed placket and exaggerated cuffs.',
    images: [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Sky Stripe', hex: '#C5D3E8' },
      { name: 'Deep Midnight', hex: '#121721' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: '100% Organic Cotton Poplin',
    rating: 4.7,
    reviews: 68,
    isNew: false,
    isFeatured: false,
    isBestseller: true,
    details: [
      'Concealed front button placket for seamless look',
      'Elongated French-inspired cuffs',
      'Curved hemline sits nicely tucked or loose',
      'Machine wash 30°C'
    ]
  },
  {
    id: 12,
    name: 'Tailored Bermuda Wool Shorts',
    category: 'Trousers',
    gender: 'Women',
    price: 4990,
    oldPrice: null,
    description: 'Chic knee-length tailored shorts with front pleats, pressed creases, and structured waistband. Perfect paired with an oversized blazer.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Alabaster White', hex: '#F5F3ED' },
      { name: 'Charcoal Black', hex: '#1C1C1E' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '70% Wool, 30% Lyocell',
    rating: 4.6,
    reviews: 38,
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    details: [
      'Deep trouser pleats with belt loops',
      'Slant pockets and back welt pockets',
      'Hits precisely at the top of the knee',
      'Dry clean'
    ]
  },
  {
    id: 13,
    name: 'Suede Minimalist Bomber Jacket',
    category: 'Jackets',
    gender: 'Men',
    price: 16990,
    oldPrice: 19990,
    description: 'Sublime lambskin suede cut with minimal lines. Features a two-way brushed gunmetal zipper, stand collar, and discreet side pockets.',
    images: [
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Espresso Suede', hex: '#3E2F28' },
      { name: 'Olive Drab', hex: '#4B5320' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Spanish Lambskin Suede',
    rating: 4.9,
    reviews: 44,
    isNew: true,
    isFeatured: true,
    isBestseller: false,
    details: [
      'Two-way YKK Excella metal zipper',
      'Rib-knit collar, cuffs, and hem in wool blend',
      'Silky viscose interior lining with dual chest pockets',
      'Specialist leather cleaner only'
    ]
  },
  {
    id: 14,
    name: 'Asymmetric Ribbed Knit Midi Dress',
    category: 'Dresses',
    gender: 'Women',
    price: 7490,
    oldPrice: 8990,
    description: 'Sculptural rib-knit midi dress with an elegant asymmetric neckline and high side vent that moves effortlessly.',
    images: [
      'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Stone Grey', hex: '#94928E' },
      { name: 'Pitch Black', hex: '#111111' },
      { name: 'Warm Terracotta', hex: '#A85A48' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '70% Viscose, 30% Stretch Polyamide',
    rating: 4.8,
    reviews: 64,
    isNew: false,
    isFeatured: false,
    isBestseller: true,
    details: [
      'Heavy compact rib holds shape and smooths silhouette',
      'One-shoulder asymmetric cutline',
      'Mid-calf length with 12-inch walking slit',
      'Hand wash cold and dry flat'
    ]
  },
  {
    id: 15,
    name: 'Washed Silk Camp Collar Shirt',
    category: 'Shirts',
    gender: 'Men',
    price: 5490,
    oldPrice: null,
    description: 'Sandwashed crepe de chine silk offering a matte, velvety texture. Relaxed camp collar with straight boxy hem.',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Sage Green', hex: '#7A8B7B' },
      { name: 'Sand Khaki', hex: '#C2B89D' },
      { name: 'Ink Navy', hex: '#17202A' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Sandwashed Mulberry Silk (19 Momme)',
    rating: 4.7,
    reviews: 59,
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    details: [
      'Cuban-style open camp collar',
      'French seams throughout for supreme interior finish',
      'Natural shell buttons',
      'Dry clean recommended'
    ]
  },
  {
    id: 16,
    name: 'Double-Pleated Wool Tapered Trouser',
    category: 'Trousers',
    gender: 'Men',
    price: 6490,
    oldPrice: 7490,
    description: 'Expertly draped trouser with generous thigh volume tapering sharply to a clean ankle break with 1.5-inch turn-up cuffs.',
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Deep Navy', hex: '#1A2230' },
      { name: 'Muted Taupe', hex: '#635B50' }
    ],
    sizes: ['30', '32', '34', '36'],
    material: '100% High-Twist Wool Flannel',
    rating: 4.8,
    reviews: 82,
    isNew: false,
    isFeatured: false,
    isBestseller: true,
    details: [
      'Side waist adjusters (buckle tabs) remove need for belt',
      'Curved curtain waistband for personalized tailoring',
      'Slanted side pockets and button-through back pockets',
      'Dry clean only'
    ]
  },
  {
    id: 17,
    name: 'Brushed Brass Minimalist Buckle Belt',
    category: 'Accessories',
    gender: 'Unisex',
    price: 2990,
    oldPrice: null,
    description: '30mm wide full-grain Italian bridle leather paired with an understated solid brass geometric buckle with matte brush finish.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Cognac Brown', hex: '#7A3E20' },
      { name: 'Matte Black', hex: '#111111' }
    ],
    sizes: ['85cm', '90cm', '95cm', '100cm'],
    material: '100% Vegetable-Tanned Tuscan Bridle Leather',
    rating: 4.9,
    reviews: 130,
    isNew: false,
    isFeatured: false,
    isBestseller: true,
    details: [
      'Hand-beveled and burnished edges',
      'Solid architectural brass hardware',
      'Subtle blind debossed brandmark',
      'Wipes clean with dry cloth'
    ]
  },
  {
    id: 18,
    name: 'Washed Heavyweight Cotton Hoodie',
    category: 'Knitwear',
    gender: 'Unisex',
    price: 5490,
    oldPrice: null,
    description: 'Structured 480 GSM French terry hoodie with seamless crossover hood without drawstrings for an uncompromisingly clean look.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Washed Ecru', hex: '#EBE5D8' },
      { name: 'Washed Charcoal', hex: '#333333' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Organic Combed French Terry (480 GSM)',
    rating: 4.9,
    reviews: 97,
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    details: [
      'Double-layered structured hood stands upright',
      'Invisible kangaroo pocket integrated into side seams',
      'Heavy 2x2 ribbed cuffs and hem',
      'Garment dyed for vintage depth'
    ]
  },
  {
    id: 19,
    name: 'Raw Hem High-Rise Vintage Straight Jean',
    category: 'Jeans',
    gender: 'Women',
    price: 5990,
    oldPrice: null,
    description: 'An iconic everyday jean cut from rigid 12 oz organic cotton denim with subtle fading, high 11.5-inch rise, and raw finished hem.',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Vintage Stone Blue', hex: '#5E748B' },
      { name: 'Chalk White', hex: '#FAF9F6' }
    ],
    sizes: ['25', '26', '27', '28', '29', '30'],
    material: '100% Organic Ring-Spun Cotton Denim',
    rating: 4.7,
    reviews: 74,
    isNew: false,
    isFeatured: false,
    isBestseller: true,
    details: [
      'Traditional button fly with silver hardware',
      'Classic five-pocket configuration',
      'Clean raw-cut bottom hem',
      'Machine wash cold inside out'
    ]
  },
  {
    id: 20,
    name: 'Double-Breasted Wool Peacoat',
    category: 'Coats',
    gender: 'Men',
    price: 15490,
    oldPrice: 17990,
    description: 'Nautical heritage reimagined in minimalist codes. Cut from ultra-dense melton wool with broad notch lapels and anchor-less matte horn buttons.',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce667823?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Midnight Navy', hex: '#121824' },
      { name: 'Dark Olive', hex: '#31382E' }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    material: '80% Recycled Melton Wool, 20% Polyamide (750 GSM)',
    rating: 5.0,
    reviews: 42,
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    details: [
      'Quilted satin thermal interior lining',
      'Fleece-lined hand-warmer pockets',
      'Single back vent for ease of motion',
      'Specialist dry clean only'
    ]
  },
  {
    id: 21,
    name: 'Organic Mercerized Mock-Neck Tee',
    category: 'T-Shirts',
    gender: 'Women',
    price: 2790,
    oldPrice: null,
    description: 'Silky mercerized cotton tee with a clean 1.5-inch mock neck. Designed to bridge the gap between casual ease and tailored refinement.',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Pure Noir', hex: '#111111' },
      { name: 'Ivory Bone', hex: '#F7F4EC' },
      { name: 'Muted Olive', hex: '#5A6251' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '100% GOTS-Certified Mercerized Cotton (220 GSM)',
    rating: 4.8,
    reviews: 63,
    isNew: false,
    isFeatured: false,
    isBestseller: false,
    details: [
      'Mercerized yarn gives subtle luster and crisp drape',
      'Fitted silhouette perfect for tucking into trousers',
      'Blind stitched sleeves and hem',
      'Machine wash delicate'
    ]
  },
  {
    id: 22,
    name: 'Minimalist Chelsea Boot in Box Calf',
    category: 'Accessories',
    gender: 'Unisex',
    price: 12990,
    oldPrice: 14990,
    description: 'Clean whole-cut Chelsea boot with concealed elastic side gussets, Goodyear welted leather sole, and discreet rear pull loop.',
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Black Polish', hex: '#0B0B0C' },
      { name: 'Deep Burgundy', hex: '#3B1B22' }
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    material: '100% Italian Box Calf Leather with Goodyear Welt',
    rating: 4.9,
    reviews: 91,
    isNew: true,
    isFeatured: false,
    isBestseller: true,
    details: [
      'Channelled Goodyear welted leather sole with rubber heel insert',
      'Calfskin lining for breathability and moldable fit',
      'Hand-burnished toe box',
      'Includes custom cedar shoe horns and dust bags'
    ]
  },
  {
    id: 23,
    name: 'Oversized Silk-Cashmere Scarf',
    category: 'Accessories',
    gender: 'Unisex',
    price: 4990,
    oldPrice: null,
    description: 'Generously proportioned 200cm x 90cm wrap woven from an ultra-fine blend of raw silk and Mongolian cashmere with delicate fringed ends.',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Charcoal Heather', hex: '#3B3B3D' },
      { name: 'Warm Ecru', hex: '#ECE7DD' },
      { name: 'Camel', hex: '#A88457' }
    ],
    sizes: ['One Size (200x90cm)'],
    material: '55% Silk, 45% Mongolian Cashmere',
    rating: 5.0,
    reviews: 84,
    isNew: false,
    isFeatured: true,
    isBestseller: false,
    details: [
      'Gauze-weave structure gives cloud-like thermal balance',
      'Hand-twisted micro eyelash fringes',
      'Featherweight 130 grams',
      'Dry clean only'
    ]
  },
  {
    id: 24,
    name: 'Tailored Wrap Trench Coat',
    category: 'Coats',
    gender: 'Women',
    price: 16490,
    oldPrice: 19990,
    description: 'An architectural reinterpretation of the traditional trench. Stripped of gun flaps and shoulder epaulettes for streamlined, dramatic elegance.',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce667823?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Classic Khaki', hex: '#A69B82' },
      { name: 'Obsidian Noir', hex: '#111111' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '100% Water-Resistant Cotton Gabardine (380 GSM)',
    rating: 4.9,
    reviews: 76,
    isNew: true,
    isFeatured: false,
    isBestseller: true,
    details: [
      'High storm collar with concealed hook-and-eye closure',
      'Full length with exaggerated deep rear rain shield',
      'Horn belt buckle and horn cuff tabs',
      'Specialist dry clean only'
    ]
  },
  {
    id: 25,
    name: 'Architectural Pleated Midi Skirt',
    category: 'Trousers',
    gender: 'Women',
    price: 5490,
    oldPrice: null,
    description: 'Permanent knife pleats sculpted from fluid matte crepe. Sits at the natural waist with an invisible zip closure.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Ecru Chalk', hex: '#F0EBDC' },
      { name: 'Onyx Black', hex: '#111111' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '100% Japanese High-Twist Crepe',
    rating: 4.8,
    reviews: 49,
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    details: [
      'Engineered permanent accordion knife pleats',
      'Seamless flat waistband',
      'Mid-calf length',
      'Dry clean'
    ]
  },
  {
    id: 26,
    name: 'Waffle-Knit Merino Beanie',
    category: 'Accessories',
    gender: 'Unisex',
    price: 1990,
    oldPrice: null,
    description: 'Chunky waffle knit beanie crafted from 100% extra-fine merino wool. Designed with a wide fold-over cuff and snug architectural crown.',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Oatmeal', hex: '#DED7C8' },
      { name: 'Jet Black', hex: '#111111' },
      { name: 'Forest Moss', hex: '#3B483B' }
    ],
    sizes: ['One Size'],
    material: '100% Pure Italian Merino Wool',
    rating: 4.9,
    reviews: 118,
    isNew: false,
    isFeatured: false,
    isBestseller: false,
    details: [
      'Heavy 7-gauge waffle knit',
      'Adjustable fold-over cuff',
      'Breathable, temperature regulating natural fibers',
      'Hand wash cold'
    ]
  }
]
