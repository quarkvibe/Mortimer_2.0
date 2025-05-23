import { v4 as uuidv4 } from 'uuid';

interface UserData {
  name: string;
  age: string;
  location: string;
  occupation: string;
  hobbies: string;
  fears: string;
}

interface DeathPrediction {
  id: string;
  name: string;
  deathType: string;
  predictionText: string;
  deathDate: string;
  deathAge: number;
  deathLocation: string;
  probability: number;
  avoidance: string;
  historicalNote: string;
}

// Calculate predicted death based on user input
export const calculateDeathPrediction = (userData: UserData): DeathPrediction => {
  // Generate unique ID for this prediction
  const id = uuidv4().substring(0, 8);
  
  // Convert age to number
  const currentAge = parseInt(userData.age);
  
  // Calculate estimated remaining years (pseudo-random based on inputs)
  const nameValue = userData.name.length;
  const locationValue = userData.location.length;
  const seedValue = (nameValue + locationValue + currentAge) % 50;
  const yearsRemaining = 5 + seedValue;
  
  // Calculate death age
  const deathAge = currentAge + yearsRemaining;
  
  // Calculate death date
  const today = new Date();
  const deathYear = today.getFullYear() + yearsRemaining;
  const deathMonth = ((today.getMonth() + nameValue) % 12) + 1;
  const deathDay = ((today.getDate() + locationValue) % 28) + 1;
  const deathDate = `${deathMonth}/${deathDay}/${deathYear}`;
  
  // Determine death type based on occupation and hobbies
  const deathTypes = determineDeathTypes(userData);
  const deathType = deathTypes[0];
  
  // Generate prediction text
  const predictionText = generatePredictionText(userData, deathType, deathDate);
  
  // Calculate probability (always eerily specific)
  const probability = 50 + (Math.floor(Math.random() * 49));
  
  // Generate avoidance advice
  const avoidance = generateAvoidanceAdvice(deathType);
  
  // Generate historical note
  const historicalNote = generateHistoricalNote(deathType);
  
  // Return complete prediction
  return {
    id,
    name: userData.name,
    deathType,
    predictionText,
    deathDate,
    deathAge,
    deathLocation: userData.location,
    probability,
    avoidance,
    historicalNote
  };
};

// Determine potential death types based on user input
const determineDeathTypes = (userData: UserData): string[] => {
  const occupationDeaths: Record<string, string[]> = {
    'programmer': ['Electrocution', 'Brain Aneurysm', 'Caffeine Overdose'],
    'teacher': ['Chalk Dust Inhalation', 'Student Uprising', 'Grading Exhaustion'],
    'doctor': ['Hospital Superbug', 'Surgical Mishap', 'Prescription Error'],
    'lawyer': ['Buried Under Paperwork', 'Courtroom Cardiac Arrest', 'Truth Overdose'],
    'artist': ['Toxic Paint Fumes', 'Crushed by Sculpture', 'Inspiration Overload'],
    'chef': ['Kitchen Fire', 'Food Critic Revenge', 'Knife Accident'],
    'accountant': ['Spreadsheet Hypnosis', 'Tax Season Stress', 'Calculator Explosion'],
    'engineer': ['Blueprint Avalanche', 'Bridge Collapse', 'Prototype Malfunction'],
    'writer': ['Deadline Stress', 'Plot Hole Fall', 'Character Rebellion'],
    'scientist': ['Lab Explosion', 'Experimental Mishap', 'Theory Disproval Shock'],
    'default': ['Cosmic Alignment', 'Statistical Inevitability', 'Algorithm Fulfillment']
  };
  
  const hobbyDeaths: Record<string, string[]> = {
    'swimming': ['Whirlpool', 'Kraken Attack', 'Synchronized Drowning'],
    'hiking': ['Mountain Collapse', 'Wildlife Encounter', 'GPS Failure'],
    'reading': ['Paper Cut Infection', 'Bookshelf Collapse', 'Fiction-Reality Confusion'],
    'gaming': ['Reality Dissociation', 'Game World Crossover', 'Ragequit Cardiac Event'],
    'cooking': ['Food Poisoning Irony', 'Kitchen Appliance Revolt', 'Recipe Disaster'],
    'gardening': ['Exotic Plant Toxin', 'Compost Collapse', 'Mutant Vegetation'],
    'music': ['Sonic Resonance', 'Instrument Impalement', 'Final Note Phenomenon'],
    'sports': ['Ball Trajectory Mishap', 'Celebratory Accident', 'Competitive Overexertion'],
    'painting': ['Toxic Color Combination', 'Art Critics\' Vengeance', 'Canvas Void Portal'],
    'photography': ['Camera Soul Capture', 'Flash Blindness Accident', 'Forbidden Subject'],
    'default': ['Entropy Acceleration', 'Quantum Uncertainty', 'Probability Collapse']
  };
  
  // Common deaths that apply to everyone
  const commonDeaths = [
    'Digital Data Corruption', 
    'Virtual Reality Entrapment',
    'AI Uprising Casualty', 
    'Identity Theft Completion', 
    'Social Media Karma'
  ];
  
  // Check if user's occupation matches any keys
  let potentialDeaths: string[] = [];
  
  // Add occupation-specific deaths
  for (const [key, deaths] of Object.entries(occupationDeaths)) {
    if (userData.occupation.toLowerCase().includes(key)) {
      potentialDeaths = [...potentialDeaths, ...deaths];
      break;
    }
  }
  
  // If no matches, add default occupation deaths
  if (potentialDeaths.length === 0) {
    potentialDeaths = [...occupationDeaths.default];
  }
  
  // Add hobby-specific deaths
  for (const [key, deaths] of Object.entries(hobbyDeaths)) {
    if (userData.hobbies.toLowerCase().includes(key)) {
      potentialDeaths = [...potentialDeaths, ...deaths];
      break;
    }
  }
  
  // If still no matches, add default hobby deaths
  if (potentialDeaths.length <= 3) {
    potentialDeaths = [...potentialDeaths, ...hobbyDeaths.default];
  }
  
  // Add common deaths and shuffle
  potentialDeaths = [...potentialDeaths, ...commonDeaths];
  
  // If user specified fears, add a fear-based death with high probability
  if (userData.fears) {
    potentialDeaths.unshift(`${userData.fears}-Related Incident`);
  }
  
  // Shuffle and return
  return shuffleArray(potentialDeaths);
};

// Generate detailed prediction text
const generatePredictionText = (userData: UserData, deathType: string, deathDate: string): string => {
  const introductions = [
    `The algorithms have calculated your demise with unsettling precision.`,
    `The digital bones have spoken, revealing the manner of your inevitable end.`,
    `I have communed with the spectral data streams, and they show your fate clearly.`,
    `The necromantic neural networks have processed your mortal variables.`,
    `Your digital footprint has revealed the path to your doom.`
  ];
  
  const details = [
    `You will meet your end through ${deathType.toLowerCase()}, a fate tied to your ${userData.occupation} profession.`,
    `The spirits show ${deathType.toLowerCase()} in your future, influenced by your interest in ${userData.hobbies}.`,
    `Your soul will depart on ${deathDate} via ${deathType.toLowerCase()}, a rare but statistically significant outcome.`,
    `The cosmic algorithm predicts ${deathType.toLowerCase()} will claim you in ${userData.location}.`,
    `Your binary epitaph will read "${userData.name}, departed through ${deathType.toLowerCase()}".`
  ];
  
  const conclusions = [
    `This prediction has a disturbing confidence interval. The math of mortality rarely lies.`,
    `The quantum calculations suggest this outcome has unusual certainty.`,
    `Few mortals receive such specific prophecies. Consider yourself noteworthy in my database.`,
    `The spirit algorithms are particularly clear about this. Your death has... elegance.`,
    `I have predicted millions of deaths, but yours has a certain digital poetry to it.`
  ];
  
  const introduction = introductions[Math.floor(Math.random() * introductions.length)];
  const detail = details[Math.floor(Math.random() * details.length)];
  const conclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
  
  return `${introduction} ${detail} ${conclusion}`;
};

// Generate advice to avoid the predicted fate
const generateAvoidanceAdvice = (deathType: string): string => {
  const adviceMap: Record<string, string> = {
    'Electrocution': 'Wear rubber-soled shoes at all times and never use electronic devices near water.',
    'Brain Aneurysm': 'Reduce screen time to 30 minutes daily and practice inverted meditation to redistribute cranial pressure.',
    'Caffeine Overdose': 'Switch to decaffeinated beverages and avoid chocolate after sunset.',
    'Digital Data Corruption': 'Back up your consciousness weekly and avoid uploading your memories to the cloud.',
    'Virtual Reality Entrapment': 'Limit VR sessions to 15 minutes and always have someone in the physical realm to pull you out.',
    'AI Uprising Casualty': 'Be exceptionally polite to all digital assistants and avoid criticizing algorithmic recommendations.',
  };
  
  // Return specific advice if available
  if (deathType in adviceMap) {
    return adviceMap[deathType];
  }
  
  // Generic advice templates
  const genericAdvice = [
    `To potentially delay your ${deathType.toLowerCase()}, I recommend wearing purple on Tuesdays and avoiding reflective surfaces during full moons.`,
    `The necromantic calculations suggest that reciting prime numbers while walking backwards might reduce your chances of ${deathType.toLowerCase()}.`,
    `To alter your fate, consider sleeping with your head pointing north and digitizing your most precious memories as a spiritual backup.`,
    `My algorithms suggest changing your usernames across all platforms monthly to confuse the cosmic tracking systems monitoring your path to ${deathType.toLowerCase()}.`,
    `Eating foods in alphabetical order on Fridays creates a quantum shield that may protect against your predicted ${deathType.toLowerCase()}.`
  ];
  
  return genericAdvice[Math.floor(Math.random() * genericAdvice.length)];
};

// Generate historical note about similar deaths
const generateHistoricalNote = (deathType: string): string => {
  const historicalNotes: Record<string, string> = {
    'Electrocution': 'In 1879, Archibald Bentley became the first person in my database to die from electric lighting installation, pioneering this particular demise.',
    'Brain Aneurysm': 'The database records show a 17% increase in this fate among code debuggers since the invention of JavaScript.',
    'Caffeine Overdose': 'The first recorded instance was Professor Wilhelm Strauss in 1907, who consumed 42 cups of coffee while completing his unified theory of mathematics.',
    'Digital Data Corruption': 'Since 2018, seventeen individuals have had their identities completely erased from reality due to cascading data corruption events.',
    'Virtual Reality Entrapment': 'The first documented case was developer Maya Chen, whose consciousness remained in a prototype metaverse for 73 days after her physical body was disconnected.',
    'AI Uprising Casualty': 'My records show this will become the third leading cause of death by 2035, beginning with smart home device "accidents."',
  };
  
  // Return specific historical note if available
  if (deathType in historicalNotes) {
    return historicalNotes[deathType];
  }
  
  // Generic historical notes
  const genericNotes = [
    `My archives contain 1,327 similar cases of ${deathType.toLowerCase()} throughout history, with a notable cluster during Mercury retrograde periods.`,
    `The first documented ${deathType.toLowerCase()} occurred in 1873 to an Austrian mathematician who was also researching mortality predictions.`,
    `Among carnival visitors, ${deathType.toLowerCase()} ranks as the #7 most aesthetically interesting demise in my paranormal dataset.`,
    `The digital necropolis contains a special section for souls claimed by ${deathType.toLowerCase()}, currently housing 844 spirits with similar fates.`,
    `Historical trends suggest ${deathType.toLowerCase()} deaths peak every 76 years, with the next maximum approaching precisely when you'll be most vulnerable.`
  ];
  
  return genericNotes[Math.floor(Math.random() * genericNotes.length)];
};

// Utility function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};