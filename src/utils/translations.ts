export type SupportedLanguage = 'en' | 'hi' | 'ur';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
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

    // Homepage Infographic Section
    home_infographic_badge: "Core Architecture & Solutions",
    home_infographic_title: "How Agri-Intelligence Empowers Decisions",
    home_infographic_desc: "Integrating deep learning neural networks, real-time APMC mandi streams, and early warning anomaly radars into actionable decision tools.",

    // About Us - Mandate Card
    about_mandate_title: "HADP #04: Strengthening Agricultural Marketing in UT of Jammu and Kashmir",
    about_mandate_sub: "Government of Jammu & Kashmir",
    about_mandate_item1: "Real-time price & arrival tracking across regional & national Mandis",
    about_mandate_item2: "Deep-learning price forecasts for Apple & Cherry varieties",
    about_mandate_item3: "Early Warning System (EWS) to detect market volatility and price crashes",
    about_mandate_item4: "Post-harvest CA storage & logistics decision support for orchardists",
    about_mandate_item5: "Weekly policy briefs & scientific market intelligence bulletins",

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
    footer_title_research: "Research & Data",
    footer_research_pub: "Publications Directory",
    footer_research_bulletin: "Weekly Bulletins",
    footer_research_hadp: "HADP Projects",
    footer_copyright: "© 2026 Market Intelligence Cell (HADP Project #04). All rights reserved.",
    footer_hosting: "Hosted at SKUAST-Kashmir, Shalimar Campus, Srinagar, J&K."
  },

  hi: {
    // Top Bar & Institutional Lockup
    univ_name: "शेर-ए-कश्मीर कृषि विज्ञान एवं प्रौद्योगिकी विश्वविद्यालय कश्मीर",
    hadp_tag: "एचएडीपी #04",
    hadp_statement: "केंद्र शासित प्रदेश जम्मू और कश्मीर में कृषि विपणन का सुदृढ़ीकरण",
    mic_tag: "(मार्केट इंटेलिजेंस सेल)",
    admin_portal_btn: "व्यवस्थापक पोर्टल",
    light_theme: "लाइट थीम",
    dark_theme: "डार्क थीम",
    warm_theme: "वार्म थीम",
    select_language: "भाषा",

    // Brand
    header_brand_name: "एमआईसी स्कुआस्ट-के",
    header_brand_sub: "मार्केट इंटेलिजेंस सेल",

    // Navigation
    nav_home: "होम",
    nav_about: "हमारे बारे में",
    nav_ews: "ईडब्ल्यूएस रिपोर्ट",
    nav_apmcs: "एपीएमसी मंडियां",
    nav_publications: "प्रकाशन",
    nav_team: "हमारी टीम",
    nav_market_intel: "लाइव पूर्वानुमान देखें",

    // Homepage Floating Stats
    home_stat1_val: "15+",
    home_stat1_lbl: "एपीएमसी मंडियां",
    home_stat2_val: "19 वर्ष",
    home_stat2_lbl: "मूल्य श्रृंखला",
    home_stat3_val: "वास्तविक समय",
    home_stat3_lbl: "डेटा सिंक",

    // Homepage Infographic Section
    home_infographic_badge: "मुख्य संरचना और समाधान",
    home_infographic_title: "कृषि-खुफिया निर्णय लेने में कैसे सक्षम बनाती है",
    home_infographic_desc: "डीप लर्निंग न्यूरल नेटवर्क, रीयल-टाइम एपीएमसी मंडी स्ट्रीम और पूर्व चेतावनी राडार को व्यावहारिक निर्णय उपकरणों में एकीकृत करना।",

    // About Us - Mandate Card
    about_mandate_title: "एचएडीपी #04: केंद्र शासित प्रदेश जम्मू और कश्मीर में कृषि विपणन का सुदृढ़ीकरण",
    about_mandate_sub: "जम्मू और कश्मीर सरकार",
    about_mandate_item1: "क्षेत्रीय और राष्ट्रीय मंडियों में वास्तविक समय मूल्य और आवक ट्रैकिंग",
    about_mandate_item2: "सेब और चेरी की किस्मों के लिए डीप-लर्निंग मूल्य पूर्वानुमान",
    about_mandate_item3: "बाजार की अस्थिरता और कीमतों में गिरावट का पता लगाने के लिए पूर्व चेतावनी प्रणाली (EWS)",
    about_mandate_item4: "बागवानों के लिए फसल कटाई के बाद सीए भंडारण और लॉजिस्टिक्स निर्णय समर्थन",
    about_mandate_item5: "साप्ताहिक नीतिगत विवरण और वैज्ञानिक बाजार आसूचना बुलेटिन",

    // Common Buttons & Actions
    btn_read_more: "और पढ़ें",
    btn_explore_forecasts: "लाइव पूर्वानुमान देखें",
    btn_view_ews: "ईडब्ल्यूएस रिपोर्ट देखें",
    btn_download_pdf: "पीडीएफ डाउनलोड करें",
    btn_view_details: "विवरण देखें",
    btn_see_all_markets: "सभी मंडियां देखें",
    btn_save: "परिवर्तन सहेजें",
    btn_cancel: "रद्द करें",

    // Footer
    footer_logo_text: "एमआईसी स्कुआस्ट-के",
    footer_desc_text: "मार्केट इंटेलिजेंस सेल, स्कुआस्ट-कश्मीर। एचएडीपी प्रोजेक्ट #04 के तहत एआई-संचालित मूल्य पूर्वानुमान और किसान-प्रथम सलाह के साथ कृषि विपणन में बदलाव।",
    footer_address: "बागवानी संकाय, स्कुआस्ट-कश्मीर, शालीमार, श्रीनगर, जम्मू और कश्मीर 190025",
    footer_email: "mic@skuastkashmir.ac.in",
    footer_title_nav: "नेविगेशन",
    footer_nav_home: "होम",
    footer_nav_about: "हमारे बारे में",
    footer_nav_apmcs: "एपीएमसी विश्लेषण",
    footer_nav_outlooks: "कमोडिटी आउटलुक",
    footer_nav_intel: "मार्केट इंटेलिजेंस",
    footer_nav_team: "हमारी टीम",
    footer_title_apmcs: "एपीएमसी मंडियां",
    footer_title_research: "अनुसंधान और डेटा",
    footer_research_pub: "प्रकाशन निर्देशिका",
    footer_research_bulletin: "साप्ताहिक बुलेटिन",
    footer_research_hadp: "एचएडीपी परियोजनाएं",
    footer_copyright: "© 2026 मार्केट इंटेलिजेंस सेल (एचएडीपी प्रोजेक्ट #04)। सर्वाधिकार सुरक्षित।",
    footer_hosting: "स्कुआस्ट-कश्मीर, शालीमार कैंपस, श्रीनगर, जम्मू और कश्मीर में होस्ट किया गया।"
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

    // Homepage Infographic Section
    home_infographic_badge: "بنیادی ڈھانچہ اور حل",
    home_infographic_title: "زرعی انٹیلی جنس فیصلوں کو کیسے بااختیار بناتی ہے",
    home_infographic_desc: "ڈیپ لرننگ نیورل نیٹ ورکس، براہِ راست اے پی ایم سی منڈی ڈیٹا اور ابتدائی انتباہی ریڈار کو عملی فیصلہ ساز آلات میں یکجا کرنا۔",

    // About Us - Mandate Card
    about_mandate_title: "ایچ اے ڈی پی #04: مرکز کے زیر انتظام جموں و کشمیر میں زرعی مارکیٹنگ کا استحکام",
    about_mandate_sub: "حکومت جموں و کشمیر",
    about_mandate_item1: "علاقائی اور قومی منڈیوں میں بروقت قیمتوں اور آمد کی نگرانی",
    about_mandate_item2: "سیب اور چیری کی اقسام کے لیے جدید ڈیپ لرننگ قیمتوں کی پیشن گوئی",
    about_mandate_item3: "مارکیٹ کے اتار چڑھاؤ اور قیمتوں میں اچانک کمی کو بھانپنے کے لیے ارلی وارننگ سسٹم",
    about_mandate_item4: "باغبانوں کے لیے فصل کٹائی کے بعد سی اے کولڈ اسٹوریج اور لاجسٹکس سپورٹ",
    about_mandate_item5: "ہفتہ وار پالیسی بریفز اور سائنسی مارکیٹ انٹیلی جنس بلیٹنز",

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
    footer_title_research: "تحقیق اور ڈیٹا",
    footer_research_pub: "مطبوعات ڈائرکٹری",
    footer_research_bulletin: "ہفتہ وار بلیٹنز",
    footer_research_hadp: "ایچ اے ڈی پی پروجیکٹس",
    footer_copyright: "© 2026 مارکیٹ انٹیلی جنس سیل (ایچ اے ڈی پی پروجیکٹ #04)۔ جملہ حقوق محفوظ ہیں۔",
    footer_hosting: "سکواسٹ-کشمیر، شالیمار کیمپس، سرینگر، جموں و کشمیر میں میزبانی۔"
  }
};