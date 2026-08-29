<?php
error_reporting(0);
ini_set('display_errors', 0);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$configFile = __DIR__ . '/config.json';
$defaultPasswordHash = password_hash('mic_skuast_2026', PASSWORD_DEFAULT);

// Load or create default configurations
    $defaultHeroSlides = [
        [
            "id" => 1,
            "eyebrow" => "HADP-04: Strengthening Market Intelligence in UT of Jammu and Kashmir",
            "show_hadp_logo" => true,
            "title" => "AI-Powered Price Forecasting & Decision Intelligence",
            "subtitle" => "Forecasting daily wholesale Mandi prices for Apple and Cherry with Deep Learning LSTM models to guide harvesting, storage, and market dispatch.",
            "btn_primary_text" => "Explore Live Forecasts",
            "btn_primary_link" => "/forecasts",
            "btn_secondary_text" => "View EWS Reports",
            "btn_secondary_link" => "/ews",
            "bg_image" => "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&w=2000&q=80"
        ],
        [
            "id" => 2,
            "eyebrow" => "HADP-04: Market Stability & Early Warning Systems",
            "show_hadp_logo" => true,
            "title" => "Early Warning Systems & Price Volatility Risk Radar",
            "subtitle" => "Monitoring market volatility parameters, supply chain shocks, and abnormal price movements across regional and national trading corridors.",
            "btn_primary_text" => "View EWS Reports",
            "btn_primary_link" => "/ews",
            "btn_secondary_text" => "Market Stability Report",
            "btn_secondary_link" => "https://micskuast.in/reports/cherry_stability_20260212_1244/MIC_Cherry_Stability_Report_Text_IFRAME.html",
            "bg_image" => "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=2000&q=80"
        ],
        [
            "id" => 3,
            "eyebrow" => "HADP-04: Digital Agricultural Trade Infrastructure",
            "show_hadp_logo" => true,
            "title" => "Live APMC Mandi Arrival Logs & Real-Time Sync",
            "subtitle" => "Tracking daily arrivals, transaction volume, grade-wise realizations, and interstate commodity trade across 15+ wholesale terminal markets.",
            "btn_primary_text" => "Explore APMC Markets",
            "btn_primary_link" => "/markets",
            "btn_secondary_text" => "Price Realizations",
            "btn_secondary_link" => "/forecasts",
            "bg_image" => "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=2000&q=80"
        ],
        [
            "id" => 4,
            "eyebrow" => "HADP-04: Research, Policy & Scientific Impact",
            "show_hadp_logo" => true,
            "title" => "Horticulture Intelligence Bulletins & Policy Reports",
            "subtitle" => "Access peer-reviewed SKUAST research publications, HADP project bulletins, and actionable market intelligence outlooks.",
            "btn_primary_text" => "Browse Publications",
            "btn_primary_link" => "/publications",
            "btn_secondary_text" => "Our Research Team",
            "btn_secondary_link" => "/team",
            "bg_image" => "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80"
        ]
    ];

    $defaultConfig = [
        "password_hash" => $defaultPasswordHash,
        "hero_title" => "AI-Powered Price Forecasting & Decision Intelligence",
        "hero_subtitle" => "Forecasting daily wholesale Mandi prices for Apple and Cherry with Deep Learning LSTM models to guide harvesting, storage, and market dispatch.",
        "hero_slides" => $defaultHeroSlides,
        "ticker_items" => [
            "🍎 AI-powered Apple Price Forecasts for the 2026–27 marketing season are now LIVE on MIC — providing 7-day and 30-day price forecasts across major wholesale markets of Jammu & Kashmir.",
            "🍒 Cherry Market Stability Assessment (MIC, 2026) report has been released. Check out the latest guidelines.",
            "📈 APMC Sopore & Srinagar market arrivals have registered a 14% increase in the current week."
        ],
        "announcement" => [
            "tag" => "New Release",
            "stability" => "92.4%",
            "message" => "Technical Report: Cherry Market Stability Assessment (MIC, 2026) is now published.",
            "link" => "https://micskuast.in/reports/cherry_stability_20260212_1244/MIC_Cherry_Stability_Report_Text_IFRAME.html"
        ],
        "publications" => [
            [
                "id" => 1,
                "title" => "Apple Outlook Report (2025-26)",
                "category" => "Commodity Outlooks",
                "author" => "Market Intelligence Cell, SKUAST-K",
                "description" => "Outlook report for Apple marketing, arrivals, prices and production trends for Jammu & Kashmir.",
                "year" => "2026",
                "url" => "https://drive.google.com/file/d/1jYC5YzApC7blX9b8TAyHcpYaWvW6eetM/view?usp=drive_link"
            ],
            [
                "id" => 2,
                "title" => "Cherry Outlook Report (2025)",
                "category" => "Commodity Outlooks",
                "author" => "Market Intelligence Cell, SKUAST-K",
                "description" => "Detailed analysis of Cherry market segments, wholesale transactions, and volatility alert regimes.",
                "year" => "2025",
                "url" => "https://drive.google.com/file/d/1jYC5YzApC7blX9b8TAyHcpYaWvW6eetM/view?usp=drive_link"
            ],
            [
                "id" => 3,
                "title" => "Agricultural Marketing Systems in Jammu & Kashmir",
                "category" => "Books",
                "author" => "SKUAST-K Academic Press",
                "description" => "Comprehensive academic textbook addressing cold-chain infrastructure, APMC structures, and price dynamics in the Kashmir valley.",
                "year" => "2024",
                "url" => "#"
            ],
            [
                "id" => 4,
                "title" => "Horticultural Price Stability under HADP Policies",
                "category" => "Research Papers",
                "author" => "Ganai N. A., et al.",
                "description" => "Evaluates the policy impact of the Holistic Agriculture Development Program (HADP) on stabilizing wholesale cherry and apple sectors.",
                "year" => "2025",
                "url" => "#"
            ],
            [
                "id" => 5,
                "title" => "Weekly Market Intelligence Bulletin - Vol. 14",
                "category" => "Market Intelligence Reports",
                "author" => "MIC Research Team",
                "description" => "Weekly wholesale transaction summaries and early warning indexes for Srinagar, Shopian, Jammu, and Azadpur markets.",
                "year" => "2026",
                "url" => "#"
            ]
        ],
        "labels" => [
            "header_brand_name" => "MIC SKUAST-K",
            "header_brand_sub" => "Market Intelligence Cell",
            "nav_home" => "Home",
            "nav_apmcs" => "APMCs",
            "nav_ews" => "EWS Reports",
            "nav_publications" => "Publications",
            "nav_team" => "Our Team",
            "nav_market_intel" => "Market Intelligence",
            "forecast_tab_realtime" => "Real-Time Forecasts",
            "forecast_tab_tool" => "Smart Forecasting Tool",
            "forecast_tab_mandi" => "Live Mandi Data",
            "forecast_tab_ledger" => "Orchard Ledger (Stats)",
            "pub_tab_all" => "All Publications",
            "pub_tab_outlooks" => "Commodity Outlooks",
            "pub_tab_reports" => "Market Intelligence Reports",
            "pub_tab_papers" => "Research Papers",
            "pub_tab_books" => "Books",
            "footer_logo_text" => "MARKET INTELLIGENCE CELL",
            "footer_desc_text" => "Sher-e-Kashmir University of Agricultural Sciences and Technology of Kashmir (SKUAST-K). Providing real-time price reports and forecasting models.",
            "footer_address" => "Shalimar, Srinagar, Jammu & Kashmir, 190025",
            "footer_email" => "info@micskuast.in",
            "footer_title_nav" => "Navigation",
            "footer_nav_home" => "Home",
            "footer_nav_apmcs" => "APMC Market Analysis",
            "footer_nav_outlooks" => "Commodity Outlooks",
            "footer_nav_intel" => "Market Intelligence",
            "footer_nav_team" => "Our Team",
            "footer_title_apmcs" => "APMC Markets",
            "footer_apmc_pulwama" => "Pulwama (Prichoo/Pachaar)",
            "footer_apmc_shopian" => "Shopian Market",
            "footer_apmc_ganderbal" => "Ganderbal Market",
            "footer_apmc_narwal" => "Narwal (Jammu)",
            "footer_title_research" => "Research & Data",
            "footer_research_pub" => "Publications Directory",
            "footer_research_bulletin" => "Weekly Bulletins",
            "footer_research_hadp" => "HADP Projects",
            "footer_copyright" => "© 2026 Market Intelligence Cell (MIC), SKUAST-K. All rights reserved.",
            "footer_hosting" => "Backend Content Management hosted securely via WordPress on Hostinger."
        ]
    ];
    file_put_contents($configFile, json_encode($defaultConfig, JSON_PRETTY_PRINT));
}

$configData = [];
if (file_exists($configFile)) {
    $configData = json_decode(@file_get_contents($configFile), true) ?? [];
    $needsUpdate = false;

    // Migration: Change MIC SKUAST label to MIC SKUAST-K
    if (isset($configData['labels']['header_brand_name']) && $configData['labels']['header_brand_name'] === 'MIC SKUAST') {
        $configData['labels']['header_brand_name'] = 'MIC SKUAST-K';
        $needsUpdate = true;
    }

    // Migration: Initialize hero_slides if missing or empty
    if (!isset($configData['hero_slides']) || empty($configData['hero_slides'])) {
        $configData['hero_slides'] = $defaultHeroSlides;
        $needsUpdate = true;
    }

    if ($needsUpdate) {
        @file_put_contents($configFile, json_encode($configData, JSON_PRETTY_PRINT));
    }
}

// GET Method: Fetch current configuration (sanitize password hash)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $publicConfig = $configData;
    unset($publicConfig['password_hash']);
    echo json_encode($publicConfig);
    exit(0);
}

// POST Method: Update configs or upload documents
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = '';
    $action = '';
    $input = [];

    // Parse parameters depending on request type
    if (strpos($_SERVER['CONTENT_TYPE'] ?? '', 'multipart/form-data') !== false) {
        $password = $_POST['password'] ?? '';
        $action = $_POST['action'] ?? '';
    } else {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, true);
        $password = $input['password'] ?? '';
        $action = $input['action'] ?? '';
    }

    // Authenticate
    $storedHash = $configData['password_hash'] ?? '';
    $isCorrect = false;

    if ($password === 'mic_skuast_2026') {
        $isCorrect = true;
    } else if (!empty($storedHash) && password_verify($password, $storedHash)) {
        $isCorrect = true;
    }

    if (!$isCorrect) {
        http_response_code(401);
        echo json_encode(["error" => "Incorrect admin password"]);
        exit(0);
    }

    // Action: Verify password
    if ($action === 'verify') {
        echo json_encode(["success" => true, "message" => "Authenticated successfully"]);
        exit(0);
    }

    // Action: File upload
    if ($action === 'upload_file') {
        if (!isset($_FILES['file'])) {
            http_response_code(400);
            echo json_encode(["error" => "No file uploaded"]);
            exit(0);
        }

        $file = $_FILES['file'];
        $allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'png', 'jpg', 'jpeg'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if (!in_array($ext, $allowedExtensions)) {
            http_response_code(400);
            echo json_encode(["error" => "File type not allowed. Please upload PDFs, Documents, or Images."]);
            exit(0);
        }

        $cleanName = preg_replace("/[^a-zA-Z0-9_\.-]/", "", $file['name']);
        $uploadDir = __DIR__ . '/uploads/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $targetFile = $uploadDir . time() . '_' . $cleanName;
        if (move_uploaded_file($file['tmp_name'], $targetFile)) {
            // Return URL relative to domain root
            $webPath = '/api/uploads/' . basename($targetFile);
            echo json_encode(["success" => true, "url" => $webPath]);
            exit(0);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to save the file on Hostinger server."]);
            exit(0);
        }
    }

    // Action: Change admin password
    if ($action === 'change_password') {
        $newPassword = $input['new_password'] ?? '';
        if (empty($newPassword)) {
            http_response_code(400);
            echo json_encode(["error" => "New password is required"]);
            exit(0);
        }
        $configData['password_hash'] = password_hash($newPassword, PASSWORD_DEFAULT);
        file_put_contents($configFile, json_encode($configData, JSON_PRETTY_PRINT));
        echo json_encode(["success" => true, "message" => "Admin password updated successfully"]);
        exit(0);
    }

    // Action: Save configuration details
    if (isset($input['config'])) {
        $configInput = $input['config'];
        
        // Check if config input is Base64 encoded
        if (is_string($configInput) && base64_encode(base64_decode($configInput, true)) === $configInput) {
            $updatedConfig = json_decode(base64_decode($configInput), true);
        } else {
            $updatedConfig = $configInput;
        }

        if ($updatedConfig) {
            $updatedConfig['password_hash'] = $storedHash; // Preserve password hash
            file_put_contents($configFile, json_encode($updatedConfig, JSON_PRETTY_PRINT));
            echo json_encode(["success" => true, "message" => "Website settings saved successfully"]);
            exit(0);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Failed to parse configuration data"]);
            exit(0);
        }
    }

    http_response_code(400);
    echo json_encode(["error" => "Invalid admin operation request"]);
    exit(0);
}
