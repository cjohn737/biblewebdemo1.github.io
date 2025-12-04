export const bibleVersions = [
  { id: "kjv", name: "King James Version (KJV)" },
  { id: "niv", name: "New International Version (NIV)" },
  { id: "esv", name: "English Standard Version (ESV)" },
  { id: "nkjv", name: "New King James Version (NKJV)" },
  { id: "nlt", name: "New Living Translation (NLT)" },
];

export const oldTestamentBooks = [
  { id: "genesis", name: "Genesis", chapters: 50 },
  { id: "exodus", name: "Exodus", chapters: 40 },
  { id: "leviticus", name: "Leviticus", chapters: 27 },
  { id: "numbers", name: "Numbers", chapters: 36 },
  { id: "deuteronomy", name: "Deuteronomy", chapters: 34 },
  { id: "joshua", name: "Joshua", chapters: 24 },
  { id: "judges", name: "Judges", chapters: 21 },
  { id: "ruth", name: "Ruth", chapters: 4 },
  { id: "1samuel", name: "1 Samuel", chapters: 31 },
  { id: "2samuel", name: "2 Samuel", chapters: 24 },
  { id: "1kings", name: "1 Kings", chapters: 22 },
  { id: "2kings", name: "2 Kings", chapters: 25 },
  { id: "psalms", name: "Psalms", chapters: 150 },
  { id: "proverbs", name: "Proverbs", chapters: 31 },
  { id: "isaiah", name: "Isaiah", chapters: 66 },
  { id: "jeremiah", name: "Jeremiah", chapters: 52 },
];

export const newTestamentBooks = [
  { id: "matthew", name: "Matthew", chapters: 28 },
  { id: "mark", name: "Mark", chapters: 16 },
  { id: "luke", name: "Luke", chapters: 24 },
  { id: "john", name: "John", chapters: 21 },
  { id: "acts", name: "Acts", chapters: 28 },
  { id: "romans", name: "Romans", chapters: 16 },
  { id: "1corinthians", name: "1 Corinthians", chapters: 16 },
  { id: "2corinthians", name: "2 Corinthians", chapters: 13 },
  { id: "galatians", name: "Galatians", chapters: 6 },
  { id: "ephesians", name: "Ephesians", chapters: 6 },
  { id: "philippians", name: "Philippians", chapters: 4 },
  { id: "colossians", name: "Colossians", chapters: 4 },
  { id: "1thessalonians", name: "1 Thessalonians", chapters: 5 },
  { id: "2thessalonians", name: "2 Thessalonians", chapters: 3 },
  { id: "1timothy", name: "1 Timothy", chapters: 6 },
  { id: "2timothy", name: "2 Timothy", chapters: 4 },
  { id: "hebrews", name: "Hebrews", chapters: 13 },
  { id: "james", name: "James", chapters: 5 },
  { id: "1peter", name: "1 Peter", chapters: 5 },
  { id: "2peter", name: "2 Peter", chapters: 3 },
  { id: "1john", name: "1 John", chapters: 5 },
  { id: "revelation", name: "Revelation", chapters: 22 },
];

// Sample verse data - in a real app, this would come from an API
export const sampleVerses: Record<string, Record<number, Record<number, string>>> = {
  john: {
    3: {
      16: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      17: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved.",
      18: "He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.",
      19: "And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil.",
      20: "For every one that doeth evil hateth the light, neither cometh to the light, lest his deeds should be reproved.",
    },
  },
  genesis: {
    1: {
      1: "In the beginning God created the heaven and the earth.",
      2: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
      3: "And God said, Let there be light: and there was light.",
      4: "And God saw the light, that it was good: and God divided the light from the darkness.",
      5: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",
    },
  },
  psalms: {
    23: {
      1: "The LORD is my shepherd; I shall not want.",
      2: "He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
      3: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
      4: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
      5: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.",
      6: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.",
    },
  },
};

export function getVerseText(book: string, chapter: number, verse: number): string {
  return sampleVerses[book]?.[chapter]?.[verse] || `Verse ${verse} text would appear here.`;
}

export function getChapterVerses(book: string, chapter: number): Record<number, string> {
  // Return sample verses or generate placeholder verses
  if (sampleVerses[book]?.[chapter]) {
    return sampleVerses[book][chapter];
  }
  
  // Generate placeholder verses (typical chapters have 20-30 verses)
  const verseCount = Math.floor(Math.random() * 15) + 15;
  const verses: Record<number, string> = {};
  for (let i = 1; i <= verseCount; i++) {
    verses[i] = `This is verse ${i} of ${book} chapter ${chapter}. In a full implementation, this would contain the actual biblical text from the selected version.`;
  }
  return verses;
}