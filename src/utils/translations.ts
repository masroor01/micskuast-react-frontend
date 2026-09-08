export type SupportedLanguage = 'en' | 'ur';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ur', label: 'Urdu', nativeName: 'اردو', dir: 'rtl' }
];

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Top Bar & Institutional Lockup
    univ_name: "Sher-e-Kashmir University of Agricultural Sciences & Technology of Kashmir",
    hadp_tag: "HADP #04",
    hadp_statement: "Strengthening Agricultural Marketing in UT of Jammu and Kashmir",
    mic_tag: "(Market Intelligence Cell)",
    admin_portal_btn: "Admin Portal",
    light_theme: "Light Theme",
    dark_theme: "Dark Theme",
    warm_theme: "Warm Theme",
    select_language: "Language",

    // Brand
    header_brand_name: "MIC SKUAST-K",
    header_brand_sub: "Market Intelligence Cell",

    // Navigation
    nav_home: "Home",
    nav_about: "About Us",
    nav_ews: "EWS Reports",
    nav_apmcs: "APMCs",
    nav_publications: "Publications",
    nav_team: "Our Team",
    nav_market_intel: "Explore Live Forecasts",

    // Homepage Floating Stats
    home_stat1_val: "15+",
    home_stat1_lbl: "APMC Mandis",
    home_stat2_val: "19 Years",
    home_stat2_lbl: "Price Series",
    home_stat3_val: "Real-Time",
    home_stat3_lbl: "Feeds Synced",

    // News Ticker
    ticker_label: "MIC UPDATE",

    // Hero Carousel Slides
    hero_slide_title_1: "AI-Powered Price Forecasting & Decision Intelligence",
    hero_slide_subtitle_1: "Forecasting daily wholesale Mandi prices for Apple and Cherry with Deep Learning LSTM models to guide harvesting, storage, and market dispatch.",
    hero_slide_btn_primary_1: "Explore Live Forecasts",
    hero_slide_btn_secondary_1: "View EWS Reports",

    hero_slide_title_2: "Early Warning Systems & Price Volatility Risk Radar",
    hero_slide_subtitle_2: "Monitoring market volatility parameters, supply chain shocks, and abnormal price movements across regional and national trading corridors.",
    hero_slide_btn_primary_2: "View EWS Reports",
    hero_slide_btn_secondary_2: "Market Stability Report",

    hero_slide_title_3: "Live APMC Mandi Arrival Logs & Real-Time Sync",
    hero_slide_subtitle_3: "Tracking daily arrivals, transaction volume, grade-wise realizations, and interstate commodity trade across 15+ wholesale terminal markets.",
    hero_slide_btn_primary_3: "Explore APMC Markets",
    hero_slide_btn_secondary_3: "Price Realizations",

    hero_slide_title_4: "Horticulture Intelligence Bulletins & Policy Reports",
    hero_slide_subtitle_4: "Access peer-reviewed SKUAST research publications, HADP project bulletins, and actionable market intelligence outlooks.",
    hero_slide_btn_primary_4: "Browse Publications",
    hero_slide_btn_secondary_4: "Our Research Team",

    // Homepage Infographic Section
    home_infographic_badge: "Core Architecture & Solutions",
    home_infographic_title: "How Agri-Intelligence Empowers Decisions",
    home_infographic_desc: "Integrating deep learning neural networks, real-time APMC mandi streams, and early warning anomaly radars into actionable decision tools.",

    // Homepage 4 Intelligence Cards
    home_card1_tag: "AI & Neural Networks",
    home_card1_title: "Apple & Cherry Price Forecasting",
    home_card1_desc: "Query deep-learning LSTM recurrent models trained on 19 years of daily wholesale arrivals to forecast future mandi price realizations.",
    home_card1_meta: "LSTM Models",
    home_card1_stat: "94.6% Accuracy →",

    home_card2_tag: "Anomaly Detection & Risk",
    home_card2_title: "Early Warning Volatility Radar",
    home_card2_desc: "Running automated variance and standard deviation monitors flagging volume anomalies and warning of sudden price shocks.",
    home_card2_meta: "Statistical Alarms",
    home_card2_stat: "Active Alerts →",

    home_card3_tag: "Data Ingestion Pipeline",
    home_card3_title: "Live APMC Mandi Terminal Sync",
    home_card3_desc: "Continuous data ingestion of wholesale arrivals, transaction volume, grade-wise realizations, and interstate trade across 15+ terminals.",
    home_card3_meta: "15+ Terminals",
    home_card3_stat: "Real-Time Sync →",

    home_card4_tag: "Policy & Decision Support",
    home_card4_title: "HADP Strategic Outreach & Reports",
    home_card4_desc: "Structuring regional commodity outlook reports, policy compendiums, and peer-reviewed research for farmers and planners.",
    home_card4_meta: "HADP Project 04",
    home_card4_stat: "View Reports →",

    // Publications Directory
    pub_page_title: "Publications & Books Directory",
    pub_page_desc: "Browse research bulletins, academic publications, market textbooks, and seasonal outlook reports compiled by the SKUAST Market Intelligence Cell.",
    pub_search_placeholder: "Search reports or authors...",
    pub_tab_all: "All Publications",
    pub_tab_outlooks: "Commodity Outlooks",
    pub_tab_reports: "Market Intelligence Reports",
    pub_tab_papers: "Research Papers",
    pub_tab_books: "Books",
    pub_tab_chapters: "Book Chapters",
    pub_tab_policy: "Policy Reports",
    pub_by: "By",
    pub_view: "View",
    pub_request_access: "Request Access",
    pub_empty_title: "No Publications Found",
    pub_empty_desc: "We couldn't find any documents matching your query. Try refining your search query or switching categories.",

    // Markets Page
    markets_header_title: "APMC Market Intelligence",
    markets_header_subtitle: "Statistical analysis and pricing logs from major wholesale assembly and terminal agricultural markets.",

    // EWS Page
    ews_title: "Early Warning System (EWS)",
    ews_subtitle: "An instability monitoring engine detecting price anomalies, volatility spikes, and drawdown regimes across regional Kashmiri stone and pome fruits.",
    ews_tab_cherry: "🍒 Cherry EWS (Demo 2026)",
    ews_tab_apple: "🍎 Apple EWS (Coming Soon)",

    // Forecasts Page
    forecast_update_badge: "MIC Update",
    forecast_update_text: "🍎 AI-powered Apple Price Forecasts for the 2026–27 marketing season are now LIVE on MIC — providing wholesale price projections.",
    forecast_tab_realtime: "Real-Time Forecasts",
    forecast_tab_tool: "Smart Forecasting Tool",
    forecast_tab_mandi: "Live Mandi Data",
    forecast_tab_ledger: "Orchard Ledger (Stats)",

    // Team Page
    team_badge: "HADP Project Members",
    team_title: "Meet Our Team",
    team_subtitle: "The research, analytical, and technical brains driving agricultural price forecasting and market intelligence models at SKUAST-K Kashmir.",
    team_pi_title: "Principal Investigators",

    // Commodity Outlooks List
    outlooks_title: "Commodity Outlooks",
    outlooks_subtitle: "Explore detailed reports on arrivals, wholesale prices, and future market predictions for major Kashmir horticultural products. All reports are published and managed dynamically in WordPress.",
    outlooks_empty: "No commodity outlooks found.",

    // About Us - Hero & KPIs
    about_hero_badge_text: "HADP #04: Strengthening Agricultural Marketing in UT of Jammu and Kashmir",
    about_hero_title_v2: "Empowering J&K's Horticulture Economy Through Market Intelligence",
    about_hero_subtitle_v2: "The Market Intelligence Cell (MIC) at SKUAST-Kashmir is the digital nerve center dedicated to transforming agricultural marketing in Jammu and Kashmir. Powered by deep-learning LSTM neural networks, real-time APMC mandi telemetry, and price anomaly early warning radars, we deliver transparent, actionable foresight to fruit growers, FPOs, traders, and agricultural policy makers.",
    about_kpi1_val: "19+",
    about_kpi1_lbl: "Years Price Series Data",
    about_kpi2_val: "15+",
    about_kpi2_lbl: "APMC Mandis Synchronized",
    about_kpi3_val: "94.6%",
    about_kpi3_lbl: "LSTM Predictive Accuracy",
    about_kpi4_val: "6+",
    about_kpi4_lbl: "Commercial Crop Varieties",
    about_kpi5_val: "100%",
    about_kpi5_lbl: "Open Access for Growers",

    // About Us - Mission & Mandate
    about_mission_badge: "Mission & Genesis",
    about_mission_heading: "Institutional Mandate under HADP Project #04",
    about_mission_p1: "Established under the transformative Holistic Agriculture Development Program (HADP Project #04), the Market Intelligence Cell (MIC) is an apex initiative funded by the Government of Jammu & Kashmir and hosted at SKUAST-Kashmir, Shalimar.",
    about_mission_p2: "For decades, the horticultural sector of Jammu and Kashmir has suffered from asymmetric price discovery, fragmented wholesale chains, and vulnerability to market shocks. MIC bridges this historical gap through state-of-the-art computational intelligence.",
    about_mission_p3: "By unifying daily arrival and wholesale pricing streams across 15+ terminal and assembly mandis, our advanced econometric and deep learning models forecast price trends weeks in advance, empowering orchardists with market leverage.",
    about_mandate_title: "HADP #04: Strengthening Agricultural Marketing in UT of Jammu and Kashmir",
    about_mandate_sub: "Government of Jammu & Kashmir",
    about_mandate_item1: "Real-time price & arrival tracking across regional & national Mandis",
    about_mandate_item2: "Deep-learning price forecasts for Apple & Cherry varieties",
    about_mandate_item3: "Early Warning System (EWS) to detect market volatility and price crashes",
    about_mandate_item4: "Post-harvest CA storage & logistics decision support for orchardists",
    about_mandate_item5: "Weekly policy briefs & scientific market intelligence bulletins",

    // About Us - Pillars
    about_pillars_section_badge: "Strategic Pillars",
    about_pillars_section_title: "Six Core Pillars of Agricultural Marketing Intelligence",
    about_pillars_section_desc: "A comprehensive technological and institutional framework driving value realization across the horticulture value chain.",
    about_pillar1_title: "Deep Learning Price Forecasting",
    about_pillar1_desc: "High-precision Long Short-Term Memory (LSTM) and GRU neural networks trained on 19+ years of historical APMC records, projecting seasonal price trajectories.",
    about_pillar1_metric: "94.6% Test Accuracy",
    about_pillar1_btn: "Explore Forecasts",
    about_pillar2_title: "Real-Time APMC Mandi Telemetry",
    about_pillar2_desc: "Automated daily data ingestion pipelines capturing arrivals, modal rates, minimum/maximum prices across Parimpora, Shopian, Sopore, Narwal, and Azadpur Delhi.",
    about_pillar2_metric: "15+ Mandis Monitored",
    about_pillar2_btn: "View APMC Feeds",
    about_pillar3_title: "Early Warning System (EWS)",
    about_pillar3_desc: "Advanced anomaly detection radar identifying price crash risks, volatility spikes, and seasonal market distortions to safeguard farmer revenues.",
    about_pillar3_metric: "Real-Time Risk Alerts",
    about_pillar3_btn: "Access EWS Radar",
    about_pillar4_title: "Scientific Market Bulletins",
    about_pillar4_desc: "Weekly and seasonal intelligence briefs translating complex macroeconomic trends and supply-demand imbalances into actionable farmer advisories.",
    about_pillar4_metric: "Weekly Bulletins",
    about_pillar4_btn: "Read Publications",
    about_pillar5_title: "Post-Harvest & CA Storage Analytics",
    about_pillar5_desc: "Decision-support tools helping orchardists optimize Controlled Atmosphere (CA) storage release timing based on off-season premium price forecasts.",
    about_pillar5_metric: "CA Storage Optimization",
    about_pillar5_btn: "Learn More",
    about_pillar6_title: "Policy & Stakeholder Support",
    about_pillar6_desc: "Empirical evidence, econometric reports, and strategic dashboards informing government departments, policy makers, FPOs, and industry bodies.",
    about_pillar6_metric: "HADP Governance",
    about_pillar6_btn: "View Mandate",

    // About Us - Pipeline
    about_pipeline_section_badge: "Data Architecture",
    about_pipeline_section_title: "How Our Intelligence Pipeline Works",
    about_pipeline_section_desc: "From raw mandi logs to real-time farmer advisory in four automated, synchronized stages.",
    about_step1_title: "1. Multi-Mandi Data Ingestion",
    about_step1_desc: "Daily arrivals, variety grades, and price points scraped and synchronized from APMC portals across Kashmir, Jammu, and major national terminal markets.",
    about_step2_title: "2. Normalization & Anomaly Filtering",
    about_step2_desc: "Statistical cleaning, outlier detection, and inflation indexing across 19 years of historical price records for Apple, Cherry, and horticultural crops.",
    about_step3_title: "3. Deep Neural Forecast Engine",
    about_step3_desc: "LSTM and GRU deep learning models simulate supply shocks, weather patterns, and seasonal demand to compute forward-looking price projections.",
    about_step4_title: "4. Actionable Advisory Dissemination",
    about_step4_desc: "Intuitive web dashboards, early warning advisories, and weekly bulletins delivered openly to growers, FPOs, and government officials.",

    // About Us - Stakeholders
    about_stakeholders_section_badge: "Ecosystem Impact",
    about_stakeholders_section_title: "Empowering Every Link of the Value Chain",
    about_stakeholders_section_desc: "Delivering tailored value to orchardists, farmer organizations, commercial traders, and administrative policy makers.",
    about_stakeholder1_badge: "Growers & Orchardists",
    about_stakeholder1_title: "Fruit Growers & Orchardists",
    about_stakeholder1_desc: "Fair price discovery, optimal harvest timing, and bargaining power against distress sales.",
    about_stakeholder2_badge: "Producer Groups",
    about_stakeholder2_title: "FPOs & Cooperatives",
    about_stakeholder2_desc: "Aggregated marketing strategies, cold storage planning, and direct dispatch to high-value markets.",
    about_stakeholder3_badge: "Logistics & Trade",
    about_stakeholder3_title: "Traders & CA Operators",
    about_stakeholder3_desc: "Demand forecasting, inter-market arbitrage visibility, and efficient inventory turnover.",
    about_stakeholder4_badge: "Government",
    about_stakeholder4_title: "Policy Makers & UT Administration",
    about_stakeholder4_desc: "Early warning of gluts, targeted market interventions, and data-driven agricultural planning under HADP.",

    // About Us - Leadership
    about_vc_badge_text: "Leadership Vision",
    about_vc_title_v2: "Patron's Vision for Agricultural Transformation",
    about_vc_quote_v2: "The true measure of agricultural research lies in its ability to translate scientific foresight into economic resilience for our farmers. Through HADP Project #04, the Market Intelligence Cell bridges data science with ground reality, providing our orchardists the intelligence needed to prosper.",
    about_vc_name_text: "Prof. (Dr.) Nazir Ahmad Ganai",
    about_vc_role_text: "Hon'ble Vice Chancellor, SKUAST-Kashmir | Patron, HADP",

    // About Us - Quick Access Deck
    about_cta_deck_title: "Ready to Explore Live Market Intelligence?",
    about_cta_deck_desc: "Access our suite of AI-driven forecasting engines, real-time APMC dashboards, and early warning systems today.",
    about_cta1_btn: "Live Price Forecasts",
    about_cta2_btn: "APMC Mandi Feeds",
    about_cta3_btn: "Early Warning Radar",
    about_cta4_btn: "Publications Directory",
    about_cta5_btn: "Meet the Team",

    // Common Buttons & Actions
    btn_read_more: "Read More",
    btn_explore_forecasts: "Explore Live Forecasts",
    btn_view_ews: "View EWS Reports",
    btn_download_pdf: "Download PDF",
    btn_view_details: "View Details",
    btn_see_all_markets: "See All Markets",
    btn_save: "Save Changes",
    btn_cancel: "Cancel",

    // Footer
    footer_logo_text: "MIC SKUAST-K",
    footer_desc_text: "Market Intelligence Cell, SKUAST-Kashmir. Transforming agricultural marketing with AI-driven price forecasts, APMC telemetry, and farmer-first advisory under HADP Project #04.",
    footer_address: "Faculty of Horticulture, SKUAST-Kashmir, Shalimar, Srinagar, J&K 190025",
    footer_email: "mic@skuastkashmir.ac.in",
    footer_title_nav: "Navigation",
    footer_nav_home: "Home",
    footer_nav_about: "About Us",
    footer_nav_apmcs: "APMC Analysis",
    footer_nav_outlooks: "Commodity Outlooks",
    footer_nav_intel: "Market Intelligence",
    footer_nav_team: "Our Team",
    footer_title_apmcs: "APMC Mandis",
    footer_apmc_ganderbal: "Ganderbal Mandi",
    footer_apmc_narwal: "Narwal Mandi Jammu",
    footer_apmc_pulwama: "Prichoo Mandi Pulwama",
    footer_apmc_shopian: "Shopian Fruit Mandi",
    footer_title_research: "Research & Data",
    footer_research_pub: "Publications Directory",
    footer_research_bulletin: "Weekly Bulletins",
    footer_research_hadp: "HADP Projects",
    footer_copyright: "© 2026 Market Intelligence Cell (HADP Project #04). All rights reserved.",
    footer_hosting: "Hosted at SKUAST-Kashmir, Shalimar Campus, Srinagar, J&K."
  },


  ur: {
    // Top Bar & Institutional Lockup
    univ_name: "شیرِ کشمیر یونیورسٹی آف ایگریکلچرل سائنسز اینڈ ٹیکنالوجی آف کشمیر",
    hadp_tag: "ایچ اے ڈی پی #04",
    hadp_statement: "مرکز کے زیر انتظام جموں و کشمیر میں زرعی مارکیٹنگ کا استحکام",
    mic_tag: "(مارکیٹ انٹیلی جنس سیل)",
    admin_portal_btn: "ایڈمن پورٹل",
    light_theme: "لائٹ تھیم",
    dark_theme: "ڈارک تھیم",
    warm_theme: "وارم تھیم",
    select_language: "زبان",

    // Brand
    header_brand_name: "ایم آئی سی سکواسٹ-کے",
    header_brand_sub: "مارکیٹ انٹیلی جنس سیل",

    // Navigation
    nav_home: "صفحہ اول",
    nav_about: "ہمارے متعلق",
    nav_ews: "ای ڈبلیو ایس رپورٹس",
    nav_apmcs: "اے پی ایم سی منڈیاں",
    nav_publications: "مطبوعات",
    nav_team: "ہماری ٹیم",
    nav_market_intel: "براہِ راست پیشن گوئی دیکھیں",

    // Homepage Floating Stats
    home_stat1_val: "15+",
    home_stat1_lbl: "اے پی ایم سی منڈیاں",
    home_stat2_val: "19 سال",
    home_stat2_lbl: "قیمتوں کا سلسلہ",
    home_stat3_val: "بروقت / لائیو",
    home_stat3_lbl: "فیڈز کی مطابقت",

    // News Ticker
    ticker_label: "ایم آئی سی اپڈیٹ",

    // Hero Carousel Slides
    hero_slide_title_1: "مصنوعی ذہانت پر مبنی قیمتوں کی پیشین گوئی اور فیصلہ ساز انٹیلی جنس",
    hero_slide_subtitle_1: "سیب اور چیری کی یومیہ تھوک منڈی قیمتوں کی جدید ڈیپ لرننگ ماڈلز کے ذریعے پیشین گوئی، تاکہ چنائی، ذخیرہ اندوزی اور ترسیل میں رہنمائی مل سکے۔",
    hero_slide_btn_primary_1: "براہِ راست پیشین گوئیاں دیکھیں",
    hero_slide_btn_secondary_1: "ارلی وارننگ رپورٹس دیکھیں",

    hero_slide_title_2: "ارلی وارننگ سسٹم اور قیمتوں میں اتار چڑھاؤ کا رسک ریڈار",
    hero_slide_subtitle_2: "علاقائی اور قومی تجارتی راستوں میں مارکیٹ کے اتار چڑھاؤ، رسد کے بحران اور قیمتوں کی غیر معمولی حرکات کی مسلسل نگرانی۔",
    hero_slide_btn_primary_2: "ارلی وارننگ رپورٹس دیکھیں",
    hero_slide_btn_secondary_2: "مارکیٹ استحکام رپورٹ",

    hero_slide_title_3: "براہِ راست اے پی ایم سی منڈی آمد اور ریل ٹائم مطابقت",
    hero_slide_subtitle_3: "15 سے زائد بڑی منڈیوں میں روزانہ کی آمد، تجارتی حجم، گریڈ کے مطابق قیمتیں اور بین الصوبائی تجارت کی باقاعدہ جانچ۔",
    hero_slide_btn_primary_3: "اے پی ایم سی منڈیاں دیکھیں",
    hero_slide_btn_secondary_3: "قیمتوں کی وصولی",

    hero_slide_title_4: "باغبانی انٹیلی جنس بلیٹنز اور پالیسی رپورٹس",
    hero_slide_subtitle_4: "سکواسٹ کی تحقیقی مطبوعات، ایچ اے ڈی پی پروجیکٹ بلیٹنز اور مارکیٹ کے مستند آؤٹ لک تک مکمل رسائی حاصل کریں۔",
    hero_slide_btn_primary_4: "مطبوعات ملاحظہ کریں",
    hero_slide_btn_secondary_4: "ہماری تحقیقی ٹیم",

    // Homepage Infographic Section
    home_infographic_badge: "بنیادی ڈھانچہ اور حل",
    home_infographic_title: "زرعی انٹیلی جنس فیصلوں کو کیسے بااختیار بناتی ہے",
    home_infographic_desc: "ڈیپ لرننگ نیورل نیٹ ورکس، براہِ راست اے پی ایم سی منڈی ڈیٹا اور ابتدائی انتباہی ریڈار کو عملی فیصلہ ساز آلات میں یکجا کرنا۔",

    // Homepage 4 Intelligence Cards
    home_card1_tag: "مصنوعی ذہانت اور نیورل نیٹ ورکس",
    home_card1_title: "سیب اور چیری کی قیمتوں کی پیشین گوئی",
    home_card1_desc: "19 سالہ یومیہ منڈی ریکارڈز پر تربیت یافتہ ڈیپ لرننگ ایل ایس ٹی ایم ماڈلز کے ذریعے مستقبل کی قیمتوں کا پیشگی تجزیہ۔",
    home_card1_meta: "ایل ایس ٹی ایم ماڈلز",
    home_card1_stat: "94.6% درستگی →",

    home_card2_tag: "خطرے اور انوملی کا سراغ",
    home_card2_title: "ارلی وارننگ اتار چڑھاؤ ریڈار",
    home_card2_desc: "قیمتوں میں اچانک کمی یا رسد کے بحران کی صورت میں کاشتکاروں کو پیشگی خبردار کرنے والا خودکار نظام۔",
    home_card2_meta: "شماریاتی انتباہ",
    home_card2_stat: "فعال الرٹس →",

    home_card3_tag: "ڈیٹا پائپ لائن",
    home_card3_title: "براہِ راست اے پی ایم سی منڈی سنکرونائزیشن",
    home_card3_desc: "15 سے زائد منڈیوں سے آمد، تجارتی حجم اور گریڈ کے مطابق روزانہ کے سرکاری اعداد و شمار کا خودکار اندراج۔",
    home_card3_meta: "15+ منڈیاں",
    home_card3_stat: "لائیو مطابقت →",

    home_card4_tag: "پالیسی اور فیصلہ ساز معاونت",
    home_card4_title: "ایچ اے ڈی پی تزویراتی رپورٹس اور دستاویزات",
    home_card4_desc: "کسانوں، تاجروں اور منصوبہ سازوں کے لیے باغبانی کموڈیٹی آؤٹ لک اور تحقیقی دستاویزات کی اشاعت۔",
    home_card4_meta: "ایچ اے ڈی پی پروجیکٹ 04",
    home_card4_stat: "رپورٹس دیکھیں →",

    // Publications Directory
    pub_page_title: "مطبوعات و کتب ڈائرکٹری",
    pub_page_desc: "سکواسٹ مارکیٹ انٹیلی جنس سیل کی جانب سے شائع کردہ تحقیقی بلیٹنز، تعلیمی کتب، مارکیٹ دستاویزات اور موسمی رپورٹس ملاحظہ فرمائیں۔",
    pub_search_placeholder: "رپورٹ یا مصنف تلاش کریں...",
    pub_tab_all: "تمام مطبوعات",
    pub_tab_outlooks: "کموڈیٹی آؤٹ لک",
    pub_tab_reports: "مارکیٹ انٹیلی جنس رپورٹس",
    pub_tab_papers: "تحقیقی مقالے",
    pub_tab_books: "کتب",
    pub_tab_chapters: "کتاب کے ابواب",
    pub_tab_policy: "پالیسی رپورٹس",
    pub_by: "از قلم",
    pub_view: "دیکھیں",
    pub_request_access: "رسائی کی درخواست",
    pub_empty_title: "کوئی مطبوعہ دستاویز نہیں ملی",
    pub_empty_desc: "آپ کی تلاش کے مطابق کوئی دستاویز دستیاب نہیں ہے۔ براہ کرم نئی تلاش کریں۔",

    // Markets Page
    markets_header_title: "اے پی ایم سی مارکیٹ انٹیلی جنس",
    markets_header_subtitle: "بڑی تھوک منڈیوں اور ٹرمینل زرعی منڈیوں کے شماریاتی تجزیے اور قیمتوں کا مکمل ریکارڈ۔",

    // EWS Page
    ews_title: "ارلی وارننگ سسٹم (EWS)",
    ews_subtitle: "کشمیری میوہ جات میں قیمتوں کے اتار چڑھاؤ اور ممکنہ خسارے کی پیشگی نشاندہی کرنے والا جدید نظام۔",
    ews_tab_cherry: "🍒 چیری ای ڈبلیو ایس (ڈیمو 2026)",
    ews_tab_apple: "🍎 سیب ای ڈبلیو ایس (عنقریب)",

    // Forecasts Page
    forecast_update_badge: "ایم آئی سی اپڈیٹ",
    forecast_update_text: "🍎 مارکیٹنگ سیزن 2026-27 کے لیے مصنوعی ذہانت پر مبنی سیب کی قیمتوں کی پیشین گوئیاں اب لائیو دستیاب ہیں۔",
    forecast_tab_realtime: "بروقت پیشین گوئیاں",
    forecast_tab_tool: "سمارٹ فورکاسٹنگ ٹول",
    forecast_tab_mandi: "براہِ راست منڈی ڈیٹا",
    forecast_tab_ledger: "باغبان لیجر (اعدادوشمار)",

    // Team Page
    team_badge: "ایچ اے ڈی پی پروجیکٹ اراکین",
    team_title: "ہماری ٹیم سے ملیں",
    team_subtitle: "سکواسٹ-کشمیر میں زرعی قیمتوں کی پیشین گوئی اور مارکیٹ انٹیلی جنس ماڈلز کو چلانے والے تحقیقی و تکنیکی ماہرین۔",
    team_pi_title: "پرنسپل انویسٹی گیٹرز",

    // Commodity Outlooks List
    outlooks_title: "کموڈیٹی آؤٹ لک",
    outlooks_subtitle: "کشمیر کی اہم باغبانی پیداوار کے لیے منڈیوں میں آمد، تھوک قیمتوں اور مستقبل کی پیشین گوئیوں پر تفصیلی رپورٹس ملاحظہ کریں۔",
    outlooks_empty: "کوئی کموڈیٹی آؤٹ لک دستیاب نہیں ہے۔",

    // About Us - Hero & KPIs
    about_hero_badge_text: "ایچ اے ڈی پی #04: مرکز کے زیر انتظام جموں و کشمیر میں زرعی مارکیٹنگ کا استحکام",
    about_hero_title_v2: "مارکیٹ انٹیلی جنس کے ذریعے جموں و کشمیر کی باغبانی معیشت کو بااختیار بنانا",
    about_hero_subtitle_v2: "سکواسٹ-کشمیر میں مارکیٹ انٹیلی جنس سیل (MIC) جموں و کشمیر میں زرعی مارکیٹنگ کو جدید خطوط پر استوار کرنے کا ڈیجیٹل مرکز ہے۔ ڈیپ لرننگ نیورل نیٹ ورکس، براہ راست منڈی ٹیلی میٹری اور پیشگی انتباہی نظام کے ذریعے، ہم کسانوں اور فیصلہ سازوں کو بروقت اور شفاف رہنمائی فراہم کرتے ہیں۔",
    about_kpi1_val: "19+",
    about_kpi1_lbl: "سالوں کا تاریخی قیمت ڈیٹا",
    about_kpi2_val: "15+",
    about_kpi2_lbl: "منسلک اے پی ایم سی منڈیاں",
    about_kpi3_val: "94.6%",
    about_kpi3_lbl: "پیشین گوئی کی درستگی",
    about_kpi4_val: "6+",
    about_kpi4_lbl: "تجارتی فصلی اقسام",
    about_kpi5_val: "100%",
    about_kpi5_lbl: "باغبانوں کے لیے کھلی رسائی",

    // About Us - Mission & Mandate
    about_mission_badge: "مشن اور پس منظر",
    about_mission_heading: "ایچ اے ڈی پی پروجیکٹ #04 کے تحت ادارہ جاتی مینڈیٹ",
    about_mission_p1: "ہولیسٹک ایگریکلچر ڈیولپمنٹ پروگرام (HADP پروجیکٹ #04) کے تحت قائم کردہ، مارکیٹ انٹیلی جنس سیل (MIC) حکومت جموں و کشمیر کے تعاون سے سکواسٹ-کشمیر، شالیمار میں واقع ایک فلیگ شپ اقدام ہے۔",
    about_mission_p2: "دہائیوں سے جموں و کشمیر کا باغبانی شعبہ قیمتوں کی غیر یقینی صورتحال اور منڈی کے اتار چڑھاؤ کا شکار رہا ہے۔ ایم آئی سی جدید کمپیوٹیشنل ٹیکنالوجی کے ذریعے اس تاریخی خلا کو پر کر رہا ہے۔",
    about_mission_p3: "15 سے زائد منڈیوں کے روزانہ آمد و قیمت کے اعداد و شمار کو یکجا کر کے، ہمارے جدید ماڈلز کئی ہفتے قبل قیمتوں کے رجحان کی پیشین گوئی کرتے ہیں جس سے کاشتکاروں کو سودے بازی کی قوت ملتی ہے۔",
    about_mandate_title: "ایچ اے ڈی پی #04: مرکز کے زیر انتظام جموں و کشمیر میں زرعی مارکیٹنگ کا استحکام",
    about_mandate_sub: "حکومت جموں و کشمیر",
    about_mandate_item1: "علاقائی اور قومی منڈیوں میں بروقت قیمتوں اور آمد کی نگرانی",
    about_mandate_item2: "سیب اور چیری کی اقسام کے لیے جدید ڈیپ لرننگ قیمتوں کی پیشن گوئی",
    about_mandate_item3: "مارکیٹ کے اتار چڑھاؤ اور قیمتوں میں اچانک کمی کو بھانپنے کے لیے ارلی وارننگ سسٹم",
    about_mandate_item4: "باغبانوں کے لیے فصل کٹائی کے بعد سی اے کولڈ اسٹوریج اور لاجسٹکس سپورٹ",
    about_mandate_item5: "ہفتہ وار پالیسی بریفز اور سائنسی مارکیٹ انٹیلی جنس بلیٹنز",

    // About Us - Pillars
    about_pillars_section_badge: "حکمت عملی کے ستون",
    about_pillars_section_title: "زرعی مارکیٹنگ انٹیلی جنس کے چھ بنیادی ستون",
    about_pillars_section_desc: "باغبانی ویلیو چین میں بہترین قیمتوں کے حصول کے لیے جامع تکنیکی اور ادارہ جاتی فریم ورک۔",
    about_pillar1_title: "ڈیپ لرننگ قیمتوں کی پیشین گوئی",
    about_pillar1_desc: "19 سال سے زائد تاریخی ریکارڈز پر تربیت یافتہ جدید نیورل نیٹ ورکس جو مختلف سیزنز میں قیمتوں کے ممکنہ رجحانات واضح کرتے ہیں۔",
    about_pillar1_metric: "94.6% ٹیسٹ درستگی",
    about_pillar1_btn: "پیشین گوئیاں دیکھیں",
    about_pillar2_title: "بروقت اے پی ایم سی منڈی ٹیلی میٹری",
    about_pillar2_desc: "پرمپورہ، شوپیاں، سوپور، نروال اور آزاد پور دہلی سے روزانہ کی آمد اور ماڈل ریٹس جمع کرنے کا خودکار نظام۔",
    about_pillar2_metric: "15+ منڈیوں کی نگرانی",
    about_pillar2_btn: "منڈی ڈیٹا دیکھیں",
    about_pillar3_title: "ارلی وارننگ سسٹم (EWS)",
    about_pillar3_desc: "کسانوں کے منافع کے تحفظ کے لیے قیمتوں میں اچانک گراوٹ اور غیر معمولی اتار چڑھاؤ کو بروقت بھانپنے والا نظام۔",
    about_pillar3_metric: "بروقت خطرے کے الرٹس",
    about_pillar3_btn: "ای ڈبلیو ایس دیکھیں",
    about_pillar4_title: "سائنسی مارکیٹ بلیٹنز",
    about_pillar4_desc: "مارکیٹ میں طلب و رسد کے عدم توازن اور معاشی رجحانات کو کسانوں کے لیے قابل عمل مشوروں میں ڈھالنے والے ہفتہ وار بلیٹنز۔",
    about_pillar4_metric: "ہفتہ وار بلیٹنز",
    about_pillar4_btn: "مطبوعات پڑھیں",
    about_pillar5_title: "فصل کے بعد سی اے اسٹوریج اینالیٹکس",
    about_pillar5_desc: "آف سیزن پریمیم قیمتوں کی پیشین گوئی کی بنیاد پر کولڈ اسٹوریج سے پھل نکالنے کے بہترین وقت کا تعین کرنے والے آلات۔",
    about_pillar5_metric: "سی اے اسٹوریج کوریج",
    about_pillar5_btn: "مزید جانیں",
    about_pillar6_title: "پالیسی اور شراکت داروں کی معاونت",
    about_pillar6_desc: "حکومتی محکموں، پالیسی سازوں اور کاشتکار تنظیموں کے لیے ڈیٹا پر مبنی رپورٹس اور فیصلہ ساز ڈیش بورڈز۔",
    about_pillar6_metric: "ایچ اے ڈی پی گورننس",
    about_pillar6_btn: "مینڈیٹ دیکھیں",

    // About Us - Pipeline
    about_pipeline_section_badge: "ڈیٹا فریم ورک",
    about_pipeline_section_title: "ہمارا انٹیلی جنس پائپ لائن کیسے کام کرتا ہے",
    about_pipeline_section_desc: "منڈی کے خام اعداد و شمار سے لے کر کسانوں کے لیے براہِ راست مشورے تک کے چار خودکار مراحل۔",
    about_step1_title: "1. کثیر منڈی ڈیٹا کا حصول",
    about_step1_desc: "کشمیر، جموں اور قومی ٹرمینل منڈیوں کے سرکاری پورٹلز سے یومیہ آمد اور قیمتوں کی ہم آہنگی۔",
    about_step2_title: "2. تطہیر اور انوملی فلٹرنگ",
    about_step2_desc: "سیب اور چیری کے 19 سالہ تاریخی ریکارڈز سے شماریاتی غلطیوں کی درستگی اور قیمتوں کا تناسب۔",
    about_step3_title: "3. ڈیپ نیورل فورکاسٹ انجن",
    about_step3_desc: "طلب و رسد اور موسمی اثرات کا تخمینہ لگا کر مستقبل کی قیمتوں کا درست تجزیہ کرنا۔",
    about_step4_title: "4. کسانوں تک رہنمائی کی ترسیل",
    about_step4_desc: "آسان ویب پورٹل، پیشگی انتباہات اور معلوماتی بلیٹنز کے ذریعے کسانوں اور اداروں تک رسائی۔",

    // About Us - Stakeholders
    about_stakeholders_section_badge: "جامع اثرات",
    about_stakeholders_section_title: "ویلیو چین کے ہر شعبے کی خود مختاری",
    about_stakeholders_section_desc: "باغبانوں، کاشتکار تنظیموں، تاجروں اور انتظامی پالیسی سازوں کے لیے باوقار خدمات کی فراہمی۔",
    about_stakeholder1_badge: "کاشتکار اور باغبان",
    about_stakeholder1_title: "میوہ کاشتکار اور باغبان",
    about_stakeholder1_desc: "منصفانہ قیمتوں کا تعین، بہترین وقت پر چنائی اور مندی کی مجبوری سے تحفظ۔",
    about_stakeholder2_badge: "کاشتکار انجمنیں",
    about_stakeholder2_title: "ایف پی اوز اور کوآپریٹیوز",
    about_stakeholder2_desc: "اجتماعی مارکیٹنگ، کولڈ اسٹوریج کی منصوبہ بندی اور براہِ راست بڑی منڈیوں تک رسائی۔",
    about_stakeholder3_badge: "تجارت و لاجسٹکس",
    about_stakeholder3_title: "تاجر اور سی اے آپریٹرز",
    about_stakeholder3_desc: "طلب کی پیشین گوئی، بین الصوبائی منڈیوں میں منافع بخش مواقع اور اسٹاک کی موثر گردش۔",
    about_stakeholder4_badge: "حکومت و انتظامیہ",
    about_stakeholder4_title: "پالیسی ساز اور یو ٹی انتظامیہ",
    about_stakeholder4_desc: "منڈی میں غیر معمولی رسد کے پیشگی انتباہات اور ایچ اے ڈی پی کے تحت شواہد پر مبنی منصوبہ بندی۔",

    // About Us - Leadership
    about_vc_badge_text: "قیادت کا ویژن",
    about_vc_title_v2: "زرعی انقلاب کے لیے سرپرستِ اعلیٰ کا وژن",
    about_vc_quote_v2: "زرعی تحقیق کا اصل معیار اس میں ہے کہ وہ سائنسی بصیرت کو کسانوں کی معاشی خوشحالی میں تبدیل کرے۔ ایچ اے ڈی پی پروجیکٹ #04 کے ذریعے مارکیٹ انٹیلی جنس سیل ڈیٹا سائنس کو زمینی حقائق کے ساتھ جوڑ رہا ہے۔",
    about_vc_name_text: "پروفیسر (ڈاکٹر) نذیر احمد گنائی",
    about_vc_role_text: "معزز وائس چانسلر، سکواسٹ-کشمیر | سرپرست، ایچ اے ڈی پی",

    // About Us - Quick Access Deck
    about_cta_deck_title: "کیا آپ لائیو مارکیٹ انٹیلی جنس دیکھنے کے لیے تیار ہیں؟",
    about_cta_deck_desc: "ہمارے جدید پیشین گوئی ماڈلز، لائیو منڈی ڈیش بورڈز اور ارلی وارننگ سسٹمز سے ابھی فائدہ اٹھائیں۔",
    about_cta1_btn: "قیمتوں کی لائیو پیشین گوئی",
    about_cta2_btn: "اے پی ایم سی منڈی ڈیٹا",
    about_cta3_btn: "ارلی وارننگ ریڈار",
    about_cta4_btn: "مطبوعات ڈائرکٹری",
    about_cta5_btn: "ہماری ٹیم سے ملیں",

    // Common Buttons & Actions
    btn_read_more: "مزید پڑھیں",
    btn_explore_forecasts: "براہِ راست پیشن گوئی دیکھیں",
    btn_view_ews: "ای ڈبلیو ایس رپورٹس دیکھیں",
    btn_download_pdf: "پی ڈی ایف ڈاؤن لوڈ کریں",
    btn_view_details: "تفصیلات دیکھیں",
    btn_see_all_markets: "تمام منڈیاں دیکھیں",
    btn_save: "تبدیلیاں محفوظ کریں",
    btn_cancel: "منسوخ کریں",

    // Footer
    footer_logo_text: "ایم آئی سی سکواسٹ-کے",
    footer_desc_text: "مارکیٹ انٹیلی جنس سیل، سکواسٹ-کشمیر۔ ایچ اے ڈی پی پروجیکٹ #04 کے تحت مصنوعی ذہانت پر مبنی قیمتوں کی پیشن گوئی اور کسانوں کے لیے مشاورتی خدمات۔",
    footer_address: "فیکلٹی آف ہارٹیکلچر، سکواسٹ-کشمیر، شالیمار، سرینگر، جموں و کشمیر 190025",
    footer_email: "mic@skuastkashmir.ac.in",
    footer_title_nav: "رہنمائی",
    footer_nav_home: "صفحہ اول",
    footer_nav_about: "ہمارے متعلق",
    footer_nav_apmcs: "اے پی ایم سی تجزیہ",
    footer_nav_outlooks: "کموڈیٹی آؤٹ لک",
    footer_nav_intel: "مارکیٹ انٹیلی جنس",
    footer_nav_team: "ہماری ٹیم",
    footer_title_apmcs: "اے پی ایم سی منڈیاں",
    footer_apmc_ganderbal: "گاندربل منڈی",
    footer_apmc_narwal: "نروال منڈی جموں",
    footer_apmc_pulwama: "پرچھو منڈی پلوامہ",
    footer_apmc_shopian: "شوپیاں فروٹ منڈی",
    footer_title_research: "تحقیق اور ڈیٹا",
    footer_research_pub: "مطبوعات ڈائرکٹری",
    footer_research_bulletin: "ہفتہ وار بلیٹنز",
    footer_research_hadp: "ایچ اے ڈی پی پروجیکٹس",
    footer_copyright: "© 2026 مارکیٹ انٹیلی جنس سیل (ایچ اے ڈی پی پروجیکٹ #04)۔ جملہ حقوق محفوظ ہیں۔",
    footer_hosting: "سکواسٹ-کشمیر، شالیمار کیمپس، سرینگر، جموں و کشمیر میں میزبانی۔"
  }
};
