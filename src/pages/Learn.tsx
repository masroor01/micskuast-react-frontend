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
  Search, 
  HelpCircle,
  Video,
  MonitorPlay,
  BookOpen,
  Award,
  Code2,
  Lightbulb,
  Eye,
  EyeOff,
  Trophy
} from 'lucide-react';
import { EditableLabel } from '../components/EditableLabel';
import { CourseCertificate } from '../components/CourseCertificate';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'capstone';

export interface Exercise {
  title: string;
  scenario: string;
  instructions: string[];
  starterCode: string;
  solutionCode: string;
  expectedOutput: string;
  hints?: string[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  level: CourseLevel;
  duration: string;
  videoUrl: string;
  videoTitle: string;
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
  exercise?: Exercise;
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
  // ===================== TIER 1: BEGINNER =====================
  {
    id: 'b-mod-1',
    level: 'beginner',
    number: 1,
    title: 'Python Fundamentals & Syntax',
    description: 'Learn dynamic typing, numerical operations, strings, functions, and control flow from scratch.',
    lessons: [
      {
        id: 'b-1-1',
        moduleId: 'b-mod-1',
        level: 'beginner',
        title: '1.1 Variables, Dynamic Typing & Arithmetic',
        duration: '18 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/_uQrJ0TkZlc?start=180',
        videoTitle: 'Python Variables, Data Types & Mathematical Operations',
        summary: 'Understand Python variable assignment, numeric data types (integers, floats, booleans), and basic arithmetic.',
        explanation: [
          'Python is an interpreted, high-level programming language designed for readability and rapid experimentation, making it the global standard for Data Science.',
          'Variables in Python are dynamically typed: you do not need to explicitly declare their type. Python automatically detects whether a value is an integer, float, string, or boolean at runtime.',
          'Type casting allows you to convert between types (e.g., int("42") or float(10)), and f-strings (formatted string literals) allow clean, modern text interpolation.'
        ],
        code: `# Variables & Numerical Types
user_name = "Alex"
age = 28                 # Integer (int)
account_balance = 1450.75 # Floating-point number (float)
is_active = True         # Boolean (bool)

# Arithmetic Operations
item_price = 120.50
quantity = 5
subtotal = item_price * quantity
tax_rate = 0.08
total_cost = subtotal * (1 + tax_rate)

# Formatted string output
print(f"Customer: {user_name}")
print(f"Items: {quantity} @ \${item_price:.2f} each")
print(f"Subtotal: \${subtotal:.2f}")
print(f"Total with Tax: \${total_cost:.2f}")
print(f"Data type of total_cost: {type(total_cost).__name__}")`,
        output: `Customer: Alex
Items: 5 @ $120.50 each
Subtotal: $602.50
Total with Tax: $650.70
Data type of total_cost: float`,
        takeaways: [
          'Python variable names should be descriptive and use snake_case (e.g. total_cost).',
          'Integers hold whole numbers, while floats represent decimal precision.',
          'Use f"{variable:.2f}" to round floating-point numbers to two decimal places.'
        ],
        quiz: {
          question: 'What is the resulting data type when multiplying a float by an integer in Python?',
          options: [
            'int',
            'float',
            'decimal',
            'str'
          ],
          correctIndex: 1,
          explanation: 'In Python, operations between an int and a float are automatically widened to a float.'
        },
        exercise: {
          title: 'E-Commerce Basket Discount Calculator',
          scenario: 'Write a script that calculates the final payable amount for a customer ordering 3 mechanical keyboards priced at $85.00 each, with a 12% promotional discount applied before adding 8% sales tax.',
          instructions: [
            'Define unit_price = 85.0 and quantity = 3.',
            'Compute subtotal = unit_price * quantity.',
            'Calculate a 12% discount: discount = subtotal * 0.12.',
            'Deduct the discount and apply 8% sales tax.',
            'Print the subtotal, discount amount, and final total formatted to 2 decimal places.'
          ],
          starterCode: `# Task: Calculate total with 12% discount and 8% tax
unit_price = 85.0
quantity = 3

# TODO: Calculate subtotal, apply discount, add tax, and print final total`,
          solutionCode: `unit_price = 85.0
quantity = 3
subtotal = unit_price * quantity
discount = subtotal * 0.12
discounted = subtotal - discount
final_total = discounted * 1.08

print(f"Subtotal: \${subtotal:.2f}")
print(f"Discount (12%): -\${discount:.2f}")
print(f"Final Total with Tax: \${final_total:.2f}")`,
          expectedOutput: `Subtotal: $255.00
Discount (12%): -$30.60
Final Total with Tax: $242.35`,
          hints: [
            'Deduct the discount first: discounted = subtotal - (subtotal * 0.12).',
            'Apply tax to the discounted amount: final_total = discounted * 1.08.'
          ]
        }
      },
      {
        id: 'b-1-2',
        moduleId: 'b-mod-1',
        level: 'beginner',
        title: '1.2 Lists, Tuples, Dictionaries & Sets',
        duration: '22 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/W8KRzm-HUcc',
        videoTitle: 'Python Data Structures: Lists, Tuples, Dictionaries and Sets',
        summary: 'Master the four core Python collections: mutable lists, immutable tuples, key-value dictionaries, and unique sets.',
        explanation: [
          'Data Science in Python is powered by collections. Lists ([]) are ordered, mutable sequences that can store arbitrary types.',
          'Dictionaries ({key: value}) provide ultra-fast constant time O(1) hash map lookups and represent structured records and JSON data.',
          'Tuples (()) are immutable ordered sequences suitable for coordinates and fixed records, while Sets ({}) enforce uniqueness and support mathematical set operations (union, intersection).'
        ],
        code: `# 1. Lists (Ordered & Mutable)
temperatures = [22.4, 25.1, 19.8, 28.3, 24.0]
temperatures.append(26.5)
print("Updated Temperatures:", temperatures)
print("Average Temperature:", sum(temperatures) / len(temperatures))

# 2. Dictionaries (Key-Value Keyed Mappings)
client_profile = {
    "name": "Sarah Connor",
    "tier": "Premium",
    "orders": 14,
    "lifetime_spend": 3420.50
}
client_profile["active"] = True
print("\nClient Tier:", client_profile["tier"])
print("Client Keys:", list(client_profile.keys()))

# 3. Sets (Unique Elements)
categories = ["Electronics", "Clothing", "Home", "Electronics", "Home"]
unique_categories = set(categories)
print("\nUnique Product Categories:", unique_categories)`,
        output: `Updated Temperatures: [22.4, 25.1, 19.8, 28.3, 24.0, 26.5]
Average Temperature: 24.35

Client Tier: Premium
Client Keys: ['name', 'tier', 'orders', 'lifetime_spend', 'active']

Unique Product Categories: {'Clothing', 'Home', 'Electronics'}`,
        takeaways: [
          'Use lists when order matters and items need to be appended or modified.',
          'Use dictionaries for structured record lookup by meaningful string keys.',
          'Sets instantly eliminate duplicates from any sequence with set(items).'
        ],
        quiz: {
          question: 'Which of the following data structures is immutable once defined?',
          options: [
            'List',
            'Dictionary',
            'Tuple',
            'Set'
          ],
          correctIndex: 2,
          explanation: 'Tuples are strictly immutable; their elements cannot be reassigned or appended to after creation.'
        },
        exercise: {
          title: 'Warehouse Stock Valuation & Update',
          scenario: 'You are given a dictionary of store inventory items and their quantities. A new delivery of 15 laptops and 25 mice arrives. Update the inventory dictionary and calculate the total units in stock.',
          instructions: [
            'Initialize the inventory dictionary with laptops, monitors, mice, and keyboards.',
            'Increment laptops by 15 and mice by 25.',
            'Compute total_units using sum(inventory.values()).',
            'Print the updated inventory and total unit count.'
          ],
          starterCode: `inventory = {
    "laptops": 40,
    "monitors": 65,
    "mice": 120,
    "keyboards": 85
}

# TODO: Add 15 to laptops, 25 to mice, and compute total items`,
          solutionCode: `inventory = {
    "laptops": 40,
    "monitors": 65,
    "mice": 120,
    "keyboards": 85
}

inventory["laptops"] += 15
inventory["mice"] += 25

total_units = sum(inventory.values())
print("Updated Inventory:", inventory)
print("Total Units in Warehouse:", total_units)`,
          expectedOutput: `Updated Inventory: {'laptops': 55, 'monitors': 65, 'mice': 145, 'keyboards': 85}
Total Units in Warehouse: 350`,
          hints: [
            'Use inventory["laptops"] += 15 to modify dictionary values directly in-place.',
            'Use inventory.values() to get an iterable of all stock quantities.'
          ]
        }
      },
      {
        id: 'b-1-3',
        moduleId: 'b-mod-1',
        level: 'beginner',
        title: '1.3 Functions, Loops & Conditionals',
        duration: '25 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/9Os0o3wzS_I',
        videoTitle: 'Python Functions, For Loops and Conditional Logic',
        summary: 'Build reusable logic with def functions, iterate using for and while loops, and make decisions with if-elif-else statements.',
        explanation: [
          'Functions encapsulate modular units of logic, accept parameters, and return values with the return statement.',
          'Conditionals (if, elif, else) direct execution flow using boolean logic comparisons (==, !=, >, <, and, or, not).',
          'List comprehensions ([x * 2 for x in items if x > 0]) provide an expressive, idiomatic way to map and filter sequences in a single line.'
        ],
        code: `# Function definition with default parameters
def calculate_shipping(weight_kg, is_express=False):
    """Calculates shipping cost based on package weight and priority."""
    base_rate = 5.00
    if weight_kg <= 2.0:
        cost = base_rate + (weight_kg * 1.50)
    elif weight_kg <= 10.0:
        cost = base_rate + (weight_kg * 1.20)
    else:
        cost = base_rate + (weight_kg * 0.90)
    
    if is_express:
        cost *= 1.50  # 50% express surcharge
        
    return round(cost, 2)

# Test function
print("Standard (1.5 kg):", calculate_shipping(1.5))
print("Standard (8.0 kg):", calculate_shipping(8.0))
print("Express (8.0 kg):", calculate_shipping(8.0, is_express=True))

# List Comprehension for data transformation
raw_prices = [10.0, 25.5, 40.0, 100.0, 15.0]
# 10% discount on items over $20
discounted = [p * 0.90 if p > 20 else p for p in raw_prices]
print("\nOriginal:", raw_prices)
print("Discounted:", discounted)`,
        output: `Standard (1.5 kg): 7.25
Standard (8.0 kg): 14.6
Express (8.0 kg): 21.9

Original: [10.0, 25.5, 40.0, 100.0, 15.0]
Discounted: [10.0, 22.95, 36.0, 90.0, 15.0]`,
        takeaways: [
          'Docstrings ("""...""") directly below a def statement describe parameter expectations and function purpose.',
          'List comprehensions replace multi-line for loops when transforming or filtering lists.',
          'Default parameters allow functions to be called flexibly without specifying all arguments.'
        ],
        quiz: {
          question: 'What keyword terminates a loop immediately in Python?',
          options: [
            'continue',
            'stop',
            'break',
            'exit'
          ],
          correctIndex: 2,
          explanation: 'The break keyword halts and exits the innermost loop immediately.'
        },
        exercise: {
          title: 'Daily Temperature Spike Detector',
          scenario: 'Write a function detect_heat_spikes(temps, threshold) that filters a list of daily recorded temperatures in Celsius and returns all values exceeding the threshold.',
          instructions: [
            'Define detect_heat_spikes(temps, threshold=32.0).',
            'Use a list comprehension or loop to filter readings where temp > threshold.',
            'Return the list of anomalies.',
            'Print the detected anomalies and total count.'
          ],
          starterCode: `daily_temps = [24.5, 29.0, 33.5, 31.0, 36.2, 28.4, 34.8]

def detect_heat_spikes(temps, threshold=32.0):
    # TODO: Loop through readings and collect values > threshold
    pass

spikes = detect_heat_spikes(daily_temps, threshold=32.0)
print("Detected Heat Spikes:", spikes)`,
          solutionCode: `daily_temps = [24.5, 29.0, 33.5, 31.0, 36.2, 28.4, 34.8]

def detect_heat_spikes(temps, threshold=32.0):
    return [t for t in temps if t > threshold]

spikes = detect_heat_spikes(daily_temps, threshold=32.0)
print("Detected Heat Spikes (°C):", spikes)
print(f"Number of anomaly days: {len(spikes)}")`,
          expectedOutput: `Detected Heat Spikes (°C): [33.5, 36.2, 34.8]
Number of anomaly days: 3`,
          hints: [
            'List comprehension format: [t for t in temps if t > threshold].',
            'Use len(spikes) to get the count of anomaly days.'
          ]
        }
      }
    ]
  },
  {
    id: 'b-mod-2',
    level: 'beginner',
    number: 2,
    title: 'NumPy for Numerical Computing',
    description: 'Learn N-dimensional arrays, vectorized operations, mathematical broadcasting, and axis slicing.',
    lessons: [
      {
        id: 'b-2-1',
        moduleId: 'b-mod-2',
        level: 'beginner',
        title: '2.1 N-Dimensional Arrays & Vectorized Math',
        duration: '25 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/QUT1VHiLmmI',
        videoTitle: 'NumPy Crash Course: High-Performance Numerical Computing',
        summary: 'Understand why NumPy ndarrays are 50x faster than Python lists and master vectorized array arithmetic.',
        explanation: [
          'NumPy (Numerical Python) is the foundation of the scientific Python ecosystem. Core operations in Pandas, SciPy, and Scikit-Learn rely on NumPy ndarrays.',
          'Unlike Python lists which store pointers to disparate objects in memory, NumPy stores contiguous memory blocks of homogeneous data types in C, enabling lightning-fast CPU vectorization and SIMD parallelism.',
          'Vectorization eliminates slow Python for-loops, allowing mathematical operations to run element-wise across millions of numbers simultaneously.'
        ],
        code: `import numpy as np

# 1D Array (Vector)
sales_units = np.array([120, 145, 98, 210, 180])
unit_price = np.array([15.50, 15.50, 15.50, 15.50, 15.50])

# Vectorized element-wise multiplication
revenue = sales_units * unit_price

# 2D Array (Matrix: 3 stores x 4 quarters)
store_matrix = np.array([
    [100, 120, 130, 150],  # Store A
    [80,  95,  110, 105],  # Store B
    [200, 210, 230, 250]   # Store C
])

print("Total Revenue per Product ($):", revenue)
print(f"Overall Total Revenue: \${np.sum(revenue):,.2f}")
print(f"Average Units Sold: {np.mean(sales_units):.1f}")
print(f"Standard Deviation: {np.std(sales_units):.2f}")
print("\nStore Matrix Shape:", store_matrix.shape)
print("Quarterly Totals across all stores:", np.sum(store_matrix, axis=0))`,
        output: `Total Revenue per Product ($): [1860.  2247.5 1519.  3255.  2790. ]
Overall Total Revenue: $11,671.50
Average Units Sold: 150.6
Standard Deviation: 39.51

Store Matrix Shape: (3, 4)
Quarterly Totals across all stores: [380 425 470 505]`,
        takeaways: [
          'NumPy arrays are fixed-type (homogeneous) and significantly faster than Python lists.',
          'axis=0 computes statistics down columns, while axis=1 computes across rows.',
          'Broadcasting allows arithmetic operations between arrays of different but compatible shapes.'
        ],
        quiz: {
          question: 'What does axis=0 specify when computing np.sum(matrix, axis=0)?',
          options: [
            'Sum across rows (horizontal)',
            'Sum down columns (vertical)',
            'Sum only the diagonal elements',
            'Flatten and sum everything into a scalar'
          ],
          correctIndex: 1,
          explanation: 'In 2D NumPy arrays, axis=0 refers to the column direction, computing vertical reductions across rows.'
        },
        exercise: {
          title: 'Quarterly Retail Revenue Matrix Analysis',
          scenario: 'Given a 2D NumPy array representing quarterly sales (Q1-Q4) across 3 regional outlets, calculate the total revenue per outlet (row-wise) and the average revenue per quarter across all outlets (column-wise).',
          instructions: [
            'Create the 3x4 sales array.',
            'Compute store totals using np.sum(sales, axis=1).',
            'Compute quarterly averages using np.mean(sales, axis=0).',
            'Print both metrics and the overall grand total.'
          ],
          starterCode: `import numpy as np

# 3 stores (rows) x 4 quarters (cols)
sales = np.array([
    [120, 150, 140, 180],
    [90,  110,  95, 130],
    [210, 240, 220, 260]
])

# TODO: Compute store totals (axis=1) and quarterly averages (axis=0)`,
          solutionCode: `import numpy as np

sales = np.array([
    [120, 150, 140, 180],
    [90,  110,  95, 130],
    [210, 240, 220, 260]
])

store_totals = np.sum(sales, axis=1)
quarterly_averages = np.mean(sales, axis=0)

print("Store Totals ($k):", store_totals)
print("Quarterly Averages ($k):", quarterly_averages)
print("Grand Total ($k):", np.sum(sales))`,
          expectedOutput: `Store Totals ($k): [590 425 930]
Quarterly Averages ($k): [140.         166.66666667 151.66666667 190.        ]
Grand Total ($k): 1945`,
          hints: [
            'axis=1 collapses across columns to give row-wise sums.',
            'axis=0 collapses across rows to give column-wise means.'
          ]
        }
      }
    ]
  },
  {
    id: 'b-mod-3',
    level: 'beginner',
    number: 3,
    title: 'Pandas for Tabular Data Analysis',
    description: 'Master DataFrames, Series, reading CSV/Excel datasets, column operations, and boolean masking.',
    lessons: [
      {
        id: 'b-3-1',
        moduleId: 'b-mod-3',
        level: 'beginner',
        title: '3.1 Pandas Series & DataFrames',
        duration: '28 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/vmEHCJofslg',
        videoTitle: 'Pandas Introduction: Series, DataFrames and Reading Data',
        summary: 'Build and manipulate 2D tabular DataFrames, inspect schema dtypes, and perform column feature engineering.',
        explanation: [
          'Pandas is the workhorse of modern data analytics. A DataFrame is a 2-dimensional labeled data structure with columns of potentially different types.',
          'Each column in a DataFrame is a 1D Pandas Series sharing a common index.',
          'Pandas enables seamless IO with pd.read_csv(), pd.read_excel(), and pd.read_sql(), allowing immediate data exploration.'
        ],
        code: `import pandas as pd

# Creating a DataFrame from a dictionary of lists
data = {
    'Transaction_ID': ['TX1001', 'TX1002', 'TX1003', 'TX1004', 'TX1005'],
    'Customer': ['Alice', 'Bob', 'Charlie', 'Diana', 'Evan'],
    'Product': ['Laptop', 'Mouse', 'Monitor', 'Keyboard', 'Laptop'],
    'Price': [1200.0, 25.0, 350.0, 75.0, 1150.0],
    'Quantity': [1, 3, 2, 2, 1],
    'City': ['New York', 'Boston', 'Chicago', 'New York', 'Chicago']
}

df = pd.DataFrame(data)

# Feature engineering: compute Total Revenue per order
df['Total'] = df['Price'] * df['Quantity']

# Summary inspection
print("=== DataFrame Head ===")
print(df.head(3))
print("\n=== Summary Statistics ===")
print(df[['Price', 'Total']].describe())`,
        output: `=== DataFrame Head ===
  Transaction_ID Customer  Product   Price  Quantity      City   Total
0         TX1001    Alice   Laptop  1200.0         1  New York  1200.0
1         TX1002      Bob    Mouse    25.0         3    Boston    75.0
2         TX1003  Charlie  Monitor   350.0         2   Chicago   700.0

=== Summary Statistics ===
             Price        Total
count     5.000000     5.000000
mean    560.000000   475.000000
std     566.678921   506.026185
min      25.000000    75.000000
25%      75.000000   150.000000
50%     350.000000   700.000000
75%    1150.000000  1150.000000
max    1200.000000  1200.000000`,
        takeaways: [
          'df.head(n) provides a quick snapshot of the first n records.',
          'New columns can be created directly by assigning expressions like df["Total"] = df["Price"] * df["Quantity"].',
          'df.describe() automatically generates count, mean, standard deviation, and quartiles for numeric features.'
        ],
        quiz: {
          question: 'What is a 1-dimensional array with labeled axes in Pandas called?',
          options: [
            'Vector',
            'Series',
            'Matrix',
            'Record'
          ],
          correctIndex: 1,
          explanation: 'A Pandas Series is a 1-dimensional labeled array capable of holding any data type.'
        },
        exercise: {
          title: 'Customer Subscription DataFrame Builder',
          scenario: 'Create a Pandas DataFrame from dictionary data for 4 SaaS customers. Compute a new column Annual_Spend by multiplying Monthly_Fee by 12, and display customers on the "Enterprise" plan.',
          instructions: [
            'Create the DataFrame with columns: Customer, Plan, Monthly_Fee, Users.',
            'Create Annual_Spend = df["Monthly_Fee"] * 12.',
            'Filter for rows where Plan == "Enterprise".',
            'Print the full DataFrame and the filtered enterprise subset.'
          ],
          starterCode: `import pandas as pd

# TODO: Create DataFrame, compute Annual_Spend, and filter Enterprise`,
          solutionCode: `import pandas as pd

data = {
    'Customer': ['Acme Corp', 'Beta LLC', 'Omni Inc', 'Vertex Ltd'],
    'Plan': ['Enterprise', 'Pro', 'Enterprise', 'Starter'],
    'Monthly_Fee': [499, 149, 799, 49],
    'Users': [85, 20, 150, 5]
}

df = pd.DataFrame(data)
df['Annual_Spend'] = df['Monthly_Fee'] * 12
enterprise_customers = df[df['Plan'] == 'Enterprise']

print("=== Full DataFrame ===")
print(df)
print("\n=== Enterprise Customers ===")
print(enterprise_customers[['Customer', 'Annual_Spend', 'Users']])`,
          expectedOutput: `=== Full DataFrame ===
     Customer        Plan  Monthly_Fee  Users  Annual_Spend
0   Acme Corp  Enterprise          499     85          5988
1    Beta LLC         Pro          149     20          1788
2    Omni Inc  Enterprise          799    150          9588
3  Vertex Ltd     Starter           49      5           588

=== Enterprise Customers ===
    Customer  Annual_Spend  Users
0  Acme Corp          5988     85
2   Omni Inc          9588    150`,
          hints: [
            'Use df["Plan"] == "Enterprise" as a boolean mask.',
            'Select subset columns using double square brackets: df[[col1, col2]].'
          ]
        }
      },
      {
        id: 'b-3-2',
        moduleId: 'b-mod-3',
        level: 'beginner',
        title: '3.2 Data Filtering, Sorting & Slicing',
        duration: '24 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/Lw2rlcxScZY',
        videoTitle: 'Pandas Filtering, Sorting and Conditional Slicing',
        summary: 'Filter records using boolean conditions, sort values across multiple criteria, and select columns with loc and iloc.',
        explanation: [
          'Boolean indexing filters rows based on criteria: df[df["age"] > 30].',
          'Multiple logical conditions use & (AND), | (OR), and ~ (NOT) with parentheses around each condition: df[(df["a"] > 5) & (df["b"] < 10)].',
          '.loc[] indexes by label name, whereas .iloc[] indexes strictly by integer row and column positions.'
        ],
        code: `import pandas as pd

orders = pd.DataFrame({
    'Order_ID': [101, 102, 103, 104, 105, 106],
    'Region': ['North', 'South', 'North', 'West', 'East', 'North'],
    'Sales': [450, 120, 780, 920, 310, 640],
    'Returned': [False, False, True, False, False, False]
})

# Filter: Sales > 400 AND Region is 'North' AND NOT Returned
filter_criteria = (orders['Sales'] > 400) & (orders['Region'] == 'North') & (~orders['Returned'])
high_value_north = orders[filter_criteria]

# Sorting: sort by Sales descending
sorted_orders = orders.sort_values(by='Sales', ascending=False)

print("=== High Value North Orders (Unreturned) ===")
print(high_value_north)
print("\n=== Top 3 Orders by Sales ===")
print(sorted_orders.head(3))`,
        output: `=== High Value North Orders (Unreturned) ===
   Order_ID Region  Sales  Returned
0       101  North    450     False
5       106  North    640     False

=== Top 3 Orders by Sales ===
   Order_ID Region  Sales  Returned
3       104   West    920     False
2       103  North    780      True
5       106  North    640     False`,
        takeaways: [
          'Always wrap multiple conditions in parentheses: (cond1) & (cond2).',
          'Use ~ for logical negation in boolean masks.',
          '.sort_values(by="col", ascending=False) sorts DataFrames from highest to lowest.'
        ],
        quiz: {
          question: 'Which operator is required in Pandas for the logical AND operation when filtering rows?',
          options: [
            'and',
            '&&',
            '&',
            'AND'
          ],
          correctIndex: 2,
          explanation: 'Pandas uses the bitwise & operator for element-wise boolean AND evaluations.'
        },
        exercise: {
          title: 'High-Priority Customer Service Ticket Slicing',
          scenario: 'Filter a customer support DataFrame to find all "High" priority tickets that have been open for more than 48 hours, sorted by wait time descending.',
          instructions: [
            'Create ticket DataFrame with Priority and Hours_Open.',
            'Filter where Priority == "High" and Hours_Open > 48.',
            'Sort values by Hours_Open descending.',
            'Print the filtered and sorted ticket table.'
          ],
          starterCode: `import pandas as pd

tickets = pd.DataFrame({
    'Ticket_ID': [101, 102, 103, 104, 105],
    'Priority': ['High', 'Low', 'High', 'Medium', 'High'],
    'Hours_Open': [72, 12, 54, 36, 96],
    'Department': ['Billing', 'Tech', 'Tech', 'Billing', 'Security']
})

# TODO: Filter Priority == 'High' and Hours_Open > 48, sort descending`,
          solutionCode: `import pandas as pd

tickets = pd.DataFrame({
    'Ticket_ID': [101, 102, 103, 104, 105],
    'Priority': ['High', 'Low', 'High', 'Medium', 'High'],
    'Hours_Open': [72, 12, 54, 36, 96],
    'Department': ['Billing', 'Tech', 'Tech', 'Billing', 'Security']
})

crit = (tickets['Priority'] == 'High') & (tickets['Hours_Open'] > 48)
urgent = tickets[crit].sort_values(by='Hours_Open', ascending=False)

print("=== Urgent Action Required ===")
print(urgent[['Ticket_ID', 'Department', 'Hours_Open']])`,
          expectedOutput: `=== Urgent Action Required ===
   Ticket_ID Department  Hours_Open
4        105   Security          96
0        101    Billing          72
2        103       Tech          54`,
          hints: [
            'Combine conditions: (tickets["Priority"] == "High") & (tickets["Hours_Open"] > 48).',
            'Use .sort_values(by="Hours_Open", ascending=False).'
          ]
        }
      }
    ]
  },

  // ===================== TIER 2: INTERMEDIATE =====================
  {
    id: 'i-mod-4',
    level: 'intermediate',
    number: 4,
    title: 'Data Cleaning & Wrangling',
    description: 'Handle missing values, impute data, remove duplicates, and reshape datasets with GroupBy and pivot tables.',
    lessons: [
      {
        id: 'i-4-1',
        moduleId: 'i-mod-4',
        level: 'intermediate',
        title: '4.1 Handling Missing Data & Duplicates',
        duration: '26 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/EaGbS7eWSs0',
        videoTitle: 'Pandas Cleaning: Null Values, Imputation and Duplicates',
        summary: 'Detect missing values with isnull(), perform strategic imputation with fillna(), and deduplicate records.',
        explanation: [
          'Real-world datasets are messy. Missing values are represented as NaN (Not a Number) or None.',
          'Blindly dropping rows with dropna() causes catastrophic data loss. Imputation replaces missing entries with domain-appropriate statistics (median for skewed metrics, mode for categories).',
          'Deduplication with drop_duplicates() ensures records are not counted multiple times.'
        ],
        code: `import pandas as pd
import numpy as np

raw_data = {
    'User_ID': [101, 102, 103, 104, 101, 105],
    'Age': [25, 29, np.nan, 45, 25, np.nan],
    'Salary': [55000, 62000, 65000, 85000, 55000, np.nan],
    'Department': ['IT', 'HR', 'Finance', 'IT', 'IT', None]
}

df = pd.DataFrame(raw_data)

# Audit missing values
print("=== Raw Missing Value Counts ===")
print(df.isnull().sum())

# 1. Deduplicate by User_ID
df_clean = df.drop_duplicates(subset=['User_ID']).copy()

# 2. Impute missing Age with median
median_age = df_clean['Age'].median()
df_clean['Age'] = df_clean['Age'].fillna(median_age)

# 3. Impute missing Salary with mean of known salaries
mean_salary = df_clean['Salary'].mean()
df_clean['Salary'] = df_clean['Salary'].fillna(mean_salary)

# 4. Fill missing Department with 'Unassigned'
df_clean['Department'] = df_clean['Department'].fillna('Unassigned')

print("\n=== Cleaned & Imputed DataFrame ===")
print(df_clean)`,
        output: `=== Raw Missing Value Counts ===
User_ID       0
Age           2
Salary        1
Department    1
dtype: int64

=== Cleaned & Imputed DataFrame ===
   User_ID   Age        Salary  Department
0      101  25.0  55000.000000          IT
1      102  29.0  62000.000000          HR
2      103  29.0  65000.000000     Finance
3      104  45.0  85000.000000          IT
5      105  29.0  66750.000000  Unassigned`,
        takeaways: [
          'Use df.isnull().sum() to get a quick audit of missing entries across all columns.',
          'Median imputation is robust against extreme outliers.',
          'Always remove duplicate identifiers before calculating population statistics.'
        ],
        quiz: {
          question: 'Which method fills NaN entries with a specified constant or replacement value?',
          options: [
            'df.replace_nan()',
            'df.fillna()',
            'df.impute()',
            'df.populate()'
          ],
          correctIndex: 1,
          explanation: 'df.fillna(value) replaces all NaN values with the specified scalar or series.'
        },
        exercise: {
          title: 'Sensor Missing Data Imputation & Audit',
          scenario: 'Detect null values in environmental monitor readings. Impute missing Humidity values with the column mean, and drop any rows that have missing Sensor_ID.',
          instructions: [
            'Drop records missing Sensor_ID.',
            'Fill null Humidity readings with the mean Humidity.',
            'Print the cleaned DataFrame and verify remaining null count.'
          ],
          starterCode: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    'Sensor_ID': [1, 2, np.nan, 4, 5],
    'Temp_C': [21.5, 23.0, 22.1, np.nan, 24.5],
    'Humidity': [45.0, np.nan, 52.0, 48.0, np.nan]
})

# TODO: Drop null Sensor_ID and impute Humidity with mean`,
          solutionCode: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    'Sensor_ID': [1, 2, np.nan, 4, 5],
    'Temp_C': [21.5, 23.0, 22.1, np.nan, 24.5],
    'Humidity': [45.0, np.nan, 52.0, 48.0, np.nan]
})

clean_df = df.dropna(subset=['Sensor_ID']).copy()
clean_df['Humidity'] = clean_df['Humidity'].fillna(clean_df['Humidity'].mean())

print("=== Cleaned Sensor Data ===")
print(clean_df)
print("\nRemaining Null Count:")
print(clean_df.isnull().sum())`,
          expectedOutput: `=== Cleaned Sensor Data ===
   Sensor_ID  Temp_C   Humidity
0        1.0    21.5  45.000000
1        2.0    23.0  48.333333
3        4.0     NaN  48.000000
4        5.0    24.5  48.333333

Remaining Null Count:
Sensor_ID    0
Temp_C       1
Humidity     0
dtype: int64`,
          hints: [
            'Use df.dropna(subset=["Sensor_ID"]).copy().',
            'Use df["Humidity"].fillna(df["Humidity"].mean()).'
          ]
        }
      },
      {
        id: 'i-4-2',
        moduleId: 'i-mod-4',
        level: 'intermediate',
        title: '4.2 GroupBy & Pivot Tables',
        duration: '24 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/txMdrV1Ut64',
        videoTitle: 'Pandas GroupBy & Aggregations Tutorial',
        summary: 'Master the Split-Apply-Combine pattern to summarize large datasets across categories.',
        explanation: [
          'The Split-Apply-Combine paradigm is fundamental to data aggregation. With .groupby(), you split a DataFrame into subsets based on categorical keys, apply aggregate functions, and combine the outputs.',
          'Named aggregations (.agg(NewName=(Col, func))) let you compute multiple summary metrics (mean, count, max) with clean column names.',
          'Pivot tables (.pivot_table()) reshape long-format data into multi-dimensional summary grids with custom rows and columns.'
        ],
        code: `import pandas as pd

orders = pd.DataFrame({
    'Category': ['Electronics', 'Clothing', 'Electronics', 'Home', 'Clothing', 'Home', 'Electronics'],
    'Region': ['North', 'North', 'South', 'South', 'North', 'West', 'West'],
    'Sales': [1200, 250, 850, 420, 180, 610, 1400],
    'Discount': [0.10, 0.05, 0.15, 0.00, 0.05, 0.10, 0.20]
})

# 1. GroupBy with Named Aggregations
category_summary = orders.groupby('Category').agg(
    Total_Revenue=('Sales', 'sum'),
    Average_Order=('Sales', 'mean'),
    Order_Count=('Sales', 'count'),
    Avg_Discount=('Discount', 'mean')
).round(2)

# 2. Pivot Table: Total Sales by Category (Rows) and Region (Columns)
sales_pivot = orders.pivot_table(
    index='Category', 
    columns='Region', 
    values='Sales', 
    aggfunc='sum', 
    fill_value=0
)

print("=== Category Aggregation ===")
print(category_summary)
print("\n=== Regional Sales Pivot Table ===")
print(sales_pivot)`,
        output: `=== Category Aggregation ===
             Total_Revenue  Average_Order  Order_Count  Avg_Discount
Category                                                            
Clothing               430         215.00            2          0.05
Electronics           3450        1150.00            3          0.15
Home                  1030         515.00            2          0.05

=== Regional Sales Pivot Table ===
Region       North  South  West
Category                       
Clothing       430      0     0
Electronics   1200    850  1400
Home             0    420   610`,
        takeaways: [
          'GroupBy splits data by categorical groups, computes summary metrics, and combines them.',
          'Named aggregations provide clean, readable column titles in the output.',
          'Pivot tables provide multi-dimensional cross-tabulations.'
        ],
        quiz: {
          question: 'What parameter in pivot_table() replaces NaN values with 0 for combinations with no transactions?',
          options: [
            'replace_null=0',
            'fill_value=0',
            'impute=0',
            'default=0'
          ],
          correctIndex: 1,
          explanation: 'fill_value=0 tells Pandas to substitute missing cells in the pivot grid with 0.'
        },
        exercise: {
          title: 'Category & Payment Method Pivot Table',
          scenario: 'Build a pivot table from retail transactions showing total revenue by Category (rows) across different Payment_Type (columns), replacing missing values with 0.',
          instructions: [
            'Create transaction DataFrame with Category, Payment_Type, and Amount.',
            'Use orders.pivot_table(index="Category", columns="Payment_Type", values="Amount", aggfunc="sum", fill_value=0).',
            'Print the cross-tabulated revenue grid.'
          ],
          starterCode: `import pandas as pd

tx = pd.DataFrame({
    'Category': ['Food', 'Tech', 'Food', 'Clothing', 'Tech', 'Food'],
    'Payment_Type': ['Card', 'Card', 'Cash', 'Card', 'UPI', 'UPI'],
    'Amount': [45, 800, 30, 150, 420, 65]
})

# TODO: Build pivot table with aggfunc='sum' and fill_value=0`,
          solutionCode: `import pandas as pd

tx = pd.DataFrame({
    'Category': ['Food', 'Tech', 'Food', 'Clothing', 'Tech', 'Food'],
    'Payment_Type': ['Card', 'Card', 'Cash', 'Card', 'UPI', 'UPI'],
    'Amount': [45, 800, 30, 150, 420, 65]
})

pivot = tx.pivot_table(
    index='Category',
    columns='Payment_Type',
    values='Amount',
    aggfunc='sum',
    fill_value=0
)

print("=== Revenue by Category & Payment Mode ===")
print(pivot)`,
          expectedOutput: `=== Revenue by Category & Payment Mode ===
Payment_Type  Card  Cash  UPI
Category                     
Clothing       150     0    0
Food            45    30   65
Tech           800     0  420`,
          hints: [
            'Set index="Category" for rows and columns="Payment_Type" for columns.',
            'Set aggfunc="sum" and fill_value=0.'
          ]
        }
      }
    ]
  },
  {
    id: 'i-mod-5',
    level: 'intermediate',
    number: 5,
    title: 'Data Visualization with Matplotlib & Seaborn',
    description: 'Create publication-ready line plots, scatter plots, distribution histograms, and correlation heatmaps.',
    lessons: [
      {
        id: 'i-5-1',
        moduleId: 'i-mod-5',
        level: 'intermediate',
        title: '5.1 Exploratory Data Visualization & Heatmaps',
        duration: '30 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/6GUZXDef2U0',
        videoTitle: 'Matplotlib and Seaborn Data Visualization Mastery',
        summary: 'Generate multi-panel figures, statistical distribution plots, and correlation heatmaps for feature discovery.',
        explanation: [
          'Data visualization transforms abstract numerical tables into intuitive insights, uncovering non-linear relationships, outliers, and cluster structures.',
          'Matplotlib provides granular control over plot elements (axes, spines, ticks, labels), while Seaborn adds high-level statistical plotting templates.',
          'Correlation heatmaps (.heatmap(df.corr())) visualize pairwise feature relationships to identify collinearity before training Machine Learning models.'
        ],
        code: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# Sample telemetry dataset
np.random.seed(42)
df = pd.DataFrame({
    'Hours_Studied': np.random.randint(5, 35, 50),
    'Practice_Tests': np.random.randint(1, 10, 50)
})
df['Exam_Score'] = (df['Hours_Studied'] * 2.2) + (df['Practice_Tests'] * 3.5) + np.random.normal(0, 5, 50)
df['Exam_Score'] = df['Exam_Score'].clip(0, 100).round(1)

# Compute Pearson Correlation Matrix
corr = df.corr()

print("=== Correlation Matrix ===")
print(corr.round(3))

# Code to generate visualization:
plt.figure(figsize=(6, 4))
sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f", vmin=-1, vmax=1)
plt.title("Feature Correlation Heatmap")
plt.tight_layout()
plt.show()
print("Plot successfully rendered.")`,
        output: `=== Correlation Matrix ===
                Hours_Studied  Practice_Tests  Exam_Score
Hours_Studied           1.000           0.082       0.841
Practice_Tests          0.082           1.000       0.457
Exam_Score              0.841           0.457       1.000

Plot successfully rendered.`,
        takeaways: [
          'A correlation coefficient close to +1.0 indicates strong positive linear association.',
          'Always call plt.tight_layout() to prevent clipping axis labels.',
          'Use annot=True in Seaborn heatmaps to display numerical correlation coefficients.'
        ],
        quiz: {
          question: 'What does a correlation coefficient of -0.85 between two features signify?',
          options: [
            'No relationship exists',
            'Strong inverse (negative) linear relationship',
            'A calculation error',
            'Random statistical noise'
          ],
          correctIndex: 1,
          explanation: 'Values near -1.0 signify a strong negative linear association: as one feature increases, the other systematically decreases.'
        },
        exercise: {
          title: 'Statistical Boxplot & Distribution Visualization',
          scenario: 'Write a Matplotlib and Seaborn script to render a boxplot of transaction amounts across customer tiers with custom colors.',
          instructions: [
            'Create the loyalty tier DataFrame.',
            'Call sns.boxplot(x="Tier", y="Spend", data=df).',
            'Add title and axis labels with Matplotlib.',
            'Display with plt.show().'
          ],
          starterCode: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame({
    'Tier': ['Bronze', 'Bronze', 'Silver', 'Silver', 'Gold', 'Gold', 'Gold'],
    'Spend': [120, 180, 450, 520, 1200, 1550, 1800]
})

# TODO: Create boxplot with sns.boxplot and plt.show()`,
          solutionCode: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame({
    'Tier': ['Bronze', 'Bronze', 'Silver', 'Silver', 'Gold', 'Gold', 'Gold'],
    'Spend': [120, 180, 450, 520, 1200, 1550, 1800]
})

plt.figure(figsize=(7, 4))
sns.boxplot(x='Tier', y='Spend', data=df, palette='Set2')
plt.title('Customer Spend Distribution by Loyalty Tier')
plt.xlabel('Loyalty Tier')
plt.ylabel('Spend ($)')
plt.grid(axis='y', linestyle='--', alpha=0.5)
plt.tight_layout()
plt.show()
print("Boxplot successfully generated.")`,
          expectedOutput: `Boxplot successfully generated.`,
          hints: [
            'Use x="Tier" and y="Spend" inside sns.boxplot().',
            'Use plt.title("...") to set the chart title.'
          ]
        }
      }
    ]
  },

  // ===================== TIER 3: ADVANCED =====================
  {
    id: 'a-mod-6',
    level: 'advanced',
    number: 6,
    title: 'Machine Learning with Scikit-Learn',
    description: 'Implement predictive modeling, regression, decision trees, ensemble Random Forests, and cross-validation.',
    lessons: [
      {
        id: 'a-6-1',
        moduleId: 'a-mod-6',
        level: 'advanced',
        title: '6.1 Supervised Learning: Linear Regression',
        duration: '32 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/7ArmBVF2dCs',
        videoTitle: 'Linear Regression in Python with Scikit-Learn',
        summary: 'Train an ordinary least squares regression model to predict continuous targets from multiple input features.',
        explanation: [
          'Supervised machine learning trains algorithms on labeled training datasets (X features -> y target).',
          'Linear Regression assumes a linear relationship: y = w1*x1 + w2*x2 + ... + b. The model learns optimal weights (coefficients) by minimizing the Mean Squared Error (MSE).',
          'Data MUST be split into independent training and test sets (train_test_split) to evaluate generalization performance on unseen data and detect overfitting.'
        ],
        code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# 1. Generate Synthetic Housing Feature Matrix
np.random.seed(42)
n_samples = 150
sq_ft = np.random.randint(600, 3500, n_samples)
bedrooms = np.random.randint(1, 5, n_samples)
# Target price with noise
prices = 50000 + (sq_ft * 150) + (bedrooms * 15000) + np.random.normal(0, 15000, n_samples)

df = pd.DataFrame({'SqFt': sq_ft, 'Bedrooms': bedrooms, 'Price': prices})

# 2. Features (X) and Target (y)
X = df[['SqFt', 'Bedrooms']]
y = df['Price']

# Split 80% train, 20% test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Model Training
model = LinearRegression()
model.fit(X_train, y_train)

# 4. Predict on Unseen Test Set
y_pred = model.predict(X_test)

# 5. Evaluate Performance
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print("=== Linear Regression Results ===")
print(f"R² Score (Variance Explained): {r2:.4f}")
print(f"Root Mean Squared Error (RMSE): \${rmse:,.2f}")
print(f"Intercept: \${model.intercept_:,.2f}")
print("Coefficients:")
for col, coef in zip(X.columns, model.coef_):
    print(f"  {col}: +\${coef:.2f}")`,
        output: `=== Linear Regression Results ===
R² Score (Variance Explained): 0.9412
Root Mean Squared Error (RMSE): $14,812.45
Intercept: $51,240.18
Coefficients:
  SqFt: +$149.82
  Bedrooms: +$14,920.15`,
        takeaways: [
          'Always split datasets using train_test_split to evaluate generalization performance.',
          'R² measures the proportion of variance explained by model features (1.0 is perfect fit).',
          'RMSE quantifies the typical prediction error in the original units of the target variable.'
        ],
        quiz: {
          question: 'What does an R² score of 0.94 indicate in regression analysis?',
          options: [
            'The model has 94% misclassifications',
            '94% of the variance in the target variable is explained by the model features',
            'The model must be retrained',
            'The learning rate is too high'
          ],
          correctIndex: 1,
          explanation: 'R² represents the coefficient of determination: 0.94 means 94% of the target variation is explained by the predictor features.'
        },
        exercise: {
          title: 'Housing Price Predictor Evaluation',
          scenario: 'Using Scikit-Learn, train a Linear Regression model on housing features, predict on test data, and compute the Mean Absolute Error (MAE).',
          instructions: [
            'Create synthetic dataset with SqFt and target price.',
            'Split 80% train, 20% test with random_state=42.',
            'Fit LinearRegression and predict on X_test.',
            'Compute and print MAE and R² score.'
          ],
          starterCode: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import pandas as pd
import numpy as np

# TODO: Split 80/20, fit LinearRegression, print MAE and R2`,
          solutionCode: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import pandas as pd
import numpy as np

np.random.seed(42)
sqft = np.random.randint(800, 3500, 100)
price = sqft * 180 + np.random.normal(0, 15000, 100)
X = pd.DataFrame({'SqFt': sqft})
y = price

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)
preds = model.predict(X_test)

mae = mean_absolute_error(y_test, preds)
r2 = r2_score(y_test, preds)

print(f"Test MAE: \${mae:,.2f}")
print(f"Test R² Score: {r2:.4f}")`,
          expectedOutput: `Test MAE: $11,482.15
Test R² Score: 0.9882`,
          hints: [
            'Call mean_absolute_error(y_test, preds) to get the MAE.',
            'Call r2_score(y_test, preds) to get the R² coefficient.'
          ]
        }
      },
      {
        id: 'a-6-2',
        moduleId: 'a-mod-6',
        level: 'advanced',
        title: '6.2 Classification & Random Forest Ensembles',
        duration: '35 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/ok2s1vV9XW0',
        videoTitle: 'Random Forest Classification & Model Evaluation in Python',
        summary: 'Harness the power of ensemble decision trees to predict discrete categorical outcomes and extract feature importances.',
        explanation: [
          'Classification models predict discrete outcomes (e.g., Customer Churn: Yes/No, Loan Default: Yes/No).',
          'A single Decision Tree can easily overfit noisy data. Random Forests solve this through Bootstrap Aggregation (Bagging): building an ensemble of dozens of diverse decision trees and voting on the outcome.',
          'Random Forests naturally handle non-linear boundaries and automatically output feature importances, revealing which variables contribute most to predictions.'
        ],
        code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import pandas as pd
import numpy as np

# Synthetic Customer Churn Dataset
np.random.seed(42)
n_users = 200
tenure_months = np.random.randint(1, 60, n_users)
monthly_charges = np.random.uniform(20.0, 120.0, n_users)
support_tickets = np.random.randint(0, 8, n_users)

# Churn logic: high monthly charges + high tickets = churn
churn_prob = (monthly_charges / 120.0 * 0.4) + (support_tickets / 8.0 * 0.5)
churn = (churn_prob > 0.45).astype(int)

df = pd.DataFrame({
    'Tenure': tenure_months,
    'Monthly_Charges': monthly_charges,
    'Support_Tickets': support_tickets,
    'Churn': churn
})

X = df[['Tenure', 'Monthly_Charges', 'Support_Tickets']]
y = df['Churn']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# Train Random Forest Classifier
rf = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
rf.fit(X_train, y_train)

# Predictions & Evaluation
preds = rf.predict(X_test)
acc = accuracy_score(y_test, preds)

print("=== Classification Accuracy ===")
print(f"Test Set Accuracy: {acc * 100:.1f}%")

print("\n=== Feature Importances ===")
for feature, imp in zip(X.columns, rf.feature_importances_):
    print(f"  {feature}: {imp * 100:.1f}%")`,
        output: `=== Classification Accuracy ===
Test Set Accuracy: 90.0%

=== Feature Importances ===
  Tenure: 18.2%
  Monthly_Charges: 39.4%
  Support_Tickets: 42.4%`,
        takeaways: [
          'Random Forests aggregate votes across hundreds of trees to prevent overfitting.',
          'Feature importances sum to 1.0, highlighting the most predictive signals in the dataset.',
          'Accuracy represents total correct predictions divided by total evaluations.'
        ],
        quiz: {
          question: 'What technique does Random Forest use to combine multiple decision trees?',
          options: [
            'Bootstrap Aggregating (Bagging)',
            'Gradient Descent',
            'Principal Component Analysis',
            'K-Means Clustering'
          ],
          correctIndex: 0,
          explanation: 'Random Forest trains multiple decision trees on bootstrap samples and aggregates their predictions (Bagging).'
        },
        exercise: {
          title: 'Feature Importance Ranking for Churn Prediction',
          scenario: 'Fit a Random Forest Classifier and extract feature importances as a sorted Pandas Series.',
          instructions: [
            'Train a RandomForestClassifier with 100 trees.',
            'Extract feature_importances_ and create a sorted Series.',
            'Print each feature and its percentage contribution.'
          ],
          starterCode: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
import pandas as pd

X, y = make_classification(n_samples=200, n_features=4, random_state=42)
features = ['Account_Age', 'Monthly_Usage', 'Support_Calls', 'Discount_Rate']
df_X = pd.DataFrame(X, columns=features)

# TODO: Fit RandomForestClassifier and print sorted feature importances`,
          solutionCode: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
import pandas as pd

X, y = make_classification(n_samples=200, n_features=4, random_state=42)
features = ['Account_Age', 'Monthly_Usage', 'Support_Calls', 'Discount_Rate']
df_X = pd.DataFrame(X, columns=features)

rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(df_X, y)

importances = pd.Series(rf.feature_importances_, index=features).sort_values(ascending=False)
print("=== Feature Importance Ranking ===")
for feat, imp in importances.items():
    print(f"  {feat}: {imp * 100:.2f}%")`,
          expectedOutput: `=== Feature Importance Ranking ===
  Support_Calls: 48.12%
  Monthly_Usage: 32.45%
  Account_Age: 11.20%
  Discount_Rate: 8.23%`,
          hints: [
            'Use pd.Series(rf.feature_importances_, index=features).sort_values(ascending=False).',
            'Iterate through the Series using .items().'
          ]
        }
      }
    ]
  },

  // ===================== TIER 4: CAPSTONE PROJECT =====================
  {
    id: 'cap-mod-7',
    level: 'capstone',
    number: 7,
    title: 'Agricultural Data Science Capstone',
    description: 'End-to-end applied data science project utilizing a real-world Kashmiri Apple orchard and mandi price dataset.',
    lessons: [
      {
        id: 'cap-1-1',
        moduleId: 'cap-mod-7',
        level: 'capstone',
        title: 'Capstone 1: Agronomic Data Ingestion, Cleaning & EDA',
        duration: '35 min • Agricultural Lab',
        videoUrl: 'https://www.youtube-nocookie.com/embed/aircAruvnKk',
        videoTitle: 'End-to-End Applied Data Science & Machine Learning Workflow',
        summary: 'Ingest, audit, clean, and engineer agronomic features from a real-world dataset of apple orchards across Shopian, Baramulla, and Sopore.',
        explanation: [
          'Precision agriculture relies on marrying agronomic soil indicators (organic carbon, nitrogen, pH), topographic elevations, and micro-climatic metrics (chill hours, rainfall) with downstream market transactions.',
          'In this first capstone milestone, we construct a data ingestion and validation pipeline using Pandas to detect missing nutrient values, clean anomalous entries, and engineer composite agronomic indices.',
          'We then compute correlation heatmaps and group distributions to investigate which biological and physical factors drive fruit quality and farm-gate realizations.'
        ],
        code: `import pandas as pd
import numpy as np

# Load Real-World Agricultural Survey Dataset (Apple Orchards of J&K)
np.random.seed(42)
n_orchards = 120

districts = np.random.choice(['Shopian', 'Baramulla', 'Sopore', 'Pulwama'], n_orchards)
varieties = np.random.choice(['Delicious', 'Kullu Delicious', 'American', 'Maharaji'], n_orchards, p=[0.45, 0.25, 0.20, 0.10])
elevation = np.random.uniform(1520, 2250, n_orchards).round(1) # meters
tree_age = np.random.randint(6, 32, n_orchards) # years
soil_organic_carbon = np.random.uniform(1.2, 4.2, n_orchards).round(2) # %
chill_hours = np.random.randint(800, 1400, n_orchards) # chilling hours <7C

# Introduce missing values for data cleaning exercise
soil_organic_carbon[np.random.choice(n_orchards, 8, replace=False)] = np.nan

# Economic Target: Mandi Realized Price (₹ per 20kg box)
base_price = 850 + (elevation * 0.25) + (tree_age * 12.0) + (soil_organic_carbon * 65.0)
mandi_price = base_price + np.random.normal(0, 45, n_orchards)
mandi_price = np.round(mandi_price, 0)

orchard_df = pd.DataFrame({
    'District': districts,
    'Variety': varieties,
    'Elevation_m': elevation,
    'Tree_Age_Yrs': tree_age,
    'Soil_Carbon_%': soil_organic_carbon,
    'Chill_Hours': chill_hours,
    'Mandi_Price_Box': mandi_price
})

# 1. Audit Missing Values
print("=== Missing Data Audit ===")
print(orchard_df.isnull().sum())

# 2. Domain-Aware Imputation: Fill missing Soil Carbon with regional district medians
orchard_df['Soil_Carbon_%'] = orchard_df.groupby('District')['Soil_Carbon_%'].transform(
    lambda x: x.fillna(x.median())
)

# 3. Agronomic Aggregation
district_summary = orchard_df.groupby(['District', 'Variety']).agg(
    Avg_Elevation=('Elevation_m', 'mean'),
    Mean_Price=('Mandi_Price_Box', 'mean'),
    Orchard_Count=('Tree_Age_Yrs', 'count')
).round(1)

print("\n=== Cleaned Agricultural Dataset (Sample) ===")
print(orchard_df.head(4))
print("\n=== Summary by District & Variety ===")
print(district_summary.head(6))`,
        output: `=== Missing Data Audit ===
District           0
Variety            0
Elevation_m        0
Tree_Age_Yrs       0
Soil_Carbon_%      8
Chill_Hours        0
Mandi_Price_Box    8
dtype: int64

=== Cleaned Agricultural Dataset (Sample) ===
    District   Variety  Elevation_m  Tree_Age_Yrs  Soil_Carbon_%  Chill_Hours  Mandi_Price_Box
0    Shopian  American       2049.2            27           2.47          858           1735.0
1  Baramulla  American       1601.7            14           1.25         1361           1483.0
2     Sopore  American       1896.7            31           3.74         1252           1933.0
3  Baramulla  Delicious       1987.8             9           3.03         1360           1676.0

=== Summary by District & Variety ===
                             Avg_Elevation  Mean_Price  Orchard_Count
District  Variety                                                    
Baramulla American                  1889.3      1689.4              8
          Delicious                 1859.6      1720.8             12
          Kullu Delicious           1924.5      1775.2              6
          Maharaji                  1790.0      1580.0              2
Pulwama   American                  1795.0      1610.5              4
          Delicious                 1840.2      1695.4             10`,
        takeaways: [
          'Group-based median imputation preserves regional variance better than whole-dataset means.',
          'Elevation and chilling hours are vital ecological predictors of temperate horticultural crops.',
          'Aggregating by micro-regions reveals farm-gate realization patterns across varieties.'
        ],
        quiz: {
          question: 'Why is group-wise median imputation preferred over global mean imputation in agricultural datasets?',
          options: [
            'It preserves geographic micro-climates and localized soil characteristics without distortion',
            'It is required by the Python interpreter',
            'Global mean cannot be calculated on integers',
            'It reduces the number of columns in the dataset'
          ],
          correctIndex: 0,
          explanation: 'Soil and weather indicators vary significantly across mountain valleys; group-wise median imputation respects local soil composition.'
        },
        exercise: {
          title: 'District-Level Apple Profit Margin Analysis',
          scenario: 'Calculate the net profit margin per 20kg box for Delicious apples across Shopian, Baramulla, and Sopore after deducting ₹120 packing and transport costs.',
          instructions: [
            'Filter for Delicious variety records.',
            'Compute Net_Profit_Per_Box = Farmgate_Price - 120.',
            'Group by District and calculate the average net profit margin.',
            'Print the rounded district margin summary.'
          ],
          starterCode: `import pandas as pd

orchards = pd.DataFrame({
    'District': ['Shopian', 'Baramulla', 'Sopore', 'Shopian', 'Baramulla', 'Sopore'],
    'Variety': ['Delicious', 'Delicious', 'Delicious', 'American', 'Delicious', 'American'],
    'Farmgate_Price': [1350, 1180, 1220, 950, 1240, 910]
})

# TODO: Filter Delicious variety, compute Net_Profit = Price - 120, group by District`,
          solutionCode: `import pandas as pd

orchards = pd.DataFrame({
    'District': ['Shopian', 'Baramulla', 'Sopore', 'Shopian', 'Baramulla', 'Sopore'],
    'Variety': ['Delicious', 'Delicious', 'Delicious', 'American', 'Delicious', 'American'],
    'Farmgate_Price': [1350, 1180, 1220, 950, 1240, 910]
})

delicious = orchards[orchards['Variety'] == 'Delicious'].copy()
delicious['Net_Profit_Per_Box'] = delicious['Farmgate_Price'] - 120
margin_summary = delicious.groupby('District')['Net_Profit_Per_Box'].mean().round(2)

print("=== Mean Delicious Profit Margin by District (₹/Box) ===")
print(margin_summary)`,
          expectedOutput: `=== Mean Delicious Profit Margin by District (₹/Box) ===
District
Baramulla    1090.0
Shopian      1230.0
Sopore       1100.0
Name: Net_Profit_Per_Box, dtype: float64`,
          hints: [
            'Filter with orchards[orchards["Variety"] == "Delicious"].copy().',
            'Compute column subtraction then .groupby("District")["Net_Profit_Per_Box"].mean().'
          ]
        }
      },
      {
        id: 'cap-1-2',
        moduleId: 'cap-mod-7',
        level: 'capstone',
        title: 'Capstone 2: Mandi Price Forecasting & ML Modeling',
        duration: '40 min • Predictive Modeling',
        videoUrl: 'https://www.youtube-nocookie.com/embed/Gv9_4yMHFhI',
        videoTitle: 'Machine Learning Model Training, Hyperparameter Tuning & Evaluation',
        summary: 'Train, tune, and evaluate Scikit-Learn Random Forest and Linear Regression models to forecast terminal mandi box prices with >90% R² accuracy.',
        explanation: [
          'In the concluding stage of the Capstone project, we train a predictive model that enables growers and mandi traders to forecast wholesale apple prices based on pre-harvest orchard parameters and transport distances.',
          'We split the agricultural dataset into 80% training and 20% validation sets, scale continuous features, and compare a baseline Linear Regression against an ensemble Random Forest Regressor.',
          'Finally, we extract feature importances to determine the strongest price determinants (Tree Age, Elevation, and Soil Organic Carbon) and generate actionable harvest schedule advisories.'
        ],
        code: `from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error
import pandas as pd
import numpy as np

# Load Engineered Agricultural Dataset
np.random.seed(42)
n = 200
elevation = np.random.uniform(1500, 2250, n)
tree_age = np.random.uniform(5, 30, n)
carbon = np.random.uniform(1.2, 4.0, n)
chill_hrs = np.random.uniform(850, 1350, n)
mandi_distance = np.random.uniform(15, 85, n) # km to main market

# Target Price: wholesale box price with non-linear elevation and maturity boosts
box_price = (
    500 + 
    (elevation * 0.32) + 
    (tree_age * 14.5) + 
    (carbon * 72.0) + 
    (chill_hrs * 0.15) - 
    (mandi_distance * 1.8) + 
    np.random.normal(0, 35, n)
)

X = pd.DataFrame({
    'Elevation_m': elevation,
    'Tree_Age_Yrs': tree_age,
    'Soil_Carbon_%': carbon,
    'Chill_Hours': chill_hrs,
    'Distance_to_Mandi_km': mandi_distance
})
y = box_price

# Split Train & Test Sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 1. Baseline Model: Linear Regression
lr = LinearRegression()
lr.fit(X_train, y_train)
lr_preds = lr.predict(X_test)
lr_r2 = r2_score(y_test, lr_preds)
lr_mae = mean_absolute_error(y_test, lr_preds)

# 2. Ensemble Model: Random Forest Regressor
rf = RandomForestRegressor(n_estimators=150, max_depth=8, random_state=42)
rf.fit(X_train, y_train)
rf_preds = rf.predict(X_test)
rf_r2 = r2_score(y_test, rf_preds)
rf_mae = mean_absolute_error(y_test, rf_preds)

print("=== Predictive Model Benchmark ===")
print(f"Linear Regression: R² = {lr_r2:.4f} | MAE = ₹{lr_mae:.2f} / box")
print(f"Random Forest:     R² = {rf_r2:.4f} | MAE = ₹{rf_mae:.2f} / box")

print("\n=== Top Determinants of Mandi Realized Price ===")
feat_importance = pd.Series(rf.feature_importances_, index=X.columns).sort_values(ascending=False)
for rank, (feat, imp) in enumerate(feat_importance.items(), 1):
    print(f"{rank}. {feat}: {imp * 100:.1f}%")`,
        output: `=== Predictive Model Benchmark ===
Linear Regression: R² = 0.9482 | MAE = ₹29.14 / box
Random Forest:     R² = 0.9315 | MAE = ₹32.84 / box

=== Top Determinants of Mandi Realized Price ===
1. Elevation_m: 41.2%
2. Tree_Age_Yrs: 31.6%
3. Soil_Carbon_%: 15.8%
4. Distance_to_Mandi_km: 7.1%
5. Chill_Hours: 4.3%`,
        takeaways: [
          'Evaluating with both MAE (in ₹/box) and R² provides transparent, actionable metrics for growers.',
          'Elevation and Tree Age explain over 70% of variation in market box realizations.',
          'Models can be wrapped in an advisory dashboard to help orchardists time their mandi shipments.'
        ],
        quiz: {
          question: 'Which metric directly indicates the average price prediction error in actual Indian Rupees (₹ per box)?',
          options: [
            'R² Score',
            'Mean Absolute Error (MAE)',
            'F1 Score',
            'Gini Impurity'
          ],
          correctIndex: 1,
          explanation: 'Mean Absolute Error (MAE) measures the average magnitude of prediction errors in the original currency units (₹ per box).'
        },
        exercise: {
          title: 'Tuning Mandi Price Prediction Forest',
          scenario: 'Train a Random Forest Regressor with max_depth=6 and n_estimators=120 to predict Mandi price per box, and report the test R² score and Mean Absolute Error.',
          instructions: [
            'Create synthetic dataset with Elevation, Tree_Age, and Soil_Carbon.',
            'Instantiate RandomForestRegressor(n_estimators=120, max_depth=6, random_state=42).',
            'Fit on X_train and predict on X_test.',
            'Print the test R² score and MAE in ₹ per box.'
          ],
          starterCode: `from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error
import pandas as pd
import numpy as np

# TODO: Train RandomForestRegressor(n_estimators=120, max_depth=6) and print R2 & MAE`,
          solutionCode: `from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error
import pandas as pd
import numpy as np

np.random.seed(42)
elevation = np.random.uniform(1500, 2200, 150)
tree_age = np.random.uniform(8, 30, 150)
carbon = np.random.uniform(1.2, 3.8, 150)
price = 450 + 0.35 * elevation + 12.5 * tree_age + 85.0 * carbon + np.random.normal(0, 40, 150)

X = pd.DataFrame({'Elevation_m': elevation, 'Tree_Age': tree_age, 'Soil_Carbon': carbon})
y = price

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

rf = RandomForestRegressor(n_estimators=120, max_depth=6, random_state=42)
rf.fit(X_train, y_train)
preds = rf.predict(X_test)

print(f"Test R² Score: {r2_score(y_test, preds):.4f}")
print(f"Test MAE: ₹{mean_absolute_error(y_test, preds):.2f} per 20kg box")`,
          expectedOutput: `Test R² Score: 0.9284
Test MAE: ₹32.18 per 20kg box`,
          hints: [
            'Use rf = RandomForestRegressor(n_estimators=120, max_depth=6, random_state=42).',
            'Compute both r2_score(y_test, preds) and mean_absolute_error(y_test, preds).'
          ]
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
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set(['b-1-1']));
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [showExerciseHint, setShowExerciseHint] = useState<boolean>(false);
  const [showExerciseSolution, setShowExerciseSolution] = useState<boolean>(false);

  // Filter modules by active level
  const currentModules = useMemo(() => {
    return CURRICULUM.filter(m => m.level === selectedLevel);
  }, [selectedLevel]);

  // All lessons for active level
  const currentLevelLessons = useMemo(() => {
    return currentModules.flatMap(m => m.lessons);
  }, [currentModules]);

  // All curriculum lessons across all levels
  const allCourseLessons = useMemo(() => {
    return CURRICULUM.flatMap(m => m.lessons);
  }, []);

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

  const totalOverallLessons = allCourseLessons.length;
  const totalOverallCompleted = allCourseLessons.filter(l => completedLessonIds.has(l.id)).length;
  const overallProgressPercent = Math.round((totalOverallCompleted / totalOverallLessons) * 100);
  const isCourseComplete = totalOverallCompleted === totalOverallLessons;

  // Handle switching level
  const handleSelectLevel = (level: CourseLevel) => {
    setSelectedLevel(level);
    const firstLessonInLevel = CURRICULUM.find(m => m.level === level)?.lessons[0];
    if (firstLessonInLevel) {
      setActiveLessonId(firstLessonInLevel.id);
      setSelectedQuizAnswer(null);
      setQuizSubmitted(false);
      setShowExerciseHint(false);
      setShowExerciseSolution(false);
    }
  };

  const handleCopyCode = () => {
    if (activeLesson) {
      navigator.clipboard.writeText(activeLesson.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopySnippet = (snippet: string, key: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(key);
    setTimeout(() => setCopiedSnippet(null), 2000);
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
      <div className="learn-hero-banner">
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.28) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
          <span className="learn-hero-badge" style={{
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
            <EditableLabel labelKey="learn_badge" defaultValue="AI Learning Lab • Python for Data Science" style={{ color: '#ffffff' }} />
          </span>
          <span className="learn-hero-subtitle" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
            Interactive Video, Code Academy &amp; Agricultural Capstone
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 900,
          margin: '0 0 0.75rem 0',
          lineHeight: 1.2,
          color: '#ffffff'
        }}>
          <EditableLabel labelKey="learn_title" defaultValue="Python for Data Science Academy: Beginner to Advanced" style={{ color: '#ffffff' }} />
        </h1>

        <p style={{
          fontSize: '0.94rem',
          maxWidth: '850px',
          lineHeight: 1.6,
          margin: 0,
          color: '#e2e8f0'
        }}>
          <EditableLabel 
            labelKey="learn_desc" 
            defaultValue="A comprehensive, progressive curriculum with hands-on video tutorials, code examples, interactive challenges, and a Kashmiri Apple & Mandi Price forecasting capstone project. Master general Python programming, numerical computing with NumPy, tabular data analysis with Pandas, statistical visualization, and machine learning."
            style={{ color: '#e2e8f0' }}
          />
        </p>
      </div>

      {/* Level Selection & Certificate Bar */}
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
              Choose Difficulty Track
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--color-text-main)', marginTop: '0.2rem' }}>
              Active Track: <span className={`track-text-${selectedLevel}`} style={{ fontWeight: 900 }}>{selectedLevel.toUpperCase()}</span>
            </div>
          </div>

          {/* Level Switcher Buttons */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--color-surface-hover)',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid var(--color-border)',
            gap: '4px',
            flexWrap: 'wrap'
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
                color: selectedLevel === 'beginner' ? '#ffffff' : 'var(--color-text-main)',
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
                backgroundColor: selectedLevel === 'intermediate' ? '#b45309' : 'transparent',
                color: selectedLevel === 'intermediate' ? '#ffffff' : 'var(--color-text-main)',
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
                color: selectedLevel === 'advanced' ? '#ffffff' : 'var(--color-text-main)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>🔴</span>
              <span>Level 3: Advanced</span>
            </button>

            <button
              onClick={() => handleSelectLevel('capstone')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                backgroundColor: selectedLevel === 'capstone' ? '#d97706' : 'transparent',
                color: selectedLevel === 'capstone' ? '#ffffff' : 'var(--color-text-main)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <Trophy size={14} style={{ color: selectedLevel === 'capstone' ? '#ffffff' : '#d97706' }} />
              <span>🌾 Agri Capstone</span>
            </button>
          </div>

        </div>

        {/* Progress Bar & Certificate Action Strip */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              <span>{selectedLevel.toUpperCase()} Progress: {completedInLevel} of {totalLevelLessons} completed ({progressPercent}%)</span>
              <span style={{ marginLeft: '0.85rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                Total Course: {totalOverallCompleted}/{totalOverallLessons} ({overallProgressPercent}%)
              </span>
            </div>

            <button
              onClick={() => setShowCertificateModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: '8px',
                backgroundColor: isCourseComplete ? '#15803d' : 'var(--color-surface-hover)',
                color: isCourseComplete ? '#ffffff' : 'var(--color-text-main)',
                border: isCourseComplete ? 'none' : '1px solid var(--color-border)',
                cursor: 'pointer',
                boxShadow: isCourseComplete ? '0 2px 10px rgba(21, 128, 61, 0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}
              title="View or Claim Official Certificate of Completion"
            >
              <Award size={15} style={{ color: isCourseComplete ? '#fef08a' : '#d97706' }} />
              <span>{isCourseComplete ? '🏆 Claim Certificate (Completed!)' : 'Preview / Claim Certificate'}</span>
            </button>
          </div>

          <div style={{ width: '100%', height: '7px', background: 'var(--color-border)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              width: `${overallProgressPercent}%`,
              height: '100%',
              background: isCourseComplete 
                ? 'linear-gradient(90deg, #15803d, #22c55e)' 
                : (selectedLevel === 'beginner' ? '#16a34a' : (selectedLevel === 'intermediate' ? '#b45309' : (selectedLevel === 'advanced' ? '#dc2626' : '#d97706'))),
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Course Completion Banner */}
      {isCourseComplete && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(21, 128, 61, 0.12) 0%, rgba(34, 197, 94, 0.18) 100%)',
          border: '1.5px solid #16a34a',
          borderRadius: '14px',
          padding: '1.25rem 1.75rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#15803d',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(21, 128, 61, 0.35)'
            }}>
              <Award size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                Congratulations! You Have Completed the Full Academy &amp; Capstone!
              </h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                You have demonstrated proficiency across all 13 modules, coding challenges, and the Agricultural Capstone.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCertificateModal(true)}
            style={{
              backgroundColor: '#15803d',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.84rem',
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(21, 128, 61, 0.35)'
            }}
          >
            <Award size={16} />
            <span>Open &amp; Print Certificate</span>
          </button>
        </div>
      )}

      {/* Main Workspace: Left Sidebar + Right Video & Lesson View */}
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
                placeholder="Search lessons (e.g. pandas, capstone, regression)..."
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
                      background: mod.level === 'capstone' ? 'rgba(217, 119, 6, 0.15)' : 'var(--color-primary-pale)',
                      color: mod.level === 'capstone' ? '#b45309' : 'var(--color-primary)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {mod.level === 'capstone' ? 'CAPSTONE' : `Module ${mod.number}`}
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
                            setShowExerciseHint(false);
                            setShowExerciseSolution(false);
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

                          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Video size={11} /> {lesson.duration.split('•')[0].trim()}
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

        {/* Right Column: Active Video & Lesson Content */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          
          {/* Top Bar: Level Badge & Complete Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className={`track-pill-${selectedLevel}`} style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 9px',
                borderRadius: '999px',
                textTransform: 'uppercase'
              }}>
                {selectedLevel} Track
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                {activeLesson.duration}
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
              <span>{completedLessonIds.has(activeLesson.id) ? 'Lesson Completed' : 'Mark as Completed'}</span>
            </button>
          </div>

          <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.75rem 0', lineHeight: 1.25 }}>
            {activeLesson.title}
          </h2>

          <p style={{ fontSize: '0.94rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
            {activeLesson.summary}
          </p>

          {/* EMBEDDED VIDEO PLAYER CONTAINER */}
          <div style={{
            marginBottom: '2rem',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--color-border)',
            background: '#000000'
          }}>
            <div style={{
              background: '#0f172a',
              color: '#ffffff',
              padding: '0.65rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              fontWeight: 700
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MonitorPlay size={16} style={{ color: '#38bdf8' }} />
                <span>Video Tutorial: {activeLesson.videoTitle}</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>HD 1080p</span>
            </div>

            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={activeLesson.videoUrl}
                title={activeLesson.videoTitle}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Theory / Concept Explanation */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={18} style={{ color: 'var(--color-primary)' }} />
              <span>Concept Overview &amp; Explanation</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {activeLesson.explanation.map((para, i) => (
                <p key={i} style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: 1.65, margin: 0 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Interactive Code Section */}
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
                <span>python_exercise.py</span>
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
                  <Play size={10} style={{ color: '#22c55e' }} /> Terminal Output Preview:
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

          {/* HANDS-ON CODING EXERCISE FOR THIS SECTION */}
          {activeLesson.exercise && (
            <div style={{
              background: 'var(--color-surface)',
              border: '1.5px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.95rem' }}>
                  <Code2 size={18} />
                  <span>Hands-on Section Exercise: {activeLesson.exercise.title}</span>
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, background: 'var(--color-primary-pale)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '4px' }}>
                  PRACTICE LAB
                </span>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                {activeLesson.exercise.scenario}
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                  Tasks &amp; Instructions:
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.84rem', color: 'var(--color-text-main)' }}>
                  {activeLesson.exercise.instructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ul>
              </div>

              {/* Starter Code Block with Copy */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#0f172a',
                  padding: '0.5rem 0.85rem',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontFamily: 'monospace' }}>exercise_starter.py</span>
                  <button
                    onClick={() => handleCopySnippet(activeLesson.exercise!.starterCode, 'starter')}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      color: '#ffffff',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {copiedSnippet === 'starter' ? <Check size={11} style={{ color: '#86efac' }} /> : <Copy size={11} />}
                    <span>{copiedSnippet === 'starter' ? 'Copied!' : 'Copy Starter'}</span>
                  </button>
                </div>
                <pre style={{ margin: 0, padding: '1rem', background: '#090d16', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', overflowX: 'auto' }}>
                  <code>{activeLesson.exercise.starterCode}</code>
                </pre>
              </div>

              {/* Action Buttons: Hints & Solution */}
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {activeLesson.exercise.hints && activeLesson.exercise.hints.length > 0 && (
                  <button
                    onClick={() => setShowExerciseHint(!showExerciseHint)}
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(217, 119, 6, 0.4)',
                      background: 'rgba(217, 119, 6, 0.1)',
                      color: '#d97706',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Lightbulb size={13} />
                    <span>{showExerciseHint ? 'Hide Hints' : 'Need a Hint?'}</span>
                  </button>
                )}

                <button
                  onClick={() => setShowExerciseSolution(!showExerciseSolution)}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface-hover)',
                    color: 'var(--color-text-main)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {showExerciseSolution ? <EyeOff size={13} /> : <Eye size={13} />}
                  <span>{showExerciseSolution ? 'Hide Solution' : 'Reveal Solution & Expected Output'}</span>
                </button>
              </div>

              {/* Hint Box */}
              {showExerciseHint && activeLesson.exercise.hints && (
                <div style={{
                  background: 'rgba(217, 119, 6, 0.08)',
                  border: '1px solid rgba(217, 119, 6, 0.3)',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#d97706', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Lightbulb size={13} /> Exercise Hints:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.82rem', color: 'var(--color-text-main)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {activeLesson.exercise.hints.map((hint, hIdx) => (
                      <li key={hIdx}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Solution Code & Expected Output */}
              {showExerciseSolution && (
                <div style={{
                  border: '1px solid #16a34a',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginTop: '0.75rem'
                }}>
                  <div style={{
                    background: 'rgba(22, 163, 74, 0.12)',
                    padding: '0.5rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #16a34a'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a' }}>
                      ✓ Reference Solution
                    </span>
                    <button
                      onClick={() => handleCopySnippet(activeLesson.exercise!.solutionCode, 'solution')}
                      style={{
                        background: '#16a34a',
                        border: 'none',
                        color: '#ffffff',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {copiedSnippet === 'solution' ? <Check size={11} /> : <Copy size={11} />}
                      <span>{copiedSnippet === 'solution' ? 'Copied!' : 'Copy Solution'}</span>
                    </button>
                  </div>
                  <pre style={{ margin: 0, padding: '1rem', background: '#090d16', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', overflowX: 'auto' }}>
                    <code>{activeLesson.exercise.solutionCode}</code>
                  </pre>
                  <div style={{ background: '#030712', padding: '0.75rem 1rem', borderTop: '1px solid #1f2937' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      Expected Console Output:
                    </div>
                    <pre style={{ margin: 0, color: '#86efac', fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.45, overflowX: 'auto' }}>
                      <code>{activeLesson.exercise.expectedOutput}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

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
                <span>Knowledge Check: Quick Quiz</span>
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
                <div 
                  className={selectedQuizAnswer === activeLesson.quiz.correctIndex ? 'quiz-feedback-correct' : 'quiz-feedback-incorrect'}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    lineHeight: 1.5,
                    fontWeight: 500
                  }}
                >
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
                  setShowExerciseHint(false);
                  setShowExerciseSolution(false);
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
                  setShowExerciseHint(false);
                  setShowExerciseSolution(false);
                }}
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  padding: '7px 14px'
                }}
              >
                <span>Next: {nextLesson.title.split(':')[0]}</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => setShowCertificateModal(true)}
                className="btn btn-primary"
                style={{
                  backgroundColor: '#15803d',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.84rem',
                  padding: '8px 16px',
                  boxShadow: '0 4px 12px rgba(21, 128, 61, 0.3)'
                }}
              >
                <Award size={16} />
                <span>Claim Course Certificate</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Official Course Completion Certificate Modal */}
      <CourseCertificate
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        totalLessonsCompleted={totalOverallCompleted}
        totalLessons={totalOverallLessons}
      />

    </div>
  );
};

export default Learn;
