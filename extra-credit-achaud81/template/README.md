#  Extra Credit: Directed Acyclic Graph and Bar Chart Visualization
In this extra credit assignment, you will learn how to create an interactive dashboard combining a Directed Acyclic Graph (DAG) visualization and a dynamic bar chart. A [Directed Acyclic Graph (DAG)](https://d3-graph-gallery.com/network.html) is a hierarchical structure where nodes represent entities, and directed edges depict relationships between them, with no cycles allowed. It is widely used to model dependencies, such as task scheduling or data hierarchies. A [Dynamic Bar Chart](https://d3-graph-gallery.com/barplot.html) complements the DAG by visualizing quantitative data that updates interactively based on user input, offering detailed insights into selected categories, such as Pokémon types and their total power in this assignment. The DAG represents Pokémon types and their relationships, while the bar chart visualizes the total power of Pokémon within a selected type. Through this assignment, you will explore D3 functionalities such as hierarchical data visualization, tooltips, zooming, and bar chart interactivity.

Objectives
By completing this assignment, you will learn:

- How to use D3.js to create a hierarchical DAG visualization.
- How to implement dynamic interactivity between visualizations.
- Techniques for handling and transforming hierarchical data structures.
H- ow to create and style bar charts dynamically based on user interactions.

## Dataset
The dataset for this assignment contains information about Pokémon, including their types and total power,etc. Download the following starter dataset to your repository --- [Pokemon with stats](https://www.kaggle.com/datasets/abcsds/pokemon) --- .

Dataset Attributes(to be used):
- Name: Name of the Pokémon.
- Type 1: Primary type of the Pokémon.
- Total: Sum of all base stats (e.g., attack, defense, speed).
No preprocessing is required as the dataset is already clean and ready for use.

## Steps to Complete the Assignment

### Step 1: Set up the Basic Page Layout
Create a 'index.html' file with a basic layout consisting of:
- A header containing the assignment title and your ASURITE ID.
- Two containers: one for the DAG visualization and another for the bar chart.
Include the provided CSS file (achaud81.css) for styling and link the D3.js library.

### Step 2: Create the Directed Acyclic Graph (DAG)
Parse the Pokemon.csv dataset to extract Pokémon types (Type 1) and their names.
Build a hierarchical structure where:
The root node is a "Pokeball".
Child nodes are Pokémon types, with further children being Pokémon names.
Visualize the DAG using D3.js:
- Use force-directed layout to position nodes.
- tyle nodes based on their depth in the hierarchy.
- Add zooming and panning functionality.
- Add tooltips that display information when hovering over nodes:
- For type nodes: Show the type name and count of Pokémon.
- For Pokémon nodes: Show the Pokémon name and type.

### Step 3: Implement Interactivity Between DAG and Bar Chart
-  Allow users to click on a type node in the DAG to dynamically update the bar chart.
- Pass the selected type and its Pokémon to the bar chart function.

### Step 4: Create and Style the Bar Chart
Create the createBarChart function to:
- Visualize the total power of Pokémon within the selected type.
- Style bars dynamically based on the type's color from the DAG.
- Add tooltips to display the Pokémon name and total power on hover.
Ensure the bar chart updates correctly when a new type is selected.

### Step 5: Add Final Touches
- Ensure the page design is visually appealing and adheres to UI/UX principles.
- Test the assignment thoroughly to verify interactions and data bindings work seamlessly.

## Screenshots
Completed DAG Visualization - ![DAG Example](images/DAG.png)

Interaction: DAG Animation - ![DAG Animation](images/DAGanimation.mp4)

Completed Bar Chart - ![BarChart Example](images/BarChart.png)

