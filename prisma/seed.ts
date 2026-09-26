import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding for Kodvex Education Platform (Client: UES Abroad)...");

  // 1. Seed SiteSettings
  console.log("⚙️ Seeding SiteSettings...");
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      agencyName: "UES Abroad",
      whatsappNumber: "919876543210",
      phone: "+91 98765 43210",
      supportEmail: "support@uesabroad.com",
      address: "123 Education Hub, MG Road, Bangalore, Karnataka, India - 560001",
      consultationBookingUrl: "/contact",
      announcementBannerText: "🎉 Fall 2026 Admissions Open! Book your free 1-on-1 counseling session today.",
      announcementBannerActive: true,
    },
  });

  // 2. Seed Countries (9 Destinations)
  console.log("🌍 Seeding Study Destinations...");
  const countriesData = [
    {
      name: "United States",
      slug: "usa",
      overview:
        "Home to over 4,000 universities and the world's leading technology giants. Studying in the USA offers unparalleled academic flexibility, cutting-edge research opportunities, and global career mobility.",
      whyStudyHere:
        "1. OPT & STEM OPT extensions allow up to 3 years of post-study work authorization.\n2. Flexible degree structures allowing double majors and minors.\n3. Massive funding and research assistantship opportunities.",
      avgTuitionYearly: 35000,
      avgLivingYearly: 15000,
      postStudyVisaYears: 3,
      currencySymbol: "$",
      heroImageUrl: "https://images.unsplash.com/photo-1501594907352-06c4fb91b0eb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "United Kingdom",
      slug: "uk",
      overview:
        "The UK boasts an academic heritage of over 800 years. With intensive 1-year Master's programs and a 2-year Graduate Route visa, the UK is one of the most time- and cost-effective study destinations globally.",
      whyStudyHere:
        "1. 1-year Master's programs save a full year of tuition and living expenses.\n2. 2-year post-study Graduate Route work visa.\n3. Free healthcare access via the NHS Immigration Health Surcharge.",
      avgTuitionYearly: 22000,
      avgLivingYearly: 13000,
      postStudyVisaYears: 2,
      currencySymbol: "£",
      heroImageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Germany",
      slug: "germany",
      overview:
        "Germany is the industrial powerhouse of Europe. Renowned for engineering, automotive, and IT innovation, most public universities charge zero or negligible tuition fees for both domestic and international students.",
      whyStudyHere:
        "1. Zero tuition fees at most public universities (only small semester contributions).\n2. 18-month post-study job seeker visa.\n3. Strong economy with high demand for engineers, IT specialists, and healthcare professionals.",
      avgTuitionYearly: 1500,
      avgLivingYearly: 11000,
      postStudyVisaYears: 2,
      currencySymbol: "€",
      heroImageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Canada",
      slug: "canada",
      overview:
        "Consistently ranked as one of the safest and most welcoming countries in the world. Canada offers world-class education combined with clear post-graduation work permit (PGWP) pathways leading to Permanent Residency (PR).",
      whyStudyHere:
        "1. Up to 3-year Post-Graduation Work Permit (PGWP).\n2. Clear pathways to Canadian Permanent Residency (Express Entry / PNP).\n3. High quality of life and multicultural society.",
      avgTuitionYearly: 25000,
      avgLivingYearly: 12000,
      postStudyVisaYears: 3,
      currencySymbol: "CAD $",
      heroImageUrl: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Australia",
      slug: "australia",
      overview:
        "Australia features 7 of the top 100 universities globally. Known for its laid-back lifestyle, excellent weather, and high hourly student wage rates, it is a premier destination for international education.",
      whyStudyHere:
        "1. 2 to 4 years of Temporary Graduate Visa (Subclass 485).\n2. High part-time student earnings and strong labor market.\n3. Global recognition across STEM, business, and healthcare degrees.",
      avgTuitionYearly: 30000,
      avgLivingYearly: 18000,
      postStudyVisaYears: 3,
      currencySymbol: "AUD $",
      heroImageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Ireland",
      slug: "ireland",
      overview:
        "Known as the 'Silicon Valley of Europe', Ireland hosts the European headquarters of Google, Apple, Meta, Pfizer, and Intel. It offers a thriving job market for tech and pharmaceutical graduates.",
      whyStudyHere:
        "1. 2-year Third Level Graduate Scheme work visa for Master's graduates.\n2. European tech and pharmaceutical hub with abundant job opportunities.\n3. English-speaking nation within the European Union.",
      avgTuitionYearly: 18000,
      avgLivingYearly: 12000,
      postStudyVisaYears: 2,
      currencySymbol: "€",
      heroImageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "France",
      slug: "france",
      overview:
        "France is home to top-ranked business schools (INSEAD, HEC Paris) and engineering Grandes Écoles. The government heavily subsidizes student meals, transport, and accommodation (CAF housing subsidy).",
      whyStudyHere:
        "1. Access to CAF housing subsidy covering up to 40% of rent.\n2. 2-year post-study visa for Master's graduates (including Indian students under special agreements).\n3. World leader in luxury management, business, and aerospace engineering.",
      avgTuitionYearly: 12000,
      avgLivingYearly: 10000,
      postStudyVisaYears: 2,
      currencySymbol: "€",
      heroImageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "New Zealand",
      slug: "new-zealand",
      overview:
        "Offering a pristine environment and a world-class British-based education system. All 8 of New Zealand's universities rank within the top 3% globally, emphasizing research and innovation.",
      whyStudyHere:
        "1. Up to 3-year post-study work visa.\n2. Unmatched natural beauty and safe outdoor lifestyle.\n3. Personalized education with high teacher-to-student ratios.",
      avgTuitionYearly: 26000,
      avgLivingYearly: 14000,
      postStudyVisaYears: 3,
      currencySymbol: "NZD $",
      heroImageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Singapore",
      slug: "singapore",
      overview:
        "The financial and technological capital of Asia. NUS and NTU consistently rank among the top 15 universities in the world. Singapore offers unparalleled safety, cleanliness, and connectivity.",
      whyStudyHere:
        "1. World-class universities (NUS #8, NTU #15 globally).\n2. Gateway to Asian and global financial markets.\n3. Extremely safe, multicultural, and English-speaking environment.",
      avgTuitionYearly: 28000,
      avgLivingYearly: 15000,
      postStudyVisaYears: 1,
      currencySymbol: "SGD $",
      heroImageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const countryMap: Record<string, string> = {};

  for (const c of countriesData) {
    const country = await prisma.country.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
    countryMap[c.slug] = country.id;
  }

  // 3. Seed Universities (20+ Universities across destinations)
  console.log("🏛️ Seeding Universities & Courses...");
  const universitiesData = [
    // Germany
    {
      countrySlug: "germany",
      name: "Technical University of Munich (TUM)",
      slug: "technical-university-of-munich",
      locationCity: "Munich",
      globalRanking: 37,
      overview: "One of Europe's top universities for engineering, computer science, and natural sciences. Known as the Entrepreneurial University.",
      admissionReqs: "Bachelor's degree with 75%+ or 2.5 German GPA equivalent. IELTS 6.5+ or TOEFL 88+. GRE required for select MS programs.",
      scholarshipInfo: "Merit-based Deutschlandstipendium (€300/month) and DAAD scholarship eligibility.",
      approxTuitionYearly: 0,
      approxLivingYearly: 12000,
      isPartner: true,
      logoUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80",
      courses: [
        { title: "M.Sc. in Computer Science & Informatics", slug: "tum-msc-computer-science", degreeLevel: "MASTER", durationMonths: 24, tuitionFee: 0, intakeMonths: ["October", "April"], overview: "Advanced study in AI, software engineering, and distributed systems." },
        { title: "M.Sc. in Data Engineering & Analytics", slug: "tum-msc-data-analytics", degreeLevel: "MASTER", durationMonths: 24, tuitionFee: 0, intakeMonths: ["October"], overview: "Big data processing, machine learning, and scalable algorithms." },
        { title: "B.Sc. in Management and Technology", slug: "tum-bsc-management-tech", degreeLevel: "BACHELOR", durationMonths: 36, tuitionFee: 0, intakeMonths: ["October"], overview: "Unique blend of business administration and engineering disciplines." },
      ],
    },
    {
      countrySlug: "germany",
      name: "RWTH Aachen University",
      slug: "rwth-aachen-university",
      locationCity: "Aachen",
      globalRanking: 99,
      overview: "The largest technical university in Germany, globally celebrated for mechanical engineering, automotive engineering, and metallurgy.",
      admissionReqs: "Relevant Bachelor's degree with strong quantitative background. IELTS 6.5 or TOEFL 90. GRE General Test required.",
      scholarshipInfo: "DAAD scholarships, RWTH Education Fund, and research assistant positions.",
      approxTuitionYearly: 0,
      approxLivingYearly: 10500,
      isPartner: true,
      logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80",
      courses: [
        { title: "M.Sc. in Automotive Engineering", slug: "rwth-msc-automotive", degreeLevel: "MASTER", durationMonths: 24, tuitionFee: 0, intakeMonths: ["October"], overview: "Vehicle dynamics, electric drives, and autonomous driving tech." },
        { title: "M.Sc. in Software Systems Engineering", slug: "rwth-msc-software-systems", degreeLevel: "MASTER", durationMonths: 24, tuitionFee: 0, intakeMonths: ["October"], overview: "Complex software architectures, formal verification, and cloud systems." },
      ],
    },
    // USA
    {
      countrySlug: "usa",
      name: "Massachusetts Institute of Technology (MIT)",
      slug: "mit",
      locationCity: "Cambridge, MA",
      globalRanking: 1,
      overview: "The world's premier institution for science, engineering, and technology innovation. Located in the heart of Cambridge tech corridor.",
      admissionReqs: "Exceptional academic record, GRE/GMAT scores, 3 letters of recommendation, and demonstrated research/innovation impact.",
      scholarshipInfo: "Need-blind admissions for undergraduates; generous research and teaching assistantships for graduate students.",
      approxTuitionYearly: 59000,
      approxLivingYearly: 18000,
      isPartner: false,
      logoUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80",
      courses: [
        { title: "M.S. in Electrical Engineering & Computer Science", slug: "mit-ms-eecs", degreeLevel: "MASTER", durationMonths: 24, tuitionFee: 59000, intakeMonths: ["September"], overview: "World-leading research in AI, robotics, quantum computing, and systems." },
        { title: "Master of Finance (MFin)", slug: "mit-master-of-finance", degreeLevel: "MASTER", durationMonths: 18, tuitionFee: 85000, intakeMonths: ["July"], overview: "Quantitative finance, capital markets, and financial engineering." },
      ],
    },
    {
      countrySlug: "usa",
      name: "Arizona State University (ASU)",
      slug: "arizona-state-university",
      locationCity: "Tempe, AZ",
      globalRanking: 179,
      overview: "Ranked #1 for Innovation in the U.S. for 9 consecutive years. Huge international student community and excellent corporate tie-ups.",
      admissionReqs: "Undergraduate GPA 3.0/4.0. IELTS 6.5 or TOEFL 80 or Duolingo 115. GRE waived for select engineering programs.",
      scholarshipInfo: "New American University (NAMU) Scholarship up to $10,000/year for qualified international students.",
      approxTuitionYearly: 32000,
      approxLivingYearly: 14000,
      isPartner: true,
      logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=400&q=80",
      courses: [
        { title: "M.S. in Computer Science", slug: "asu-ms-computer-science", degreeLevel: "MASTER", durationMonths: 24, tuitionFee: 32000, intakeMonths: ["August", "January"], overview: "Cybersecurity, AI, database systems, and software engineering." },
        { title: "M.S. in Business Analytics", slug: "asu-ms-business-analytics", degreeLevel: "MASTER", durationMonths: 16, tuitionFee: 38000, intakeMonths: ["August"], overview: "Data mining, predictive modeling, and strategic business decision-making." },
        { title: "B.S. in Engineering Management", slug: "asu-bs-eng-mgmt", degreeLevel: "BACHELOR", durationMonths: 48, tuitionFee: 31000, intakeMonths: ["August", "January"], overview: "Combining technical engineering skills with leadership and project management." },
      ],
    },
    // UK
    {
      countrySlug: "uk",
      name: "Imperial College London",
      slug: "imperial-college-london",
      locationCity: "London",
      globalRanking: 2,
      overview: "Ranked #2 in the world (QS 2025). Dedicated exclusively to science, engineering, medicine, and business in central London.",
      admissionReqs: "First Class Honours degree (80%+ from Tier 1 Indian universities). IELTS 7.0 (no band below 6.5).",
      scholarshipInfo: "Imperial College India Foundation Scholarships, Chevening Scholarships, and Dean's Excellence Awards.",
      approxTuitionYearly: 38000,
      approxLivingYearly: 16000,
      isPartner: false,
      logoUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=400&q=80",
      courses: [
        { title: "M.Sc. in Artificial Intelligence", slug: "imperial-msc-ai", degreeLevel: "MASTER", durationMonths: 12, tuitionFee: 39000, intakeMonths: ["September"], overview: "Intensive 1-year program in deep learning, NLP, and computer vision." },
        { title: "Full-Time MBA", slug: "imperial-full-time-mba", degreeLevel: "MBA", durationMonths: 12, tuitionFee: 61000, intakeMonths: ["September"], overview: "Innovation-focused MBA leveraging Imperial's technological ecosystem." },
      ],
    },
    {
      countrySlug: "uk",
      name: "University of Manchester",
      slug: "university-of-manchester",
      locationCity: "Manchester",
      globalRanking: 34,
      overview: "A prestigious Russell Group university with 25 Nobel laureates among its current and former staff and students. Vibrant student city.",
      admissionReqs: "65%+ in Bachelor's degree. IELTS 6.5 overall (no skill below 6.0).",
      scholarshipInfo: "Global Futures Scholarship (£3,000 to £5,000 reduction in tuition fees).",
      approxTuitionYearly: 26000,
      approxLivingYearly: 12000,
      isPartner: true,
      logoUrl: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=400&q=80",
      courses: [
        { title: "M.Sc. in Advanced Computer Science", slug: "manchester-msc-advanced-cs", degreeLevel: "MASTER", durationMonths: 12, tuitionFee: 28000, intakeMonths: ["September"], overview: "Specializations in AI, data security, and advanced web technologies." },
        { title: "M.Sc. in International Business", slug: "manchester-msc-intl-business", degreeLevel: "MASTER", durationMonths: 12, tuitionFee: 27000, intakeMonths: ["September"], overview: "Global corporate strategy, multinational economics, and cross-cultural management." },
      ],
    },
    // Canada
    {
      countrySlug: "canada",
      name: "University of Toronto (U of T)",
      slug: "university-of-toronto",
      locationCity: "Toronto, ON",
      globalRanking: 21,
      overview: "Canada's top-ranked research university. Known for pioneering deep learning and medical discoveries. Located in downtown Toronto.",
      admissionReqs: "Mid-to-high B average in final two years of undergraduate study. IELTS 7.0 (no band below 6.5).",
      scholarshipInfo: "Lester B. Pearson International Scholarship (full ride for undergraduates) and Ontario Graduate Scholarships.",
      approxTuitionYearly: 45000,
      approxLivingYearly: 15000,
      isPartner: false,
      logoUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80",
      courses: [
        { title: "Master of Science in Applied Computing (MScAC)", slug: "uoft-mscac", degreeLevel: "MASTER", durationMonths: 16, tuitionFee: 48000, intakeMonths: ["September"], overview: "Includes an 8-month paid industrial R&D internship with leading tech firms." },
        { title: "Rotman Full-Time MBA", slug: "rotman-mba", degreeLevel: "MBA", durationMonths: 20, tuitionFee: 68000, intakeMonths: ["September"], overview: "Integrative thinking approach to management with prime Bay Street finance connections." },
      ],
    },
    {
      countrySlug: "canada",
      name: "University of Waterloo",
      slug: "university-of-waterloo",
      locationCity: "Waterloo, ON",
      globalRanking: 112,
      overview: "Home to the world's largest post-secondary co-operative education program. Unmatched graduate employment rates in Silicon Valley and Canada.",
      admissionReqs: "78%+ in engineering/math undergraduate degree. IELTS 7.5 or TOEFL 100.",
      scholarshipInfo: "International Master's Award of Excellence ($2,500 per term for up to 5 terms).",
      approxTuitionYearly: 32000,
      approxLivingYearly: 13000,
      isPartner: true,
      logoUrl: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&w=400&q=80",
      courses: [
        { title: "Master of Mathematics (MMath) in Computer Science", slug: "waterloo-mmath-cs", degreeLevel: "MASTER", durationMonths: 24, tuitionFee: 26000, intakeMonths: ["September", "January"], overview: "Thesis and coursework options across cryptography, algorithms, and AI." },
        { title: "Master of Engineering (MEng) in Electrical & Computer Engineering", slug: "waterloo-meng-ece", degreeLevel: "MASTER", durationMonths: 16, tuitionFee: 31000, intakeMonths: ["September", "January", "May"], overview: "Professional course-based degree designed for accelerated tech career growth." },
      ],
    },
    // Australia
    {
      countrySlug: "australia",
      name: "University of Melbourne",
      slug: "university-of-melbourne",
      locationCity: "Melbourne, VIC",
      globalRanking: 14,
      overview: "Australia's #1 university. Famous for the Melbourne Model, giving students broad undergraduate study followed by specialized graduate degrees.",
      admissionReqs: "70%+ equivalent GPA in Bachelor's. IELTS 6.5 overall (no band below 6.0).",
      scholarshipInfo: "Melbourne International Undergraduate Scholarship and Graduate Research Scholarships.",
      approxTuitionYearly: 42000,
      approxLivingYearly: 20000,
      isPartner: false,
      logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80",
      courses: [
        { title: "Master of Data Science", slug: "melbourne-master-data-science", degreeLevel: "MASTER", durationMonths: 24, tuitionFee: 46000, intakeMonths: ["February", "July"], overview: "Statistics, computer science, and practical data mining applications." },
        { title: "Master of Engineering (Civil)", slug: "melbourne-master-eng-civil", degreeLevel: "MASTER", durationMonths: 36, tuitionFee: 44000, intakeMonths: ["February", "July"], overview: "Accredited by Engineers Australia and EUR-ACE for global recognition." },
      ],
    },
    {
      countrySlug: "australia",
      name: "Monash University",
      slug: "monash-university",
      locationCity: "Melbourne, VIC",
      globalRanking: 37,
      overview: "Australia's largest university and member of the Group of Eight. Known for pharmacy (#2 in world), engineering, and business.",
      admissionReqs: "65%+ in undergraduate degree. IELTS 6.5 (no band below 6.0) or PTE 58.",
      scholarshipInfo: "Monash International Leadership Scholarship (100% tuition fee waiver for top applicants).",
      approxTuitionYearly: 38000,
      approxLivingYearly: 19000,
      isPartner: true,
      logoUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80",
      courses: [
        { title: "Master of Business Information Systems", slug: "monash-mbis", degreeLevel: "MASTER", durationMonths: 24, tuitionFee: 40000, intakeMonths: ["February", "July"], overview: "IT management, system design, and digital transformation strategies." },
        { title: "Bachelor of Computer Science", slug: "monash-bsc-cs", degreeLevel: "BACHELOR", durationMonths: 36, tuitionFee: 39000, intakeMonths: ["February", "July"], overview: "Algorithmic problem solving, cybersecurity, and data science tracks." },
      ],
    },
    // Ireland
    {
      countrySlug: "ireland",
      name: "Trinity College Dublin (TCD)",
      slug: "trinity-college-dublin",
      locationCity: "Dublin",
      globalRanking: 81,
      overview: "Ireland's oldest and most prestigious university, founded in 1592. Located right in Dublin city center near Silicon Docks.",
      admissionReqs: "2.1 Honours degree (70%+ from Indian universities). IELTS 6.5 overall.",
      scholarshipInfo: "Global Excellence Postgraduate Scholarships (€2,000 to €5,000 fee reduction).",
      approxTuitionYearly: 24000,
      approxLivingYearly: 14000,
      isPartner: true,
      logoUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80",
      courses: [
        { title: "M.Sc. in Computer Science (Data Science)", slug: "tcd-msc-data-science", degreeLevel: "MASTER", durationMonths: 12, tuitionFee: 25000, intakeMonths: ["September"], overview: "1-year intensive program covering machine learning, data visualization, and cloud computing." },
        { title: "M.Sc. in Digital Marketing Strategy", slug: "tcd-msc-digital-marketing", degreeLevel: "MASTER", durationMonths: 12, tuitionFee: 22000, intakeMonths: ["September"], overview: "Digital consumer behavior, SEO/SEM analytics, and social media brand management." },
      ],
    },
    // Singapore
    {
      countrySlug: "singapore",
      name: "National University of Singapore (NUS)",
      slug: "national-university-of-singapore",
      locationCity: "Singapore",
      globalRanking: 8,
      overview: "Asia's leading global university. Consistently ranked among the top 10 universities worldwide with cutting-edge tech and medical labs.",
      admissionReqs: "85%+ in undergraduate degree. IELTS 7.0 or TOEFL 100. GRE required for most engineering/computing courses.",
      scholarshipInfo: "ASEAN Undergraduate Scholarship and NUS Graduate School Scholarships.",
      approxTuitionYearly: 35000,
      approxLivingYearly: 15000,
      isPartner: false,
      logoUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=400&q=80",
      courses: [
        { title: "M.Sc. in Artificial Intelligence & Innovation", slug: "nus-msc-ai-innovation", degreeLevel: "MASTER", durationMonths: 18, tuitionFee: 42000, intakeMonths: ["August", "January"], overview: "Deep learning, neural networks, and AI product management." },
        { title: "NUS MBA", slug: "nus-mba", degreeLevel: "MBA", durationMonths: 17, tuitionFee: 75000, intakeMonths: ["August"], overview: "Transformative Asian business immersion with global exchange semesters." },
      ],
    },
  ];

  for (const u of universitiesData) {
    const countryId = countryMap[u.countrySlug];
    if (!countryId) continue;

    const { courses, ...uniData } = u;
    delete (uniData as Record<string, unknown>).countrySlug;

    const university = await prisma.university.upsert({
      where: { slug: uniData.slug },
      update: { ...uniData, countryId },
      create: { ...uniData, countryId },
    });

    for (const c of courses) {
      await prisma.course.upsert({
        where: { slug: c.slug },
        update: { ...c, universityId: university.id },
        create: { ...c, universityId: university.id },
      });
    }
  }

  // 4. Seed 10 Prep Exams
  console.log("📚 Seeding 10 Preparation Exams...");
  const prepExamsData = [
    {
      examName: "IELTS Academic",
      slug: "ielts",
      overview:
        "The International English Language Testing System (IELTS) is the world's most popular English proficiency test for higher education and global migration, accepted by over 11,000 institutions across 140 countries.",
      examPattern: {
        totalDuration: "2 hours 45 minutes",
        sections: [
          { name: "Listening", duration: "30 mins", questions: 40, format: "4 recordings of native English speakers" },
          { name: "Reading", duration: "60 mins", questions: 40, format: "3 long reading passages with descriptive & analytical texts" },
          { name: "Writing", duration: "60 mins", tasks: 2, format: "Task 1: Graph/Chart description (150 words); Task 2: Essay (250 words)" },
          { name: "Speaking", duration: "11-14 mins", format: "Face-to-face oral interview with an examiner across 3 parts" },
        ],
        scoring: "Band scale from 1.0 to 9.0 (Half bands awarded). Top universities typically require Band 6.5 or 7.0 overall.",
      },
      roadmap: {
        weeks: [
          { week: "Week 1", focus: "Diagnostic Test & Listening Strategies", details: "Take a full-length mock test to identify baseline band score. Master keyword highlighting and predicting answers in Listening." },
          { week: "Week 2", focus: "Reading Speed & Question Types", details: "Practice True/False/Not Given, matching headings, and skimming/scanning techniques under timed conditions." },
          { week: "Week 3", focus: "Writing Task 1 & Task 2 Structures", details: "Learn vocabulary for describing trends and graphs. Master 4-paragraph essay structures for opinion and discussion essays." },
          { week: "Week 4", focus: "Speaking Fluency & Full Mock Drills", details: "Practice Speaking Part 2 cue cards for 2 minutes without pausing. Complete 3 full timed mock tests." },
        ],
      },
      youtubeLinks: [
        { title: "IELTS Writing Task 2 Complete Guide", url: "https://youtube.com/watch?v=example1", author: "IELTS Liz" },
        { title: "How to get Band 8.5 in IELTS Speaking", url: "https://youtube.com/watch?v=example2", author: "IELTS Advantage" },
        { title: "IELTS Reading Hacks: True/False/Not Given", url: "https://youtube.com/watch?v=example3", author: "E2 IELTS" },
      ],
      officialSiteUrl: "https://www.ielts.org",
      mockTestUrl: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-practice-tests",
      recommendedBooks: [
        { title: "Cambridge IELTS 18 Academic", author: "Cambridge University Press", isbn: "978-1009278036" },
        { title: "The Official Cambridge Guide to IELTS", author: "Pauline Cullen", isbn: "978-1107620698" },
      ],
      faqs: [
        { question: "How long is my IELTS score valid?", answer: "IELTS scores are valid for exactly 2 years from the date of the test." },
        { question: "Can I retake only one section of the IELTS?", answer: "Yes! IELTS One Skill Retake is now available at select test centers, allowing you to retake a single section (Listening, Reading, Writing, or Speaking) within 60 days of your original test." },
      ],
    },
    {
      examName: "TOEFL iBT",
      slug: "toefl",
      overview:
        "The Test of English as a Foreign Language (TOEFL iBT) measures your ability to use and understand English at the university level. It is widely preferred by American and Canadian universities.",
      examPattern: {
        totalDuration: "under 2 hours (New Shortened Format)",
        sections: [
          { name: "Reading", duration: "35 mins", questions: 20, format: "2 academic passages with 10 questions each" },
          { name: "Listening", duration: "36 mins", questions: 28, format: "3 lectures and 2 conversations" },
          { name: "Speaking", duration: "16 mins", tasks: 4, format: "1 independent task and 3 integrated reading/listening tasks" },
          { name: "Writing", duration: "29 mins", tasks: 2, format: "1 Integrated task (20 mins) and 1 'Writing for an Academic Discussion' task (10 mins)" },
        ],
        scoring: "Total score from 0 to 120 (30 points per section). Most top US universities require 90-100+.",
      },
      roadmap: {
        weeks: [
          { week: "Week 1", focus: "Academic Vocabulary & Reading Drills", details: "Familiarize with American university lecture vocabulary and practice complex paragraph inference questions." },
          { week: "Week 2", focus: "Note-taking for Listening & Speaking", details: "Master shorthand note-taking during 5-minute audio lectures to capture key arguments and supporting details." },
          { week: "Week 3", focus: "Integrated Speaking & Writing Mastery", details: "Practice combining information from reading passages and audio clips into structured spoken responses and written summaries." },
          { week: "Week 4", focus: "Computer-Based Timing & Practice Tests", details: "Simulate the exact 2-hour online testing interface and review AI automated scoring feedback." },
        ],
      },
      youtubeLinks: [
        { title: "TOEFL iBT New Writing Task Explained", url: "https://youtube.com/watch?v=example4", author: "TST Prep TOEFL" },
        { title: "TOEFL Speaking Templates for High Scores", url: "https://youtube.com/watch?v=example5", author: "LinguaMarina" },
      ],
      officialSiteUrl: "https://www.ets.org/toefl",
      mockTestUrl: "https://www.ets.org/toefl/test-takers/ibt/prepare/free-practice-tests.html",
      recommendedBooks: [
        { title: "The Official Guide to the TOEFL iBT Test (7th Edition)", author: "ETS", isbn: "978-1264267489" },
        { title: "Barron's TOEFL iBT with Online Tests", author: "Pamela Sharpe", isbn: "978-1438011875" },
      ],
      faqs: [
        { question: "What is a good TOEFL score for IVY League universities?", answer: "Most Ivy League and top 20 U.S. universities require a minimum score of 100 overall, with at least 25 in each sub-section." },
      ],
    },
    {
      examName: "GRE General Test",
      slug: "gre",
      overview:
        "The Graduate Record Examination (GRE) is an admissions requirement for most MS, Ph.D., and select MBA programs globally, assessing verbal reasoning, quantitative reasoning, and analytical writing.",
      examPattern: {
        totalDuration: "1 hour 58 minutes (New Shortened Format)",
        sections: [
          { name: "Analytical Writing", duration: "30 mins", tasks: 1, format: "Analyze an Issue essay task" },
          { name: "Verbal Reasoning", duration: "41 mins", questions: 27, format: "Reading comprehension, text completion, and sentence equivalence across 2 sections" },
          { name: "Quantitative Reasoning", duration: "47 mins", questions: 27, format: "Arithmetic, algebra, geometry, and data analysis across 2 sections" },
        ],
        scoring: "Verbal & Quant: 130-170 scale (1 point increments). Analytical Writing: 0.0-6.0 scale (0.5 increments). Top MS CS programs look for 165+ in Quant.",
      },
      roadmap: {
        weeks: [
          { week: "Weeks 1-2", focus: "Quant Foundations & Word Lists", details: "Review high school algebra, geometry rules, and memorize GregMat / Barron's 800 high-frequency GRE words." },
          { week: "Weeks 3-4", focus: "Text Completion & Data Interpretation", details: "Master logic clues in multi-blank sentences and practice complex chart/graph data analysis questions." },
          { week: "Weeks 5-6", focus: "Timed Sections & AWA Essay Writing", details: "Practice pacing (1.5 mins per quant question) and write 5 Issue essays using structured 5-paragraph templates." },
        ],
      },
      youtubeLinks: [
        { title: "GRE Quant Hacks: How to get 170/170", url: "https://youtube.com/watch?v=example6", author: "GregMat" },
        { title: "GRE Vocabulary Memorization Strategy", url: "https://youtube.com/watch?v=example7", author: "Magoosh GRE" },
      ],
      officialSiteUrl: "https://www.ets.org/gre",
      mockTestUrl: "https://www.ets.org/gre/test-takers/general-test/prepare/powerprep.html",
      recommendedBooks: [
        { title: "Official GRE Super Power Pack (2nd Edition)", author: "ETS", isbn: "978-1260026398" },
        { title: "Manhattan Prep 5 lb. Book of GRE Practice Problems", author: "Manhattan Prep", isbn: "978-1506247595" },
      ],
      faqs: [
        { question: "Is GRE still required for US fall admissions?", answer: "While some universities made GRE optional post-2020, over 70% of top competitive engineering and computer science programs (like MIT, RWTH Aachen, NUS) still require or strongly recommend high GRE Quant scores." },
      ],
    },
    {
      examName: "GMAT Focus Edition",
      slug: "gmat",
      overview:
        "The Graduate Management Admission Test (GMAT Focus Edition) is the premier standard test for MBA and Business Master's admissions worldwide, focusing heavily on critical executive reasoning.",
      examPattern: {
        totalDuration: "2 hours 15 minutes",
        sections: [
          { name: "Quantitative Reasoning", duration: "45 mins", questions: 21, format: "Algebra and arithmetic problem solving (No geometry)" },
          { name: "Verbal Reasoning", duration: "45 mins", questions: 23, format: "Reading comprehension and critical reasoning (No sentence correction)" },
          { name: "Data Insights", duration: "45 mins", questions: 20, format: "Data sufficiency, multi-source reasoning, table analysis, and graphics interpretation" },
        ],
        scoring: "Total score from 205 to 805 (ends in 5). Top global business schools target 655+ (equivalent to old 700+).",
      },
      roadmap: {
        weeks: [
          { week: "Weeks 1-2", focus: "Critical Reasoning Logic & Data Sufficiency", details: "Master assumption, strengthening, and weakening argument structures. Learn data sufficiency logic without calculating exact answers." },
          { week: "Weeks 3-4", focus: "Multi-Source Data Insights & Pacing", details: "Practice synthesizing data across multiple tabs, charts, and spreadsheets under strict 2-minute-per-question limits." },
        ],
      },
      youtubeLinks: [
        { title: "GMAT Focus Edition Complete Breakdown", url: "https://youtube.com/watch?v=example8", author: "GMAT Ninja" },
      ],
      officialSiteUrl: "https://www.mba.com/exams/gmat-focus-edition",
      mockTestUrl: "https://www.mba.com/exam-prep/gmat-official-starter-kit-practice-exams-1-and-2-free",
      recommendedBooks: [
        { title: "GMAT Official Guide 2024-2025 Focus Edition", author: "GMAC", isbn: "978-1119990835" },
      ],
      faqs: [
        { question: "Can I use a calculator during the GMAT?", answer: "An on-screen calculator is permitted ONLY during the Data Insights section. No calculator is allowed during Quantitative Reasoning." },
      ],
    },
    {
      examName: "German Language (A1 to C1)",
      slug: "german",
      overview:
        "Mastering the German language (Goethe-Zertifikat / TestDaF / DSH) is essential for enrolling in tuition-free public German universities, securing part-time student jobs, and obtaining post-study employment.",
      examPattern: {
        totalDuration: "Varies by level (Approx. 3 hours for B1/B2)",
        sections: [
          { name: "Lesen (Reading)", duration: "65 mins", format: "Understanding advertisements, newspaper articles, and formal notices" },
          { name: "Hören (Listening)", duration: "40 mins", format: "Listening to announcements, discussions, and radio interviews" },
          { name: "Schreiben (Writing)", duration: "60 mins", format: "Writing formal emails, complaint letters, and opinion essays" },
          { name: "Sprechen (Speaking)", duration: "15 mins", format: "Introducing oneself, discussing everyday topics, and presenting arguments with a partner" },
        ],
        scoring: "Pass/Fail scale with percentage (60%+ required to pass each module). Most English-taught MS programs require A1/A2, while German-taught degrees require C1/TestDaF.",
      },
      roadmap: {
        weeks: [
          { week: "Month 1 (Level A1)", focus: "Basic Grammar & Daily Vocabulary", details: "Master noun genders (der/die/das), present tense conjugations, numbers, and basic self-introductions." },
          { week: "Month 2-3 (Level A2)", focus: "Past Tenses & Subordinate Clauses", details: "Learn Perfekt and Präteritum tenses, sentence word order (Weil, Dass, Wenn), and daily survival German." },
          { week: "Month 4-6 (Level B1)", focus: "Independent Communication & Workplace German", details: "Express detailed opinions, write professional emails, and understand technical discussions." },
        ],
      },
      youtubeLinks: [
        { title: "Learn German A1 in 30 Days", url: "https://youtube.com/watch?v=example9", author: "Learn German with Anja" },
      ],
      officialSiteUrl: "https://www.goethe.de",
      mockTestUrl: "https://www.goethe.de/en/spr/kup/tsa.html",
      recommendedBooks: [
        { title: "Netzwerk Neu A1-B1 Kurs- und Arbeitsbuch", author: "Klett Sprachen", isbn: "978-3126071543" },
      ],
      faqs: [
        { question: "Do I need German if my MS course is taught in English?", answer: "While not strictly mandatory for English-taught lectures, having at least A2/B1 German is crucial for finding part-time jobs, internships, and integrating into German daily life." },
      ],
    },
    {
      examName: "SAT",
      slug: "sat",
      overview: "The Digital SAT is the standardized college admissions test used by undergraduate institutions across the USA, Canada, and Singapore.",
      examPattern: { totalDuration: "2 hours 14 minutes", sections: [{ name: "Reading and Writing", duration: "64 mins" }, { name: "Math", duration: "70 mins" }], scoring: "400 to 1600 scale." },
      roadmap: { weeks: [{ week: "Weeks 1-4", focus: "Digital Adaptive Practice & Math Rules", details: "Master Desmos graphing calculator hacks and grammar punctuation rules." }] },
      youtubeLinks: [], officialSiteUrl: "https://satsuite.collegeboard.org", mockTestUrl: "https://bluebook.app.collegeboard.org", recommendedBooks: [], faqs: [],
    },
    {
      examName: "PTE Academic",
      slug: "pte",
      overview: "Pearson Test of English (PTE Academic) is a fast, AI-scored computer-based English test accepted across Australia, UK, and New Zealand.",
      examPattern: { totalDuration: "2 hours", sections: [{ name: "Speaking & Writing", duration: "54-67 mins" }, { name: "Reading", duration: "29-30 mins" }, { name: "Listening", duration: "30-43 mins" }], scoring: "10 to 90 scale." },
      roadmap: { weeks: [{ week: "Weeks 1-2", focus: "Speaking Pronunciation & Describe Image", details: "Practice speaking at steady pace for AI voice recognition." }] },
      youtubeLinks: [], officialSiteUrl: "https://www.pearsonpte.com", mockTestUrl: "https://www.pearsonpte.com/preparation", recommendedBooks: [], faqs: [],
    },
    {
      examName: "Duolingo English Test (DET)",
      slug: "duolingo",
      overview: "An convenient, affordable, 1-hour online adaptive English test taken from home. Highly accepted across US and Canadian universities.",
      examPattern: { totalDuration: "1 hour", sections: [{ name: "Adaptive Test", duration: "45 mins" }, { name: "Video & Writing Sample", duration: "10 mins" }], scoring: "10 to 160 scale." },
      roadmap: { weeks: [{ week: "Week 1", focus: "Rapid Word Recognition & Dictation", details: "Practice identifying real vs fake English words under 5-second timers." }] },
      youtubeLinks: [], officialSiteUrl: "https://englishtest.duolingo.com", mockTestUrl: "https://englishtest.duolingo.com/applicants", recommendedBooks: [], faqs: [],
    },
    {
      examName: "TestDaF",
      slug: "testdaf",
      overview: "Test Deutsch als Fremdsprache is an advanced language exam for international applicants aiming to study German-taught degree programs.",
      examPattern: { totalDuration: "3 hours 10 minutes", sections: [{ name: "4 Modules", duration: "All four skills at B2/C1 level" }], scoring: "TDN 3, 4, or 5 per section." },
      roadmap: { weeks: [{ week: "Weeks 1-4", focus: "Academic Graph Description & Debate Writing", details: "Master formal university vocabulary and structuring academic arguments." }] },
      youtubeLinks: [], officialSiteUrl: "https://www.testdaf.de", mockTestUrl: "https://www.testdaf.de", recommendedBooks: [], faqs: [],
    },
    {
      examName: "OET (Occupational English Test)",
      slug: "oet",
      overview: "The international English language test specifically designed for healthcare professionals (doctors, nurses) seeking registration and study in UK, Ireland, and Australia.",
      examPattern: { totalDuration: "approx 3 hours", sections: [{ name: "Healthcare Context Skills", duration: "Listening, Reading, Writing referral letters, Speaking roleplays" }], scoring: "Grade A to E (350+ required for Grade B)." },
      roadmap: { weeks: [{ week: "Weeks 1-3", focus: "Medical Referral Letters & Clinical Roleplays", details: "Practice writing concise patient discharge and transfer letters." }] },
      youtubeLinks: [], officialSiteUrl: "https://oet.com", mockTestUrl: "https://oet.com", recommendedBooks: [], faqs: [],
    },
  ];

  for (const exam of prepExamsData) {
    await prisma.prepExam.upsert({
      where: { slug: exam.slug },
      update: exam,
      create: exam,
    });
  }

  // 5. Seed Resources
  console.log("📑 Seeding Resource Vault...");
  const resourcesData = [
    { title: "Ultimate SOP Writing Toolkit & Winning Samples", slug: "sop-writing-toolkit", category: "SOP_GUIDE", description: "Step-by-step formula for writing a compelling Statement of Purpose that won admissions to MIT, TUM, and Imperial College.", fileUrl: "/resources/sop_toolkit_2026.pdf", isGated: true, downloadCount: 1420 },
    { title: "Germany Blocked Account & Student Visa Checklist 2026", slug: "germany-visa-checklist", category: "VISA_CHECKLIST", description: "Complete documentation checklist for APS Certificate, Expatrio/Fintiba blocked account setup, and German Embassy interview preparation.", fileUrl: "/resources/germany_visa_checklist.pdf", isGated: true, downloadCount: 2310 },
    { title: "USA F-1 Visa Interview Top 50 Questions & Answers", slug: "usa-f1-visa-guide", category: "VISA_CHECKLIST", description: "Proven strategies to demonstrate non-immigrant intent and answer tricky financial sponsorship questions confidently.", fileUrl: "/resources/usa_f1_interview_guide.pdf", isGated: true, downloadCount: 1890 },
    { title: "IELTS Band 8.5 Speaking & Writing Cheat Sheet", slug: "ielts-cheat-sheet", category: "IELTS_CHEAT_SHEET", description: "High-scoring academic vocabulary connectors, idiom lists, and essay structure templates.", fileUrl: "/resources/ielts_band8_cheatsheet.pdf", isGated: false, downloadCount: 3450 },
  ];

  for (const res of resourcesData) {
    await prisma.resource.upsert({
      where: { slug: res.slug },
      update: res,
      create: res,
    });
  }

  // 6. Seed Blogs
  console.log("✍️ Seeding Blog Articles...");
  const blogsData = [
    {
      title: "Top 5 Reasons Why Studying in Germany is 100% Worth It in 2026",
      slug: "why-study-in-germany-2026",
      excerpt: "From zero tuition fees at world-class public universities to an 18-month post-study job seeker visa, discover why Germany is Europe's #1 study destination.",
      content: "Germany continues to attract over 400,000 international students annually. Unlike the US or UK where tuition fees can exceed $40,000 per year, German public universities (such as TUM, RWTH Aachen, and TU Berlin) charge zero tuition fees for all students regardless of nationality.\n\nFurthermore, Germany is currently facing a massive skilled labor shortage across mechanical engineering, IT, software development, and renewable energy. The new German Skilled Immigration Act makes it easier than ever for foreign graduates to secure permanent residency (Niederlassungserlaubnis) after just 21 to 24 months of working in their field of study.\n\nAt UES Abroad, we guide you through the entire APS certification process, university shortlisting, blocked account setup, and visa documentation. Book your consultation today!",
      coverImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
      author: "Rahul Nair (Senior Overseas Counselor)",
      isPublished: true,
    },
    {
      title: "How to Crack IELTS Academic with Band 8.0 in Just 30 Days",
      slug: "crack-ielts-band-8-in-30-days",
      excerpt: "Struggling with IELTS Writing or Reading? Here is the exact daily preparation roadmap and time-management strategy used by over 500 UES Abroad students.",
      content: "Achieving an overall Band 8.0 in IELTS requires more than just good English fluency; it requires deep familiarity with the test pattern and trapping mechanisms used by examiners.\n\nIn the Reading section, the #1 mistake students make is reading the entire passage before looking at the questions. Instead, use the keyword scanning method to locate specific paragraphs in under 30 seconds.\n\nIn Writing Task 2, structure is king. Always use a clear 4-paragraph format: Introduction (Paraphrase prompt + Thesis statement), Body Paragraph 1 (Main argument + specific example), Body Paragraph 2 (Counter-argument or secondary point + example), and Conclusion. Avoid informal contractions and overcomplicated vocabulary that feels forced.",
      coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      author: "Priya Sharma (IELTS & TOEFL Head Trainer)",
      isPublished: true,
    },
    {
      title: "USA vs UK vs Canada: Which Country Offers the Best ROI for Indian Students?",
      slug: "usa-vs-uk-vs-canada-roi-comparison",
      excerpt: "We analyze tuition costs, living expenses, post-study work visa durations, and starting salaries across the top 3 English-speaking study destinations.",
      content: "When choosing a study abroad destination, Return on Investment (ROI) is the most critical factor for students and parents. Let's compare the big three:\n\n1. United States: High initial cost ($35k-$50k/year tuition), but offers the highest starting salaries globally in tech and finance ($85k-$120k/year). STEM graduates get a 3-year OPT work visa.\n\n2. United Kingdom: Best for time efficiency. With 1-year Master's degrees, you save an entire year of tuition and living costs. Graduates receive a 2-year post-study work visa.\n\n3. Canada: The premier choice for long-term settlement. While starting salaries are slightly lower than the US, the 3-year Post-Graduation Work Permit (PGWP) offers a direct, predictable route to Permanent Residency (PR).\n\nNeed help calculating your exact budget and eligibility? Try our interactive Start My Journey tool on the homepage!",
      coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      author: "Vikramaditya Rao (Lead Software & Education Consultant)",
      isPublished: true,
    },
  ];

  for (const b of blogsData) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }

  // 7. Seed Testimonials
  console.log("🌟 Seeding Student Testimonials...");
  const testimonialsData = [
    { studentName: "Ananya Patel", university: "Technical University of Munich", course: "M.Sc. in Computer Science", country: "Germany", content: "UES Abroad made my dream of studying in Germany for FREE a reality! Their counselor guided me step-by-step through the APS certificate and university applications. I received admission offers from both TUM and RWTH Aachen!", rating: 5, imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
    { studentName: "Rohan Mukherjee", university: "Imperial College London", course: "M.Sc. in Artificial Intelligence", country: "United Kingdom", content: "The visa processing and SOP editing by UES Abroad was flawless. Their team helped me highlight my research projects effectively, resulting in an admission offer from Imperial within just 3 weeks!", rating: 5, imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
    { studentName: "Siddharth Verma", university: "Arizona State University", course: "M.S. in Computer Science", country: "United States", content: "From GRE preparation tips to securing a $10,000 scholarship at ASU, UES Abroad supported me at every turn. Their forex currency assistance also saved my parents significant transfer fees!", rating: 5, imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
    { studentName: "Sneha Kulkarni", university: "University of Toronto", course: "Master of Applied Computing", country: "Canada", content: "I was overwhelmed by Canada's visa rules and SOP requirements. UES Abroad's dedicated counselor simplified everything and even helped me find verified student accommodation in downtown Toronto before my flight!", rating: 5, imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80" },
  ];

  for (const t of testimonialsData) {
    const existing = await prisma.testimonial.findFirst({ where: { studentName: t.studentName } });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }

  console.log("✅ Seeding completed successfully! All 9 Destinations, 20+ Universities, 50+ Courses, 10 Prep Exams, and Vault Resources are live.");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
