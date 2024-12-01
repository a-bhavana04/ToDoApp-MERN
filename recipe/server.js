const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Connection URI
const uri = "mongodb://localhost:27017";
const dbName = "iplab";

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Connect to MongoDB
async function connect() {
  try {
    // Create a new MongoClient instance
    const client = new MongoClient(uri);
    
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB server");

    // Access the database
    const db = client.db(dbName);

    // Define collection
    const recipesCollection = db.collection("recipes");

    // Save recipe endpoint
    app.post('/api/save-recipe', async (req, res) => {
      const recipe = req.body;

      try {
        // Insert the new recipe into the collection
        const newRecipe = await recipesCollection.insertOne(recipe);

        res.status(201).json({ message: 'Recipe saved successfully' });
      } catch (err) {
        console.error("Error saving recipe:");
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    // Get saved recipes endpoint
    app.get('/api/saved-recipes', async (req, res) => {
      try {
        // Find all recipes in the collection
        const recipes = await recipesCollection.find({}).toArray();

        res.json(recipes);
      } catch (err) {
        console.error("Error fetching saved recipes:");
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Call the connect function
connect();
