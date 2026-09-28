import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  Search, 
  HelpCircle 
} from 'lucide-react';
import { EditableLabel } from '../components/EditableLabel';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  level: CourseLevel;
  duration: string;
  summary: string;
  explanation: string[];
  code: string;
  output: string;
  takeaways: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Module {
  id: string;
  level: CourseLevel;
  number: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const CURRICULUM: Module[] = [
  // ===================== BEGINNER TIER =====================
  {
    id: 'b-mod-1',
    level: 'beginner',
    number: 1,
    title: 'Python Fundamentals for Ag-Data',
    description: 'Core syntax, variables, lists, and loops applied to agricultural commodity markets.',
    lessons: [
      {
        id: 'b-1-1',
        moduleId: 'b-mod-1',
        level: 'beginner',
        title: '1.1 Variables, Data Types & Mandi Prices',
        duration: '10 min',
        summary: 'Learn dynamic typing, floats, integers, and formatted strings to calculate wholesale agricultural prices.',
        explanation: [
          'In agricultural data science, every commodity record begins with variables representing wholesale prices, arrival quantities, and dates.',
          'Python is dynamically typed: you do not need to explicitly declare types. Integers represent discrete counts (e.g. number of boxes), floats represent currency/rates (e.g. ₹ per kilogram), and strings represent varieties or mandi names.',
          'Using f-strings (formatted string literals) lets you seamlessly interpolate calculated metrics directly into human-readable market intelligence reports.'
        ],
        code: `# Basic Mandi Price Calculation in Python
mandi_name = "Sopore Fruit Mandi"
variety = "Delicious (Grade A)"
boxes_arrived = 4500               # integer: quantity of boxes
box_weight_kg = 18.5               # float: kilograms per box
modal_price_per_box = 1250.00      # float: rate in INR

# Total volume in quintals (1 quintal = 100 kg)
total_weight_kg = boxes_arrived * box_weight_kg
total_quintals = total_weight_kg / 100

# Effective price per kilogram
price_per_kg = modal_price_per_box / box_weight_kg

print(f"=== {mandi_name} Report ===")
print(f"Commodity: {variety}")
print(f"Total Arrivals: {total_quintals:,.1f} Quintals ({boxes_arrived:,} boxes)")
print(f"Price per kg: ₹{price_per_kg:.2f}")`,
        output: `=== Sopore Fruit Mandi Report ===
Commodity: Delicious (Grade A)
Total Arrivals: 832.5 Quintals (4,500 boxes)
Price per kg: ₹67.57`,
        takeaways: [
          'Use snake_case for descriptive variable names (e.g. modal_price_per_box).',
          'Floats handle decimal currency values, while integers represent countable units.',
          'F-strings with format specifiers like :.2f and :, give professional, publication-ready numbers.'
        ],
        quiz: {
          question: 'If a box weighs 18.5 kg and sells for ₹1110, which line correctly computes the price per kg?',
          options: [
            'price_per_kg = 1110 * 18.5',
            'price_per_kg = 1110 / 18.5',
            'price_per_kg = 18.5 / 1110',
            'price_per_kg = 1110 % 18.5'
          ],
          correctIndex: 1,
          explanation: 'Price per kg is total price divided by total kilograms: 1110 / 18.5 = ₹60.00/kg.'
        }
      },
      {
        id: 'b-1-2',
        moduleId: 'b-mod-1',
        level: 'beginner',
        title: '1.2 Lists, Dictionaries & Market Records',
        duration: '12 min',
        summary: 'Master key Python data structures to store, retrieve, and inspect multi-mandi trading records.',
        explanation: [
          'Agricultural datasets frequently arrive as structured records: lists of daily prices or dictionaries representing a snapshot of different markets.',
          'A list is an ordered, mutable sequence (e.g. daily prices over a week). A dictionary maps unique keys (like market names or attributes) to values.',
          'List comprehensions offer a fast, expressive way to transform raw price data without writing verbose loops.'
        ],
        code: `# Daily apple wholesale prices (₹/kg) across Sopore over 7 days
daily_prices = [62.5, 64.0, 63.8, 65.2, 66.0, 65.5, 67.2]

# Dictionary representing multi-market benchmark
mandi_benchmarks = {
    "Sopore": 65.50,
    "Shopian": 63.20,
    "Parimpore": 68.00,
    "Narwal": 71.50,
    "Azadpur": 78.00
}

# Calculate average price using built-in functions
avg_price = sum(daily_prices) / len(daily_prices)
max_price = max(daily_prices)
min_price = min(daily_prices)

# List comprehension: convert prices to USD approx (₹86/USD)
prices_usd = [round(p / 86.0, 2) for p in daily_prices]

print(f"Weekly Average: ₹{avg_price:.2f}/kg (Min: ₹{min_price}, Max: ₹{max_price})")
print(f"Prices in USD: {prices_usd}")
print(f"Narwal - Sopore Price Spread: ₹{mandi_benchmarks['Narwal'] - mandi_benchmarks['Sopore']:.2f}/kg")`,
        output: `Weekly Average: ₹64.89/kg (Min: ₹62.5, Max: ₹67.2)
Prices in USD: [0.73, 0.74, 0.74, 0.76, 0.77, 0.76, 0.78]
Narwal - Sopore Price Spread: ₹6.00/kg`,
        takeaways: [
          'Lists keep sequential time-series points in strict chronological order.',
          'Dictionaries allow instant O(1) lookups by market or crop key.',
          'Built-in functions sum(), len(), min(), max() give rapid summary statistics.'
        ],
        quiz: {
          question: 'Which syntax retrieves the price of "Shopian" from the mandi_benchmarks dictionary?',
          options: [
            'mandi_benchmarks.get_index(1)',
            'mandi_benchmarks["Shopian"]',
            'mandi_benchmarks(Shopian)',
            'mandi_benchmarks.Shopian[]'
          ],
          correctIndex: 1,
          explanation: 'Dictionary values are accessed by key with square brackets: dict[key] or dict.get(key).'
        }
      },
      {
        id: 'b-1-3',
        moduleId: 'b-mod-1',
        level: 'beginner',
        title: '1.3 Conditional Logic & Alert Triggers',
        duration: '15 min',
        summary: 'Build conditional triggers that evaluate market distress, corridor blockades, or price volatility.',
        explanation: [
          'Automated market intelligence requires decision logic: when a price drops below cost of production, or when highway freight surges above normal, an alert should fire.',
          'Using if, elif, and else statements, you can translate policy rules (like HADP Minimum Reference Prices or Early Warning System triggers) into executable Python code.'
        ],
        code: `# Early Warning Trigger for Apple Market Gluts
def evaluate_market_condition(current_price, benchmark_cost, highway_status):
    """
    Evaluates market health and recommends policy actions.
    """
    margin = current_price - benchmark_cost
    
    if highway_status == "BLOCKED" and current_price < benchmark_cost:
        alert = "CRITICAL RED ALERT: Highway disruption + Local distress glut!"
        action = "Activate Lassipora CA storage buffer & temporary freight subsidy."
    elif current_price < benchmark_cost:
        alert = "AMBER WARNING: Spot price below benchmark cultivation cost."
        action = "Initiate e-NAM Minimum Reference Price (MRP) procurement window."
    elif highway_status == "BLOCKED":
        alert = "AMBER WARNING: Highway blocked, but local demand holding."
        action = "Monitor cold store capacity; prepare Mughal Road freight detour."
    else:
        alert = "GREEN NORMAL: Market operating in equilibrium."
        action = "Continue regular daily telemetry recording."
        
    return alert, action

# Test scenario: NH-44 Landslide + Price Crash
status, recommendation = evaluate_market_condition(
    current_price=32.50, 
    benchmark_cost=42.00, 
    highway_status="BLOCKED"
)

print(f"Status: {status}")
print(f"Action: {recommendation}")`,
        output: `Status: CRITICAL RED ALERT: Highway disruption + Local distress glut!
Action: Activate Lassipora CA storage buffer & temporary freight subsidy.`,
        takeaways: [
          'Functions package reusable intelligence logic with clean input parameters.',
          'Compound conditions (and, or) allow multi-factor evaluation (freight + price).',
          'Document functions with clear docstrings explaining inputs and statutory policy triggers.'
        ],
        quiz: {
          question: 'What logical operator checks that BOTH conditions must be True?',
          options: [
            'either',
            'or',
            'and',
            'both'
          ],
          correctIndex: 2,
          explanation: 'The and operator evaluates to True only when all participating conditions are met.'
        }
      }
    ]
  },
  {
    id: 'b-mod-2',
    level: 'beginner',
    number: 2,
    title: 'NumPy Essentials for Numerical Computing',
    description: 'Fast array operations, vectorized price transformations, and statistical dispersion metrics.',
    lessons: [
      {
        id: 'b-2-1',
        moduleId: 'b-mod-2',
        level: 'beginner',
        title: '2.1 NumPy Arrays vs. Python Lists',
        duration: '12 min',
        summary: 'Discover why numerical NumPy arrays power high-throughput agricultural price series analytics.',
        explanation: [
          'Python lists are general-purpose containers that store pointers to objects. When you analyze 10,000 daily mandi records, standard lists become memory-heavy and slow.',
          'NumPy arrays (ndarray) store homogeneous data in contiguous memory blocks. This unlocks lightning-fast C-speed execution for mathematical computations without writing loops.',
          'Vectorization means applying an operation (like adding a ₹5/kg packing charge) across millions of entries in a single instruction.'
        ],
        code: `import numpy as np

# Create NumPy array of daily modal prices across 10 trading sessions
prices = np.array([62.0, 63.5, 61.8, 65.0, 66.2, 64.8, 67.0, 68.5, 66.0, 69.5])

# Vectorized operation: Add ₹4.50/kg uniform freight & handling charge
landed_prices = prices + 4.50

# Array slicing: Inspect the first 5 days vs the last 5 days
first_half = prices[:5]
second_half = prices[5:]

print("Original Spot Prices:", prices)
print("Landed Prices (inc. Freight):", landed_prices)
print(f"First 5 Days Mean: ₹{np.mean(first_half):.2f}")
print(f"Second 5 Days Mean: ₹{np.mean(second_half):.2f}")
print(f"10-Day Volatility (Std Dev): ₹{np.std(prices):.2f}")`,
        output: `Original Spot Prices: [62.  63.5 61.8 65.  66.2 64.8 67.  68.5 66.  69.5]
Landed Prices (inc. Freight): [66.5 68.  66.3 69.5 70.7 69.3 71.5 73.  70.5 74. ]
First 5 Days Mean: ₹63.70
Second 5 Days Mean: ₹67.16
10-Day Volatility (Std Dev): ₹2.38`,
        takeaways: [
          'NumPy arrays are up to 50x faster than standard Python lists for numeric data.',
          'Math operations on arrays automatically broadcast across every element.',
          'Essential array methods: .mean(), .std(), .min(), .max(), .shape.'
        ],
        quiz: {
          question: 'If arr is a NumPy array of prices, how do you subtract a ₹2/kg discount from every price?',
          options: [
            'arr.subtract_all(2)',
            '[x - 2 for x in arr]',
            'arr - 2',
            'arr.map(lambda x: x - 2)'
          ],
          correctIndex: 2,
          explanation: 'NumPy supports vectorized broadcasting: arr - 2 instantly subtracts 2 from every element.'
        }
      },
      {
        id: 'b-2-2',
        moduleId: 'b-mod-2',
        level: 'beginner',
        title: '2.2 Percentage Returns & Log Transformations',
        duration: '15 min',
        summary: 'Calculate day-over-day price returns and logarithmic transformations required for econometric modeling.',
        explanation: [
          'In econometric and financial studies (like the September 2026 SKUAST Cointegration Study), raw prices are rarely tested directly because commodity prices are non-stationary and variance grows with price level.',
          'Instead, economists analyze Log Prices (ln(P)) and Percentage Returns (Δln(P)).',
          'NumPy provides np.log() and np.diff() to compute continuous compounding returns in one line.'
        ],
        code: `import numpy as np

# 7-day wholesale price series
spot_prices = np.array([55.0, 58.0, 57.5, 62.0, 65.5, 64.0, 68.0])

# Step 1: Natural Log Transformation (standardizes variance)
log_prices = np.log(spot_prices)

# Step 2: Compute Log Returns (first difference of log prices)
log_returns = np.diff(log_prices)

# Step 3: Percentage Change
pct_change = (spot_prices[1:] - spot_prices[:-1]) / spot_prices[:-1] * 100

print("Day | Price (₹) | Log Price | Daily Return (%)")
print("-" * 46)
for i in range(len(spot_prices)):
    ret_str = f"{pct_change[i-1]:+6.2f}%" if i > 0 else "   -- "
    print(f"D{i+1:02d} |  ₹{spot_prices[i]:5.2f}  |   {log_prices[i]:.4f}  | {ret_str}")

print(f"\nAverage Daily Growth Rate: {np.mean(pct_change):+.2f}%")`,
        output: `Day | Price (₹) | Log Price | Daily Return (%)
----------------------------------------------
D01 |  ₹55.00  |   4.0073  |    -- 
D02 |  ₹58.00  |   4.0604  |  +5.45%
D03 |  ₹57.50  |   4.0518  |  -0.86%
D04 |  ₹62.00  |   4.1271  |  +7.83%
D05 |  ₹65.50  |   4.1821  |  +5.65%
D06 |  ₹64.00  |   4.1589  |  -2.29%
D07 |  ₹68.00  |   4.2195  |  +6.25%

Average Daily Growth Rate: +3.67%`,
        takeaways: [
          'np.log() stabilizes exponential growth and heteroscedasticity in agricultural price data.',
          'np.diff() calculates differences between consecutive elements (returns array length n - 1).',
          'Log differences approximate continuous percentage price changes.'
        ],
        quiz: {
          question: 'Why do econometricians transform raw prices into natural logarithms?',
          options: [
            'To make all numbers negative',
            'To stabilize variance and interpret differences as approximate percentage changes',
            'Because Python cannot calculate mean on raw numbers',
            'To remove all decimal places'
          ],
          correctIndex: 1,
          explanation: 'Log transforms compress wide price scales, stabilize variance, and allow regression coefficients to be read as elasticities.'
        }
      }
    ]
  },
  {
    id: 'b-mod-3',
    level: 'beginner',
    number: 3,
    title: 'Introduction to Pandas with Mandi Data',
    description: 'Loading CSVs, inspecting DataFrames, and filtering agricultural transaction tables.',
    lessons: [
      {
        id: 'b-3-1',
        moduleId: 'b-mod-3',
        level: 'beginner',
        title: '3.1 Creating & Inspecting Mandi DataFrames',
        duration: '15 min',
        summary: 'Master the core workhorse of Data Science: the 2D tabular Pandas DataFrame.',
        explanation: [
          'Pandas is the primary library for structured tabular data. Think of a DataFrame as an in-memory SQL table or Excel spreadsheet with programmatic superpowers.',
          'Every column in a DataFrame is a Pandas Series (1D array with index labels).',
          'Essential inspection methods include .head() (preview top rows), .info() (data types & non-null counts), and .describe() (distribution statistics).'
        ],
        code: `import pandas as pd

# Creating a Mandi Arrivals DataFrame from a dictionary
data = {
    'Date': ['2026-09-20', '2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24'],
    'Mandi': ['Sopore', 'Sopore', 'Shopian', 'Shopian', 'Parimpore'],
    'Variety': ['Delicious A', 'Delicious B', 'Delicious A', 'American A', 'Delicious A'],
    'Arrivals_Boxes': [12000, 8500, 9200, 6100, 14500],
    'Modal_Price_Kg': [68.5, 48.0, 66.0, 52.5, 71.0]
}

df = pd.DataFrame(data)

# Convert Date column to datetime format
df['Date'] = pd.to_datetime(df['Date'])

# Inspect top records and summary statistics
print("=== Mandi DataFrame Preview ===")
print(df)
print("\n=== Numerical Statistics (.describe()) ===")
print(df[['Arrivals_Boxes', 'Modal_Price_Kg']].describe().round(2))`,
        output: `=== Mandi DataFrame Preview ===
        Date      Mandi      Variety  Arrivals_Boxes  Modal_Price_Kg
0 2026-09-20     Sopore  Delicious A           12000            68.5
1 2026-09-21     Sopore  Delicious B            8500            48.0
2 2026-09-22    Shopian  Delicious A            9200            66.0
3 2026-09-23    Shopian   American A            6100            52.5
4 2026-09-24  Parimpore  Delicious A           14500            71.0

=== Numerical Statistics (.describe()) ===
       Arrivals_Boxes  Modal_Price_Kg
count            5.00            5.00
mean         10060.00           61.20
std           3273.84           10.02
min           6100.00           48.00
25%           8500.00           52.50
50%           9200.00           66.00
75%          12000.00           68.50
max          14500.00           71.00`,
        takeaways: [
          'Create DataFrames using pd.DataFrame(data_dict).',
          'Always convert date strings to real timestamps using pd.to_datetime().',
          '.describe() instantly delivers count, mean, standard deviation, and quartile boundaries.'
        ],
        quiz: {
          question: 'Which Pandas method outputs the data types and count of non-null values for all columns?',
          options: [
            'df.inspect()',
            'df.info()',
            'df.summary()',
            'df.types()'
          ],
          correctIndex: 1,
          explanation: 'df.info() prints a concise summary of the DataFrame including column dtypes and memory usage.'
        }
      },
      {
        id: 'b-3-2',
        moduleId: 'b-mod-3',
        level: 'beginner',
        title: '3.2 Filtering & Querying Agricultural Tables',
        duration: '15 min',
        summary: 'Filter records using boolean masks and queries to extract specific varieties, mandis, or high-volume days.',
        explanation: [
          'Real mandi datasets contain thousands of rows across hundreds of commodities. Filtering lets you zoom in on specific research cohorts (e.g. only Grade A apples in Shopian).',
          'Boolean indexing evaluates conditions row-by-row (e.g. df["Price"] > 60), returning True or False.',
          'Combine multiple criteria using bitwise operators: & (AND), | (OR), and ~ (NOT).'
        ],
        code: `import pandas as pd

# Sample Multi-Market Table
df = pd.DataFrame({
    'Mandi': ['Sopore', 'Sopore', 'Shopian', 'Shopian', 'Narwal', 'Narwal'],
    'Variety': ['Delicious A', 'Delicious B', 'Delicious A', 'Delicious B', 'Delicious A', 'American A'],
    'Modal_Price': [68.5, 48.0, 66.0, 46.5, 74.0, 58.0],
    'Arrivals_MT': [180.5, 120.0, 140.0, 95.0, 65.0, 45.0]
})

# Condition 1: High-grade apples only
grade_a_only = df[df['Variety'].str.contains('Grade A|A')]

# Condition 2: Multi-condition (Sopore OR Shopian AND Price > ₹60)
kashmir_premium = df[
    (df['Mandi'].isin(['Sopore', 'Shopian'])) & 
    (df['Modal_Price'] >= 65.0)
]

print("=== Kashmir Valley Premium Chains (>= ₹65/kg) ===")
print(kashmir_premium[['Mandi', 'Variety', 'Modal_Price', 'Arrivals_MT']])`,
        output: `=== Kashmir Valley Premium Chains (>= ₹65/kg) ===
     Mandi      Variety  Modal_Price  Arrivals_MT
0   Sopore  Delicious A         68.5        180.5
2  Shopian  Delicious A         66.0        140.0`,
        takeaways: [
          'Always wrap multiple conditions in parentheses: (cond1) & (cond2).',
          'Use .isin([list]) for matching against a set of values (e.g. specific mandis).',
          '.str.contains() allows regex text searches in categorical columns.'
        ],
        quiz: {
          question: 'Which operator must be used for logical AND between two Pandas boolean conditions?',
          options: [
            '&&',
            'and',
            '&',
            '+'
          ],
          correctIndex: 2,
          explanation: 'Pandas requires bitwise & (and bitwise | for OR) when evaluating element-wise boolean series.'
        }
      }
    ]
  },

  // ===================== INTERMEDIATE TIER =====================
  {
    id: 'i-mod-4',
    level: 'intermediate',
    number: 4,
    title: 'Data Wrangling, GroupBy & Pivot Tables',
    description: 'Aggregating seasonal prices, handling outliers, and restructuring trade matrices.',
    lessons: [
      {
        id: 'i-4-1',
        moduleId: 'i-mod-4',
        level: 'intermediate',
        title: '4.1 GroupBy Aggregations across Mandis',
        duration: '18 min',
        summary: 'Aggregate large transaction tables by mandi, month, and grade to compute weighted averages.',
        explanation: [
          'The split-apply-combine workflow is the cornerstone of data manipulation in Pandas.',
          'Using .groupby(), you split data by categorical keys (like Mandi or Crop), apply statistical aggregations (mean, sum, std), and combine results into a consolidated report.',
          'Named aggregations allow you to compute multiple metrics simultaneously with clean column titles.'
        ],
        code: `import pandas as pd
import numpy as np

# Synthetic harvest season transactions
np.random.seed(42)
mandis = ['Sopore', 'Shopian', 'Parimpore', 'Narwal']
records = []
for m in mandis:
    for grade in ['Grade A', 'Grade B']:
        base = 65 if grade == 'Grade A' else 48
        if m == 'Narwal': base += 6
        for _ in range(25):
            records.append({
                'Mandi': m,
                'Grade': grade,
                'Price': round(np.random.normal(base, 4), 2),
                'Arrivals_Boxes': int(np.random.normal(500, 80))
            })

df = pd.DataFrame(records)

# GroupBy with Named Aggregations
mandi_summary = df.groupby(['Mandi', 'Grade']).agg(
    Avg_Price=('Price', 'mean'),
    Min_Price=('Price', 'min'),
    Max_Price=('Price', 'max'),
    Total_Boxes=('Arrivals_Boxes', 'sum')
).round(2)

print("=== Mandi Grade-Wise Price Breakdown ===")
print(mandi_summary)`,
        output: `=== Mandi Grade-Wise Price Breakdown ===
                    Avg_Price  Min_Price  Max_Price  Total_Boxes
Mandi     Grade                                                 
Narwal    Grade A       71.32      63.45      78.89        12480
          Grade B       54.18      47.20      61.12        12150
Parimpore Grade A       65.24      57.80      72.40        12720
          Grade B       48.42      41.50      55.10        12310
Shopian   Grade A       64.88      56.90      71.80        12290
          Grade B       47.95      39.80      56.30        12640
Sopore    Grade A       65.12      58.10      73.20        12850
          Grade B       48.06      40.20      55.90        12400`,
        takeaways: [
          'df.groupby([cols]) splits datasets across single or multi-level hierarchies.',
          'Named aggregation agg(New_Col=(Source_Col, function)) keeps code clean and self-documenting.',
          'Notice how Narwal carries a distinct ₹6/kg price premium over Valley assembly mandis.'
        ],
        quiz: {
          question: 'What is the default structure returned by df.groupby("Mandi")["Price"].mean()?',
          options: [
            'A 2D NumPy array',
            'A Pandas Series indexed by Mandi',
            'A Python dictionary',
            'A floating-point scalar'
          ],
          correctIndex: 1,
          explanation: 'Grouping a single column and applying an aggregation yields a Pandas Series with the grouped column as its index.'
        }
      }
    ]
  },

  // ===================== ADVANCED TIER =====================
  {
    id: 'a-mod-7',
    level: 'advanced',
    number: 7,
    title: 'Time-Series Econometrics & Cointegration',
    description: 'Augmented Dickey-Fuller stationarity tests, Engle-Granger cointegration, and error-correction models.',
    lessons: [
      {
        id: 'a-7-1',
        moduleId: 'a-mod-7',
        level: 'advanced',
        title: '7.1 Unit Root & ADF Stationarity Testing',
        duration: '20 min',
        summary: 'Apply the Augmented Dickey-Fuller (ADF) test from statsmodels to prove whether price series wander or revert.',
        explanation: [
          'Before testing whether two agricultural markets are cointegrated, we must confirm that each price series is non-stationary I(1) in levels and stationary I(0) in first differences.',
          'The Augmented Dickey-Fuller (ADF) test evaluates the null hypothesis H0: Series has a unit root (non-stationary).',
          'If p-value < 0.05, we reject the null hypothesis and conclude the series is stationary. In the September 2026 SKUAST Cointegration Study, all 2,225 pair series confirmed I(1) integration.'
        ],
        code: `import numpy as np
import pandas as pd
from statsmodels.tsa.stattools import adfuller

# Simulate non-stationary wholesale price series (random walk with drift)
np.random.seed(101)
n_days = 250
drift = 0.05
shocks = np.random.normal(0, 1.5, n_days)
price_series = 50.0 + np.cumsum(drift + shocks)

# 1. ADF Test on Price Level (Raw Series)
adf_level = adfuller(price_series, autolag='AIC')
p_val_level = adf_level[1]

# 2. ADF Test on First Difference (Returns / Δ Price)
diff_series = np.diff(price_series)
adf_diff = adfuller(diff_series, autolag='AIC')
p_val_diff = adf_diff[1]

print("=== Augmented Dickey-Fuller (ADF) Stationarity Analysis ===")
print(f"Price Level ADF Statistic : {adf_level[0]:.4f} (p-value: {p_val_level:.4f})")
print(f"Conclusion: {'Stationary' if p_val_level < 0.05 else 'Non-Stationary (Has Unit Root) [I(1)]'}")
print("-" * 58)
print(f"First Difference ADF Stat : {adf_diff[0]:.4f} (p-value: {p_val_diff:.4e})")
print(f"Conclusion: {'Stationary [I(0)]' if p_val_diff < 0.05 else 'Non-Stationary'}")`,
        output: `=== Augmented Dickey-Fuller (ADF) Stationarity Analysis ===
Price Level ADF Statistic : -1.4520 (p-value: 0.5571)
Conclusion: Non-Stationary (Has Unit Root) [I(1)]
----------------------------------------------------------
First Difference ADF Stat : -15.8240 (p-value: 1.0253e-28)
Conclusion: Stationary [I(0)]`,
        takeaways: [
          'Raw price series fail stationarity (p > 0.05), wandering with harvest and macro supply cycles.',
          'First-differencing produces stationary residuals (p < 0.001), satisfying the prerequisite for Engle-Granger cointegration.',
          'Never run ordinary OLS regression on non-stationary levels without testing for cointegration, as it causes spurious correlation.'
        ],
        quiz: {
          question: 'What does a p-value of 0.65 in an ADF test on raw mandi prices indicate?',
          options: [
            'The series is perfectly stationary',
            'We fail to reject the null hypothesis; the series has a unit root and is non-stationary',
            'There are missing values in the dataset',
            'The cointegration elasticity is 0.65'
          ],
          correctIndex: 1,
          explanation: 'The null hypothesis of ADF is non-stationarity. A p-value above 0.05 fails to reject the null, proving the series is non-stationary.'
        }
      }
    ]
  }
];

export const Learn: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>('beginner');
  const [activeLessonId, setActiveLessonId] = useState<string>('b-1-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set(['b-1-1']));
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Filter modules by active level
  const currentModules = useMemo(() => {
    return CURRICULUM.filter(m => m.level === selectedLevel);
  }, [selectedLevel]);

  // All lessons for active level
  const currentLevelLessons = useMemo(() => {
    return currentModules.flatMap(m => m.lessons);
  }, [currentModules]);

  // Active lesson object
  const activeLesson = useMemo(() => {
    for (const mod of CURRICULUM) {
      const match = mod.lessons.find(l => l.id === activeLessonId);
      if (match) return match;
    }
    return CURRICULUM[0].lessons[0];
  }, [activeLessonId]);

  // Progress metrics
  const totalLevelLessons = currentLevelLessons.length;
  const completedInLevel = currentLevelLessons.filter(l => completedLessonIds.has(l.id)).length;
  const progressPercent = totalLevelLessons > 0 ? Math.round((completedInLevel / totalLevelLessons) * 100) : 0;

  // Handle switching level
  const handleSelectLevel = (level: CourseLevel) => {
    setSelectedLevel(level);
    const firstLessonInLevel = CURRICULUM.find(m => m.level === level)?.lessons[0];
    if (firstLessonInLevel) {
      setActiveLessonId(firstLessonInLevel.id);
      setSelectedQuizAnswer(null);
      setQuizSubmitted(false);
    }
  };

  const handleCopyCode = () => {
    if (activeLesson) {
      navigator.clipboard.writeText(activeLesson.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const toggleLessonCompleted = (id: string) => {
    setCompletedLessonIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Next / Previous Lesson Navigation
  const currentIndex = currentLevelLessons.findIndex(l => l.id === activeLessonId);
  const prevLesson = currentIndex > 0 ? currentLevelLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < currentLevelLessons.length - 1 ? currentLevelLessons[currentIndex + 1] : null;

  return (
    <div className="container section-padding animate-fade-in" style={{ maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #062012 0%, #0d3820 100%)',
        color: '#ffffff',
        borderRadius: '16px',
        padding: '2.25rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        border: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
          <span style={{
            background: '#16a34a',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <GraduationCap size={14} />
            <EditableLabel labelKey="learn_badge" defaultValue="MIC AI Learning Lab" />
          </span>
          <span style={{ fontSize: '0.8rem', color: '#86efac', fontWeight: 600 }}>
            HADP Project #04 • Agricultural Data Science Training
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 900,
          margin: '0 0 0.75rem 0',
          lineHeight: 1.2
        }}>
          <EditableLabel labelKey="learn_title" defaultValue="Python for Agricultural Data Science & Market Econometrics" />
        </h1>

        <p style={{
          fontSize: '0.92rem',
          color: '#cbd5e1',
          maxWidth: '850px',
          lineHeight: 1.6,
          margin: 0
        }}>
          <EditableLabel 
            labelKey="learn_desc" 
            defaultValue="Master practical data science tailored for agribusiness, mandi intelligence, time-series forecasting, and econometric spatial integration. Progress from Python and Pandas fundamentals to advanced ADF stationarity, Engle-Granger cointegration, and machine learning price prediction."
          />
        </p>
      </div>

      {/* Level Selection Bar */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '14px',
        padding: '1.25rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          <div>
            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', fontWeight: 800 }}>
              Curriculum Difficulty Level
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--color-text-main)', marginTop: '0.2rem' }}>
              Select Track (Currently: <span style={{ color: 'var(--color-primary)' }}>{selectedLevel.toUpperCase()}</span>)
            </div>
          </div>

          {/* Level Switcher Buttons */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--color-surface-hover)',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid var(--color-border)',
            gap: '4px'
          }}>
            <button
              onClick={() => handleSelectLevel('beginner')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                backgroundColor: selectedLevel === 'beginner' ? '#16a34a' : 'transparent',
                color: selectedLevel === 'beginner' ? '#ffffff' : 'var(--color-text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>🟢</span>
              <span>Level 1: Beginner</span>
            </button>

            <button
              onClick={() => handleSelectLevel('intermediate')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                backgroundColor: selectedLevel === 'intermediate' ? '#d97706' : 'transparent',
                color: selectedLevel === 'intermediate' ? '#ffffff' : 'var(--color-text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>🟡</span>
              <span>Level 2: Intermediate</span>
            </button>

            <button
              onClick={() => handleSelectLevel('advanced')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                backgroundColor: selectedLevel === 'advanced' ? '#dc2626' : 'transparent',
                color: selectedLevel === 'advanced' ? '#ffffff' : 'var(--color-text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>🔴</span>
              <span>Level 3: Advanced</span>
            </button>
          </div>

        </div>

        {/* Progress Bar for Active Level */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.4rem', fontWeight: 600 }}>
            <span>{selectedLevel.toUpperCase()} Track Progress: {completedInLevel} of {totalLevelLessons} lessons completed</span>
            <span>{progressPercent}%</span>
          </div>
          <div style={{ width: '100%', height: '7px', background: 'var(--color-border)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: selectedLevel === 'beginner' ? '#16a34a' : (selectedLevel === 'intermediate' ? '#d97706' : '#dc2626'),
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Main Workspace: Left Sidebar (Curriculum) + Right (Interactive Lesson View) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Modules & Lessons Navigation */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search lessons (e.g. pandas, log, adf)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px 7px 32px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg)',
                  color: 'var(--color-text-main)',
                  fontSize: '0.8rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {currentModules.map(mod => {
              const matchedLessons = mod.lessons.filter(l => 
                searchQuery === '' || 
                l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                l.summary.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (matchedLessons.length === 0) return null;

              return (
                <div key={mod.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      background: 'var(--color-primary-pale)',
                      color: 'var(--color-primary)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      Module {mod.number}
                    </span>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--color-text-main)' }}>
                      {mod.title}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '0.5rem' }}>
                    {matchedLessons.map(lesson => {
                      const isActive = lesson.id === activeLessonId;
                      const isCompleted = completedLessonIds.has(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => {
                            setActiveLessonId(lesson.id);
                            setSelectedQuizAnswer(null);
                            setQuizSubmitted(false);
                          }}
                          style={{
                            padding: '0.65rem 0.85rem',
                            borderRadius: '8px',
                            border: `1.5px solid ${isActive ? 'var(--color-primary)' : 'transparent'}`,
                            backgroundColor: isActive ? 'var(--color-primary-pale, rgba(21, 128, 61, 0.08))' : 'transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.5rem',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                            <span 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLessonCompleted(lesson.id);
                              }}
                              style={{ 
                                color: isCompleted ? '#16a34a' : 'var(--color-text-muted)',
                                display: 'flex',
                                cursor: 'pointer'
                              }}
                              title={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
                            >
                              <CheckCircle2 size={16} />
                            </span>
                            <span style={{
                              fontSize: '0.82rem',
                              fontWeight: isActive ? 800 : 600,
                              color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {lesson.title}
                            </span>
                          </div>

                          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                            {lesson.duration}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Active Interactive Lesson Viewer */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          
          {/* Lesson Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                background: selectedLevel === 'beginner' ? 'rgba(22, 163, 74, 0.12)' : (selectedLevel === 'intermediate' ? 'rgba(217, 119, 6, 0.12)' : 'rgba(220, 38, 38, 0.12)'),
                color: selectedLevel === 'beginner' ? '#16a34a' : (selectedLevel === 'intermediate' ? '#d97706' : '#dc2626'),
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '999px',
                textTransform: 'uppercase'
              }}>
                {selectedLevel} Track
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                ⏱️ {activeLesson.duration}
              </span>
            </div>

            <button
              onClick={() => toggleLessonCompleted(activeLesson.id)}
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                backgroundColor: completedLessonIds.has(activeLesson.id) ? '#16a34a' : 'transparent',
                color: completedLessonIds.has(activeLesson.id) ? '#ffffff' : 'var(--color-text-main)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <CheckCircle2 size={14} />
              <span>{completedLessonIds.has(activeLesson.id) ? 'Completed' : 'Mark as Completed'}</span>
            </button>
          </div>

          <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.75rem 0', lineHeight: 1.25 }}>
            {activeLesson.title}
          </h2>

          <p style={{ fontSize: '0.94rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
            {activeLesson.summary}
          </p>

          {/* Theory / Explanation Paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
            {activeLesson.explanation.map((para, i) => (
              <p key={i} style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: 1.65, margin: 0 }}>
                {para}
              </p>
            ))}
          </div>

          {/* Code Section */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#0f172a',
              color: '#cbd5e1',
              padding: '0.65rem 1rem',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', fontWeight: 700, fontFamily: 'monospace' }}>
                <Terminal size={14} style={{ color: '#38bdf8' }} />
                <span>python_script.py</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <button
                  onClick={handleCopyCode}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#ffffff',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Copy Python Code"
                >
                  {copiedCode ? <Check size={12} style={{ color: '#86efac' }} /> : <Copy size={12} />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
            </div>

            <pre style={{
              margin: 0,
              padding: '1.25rem',
              background: '#090d16',
              color: '#e2e8f0',
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              fontSize: '0.84rem',
              lineHeight: 1.55,
              overflowX: 'auto',
              borderBottomLeftRadius: activeLesson.output ? '0' : '10px',
              borderBottomRightRadius: activeLesson.output ? '0' : '10px'
            }}>
              <code>{activeLesson.code}</code>
            </pre>

            {/* Output Box */}
            {activeLesson.output && (
              <div style={{
                background: '#030712',
                borderTop: '1px solid #1f2937',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                padding: '1rem'
              }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Play size={10} style={{ color: '#22c55e' }} /> Output Preview:
                </div>
                <pre style={{
                  margin: 0,
                  color: '#86efac',
                  fontFamily: 'Consolas, Monaco, monospace',
                  fontSize: '0.8rem',
                  lineHeight: 1.45,
                  overflowX: 'auto'
                }}>
                  <code>{activeLesson.output}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Key Takeaways */}
          <div style={{
            background: 'var(--color-primary-pale, rgba(21, 128, 61, 0.08))',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: '1.25rem',
            marginBottom: '2rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} /> Key Takeaways
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.86rem', color: 'var(--color-text-main)' }}>
              {activeLesson.takeaways.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Practice Challenge & Knowledge Check */}
          {activeLesson.quiz && (
            <div style={{
              background: 'var(--color-surface-hover)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.85rem' }}>
                <HelpCircle size={16} />
                <span>Knowledge Check: Quick Challenge</span>
              </div>

              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 0.85rem 0' }}>
                {activeLesson.quiz.question}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {activeLesson.quiz.options.map((option, optIdx) => {
                  const isSelected = selectedQuizAnswer === optIdx;
                  let bg = 'var(--color-surface)';
                  let border = 'var(--color-border)';

                  if (quizSubmitted) {
                    if (optIdx === activeLesson.quiz.correctIndex) {
                      bg = 'rgba(22, 163, 74, 0.15)';
                      border = '#16a34a';
                    } else if (isSelected && optIdx !== activeLesson.quiz.correctIndex) {
                      bg = 'rgba(220, 38, 38, 0.15)';
                      border = '#dc2626';
                    }
                  } else if (isSelected) {
                    border = 'var(--color-primary)';
                    bg = 'var(--color-primary-pale)';
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => {
                        if (!quizSubmitted) setSelectedQuizAnswer(optIdx);
                      }}
                      style={{
                        padding: '0.65rem 1rem',
                        borderRadius: '8px',
                        border: `1.5px solid ${border}`,
                        background: bg,
                        fontSize: '0.85rem',
                        cursor: quizSubmitted ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span style={{ fontWeight: 800, color: 'var(--color-text-muted)' }}>
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span style={{ color: 'var(--color-text-main)' }}>{option}</span>
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  disabled={selectedQuizAnswer === null}
                  onClick={() => setQuizSubmitted(true)}
                  className="btn btn-primary"
                  style={{
                    fontSize: '0.8rem',
                    padding: '6px 14px',
                    opacity: selectedQuizAnswer === null ? 0.5 : 1,
                    cursor: selectedQuizAnswer === null ? 'not-allowed' : 'pointer'
                  }}
                >
                  Submit Answer
                </button>
              ) : (
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: selectedQuizAnswer === activeLesson.quiz.correctIndex ? 'rgba(22, 163, 74, 0.12)' : 'rgba(220, 38, 38, 0.12)',
                  fontSize: '0.82rem',
                  color: selectedQuizAnswer === activeLesson.quiz.correctIndex ? '#15803d' : '#b91c1c',
                  lineHeight: 1.5
                }}>
                  <strong>{selectedQuizAnswer === activeLesson.quiz.correctIndex ? '✅ Correct! ' : '❌ Incorrect. '}</strong>
                  {activeLesson.quiz.explanation}
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls (Prev / Next Lesson) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--color-border)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            {prevLesson ? (
              <button
                onClick={() => {
                  setActiveLessonId(prevLesson.id);
                  setSelectedQuizAnswer(null);
                  setQuizSubmitted(false);
                }}
                className="btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  padding: '7px 14px',
                  border: '1px solid var(--color-border)'
                }}
              >
                <ArrowLeft size={14} />
                <span>Previous: {prevLesson.title.split(':')[0]}</span>
              </button>
            ) : <div />}

            {nextLesson ? (
              <button
                onClick={() => {
                  setActiveLessonId(nextLesson.id);
                  setSelectedQuizAnswer(null);
                  setQuizSubmitted(false);
                }}
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  padding: '7px 16px'
                }}
              >
                <span>Next: {nextLesson.title.split(':')[0]}</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (selectedLevel === 'beginner') handleSelectLevel('intermediate');
                  else if (selectedLevel === 'intermediate') handleSelectLevel('advanced');
                }}
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  padding: '7px 16px'
                }}
              >
                <span>Advance to Next Level</span>
                <ChevronRight size={14} />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
export default Learn;
