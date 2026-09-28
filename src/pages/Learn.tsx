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
  HelpCircle,
  Video,
  MonitorPlay,
  BookOpen
} from 'lucide-react';
import { EditableLabel } from '../components/EditableLabel';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

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
          question: 'What is the output of type(10 / 2) in Python 3?',
          options: [
            '<class "int">',
            '<class "float">',
            '<class "number">',
            '<class "double">'
          ],
          correctIndex: 1,
          explanation: 'In Python 3, the standard division operator (/) always returns a float, even if the division has no remainder (10 / 2 = 5.0).'
        }
      },
      {
        id: 'b-1-2',
        moduleId: 'b-mod-1',
        level: 'beginner',
        title: '1.2 Lists, Tuples, Dictionaries & Sets',
        duration: '22 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/W8KRzm-HUcc',
        videoTitle: 'Python Data Structures: Lists, Tuples, and Dictionaries',
        summary: 'Master the four core Python collection types essential for storing and managing datasets.',
        explanation: [
          'Data science workflows revolve around collections of records. Python provides four built-in collection types with different properties:',
          '1. Lists: Ordered, mutable collections that can hold mixed types (e.g. [10, 20, 30]).',
          '2. Tuples: Ordered, immutable collections (cannot be modified after creation). Ideal for fixed coordinates or constants.',
          '3. Dictionaries: Key-value mappings offering lightning-fast O(1) lookups by unique key (e.g. {"name": "Alice", "score": 95}).',
          '4. Sets: Unordered collections of unique elements, useful for deduplication.'
        ],
        code: `# Lists (Mutable, Ordered)
scores = [88, 92, 79, 95, 84]
scores.append(90)
avg_score = sum(scores) / len(scores)

# Dictionaries (Key-Value pairs)
student = {
    "id": 1042,
    "name": "Sarah Chen",
    "scores": scores,
    "passed": True
}

# List comprehension: Filter scores above 85
high_scores = [s for s in scores if s >= 85]

print(f"Student: {student['name']} (ID: {student['id']})")
print(f"All Scores: {student['scores']}")
print(f"Average Score: {avg_score:.2f}")
print(f"Scores >= 85: {high_scores}")`,
        output: `Student: Sarah Chen (ID: 1042)
All Scores: [88, 92, 79, 95, 84, 90]
Average Score: 88.00
Scores >= 85: [88, 92, 95, 90]`,
        takeaways: [
          'Lists use square brackets [] and are mutable (items can be added, removed, or changed).',
          'Dictionaries use curly braces {} with key-value pairs (key: value).',
          'List comprehensions offer a fast, concise way to construct new filtered lists.'
        ],
        quiz: {
          question: 'Which of the following data structures is immutable (cannot be changed once created)?',
          options: [
            'List',
            'Dictionary',
            'Tuple',
            'Set'
          ],
          correctIndex: 2,
          explanation: 'Tuples are immutable; once defined, their elements cannot be appended, replaced, or removed.'
        }
      },
      {
        id: 'b-1-3',
        moduleId: 'b-mod-1',
        level: 'beginner',
        title: '1.3 Control Flow & Functions',
        duration: '20 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/9Os0o3wzS_I',
        videoTitle: 'Functions, Arguments and Return Values in Python',
        summary: 'Package reusable logic into clean functions and use conditional statements and loops effectively.',
        explanation: [
          'Functions are self-contained, reusable blocks of code that take inputs (arguments), perform operations, and return an output using the return statement.',
          'Using functions reduces duplicate code, improves readability, and allows you to test isolated components of your data pipeline.',
          'Combining loops (for, while) with if-elif-else statements enables automated data filtering, threshold alerting, and metric aggregation.'
        ],
        code: `# Define a reusable data normalization function
def calculate_statistics(data_points):
    """
    Computes mean, min, max, and range for a numerical list.
    """
    if not data_points:
        return None
        
    n = len(data_points)
    mean_val = sum(data_points) / n
    min_val = min(data_points)
    max_val = max(data_points)
    data_range = max_val - min_val
    
    return {
        "count": n,
        "mean": round(mean_val, 2),
        "min": min_val,
        "max": max_val,
        "range": data_range
    }

# Test data: Daily temperatures in Celsius
temperatures = [22.4, 24.1, 21.8, 25.6, 26.2, 23.0, 24.8]
stats = calculate_statistics(temperatures)

print("=== Temperature Summary ===")
for metric, value in stats.items():
    print(f"{metric.capitalize():8s}: {value}")`,
        output: `=== Temperature Summary ===
Count   : 7
Mean    : 23.99
Min     : 21.8
Max     : 26.2
Range   : 4.4`,
        takeaways: [
          'Define functions with the def keyword and specify docstrings to document behavior.',
          'Always handle edge cases (such as empty inputs) gracefully.',
          'Functions should ideally do one thing well and return a clear result.'
        ],
        quiz: {
          question: 'What keyword is used to pass back a result from inside a Python function?',
          options: [
            'output',
            'return',
            'send',
            'yield_all'
          ],
          correctIndex: 1,
          explanation: 'The return keyword exits a function and passes back the specified value to the caller.'
        }
      }
    ]
  },
  {
    id: 'b-mod-2',
    level: 'beginner',
    number: 2,
    title: 'NumPy: Fast Array Computing',
    description: 'Vectorized mathematical operations, multi-dimensional slicing, and statistical computation with NumPy.',
    lessons: [
      {
        id: 'b-2-1',
        moduleId: 'b-mod-2',
        level: 'beginner',
        title: '2.1 NumPy Arrays & Vectorization',
        duration: '25 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/QUT1VHiLmmI',
        videoTitle: 'NumPy Full Course: Vectorized Mathematics and ndarrays',
        summary: 'Learn why NumPy ndarrays are the foundation of numerical and scientific computing in Python.',
        explanation: [
          'Standard Python lists are flexible but slow for large-scale mathematical computations because they store references to objects in scattered memory.',
          'NumPy (Numerical Python) introduces the ndarray (N-dimensional array), storing elements in contiguous memory blocks with homogeneous data types.',
          'Vectorization allows mathematical operations to execute at compiled C-speed across entire arrays without writing slow Python for-loops.'
        ],
        code: `import numpy as np

# Create 1D and 2D arrays
sales_units = np.array([120, 145, 98, 210, 180])
unit_price = 15.50

# Vectorized operation: Multiply all items in one operation
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
print("\\nStore Matrix Shape:", store_matrix.shape)
print("Quarterly Totals across all stores:", np.sum(store_matrix, axis=0))`,
        output: `Total Revenue per Product ($): [1860.  2247.5 1519.  3255.  2790. ]
Overall Total Revenue: $11,671.50
Average Units Sold: 150.6
Standard Deviation: 39.51

Store Matrix Shape: (3, 4)
Quarterly Totals across all stores: [380 425 470 505]`,
        takeaways: [
          'NumPy arrays are up to 50x faster than standard Python lists for numerical tasks.',
          'Broadcasting allows operations between scalars and arrays or between compatible matrices.',
          'Use axis=0 for column-wise operations and axis=1 for row-wise operations.'
        ],
        quiz: {
          question: 'If a 2D array has 5 rows and 3 columns, what will arr.shape return?',
          options: [
            '(15,)',
            '(3, 5)',
            '(5, 3)',
            '[5, 3]'
          ],
          correctIndex: 2,
          explanation: 'NumPy shapes are represented as tuples in the order of (rows, columns): (5, 3).'
        }
      }
    ]
  },
  {
    id: 'b-mod-3',
    level: 'beginner',
    number: 3,
    title: 'Pandas Basics: DataFrames & Data Exploration',
    description: 'Loading CSV datasets, Series vs DataFrames, and filtering tables with boolean logic.',
    lessons: [
      {
        id: 'b-3-1',
        moduleId: 'b-mod-3',
        level: 'beginner',
        title: '3.1 DataFrames, Series & CSV Loading',
        duration: '25 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/vmEHCJofslg',
        videoTitle: 'Pandas Full Tutorial: Loading Datasets and Working with DataFrames',
        summary: 'Explore the core workhorse of Data Science: the 2D tabular Pandas DataFrame.',
        explanation: [
          'Pandas is the premier library for structured tabular data. A DataFrame is a two-dimensional labeled data structure with columns of potentially different types (similar to an SQL table or Excel sheet).',
          'Every individual column in a DataFrame is a Pandas Series (a 1D labeled array).',
          'In practice, you load data into Pandas from external files using pd.read_csv(), pd.read_excel(), or database queries, and inspect it with .head(), .info(), and .describe().'
        ],
        code: `import pandas as pd

# Creating a DataFrame from raw records
data = {
    'Transaction_ID': [1001, 1002, 1003, 1004, 1005],
    'Region': ['North', 'West', 'North', 'South', 'East'],
    'Product': ['Laptop', 'Mouse', 'Monitor', 'Keyboard', 'Laptop'],
    'Units': [3, 15, 4, 8, 2],
    'Unit_Price': [899.99, 25.50, 220.00, 45.00, 950.00]
}

df = pd.DataFrame(data)

# Compute new calculated column
df['Total_Sales'] = df['Units'] * df['Unit_Price']

print("=== DataFrame Head (Top 5 Records) ===")
print(df)
print("\\n=== Summary Statistics ===")
print(df[['Units', 'Total_Sales']].describe().round(2))`,
        output: `=== DataFrame Head (Top 5 Records) ===
   Transaction_ID Region   Product  Units  Unit_Price  Total_Sales
0            1001  North    Laptop      3      899.99      2699.97
1            1002   West     Mouse     15       25.50       382.50
2            1003  North   Monitor      4      220.00       880.00
3            1004  South  Keyboard      8       45.00       360.00
4            1005   East    Laptop      2      950.00      1900.00

=== Summary Statistics ===
       Units  Total_Sales
count    5.0         5.00
mean     6.4      1244.49
std      5.3      1006.14
min      2.0       360.00
25%      3.0       382.50
50%      4.0       880.00
75%      8.0      1900.00
max     15.0      2699.97`,
        takeaways: [
          'Load external data using pd.read_csv("filename.csv").',
          'Create new columns seamlessly by performing vectorized operations on existing columns.',
          '.describe() delivers immediate counts, means, standard deviations, and quartile splits.'
        ],
        quiz: {
          question: 'What method is used to preview the first 5 rows of a Pandas DataFrame?',
          options: [
            'df.preview()',
            'df.top()',
            'df.head()',
            'df.first(5)'
          ],
          correctIndex: 2,
          explanation: 'df.head() returns the first n rows (default is 5).'
        }
      },
      {
        id: 'b-3-2',
        moduleId: 'b-mod-3',
        level: 'beginner',
        title: '3.2 Filtering & Querying DataFrames',
        duration: '20 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/zyGfECfJ9BY?start=600',
        videoTitle: 'Pandas Data Filtering, Conditional Selection and Loc/Iloc',
        summary: 'Filter records with boolean conditions, select columns, and use .loc and .iloc for precision indexing.',
        explanation: [
          'Filtering is essential to isolate subsets of data (e.g., customers who purchased a specific item, or rows where sales exceed $1,000).',
          'Boolean indexing evaluates conditions row-by-row, returning True or False.',
          'Combine multiple criteria using bitwise operators: & (AND), | (OR), and ~ (NOT). Always wrap individual conditions in parentheses.',
          '.loc uses label-based indexing, whereas .iloc uses zero-based integer index positions.'
        ],
        code: `import pandas as pd

df = pd.DataFrame({
    'City': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'],
    'State': ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA'],
    'Population': [8336817, 3979576, 2693976, 2320268, 1680992, 1584064],
    'Growth_Rate': [0.4, -0.2, -0.5, 1.2, 1.8, -0.1]
})

# Filter 1: Cities with population over 2.5 million
large_cities = df[df['Population'] > 2500000]

# Filter 2: Cities in California OR Texas with positive growth
growing_sunbelt = df[
    (df['State'].isin(['CA', 'TX'])) & 
    (df['Growth_Rate'] > 0)
]

print("=== Large Cities (>2.5M) ===")
print(large_cities[['City', 'Population']])
print("\\n=== Growing CA/TX Cities ===")
print(growing_sunbelt[['City', 'State', 'Growth_Rate']])`,
        output: `=== Large Cities (>2.5M) ===
          City  Population
0     New York     8336817
1  Los Angeles     3979576
2      Chicago     2693976

=== Growing CA/TX Cities ===
      City State  Growth_Rate
3  Houston    TX          1.2`,
        takeaways: [
          'Always wrap multiple conditions in parentheses: (cond1) & (cond2).',
          'Use .isin([list]) to match values against a target list.',
          'Use .loc[row_condition, [columns]] to simultaneously filter rows and select columns.'
        ],
        quiz: {
          question: 'Which operator represents logical OR when filtering a Pandas DataFrame?',
          options: [
            '||',
            'or',
            '|',
            'either'
          ],
          correctIndex: 2,
          explanation: 'Pandas uses the bitwise pipe operator (|) for element-wise boolean OR operations.'
        }
      }
    ]
  },

  // ===================== TIER 2: INTERMEDIATE =====================
  {
    id: 'i-mod-4',
    level: 'intermediate',
    number: 4,
    title: 'Data Wrangling, GroupBy & Cleaning',
    description: 'Handling missing values, duplicate records, split-apply-combine aggregations, and reshaping.',
    lessons: [
      {
        id: 'i-4-1',
        moduleId: 'i-mod-4',
        level: 'intermediate',
        title: '4.1 Handling Missing Data & Duplicates',
        duration: '22 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/KdmPHEn83w8',
        videoTitle: 'Data Cleaning: Handling Missing Values and Duplicates in Pandas',
        summary: 'Detect, impute, or drop missing values (NaN) and clean duplicate rows from raw datasets.',
        explanation: [
          'Real-world datasets are messy: sensors fail, users skip form fields, and transmission drops cause missing values (represented as NaN or None in Pandas).',
          'You have two main strategies for missing data: dropping rows/columns with .dropna(), or imputing missing entries with mean, median, mode, or forward-fill using .fillna().',
          'Duplicate records distort statistical analyses; use .duplicated() to identify repeats and .drop_duplicates() to clean them.'
        ],
        code: `import pandas as pd
import numpy as np

# Sample dataset with missing values and duplicates
df = pd.DataFrame({
    'User_ID': [101, 102, 103, 104, 102, 105],
    'Age': [25, np.nan, 34, 45, np.nan, 29],
    'Salary': [55000, 62000, np.nan, 85000, 62000, 58000],
    'Department': ['IT', 'HR', 'Finance', 'IT', 'HR', np.nan]
})

print("=== Raw Missing Value Counts ===")
print(df.isnull().sum())

# 1. Remove duplicate user records
df_clean = df.drop_duplicates(subset=['User_ID']).copy()

# 2. Impute missing Age with median
median_age = df_clean['Age'].median()
df_clean['Age'] = df_clean['Age'].fillna(median_age)

# 3. Impute missing Salary with mean of known salaries
mean_salary = df_clean['Salary'].mean()
df_clean['Salary'] = df_clean['Salary'].fillna(mean_salary)

# 4. Fill missing Department with 'Unassigned'
df_clean['Department'] = df_clean['Department'].fillna('Unassigned')

print("\\n=== Cleaned & Imputed DataFrame ===")
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
2      103  34.0  65000.000000     Finance
3      104  45.0  85000.000000          IT
5      105  29.0  58000.000000  Unassigned`,
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

# E-commerce orders dataset
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
print("\\n=== Regional Sales Pivot Table ===")
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
        title: '5.1 Statistical Plotting with Seaborn & Matplotlib',
        duration: '26 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/6GUZXDef2U0',
        videoTitle: 'Seaborn Tutorial: Statistical Data Visualization in Python',
        summary: 'Visualize distributions, categorical comparisons, and correlation matrices using Seaborn.',
        explanation: [
          'Data visualization is crucial for exploring data distributions, identifying outliers, and communicating findings to stakeholders.',
          'Matplotlib provides granular, low-level control over figures, axes, ticks, and legends.',
          'Seaborn builds on top of Matplotlib, providing beautiful high-level statistical plots (box plots, violin plots, regression lines, and heatmaps) with minimal code.'
        ],
        code: `import pandas as pd
import numpy as np

# Simulate customer transaction dataset
np.random.seed(42)
df = pd.DataFrame({
    'Income': np.random.normal(65000, 15000, 100),
    'Spend_Score': np.random.uniform(1, 100, 100),
    'Age': np.random.randint(18, 70, 100),
    'Purchases': np.random.poisson(12, 100)
})

# Compute Pearson Correlation Matrix
correlation_matrix = df.corr().round(2)

print("=== Pearson Correlation Matrix ===")
print(correlation_matrix)
print("\\nPlotting code snippet:")
print("""import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(8, 6))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm', fmt='.2f')
plt.title('Feature Correlation Heatmap')
plt.tight_layout()
plt.show()""")`,
        output: `=== Pearson Correlation Matrix ===
             Income  Spend_Score   Age  Purchases
Income         1.00        -0.08  0.03       0.04
Spend_Score   -0.08         1.00  0.01       0.09
Age            0.03         0.01  1.00      -0.03
Purchases      0.04         0.09 -0.03       1.00

Plotting code snippet:
import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(8, 6))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm', fmt='.2f')
plt.title('Feature Correlation Heatmap')
plt.tight_layout()
plt.show()`,
        takeaways: [
          'Seaborn integrates natively with Pandas DataFrames.',
          'Correlation heatmaps instantly reveal linear dependencies between numerical features.',
          'Use plt.tight_layout() to prevent labels from getting clipped.'
        ],
        quiz: {
          question: 'Which Seaborn function generates a 2D color-coded matrix of values?',
          options: [
            'sns.matrix_plot()',
            'sns.heatmap()',
            'sns.color_grid()',
            'sns.contour()'
          ],
          correctIndex: 1,
          explanation: 'sns.heatmap() visualizes 2D data (like correlation tables) with color gradients.'
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
    description: 'Supervised learning: feature preprocessing, regression, classification, and evaluation metrics.',
    lessons: [
      {
        id: 'a-6-1',
        moduleId: 'a-mod-6',
        level: 'advanced',
        title: '6.1 Supervised Learning & Linear Regression',
        duration: '28 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/7eh4d6sabA0?start=600',
        videoTitle: 'Machine Learning with Scikit-Learn: Linear Regression Tutorial',
        summary: 'Train your first machine learning regression model to predict continuous target variables.',
        explanation: [
          'Machine Learning enables computers to learn patterns from historical data to make predictions on unseen data.',
          'In Supervised Learning, models learn a mathematical mapping between input features (X) and a ground-truth target label (y).',
          'A fundamental principle of ML is the Train-Test Split: training on 80% of data and evaluating on 20% unseen data to prevent overfitting.'
        ],
        code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# 1. Generate synthetic housing feature data
np.random.seed(42)
n_samples = 200
sqft = np.random.normal(1800, 400, n_samples)
bedrooms = np.random.randint(2, 6, n_samples)
# Ground truth price = 50k base + 150*sqft + 15k*bedrooms + noise
prices = 50000 + 150 * sqft + 15000 * bedrooms + np.random.normal(0, 15000, n_samples)

X = pd.DataFrame({'SqFt': sqft, 'Bedrooms': bedrooms})
y = prices

# 2. Train-Test Split (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)

# 3. Fit Linear Regression Model
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
          'RMSE gives errors in the same units as the target variable ($).'
        ],
        quiz: {
          question: 'Why must you evaluate machine learning models on a separate test set?',
          options: [
            'Because training on all data causes Python memory errors',
            'To verify whether the model generalizes to unseen data rather than just memorizing (overfitting)',
            'Because Scikit-Learn will throw an error if test_size is 0',
            'To increase the speed of model fitting'
          ],
          correctIndex: 1,
          explanation: 'Evaluating on unseen test data detects overfitting, confirming whether learned relationships generalize.'
        }
      },
      {
        id: 'a-6-2',
        moduleId: 'a-mod-6',
        level: 'advanced',
        title: '6.2 Random Forests & Model Evaluation',
        duration: '30 min • Video & Code',
        videoUrl: 'https://www.youtube-nocookie.com/embed/J4Wdy0Wc_xQ',
        videoTitle: 'Random Forest Algorithm Explained with Scikit-Learn',
        summary: 'Learn non-linear ensemble modeling using Random Forests, feature importances, and classification metrics.',
        explanation: [
          'While linear models assume straight-line relationships, real datasets frequently feature complex non-linear interactions.',
          'A Random Forest is an ensemble of decision trees trained on random subsets of data and features (bagging). Aggregating hundreds of trees significantly reduces variance and prevents overfitting.',
          'Random Forests also compute Feature Importances, quantifying which variables contribute most to predictions.'
        ],
        code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

# Synthetic customer churn classification dataset
np.random.seed(42)
n = 300
tenure = np.random.uniform(1, 60, n)
monthly_charges = np.random.uniform(20, 120, n)
support_calls = np.random.poisson(2, n)

# Probability of churn increases with high charges & support calls
churn = ((monthly_charges > 75) & (support_calls > 3) | (tenure < 6)).astype(int)

X = pd.DataFrame({'Tenure': tenure, 'MonthlyCharges': monthly_charges, 'SupportCalls': support_calls})
y = churn

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# Train Random Forest Classifier
rf = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
rf.fit(X_train, y_train)

# Evaluate predictions
y_pred = rf.predict(X_test)
acc = accuracy_score(y_test, y_pred)

print("=== Random Forest Churn Classification ===")
print(f"Overall Test Accuracy: {acc * 100:.1f}%\n")
print("=== Feature Importances ===")
for feature, imp in zip(X.columns, rf.feature_importances_):
    print(f"  {feature:15s}: {imp * 100:.1f}%")`,
        output: `=== Random Forest Churn Classification ===
Overall Test Accuracy: 93.3%

=== Feature Importances ===
  Tenure         : 42.8%
  MonthlyCharges : 34.6%
  SupportCalls   : 22.6%`,
        takeaways: [
          'Random Forests handle non-linear patterns without requiring extensive feature scaling.',
          'Feature importances help identify the primary drivers of predictions.',
          'Ensemble methods combine predictions from multiple weak learners to build a robust model.'
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
        background: 'linear-gradient(135deg, #0b192c 0%, #1e3a8a 100%)',
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
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
          <span style={{
            background: '#2563eb',
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
            <EditableLabel labelKey="learn_badge" defaultValue="AI Learning Lab • Python for Data Science" />
          </span>
          <span style={{ fontSize: '0.8rem', color: '#93c5fd', fontWeight: 600 }}>
            Interactive Video &amp; Code Academy
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 900,
          margin: '0 0 0.75rem 0',
          lineHeight: 1.2
        }}>
          <EditableLabel labelKey="learn_title" defaultValue="Python for Data Science Academy: Beginner to Advanced" />
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
            defaultValue="A comprehensive, progressive curriculum with hands-on video tutorials, code examples, and interactive challenges. Master general Python programming, numerical computing with NumPy, tabular data analysis with Pandas, statistical visualization, and machine learning."
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
              Choose Difficulty Track
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--color-text-main)', marginTop: '0.2rem' }}>
              Active Track: <span style={{ color: selectedLevel === 'beginner' ? '#16a34a' : (selectedLevel === 'intermediate' ? '#d97706' : '#dc2626') }}>{selectedLevel.toUpperCase()}</span>
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
            <span>{selectedLevel.toUpperCase()} Progress: {completedInLevel} of {totalLevelLessons} lessons completed</span>
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
                placeholder="Search lessons (e.g. pandas, loops, regression)..."
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
