// Bible Data and Mock AI Responses

const bibleData = {
    "John 3:16": {
        text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
        reference: "John 3:16 (KJV)",
        book: "John",
        chapter: 3,
        verse: 16
    },
    "Psalm 23": {
        text: "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake. Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me. Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over. Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.",
        reference: "Psalm 23 (KJV)",
        book: "Psalms",
        chapter: 23,
        verse: "1-6"
    },
    "Matthew 5:1-12": {
        text: "And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him: And he opened his mouth, and taught them, saying, Blessed are the poor in spirit: for theirs is the kingdom of heaven. Blessed are they that mourn: for they shall be comforted. Blessed are the meek: for they shall inherit the earth. Blessed are they which do hunger and thirst after righteousness: for they shall be filled. Blessed are the merciful: for they shall obtain mercy. Blessed are the pure in heart: for they shall see God. Blessed are the peacemakers: for they shall be called the children of God. Blessed are they which are persecuted for righteousness' sake: for theirs is the kingdom of heaven. Blessed are ye, when men shall revile you, and persecute you, and shall say all manner of evil against you falsely, for my sake. Rejoice, and be exceeding glad: for great is your reward in heaven: for so persecuted they the prophets which were before you.",
        reference: "Matthew 5:1-12 (KJV)",
        book: "Matthew",
        chapter: 5,
        verse: "1-12"
    },
    "Romans 8:28": {
        text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
        reference: "Romans 8:28 (KJV)",
        book: "Romans",
        chapter: 8,
        verse: 28
    },
    "Philippians 4:13": {
        text: "I can do all things through Christ which strengtheneth me.",
        reference: "Philippians 4:13 (KJV)",
        book: "Philippians",
        chapter: 4,
        verse: 13
    },
    "Genesis 1:1": {
        text: "In the beginning God created the heaven and the earth.",
        reference: "Genesis 1:1 (KJV)",
        book: "Genesis",
        chapter: 1,
        verse: 1
    },
    "Proverbs 3:5-6": {
        text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
        reference: "Proverbs 3:5-6 (KJV)",
        book: "Proverbs",
        chapter: 3,
        verse: "5-6"
    },
    "1 Corinthians 13": {
        text: "Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal. And though I have the gift of prophecy, and understand all mysteries, and all knowledge; and though I have all faith, so that I could remove mountains, and have not charity, I am nothing. And though I bestow all my goods to feed the poor, and though I give my body to be burned, and have not charity, it profiteth me nothing. Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up...",
        reference: "1 Corinthians 13 (KJV)",
        book: "1 Corinthians",
        chapter: 13,
        verse: "1-13"
    }
};

const analysisTemplates = {
    "John 3:16": {
        overview: "John 3:16 is perhaps the most well-known verse in the Bible, summarizing God's plan of salvation. This verse is part of Jesus' conversation with Nicodemus, a Pharisee who came to Jesus at night seeking understanding. The verse encapsulates the entire gospel message in a single, powerful statement about God's love and the gift of eternal life through faith in Jesus Christ.",
        themes: [
            "God's unconditional love for humanity",
            "The sacrificial nature of Christ's mission",
            "Salvation through faith, not works",
            "The promise of eternal life",
            "Universal scope of God's offer of salvation"
        ],
        context: "This conversation took place in Jerusalem during Jesus' early ministry, around 30 AD. Nicodemus, a member of the Jewish ruling council, came to Jesus at night, possibly to avoid being seen by his peers. Jesus used this meeting to explain the concept of being 'born again' and God's plan for salvation. The historical context is crucial: the Jewish people were expecting a political Messiah, but Jesus was revealing a spiritual kingdom that required a transformation of the heart.",
        application: [
            "Remember that God's love is not based on our performance or worthiness",
            "Share this message of hope with others who are searching for meaning",
            "Reflect on the depth of God's love demonstrated through Christ's sacrifice",
            "Trust in faith rather than trying to earn salvation through good works",
            "Allow this truth to transform how you view yourself and others"
        ],
        references: [
            "Romans 5:8 - God's love demonstrated while we were still sinners",
            "Ephesians 2:8-9 - Salvation by grace through faith",
            "1 John 4:9-10 - God's love manifested through sending His Son",
            "John 1:12 - The right to become children of God",
            "Titus 3:4-5 - Saved by His mercy, not our righteousness"
        ]
    },
    "Psalm 23": {
        overview: "Psalm 23 is one of the most beloved passages in all of Scripture. Written by David, possibly reflecting on his experiences as a shepherd, this psalm beautifully portrays God as a caring shepherd who guides, protects, and provides for His people. It moves from the imagery of a shepherd with his sheep to that of a gracious host welcoming a guest, ultimately expressing complete trust in God's goodness and presence throughout life.",
        themes: [
            "God as our shepherd and provider",
            "Divine guidance and protection",
            "Peace and restoration for the soul",
            "Courage in facing difficulties",
            "God's presence in all circumstances"
        ],
        context: "David likely wrote this psalm drawing from his personal experience as a shepherd in the hills of Judea. As a young man, he protected his father's sheep from lions and bears, giving him intimate knowledge of a shepherd's care for his flock. Later, as king, David experienced both triumph and tragedy, yet he maintained this understanding of God as his shepherd. The psalm would have been used in Temple worship and provided comfort to God's people throughout generations.",
        application: [
            "Trust God to meet your daily needs and guide your decisions",
            "Find peace in knowing God restores and refreshes your soul",
            "Face fears and challenges with confidence in God's presence",
            "Recognize God's goodness and blessing even in difficult times",
            "Cultivate an awareness of God's companionship in everyday life"
        ],
        references: [
            "John 10:11-14 - Jesus as the Good Shepherd",
            "Isaiah 40:11 - The Lord tends His flock like a shepherd",
            "Ezekiel 34:11-16 - God promises to shepherd His people",
            "Matthew 6:25-34 - Do not worry; God provides",
            "Hebrews 13:5-6 - God will never leave or forsake you"
        ]
    },
    "Romans 8:28": {
        overview: "This verse offers one of Scripture's most comforting promises: that God works all things together for the good of those who love Him. It doesn't promise that all things are good, but that God can work through all circumstances—even painful ones—to accomplish His purposes. This verse is part of Paul's larger discussion about the security believers have in Christ and the hope of future glory.",
        themes: [
            "God's sovereignty over all circumstances",
            "Divine purpose in life's events",
            "The security of those called by God",
            "Hope in difficult circumstances",
            "God's ability to bring good from evil"
        ],
        context: "Paul wrote Romans around 57 AD while in Corinth, addressing the church in Rome which he had not yet visited. This chapter discusses the Spirit's role in believers' lives and addresses suffering. The early Christians faced persecution, confusion about their identity as Jews and Gentiles united in Christ, and questions about God's faithfulness. Paul reassures them that nothing can separate them from God's love and that God is actively working for their ultimate good.",
        application: [
            "Trust God's purposes even when circumstances don't make sense",
            "Look for ways God might be working through current challenges",
            "Remember that 'good' is defined by God's eternal purposes, not temporary comfort",
            "Draw comfort from being 'called according to His purpose'",
            "Encourage others who are struggling with this promise of hope"
        ],
        references: [
            "Jeremiah 29:11 - God's plans for hope and a future",
            "Genesis 50:20 - What was meant for evil, God used for good",
            "Philippians 1:6 - God will complete the good work He started",
            "James 1:2-4 - Trials develop perseverance and maturity",
            "2 Corinthians 4:17-18 - Temporary troubles achieve eternal glory"
        ]
    },
    "default": {
        overview: "This passage offers profound spiritual insight and practical wisdom for daily living. It reveals important truths about God's character, His relationship with humanity, and how we should respond to His word. Each phrase carries significant meaning that rewards careful study and meditation.",
        themes: [
            "God's faithfulness and character",
            "Spiritual growth and transformation",
            "Practical wisdom for daily living",
            "The importance of obedience to God's word",
            "Hope and encouragement for believers"
        ],
        context: "This scripture was written in a specific historical and cultural context that helps us understand its original meaning and application. The author wrote to address particular situations and challenges faced by the original audience, but the timeless truths contained in the passage continue to speak to us today. Understanding the background helps us apply the passage more accurately to our own lives.",
        application: [
            "Meditate on this passage regularly to internalize its truths",
            "Look for opportunities to apply these principles in daily situations",
            "Share these insights with others who might benefit from them",
            "Allow this scripture to shape your thinking and decision-making",
            "Pray for God's help in living out what you've learned"
        ],
        references: [
            "2 Timothy 3:16-17 - All Scripture is God-breathed and useful",
            "Psalm 119:105 - God's word is a lamp to guide our path",
            "James 1:22 - Be doers of the word, not hearers only",
            "Hebrews 4:12 - The word of God is living and active",
            "Joshua 1:8 - Meditate on God's word day and night"
        ]
    }
};

// Sample Bible chapters for the reader
const sampleChapters = {
    "John": {
        1: [
            "In the beginning was the Word, and the Word was with God, and the Word was God.",
            "The same was in the beginning with God.",
            "All things were made by him; and without him was not any thing made that was made.",
            "In him was life; and the life was the light of men.",
            "And the light shineth in darkness; and the darkness comprehended it not.",
            "There was a man sent from God, whose name was John.",
            "The same came for a witness, to bear witness of the Light, that all men through him might believe.",
            "He was not that Light, but was sent to bear witness of that Light.",
            "That was the true Light, which lighteth every man that cometh into the world.",
            "He was in the world, and the world was made by him, and the world knew him not."
        ]
    },
    "Genesis": {
        1: [
            "In the beginning God created the heaven and the earth.",
            "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
            "And God said, Let there be light: and there was light.",
            "And God saw the light, that it was good: and God divided the light from the darkness.",
            "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day."
        ]
    },
    "Psalms": {
        1: [
            "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful.",
            "But his delight is in the law of the LORD; and in his law doth he meditate day and night.",
            "And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper.",
            "The ungodly are not so: but are like the chaff which the wind driveth away.",
            "Therefore the ungodly shall not stand in the judgment, nor sinners in the congregation of the righteous.",
            "For the LORD knoweth the way of the righteous: but the way of the ungodly shall perish."
        ]
    },
    "Matthew": {
        1: [
            "The book of the generation of Jesus Christ, the son of David, the son of Abraham.",
            "Abraham begat Isaac; and Isaac begat Jacob; and Jacob begat Judas and his brethren;",
            "And Judas begat Phares and Zara of Thamar; and Phares begat Esrom; and Esrom begat Aram;"
        ]
    },
    "Romans": {
        1: [
            "Paul, a servant of Jesus Christ, called to be an apostle, separated unto the gospel of God,",
            "Which he had promised afore by his prophets in the holy scriptures,",
            "Concerning his Son Jesus Christ our Lord, which was made of the seed of David according to the flesh;",
            "And declared to be the Son of God with power, according to the spirit of holiness, by the resurrection from the dead:"
        ]
    },
    "Proverbs": {
        1: [
            "The proverbs of Solomon the son of David, king of Israel;",
            "To know wisdom and instruction; to perceive the words of understanding;",
            "To receive the instruction of wisdom, justice, and judgment, and equity;",
            "To give subtilty to the simple, to the young man knowledge and discretion."
        ]
    },
    "Exodus": {
        1: [
            "Now these are the names of the children of Israel, which came into Egypt; every man and his household came with Jacob.",
            "Reuben, Simeon, Levi, and Judah,",
            "Issachar, Zebulun, and Benjamin,"
        ]
    },
    "Revelation": {
        1: [
            "The Revelation of Jesus Christ, which God gave unto him, to shew unto his servants things which must shortly come to pass; and he sent and signified it by his angel unto his servant John:",
            "Who bare record of the word of God, and of the testimony of Jesus Christ, and of all things that he saw.",
            "Blessed is he that readeth, and they that hear the words of this prophecy, and keep those things which are written therein: for the time is at hand."
        ]
    }
};

function getAnalysis(reference) {
    return analysisTemplates[reference] || analysisTemplates.default;
}

function getScripture(reference) {
    return bibleData[reference] || null;
}

function getChapter(book, chapter) {
    return sampleChapters[book] && sampleChapters[book][chapter] 
        ? sampleChapters[book][chapter] 
        : [];
}
