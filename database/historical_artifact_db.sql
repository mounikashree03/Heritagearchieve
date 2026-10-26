
-- ==============================================================================
-- DATABASE CREATION SCRIPT: Historical Artifact Information System (HeritageArchive)
-- Target RDBMS: MySQL / MariaDB (XAMPP / phpMyAdmin compatible)
-- Database Name: historical_artifact_db
-- Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- ==============================================================================

-- HOW TO RE-IMPORT SAFELY:
-- 1. This script starts by creating or selecting the database.
-- 2. It drops child tables first (artifacts) before parent tables (districts, categories, states)
--    to prevent foreign key constraint violations during recreation.
-- 3. If you want to preserve existing user data and ONLY insert missing records, you can omit
--    the DROP TABLE statements and use 'INSERT IGNORE' instead of 'INSERT INTO'.
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `historical_artifact_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `historical_artifact_db`;

-- ------------------------------------------------------------------------------
-- 1. DROP EXISTING TABLES (Reverse Dependency Order)
-- ------------------------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `artifacts`;
DROP TABLE IF EXISTS `districts`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `states`;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------------------------
-- 2. CREATE TABLE: states
-- ------------------------------------------------------------------------------
CREATE TABLE `states` (
  `state_id` INT AUTO_INCREMENT PRIMARY KEY,
  `state_name` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. CREATE TABLE: districts
-- ------------------------------------------------------------------------------
CREATE TABLE `districts` (
  `district_id` INT AUTO_INCREMENT PRIMARY KEY,
  `district_name` VARCHAR(100) NOT NULL,
  `state_id` INT NOT NULL,
  `description` TEXT NULL,
  CONSTRAINT `uq_district_state` UNIQUE (`district_name`, `state_id`),
  CONSTRAINT `fk_districts_state` FOREIGN KEY (`state_id`)
    REFERENCES `states` (`state_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `idx_districts_state` ON `districts` (`state_id`);

-- ------------------------------------------------------------------------------
-- 4. CREATE TABLE: categories
-- ------------------------------------------------------------------------------
CREATE TABLE `categories` (
  `category_id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_name` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. CREATE TABLE: artifacts
-- ------------------------------------------------------------------------------
CREATE TABLE `artifacts` (
  `artifact_id` INT AUTO_INCREMENT PRIMARY KEY,
  `artifact_name` VARCHAR(255) NOT NULL,
  `district_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `historical_period` VARCHAR(150) NULL,
  `dynasty_or_civilization` VARCHAR(150) NULL,
  `approximate_age` VARCHAR(150) NULL,
  `material` VARCHAR(150) NULL,
  `place_of_origin` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `historical_significance` TEXT NULL,
  `cultural_importance` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_artifacts_district` FOREIGN KEY (`district_id`)
    REFERENCES `districts` (`district_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_artifacts_category` FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`category_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `idx_artifacts_district` ON `artifacts` (`district_id`);
CREATE INDEX `idx_artifacts_category` ON `artifacts` (`category_id`);
CREATE INDEX `idx_artifacts_period` ON `artifacts` (`historical_period`);
CREATE INDEX `idx_artifacts_dynasty` ON `artifacts` (`dynasty_or_civilization`);
CREATE INDEX `idx_artifacts_name` ON `artifacts` (`artifact_name`);

-- ------------------------------------------------------------------------------
-- 6. CREATE TABLE: users & user_favorites (Authentication & Scholar Bookmarks)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'curator', 'researcher') NOT NULL DEFAULT 'researcher',
  `avatar` VARCHAR(255) NULL,
  `bio` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user_favorites` (
  `favorite_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `artifact_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `uq_user_artifact` UNIQUE (`user_id`, `artifact_id`),
  CONSTRAINT `fk_fav_user` FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_fav_artifact` FOREIGN KEY (`artifact_id`)
    REFERENCES `artifacts` (`artifact_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. INSERT SAMPLE DATA: states (15 Indian States)
-- ------------------------------------------------------------------------------
INSERT INTO `states` (`state_id`, `state_name`, `description`) VALUES
(1, 'Tamil Nadu', 'Cradle of classical Dravidian culture, Sangam antiquity, monumental granite gopurams, and the pinnacle of lost-wax bronze casting.'),
(2, 'Kerala', 'Historic spice trade hub connecting India with Roman, Arab, and Chinese merchants, noted for naval metallurgy, wooden architecture, and ritual bell-metal casting.'),
(3, 'Karnataka', 'Heart of monumental rock-cut cave temples, hyper-detailed chloritic schist Hoysala carving, and the cosmopolitan splendor of Vijayanagara Hampi.'),
(4, 'Andhra Pradesh', 'Epicenter of classical Buddhist limestone sculpture along the Krishna River valley, early Satavahana maritime coinage, and Kakatiya epigraphy.'),
(5, 'Telangana', 'Renowned for the floating brick engineering of Kakatiya temple architecture, ancient iron-smelting crucibles, and Golconda metallurgy.'),
(6, 'Maharashtra', 'Home to the monumental rock-cut cliff sanctuaries of Ajanta and Ellora, Satavahana mountain passes, and Maratha defensive fortifications.'),
(7, 'Odisha', 'Famed for monumental Kalinga architectural friezes, ancient seafaring Sadhabas of the Boita Bandana, and exquisite palm-leaf etching traditions.'),
(8, 'Rajasthan', 'Land of Bronze Age Indus settlements (Kalibangan), Gurjara-Pratihara temple sculptures, damascened talwar weaponry, and royal manuscripts.'),
(9, 'Gujarat', 'Gateway to the ancient world with the Harappan tidal dockyard of Lothal, Ashokan rock edicts of Junagadh, and intricate Solanki stepwell friezes.'),
(10, 'Madhya Pradesh', 'Heart of central Indian antiquity, home to Sanchi Buddhist stupas, Vidisha Heliodorus pillar, Khajuraho sandstone marvels, and Udayagiri caves.'),
(11, 'Uttar Pradesh', 'Cradle of Sarnath where the Lion Capital of Ashoka was carved, Kushan spotted red sandstone sculpture of Mathura, and early Copper Hoard cultures.'),
(12, 'Bihar', 'Birthplace of Buddhism and Jainism, imperial seat of Magadha (Pataliputra), home to Nalanda and Vikramashila monastic universities.'),
(13, 'West Bengal', 'Famed for Chandraketugarh maritime urban pottery and terracotta plaques, Pala-Sena black basalt statuary, and terracotta temple architecture.'),
(14, 'Assam', 'Storied kingdom of Kamarupa and the Ahom dynasty, celebrated for bell-metal casting, sanchi-bark manuscripts, and Wootz steel hengdang swords.'),
(15, 'Goa', 'Strategic ancient maritime Arabian Sea trading hub, featuring Kadamba dynasty stone carvings, copper-plate grants, and Indo-Portuguese metalcraft.');

-- ------------------------------------------------------------------------------
-- 7. INSERT SAMPLE DATA: districts (78 Curated Districts)
-- ------------------------------------------------------------------------------
INSERT INTO `districts` (`district_id`, `district_name`, `state_id`, `description`) VALUES
(1, 'Thanjavur', 1, 'Imperial capital of the Cholas, home to the Great Living Brihadisvara Temple, classical metallurgy, and Saraswathi Mahal manuscripts.'),
(2, 'Madurai', 1, 'Ancient seat of the Tamil Sangam academies along the Vaigai river, celebrated for Pandyan epigraphy, trade coins, and stone carvings.'),
(3, 'Kanchipuram', 1, 'Historic Ghatikasthan (center of higher learning) and royal capital of the Pallavas, noted for granite cave temples and structural bas-reliefs.'),
(4, 'Chennai', 1, 'Coastal archival hub housing the Government Museum at Egmore, preserving world-class collections of Chola bronzes and Amaravati marbles.'),
(5, 'Tiruchirappalli', 1, 'Kaveri delta gateway featuring the Rockfort cave temples, ancient Uraiyur Chola capital, and riverine trade guild inscriptions.'),
(6, 'Coimbatore', 1, 'Major hub of Megalithic industrial archaeology, Roman gold coin hoards, and ancient Kongu Nadu semiprecious gem lapidary workshops.'),
(7, 'Tirunelveli', 1, 'Tamirabarani river basin home to the world-famous Adichanallur Iron Age urn burial site and medieval Pandyan temple stone carvings.'),
(8, 'Salem', 1, 'Ancient metallurgical center famous for pristine Iron Age crucible Wootz steel smelting and Kongu Chera epigraphs.'),
(9, 'Erode', 1, 'Home to the Kodumanal archaeological site on the Noyyal river, famous for Roman trade coins, quartz bead workshops, and Tamil-Brahmi potshards.'),
(10, 'Nagapattinam', 1, 'Ancient Chola maritime port and international Buddhist hub, renowned for the Chudamani Vihara bronze hoard and Southeast Asian trade links.'),
(11, 'Ernakulam (Muziris/Pattanam)', 2, 'Hinterland of ancient Muziris, yielding Mediterranean amphorae, Roman aurei coins, and Indian Ocean trade port infrastructure.'),
(12, 'Thiruvananthapuram', 2, 'Historic royal seat of Venad and the Travancore Maharajas, housing royal armories, palatial palm-leaf archives, and sacred temple bronzes.'),
(13, 'Thrissur', 2, 'Cultural capital centered on the Vadakkunnathan complex, featuring Megalithic dolmens and sacred high-tin bell-metal ritual lamps.'),
(14, 'Kozhikode', 2, 'Historic Port of Calicut governed by the Zamorins, crucial for naval metallurgy, trade coinage, and astronomical palm-leaf codices.'),
(15, 'Palakkad', 2, 'Strategic mountain pass in the Western Ghats connecting Tamil plains to the Malabar coast, yielding Megalithic burial urns and granite carvings.'),
(16, 'Ballari (Hampi)', 3, 'UNESCO World Heritage site and imperial capital of the Vijayanagara Empire, rich in monolithic stone carvings and gold varaha coinage.'),
(17, 'Hassan (Belur & Halebidu)', 3, 'Heart of the Hoysala Empire, celebrated globally for hyper-detailed chloritic schist bracket figures and filigree temple friezes.'),
(18, 'Bagalkot (Badami & Aihole)', 3, 'Cradle of Indian temple architecture under the Early Chalukyas, featuring red sandstone cave reliefs and 6th-century royal epigraphs.'),
(19, 'Mysuru', 3, 'Royal center of the Wodeyars and Hoysala frontiers, renowned for temple jewelry, palace armaments, and copper-plate grants.'),
(20, 'Bengaluru Urban', 3, 'Home to the Government Museum and the 9th-century Begur hero stone bearing the earliest recorded mention of ''Bengaluru''.'),
(21, 'Guntur (Amaravati)', 4, 'Ancient Buddhist monastic hub famous for Palnadu crystalline limestone stupa medallions, railings, and Prakrit Brahmi inscriptions.'),
(22, 'Tirupati', 4, 'Sacred temple center housing ancient copper-plate sankeertana folios and Vijayanagara royal bronze dedications.'),
(23, 'Kurnool', 4, 'Gateway to Rayalaseema, home to prehistoric rock art at Ketavaram and monolithic Chalukyan carvings at Yaganti.'),
(24, 'Vijayawada (NTR)', 4, 'Krishna river trade center featuring 5th-century Mogalarajapuram and Undavalli rock-cut cave architectures.'),
(25, 'Warangal (Hanamkonda)', 5, 'Capital of the Kakatiya Dynasty, famed for monolithic granite torana gateways, Ramappa floating bricks, and Telugu inscriptions.'),
(26, 'Hyderabad', 5, 'Preserves Deccan sultanate metallurgy, Golconda crucible diamond weights, and medieval arms in the Salar Jung and State Museums.'),
(27, 'Chhatrapati Sambhajinagar (Aurangabad)', 6, 'Locus of the world-famous Ajanta and Ellora rock-cut cave monuments, Kailash temple monolithic carving, and early Satavahana seals.'),
(28, 'Mumbai & Raigad', 6, 'Preserves the 6th-century Elephanta Trimurti basalt carving and the Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS) antiquities.'),
(29, 'Kolhapur', 6, 'Ancient Brahmapuri archaeological mound yielding Roman bronze statuettes, Satavahana lead coin hoards, and Shilahara copper plates.'),
(30, 'Puri & Konark', 7, 'Home to the 13th-century Konark Sun Temple khondalite stone chariot wheels, chlorite celestial musicians, and palm-leaf manuscripts.'),
(31, 'Bhubaneswar & Khordha', 7, 'Temple City of Kalinga architecture, featuring the Udayagiri-Khandagiri rock-cut Jain caves and Kharavela''s Hathigumpha inscription.'),
(32, 'Hanumangarh (Kalibangan)', 8, 'Major Indus Valley / Harappan archaeological site famed for ploughed agricultural field furrows, terracotta seals, and fire altars.'),
(33, 'Jaipur & Amer', 8, 'Hub of Rajput palace armories, damascened crucible steel talwars, illuminated astronomical codices, and stone carving.'),
(34, 'Udaipur & Chittorgarh', 8, 'Mewar heartland preserving heroic victory pillars, silver commemorative coins, and Jain temple stone relief friezes.'),
(35, 'Ahmedabad (Lothal)', 9, 'Home of Lothal, the world''s earliest known tidal dockyard, Harappan steatite seals, micro-bead jewelry, and trade weights.'),
(36, 'Junagadh', 9, 'Foot of Mount Girnar, famous for the monumental boulder bearing inscriptions of Emperor Ashoka, Rudradaman I, and Skandagupta.'),
(37, 'Patan', 9, 'Ancient capital of the Solanki kings, site of the Rani ki Vav subterranean stepwell displaying hundreds of exquisite Vaishnava stone sculptures.'),
(38, 'Raisen (Sanchi)', 10, 'World Heritage Buddhist monastic sanctuary of Sanchi, celebrated for Mauryan and Shunga intricately carved sandstone toranas (gateways).'),
(39, 'Vidisha', 10, 'Ancient trade crossroads known for the 2nd-century BCE Heliodorus Pillar Garuda column and Udayagiri rock-cut Varaha cave reliefs.'),
(40, 'Chhatarpur (Khajuraho)', 10, 'Seat of the Chandella kings, world-renowned for sandstone architectural temples depicting celestial nymphs, deities, and medieval life.'),
(41, 'Varanasi (Sarnath)', 11, 'Holy Sarnath where the Buddha turned the Wheel of Law; site of the Ashokan sandstone Lion Capital adopted as India''s State Emblem.'),
(42, 'Mathura', 11, 'Cradle of the Kushan school of art, famous for spotted red sandstone Bodhisattvas, Yakshis, and early anthropomorphic Hindu iconography.'),
(43, 'Nalanda', 12, 'Ancient monastic university complex yielding bronze votive stupas, Pala-era Mahayana bronze icons, and inscribed seals.'),
(44, 'Patna (Pataliputra)', 12, 'Ancient imperial capital of Magadha, Maurya, and Gupta empires; home of the polished sandstone Didarganj Yakshi and Kumrahar pillared hall.'),
(45, 'Gaya (Bodh Gaya)', 12, 'Sacred enlightenment center featuring the sandstone Vajrasana (Diamond Throne), Ashokan balustrades, and Gupta stone pillars.'),
(46, 'North 24 Parganas (Chandraketugarh)', 13, 'Ancient riverine trade port yielding thousands of exquisite Maurya-Shunga-Kushan terracotta plaques, winged deities, and rouletted wares.'),
(47, 'Bankura (Bishnupur)', 13, 'Capital of the Malla rulers, famous for ornate terracotta brick temple reliefs, brass Dokra figurines, and palm-leaf manuscripts.'),
(48, 'Sivasagar', 14, 'Historic capital of the 600-year Ahom kingdom, rich in royal Wootz steel hengdang swords, brass cannon artillery, and copper-plate grants.'),
(49, 'Kamrup Metropolitan (Guwahati)', 14, 'Ancient Pragjyotishpura and Kamarupa kingdom center, renowned for Ambari stone carvings and illustrated Sanchi-bark royal codices.'),
(50, 'North Goa (Velha Goa)', 15, 'Ancient maritime trade post of the Bhojas, Kadambas, and Vijayanagara governors, preserving Kadamba hero stones and copper charters.'),
(51, 'South Goa (Chandor)', 15, 'Historic Chandrapura capital of the Kadamba dynasty, yielding ancient copper-plate charters and medieval stone fortifications.'),
(52, 'Pudukkottai', 1, 'Princely state repository celebrated for Sittannavasal Jain rock-cut cave murals and prehistoric megalithic stone circles.'),
(53, 'Ramanathapuram', 1, 'Coastal realm famous for the Sethupathi royal dynasty, historic maritime pearls, and Sethu pilgrimage routes.'),
(54, 'Tiruvannamalai', 1, 'Spiritual center centered on the massive Annamalaiyar temple, preserving early Chola epigraphs and bronze collections.'),
(55, 'Vellore', 1, 'Historic granite fortress complex housing Vijayanagara Raya carvings and Carnatic Sultanate artillery armories.'),
(56, 'Kannur', 2, 'Ancient port of the Kolathiri Rajas, renowned for Theyyam ritual art, brass temple bells, and spice-trade sea forts.'),
(57, 'Alappuzha', 2, 'Backwater trade hub with ancient Christian and Buddhist relics, including the celebrated Karumadikkuttan stone Buddha statue.'),
(58, 'Kollam (Quilon)', 2, 'Ancient seaport of the Venad kings, famous for the Syrian Christian copper plates (Tharisapalli sasanam) and maritime trade coins.'),
(59, 'Shivamogga (Keladi)', 3, 'Seat of the Keladi Nayakas, famous for Ikkeri Aghoreshwara granite architecture, palm-leaf codices, and Hoysala temples.'),
(60, 'Udupi', 3, 'Coastal religious capital founded by Madhvacharya, celebrated for bronze ritual lamps, wood carvings, and Kanaka temple epigraphs.'),
(61, 'Belagavi', 3, 'Historic Ratta dynasty capital featuring basalt Jain temples and medieval stone bastions situated along Sahyadri passes.'),
(62, 'YSR Kadapa', 4, 'Home to the Gandikota grand canyon fort and pushpashila red sandstone temples patronized by the Kakatiyas and Vijayanagara emperors.'),
(63, 'Nellore', 4, 'Coastal port zone producing Telugu Choda stone epigraphs, Roman maritime coin hoards, and maritime delta commerce records.'),
(64, 'Karimnagar', 5, 'Ancient iron-smelting center producing world-famous crucible Wootz Damascus steel and early Satavahana punch-marked coins.'),
(65, 'Nizamabad', 5, 'Godavari river basin featuring the ancient Indur fort and Chalukyan stone inscriptions along ancient trade passages.'),
(66, 'Pune', 6, 'Historic heart of the Maratha Empire, yielding Shilahara rock inscriptions, Peshwa archives, and Pataleshwar cave shrines.'),
(67, 'Satara', 6, 'Chhatrapati Shivaji''s strategic capital at Ajinkyatara, preserving Maratha royal armories and damascened talwar blades.'),
(68, 'Cuttack (Barabati)', 7, 'Mahanadi delta capital founded by the Somavamshi kings, renowned for fine silver filigree (Tarakasi) and the medieval Barabati fort.'),
(69, 'Sambalpur', 7, 'Historic diamond trade hub documented by Ptolemy, rich in Chauhan royal epigraphs and classical Odia ikat textiles.'),
(70, 'Jodhpur (Marwar)', 8, 'Rathore citadel centered on Mehrangarh Fort, housing royal armories, miniature paintings, and silver ceremonial palanquins.'),
(71, 'Bikaner', 8, 'Desert fortress of Junagarh preserving extensive Jain bhandaras (libraries) with illuminated Sanskrit and Prakrit manuscripts.'),
(72, 'Kutch (Dholavira)', 9, 'UNESCO World Heritage Harappan metropolis of Dholavira, famous for grand stone reservoirs, signboards, and lapidary beads.'),
(73, 'Vadodara (Baroda)', 9, 'Royal seat of the Gaekwads and proximity to Champaner-Pavagadh, housing world-class museum collections and Jain bronzes.'),
(74, 'Ujjain (Avanti)', 10, 'Ancient meridian city and capital of King Vikramaditya, premier center of ancient Indian astronomy, coinage, and classical Sanskrit drama.'),
(75, 'Gwalior', 10, 'Spectacular plateau fortress featuring the Teli ka Mandir, Sas-Bahu temples, and early mathematical zero inscriptions in rock.'),
(76, 'Prayagraj (Allahabad)', 11, 'Confluence city home to the Ashoka Pillar with Harisena''s famous Gupta Prashasti, documenting Samudragupta''s imperial campaigns.'),
(77, 'Ayodhya', 11, 'Ancient Kosala kingdom capital along the Sarayu river, yielding Northern Black Polished Ware (NBPW) and early punch-marked coins.'),
(78, 'Jorhat (Majuli)', 14, 'Historic Ahom capital and island center of Neo-Vaishnavite Satras, preserving wooden masks, manuscript illumination, and bell metalcraft.');

-- ------------------------------------------------------------------------------
-- 8. INSERT SAMPLE DATA: categories (10 Antiquity Categories)
-- ------------------------------------------------------------------------------
INSERT INTO `categories` (`category_id`, `category_name`, `description`) VALUES
(1, 'Sculptures and Bronze Icons', 'Cire-perdue lost-wax icons, sacred bronzes, and classical anthropomorphic metalwork.'),
(2, 'Ancient Coins', 'Punch-marked karshapanas, die-struck gold dinaras, silver rupyas, and bilingual trade issues.'),
(3, 'Pottery and Ceramics', 'Iron Age Black-and-Red ware (BRW), Northern Black Polished Ware (NBPW), and glazed earthen storage vessels.'),
(4, 'Temple Inscriptions', 'Lithic epigraphs in ancient Brahmi, Grantha, Vatteluttu, Devanagari, and Old Kannada documenting imperial charters and endowments.'),
(5, 'Jewellery and Ornaments', 'Micro-granulated gold filigree, etched carnelian beads, repoussé amulets, and lapidary necklaces.'),
(6, 'Historical Weapons and Tools', 'Crucible Wootz steel swords, ceremonial katar push-daggers, copper-bronze axes, and naval boarding armaments.'),
(7, 'Manuscripts and Palm-Leaf Records', 'Etched Borassus palm-leaf folios (ola-chudi), birch bark birch bark scrolls, and Sanskrit-Tamil-Pali treaty codices.'),
(8, 'Stone Carvings and Architectural Fragments', 'Chloritic schist bracket friezes, red sandstone stupa railings, basalt medallions, and granite dvarapala guardians.'),
(9, 'Seals and Trade Objects', 'Steatite stamp seals, terracotta sealing tokens, trade guild passes, and weights from maritime trade networks.'),
(10, 'Ritual and Cultural Objects', 'Consecrated bell-metal lamps (deepams), copper puja yantras, ceremonial conches, and sacrificial vessels.');

-- ------------------------------------------------------------------------------
-- 9. INSERT SAMPLE DATA: artifacts (68 Distinct Historical Records)
-- ------------------------------------------------------------------------------
INSERT INTO `artifacts` (
  `artifact_id`,
  `artifact_name`,
  `district_id`,
  `category_id`,
  `historical_period`,
  `dynasty_or_civilization`,
  `approximate_age`,
  `material`,
  `place_of_origin`,
  `description`,
  `historical_significance`,
  `cultural_importance`
) VALUES
(1, 'Ananda Tandava Nataraja Bronze', 1, 1, 'Imperial Chola Golden Age', 'Chola Dynasty', 'Circa 10th – 11th Century CE', 'Panchaloha (sacred five-metal copper-tin alloy)', 'Kaveri Basin Royal Guild Workshop, Thanjavur region', 'World-renowned masterwork of cire-perdue (lost-wax) casting depicting Shiva dancing in the cosmic circle of fire. Commissioned during the reign of Rajaraja I or his court patrons, this icon depicts Shiva performing the cosmic dance within a flaming Prabhamandala. The deity crushes Apasmara (the demon of ignorance) beneath his right foot while gracefully lifting his left foot in the gesture of spiritual liberation.', 'Celebrated by art historians worldwide as the pinnacle of Indian classical metallurgy and dynamic anatomical balance.', 'Cast as an Utsava Murti to be carried in temple street processions, uniting divine spiritual presence with public civic life.'),
(2, 'Brihadisvara Foundation Epigraph Slab', 1, 4, 'Imperial Chola Era', 'Chola Dynasty (Rajaraja I)', '1010 CE', 'Chiseled Granite Bas-Relief', 'South plinth of the Rajarajesvaram (Big Temple), Thanjavur', 'Monumental Tamil-Grantha inscription documenting royal donations, temple treasury accounts, and names of master architects. Chiseled into the hard granitic plinths under the imperial command of King Rajaraja I, ordering that all grants given by himself, his elder sister Kundavai, his queens, and generals be permanently inscribed upon the sacred stone walls.', 'Constitutes one of the world''s most detailed primary epigraphic records of medieval municipal finance, administrative audit, and temple economics.', 'A symbol of classical Tamil institutional transparency and enduring archival record-keeping.'),
(3, 'Saraswathi Mahal Palm-Leaf Medical Treatise', 1, 7, 'Thanjavur Maratha / Nayak Era', 'Thanjavur Maratha Dynasty', 'Circa 17th – 18th Century CE', 'Treated Palmyra palm leaves (Borassus) with natural charcoal ink', 'Saraswathi Mahal Royal Library, Thanjavur Palace', 'Bound bundle of incised palm leaves documenting Siddha medicinal recipes, pulse diagnostics (Nadi Pariksha), and herbal formulas. Incised using a fine iron stylus (Ezhuthani) and rubbed with turmeric and lampblack to repel insects. Contains diagnostic procedures and pharmaceutical formulas compiled by royal physicians.', 'Documents the synthesis of indigenous Siddha, Ayurvedic, and early botanical therapies fostered at the court of Maharaja Serfoji II.', 'Represents centuries of empirical indigenous healing and pharmacological traditions preserved on organic media.'),
(4, 'Early Pandyan Twin-Carp Silver Coin', 2, 2, 'Sangam & Early Historic Age', 'Pandyan Dynasty', 'Circa 2nd Century BCE – 1st Century CE', 'Die-struck Silver-Copper Alloy', 'Vaigai riverbed deposits, Madurai', 'Rectangular die-struck coin stamped with the Pandyan royal twin-carp emblem, sacred tree, and river symbols. Recovered from ancient Madurai trading levels. The obverse depicts two fish facing one another, reflecting the maritime pearl-fishery dominance of the Pandyan kings, while the reverse displays an arched hill and tree-in-railing.', 'Provides tangible numismatic proof of organized monetary circulation and market statehood during the classical Sangam literary period.', 'The twin-carp remains the historic emblem of Madurai and an enduring symbol of southern civic heritage.'),
(5, 'Mangulam Tamil-Brahmi Rock Cavern Inscription', 2, 4, 'Sangam Era', 'Early Pandyan Kingdom', 'Circa 3rd – 2nd Century BCE', 'Natural Granite Rock Drip-Ledge Incising', 'Mangulam hill Jain caves, near Madurai', 'One of the oldest surviving written Tamil epigraphs, recording stone bed endowments to Jain ascetics by Pandyan royals. Carved neatly beneath the overhanging cavern brow at Mangulam hill, documenting the dedication of polished stone resting platforms to ascetic monk Kaniyan Nanta-asiriyan by Prince Kadalan Vazhuthi under Pandyan King Nedunjeliyan.', 'Confirmed the historical antiquity of Sangam rulers mentioned in literature and proved widespread early literacy in Tamil-Brahmi.', 'Reflects the ancient pluralism and royal patronage extended to heterodox monastic scholars in classical Tamil society.'),
(6, 'Pallava Somaskanda Granitic Bas-Relief', 3, 8, 'Early Medieval Pallava Era', 'Pallava Dynasty', 'Circa late 7th Century CE', 'Hard Granitic Gneiss Stone', 'Kailasanathar Temple sanctum precinct, Kanchipuram', 'High-relief carving depicting Shiva and Parvati seated with child Skanda between them, flanked by Brahma and Vishnu. Standardized during the reign of Rajasimha Pallava, this relief adorned the rear wall of the sanctum sanctorum. It conveys tranquil divine balance and maternal grace carved from hard granitic stone.', 'Demonstrates the technical transition from early soft sandstone cave excavations to structural hard granite temple reliefs.', 'Became the iconic theological and artistic motif across Tamil temple sanctuaries for over five centuries.'),
(7, 'Uttaramerur Village Electoral Charter Slab', 3, 4, 'Imperial Chola Era', 'Chola Dynasty (Parantaka I)', '920 CE', 'Inscribed Granite Base Course', 'Vaikunta Perumal Temple, Uttaramerur', 'Celebrated inscription codifying qualifications, secret-pot balloting (Kuda Olai), and disqualification rules for village councils. Inscribed across temple plinths, this remarkable constitutional text defines eligibility for agrarian administrative committees (Variyams). It describes the secret ballot where palm-leaf ballots were drawn from a pot by an innocent child.', 'Widely cited as one of the world''s most sophisticated constitutional records of local democratic self-governance from the 10th century.', 'A historic beacon of participatory democracy, electoral integrity, and municipal accountability in ancient India.'),
(8, 'Pallava Monolithic Dvarapala Guardian', 4, 8, 'Pallava Era', 'Pallava Dynasty', 'Circa 7th Century CE', 'Charnockite Dark Granite', 'Northern Tamil Nadu coast; curated at Government Museum, Chennai', 'Monumental granite sanctum guardian leaning upon a heavy ceremonial mace with coiled headgear and dynamic stance. Standing over six feet tall, this heroic guardian figure was sculpted from dense charnockite. Its dynamic tribhanga curve and raised warning hand (tarjani mudra) guarded the sanctum threshold.', 'Exemplifies the powerful monumental style of early Pallava stonecutters who carved monolithic guardian sentinels.', 'Emphasizes temple sacred boundary protection and spiritual vigilance.'),
(9, 'Uraiyur Indo-Roman Rouletted Ceramic Shard', 5, 3, 'Sangam-Roman Trade Epoch', 'Early Chola Realm', 'Circa 1st Century BCE – 1st Century CE', 'Fine alluvial slipped clay with concentric rouletted indentations', 'Uraiyur ancient habitational mounds, Tiruchirappalli', 'Fine-paste ceramic rim with distinctive concentric rouletted bands made using a toothed wheel. Excavated from ancient Uraiyur, the inland Chola textile capital. Displays high-fired lustrous slip and micro-grooves produced by rotative rouletting wheels, matching tableware traded across the Indian Ocean.', 'Proves that inland Kaveri trade emporia participated actively in Mediterranean commercial networks alongside coastal ports.', 'Demonstrates early cosmopolitan exchange and the appetite for fine dining wares in Sangam society.'),
(10, 'Kodumanal Etched Carnelian Bead Necklace', 9, 5, 'Iron Age / Sangam Era', 'Kongu Chera Chieftaincies', 'Circa 3rd Century BCE – 1st Century CE', 'Natural Carnelian chalcedony chemically etched with alkaline white patterns', 'Kodumanal industrial workshop site, Noyyal River basin', 'Barrel-shaped translucent carnelian beads etched with precise white geometric chevrons and eye patterns. Crafted using diamond-tipped micro-drills. The white geometric patterns were permanently etched by applying plant alkali paste before firing, resulting in durable decorative patterns.', 'Establishes the Noyyal basin as a premier ancient gemological manufacturing center whose products were exported to Rome and Alexandria.', 'Demonstrates advanced prehistoric pyrotechnology, lapidary skill, and aesthetic taste.'),
(11, 'Adichanallur Bronze Cockerel & Urn Finial', 7, 10, 'Iron Age / Megalithic Epoch', 'Pre-Historic Tamirabarani Culture', 'Circa 800 – 500 BCE', 'High-tin Cast Bronze', 'Adichanallur urn burial cemetery, Tamirabarani valley', 'Cast bronze animal finial representing a domestic rooster/cockerel with serrated comb, excavated from a megalithic burial urn. Recovered from large burial urns along the Tamirabarani river. The bronze displays remarkably pure alloy composition, cast with fine plumage striations and socketed to serve as a ceremonial lid finial.', 'Provides tangible evidence of high-tin bronze metallurgy in South India predating literate empires by several centuries.', 'Illuminates early animistic symbolism and ancestral mortuary reverence in Iron Age Tamil society.'),
(12, 'Salem Crucible Wootz Steel Ingot Cake', 8, 6, 'Ancient / Early Medieval Industrial', 'Kongu Chera / Chola Regions', 'Circa 1st Millennium CE', 'High-carbon hypereutectoid crucible steel (Ukku)', 'Salem iron ore belt smelting furnaces', 'Dense hemispherical ingot of crucible steel with crystalline dendrites, prized globally for forging Damascus swords. Smelted in sealed clay crucibles using magnetite iron ore and carbonaceous plant matter. The slow cooling produced carbide band structures responsible for the watery surface patterns of Damascus blades.', 'Crucible Wootz steel from Salem was acclaimed by Roman naturalists and Islamic armorers as the world''s premier blade metal.', 'Underlines India''s ancient technological leadership in precision pyrotechnology and defense metallurgy.'),
(13, 'Nagapattinam Gilded Bronze Buddha Icon', 10, 1, 'Chola Period', 'Chola Dynasty (Chudamani Vihara)', 'Circa 11th Century CE', 'Gilded Cast Copper-Bronze Alloy', 'Chudamani Vihara monastic complex, Nagapattinam port', 'Graceful standing Buddha icon displaying the flame ushnisha and abhaya mudra, reflecting Southeast Asian maritime Buddhist diplomacy. Cast at the seaside port of Nagapattinam where Srivijaya monarchs (from modern Sumatra) established Buddhist monasteries under grants issued by Rajaraja Chola I and Rajendra Chola.', 'Material proof of royal Chola religious tolerance and thriving diplomatic links with maritime Southeast Asia.', 'Reflects the cosmopolitan maritime nature of Tamil ports as nodes of cross-cultural exchange.'),
(14, 'Coimbatore Roman Aureus Gold Coin Hoard', 6, 2, 'Roman Principate / Sangam Era', 'Chera Border Realm / Roman Empire', 'Circa 1st Century CE (Reign of Augustus/Tiberius)', 'Pure Struck Gold (Aureus)', 'Vellalur hoard deposit, Coimbatore', 'Roman imperial gold coin stamped with the laureate portrait of Emperor Tiberius, counter-struck with local validation slash-marks. Discovered among hundreds of Roman coins buried along the Palakkad gap trade corridor. Roman merchants exchanged these gold aurei for Malabar pepper, beryl stones, and fine muslins.', 'Material verification of Pliny the Elder''s lament regarding the massive drain of Roman gold bullion into India.', 'Illustrates ancient India''s dominant trade balance and currency absorption in the ancient global economy.'),
(15, 'Muziris Port Mediterranean Wine Amphora', 11, 3, 'Early Chera / Roman Principate', 'Chera Kingdom of Muziris', 'Circa 1st Century BCE – 1st Century CE', 'Volcanic clay ceramic with double-loop handle and resin lining', 'Pattanam excavation trenches, Periyar delta', 'Substantial neck and handle of an imported Mediterranean wine amphora containing pine resin sediment. Excavated from waterlogged alluvial levels at ancient Muziris. Chemical chromatography identified internal resinous linings used in the Aegean and Campanian regions to preserve vintage wine transported to India.', 'Archaeologically substantiates the Greek-Egyptian seafaring described in the Periplus of the Erythraean Sea.', 'Emphasizes Kerala''s millennia-old status as an international spice and cultural gateway.'),
(16, 'Travancore Royal Wootz Ceremonial Sword', 12, 6, 'Travancore Kingdom', 'Kulasekhara Dynasty of Travancore', 'Circa 18th Century CE', 'Damascus patterned crucible steel with brass-gilt repoussé hilt', 'Padmanabhapuram Palace Armory, Travancore', 'Double-edged state sword featuring a hooded serpent pommel and etched fuller blade forged from crucible steel. Forged during the reign of Maharaja Marthanda Varma, who defeated the Dutch East India Company at the Battle of Colachel (1741). The hilt represents the sacred serpent Anantha, guardian of the state.', 'A premier symbol of indigenous military victory against European colonial expansion in Asia.', 'Associated with the historic Thrippadidanam consecration, dedicating the kingdom to Lord Padmanabhaswamy.'),
(17, 'Changalavatta Sacred Kerala Bell-Metal Lamp', 13, 10, 'Medieval Kerala Temple Period', 'Perumals of Mahodayapuram Tradition', 'Circa 14th – 15th Century CE', 'High-tin Kansu Bell Metal (Cast Bronze)', 'Temple artisan workshops of Thrissur', 'Traditional ceremonial lamp shaped as an auspicious hamsa bird with an integrated oil reservoir and hanging bronze spoon. Cast using resonant bell-metal alloy. The hamsa motif embodies truth and discernment, and the attached chain and ladle allowed continuous oil replenishment during temple rituals and Kathakali recitals.', 'Reflects the unique indigenous functional artistry of Kerala metalcraft workshops.', 'Essential in sanctum ceremonies, temple dance dramas, and royal coronation ceremonies.'),
(18, 'Zamorin Naval Push-Dagger (Katar)', 14, 6, 'Zamorin Maritime Era', 'Samoothiri (Zamorin) Dynasty', 'Circa 16th Century CE', 'Tempered Wootz steel with pierced steel knuckle-guard', 'Calicut naval armory, Kozhikode', 'Armor-piercing thrusting push-dagger engineered for close-quarters naval boarding warfare. Forged for the naval mariners and commanders under the Kunjali Marakkars resisting Portuguese armadas in the Arabian Sea. Features dual horizontal grip bars and an armor-piercing reinforced diamond tip.', 'Demonstrates specialized martial technology developed by Indian naval forces during 16th-century naval confrontations.', 'Emphasizes the storied seafaring resilience and naval prowess of the Malabar coast.'),
(19, 'Palakkad Gap Megalithic Burial Urn', 15, 3, 'Iron Age / Megalithic Epoch', 'Pre-Dynastic Indigenous Cultures', 'Circa 800 – 400 BCE', 'Earthenware clay fired under inverted reduction kiln atmosphere', 'Subterranean stone cist burials, Palakkad pass', 'Large globular Black-and-Red ware storage urn with rope-cord rim patterns and a burnished slip. Recovered from megalithic stone cists guarding the natural mountain pass between Tamil Nadu and Kerala. Dual firing yielded a lustrous red exterior and pitch-black interior designed to seal ancestral offerings.', 'Illuminates prehistoric burial customs and migration routes across the Western Ghats.', 'Demonstrates the deep roots of ancestral veneration and early ceramic technology in southern India.'),
(20, 'Krishnadevaraya Gold Varaha Pagoda', 16, 2, 'Vijayanagara Imperial Renaissance', 'Tuluva Dynasty (Vijayanagara)', 'Circa 1515 CE', 'Struck High-Purity Gold (approx. 92% fineness)', 'Royal Mint at Hampi, Tungabhadra Valley', 'Iconic gold coin depicting Lord Venkateshwara on the obverse and three-line royal Devanagari legend on the reverse. Issued during the reign of Emperor Sri Krishnadevaraya. The obverse depicts the seated four-armed deity holding the conch and discus, while the reverse reads ''Sri Pratapa Krishna Raya''.', 'Became the premier international trade coin of the Indian Ocean, referred to by European and Arab merchants as the ''Pagoda''.', 'A symbol of the legendary economic prosperity and artistic zenith of the Vijayanagara Empire.'),
(21, 'Vijayanagara Colossal Narasimha Fragment', 16, 8, 'High Vijayanagara Epoch', 'Tuluva Dynasty', '1528 CE', 'Pinkish-Grey Monolithic Deccan Granite', 'Sacred center sanctuary, Hampi', 'Sculpted granite fragment from the colossal monolithic statue of Ugra Narasimha crowned with multi-hooded Shesha. Part of the monumental 22-foot monolithic shrine commissioned by Krishnadevaraya. The leonine visage features bulging circular eyes, bared fangs, and the seven serpent hoods creating an arch of cosmic protection.', 'Exemplifies the monumental scale and mastery of Vijayanagara sculptors carving directly on native granite formations.', 'An international symbol of architectural daring and royal spiritual guardianship in pre-modern South India.'),
(22, 'Belur Hoysala Darpana Sundari Bracket Figure', 17, 8, 'Hoysala Golden Epoch', 'Hoysala Dynasty (Vishnuvardhana)', 'Circa 1117 CE', 'Chloritic Schist (soft soapstone that hardens with exposure)', 'Chennakeshava Temple eaves, Belur', 'Exquisitely detailed soapstone bracket figure of a celestial maiden looking into a hand mirror, adorned with perforated jewelry. Mounted beneath the overhanging temple eaves. The maiden gazes into a polished hand mirror, her hair coiled in intricate pearl-studded tresses with ringlets carved hollow behind the stone plane.', 'Demonstrates the sculptural capabilities of chloritic schist, enabling deep undercutting and free-floating stone filigree.', 'Celebrated internationally as one of the summits of classical Indian dance iconography and jewelry design.'),
(23, 'Badami Cave II Bhuvaraha Rock Relief', 18, 8, 'Early Chalukyan Era', 'Chalukyas of Vatapi (Badami)', 'Circa late 6th Century CE', 'Red Sandstone Cliff Relief', 'Cave Sanctuary II, Malaprabha Basin, Badami', 'Dramatic rock-cut relief of Vishnu as Varaha raising the earth goddess Bhudevi from the cosmic waters. Carved into the sheer red sandstone cliffs of Badami. Varaha steps upon the serpent king Sesha while effortlessly hoisting the delicate Bhudevi upon his tusk, celebrating rescue and cosmic renewal.', 'Represented the royal emblem of the Chalukya kings (the Boar Crest) symbolizing their protective rule over the earth.', 'Pivotal in tracing the development of classical rock-cut cave art that bridged Deccan and Dravidian idioms.'),
(24, 'Begur Ganga Hero Stone (Earliest ''Bengaluru'')', 20, 4, 'Western Ganga Dynasty', 'Western Ganga Dynasty (King Ereyappa)', 'Circa 890 – 900 CE', 'Coarse Grey Granite Memorial Slab with Relief Panels', 'Nageshwara Temple precinct, Begur, Bengaluru', 'Three-tiered hero stone (veergallu) depicting cavalry battle and containing the earliest recorded mention of ''Bengaluru''. Divided into three registers: the lowest shows cavalry and archers clashing in the battle of Bengaluru; the middle depicts heavenly maidens escorting the hero; the top shows the soul seated before Shiva. The Old Kannada inscription mentions the demise of warrior Buttannashetty.', 'Contains the earliest documented epigraphic mention of the name ''Bengaluru'' in human history.', 'A revered heritage treasure affirming the deep historical antiquity of India''s technological capital.'),
(25, 'Amaravati Stupa Marble Railing Medallion', 21, 8, 'Satavahana Epoch', 'Satavahana Dynasty', 'Circa 2nd Century CE', 'Palnadu Greenish-White Crystalline Limestone (''Amaravati Marble'')', 'Maha Chaitya (Great Stupa) railing balustrade, Amaravati', 'Circular railing medallion narrating Prince Siddhartha''s Great Departure, brimming with rhythmic aniconic movement. Carved in Palnadu limestone, depicting the prince''s horse Kanthaka borne aloft by celestial yakshas so that hoofbeats would not awaken guards, with royal parasols floating aniconically without depicting the human Buddha.', 'A masterpiece of ancient Buddhist art that profoundly influenced sculptures across Sri Lanka and Southeast Asia.', 'Marks the aesthetic zenith of the early Andhra school of Buddhist narrative art.'),
(26, 'Satavahana Two-Masted Ship Lead Coin', 21, 2, 'Later Satavahana Era', 'Satavahana Empire (Yajna Sri Satakarni)', 'Circa 170 – 200 CE', 'Die-cast Heavy Potin / Lead Alloy', 'Krishna River Estuary coastal deposits', 'Rare circular coin bearing the detailed relief of a large double-masted ocean-going sailing vessel. Commissioned under maritime emperor Gautamiputra Yajna Sri Satakarni. Displays a massive two-masted vessel rigged with sails navigating waves, flanked by fish motifs, with the Ujjain dynastic symbol on the reverse.', 'Unrivalled numismatic testimony to ancient Indian oceanic seafaring, shipbuilding, and Bay of Bengal maritime commerce.', 'A proud emblem of coastal Andhra''s ancient seafaring mariners.'),
(27, 'Tirumala Annamacharya Engraved Copper Plates', 22, 7, 'Vijayanagara Era', 'Saluva / Tuluva Patronage', 'Circa late 15th – early 16th Century CE', 'Engraved Pure Copper Plates joined by a brass ring', 'Sankirtana Bhandagaram stone vault, Tirumala Temple', 'Heavy engraved copper folios preserving thousands of devotional Telugu sankeertanas composed by Saint Annamacharya. To safeguard Saint Annamacharya''s 32,000 spiritual songs from decay, his son Pedda Tirumalacharya had them engraved into heavy copper sheets and safely walled inside a stone vault opposite the temple sanctum.', 'One of the most extraordinary literary preservation undertakings in South Asian history.', 'Forms the liturgical bedrock of daily musical worship at Tirumala and a classical Telugu treasure.'),
(28, 'Ketavaram Prehistoric Ochre Petroglyph', 23, 8, 'Mesolithic / Prehistoric Transition', 'Prehistoric Hunter-Gatherer Clans', 'Circa 8000 – 5000 BCE', 'Quartzite Rock Shelf with Hematite Iron Ochre & Animal Fat Binder', 'Ketavaram Escarpment rock shelters, Kurnool', 'Prehistoric rock art slab depicting stick-figured archers, wild deer, humped cattle, and solar spirals. Pigmented using ground iron oxide (geru) bound with tallow into the pores of quartzite rock. The painting portrays communal deer hunts, radiating sun shields, and spiritual dances performed around sacred hearths.', 'Establishes the Kurnool basin as one of the oldest continuously inhabited landscapes in peninsular India.', 'Connects modern civilization directly with the dawn of human creativity and symbolic expression.'),
(29, 'Kakatiya Monolithic Keerthi Torana Gateway', 25, 8, 'Kakatiya Golden Epoch', 'Kakatiya Dynasty (Ganapati Deva)', 'Circa 12th – 13th Century CE', 'Fine-grained Black Basalt Granite', 'Swayambhu Shiva Temple ruins, Warangal Fort', 'Intricately carved ceremonial gateway featuring mythical Makara arches, swans, and delicate scrollwork. One of four grand ceremonial gateways standing at the cardinal directions of Warangal Fort. Carved from dense basalt with symmetrical scrollwork, mythological Makaras emitting floral cascades, and guardian motifs.', 'Emblematic of Kakatiya architectural independence and adopted as the official State Emblem of Telangana.', 'A masterpiece of medieval Deccan stone masonry and civic pride.'),
(30, 'Ramappa Temple Porous Floating Brick', 25, 3, 'Kakatiya Era', 'Kakatiya Dynasty (General Recharla Rudra)', '1213 CE', 'Spongy, low-density kiln-fired clay with saw-dust / acacia gum additives', 'Gopuram superstructure, Ramappa Temple, Palampet', 'Ultra-lightweight ceramic temple brick engineered to float on water, reducing the structural load on sanctuary foundations. Manufactured using innovative medieval pyrotechnology where clay was mixed with organic husks that burned out during firing, creating internal air pockets. These bricks float on water, drastically reducing weight on the temple''s sandbox foundation.', 'Revolutionary lightweight structural ceramic engineering recognized in UNESCO World Heritage evaluation.', 'Highlights the ingenious structural science and seismic resilience developed by medieval Telugu architects.'),
(31, 'Golconda Crucible Steel Dagger with Jade Hilt', 26, 6, 'Deccan Sultanate / Qutb Shahi Era', 'Qutb Shahi Dynasty of Golconda', 'Circa 17th Century CE', 'Wootz crucible steel blade with carved nephrite jade hilt', 'Golconda armory workshop, Hyderabad', 'Curved dagger (khanjar) with high-contrast watery Damascus steel blade and pale green nephrite jade hilt carved as an ibex head. Forged in the Deccan metallurgical centers around Golconda. The blade features dense crystalline carbide waterings (johar), fitted with a carved nephrite jade handle inlaid with ruby and gold foil rosettes.', 'Illustrates the luxury arms production of the Deccan sultanates, blending Persian aesthetics with indigenous metallurgy.', 'Preserves the royal courtly craftsmanship and lapidary traditions of historic Hyderabad.'),
(32, 'Kailash Cave Monolithic Elephant Frieze', 27, 8, 'Rashtrakuta Era', 'Rashtrakuta Dynasty (Krishna I)', 'Circa 8th Century CE', 'Native Deccan Basalt Trap Cliff Carving', 'Cave 16 (Kailasanatha), Ellora', 'Monolithic plinth frieze of life-sized war elephants and lions appearing to carry the entire multi-storied temple mountain on their backs. Carved from top to bottom by excavating an estimated 200,000 tonnes of basalt rock out of the Charanandri hills. The elephant plinth forms a continuous bas-relief base giving the visual impression that the temple floats upon the shoulders of mythical pachyderms.', 'One of the greatest engineering and sculptural achievements in world architectural history.', 'A crowning monument of Indian rock-cut art and imperial Rashtrakuta patronage.'),
(33, 'Ajanta Cave 1 Padmapani Fresco Wall Fragment', 27, 10, 'Vakataka Golden Age', 'Vakataka Dynasty (Harishena)', 'Circa 5th Century CE', 'Clay plaster, cow dung, lime wash with mineral lapis lazuli and ochre pigment', 'Cave 1 antechamber, Ajanta Gorge', 'Reproduction study fragment of the Bodhisattva Padmapani holding a blue lotus with compassionate gaze. Adorning the entrance to the main sanctum at Ajanta. The Bodhisattva stands in graceful abhanga pose, wearing a jeweled crown and holding a blooming blue lotus, embodying universal compassion (karuna).', 'Represents the classical apex of ancient Indian mural painting and spiritual portraiture.', 'Universal icon of peace, spiritual serenity, and aesthetic sublimity in Buddhist heritage.'),
(34, 'Elephanta Caves Colossal Trimurti Relief', 28, 8, 'Kalachuri / Early Chalukya Era', 'Konkan Mauryas / Kalachuris', 'Circa 6th Century CE', 'Basalt Grotto High-Relief', 'Main cave sanctuary, Gharapuri (Elephanta Island), Mumbai Harbour', 'Monumental twenty-foot three-headed bust of Shiva representing creation, preservation, and cosmic dissolution. Carved deep in the basalt island caverns of Mumbai harbor. The central tranquil face is Tatpurusha (the creator), the left fierce mustache-bearing profile is Aghora (Bhairava, the destroyer), and the right graceful feminine profile is Vamadeva (preserver).', 'Widely regarded as one of the most sublime conceptual sculptures in the history of world religious art.', 'A supreme philosophical embodiment of cosmic balance, harmony, and transcendental theology.'),
(35, 'Kolhapur Brahmapuri Roman Poseidon Bronze', 29, 1, 'Satavahana / Early Roman Trade', 'Satavahana Kingdom', 'Circa 1st Century CE', 'Cast Bronze Statuette', 'Brahmapuri archaeological mound, Kolhapur', 'Mediterranean cast bronze statuette of Greek-Roman sea god Poseidon, discovered in an ancient Satavahana house hoard. Discovered during excavations at Brahmapuri alongside Roman bronze jugs and Satavahana pottery. The god stands holding a trident, cast in classical Greco-Roman style and transported by merchant caravans from the Konkan coast.', 'Definitive material evidence of active luxury trade and diplomatic exchange between the Roman Empire and the Satavahana court.', 'Illustrates the cosmopolitan taste of ancient Deccan urban elites.'),
(36, 'Konark Sun Temple Chlorite Musician Maiden', 30, 8, 'Eastern Ganga Golden Age', 'Eastern Ganga Dynasty (Narasimhadeva I)', 'Circa 1250 CE', 'Fine Green Chlorite Stone', 'Jagamohana terrace level, Sun Temple, Konark', 'Monumental female musician (Alasa Kanya) playing a mridangam drum with joyful dynamic movement. Positioned on the upper terrace of the Sun Temple''s assembly hall. Carved from dense green chlorite, her rounded form, parted lips, and rhythmic hand strikes on the drum celebrate solar vitality and courtly music.', 'Showcases the sculptural brilliance of the Kalinga school where colossal stone figures retain buoyant musical liveliness.', 'A timeless celebration of classical Odissi rhythm, temple dance, and architectural grandeur.'),
(37, 'Konark Stone Chariot Wheel Frieze', 30, 8, 'Eastern Ganga Era', 'Eastern Ganga Dynasty', 'Circa 1250 CE', 'Khondalite Weathered Sandstone', 'Base plinth, Sun Temple, Konark', 'Intricately carved monumental sundial chariot wheel depicting daily life, celestial deities, and hourly division spokes. One of 24 monumental wheels symbolizing the 24 fortnights of the solar year, drawn by seven horses. The eight broad and eight narrow spokes function as sophisticated sundials calculating time by the shadow cast on the hub.', 'A monumental synthesis of astronomical science, solar theology, and architectural virtuosity.', 'Celebrated globally as an icon of Indian heritage and featured on the Indian ten-rupee currency note.'),
(38, 'Hathigumpha Inscription of Emperor Kharavela', 31, 4, 'Kalinga Realm', 'Mahameghavahana Dynasty', 'Circa 2nd – 1st Century BCE', 'Natural Sandstone Overhang Rock Inscription', 'Elephant Cave (Hathigumpha), Udayagiri Hills, Bhubaneswar', 'Seventeen-line Brahmi epigraph recording the military victories, canal excavations, and public benefactions of King Kharavela. Inscribed in archaic Brahmi script and Prakrit language, recounting year by year the reign of Emperor Kharavela, including canal repairs, defeats of rival northern and southern confederacies, and gifts to Jain monks.', 'One of the most important biographical royal epigraphs in ancient Indian historiography.', 'The foundational historical document for ancient Kalinga statehood and early Jain heritage.'),
(39, 'Illustrated Odia Palm-Leaf Gita Govinda Folio', 31, 7, 'Medieval Kalinga Era', 'Gajapati Realm Tradition', 'Circa 16th – 17th Century CE', 'Etched Borassus palm leaves with lampblack rubbings', 'Prachi Valley scribal workshop, Khordha', 'Delicately etched palm-leaf folio illustrating verses of Jayadeva''s Gita Govinda with fine line drawings of Radha and Krishna. Etched using a needle-sharp steel stylus (Lekhani). The artist incised miniature human figures and landscape flora with microscopic precision, then rubbed powdered charcoal and bean juice to blacken the carved grooves.', 'Illustrates the specialized indigenous graphic art tradition of Odia palm-leaf manuscript illustration.', 'Preserves the literary, musical, and devotional heritage of the Jagannath cult.'),
(40, 'Kalibangan Harappan Terracotta Bull Figurine', 32, 3, 'Indus Valley Civilization (Mature Phase)', 'Harappan Civilization', 'Circa 2500 – 2000 BCE', 'High-fired Terracotta with Red Slip', 'Kalibangan citadel excavation mound, Ghaggar valley', 'Hand-modeled terracotta figurine of a humped Indian zebu bull with muscular shoulders and prominent horns. Excavated from the stratified Bronze Age settlement at Kalibangan. The bull displays dynamic vitality, showcasing the anatomical observation of Harappan potters modeling the sacred humped bull (Bos indicus).', 'Affirms the central economic and symbolic role of cattle in the agricultural systems of the Indus-Saraswati civilization.', 'One of the oldest surviving artistic representations of the sacred humped bull in South Asia.'),
(41, 'Kalibangan Steatite Unicorn Stamp Seal', 32, 9, 'Mature Harappan Period', 'Indus Valley Civilization', 'Circa 2400 – 1900 BCE', 'Fired and Glazed Steatite (Soapstone)', 'Kalibangan residential block, lower city', 'Square stamp seal depicting the mythical one-horned animal before a ritual manger, topped with undeciphered Indus script. Carved with an intaglio design of the iconic unicorn animal. The reverse features a perforated boss knob for wearing on a cord. Stamped into wet clay sealings to secure trade goods dispatched across ancient merchant routes.', 'Evidence of centralized merchant administration, property marking, and standardized weights in Bronze Age Rajasthan.', 'A symbol of the unsolved mystery of the ancient Indus writing system.'),
(42, 'Mewar Royal Crucible Wootz Talwar Sword', 34, 6, 'Mewar Kingdom', 'Sisodia Rajput Dynasty', 'Circa 17th Century CE', 'High-carbon crucible Wootz steel blade with gold koftgari damascened hilt', 'Chittorgarh / Udaipur Royal Armory', 'Curved single-edged cavalry talwar featuring watery Damascus surface patterns and gold-inlaid floral pommel disk. Forged for Rajput warriors resisting imperial expansion. The blade exhibits a keen tempered cutting edge, balanced with a characteristic Rajput disk-pommel hilt decorated with fine gold wire (koftgari).', 'Represents the pinnacle of Indian martial blademaking and defensive metallurgy.', 'Revered in Rajput culture as a sacred symbol of honor, chivalry, and ancestral vow (Aan).'),
(43, 'Amer Rajput Gilded Katar Dagger with Hunt Motif', 33, 6, 'Kachhwaha Rajput Era', 'Kachhwaha Dynasty of Amer', 'Circa 17th Century CE', 'Forged crucible steel with chiseled high-relief hunt motifs and gold inlay', 'Amer Fort armory, Jaipur', 'Thrusting katar with reinforced central rib, chiseled with tigers hunting antelopes in lush foliage. Crafted for personal defense and royal ceremonies. The dual side-guards protect the forearm, while the blade face is deeply chiseled with animal combat motifs highlighted in genuine gold leaf.', 'Exemplifies the luxury armory arts where lethal combat weapons were elevated to high decorative jewelry.', 'A treasured heirloom of royal Rajasthani courtly regalia.'),
(44, 'Lothal Persian Gulf Circular Steatite Seal', 35, 9, 'Indus-Mesopotamian Trade Epoch', 'Harappan Maritime Phase', 'Circa 2100 – 1900 BCE', 'Glazed Grey Steatite', 'Lothal warehouse dockyard precinct', 'Circular button seal displaying two leaping gazelles flanking a central motif, originating from Dilmun (Persian Gulf). Discovered in the mud-brick warehouse near the ancient tidal dock of Lothal. Unlike square Harappan seals, this seal matches circular issues from Bahrain and Failaka, proving direct maritime trade between Gujarat and the Gulf.', 'Unquestionable material proof of Bronze Age maritime commerce between India, Dilmun, and Mesopotamia.', 'Demonstrates Gujarat''s 4,000-year heritage as India''s premier maritime trading gateway.'),
(45, 'Lothal Micro-Bead Carnelian & Gold Necklace', 35, 5, 'Mature Harappan Era', 'Indus Valley Civilization', 'Circa 2300 – 1900 BCE', 'Natural Carnelian, Steatite micro-beads, and beaten gold foil spacer discs', 'Lothal bead factory workshop, Gulf of Khambhat', 'Multi-strand necklace of cylindrical red carnelian beads and micro-beads recovered from an ancient lapidary workshop. Excavated from a specialized bead factory containing kilns, raw chalcedony nodules, and fine chert drills. The microscopic beads required high dexterity to drill without shattering.', 'Marks Lothal as one of the world''s earliest known industrialized gem lapidary centers.', 'The ancestor of the Khambhat agate and carnelian beadworking tradition that continues to this day.'),
(46, 'Junagadh Rock Edict of Emperor Ashoka', 36, 4, 'Mauryan Empire', 'Mauryan Dynasty (Emperor Ashoka)', 'Circa 250 BCE', 'Monolithic Granite Boulder Epigraph', 'Foot of Mount Girnar, Junagadh', 'Fourteen Major Rock Edicts inscribed in Brahmi script and Prakrit promoting moral dharma, medical treatment, and animal welfare. Carved into a massive black granite boulder at the base of Girnar hill. The inscription mandates the establishment of botanical gardens for medicinal herbs for both humans and animals, and commands state officers to govern with benevolence.', 'One of the most complete and accessible records of Emperor Ashoka''s moral revolution and humanitarian governance.', 'A landmark in human moral philosophy, religious coexistence, and early environmental stewardship.'),
(47, 'Rani ki Vav Sheshashayi Vishnu Relief', 37, 8, 'Solanki / Chaulukya Golden Age', 'Chaulukya Dynasty (Queen Udayamati)', 'Circa 11th Century CE', 'Sandstone Subterranean Relief', 'Fourth tier subterranean corridor, Rani ki Vav, Patan', 'Sculpture of Vishnu reclining peacefully upon the thousand-headed serpent Shesha amidst the subterranean waters of the stepwell. Carved deep within the subterranean levels of the Queen''s Stepwell. Vishnu is depicted in yoganidra upon the serpent coils, his divine consort Lakshmi massaging his feet, surrounded by celestial musicians and water motifs.', 'UNESCO World Heritage masterpiece celebrating the sanctification of subterranean water bodies into inverted subterranean temples.', 'Reflects the supreme reverence for water preservation and sacred feminine patronage in medieval Gujarat.'),
(48, 'Sanchi Stupa 1 Southern Torana Architrave', 38, 8, 'Shunga / Satavahana Epoch', 'Shunga & Satavahana Guilds', 'Circa 1st Century BCE', 'Fine-grained Chunar / Vindhyan Sandstone', 'Great Stupa (Stupa 1) South Gateway, Sanchi', 'Intricately carved sandstone gateway architrave depicting the Seven Manushi Buddhas, winged lions, and the Ashokan Wheel of Law. Carved by the ivory carvers of nearby Vidisha who applied microscopic ivory-cutting techniques to hard sandstone. The relief illustrates Jataka tales, royal processions, and Ashokan emblems with astonishing vitality.', 'One of the earliest and best preserved narrative stone architectural complexes in world Buddhist art.', 'A symbol of peace, Buddhist dharma, and cooperative guild patronage across ancient India.'),
(49, 'Vidisha Heliodorus Pillar Garuda Capital', 39, 8, 'Indo-Greek & Shunga Era', 'Shunga Realm / Indo-Greek Embassy', 'Circa 113 BCE', 'Monolithic Chiseled Sandstone Column', 'Besnagar archaeological site, Vidisha', 'Monolithic sandstone pillar erected by Greek ambassador Heliodorus of Taxila, declaring his personal devotion to Vasudeva. The Brahmi inscription records that Heliodorus, an ambassador sent by Indo-Greek King Antialcidas to the court of Shunga King Bhagabhadra, became a dedicated Bhagavata (devotee of Krishna/Vasudeva) and erected this sacred Garuda column.', 'Priceless epigraphic evidence of ancient intercultural religious synthesis and the early historical evolution of Vaishnavism.', 'Demonstrates the universal appeal and welcoming philosophy of ancient Indian spiritual traditions.'),
(50, 'Khajuraho Lakshmana Temple Celestial Maiden (Nayika)', 40, 8, 'Chandella Renaissance', 'Chandella Dynasty (King Yashovarman)', 'Circa 954 CE', 'Buff-colored Fine Vindhyan Sandstone', 'Jangha wall frieze, Lakshmana Temple, Khajuraho', 'Sandstone relief of a celestial maiden removing a thorn from her foot (Shalabhanjika), displaying graceful serpentine curves. Positioned on the exterior wall band of the sanctuary. The maiden balances effortlessly on one foot, turning her torso gracefully to inspect the sole of her foot, embodying classical aesthetic poise (Sringara).', 'Demonstrates the peak of medieval Indian sculptural humanism and celebratory temple iconography.', 'Celebrated globally as a benchmark of classical feminine beauty, freedom of expression, and divine joy.'),
(51, 'Udayagiri Cave 5 Colossal Varaha Relief', 39, 8, 'Gupta Golden Age', 'Gupta Empire (Chandragupta II Vikramaditya)', 'Circa 400 CE', 'Sandstone Escarpment Rock-Cut Relief', 'Cave 5, Udayagiri hill sanctuary, Vidisha', 'Colossal fourteen-foot rock relief of the boar incarnation Varaha rescuing goddess Earth, watched by celestial sages and ocean rivers. Carved directly into the hillside during the reign of Chandragupta II. Varaha plants his left foot triumphantly on the serpent Sesha, holding the slender personified Earth upon his tusk as celestial rishis shower flower petals.', 'The definitive visual monument of the Gupta artistic renaissance, symbolizing the restoration of cosmic order and royal peace.', 'A towering masterpiece bridging rock architecture, epic mythology, and imperial state ideology.'),
(52, 'Lion Capital of Ashoka (National Emblem)', 41, 8, 'Mauryan Imperial Zenith', 'Mauryan Dynasty (Emperor Ashoka)', 'Circa 250 BCE', 'Polished Chunar Fine Sandstone with Mauryan Glass-Like Lustre', 'Deer Park stupa precinct, Sarnath', 'World-famous capital of four back-to-back Asiatic lions standing upon an abacus displaying the Wheel of Law (Dharmachakra). Erected at the spot where the Buddha delivered his first sermon. The four lions represent noble courage proclaiming the truth to the four cardinal directions. The abacus features four animals: horse, bull, elephant, and lion.', 'Adopted in 1950 as the official National Emblem of the Republic of India; the Ashoka Chakra adorns the center of the National Flag.', 'The ultimate sovereign symbol of ethical power, universal justice, and democratic truth (Satyameva Jayate).'),
(53, 'Sarnath Gupta Preaching Buddha', 41, 8, 'Gupta Golden Age', 'Gupta Empire', 'Circa 5th Century CE', 'Cream-colored Chunar Sandstone with smooth finish', 'Main monastery complex, Sarnath', 'Iconic seated Buddha turning the Wheel of Law (Dharmachakra Pravartana Mudra) with downcast eyes of transcendent peace. The Buddha sits in vajrasana upon a lotus throne. His fingers form the teaching gesture while an ornate halo carved with flying celestial beings and floral arabesques radiates behind his calm meditative head.', 'Widely regarded by global art historians as the supreme sculptural embodiment of spiritual enlightenment and inner serenity.', 'A universal treasure of Asian spiritual art and contemplative philosophy.'),
(54, 'Mathura Kushan Spotted Red Sandstone Bodhisattva', 42, 8, 'Kushan Imperial Era', 'Kushan Empire (King Kanishka)', 'Circa 1st – 2nd Century CE', 'Native Sikri Spotted Red Sandstone', 'Katra Keshavdev mound, Mathura', 'Heroic standing Bodhisattva radiating physical vitality, holding a water pot and granting abhaya fearlessness. Sculpted in distinctive red sandstone speckled with white spots. Unlike the Hellenistic Greco-Buddhist style of Gandhara, the Mathura school developed an indigenous Indian aesthetic emphasizing muscular chest, open eyes, and earthy vigor.', 'Proved that indigenous Indian sculptors pioneered anthropomorphic Buddhist iconography in tandem with northwest frontier workshops.', 'The foundational stylistic ancestor for centuries of Indian Hindu, Buddhist, and Jain classical statuary.'),
(55, 'Kushan Gold Dinar of Emperor Kanishka I', 42, 2, 'Kushan Empire', 'Kushan Dynasty', 'Circa 127 – 150 CE', 'Die-struck Pure Gold (approx. 8 grams)', 'Mathura royal mint hoard', 'Gold dinar depicting King Kanishka standing sacrificing at an altar, with the standing Buddha (BODDO) on the reverse. Issued by Emperor Kanishka I, convener of the Fourth Buddhist Council. The obverse depicts the king in heavy Central Asian steppe tunic offering incense, while the reverse bears the standing figure of the Buddha labeled in Greek script ''BODDO''.', 'One of the earliest identifiable depictions of the Buddha on official imperial state coinage.', 'Material testament to the Silk Road trade crossroads uniting Indian, Persian, and Mediterranean worlds.'),
(56, 'Nalanda Monastic Gilded Bronze Bodhisattva Avalokiteshvara', 43, 1, 'Pala Empire Golden Age', 'Pala Dynasty (Devapala)', 'Circa 9th Century CE', 'Ashtadhatu (Eight-metal sacred bronze) with gold mercury gilding', 'Monastery Site 1 bronzeworks, Nalanda Mahavihara', 'Slender standing Avalokiteshvara holding a blooming lotus, exhibiting high Pala metalwork elegance. Cast at the university workshops of Nalanda where master metalcasters Dhiman and Vitapala trained artists from across Asia. The Bodhisattva displays a micro-modeled crown containing Amitabha Buddha.', 'Representative of the Pala bronze style that traveled along pilgrimage routes to inspire art in Tibet, Nepal, and Java.', 'Symbol of the philosophical heights and artistic excellence of ancient India''s greatest international university.'),
(57, 'Didarganj Yakshi Mirror-Polished Sandstone Statue', 44, 8, 'Mauryan / Post-Mauryan Epoch', 'Mauryan Realm', 'Circa 3rd – 2nd Century BCE', 'Monolithic Chunar Buff Sandstone with Mauryan Mirror Polish', 'Ganges riverbank at Didarganj, Patna', 'Life-sized female chauri-bearer (Yakshi) holding a fly-whisk, renowned for its mirror-like polish and voluptuous beauty. Discovered partially submerged in the mud of the Ganges. The figure stands in graceful contrapposto holding a fly-whisk (chauri), her hair dressed in elaborate braided tresses with heavy anklets and beaded girdle.', 'The crowning masterpiece of ancient Indian monumental free-standing stone sculpture, possessing the famous vitreous Mauryan polish.', 'An immortal national emblem of ancient Indian feminine grace, sculpture mastery, and artistic confidence.'),
(58, 'Bodh Gaya Sandstone Vajrasana (Diamond Throne)', 45, 8, 'Mauryan / Shunga Epoch', 'Commissioned by Emperor Ashoka', 'Circa 250 BCE', 'Polished Grey Chunar Sandstone Slab', 'Beneath the sacred Bodhi Tree, Mahabodhi Temple, Bodh Gaya', 'Polished sandstone slab platform decorated with carved honeysuckles, geese (hamsa), and geometric borders marking the exact seat of Enlightenment. Placed directly beneath the Bodhi tree by Emperor Ashoka to mark the Navel of the Earth (Bodhimaṇḍa) where Siddhartha Gautama attained supreme awakening. The sides are chiseled with classical Mauryan palmette and goose borders.', 'The most sacred physical archaeological relic in the global Buddhist pilgrimage world.', 'The universal spiritual center for millions of pilgrims seeking inner liberation.'),
(59, 'Gupta Gold Dinar of Samudragupta with Lyre (Veena)', 44, 2, 'Gupta Empire', 'Gupta Dynasty (Emperor Samudragupta)', 'Circa 350 – 375 CE', 'High-grade Die-struck Gold', 'Pataliputra imperial mint hoard', 'Celebrated gold coin depicting Emperor Samudragupta seated cross-legged on a high-backed couch playing the seven-stringed Indian lute (veena). Minted in the imperial capital of Pataliputra. Samudragupta, renowned as a conquering warrior in the Allahabad pillar inscription, chose to immortalize himself on his gold currency as a sensitive musical poet and patron of the arts.', 'Tangible numismatic proof of the cultural renaissance and artistic self-perception of classical Gupta monarchs.', 'Earliest visual representation of a classical Indian stringed instrument on official currency.'),
(60, 'Chandraketugarh Winged Fertility Goddess Plaque', 46, 3, 'Shunga-Kushan Maritime Era', 'Gangaridai Coastal Civilization', 'Circa 2nd – 1st Century BCE', 'Fine Mold-Pressed Terracotta Plaque', 'Vidyadhari river ancient habitational mounds, Chandraketugarh', 'Mold-made terracotta plaque depicting a winged Yakshi goddess adorned with elaborate rosettes, hairpin weapons, and beaded girdles. Excavated from the ancient port city of Chandraketugarh in the Ganges delta. The plaque displays astonishingly fine ornamental detail, showing ten auspicious miniature weapons tucked into her elaborate headdress.', 'Reveals an advanced riverine urban civilization in the Bengal delta that traded actively with the Greco-Roman world.', 'A summit of ancient Indian terracotta mold craftsmanship and auspicious maternal symbolism.'),
(61, 'Bishnupur Terracotta Temple Battle Frieze Brick', 47, 3, 'Late Medieval Mallabhum Kingdom', 'Malla Dynasty of Bishnupur', 'Circa 17th Century CE', 'Kiln-baked alluvial terracotta relief brick', 'Facade of Shyamrai / Jor-Bangla Temple, Bishnupur', 'High-fired red terracotta architectural brick depicting an epic battle scene with war chariots, archers, and elephants from the Ramayana. Commissioned by the Malla kings who substituted scarce building stone with local river clay fired into vitreous red brick reliefs. The facades of their curved ''chala'' roof temples were entirely clothed in narrative terracotta plaques.', 'A unique indigenous regional architectural school that elevated baked clay to monumental structural art.', 'Preserves the folk-classical storytelling and devotional Vaishnava literature of Bengal.'),
(62, 'Pala Period Black Basalt Vishnu Trivikrama', 47, 8, 'Pala-Sena Epoch', 'Pala Empire', 'Circa 11th Century CE', 'High-Polished Dark Grey Kasauti Stone (Black Basalt)', 'Radha region temple ruins, Bankura', 'Exquisitely detailed standing Vishnu flanked by Sri and Saraswati, framed by an openwork flaming prabhavali. Carved from dense Rajmahal black basalt that accepted a glassy polish. Vishnu holds the mace, discus, lotus, and conch with crisp filigree ornaments, while his attendants hold stringed instruments and fly-whisks.', 'Representative of the mature Pala-Sena sculptural school that dominated eastern India before the medieval period.', 'A celebrated example of Eastern Indian stone carving virtuosity and Vaishnava iconography.'),
(63, 'Ahom Royal Wootz Steel Hengdang Sword', 48, 6, 'Ahom Kingdom Zenith', 'Ahom Dynasty (Swargadeo Rudra Singha)', 'Circa late 17th Century CE', 'High-carbon crucible steel with brass-gilt dragon hilt', 'Rangpur Royal Armory, Sivasagar', 'Traditional straight single-edged Ahom sword carried by royal monarchs and Borphukan military commanders. Forged for Ahom warriors who successfully repelled seventeen Mughal invasions of the Brahmaputra valley. The long straight blade has a razor cutting edge, fitted with an elongated hilt designed for two-handed tactical combat.', 'The definitive martial weapon associated with General Lachit Borphukan and the Battle of Saraighat (1671).', 'The sovereign symbol of Assamese courage, self-determination, and 600-year unbroken Ahom independence.'),
(64, 'Illustrated Sanchi-Bark Hastividyarnava Folio', 48, 7, 'Ahom Kingdom', 'Ahom Dynasty (King Siva Singha)', '1734 CE', 'Treated bark of the Sanchi tree (Aquilaria agallocha) with natural mineral pigments', 'Royal court at Rangpur, Sivasagar', 'Illustrated treatise on elephant management, breeds, and veterinary medicine painted on durable indigenous tree bark. Compiled by court scholar Sukumar Barkath with miniature paintings by artists Dilbar and Dosai. The folios detail war elephant training and medical herbal remedies, executed on waterproof agarwood bark.', 'A landmark illustrated scientific manuscript and veterinary compendium in pre-modern South Asia.', 'A treasure of Assamese classical literature and wildlife heritage.'),
(65, 'Ambari Archaeological Sun God (Surya) Stone Carving', 49, 8, 'Kamarupa Realm', 'Pala Dynasty of Kamarupa', 'Circa 10th – 11th Century CE', 'Grey Charnockite Granite', 'Ambari excavation site, Guwahati', 'Standing Surya holding twin lotuses, accompanied by Danda, Pingala, and flying heavenly celestials. Discovered during urban foundation excavations at Ambari in central Guwahati, confirming the existence of a major classical Kamarupa sculptural school along the Brahmaputra river.', 'Proves that ancient Kamarupa maintained sophisticated stone-carving guilds on par with contemporary Bengal and Odisha.', 'A proud emblem of Assam''s ancient classical urban heritage.'),
(66, 'Kadamba Dynasty Gold Gadyana Coin', 50, 2, 'Kadambas of Goa Era', 'Kadamba Dynasty (King Jayakeshi I)', 'Circa 11th – 12th Century CE', 'Struck Pure Gold (approx. 4.2 grams)', 'Chandor / Gopakapattana mint hoard, Goa', 'Gold trade coin depicting the royal roaring lion of the Kadambas on the obverse and ornate Devanagari royal title on the reverse. Minted by the seafaring Kadamba kings of Goa whose fleets dominated the Arabian Sea trade routes. The obverse displays a ferocious lion facing left with raised paw and sun-moon emblems, surrounded by floral beads.', 'Material proof of Goa''s prosperous pre-colonial mercantile statehood and thriving maritime port at Gopakapattana.', 'A revered symbol of ancient Goan maritime sovereignty and economic power.'),
(67, 'Goa Kadamba Royal Hero Stone (Veergallu)', 50, 4, 'Medieval Kadamba Era', 'Kadambas of Goa', 'Circa 12th Century CE', 'Basalt Monolithic Memorial Slab', 'Old Goa coastal temple ruins', 'Three-register memorial hero stone depicting an Arabian Sea naval clash between multi-oared war galleys. Unlike inland hero stones that show cavalry or infantry battles, this coastal Goan stone vividly portrays naval warfare, with rowers operating oared warships while archers exchange fire across sea waves.', 'One of the extremely rare epigraphic stones in India depicting organized medieval naval combat.', 'Commemorates the seafaring valor of ancient Goan mariners defending their harbors.'),
(68, 'Tambdi Surla Kadamba Mahadeva Basalt Mandapa Carving', 50, 8, 'Kadamba Golden Era', 'Kadamba Dynasty', 'Circa 12th Century CE', 'Fine-grained Weather-Resistant Basalt Rock', 'Mahadeva Temple mandapa, Tambdi Surla, Western Ghats', 'Intricately carved ceiling rosette and pillar frieze depicting elephant battles and Shaivite floral iconography. Surviving intact within deep rainforests of the Western Ghats, this temple escaped foreign destruction. The pillars are lathe-turned basalt decorated with elephant friezes, lotus rosettes, and miniature shikhara models.', 'The only surviving complete structural temple of the Kadamba period in Goa.', 'The crowning architectural jewel of pre-Portuguese Goan sacred heritage.');

-- ==============================================================================
-- 10. SQL VERIFICATION AND TESTING QUERIES
-- Run these queries directly in the phpMyAdmin SQL tab to verify system integrity.
-- ==============================================================================

-- 1. Display all states
SELECT state_id, state_name, description FROM states ORDER BY state_name ASC;

-- 2. Display districts belonging to a selected state (e.g., Tamil Nadu, state_id = 1)
SELECT d.district_id, d.district_name, s.state_name, d.description
FROM districts d
JOIN states s ON d.state_id = s.state_id
WHERE s.state_id = 1
ORDER BY d.district_name ASC;

-- 3. Display all artifact categories
SELECT category_id, category_name, description FROM categories ORDER BY category_id ASC;

-- 4. Display all artifacts (basic overview)
SELECT artifact_id, artifact_name, historical_period, dynasty_or_civilization, material
FROM artifacts
ORDER BY artifact_id ASC;

-- 5. Display artifact details with district, state, and category names using JOINs
SELECT 
    a.artifact_id,
    a.artifact_name,
    c.category_name,
    d.district_name,
    s.state_name,
    a.historical_period,
    a.dynasty_or_civilization,
    a.approximate_age,
    a.material,
    a.place_of_origin
FROM artifacts a
JOIN districts d ON a.district_id = d.district_id
JOIN states s ON d.state_id = s.state_id
JOIN categories c ON a.category_id = c.category_id
ORDER BY a.artifact_id ASC;

-- 6. Search artifacts by name using LIKE
SELECT a.artifact_id, a.artifact_name, a.dynasty_or_civilization, a.material
FROM artifacts a
WHERE a.artifact_name LIKE '%Bronze%'
ORDER BY a.artifact_name ASC;

-- 7. Filter artifacts by state (e.g., Tamil Nadu)
SELECT 
    a.artifact_id,
    a.artifact_name,
    s.state_name,
    d.district_name,
    c.category_name
FROM artifacts a
JOIN districts d ON a.district_id = d.district_id
JOIN states s ON d.state_id = s.state_id
JOIN categories c ON a.category_id = c.category_id
WHERE s.state_name = 'Tamil Nadu';

-- 8. Filter artifacts by district (e.g., Thanjavur)
SELECT 
    a.artifact_id,
    a.artifact_name,
    d.district_name,
    a.material,
    a.historical_period
FROM artifacts a
JOIN districts d ON a.district_id = d.district_id
WHERE d.district_name = 'Thanjavur';

-- 9. Filter artifacts by category (e.g., Sculptures and Bronze Icons, category_id = 1)
SELECT 
    a.artifact_id,
    a.artifact_name,
    c.category_name,
    a.dynasty_or_civilization,
    a.material
FROM artifacts a
JOIN categories c ON a.category_id = c.category_id
WHERE c.category_id = 1;

-- 10. Filter artifacts by historical period (e.g., Chola or Sangam)
SELECT 
    a.artifact_id,
    a.artifact_name,
    a.historical_period,
    a.dynasty_or_civilization
FROM artifacts a
WHERE a.historical_period LIKE '%Chola%';

-- 11. Count artifacts in each state
SELECT 
    s.state_id,
    s.state_name,
    COUNT(a.artifact_id) AS total_artifacts
FROM states s
LEFT JOIN districts d ON s.state_id = d.state_id
LEFT JOIN artifacts a ON d.district_id = a.district_id
GROUP BY s.state_id, s.state_name
ORDER BY total_artifacts DESC, s.state_name ASC;

-- 12. Count artifacts in each category
SELECT 
    c.category_id,
    c.category_name,
    COUNT(a.artifact_id) AS total_artifacts
FROM categories c
LEFT JOIN artifacts a ON c.category_id = a.category_id
GROUP BY c.category_id, c.category_name
ORDER BY total_artifacts DESC, c.category_name ASC;

-- 13. Count artifacts in each district
SELECT 
    d.district_id,
    d.district_name,
    s.state_name,
    COUNT(a.artifact_id) AS total_artifacts
FROM districts d
JOIN states s ON d.state_id = s.state_id
LEFT JOIN artifacts a ON d.district_id = a.district_id
GROUP BY d.district_id, d.district_name, s.state_name
HAVING total_artifacts > 0
ORDER BY total_artifacts DESC, d.district_name ASC;

-- 14. Retrieve related artifacts from the same category (e.g., related to artifact #1)
SELECT 
    a.artifact_id,
    a.artifact_name,
    a.dynasty_or_civilization,
    a.material
FROM artifacts a
WHERE a.category_id = (SELECT category_id FROM artifacts WHERE artifact_id = 1)
  AND a.artifact_id != 1
LIMIT 5;

-- 15. Test Foreign Key Integrity (Referential Integrity Check)
-- A) Valid Insert: Should succeed
-- INSERT INTO artifacts (artifact_name, district_id, category_id, historical_period) 
-- VALUES ('Test Inscription Slab', 1, 4, 'Medieval Era');

-- B) Invalid Insert (Non-existent district 9999): MUST FAIL with Error 1452 (Cannot add or update child row)
-- INSERT INTO artifacts (artifact_name, district_id, category_id) 
-- VALUES ('Invalid Artifact', 9999, 1);

-- C) Invalid Delete of Referenced State: MUST FAIL with Error 1451 (Cannot delete or update parent row)
-- DELETE FROM states WHERE state_id = 1;
-- (Protected by ON DELETE RESTRICT because districts exist for state_id = 1)

-- D) Invalid Delete of Referenced District: MUST FAIL with Error 1451
-- DELETE FROM districts WHERE district_id = 1;
-- (Protected by ON DELETE RESTRICT because artifacts reference district_id = 1)
