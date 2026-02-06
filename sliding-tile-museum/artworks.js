// ============================================================
// ARTWORK DATABASE
// Each artwork has: id, title, artist, year, museum, description, image URL
// Images sourced from Wikimedia Commons (public domain)
// To add a museum partnership: just add entries with the museum name
// and add the museum to the TOURS array below.
// ============================================================

const ARTWORKS = [
  // ---- THE LOUVRE, PARIS ----
  {
    id: "mona-lisa",
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    year: "c. 1503-1519",
    museum: "Louvre, Paris",
    tour: "louvre",
    description: "Perhaps the most famous painting in the world, the Mona Lisa depicts a half-length portrait of a woman whose mysterious smile has captivated viewers for over five centuries. Leonardo used his signature sfumato technique, creating soft transitions between colors and tones that give the subject an almost living quality. The identity of the sitter is believed to be Lisa Gherardini, wife of Florentine merchant Francesco del Giocondo.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/VanGogh-starry_night_ballance1.jpg/600px-VanGogh-starry_night_ballance1.jpg"
  },
  {
    id: "winged-victory",
    title: "Winged Victory of Samothrace",
    artist: "Unknown",
    year: "c. 190 BC",
    museum: "Louvre, Paris",
    tour: "louvre",
    description: "This magnificent Hellenistic sculpture depicts Nike, the Greek goddess of victory, alighting on the prow of a warship. Standing over 8 feet tall, the figure's windswept drapery and powerful forward motion create one of the most dynamic compositions in ancient art. The sculpture was discovered in 1863 on the island of Samothrace and is considered one of the greatest masterpieces of Greek sculpture.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Victoire_de_Samothrace_-_vue_de_trois-quart_gauche%2C_gros_plan_de_la_statue_%28bg_removed%29.png/440px-Victoire_de_Samothrace_-_vue_de_trois-quart_gauche%2C_gros_plan_de_la_statue_%28bg_removed%29.png"
  },
  {
    id: "liberty-leading",
    title: "Liberty Leading the People",
    artist: "Eugene Delacroix",
    year: "1830",
    museum: "Louvre, Paris",
    tour: "louvre",
    description: "This iconic painting commemorates the July Revolution of 1830 in France. The allegorical figure of Liberty, bare-breasted and holding the French tricolor, strides over the barricades leading citizens of all social classes. Delacroix combined Romantic idealism with gritty realism—the foreground is littered with fallen fighters. The painting became a powerful symbol of republican values and inspired the design of the Statue of Liberty.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/600px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg"
  },
  {
    id: "venus-de-milo",
    title: "Venus de Milo",
    artist: "Alexandros of Antioch",
    year: "c. 130-100 BC",
    museum: "Louvre, Paris",
    tour: "louvre",
    description: "This ancient Greek statue depicts Aphrodite, the goddess of love and beauty. Carved from Parian marble, the figure stands 6 feet 8 inches tall and is renowned for its graceful, spiral composition. The missing arms have been the subject of endless speculation—she may have held an apple, a mirror, or the shield of Ares. Discovered in 1820 on the island of Milos, it has become an icon of classical beauty.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Venus_de_Milo_at_the_Louvre.jpg/390px-Venus_de_Milo_at_the_Louvre.jpg"
  },
  {
    id: "wedding-at-cana",
    title: "The Wedding at Cana",
    artist: "Paolo Veronese",
    year: "1563",
    museum: "Louvre, Paris",
    tour: "louvre",
    description: "The largest painting in the Louvre, this massive canvas (22 x 32 feet) depicts the biblical story of Jesus turning water into wine at a wedding feast. Veronese populated the scene with over 130 figures, including contemporary Venetian nobles, musicians, and even portraits of fellow artists Titian, Tintoretto, and Bassano. The painting hangs directly opposite the Mona Lisa.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Paolo_Veronese_008.jpg/600px-Paolo_Veronese_008.jpg"
  },

  // ---- MUSEE DE L'ORANGERIE, PARIS ----
  {
    id: "water-lilies-morning",
    title: "Water Lilies: Morning",
    artist: "Claude Monet",
    year: "c. 1915-1926",
    museum: "Musee de l'Orangerie, Paris",
    tour: "orangerie",
    description: "Part of Monet's monumental Water Lilies cycle, this expansive mural envelops the viewer in the artist's beloved water garden at Giverny. Monet painted these works in his specially built studio during the last years of his life, even as his eyesight was failing from cataracts. The paintings were installed in the Orangerie in 1927, shortly after his death, in two oval rooms that Monet himself helped design.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Chicago.jpg/600px-Claude_Monet_-_Water_Lilies_-_1906%2C_Chicago.jpg"
  },
  {
    id: "the-young-girls-at-piano",
    title: "Young Girls at the Piano",
    artist: "Pierre-Auguste Renoir",
    year: "1892",
    museum: "Musee de l'Orangerie, Paris",
    tour: "orangerie",
    description: "This charming Impressionist painting captures two young girls absorbed in music. Renoir's warm palette and soft brushwork create an intimate domestic scene bathed in golden light. This was the first painting by Renoir to be acquired by the French state, marking official recognition of the Impressionist movement. Multiple versions of this composition exist, demonstrating Renoir's careful refinement of the subject.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Auguste_Renoir_-_Young_Girls_at_the_Piano_-_Google_Art_Project.jpg/460px-Auguste_Renoir_-_Young_Girls_at_the_Piano_-_Google_Art_Project.jpg"
  },
  {
    id: "the-female-clown",
    title: "The Female Clown (Cha-U-Kao)",
    artist: "Henri de Toulouse-Lautrec",
    year: "1895",
    museum: "Musee de l'Orangerie, Paris",
    tour: "orangerie",
    description: "This bold portrait depicts a female clown and acrobat known as Cha-U-Kao, who performed at the Moulin Rouge and Nouveau Cirque. Toulouse-Lautrec, himself a fixture of Parisian nightlife, captured her with characteristic empathy and directness. The unusual cropped composition and vivid colors show the influence of Japanese woodblock prints on the Post-Impressionist movement.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Lautrec_the_clownesse_cha-u-kao_at_the_moulin_rouge_1895.jpg/460px-Lautrec_the_clownesse_cha-u-kao_at_the_moulin_rouge_1895.jpg"
  },
  {
    id: "paul-guillaume-novo-pilota",
    title: "Paul Guillaume, Novo Pilota",
    artist: "Amedeo Modigliani",
    year: "1915",
    museum: "Musee de l'Orangerie, Paris",
    tour: "orangerie",
    description: "This portrait of art dealer Paul Guillaume showcases Modigliani's signature style: elongated features, almond-shaped eyes, and simplified forms inspired by African sculpture. Guillaume was an early champion of modern art and African art in Paris; his personal collection of Impressionist and Post-Impressionist works would eventually form the core of the Orangerie's permanent collection.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Amedeo_Modigliani_-_Paul_Guillaume%2C_Novo_Pilota_-_Google_Art_Project.jpg/380px-Amedeo_Modigliani_-_Paul_Guillaume%2C_Novo_Pilota_-_Google_Art_Project.jpg"
  },
  {
    id: "apples-and-biscuits",
    title: "Apples and Biscuits",
    artist: "Paul Cezanne",
    year: "c. 1895",
    museum: "Musee de l'Orangerie, Paris",
    tour: "orangerie",
    description: "Cezanne's still lifes revolutionized how artists approached form and space. In this composition, he deliberately distorted perspective—the table tilts at different angles, objects seem viewed from multiple viewpoints simultaneously. These experiments with fractured space profoundly influenced Picasso and Braque and laid the groundwork for Cubism. Cezanne once declared he wanted to 'treat nature by the cylinder, the sphere, the cone.'",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Paul_C%C3%A9zanne_-_Pommes_et_biscuits.jpg/600px-Paul_C%C3%A9zanne_-_Pommes_et_biscuits.jpg"
  },

  // ---- ART GALLERY OF ONTARIO (AGO), TORONTO ----
  {
    id: "the-west-wind",
    title: "The West Wind",
    artist: "Tom Thomson",
    year: "1917",
    museum: "Art Gallery of Ontario, Toronto",
    tour: "ago",
    description: "This iconic painting shows a wind-bent pine tree on a rocky shore of a northern Ontario lake, embodying the rugged beauty of the Canadian wilderness. Painted shortly before Thomson's mysterious death by drowning in Canoe Lake, it has become one of Canada's most recognized images. Thomson's bold, expressive brushwork and vibrant palette deeply influenced the Group of Seven who carried on his artistic legacy.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Tom_Thomson_-_The_West_Wind_-_Google_Art_Project.jpg/600px-Tom_Thomson_-_The_West_Wind_-_Google_Art_Project.jpg"
  },
  {
    id: "lake-and-mountains",
    title: "Lake and Mountains",
    artist: "Lawren Harris",
    year: "1928",
    museum: "Art Gallery of Ontario, Toronto",
    tour: "ago",
    description: "Lawren Harris, a founding member of the Group of Seven, created some of Canada's most transcendent landscapes. This painting strips the northern landscape to its spiritual essence—simplified mountain forms, luminous skies, and mirror-still water create an almost mystical atmosphere. Harris was influenced by theosophy and sought to express the divine spirit he felt in the Canadian landscape.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Lawren_Harris_-_Lake_and_Mountains.jpg/600px-Lawren_Harris_-_Lake_and_Mountains.jpg"
  },
  {
    id: "scene-in-the-northwest",
    title: "Scene in the Northwest",
    artist: "Paul Kane",
    year: "c. 1845-1846",
    museum: "Art Gallery of Ontario, Toronto",
    tour: "ago",
    description: "Paul Kane spent years traveling through western Canada documenting Indigenous peoples and landscapes. This painting captures a scene from his extensive journeys, reflecting both the Romantic artistic traditions of the era and an attempt to record a way of life that Kane believed was disappearing. The AGO holds the largest collection of Kane's work, offering an important if complex window into 19th-century Canada.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Paul_Kane_-_Scene_in_the_Northwest_-_Landscape_with_Indians.jpg/600px-Paul_Kane_-_Scene_in_the_Northwest_-_Landscape_with_Indians.jpg"
  },
  {
    id: "massacre-of-innocents",
    title: "The Massacre of the Innocents",
    artist: "Peter Paul Rubens",
    year: "c. 1611-1612",
    museum: "Art Gallery of Ontario, Toronto",
    tour: "ago",
    description: "This monumental Baroque painting depicts the biblical story of King Herod's order to kill all male infants in Bethlehem. Rubens captures the scene with visceral intensity—muscular soldiers, desperate mothers, and writhing figures create a composition of controlled chaos. Purchased by the AGO in 2002 for $76.7 million, it was the most expensive Old Master painting ever sold at that time.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Massacre_of_the_Innocents_by_Rubens.jpg/500px-Massacre_of_the_Innocents_by_Rubens.jpg"
  },
  {
    id: "the-birches",
    title: "The Birches",
    artist: "Tom Thomson",
    year: "1916",
    museum: "Art Gallery of Ontario, Toronto",
    tour: "ago",
    description: "Thomson's vibrant depiction of birch trees showcases his revolutionary approach to the Canadian landscape. Using thick impasto brushwork and bold color, he transformed a simple forest scene into a symphony of autumn hues. The AGO houses the world's largest collection of Thomson's work, including many of his small oil sketches painted en plein air in Algonquin Park.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Tom_Thomson_Autumn_Birches.jpg/500px-Tom_Thomson_Autumn_Birches.jpg"
  },

  // ---- EXTRA MASTERPIECES (General / Image of the Day pool) ----
  {
    id: "starry-night",
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: "1889",
    museum: "MoMA, New York",
    tour: "masterpieces",
    description: "Painted from Van Gogh's window at the Saint-Paul-de-Mausole asylum in Saint-Remy-de-Provence, this painting transforms a quiet pre-dawn view into a cosmic vision. The swirling sky, blazing stars, and crescent moon pulse with energy, while the sleeping village below rests peacefully. Van Gogh painted it during one of his most productive periods, despite struggling with severe mental illness.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/600px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
  },
  {
    id: "girl-with-pearl-earring",
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: "c. 1665",
    museum: "Mauritshuis, The Hague",
    tour: "masterpieces",
    description: "Often called the 'Mona Lisa of the North,' this painting depicts a girl in exotic dress with an unusually large pearl earring. Vermeer's masterful use of light—the luminous skin, the moist parted lips, the gleaming pearl—creates an image of astonishing intimacy. The identity of the girl remains unknown; she may be a tronie (character study) rather than a portrait of a specific person.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/440px-1665_Girl_with_a_Pearl_Earring.jpg"
  },
  {
    id: "great-wave",
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    year: "c. 1831",
    museum: "Various collections",
    tour: "masterpieces",
    description: "This iconic woodblock print shows a towering wave threatening boats near Kanagawa, with Mount Fuji visible in the background. Part of Hokusai's series 'Thirty-six Views of Mount Fuji,' it brilliantly contrasts the power of nature against human vulnerability. The print profoundly influenced European Impressionists and remains one of the most reproduced images in art history. Hokusai was about 70 years old when he created it.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/600px-Tsunami_by_hokusai_19th_century.jpg"
  },
  {
    id: "the-persistence-of-memory",
    title: "The Persistence of Memory",
    artist: "Salvador Dali",
    year: "1931",
    museum: "MoMA, New York",
    tour: "masterpieces",
    description: "Dali's most famous painting features melting watches draped over a barren landscape, creating a dreamlike meditation on the nature of time. The soft watches, which Dali said were inspired by melting Camembert cheese, suggest that time is not as rigid as we perceive it. The hard, rocky coastline of Catalonia in the background contrasts with the soft, unstable forms, blending reality and dream.",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg"
  },
  {
    id: "cafe-terrace-at-night",
    title: "Cafe Terrace at Night",
    artist: "Vincent van Gogh",
    year: "1888",
    museum: "Kroller-Muller Museum, Netherlands",
    tour: "masterpieces",
    description: "This vibrant night scene depicts the terrace of a cafe on the Place du Forum in Arles, France. It was one of the first paintings in which Van Gogh used a starry background, anticipating The Starry Night. The warm yellows of the gaslit cafe contrast with the deep blue of the starry sky, demonstrating Van Gogh's brilliant use of complementary colors. Remarkably, he painted it on location, at night, by gaslight.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_%28Yorck%29.jpg/460px-Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_%28Yorck%29.jpg"
  },
  {
    id: "birth-of-venus",
    title: "The Birth of Venus",
    artist: "Sandro Botticelli",
    year: "c. 1485",
    museum: "Uffizi Gallery, Florence",
    tour: "masterpieces",
    description: "Botticelli's masterpiece depicts the goddess Venus emerging from the sea as a fully grown woman, blown toward shore by the winds. The painting's graceful linear style, with its flowing hair and delicate drapery, represents the height of Early Renaissance art. Commissioned by the Medici family, it was one of the first large-scale paintings of a mythological subject since antiquity.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/600px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"
  },
  {
    id: "night-watch",
    title: "The Night Watch",
    artist: "Rembrandt van Rijn",
    year: "1642",
    museum: "Rijksmuseum, Amsterdam",
    tour: "masterpieces",
    description: "Rembrandt's largest and most famous painting depicts a militia company marching out under the command of Captain Frans Banning Cocq. Revolutionary for its time, Rembrandt gave the group portrait a sense of motion and drama, using dramatic lighting to create a composition more like a history painting than a static portrait. The painting's popular name is a misnomer—it actually depicts a daytime scene darkened by layers of varnish.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/600px-The_Night_Watch_-_HD.jpg"
  },
  {
    id: "sunday-on-la-grande-jatte",
    title: "A Sunday on La Grande Jatte",
    artist: "Georges Seurat",
    year: "1886",
    museum: "Art Institute of Chicago",
    tour: "masterpieces",
    description: "Seurat spent two years creating this monumental painting using pointillism—tiny dots of pure color placed side by side to blend optically in the viewer's eye. The scene shows Parisians relaxing on an island in the Seine, rendered with an almost geometric precision that gives the figures a sculptural quality. It transformed the course of modern art and inspired the Stephen Sondheim musical 'Sunday in the Park with George.'",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/600px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg"
  },
  {
    id: "the-scream",
    title: "The Scream",
    artist: "Edvard Munch",
    year: "1893",
    museum: "National Gallery, Oslo",
    tour: "masterpieces",
    description: "Munch's most famous work shows a figure on a bridge, hands raised to its face in an anguished scream, beneath a turbulent orange sky. Munch wrote that the inspiration came while walking at sunset: 'I sensed a scream passing through nature.' The painting has become a universal symbol of modern anxiety. There are actually four versions—two paintings, a lithograph, and a pastel—created between 1893 and 1910.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/400px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg"
  },
  {
    id: "guernica",
    title: "Guernica",
    artist: "Pablo Picasso",
    year: "1937",
    museum: "Museo Reina Sofia, Madrid",
    tour: "masterpieces",
    description: "Picasso's monumental anti-war painting was created in response to the bombing of the Basque town of Guernica during the Spanish Civil War. Rendered in stark black, white, and grey, the chaotic composition of screaming figures, a dying horse, and a dismembered soldier conveys the horror of modern warfare. Picasso insisted the painting remain outside Spain until democracy was restored; it was finally moved to Madrid in 1981.",
    image: "https://upload.wikimedia.org/wikipedia/en/7/74/Guernica.jpg"
  }
];

// ============================================================
// GUIDED TOURS
// ============================================================
const TOURS = [
  {
    id: "louvre",
    name: "The Louvre",
    city: "Paris, France",
    icon: "\u{1F3DB}",
    description: "Home to the Mona Lisa and over 35,000 works spanning millennia. Explore the world's most visited museum.",
  },
  {
    id: "orangerie",
    name: "Musee de l'Orangerie",
    city: "Paris, France",
    icon: "\u{1F338}",
    description: "Monet's Water Lilies and a stunning collection of Impressionist and Post-Impressionist masterpieces in the Tuileries Garden.",
  },
  {
    id: "ago",
    name: "Art Gallery of Ontario",
    city: "Toronto, Canada",
    icon: "\u{1F341}",
    description: "One of the largest art museums in North America, home to the Group of Seven and the world's largest collection of Canadian art.",
  },
  {
    id: "masterpieces",
    name: "World Masterpieces",
    city: "Global",
    icon: "\u{1F30D}",
    description: "The greatest hits of art history — iconic works from museums around the world that every art lover should know.",
  }
];
