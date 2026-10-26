/**
 * Historical Artifact Information System - Sample Archaeological & Epigraphical Dataset
 * Designed for DBMS academic presentation and seamless future REST/MySQL integration.
 */

export const categories = [
  {
    id: "bronze-sculptures",
    name: "Bronze Sculptures",
    description: "Cire-perdue (lost-wax) cast sacred and court statuary celebrated worldwide for fluid aesthetics.",
    icon: "Sparkles",
    artifactCount: 5
  },
  {
    id: "stone-sculptures",
    name: "Stone Sculptures",
    description: "Monolithic relief, granitic iconography, and intricately carved chloritic schist friezes.",
    icon: "Landmark",
    artifactCount: 5
  },
  {
    id: "temple-inscriptions",
    name: "Temple Inscriptions",
    description: "Lithic epigraphs in ancient Grantha, Vatteluttu, and Tamil Brahmi documenting royal charters and village councils.",
    icon: "ScrollText",
    artifactCount: 4
  },
  {
    id: "ancient-coins",
    name: "Ancient Coins",
    description: "Punch-marked, die-struck numismatic artifacts of gold, silver, potin, and copper indicating trade networks.",
    icon: "Coins",
    artifactCount: 4
  },
  {
    id: "ancient-pottery",
    name: "Ancient Pottery",
    description: "Iron Age Black-and-Red Ware (BRW), rouletted ceramics, and megalithic burial storage urns.",
    icon: "Layers",
    artifactCount: 4
  },
  {
    id: "traditional-weapons",
    name: "Traditional Weapons",
    description: "Crucible Wootz steel swords, daggers, katar blades, and metallurgical defenses of royal armories.",
    icon: "Shield",
    artifactCount: 3
  },
  {
    id: "ancient-jewellery",
    name: "Ancient Jewellery",
    description: "Etched carnelian beads, micro-granulated gold filigree, and sacred repoussé amulets.",
    icon: "Gem",
    artifactCount: 3
  },
  {
    id: "historical-manuscripts",
    name: "Historical Manuscripts",
    description: "Inscribed palm-leaf talipot folios (ola-chudi), birch bark documents, and treaty codices.",
    icon: "BookOpen",
    artifactCount: 3
  }
];

export const states = [
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    shortCode: "TN",
    description: "Cradle of Dravidian architectural heritage, Sangam antiquity, monumental temples, and celebrated bronze metallurgy.",
    geographicZone: "Southern Coromandel Coast",
    eraSignificance: "Sangam Age through Chola, Pandya, Pallava, and Vijayanagara epochs."
  },
  {
    id: "kerala",
    name: "Kerala",
    shortCode: "KL",
    description: "Renowned for maritime spice trade routes, rock-cut cave temples, unique copper-plate charters, and metallurgical weaponry.",
    geographicZone: "Malabar Coast & Western Ghats",
    eraSignificance: "Early Cheras, Ay Dynasty, Venad, and the Zamorins of Calicut."
  },
  {
    id: "karnataka",
    name: "Karnataka",
    shortCode: "KA",
    description: "Famed for rock architecture, intricate Hoysala temple friezes, Chalukyan experiments, and the grand capital of Hampi.",
    geographicZone: "Deccan Plateau & Karavali",
    eraSignificance: "Badami Chalukyas, Rashtrakutas, Hoysalas, and Vijayanagara Empire."
  },
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    shortCode: "AP",
    description: "Historic hub of Satavahana numismatics, Buddhist stupa marble friezes along the Krishna river, and Kakatiya craftsmanship.",
    geographicZone: "Eastern Deccan & Coastal Andhra",
    eraSignificance: "Satavahanas, Ikshvakus, Eastern Chalukyas, and Kakatiyas."
  }
];

export const districts = [
  // Tamil Nadu Districts
  {
    id: "thanjavur",
    name: "Thanjavur",
    stateId: "tamil-nadu",
    description: "Heartland of the Imperial Cholas, home to Brihadisvara Temple, classical metallurgy, and the historic Saraswathi Mahal archives.",
  },
  {
    id: "madurai",
    name: "Madurai",
    stateId: "tamil-nadu",
    description: "Ancient Sangam capital along the Vaigai river, pivotal for Pandyan epigraphy, trade coins, and stone carvings.",
  },
  {
    id: "kanchipuram",
    name: "Kanchipuram",
    stateId: "tamil-nadu",
    description: "Historic city of learning (Ghatikasthan) and capital of the Pallavas, center for early granite architecture and inscription charters.",
  },
  {
    id: "chennai",
    name: "Chennai",
    stateId: "tamil-nadu",
    description: "Metropolitan home to the Government Museum Egmore repository, housing premier prehistoric, Buddhist, and Pallava-Chola collections.",
  },
  {
    id: "tiruchirappalli",
    name: "Tiruchirappalli",
    stateId: "tamil-nadu",
    description: "Prominent Kaveri delta node featuring early rock-cut shrines, medieval trade guilds records, and riverine trade artifacts.",
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    stateId: "tamil-nadu",
    description: "Key center for Megalithic industrial archaeology, Roman coin hoard discoveries, and ancient Kongu Nadu gem lapidary works.",
  },

  // Kerala Districts
  {
    id: "thiruvananthapuram",
    name: "Thiruvananthapuram",
    stateId: "kerala",
    description: "Historic seat of the Venad and Travancore royalty, housing royal armories, palatial manuscripts, and granite temple relics.",
  },
  {
    id: "thrissur",
    name: "Thrissur",
    stateId: "kerala",
    description: "Cultural nucleus featuring the ancient Vadakkunnathan complex, Megalithic dolmens, and traditional ritualistic bronzes.",
  },
  {
    id: "ernakulam",
    name: "Ernakulam",
    stateId: "kerala",
    description: "Historic Muziris port hinterland (Pattanam), yielding Mediterranean amphorae, Roman coins, and maritime trade seals.",
  },
  {
    id: "kozhikode",
    name: "Kozhikode",
    stateId: "kerala",
    description: "Storied Port of Calicut, governed by the Zamorins, crucial for naval metallurgy, trade coins, and palm-leaf astronomical treatises.",
  },
  {
    id: "palakkad",
    name: "Palakkad",
    stateId: "kerala",
    description: "Strategic natural pass in the Western Ghats connecting Tamil inland plains to Kerala, abundant in granite sculptures and fortification relics.",
  },

  // Karnataka Districts
  {
    id: "ballari",
    name: "Ballari (Hampi)",
    stateId: "karnataka",
    description: "UNESCO World Heritage precinct and seat of the Vijayanagara Empire, rich in monolithic stone statuary and gold numismatics.",
  },
  {
    id: "mysuru",
    name: "Mysuru",
    stateId: "karnataka",
    description: "Royal center of the Wodeyars and Hoysala borders, famous for sandalwood craft, palace armaments, and copper-plate grants.",
  },
  {
    id: "hassan",
    name: "Hassan",
    stateId: "karnataka",
    description: "Heart of the Hoysala Empire (Belur and Halebidu), celebrated for hyper-detailed chloritic schist bracket stone carvings.",
  },
  {
    id: "bagalkot",
    name: "Bagalkot (Badami/Aihole)",
    stateId: "karnataka",
    description: "Cradle of Indian temple architecture under the Early Chalukyas, known for red sandstone cave reliefs and 7th-century epigraphs.",
  },
  {
    id: "bengaluru-urban",
    name: "Bengaluru Urban",
    stateId: "karnataka",
    description: "Custodial center hosting Karnataka State Archaeological Museum, preserving Ganga dynasty hero stones (Veergallu) and Chola bronzes.",
  },

  // Andhra Pradesh Districts
  {
    id: "guntur",
    name: "Guntur (Amaravati)",
    stateId: "andhra-pradesh",
    description: "World-renowned ancient Buddhist monastic hub famous for Palnadu limestone bas-reliefs, stupa balustrades, and early Prakrit inscriptions.",
  },
  {
    id: "vijayawada",
    name: "Vijayawada (NTR)",
    stateId: "andhra-pradesh",
    description: "Krishna river trading center with 5th-century Mogalarajapuram and Undavalli rock-cut cave architectures and Eastern Chalukya relics.",
  },
  {
    id: "tirupati",
    name: "Tirupati",
    stateId: "andhra-pradesh",
    description: "Ancient spiritual center containing rare copper-plate collections of Annamacharya songs and Vijayanagara royal bronze dedications.",
  },
  {
    id: "kurnool",
    name: "Kurnool",
    stateId: "karnataka", // will link to andhra-pradesh
    stateId: "andhra-pradesh",
    description: "Historic gateway to Rayalaseema, home to Ketavaram prehistoric rock paintings, Yaganti monolithic carvings, and Chalukya-era inscriptions.",
  },
  {
    id: "visakhapatnam",
    name: "Visakhapatnam",
    stateId: "andhra-pradesh",
    description: "Coastal node boasting Thotlakonda and Bojjannakonda Buddhist rock-cut monasteries with antique terracotta and stupa relics.",
  }
];

export const artifacts = [
  // 1. Thanjavur - Chola Nataraja
  {
    id: "ART-TN-001",
    name: "Ananda Tandava Nataraja Bronze",
    category: "Bronze Sculptures",
    stateId: "tamil-nadu",
    state: "Tamil Nadu",
    districtId: "thanjavur",
    district: "Thanjavur",
    historicalPeriod: "Imperial Chola Period",
    dynasty: "Chola Dynasty",
    approximateAge: "Circa 10th - 11th Century CE (Approx. 1,000 years old)",
    material: "Panchaloha (Five-metal sacred copper-tin alloy)",
    placeOfOrigin: "Kaveri Basin Workshop, Thanjavur region",
    shortDescription: "Masterpiece of lost-wax casting depicting Shiva performing the cosmic dance within a flaming halo (Prabhamandala).",
    historicalDescription: "Produced during the zenith of the Imperial Chola metallurgical renaissance, this icon embodies the technical and spiritual pinnacle of South Indian lost-wax (cire-perdue) sculpture. The deity balances upon the dwarf demon of ignorance (Apasmara), his four arms holding the damaru of creation and the agni of dissolution, while granting abhaya (fearlessness).",
    historicalSignificance: "Represents one of the greatest artistic achievements in world metallurgy. Exemplifies how royal Chola patronage elevated village bronze guilds to formulate standardized canons of proportion recorded in Silpa Shastras.",
    culturalImportance: "Integral to Saivite temple processions (Utsava Murti) where deities moved into public streets, bridging sanctum spirituality with community civic life."
  },

  // 2. Thanjavur - Brihadisvara Tamil Epigraph
  {
    id: "ART-TN-002",
    name: "Brihadisvara Foundation Epigraph Stone Slab",
    category: "Temple Inscriptions",
    stateId: "tamil-nadu",
    state: "Tamil Nadu",
    districtId: "thanjavur",
    district: "Thanjavur",
    historicalPeriod: "Medieval Chola Period",
    dynasty: "Chola Dynasty",
    approximateAge: "1010 CE (Approx. 1,016 years old)",
    material: "Granite Stone Bas-Relief Incising",
    placeOfOrigin: "Base plinth of the Big Temple, Thanjavur",
    shortDescription: "Monumental Tamil-Grantha inscription detailing the royal grants, names of architects, and treasury audit ordered by Rajaraja Chola I.",
    historicalDescription: "Engraved in exceptionally crisp classical Tamil and Grantha scripts across the southern base plinths of the Rajarajesvaram (Brihadisvara). The inscription contains the famous imperial edict commanding that not only royal gifts but every single donation made by the king's elder sister Kundavai, his queens, commanders, and public officers be scrupulously recorded in stone.",
    historicalSignificance: "Serves as an infallible primary epigraphic benchmark for 11th-century statecraft, land tenure taxation, temple economy, and socio-administrative transparency in medieval India.",
    culturalImportance: "A testament to the permanence of historical documentation and municipal accounting in classical Tamil civilization."
  },

  // 3. Thanjavur - Saraswathi Mahal Palm Leaf
  {
    id: "ART-TN-003",
    name: "Saraswathi Mahal Palm-Leaf Medical Treatise",
    category: "Historical Manuscripts",
    stateId: "tamil-nadu",
    state: "Tamil Nadu",
    districtId: "thanjavur",
    district: "Thanjavur",
    historicalPeriod: "Nayak - Maratha Era",
    dynasty: "Thanjavur Maratha Dynasty",
    approximateAge: "Circa 17th - 18th Century CE (Approx. 300 years old)",
    material: "Treated Borassus flabellifer (Palmyra palm) leaves with herbal lampblack ink",
    placeOfOrigin: "Saraswathi Mahal Royal Library, Thanjavur",
    shortDescription: "Bound palm-leaf manuscript documenting Siddha pharmacology, pulse diagnosis (Nadi Pariksha), and herbal formulations.",
    historicalDescription: "Compiled by royal physicians under royal court patronage, this bundle comprises 148 etched palm leaves bound with cord between lacquered wooden covers. Inscriptions were carved using an iron stylus (Ezhuthani) and subsequently rubbed with turmeric and charcoal extract to guarantee legibility and natural insect resistance.",
    historicalSignificance: "Documents the cross-pollination of Indigenous Siddha, Ayurvedic, and early Unani medical paradigms nurtured in the scholarly court of Serfoji II.",
    culturalImportance: "Preserves ancestral botanical taxonomy, indigenous preventative healthcare formulas, and centuries of empirical healing knowledge."
  },

  // 4. Madurai - Pandyan Punch-Marked Coin Hoard
  {
    id: "ART-TN-004",
    name: "Early Pandyan Twin-Carp Silver Coin",
    category: "Ancient Coins",
    stateId: "tamil-nadu",
    state: "Tamil Nadu",
    districtId: "madurai",
    district: "Madurai",
    historicalPeriod: "Early Historic / Sangam Era",
    dynasty: "Pandyan Dynasty",
    approximateAge: "Circa 2nd Century BCE - 1st Century CE (Approx. 2,100 years old)",
    material: "Silver-Copper Alloy (Die-struck)",
    placeOfOrigin: "Vaigai River Bed deposits, Madurai",
    shortDescription: "Rectangular silver die-struck coin stamped with the royal twin-carp emblem, sacred tree, and river motifs.",
    historicalDescription: "Discovered during riverbank excavations near ancient Madurai, this coin features the iconic Pandyan dynastic insignia: two fish facing each other, symbolizing fertility and oceanic pearl-fishery dominance. The reverse exhibits punch marks representing the sun, an arched hill, and a sacred enclosure.",
    historicalSignificance: "Provides definitive physical numismatic evidence of organized monetary exchange and fiscal administration during the classical Sangam literary period.",
    culturalImportance: "The fish emblem remains the historic insignia of Madurai and stands as a timeless symbol of maritime commerce and southern statehood."
  },

  // 5. Madurai - Jain Cavern Brahmi Inscription
  {
    id: "ART-TN-005",
    name: "Mangulam Tamil-Brahmi Stone Epigraph",
    category: "Temple Inscriptions",
    stateId: "tamil-nadu",
    state: "Tamil Nadu",
    districtId: "madurai",
    district: "Madurai",
    historicalPeriod: "Early Sangam Epoch",
    dynasty: "Early Pandyan Realm",
    approximateAge: "Circa 3rd - 2nd Century BCE (Approx. 2,200 years old)",
    material: "Natural Granite Rock Drip-Ledge Inscription",
    placeOfOrigin: "Mangulam hill cavern shelter, near Madurai",
    shortDescription: "One of the oldest surviving written Tamil inscriptions, recording royal grants to Jain ascetics.",
    historicalDescription: "Carved neatly beneath the protective overhanging rock shelter of Mangulam hill, this epigraph is etched in archaic Tamil-Brahmi script. It explicitly records the gift of polished stone beds to senior Jain monks (Kaniyan Nanta-asiriyan) by Kadalan Vazhuthi, a worker and kin under the reigning Pandyan king Nedunjeliyan.",
    historicalSignificance: "Crucial epigraphical anchor that confirmed the chronology of the Sangam kings and proved the prevalence of early literacy and Jain monastic establishments in the Tamil country.",
    culturalImportance: "Marks the dawn of verifiable South Indian epigraphy and showcases the historic pluralism and state patronage accorded to ascetic scholars."
  },

  // 6. Kanchipuram - Pallava Somaskanda Relief
  {
    id: "ART-TN-006",
    name: "Pallava Somaskanda Bas-Relief Panel",
    category: "Stone Sculptures",
    stateId: "tamil-nadu",
    state: "Tamil Nadu",
    districtId: "kanchipuram",
    district: "Kanchipuram",
    historicalPeriod: "Early Medieval Pallava Era",
    dynasty: "Pallava Dynasty",
    approximateAge: "Circa late 7th Century CE - Rajasimha Reign (Approx. 1,320 years old)",
    material: "Hard Granitic Gneiss Stone",
    placeOfOrigin: "Sanctum rear wall precinct, Kanchipuram",
    shortDescription: "High-relief carving depicting Shiva seated with Parvati and the infant Skanda nestled between them, flanked by Brahma and Vishnu.",
    historicalDescription: "The Somaskanda panel was the signature architectural and iconographic standard of Rajasimha-period Pallava sanctuaries. Shiva is represented in a relaxed sukhasana posture, exuding divine composure, while Parvati radiates graceful maternal poise. The infant Skanda dances playfully between his parents.",
    historicalSignificance: "Demonstrates the mastery of Pallava sculptors transitioning from soft sandstone carving to the arduous cutting of hard granite cliffs and structural masonry.",
    culturalImportance: "Emphasizes the theological unity of divine family harmony, cosmic royalty, and divine balance, which became ubiquitous throughout South Indian temple art."
  },

  // 7. Kanchipuram - Uttaramerur Assembly Inscription
  {
    id: "ART-TN-007",
    name: "Uttaramerur Village Electoral Charter Slab",
    category: "Temple Inscriptions",
    stateId: "tamil-nadu",
    state: "Tamil Nadu",
    districtId: "kanchipuram",
    district: "Kanchipuram",
    historicalPeriod: "Chola Imperial Era",
    dynasty: "Chola Dynasty (Parantaka I)",
    approximateAge: "920 CE (Approx. 1,106 years old)",
    material: "Granite Sanctuary Wall Inscription",
    placeOfOrigin: "Vaikunta Perumal Temple, Uttaramerur",
    shortDescription: "World-renowned inscription codifying democratic village council qualification criteria, secret ballots (Kuda Olai), and disqualifications.",
    historicalDescription: "Inscribed in classical Tamil across the temple basement, this document delineates the constitution of the local agrarian assembly (Sabha). It laid down qualifications including land ownership, age, moral purity, and educational mastery, and detailed the Kudavolai process: candidates' names placed into an earthen pot and drawn by a neutral young boy.",
    historicalSignificance: "Frequently cited as one of the world's most sophisticated constitutional records of local representative self-governance and accountability mechanisms from the early 10th century.",
    culturalImportance: "A cornerstone document demonstrating indigenous democratic conventions and civic probity in ancient Indian municipal administration."
  },

  // 8. Chennai - Pallava Dvarapala Guardian
  {
    id: "ART-TN-008",
    name: "Pallava Monolithic Dvarapala (Door Guardian)",
    category: "Stone Sculptures",
    stateId: "tamil-nadu",
    state: "Tamil Nadu",
    districtId: "chennai",
    district: "Chennai",
    historicalPeriod: "Pallava Dynasty (Mahendravarman I Style)",
    dynasty: "Pallava Dynasty",
    approximateAge: "Circa 7th Century CE (Approx. 1,350 years old)",
    material: "Dark Grey Charnockite Granite",
    placeOfOrigin: "Northern Tamil Nadu coast; Curated at Government Museum, Egmore",
    shortDescription: "Monumental door guardian leaning boldly upon a massive club, displaying dynamic tribhanga stance and coiled headgear.",
    historicalDescription: "Carved from dense charnockite, this heroic dvarapala stands over six feet in height. With one arm casually resting upon a ceremonial mace wound with serpents and the other pointing inward in tarjani mudra, it blends martial vigilance with profound spiritual composure.",
    historicalSignificance: "Illustrates the transition from early cave excavations to standalone monolithic sentry sculptures that framed the sanctum of Dravidian temples.",
    culturalImportance: "Signifies temple sanctum guardianship, artistic courage, and the aesthetic vigor of early Pallava monumental stone cutters."
  },

  // 9. Tiruchirappalli - Kaveri Valley Roman Rouletted Bowl
  {
    id: "ART-TN-009",
    name: "Indo-Roman Rouletted Fine Ceramic Bowl Fragment",
    category: "Ancient Pottery",
    stateId: "tamil-nadu",
    state: "Tamil Nadu",
    districtId: "tiruchirappalli",
    district: "Tiruchirappalli",
    historicalPeriod: "Sangam-Roman Trade Epoch",
    dynasty: "Early Chera-Chola Border Region",
    approximateAge: "Circa 1st Century BCE - 1st Century CE (Approx. 2,050 years old)",
    material: "Fine alluvial slipped clay with concentric rouletted indentations",
    placeOfOrigin: "Uraiyur ancient habitational mounds, Tiruchirappalli",
    shortDescription: "Fine-paste ceramic rim with distinctive machine-like concentric bands made using a toothed rouletting wheel.",
    historicalDescription: "Unearthed at Uraiyur, the ancient inland Chola capital famous for weavers and pearls, this ceramic shard displays the smooth grey-to-black slip characteristic of high-status dining wares exchanged along the Indian Ocean trade network connecting Alexandria to South India.",
    historicalSignificance: "Proves that inland trading stations along the Kaveri river participated actively in transatlantic luxury commerce during the peak of the Roman imperial trade.",
    culturalImportance: "Emphasizes the early integration of ancient Tamil society into international maritime commerce networks."
  },

  // 10. Coimbatore - Kodumanal Etched Carnelian Bead Hoard
  {
    id: "ART-TN-010",
    name: "Kodumanal Etched Carnelian & Quartz Bead Necklace",
    category: "Ancient Jewellery",
    stateId: "tamil-nadu",
    state: "Tamil Nadu",
    districtId: "coimbatore",
    district: "Coimbatore",
    historicalPeriod: "Iron Age / Early Historic Sangam Era",
    dynasty: "Kongu Chera Chieftaincies",
    approximateAge: "Circa 3rd Century BCE - 1st Century CE (Approx. 2,200 years old)",
    material: "Natural Carnelian chalcedony chemically etched with alkaline white patterns",
    placeOfOrigin: "Kodumanal industrial workshop cemetery, Noyyal River basin",
    shortDescription: "Barrel-shaped translucent orange-red carnelian beads etched with delicate geometric chevron and diamond patterns.",
    historicalDescription: "The beads showcase micro-drilling techniques executed using diamond-tipped drills. The intricate white surface designs were permanently fused by applying natural plant juice and potassium carbonate paste before high-temperature firing.",
    historicalSignificance: "Establishes the Noyyal basin as one of the world's most prolific ancient semiprecious stone lapidary centers, whose wares were exported as far as Ptolemaic Egypt and Rome.",
    culturalImportance: "Demonstrates prehistoric mastery in gemology, pyrotechnology, and aesthetic refinement in South India."
  },

  // 11. Thiruvananthapuram - Marthanda Varma Ceremonial Sword
  {
    id: "ART-TN-011",
    name: "Travancore Royal Wootz Steel Ceremonial Sword",
    category: "Traditional Weapons",
    stateId: "kerala",
    state: "Kerala",
    districtId: "thiruvananthapuram",
    district: "Thiruvananthapuram",
    historicalPeriod: "Venad-Travancore Kingdom",
    dynasty: "Kulasekhara Dynasty of Travancore",
    approximateAge: "Circa 18th Century CE (Approx. 280 years old)",
    material: "High-carbon crucible Wootz steel blade with brass repoussé hilt",
    placeOfOrigin: "Padmanabhapuram Palace Armory, Travancore",
    shortDescription: "Double-edged Wootz steel combat and state sword featuring a gilded cobra-pommel and etched floral fuller.",
    historicalDescription: "Forged from ultra-pure crucible steel exhibiting the legendary wavy Damascus water-pattern (johar), this sword is associated with the defensive mobilization under Maharaja Marthanda Varma, who defeated the Dutch East India Company at the Battle of Colachel (1741).",
    historicalSignificance: "Emblematic of indigenous resistance against colonial mercantile encroachment and the apex of South Indian defensive metallurgy.",
    culturalImportance: "Associated with the historic 'Thrippadidanam' consecration, wherein the monarch surrendered the entire kingdom to the presiding deity Sri Padmanabhaswamy."
  },

  // 12. Thrissur - Vadakkunnathan Ritual Bronze Deepam
  {
    id: "ART-TN-012",
    name: "Changalavatta (Kerala Sacred Oil Lamp Bronze)",
    category: "Bronze Sculptures",
    stateId: "kerala",
    state: "Kerala",
    districtId: "thrissur",
    district: "Thrissur",
    historicalPeriod: "Medieval Kerala Temple Period",
    dynasty: "Perumals of Mahodayapuram style",
    approximateAge: "Circa 14th - 15th Century CE (Approx. 600 years old)",
    material: "Bell Metal (Cast high-tin bronze / Kansu alloy)",
    placeOfOrigin: "Temple workshops of Thrissur",
    shortDescription: "Traditional ceremonial hanging and handheld lamp shaped like a hamsa bird, featuring an integrated oil reservoir and bronze spoon.",
    historicalDescription: "Cast using a dense bell-metal alloy known for resonant acoustic properties and corrosion resistance. The lamp's arched handle depicts an ornate stylized mythical bird (Hamsa), embodying truth and spiritual discrimination, while a hanging ladle suspended on a chain replenished pure sesame oil during nocturnal rituals.",
    historicalSignificance: "Reflects the distinctive indigenous aesthetic of Kerala metalcraft, where functional ritual vessels were transformed into sacred works of sculptural art.",
    culturalImportance: "Used continuously in temple sanctum ceremonies, Kathakali recitals, and traditional coronation oaths across Kerala."
  },

  // 13. Ernakulam - Pattanam Roman Amphora Shards
  {
    id: "ART-TN-013",
    name: "Muziris Port Greco-Roman Terra Sigillata Amphora",
    category: "Ancient Pottery",
    stateId: "kerala",
    state: "Kerala",
    districtId: "ernakulam",
    district: "Ernakulam",
    historicalPeriod: "Early Chera / Roman Principate Epoch",
    dynasty: "Chera Kingdom of Muziris",
    approximateAge: "Circa 1st Century BCE - 1st Century CE (Approx. 2,050 years old)",
    material: "Volcanic clay ceramic with double-loop handle and resinous sealant",
    placeOfOrigin: "Pattanam excavation zone, Periyar delta",
    shortDescription: "Neck and handle fragment of an imported Mediterranean wine amphora containing resinous sediment traces.",
    historicalDescription: "Excavated from waterlogged alluvial strata at Pattanam (ancient Muziris), this substantial handle and body fragment originated in the Campania or Aegean regions. Micro-chemical analysis confirmed internal linings of pine pitch used to preserve fine vintage wines transported across the monsoon wind routes.",
    historicalSignificance: "Provides irrefutable archaeological substantiation for the Periplus of the Erythraean Sea, which chronicled the monumental spice trade between Roman Egypt and the Malabar coast.",
    culturalImportance: "A symbol of ancient Kerala's cosmopolitan ports that received merchants, poets, and travelers from across the Mediterranean basin."
  },

  // 14. Kozhikode - Zamorin Naval Dagger (Kayamkulam Vaal)
  {
    id: "ART-TN-014",
    name: "Zamorin Court Maru Steel Katar & Dagger",
    category: "Traditional Weapons",
    stateId: "kerala",
    state: "Kerala",
    districtId: "kozhikode",
    district: "Kozhikode",
    historicalPeriod: "Late Medieval Zamorin Realm",
    dynasty: "Samoothiri (Zamorin) Dynasty",
    approximateAge: "Circa 16th Century CE (Approx. 450 years old)",
    material: "Tempered Wootz steel blade with pierced steel knuckle-guard",
    placeOfOrigin: "Calicut port armory, Kozhikode",
    shortDescription: "Thrusting push-dagger (katar) with reinforcing central rib engineered to penetrate armored naval corslets.",
    historicalDescription: "Crafted for close-quarters maritime skirmishes led by the Kunjali Marakkars (the naval admirals of Calicut) against Portuguese boarding vessels. The hilt features dual horizontal grip bars shielded by an incised protective shell plate exhibiting dragon-head terminal flourishes.",
    historicalSignificance: "Demonstrates the specialized martial weaponry developed by indigenous Indian naval forces fighting early European colonial armadas in the Arabian Sea.",
    culturalImportance: "Emphasizes the martial resilience and legendary seafaring heritage of the Malabar coast."
  },

  // 15. Palakkad - Megalithic Black-and-Red Urn
  {
    id: "ART-TN-015",
    name: "Palakkad Gap Megalithic Burial Urn (Nannangadi)",
    category: "Ancient Pottery",
    stateId: "kerala",
    state: "Kerala",
    districtId: "palakkad",
    district: "Palakkad",
    historicalPeriod: "Iron Age / Megalithic Period",
    dynasty: "Pre-Dynastic Indigenous Cultures",
    approximateAge: "Circa 800 - 400 BCE (Approx. 2,600 years old)",
    material: "Coarse earthenware clay fired under dual inverted atmospheric reduction",
    placeOfOrigin: "Foothill cist burials, Palakkad mountain gap",
    shortDescription: "Large globular pyriform storage urn featuring an indented rim cord-pattern and lustrous black interior.",
    historicalDescription: "Recovered from subterranean stone cist burial chambers flanking the Palakkad natural mountain pass. The vessel's deep black upper interior and lustrous red exterior were achieved by inverted firing in closed reduction kilns, creating a non-porous finish designed to preserve ritual grains and ancestral memorial offerings.",
    historicalSignificance: "Illuminates prehistoric mortuary practices and demonstrates extensive pastoral migrations through the mountain gap between Kerala and Tamil Nadu.",
    culturalImportance: "Reflects the veneration of ancestors and sophisticated ceramic technology that predated literate urban empires in peninsular India."
  },

  // 16. Ballari (Hampi) - Vijayanagara Gold Varaha
  {
    id: "ART-TN-016",
    name: "Krishnadevaraya Gold Varaha Coin (Pagoda)",
    category: "Ancient Coins",
    stateId: "karnataka",
    state: "Karnataka",
    districtId: "ballari",
    district: "Ballari (Hampi)",
    historicalPeriod: "Vijayanagara Imperial Period",
    dynasty: "Tuluva Dynasty (Vijayanagara Empire)",
    approximateAge: "Circa 1515 CE (Approx. 510 years old)",
    material: "High-purity Cast & Struck Gold (92% fineness)",
    placeOfOrigin: "Hampi Royal Mint, Tungabhadra River Valley",
    shortDescription: "Standard gold coin depicting Lord Venkateshwara seated under a canopy on the obverse and Devanagari royal legend on the reverse.",
    historicalDescription: "Minted during the prosperous reign of Sri Krishnadevaraya following victorious eastern campaigns. The obverse depicts the deity holding the shankha (conch) and chakra (discus), while the reverse displays a bold, three-line Devanagari legend reading 'Sri Pratapa Krishna Raya'.",
    historicalSignificance: "Became the premier international trade currency across the Indian Ocean basin, celebrated by Portuguese, Arab, and Venetian merchants as the 'Pagoda'.",
    culturalImportance: "Symbol of the legendary economic wealth and artistic golden age of the Vijayanagara Empire."
  },

  // 17. Ballari (Hampi) - Monolithic Ugra Narasimha Fragment
  {
    id: "ART-TN-017",
    name: "Vijayanagara Monolithic Narasimha Carving Fragment",
    category: "Stone Sculptures",
    stateId: "karnataka",
    state: "Karnataka",
    districtId: "ballari",
    district: "Ballari (Hampi)",
    historicalPeriod: "High Vijayanagara Epoch",
    dynasty: "Tuluva Dynasty",
    approximateAge: "1528 CE (Approx. 498 years old)",
    material: "Native Deccan Pinkish-Grey Monolithic Granite",
    placeOfOrigin: "Sacred center temple complex, Hampi",
    shortDescription: "Sculpted granite fragment from a colossal monolithic guardian statue depicting the fierce half-lion incarnation with multi-hooded Shesha.",
    historicalDescription: "Commissioned under Krishnadevaraya's patronage, the complete monument stood nearly 22 feet high carved from a single natural granite boulder. This preserved fragment showcases the terrifying leonine visage with wide circular eyes, bared fangs, and the seven-headed serpent hood forming an arch of cosmic protection.",
    historicalSignificance: "Exemplifies the colossal scale and daring engineering of Vijayanagara sculptors working directly on native granite formations.",
    culturalImportance: "A world-renowned symbol of spiritual majesty, royal defense, and architectural ambition in pre-modern South India."
  },

  // 18. Hassan - Hoysala Madanika Bracket Figure
  {
    id: "ART-TN-018",
    name: "Belur Hoysala Bracket Maiden (Madanika / Salabhanjika)",
    category: "Stone Sculptures",
    stateId: "karnataka",
    state: "Karnataka",
    districtId: "hassan",
    district: "Hassan",
    historicalPeriod: "Hoysala Golden Epoch",
    dynasty: "Hoysala Dynasty (Vishnuvardhana)",
    approximateAge: "Circa 1117 CE (Approx. 909 years old)",
    material: "Chloritic Schist (Greenish-grey soft soapstone that hardens upon exposure)",
    placeOfOrigin: "Chennakeshava Temple precinct, Belur",
    shortDescription: "Ultra-detailed soapstone bracket figure depicting a celestial damsel (Darpana Sundari) looking into a mirror, adorned with perforated jewelry.",
    historicalDescription: "Mounted angled beneath the overhanging eaves of the main temple mandapa, this sculpture is a masterwork of microscopic stone carving. The lady gazes into a polished hand mirror, her hair coiled in intricate pearl-studded tresses with ringlets carved hollow behind the stone plane.",
    historicalSignificance: "Demonstrates the unique sculptural capabilities made possible by chloritic schist, enabling deep undercutting and free-floating stone filigree unseen in granite traditions.",
    culturalImportance: "Celebrated internationally as one of the summits of Indian classical feminine aesthetics, dance postures, and jewelry design."
  },

  // 19. Bagalkot - Badami Cave Varaha Relief
  {
    id: "ART-TN-019",
    name: "Badami Cave II Bhuvaraha Bas-Relief",
    category: "Stone Sculptures",
    stateId: "karnataka",
    state: "Karnataka",
    districtId: "bagalkot",
    district: "Bagalkot (Badami/Aihole)",
    historicalPeriod: "Early Chalukyan Era",
    dynasty: "Chalukyas of Vatapi (Badami)",
    approximateAge: "Circa late 6th Century CE (Approx. 1,440 years old)",
    material: "Red Sandstone Cliff Relief",
    placeOfOrigin: "Badami Cliff Sanctuary No. 2, Malaprabha Basin",
    shortDescription: "Dynamic rock-cut relief of Vishnu as Varaha raising the earth goddess Bhudevi from the primordial cosmic deluge.",
    historicalDescription: "Carved into the rich red sandstone cliffs surrounding the Agastya lake, this relief depicts Varaha planting his left foot firmly upon the serpent king Sesha while effortlessly hoisting the delicate Bhudevi upon his tusk, celebrating rescue and cosmic renewal.",
    historicalSignificance: "Represented the royal emblem of the Chalukya kings (the Boar Crest) symbolizing their protective rule over the Deccan earth.",
    culturalImportance: "Pivotal in tracing the development of classical rock-cut cave art that bridged Deccan and Dravidian idioms."
  },

  // 20. Mysuru - Hoysala Gold Filigree Ear Ornament
  {
    id: "ART-TN-020",
    name: "Hoysala Royal Granulated Gold Kundala",
    category: "Ancient Jewellery",
    stateId: "karnataka",
    state: "Karnataka",
    districtId: "mysuru",
    district: "Mysuru",
    historicalPeriod: "Late Hoysala - Early Wodeyar Realm",
    dynasty: "Hoysala Royal Court",
    approximateAge: "Circa 13th Century CE (Approx. 750 years old)",
    material: "24k Pure Gold with micro-granulation and cabochon rubies",
    placeOfOrigin: "Srirangapatna royal hoard, Mysuru riverbanks",
    shortDescription: "Circular ear pendant decorated with micro-granulation dots and central kemp ruby rosette setting.",
    historicalDescription: "Constructed using sheets of hammered gold embellished with hundreds of microscopic gold granules fused onto the base without modern soldering solder. The central setting features an unheated Burmese cabochon ruby encircled by floral repoussé petals matching jewellery seen on Belur temple sculptures.",
    historicalSignificance: "Correlates directly with the intricate jewelry depicted on contemporary Hoysala and early Vijayanagara stone statues, confirming the accuracy of royal temple representations.",
    culturalImportance: "Preserves the ancestral tradition of sacred temple jewelry crafting that still flourishes in Mysore and Bengaluru today."
  },

  // 21. Bengaluru Urban - Begur Ganga Hero Stone (Veergallu)
  {
    id: "ART-TN-021",
    name: "Begur Battle Hero Stone (Veergallu Epigraph)",
    category: "Temple Inscriptions",
    stateId: "karnataka",
    state: "Karnataka",
    districtId: "bengaluru-urban",
    district: "Bengaluru Urban",
    historicalPeriod: "Western Ganga Dynasty",
    dynasty: "Western Ganga Dynasty (King Ereyappa)",
    approximateAge: "Circa 890 - 900 CE (Approx. 1,130 years old)",
    material: "Coarse Grey Granite Memorial Slab with Relief Panels and Old Kannada Epigraph",
    placeOfOrigin: "Nageshwara Temple precinct, Begur, Bengaluru",
    shortDescription: "Hero stone illustrating cavalry combat and containing the earliest documented epigraphic reference to the place-name 'Bengaluru'.",
    historicalDescription: "Divided into three dynamic vertical registers: the lowest depicts soldiers, cavalry, and war dogs clashing in the battle of Bengaluru; the middle shows heavenly maidens (Apsaras) escorting the fallen warrior to paradise; and the top depicts the warrior seated before the divine lingam. The Old Kannada inscription mentions the demise of chieftain Nagattara's son Buttannashetty.",
    historicalSignificance: "Contains the earliest known epigraphical mention of 'Bengalur' in human history, establishing the ancient roots of India's modern technological capital.",
    culturalImportance: "Revered as an irreplaceable heritage treasure demonstrating medieval valor, martial devotion, and historical place-name permanence."
  },

  // 22. Guntur (Amaravati) - Buddhist Limestone Medallion
  {
    id: "ART-TN-022",
    name: "Amaravati Stupa Marble Medallion (Great Departure)",
    category: "Stone Sculptures",
    stateId: "andhra-pradesh",
    state: "Andhra Pradesh",
    districtId: "guntur",
    district: "Guntur (Amaravati)",
    historicalPeriod: "Later Satavahana Epoch",
    dynasty: "Satavahana Dynasty",
    approximateAge: "Circa 2nd Century CE (Approx. 1,820 years old)",
    material: "Palnadu Greenish-White Crystalline Limestone ('Amaravati Marble')",
    placeOfOrigin: "Maha Chaitya (Great Stupa) railing balustrade, Amaravati",
    shortDescription: "Exquisitely carved circular balustrade medallion narrating Prince Siddhartha's midnight departure from Kapilavastu.",
    historicalDescription: "Carved into distinctive crystalline Palnadu limestone, this bas-relief displays the frantic, rhythmic energy of the Amaravati school. The prince's horse Kanthaka is depicted borne aloft by celestial yakshas so that hoofbeats would not awaken the sleeping guards, while royal parasols float above without depicting the human form of the Buddha (aniconic representation).",
    historicalSignificance: "Represents one of the supreme achievements of ancient Buddhist art in Asia, influencing sculpture across Sri Lanka, Thailand, and Indonesia.",
    culturalImportance: "Marks the spiritual and aesthetic summit of the early Andhra school of art that transformed Buddhist narrative storytelling."
  },

  // 23. Guntur (Amaravati) - Satavahana Ship Coin
  {
    id: "ART-TN-023",
    name: "Yajna Sri Satakarni Double-Masted Ship Lead Coin",
    category: "Ancient Coins",
    stateId: "andhra-pradesh",
    state: "Andhra Pradesh",
    districtId: "guntur",
    district: "Guntur (Amaravati)",
    historicalPeriod: "Later Satavahana Dynasty",
    dynasty: "Satavahana Empire",
    approximateAge: "Circa 170 - 200 CE (Approx. 1,830 years old)",
    material: "Die-cast Heavy Potin / Lead Alloy",
    placeOfOrigin: "Krishna River Estuary port deposits",
    shortDescription: "Rare circular lead coin bearing the detailed relief of a large double-masted ocean-going sailing vessel.",
    historicalDescription: "Commissioned under the maritime ruler Gautamiputra Yajna Sri Satakarni. The obverse depicts a massive two-masted vessel rigged with sails and oars navigating ocean waves, flanked by fish symbols. The reverse carries the sacred Ujjain dynastic symbol.",
    historicalSignificance: "Unrivalled numismatic testimony to ancient Indian trans-oceanic seafaring, shipbuilding technology, and maritime colonizing trade across the Bay of Bengal.",
    culturalImportance: "A proud emblem of coastal Andhra's pioneering merchant sailors who navigated the high seas towards Suvarnabhumi."
  },

  // 24. Tirupati - Annamacharya Copper Plate Inscription
  {
    id: "ART-TN-024",
    name: "Tirumala Annamacharya Sankirtana Copper Plates",
    category: "Historical Manuscripts",
    stateId: "andhra-pradesh",
    state: "Andhra Pradesh",
    districtId: "tirupati",
    district: "Tirupati",
    historicalPeriod: "Vijayanagara - Saluva Epoch",
    dynasty: "Saluva / Tuluva Patronage",
    approximateAge: "Circa late 15th - early 16th Century CE (Approx. 520 years old)",
    material: "Engraved Pure Copper Plates joined by a circular brass seal ring",
    placeOfOrigin: "Sankirtana Bhandagaram (Stone Vault), Tirumala Temple",
    shortDescription: "Heavy engraved copper folios preserving thousands of devotional Telugu sankeertanas composed by Saint Annamacharya.",
    historicalDescription: "To ensure that the 32,000 spiritual songs composed by Saint Tallapaka Annamacharya were never lost to fire or decay, his son Pedda Tirumalacharya had them painstakingly engraved into thick copper sheets and safely walled inside a stone vault opposite the sanctum.",
    historicalSignificance: "One of the most extraordinary literary preservation undertakings in South Asian history, salvaging an entire Renaissance of classical Telugu poetry and Carnatic musicology.",
    culturalImportance: "Forms the liturgical bedrock of daily musical worship at Tirumala and represents an immortal treasure of classical Indian literature."
  },

  // 25. Kurnool - Ketavaram Prehistoric Ochre Petroglyph
  {
    id: "ART-TN-025",
    name: "Ketavaram Prehistoric Rock Art Ochre Slab",
    category: "Stone Sculptures",
    stateId: "andhra-pradesh",
    state: "Andhra Pradesh",
    districtId: "kurnool",
    district: "Kurnool",
    historicalPeriod: "Upper Paleolithic / Mesolithic Transition",
    dynasty: "Pre-Historic Hunter-Gatherer Clans",
    approximateAge: "Circa 10,000 - 6,000 BCE (Approx. 8,000+ years old)",
    material: "Natural Quartzite Rock Shelf with Hematite Iron Ochre & Animal Fat Pigment",
    placeOfOrigin: "Ketavaram Escarpment rock shelters, Kurnool",
    shortDescription: "Rock art slab fragment illustrating stick-figured archers, wild deer, humped cattle, and geometric solar spirals.",
    historicalDescription: "Pigmented using natural iron oxide (geru) ground with animal tallow to bind permanently into the micro-pores of quartzite rock. The painting portrays communal deer hunts, radiating sun shields, and spiritual dances performed around sacred hearths.",
    historicalSignificance: "Establishes the Kurnool basin (flanked by the Belum & Billasurgam caves) as one of the oldest continuously inhabited prehistoric hominid landscapes in the Indian subcontinent.",
    culturalImportance: "Connects modern civilization directly with the primal dawn of human creativity, hunting lore, and symbolic visual language."
  },

  // 26. Visakhapatnam - Bojjannakonda Terracotta Relic Casket
  {
    id: "ART-TN-026",
    name: "Bojjannakonda Buddhist Terracotta Relic Casket",
    category: "Ancient Pottery",
    stateId: "andhra-pradesh",
    state: "Andhra Pradesh",
    districtId: "visakhapatnam",
    district: "Visakhapatnam",
    historicalPeriod: "Early Andhra Buddhism Epoch",
    dynasty: "Eastern Deccan Buddhist Monastic Order",
    approximateAge: "Circa 3rd - 4th Century CE (Approx. 1,650 years old)",
    material: "Kiln-baked fine Terracotta with stamped lotus lid",
    placeOfOrigin: "Rock-cut stupa chamber, Bojjannakonda near Anakapalle",
    shortDescription: "Small cylindrical terracotta relic urn (Dhatu-garbha) recovered from the core of a rock-hewn hillside stupa.",
    historicalDescription: "Found sealed within the parasol shaft of a monolithic stupa carved from living rock. The casket contained miniature bone beads, crystal pearls, and gold foil leaves, preserved as sacred offerings left by seafaring Buddhist monks.",
    historicalSignificance: "Documents the flourishing Vajrayana and Hinayana monastic university centers that operated along the northern Andhra coastline.",
    culturalImportance: "Reflects the spiritual serenity, architectural simplicity, and dedication of ancient monastic communities overlooking coastal valleys."
  },

  // 27. Vijayawada - Mogalarajapuram Ardhanarishvara Carving
  {
    id: "ART-TN-027",
    name: "Mogalarajapuram Rock-Cut Ardhanarishvara Relief",
    category: "Stone Sculptures",
    stateId: "andhra-pradesh",
    state: "Andhra Pradesh",
    districtId: "vijayawada",
    district: "Vijayawada (NTR)",
    historicalPeriod: "Vishnukundina - Early Eastern Chalukya Era",
    dynasty: "Vishnukundina Dynasty",
    approximateAge: "Circa 5th - 6th Century CE (Approx. 1,450 years old)",
    material: "Natural Sandstone Grotto Escarpment",
    placeOfOrigin: "Cave Sanctuary V, Mogalarajapuram hills, Vijayawada",
    shortDescription: "Composite rock-cut figure embodying Shiva and Shakti as an indivisible half-male, half-female cosmic reality.",
    historicalDescription: "Excavated from the hillside grottoes overlooking the Krishna river. The right half shows the trident, matted hair (jata-mukuta), and masculine chest of Shiva, while the left half exhibits the delicate jewelry, curved hip, and breast of Parvati, accompanied by their respective mounts Nandi and the lion.",
    historicalSignificance: "One of the earliest rock-cut representations of the composite Ardhanarishvara concept in the Eastern Deccan, pre-dating Badami and Elephanta formulations.",
    culturalImportance: "A profound theological representation of the equality, balance, and interdependence of masculine and feminine cosmic forces."
  },

  // 28. Madurai - Sangam Gold Earring Hoard
  {
    id: "ART-TN-028",
    name: "Vaigai Valley Sangam Repoussé Gold Kundalam",
    category: "Ancient Jewellery",
    stateId: "tamil-nadu",
    state: "Tamil Nadu",
    districtId: "madurai",
    district: "Madurai",
    historicalPeriod: "Classic Sangam Period",
    dynasty: "Pandyan Chieftaincies",
    approximateAge: "Circa 1st Century BCE (Approx. 2,100 years old)",
    material: "Pure Gold Foil over Lac Core",
    placeOfOrigin: "Keezhadi archaeological trench, Vaigai basin",
    shortDescription: "Lightweight tubular gold ear ornament decorated with delicate filigree wire coils and raised repoussé beads.",
    historicalDescription: "Formed by hammering gold leaf into embossed repoussé floral designs over a lightweight pine resin/lac core to minimize weight when worn in elongated earlobes, as described vividly in the Sangam epic Silappadikaram.",
    historicalSignificance: "Directly corroborates descriptions in ancient Sangam literature of royal women wearing lustrous gold earrings (Kuzhai) in the urban markets of Madurai.",
    culturalImportance: "Highlights the ancient continuity of South Indian goldsmithing and aesthetic self-adornment."
  }
];

// Helper query utility functions for robust querying and future MySQL schema parity
export const getArtifactsByDistrict = (districtId) => {
  return artifacts.filter((a) => a.districtId.toLowerCase() === districtId.toLowerCase());
};

export const getArtifactsByState = (stateId) => {
  return artifacts.filter((a) => a.stateId.toLowerCase() === stateId.toLowerCase());
};

export const getDistrictById = (districtId) => {
  return districts.find((d) => d.id.toLowerCase() === districtId.toLowerCase());
};

export const getStateById = (stateId) => {
  return states.find((s) => s.id.toLowerCase() === stateId.toLowerCase());
};

export const getArtifactById = (id) => {
  return artifacts.find((a) => a.id.toLowerCase() === id.toLowerCase());
};

export const getDistrictArtifactCount = (districtId) => {
  return artifacts.filter((a) => a.districtId.toLowerCase() === districtId.toLowerCase()).length;
};

export const getStateArtifactCount = (stateId) => {
  return artifacts.filter((a) => a.stateId.toLowerCase() === stateId.toLowerCase()).length;
};
