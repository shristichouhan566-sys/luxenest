/**
 * LuxeNest — Luxury Interior Architecture & Design Platform
 * Unified Data Repository (Products, Projects, Services, Styles, Reviews, Blog)
 */

window.LuxeNestData = {
  // 1. SHOP PRODUCTS (7 Categories)
  products: [
    {
      id: 'prod-1',
      name: 'Aurelia Fluted Velvet Armchair',
      category: 'Furniture',
      price: 48500,
      originalPrice: 56000,
      rating: 4.9,
      reviewsCount: 28,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      description: 'Handcrafted curved armchair upholstered in Italian terracotta velvet with brushed champagne brass cylindrical legs.',
      dimensions: '88cm W x 82cm D x 78cm H',
      material: 'Kiln-dried Teak & Italian Velvet'
    },
    {
      id: 'prod-2',
      name: 'Statuario Marble Coffee Table',
      category: 'Furniture',
      price: 74000,
      originalPrice: 85000,
      rating: 5.0,
      reviewsCount: 34,
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986b88?auto=format&fit=crop&w=800&q=80',
      description: 'Sculptural plinth coffee table carved from solid book-matched Italian Statuario marble with honed satin finish.',
      dimensions: '120cm L x 65cm W x 38cm H',
      material: 'Natural Italian Statuario Marble'
    },
    {
      id: 'prod-3',
      name: 'Celestial Hand-Hammered Brass Chandelier',
      category: 'Lighting',
      price: 52000,
      originalPrice: 62000,
      rating: 4.8,
      reviewsCount: 19,
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      description: 'Multi-tiered cascading pendant luminaire crafted in Jaipur from hand-beaten warm brass with ambient 2700K LED glow.',
      dimensions: '75cm Diameter x 90cm Drop',
      material: 'Solid Brass & Hand-blown Fluted Glass'
    },
    {
      id: 'prod-4',
      name: 'Nivara Travertine Architectural Table Lamp',
      category: 'Lighting',
      price: 24500,
      originalPrice: 29000,
      rating: 4.9,
      reviewsCount: 42,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      description: 'Monolithic raw Roman travertine base crowned with a pleated oatmeal linen conical shade.',
      dimensions: '35cm Diameter x 52cm H',
      material: 'Roman Travertine & Natural Linen'
    },
    {
      id: 'prod-5',
      name: 'Jaipur Heritage Hand-Chiseled Jali Screen',
      category: 'Wall Decor',
      price: 36000,
      originalPrice: 42000,
      rating: 5.0,
      reviewsCount: 15,
      image: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=800&q=80',
      description: 'Traditional sandstone-inspired geometric carved lattice panel with warm indirect backlighting channel.',
      dimensions: '180cm H x 60cm W x 5cm D',
      material: 'Engineered Stone Composite & Gold Leaf'
    },
    {
      id: 'prod-6',
      name: 'Solitude Minimalist Canvas Triptych',
      category: 'Wall Decor',
      price: 28500,
      originalPrice: 34000,
      rating: 4.7,
      reviewsCount: 22,
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      description: 'Textured plaster and mineral pigment abstract artwork set within floating raw oak gallery frames.',
      dimensions: '3 Panels of 60cm x 90cm each',
      material: 'Archival Canvas, Plaster & White Oak'
    },
    {
      id: 'prod-7',
      name: 'Mirzapur Hand-Knotted Wool & Silk Rug',
      category: 'Rugs & Carpets',
      price: 68000,
      originalPrice: 82000,
      rating: 5.0,
      reviewsCount: 31,
      image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
      description: 'Master weaver creation blending New Zealand wool and bamboo silk in subtle abrash taupe and champagne hues.',
      dimensions: '8ft x 10ft (240cm x 300cm)',
      material: '70% Wool, 30% Bamboo Silk'
    },
    {
      id: 'prod-8',
      name: 'Jharokha Textured Jute & Hemp Runner',
      category: 'Rugs & Carpets',
      price: 19500,
      originalPrice: 24000,
      rating: 4.8,
      reviewsCount: 18,
      image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80',
      description: 'Durable organic braided natural jute runner with charcoal border inlays, perfect for grand hallways.',
      dimensions: '2.5ft x 10ft (75cm x 300cm)',
      material: '100% Organic Hand-spun Jute'
    },
    {
      id: 'prod-9',
      name: 'Belgian Raw Linen Blackout Drapes',
      category: 'Curtains',
      price: 16500,
      originalPrice: 21000,
      rating: 4.9,
      reviewsCount: 27,
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      description: 'Heavyweight stonewashed Belgian flax linen drapes with concealed triple-weave thermal acoustic lining.',
      dimensions: 'Pair of 140cm W x 275cm Drop',
      material: '100% Belgian Flax Linen'
    },
    {
      id: 'prod-10',
      name: 'Chanderi Gold Embroidered Sheer Panels',
      category: 'Curtains',
      price: 14200,
      originalPrice: 18000,
      rating: 4.8,
      reviewsCount: 14,
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      description: 'Ethereal semi-sheer window drapery featuring delicate zari borders that capture evening sunlight.',
      dimensions: 'Pair of 135cm W x 260cm Drop',
      material: 'Silk-Cotton Blend & Fine Zari'
    },
    {
      id: 'prod-11',
      name: 'Jaipur Blue Pottery Ceremonial Urli',
      category: 'Home Accessories',
      price: 9800,
      originalPrice: 12500,
      rating: 5.0,
      reviewsCount: 46,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      description: 'Handcrafted ceramic floral bowl using authentic quartz crystal and cobalt oxide glaze for floating blossoms.',
      dimensions: '38cm Diameter x 12cm H',
      material: 'Glazed Quartz & Brass Pedestal'
    },
    {
      id: 'prod-12',
      name: 'Fluted Teak Wood Catchall Tray',
      category: 'Home Accessories',
      price: 6400,
      originalPrice: 8000,
      rating: 4.7,
      reviewsCount: 23,
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      description: 'Sculpted single-piece solid CP teakwood tray with brass corner inlays for coffee tables and console styling.',
      dimensions: '45cm L x 28cm W x 4cm H',
      material: 'Solid Indian Teakwood & Brass'
    },
    {
      id: 'prod-13',
      name: 'Wabi-Sabi Terracotta Sculptural Vessel',
      category: 'Decorative Items',
      price: 8500,
      originalPrice: 11000,
      rating: 4.9,
      reviewsCount: 38,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      description: 'Organic asymmetric wheel-thrown earthenware vase finished in distressed mineral wash for dried botanicals.',
      dimensions: '28cm W x 42cm H',
      material: 'Natural Terracotta Clay'
    },
    {
      id: 'prod-14',
      name: 'Monolithic Brass Hourglass Bookends',
      category: 'Decorative Items',
      price: 11200,
      originalPrice: 14000,
      rating: 4.8,
      reviewsCount: 16,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      description: 'Pair of weighty solid brass geometric bookends with brushed champagne finish and felt base protection.',
      dimensions: '14cm W x 10cm D x 18cm H (each)',
      material: '100% Cast Brass'
    },
    {
      id: 'prod-15',
      name: 'Elysian Bouclé Curved 3-Seater Sofa',
      category: 'Furniture',
      price: 135000,
      originalPrice: 155000,
      rating: 5.0,
      reviewsCount: 29,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      description: 'Sculptural organic silhouette sofa upholstered in tactile ivory French bouclé with high-density foam core.',
      dimensions: '230cm W x 105cm D x 76cm H',
      material: 'Solid Pine Frame & French Bouclé'
    },
    {
      id: 'prod-16',
      name: 'Zenith Fluted Smoked Glass Sconce',
      category: 'Lighting',
      price: 18500,
      originalPrice: 22000,
      rating: 4.9,
      reviewsCount: 25,
      image: 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=800&q=80',
      description: 'Vertical architectural wall sconce with fluted smoked borosilicate glass and brushed brass backplate.',
      dimensions: '12cm W x 15cm D x 48cm H',
      material: 'Borosilicate Glass & Brass'
    }
  ],

  // 2. PORTFOLIO PROJECTS
  projects: [
    {
      id: 'proj-1',
      title: 'The Jaipur Heritage Home',
      location: 'C-Scheme, Jaipur',
      category: 'Full Home',
      roomType: 'Full Home',
      style: 'Modern Rajasthani',
      area: '2,000 sq ft',
      duration: '4 Months',
      budget: '₹11.2 Lakhs',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=85',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85'
      ],
      description: 'Sensitive conservation and modernization of a 35-year-old sandstone Haveli. Restored vaulted cusped arches, green Kota stone flooring with brass inlays, and hidden smart home automation.',
      highlights: ['Restored Cusped Arches', 'Araish Lime Plaster', 'Kota Stone with Brass Inlays', 'Bespoke Teak Millwork']
    },
    {
      id: 'proj-2',
      title: 'The Altamount Salon',
      location: 'Altamount Road, Mumbai',
      category: 'Living Room',
      roomType: 'Living Room',
      style: 'Haute Luxury',
      area: '1,400 sq ft',
      duration: '3 Months',
      budget: '₹28 Lakhs',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85'
      ],
      description: 'Double-height social salon featuring book-matched Italian Statuario marble walls, smoked oak fluted panels, and custom champagne brass lighting.',
      highlights: ['Double Height Ceiling', 'Statuario Marble', 'Acoustic Suede Panelling', 'Sculptural Chandeliers']
    },
    {
      id: 'proj-3',
      title: 'Serenade Master Suite',
      location: 'Golf Course Road, Gurugram',
      category: 'Bedroom',
      roomType: 'Bedroom',
      style: 'Minimalist Wabi-Sabi',
      area: '650 sq ft',
      duration: '6 Weeks',
      budget: '₹9.5 Lakhs',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85'
      ],
      description: 'A calming minimalist bedroom retreat emphasizing natural lime wash micro-cement walls, floating platform bed, and concealed dressing corridor.',
      highlights: ['Micro-Cement Finish', 'Hidden Flush Wardrobes', 'Indirect Cove Glow', 'Pure Linen Upholstery']
    },
    {
      id: 'proj-4',
      title: 'The Culinary Atelier',
      location: 'Koregaon Park, Pune',
      category: 'Kitchen',
      roomType: 'Kitchen',
      style: 'Modern Contemporary',
      area: '420 sq ft',
      duration: '7 Weeks',
      budget: '₹14.8 Lakhs',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85'
      ],
      description: 'Ergonomic gourmet kitchen engineered with German soft-close hardware, sintered Dekton porcelain island, and integrated sub-zero wine preservation.',
      highlights: ['Dekton Sintered Island', 'Motorized Lift Cabinets', 'Touchless Concealed Hob', 'Fluted Walnut Joinery']
    },
    {
      id: 'proj-5',
      title: 'Aura Marble Bath Sanctuary',
      location: 'Indiranagar, Bengaluru',
      category: 'Bathroom',
      roomType: 'Bathroom',
      style: 'Luxury Spa',
      area: '280 sq ft',
      duration: '5 Weeks',
      budget: '₹8.4 Lakhs',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=85'
      ],
      description: 'Spa-inspired primary en-suite with freestanding volcanic limestone soaking tub, frameless rain shower, and thermostatic brushed brass mixers.',
      highlights: ['Volcanic Limestone Tub', 'Floor-to-Ceiling Travertine', 'Heated Towel Rail', 'Concealed Drain Channels']
    },
    {
      id: 'proj-6',
      title: 'The Executive Library & Studio',
      location: 'Chanakyapuri, New Delhi',
      category: 'Office',
      roomType: 'Office',
      style: 'Contemporary Classic',
      area: '520 sq ft',
      duration: '6 Weeks',
      budget: '₹12 Lakhs',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85'
      ],
      description: 'High-focus executive workspace enveloped in floor-to-ceiling smoked walnut bookshelves with rolling brass ladder and acoustic fabric baffles.',
      highlights: ['Smoked Walnut Millwork', 'Rolling Brass Ladder', 'Concealed Cable Management', 'Biophilic Skylight']
    },
    {
      id: 'proj-7',
      title: 'Pali Hill Seaside Penthouse',
      location: 'Bandra West, Mumbai',
      category: 'Full Home',
      roomType: 'Full Home',
      style: 'Contemporary Luxury',
      area: '3,800 sq ft',
      duration: '5 Months',
      budget: '₹48 Lakhs',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85'
      ],
      description: 'Expansive duplex penthouse celebrating panoramic Arabian Sea views with low-slung Italian furniture, curved partitions, and motorized architectural louvers.',
      highlights: ['360° Arabian Sea Vistas', 'Motorized Louvers', 'Custom Curved Partitions', 'Smart Home Lutron System']
    },
    {
      id: 'proj-8',
      title: 'The Bohemian Garden Villa',
      location: 'Assagao, North Goa',
      category: 'Full Home',
      roomType: 'Full Home',
      style: 'Bohemian Chic',
      area: '2,600 sq ft',
      duration: '3.5 Months',
      budget: '₹18 Lakhs',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85'
      ],
      description: 'Tropical indoor-outdoor residence bathed in sunlight, woven cane webbing, terracotta tile floors, vintage Portuguese arches, and lush foliage.',
      highlights: ['Terracotta Tile Flooring', 'Woven Cane Furniture', 'Restored Portuguese Arches', 'Courtyard Plunge Pool']
    }
  ],

  // 3. SERVICES (7 Exact Services)
  services: [
    {
      id: 'serv-1',
      title: 'Living Room Design',
      tagline: 'The Social Anchor of Your Home',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      description: 'Create stylish, evocative, and functional living spaces tailored to your family rhythms and entertainment lifestyle. We master lighting layers, acoustic balance, and statement furniture.',
      deliverables: ['Custom Sectional & Armchair Curation', 'Architectural Cove & Mood Lighting Plan', 'Feature Wall & TV Media Unit Engineering', 'Curated Rugs, Drapes & Art Placement'],
      timeline: '2 – 4 Weeks Design • 4 – 6 Weeks Build'
    },
    {
      id: 'serv-2',
      title: 'Bedroom Design',
      tagline: 'Private Sanctuaries for Deep Rest',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      description: 'Design comfortable, relaxing, and personalized bedroom interiors. We balance circadian rhythm lighting, tactile natural bedding, acoustic isolation, and seamless walk-in wardrobes.',
      deliverables: ['Custom Upholstered Platform Bed Design', 'Full-Height Concealed Wardrobe Systems', 'Circadian Reading & Indirect Bedside Lights', 'Acoustic Soundproofing & Drapes'],
      timeline: '2 – 3 Weeks Design • 3 – 5 Weeks Build'
    },
    {
      id: 'serv-3',
      title: 'Kitchen Design',
      tagline: 'Ergonomic Precision & Culinary Beauty',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      description: 'Design modern, practical, and beautiful kitchens with smart space utilization. German hardware mechanisms, stain-proof quartz surfaces, and effortless workflow triangles.',
      deliverables: ['Golden Work-Triangle Ergonomics Layout', 'German Soft-Close Modular Cabinetry', 'Heat & Scratch Resistant Sintered Stone', 'Built-in Appliance & Pantry Integration'],
      timeline: '3 Weeks Design • 4 – 6 Weeks Build'
    },
    {
      id: 'serv-4',
      title: 'Bathroom Design',
      tagline: 'Private Spa & Wellness Retreats',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      description: 'Create elegant and functional bathroom interiors with modern finishes. Natural stone cladding, frameless glass enclosures, floating vanities, and thermostatic fixtures.',
      deliverables: ['Wet & Dry Spatial Zoning', 'Custom Quartz or Marble Floating Vanity', 'Thermostatic Rain Shower & Concealed Cistern', 'Anti-Fog Backlit Mirrors & Ambient Niches'],
      timeline: '2 Weeks Design • 3 – 4 Weeks Build'
    },
    {
      id: 'serv-5',
      title: 'Office / Workspace',
      tagline: 'High-Focus Professional Sanctuaries',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      description: 'Design productive, comfortable, and professional workspaces. Ergonomic seating, glare-free optical lighting, acoustic absorption, and video-conference ready architectural backdrops.',
      deliverables: ['Custom Ergonomic Desk & Storage Joinery', 'Acoustic Wall Panelling for Zoom Clarity', 'Glare-free Task & Ambient Lighting Layout', 'Concealed Tech Conduit & Cable Management'],
      timeline: '2 Weeks Design • 3 – 4 Weeks Build'
    },
    {
      id: 'serv-6',
      title: 'Full Home Interior',
      tagline: 'Complete Turnkey Masterpieces',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      description: 'Complete interior design and turnkey construction solutions for your entire residence. From structural reconfiguration to custom millwork, styling, and white-glove handover with 10-year warranty.',
      deliverables: ['Comprehensive Architectural Blueprint & 3D VR', 'Turnkey Civil, Flooring, Electrical & Plumbing', 'Factory-Manufactured Modular Furniture', 'White-Glove Styling & 10-Year Warranty'],
      timeline: '4 – 6 Weeks Design • 10 – 16 Weeks Build'
    },
    {
      id: 'serv-7',
      title: '3D Interior Visualization',
      tagline: 'Experience Your Home Before Construction Begins',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      description: 'Provide hyper-realistic 3D visualizations, material simulations, and 360-degree VR walkthroughs so clients can experience and refine their space down to the millimeter prior to execution.',
      deliverables: ['Photorealistic 4K CGI Room Renderings', '360° Virtual Reality Interactive Walkthrough', 'Daylight & Evening Illumination Simulation', 'Exact Material, Texture & Color Accuracy'],
      timeline: '7 – 14 Business Days'
    }
  ],

  // 4. DESIGN STYLES (7 Styles)
  styles: [
    {
      id: 'style-modern',
      name: 'Modern',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      description: 'Crisp geometric lines, flush concealed joinery, concealed magnetic track lighting, and fluid spatial openness.',
      palette: ['#161817', '#FAF8F5', '#C5A880', '#545856'],
      elements: ['Flush Doors', 'Linear Lighting', 'Glass Partitions', 'Continuous Flooring']
    },
    {
      id: 'style-minimalist',
      name: 'Minimalist',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      description: 'Wabi-sabi calmness through intentional negative space, seamless micro-cement, and soft sculpted curves.',
      palette: ['#F5EDE0', '#E5DDD0', '#A89E90', '#3E3A36'],
      elements: ['Micro-Cement', 'Hidden Storage', 'Organic Curves', 'Tactile Linen']
    },
    {
      id: 'style-luxury',
      name: 'Luxury',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      description: 'Opulent depth with book-matched Italian Statuario marble, fluted smoked oak, and brushed champagne brass.',
      palette: ['#121413', '#C5A880', '#D4AF37', '#F6F2EC'],
      elements: ['Bookmatched Marble', 'Champagne Brass', 'Fluted Panelling', 'Velvet Upholstery']
    },
    {
      id: 'style-contemporary',
      name: 'Contemporary',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      description: 'Dynamic present-day sophistication: curved bouclé seating, mixed warm metallics, and gallery-worthy art.',
      palette: ['#FAF8F5', '#2E2D2B', '#C86D51', '#7E7A75'],
      elements: ['Curved Bouclé', 'Sculptural Lighting', 'Mixed Metals', 'Curated Art']
    },
    {
      id: 'style-scandinavian',
      name: 'Scandinavian',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      description: 'Airy Nordic simplicity with pale blonde woods, soft layered hygge textiles, and abundant natural daylight.',
      palette: ['#FFFFFF', '#ECE8E1', '#8A9A86', '#4A4A48'],
      elements: ['Blonde White Oak', 'Hygge Textiles', 'Natural Light Channels', 'Slender Metal Accents']
    },
    {
      id: 'style-bohemian',
      name: 'Bohemian',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      description: 'Artisanal warmth driven by handwoven rattan cane webbing, vintage kilims, terracotta, and lush biophilic greenery.',
      palette: ['#C2684E', '#D9A74A', '#2E4A3E', '#F5EFEB'],
      elements: ['Woven Cane Webbing', 'Vintage Kilims', 'Terracotta Vessels', 'Indoor Monstera Foliage']
    },
    {
      id: 'style-indian',
      name: 'Indian / Traditional',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      description: 'Royal artisanal heritage: carved teak jharokhas, hand-beaten brass urlis, Pichwai art niches, and polished Kota stone.',
      palette: ['#4A6356', '#2E5B88', '#C5A880', '#613B26'],
      elements: ['Teak Jharokhas', 'Araish Lime Plaster', 'Kota Stone Inlays', 'Handcrafted Brass Urlis']
    }
  ],

  // 5. PACKAGES & PRICING
  packages: [
    {
      id: 'pkg-essential',
      name: 'Essential',
      tagline: 'For simple, elegant interior transformations with refined taste.',
      startingPrice: '₹5,50,000',
      badge: 'Starter Choice',
      featured: false,
      deliverables: [
        'Dedicated Interior Designer & Site Supervisor',
        'Detailed 2D Floor Plan & Furniture Layout',
        '3D Photorealistic Views (2 Angles per Room)',
        'Curated Material & Color Board Guidance',
        'Standard Modular Wardrobes & Kitchen Cabinets',
        'Up to 2 Revisions per Space',
        '5-Year Warranty on Modular Joinery',
        'Estimated Timeline: 45 – 60 Days'
      ]
    },
    {
      id: 'pkg-premium',
      name: 'Premium',
      tagline: 'Our most popular tier: customized, detailed, and elevated living.',
      startingPrice: '₹9,50,000',
      badge: 'Most Popular',
      featured: true,
      deliverables: [
        'Senior Principal Architect Consultation',
        'Comprehensive 2D & Technical MEP Drawings',
        'Full 3D CGI Photorealistic Renders & VR Tour',
        'Premium Factory-Finished Marine Grade Millwork',
        'Architectural False Ceiling & Cove Lighting Plan',
        'Designer Wallpaper / Texture Wall Treatment',
        'Up to 4 Iterative Revisions per Room',
        '8-Year Warranty with Annual Inspections',
        'Estimated Timeline: 60 – 75 Days'
      ]
    },
    {
      id: 'pkg-luxury',
      name: 'Luxury',
      tagline: 'Haute turnkey bespoke architecture for palatial homes and penthouses.',
      startingPrice: '₹16,50,000',
      badge: 'Haute Couture',
      featured: false,
      deliverables: [
        'Executive Design Director & Master Artisan Team',
        'Unlimited 3D Renders & Interactive VR Walkthrough',
        'Italian Statuario Marble / Sintered Porcelain Inlays',
        'Custom Handcrafted Teak, Brass & Fluted Joinery',
        'Smart Home Automation & Motorized Curtain Tracks',
        'Curated Designer Soft Furnishings & Art Procurement',
        'Unlimited Revisions until 100% Satisfaction',
        '10-Year Comprehensive Structural Warranty',
        'Estimated Timeline: 90 – 120 Days'
      ]
    }
  ],

  // 6. CUSTOMER REVIEWS
  reviews: [
    {
      id: 'rev-1',
      name: 'Vikramaditya & Gayatri Rathore',
      location: 'C-Scheme, Jaipur',
      project: 'Jaipur Heritage Home (2,000 sq ft)',
      service: 'Full Home Interior',
      rating: 5,
      date: 'August 2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      text: 'LuxeNest treated our 35-year-old family Haveli with deep architectural reverence. The restored sandstone arches, green Kota stone with brass inlays, and hidden smart automation turned our home into a royal sanctuary. Finished in exactly 4 months within our ₹11.2L budget without a single rupee of overrun.'
    },
    {
      id: 'rev-2',
      name: 'Aranya & Siddharth Sen',
      location: 'The Magnolias, Gurugram',
      project: 'Minimalist 3 BHK (1,850 sq ft)',
      service: 'Living Room & Bedroom',
      rating: 5,
      date: 'July 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      text: 'We wanted an uncluttered, wabi-sabi minimalist sanctuary amidst busy city life. The micro-cement walls, concealed flush doors, and architectural cove lighting are sheer perfection. Every guest who visits is captivated by the serene energy.'
    },
    {
      id: 'rev-3',
      name: 'Meera Singhania',
      location: 'Worli Sea Face, Mumbai',
      project: 'Altamount Penthouse (3,400 sq ft)',
      service: 'Full Home Interior',
      rating: 5,
      date: 'June 2026',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      text: 'The Italian Statuario marble bookmatching and brushed champagne brass joinery in our living salon are world-class. LuxeNest operates with the precision of a European design house while understanding Indian living deeply.'
    },
    {
      id: 'rev-4',
      name: 'Rajeev & Priya Nambiar',
      location: 'Indiranagar, Bengaluru',
      project: 'Contemporary Duplex (2,400 sq ft)',
      service: 'Kitchen & Living Room',
      rating: 5,
      date: 'May 2026',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      text: 'Our kitchen transformation is simply unbelievable. The sintered Dekton island and German soft-close cabinetry make cooking a pleasure. Delivered on the exact committed handover date.'
    },
    {
      id: 'rev-5',
      name: 'Kabir & Tanya Oberoi',
      location: 'Chanakyapuri, New Delhi',
      project: 'Heritage Villa Library (520 sq ft)',
      service: 'Office / Workspace',
      rating: 5,
      date: 'April 2026',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
      text: 'LuxeNest designed our study with smoked walnut millwork, a rolling brass ladder, and acoustic baffles. It is the most inspiring workspace I have ever worked in.'
    },
    {
      id: 'rev-6',
      name: 'Dr. Ananya Roy',
      location: 'Kalyani Nagar, Pune',
      project: 'Serene Master Suite (600 sq ft)',
      service: 'Bedroom Design',
      rating: 5,
      date: 'March 2026',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      text: 'The circadian lighting system and concealed dressing room created by LuxeNest have genuinely improved my sleep quality and evening relaxation. 10/10 recommend!'
    }
  ],

  // 7. BLOG ARTICLES (7 Categories)
  articles: [
    {
      id: 'blog-1',
      title: 'The Modern Heritage Movement: Reviving Ancestral Arches in Contemporary Homes',
      category: 'Interior Trends',
      author: 'Aarav Malhotra, Principal Architect',
      date: 'September 8, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      excerpt: 'How contemporary designers are reinterpreting cusped jharokhas, Kota stone inlays, and traditional lime plasters for high-speed modern lifestyles.',
      content: `
        <p>Across India's most evocative residences, a quiet renaissance is taking place. Homeowners are no longer satisfied with generic, cookie-cutter glass-and-chrome boxes. Instead, there is a deep, poetic longing to ground modern spaces in the tactile, time-honored language of ancestral craft.</p>
        <h4>The Balance Between Heritage and Modernity</h4>
        <p>In our recent <em>Jaipur Heritage Home</em> project, the primary challenge was to preserve load-bearing sandstone arches while integrating high-efficiency HVAC and motorized shades. The answer lay in combining traditional Araish mirror lime plaster with recessed LED channels that trace the historical geometry without piercing the masonry.</p>
        <h4>Key Rules for Modern Heritage Design:</h4>
        <ul>
          <li><strong>Restrain the Color Palette:</strong> Let natural stone and lime plaster serve as the neutral backdrop; do not overpower with saturated colors.</li>
          <li><strong>Celebrate Honest Joinery:</strong> Use genuine reclaimed teak and brass inlays rather than faux veneers.</li>
          <li><strong>Conceal the Technology:</strong> Smart home modules should be completely hidden, operating silently behind timber panels.</li>
        </ul>
      `
    },
    {
      id: 'blog-2',
      title: 'Sculpting Negative Space: The Wabi-Sabi Blueprint for Peaceful Living',
      category: 'Design Tips',
      author: 'Elena Rostova, Design Director',
      date: 'August 28, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Discover why what you omit from a room is far more impactful than what you place inside it. Mastering spatial breathing room.',
      content: `
        <p>Minimalism is often misunderstood as stark emptiness. In reality, authentic minimalist design is an act of deep curation. It is about creating room for natural light to breathe and allowing your thoughts to decelerate the moment you cross your threshold.</p>
        <h4>Micro-Cement and Tactile Surfaces</h4>
        <p>When visual clutter is eliminated, texture becomes the visual hero. Seamless micro-cement floors, hand-raked lime wash walls, and unlacquered natural oak provide a rich tactile experience that synthetic materials cannot replicate.</p>
      `
    },
    {
      id: 'blog-3',
      title: 'Lighting Layering 101: Moving Beyond Harsh Overhead Downlights',
      category: 'Home Decor',
      author: 'Devika Sharma, Lighting Specialist',
      date: 'August 14, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      excerpt: 'The three essential tiers of architectural illumination: Ambient, Task, and Accent, and how to create golden-hour intimacy every night.',
      content: `
        <p>Nothing destroys the ambiance of a luxury interior faster than aggressive 6000K overhead downlights. A thoughtfully illuminated room should never rely on a single light source; it requires an orchestra of distinct lighting layers.</p>
        <h4>The Golden Rules of Warm Illumination</h4>
        <p>Always calibrate your residential light fixtures to 2700K – 3000K warm white. Use indirect cove lighting to bounce illumination off matte ceilings, and place low-level lamps to anchor conversation areas in golden pools of light.</p>
      `
    },
    {
      id: 'blog-4',
      title: 'Small Spaces, Grand Statements: Architectural Tricks for Compact Apartments',
      category: 'Small Spaces',
      author: 'Nikhil Verma, Senior Space Planner',
      date: 'July 30, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      excerpt: 'How floor-to-ceiling joinery, floating plinths, and optical mirror axes can visually double the square footage of urban homes.',
      content: `
        <p>In metropolitan centers like Mumbai, Delhi, and Bengaluru, square footage is precious. Designing compact homes requires surgical spatial planning that maximizes vertical capacity without inducing claustrophobia.</p>
      `
    },
    {
      id: 'blog-5',
      title: 'The 2026 Palette Forecast: Earthy Terracottas, Mineral Greens & Champagne Brass',
      category: 'Color Inspiration',
      author: 'Elena Rostova, Design Director',
      date: 'July 18, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Why cold greys are officially behind us and warm biophilic mineral pigments are dominating high-end residential interiors.',
      content: `
        <p>The interior design world has bid a decisive farewell to sterile millennial grey. In its place, we are seeing a warm embrace of grounded pigments: warm terracotta, sun-baked ochre, deep forest moss, and brushed champagne metals that reflect warmth.</p>
      `
    },
    {
      id: 'blog-6',
      title: 'The Anatomy of a Curated Sofa: Bouclé, Velvet, and Ergonomic Foam Ratios',
      category: 'Furniture',
      author: 'Aarav Malhotra, Principal Architect',
      date: 'June 25, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Everything you need to know before investing in bespoke seating: frame timber density, spring suspension, and fabric rub counts.',
      content: `
        <p>A sofa is the single most heavily utilized piece of furniture in any home. Investing in a luxury piece requires understanding the internal craftsmanship: kiln-dried hardwood frames, high-resilience foam cores, and high-Martindale upholstery.</p>
      `
    }
  ]
};
