# HUSTLR-AI-Developer-Test

# AI-Powered E-commerce Catalog

This is a small e-commerce catalog app enhanced with an AI-based smart product search.

## 🚀 How to Run

1. Clone the project or download the ZIP
2. Add your OpenAI key in `.env`:

OPENAI_API_KEY=your_key_here

3. Install dependencies:
    npm install


4. Start the server:
    node server.js

5. Open your browser:  
    http://localhost:3000



## 🧠 AI Feature: Smart Product Search

- Users can input natural language queries like:
- `"Show me electronics under $100 with high rating"`
- `"I want fitness products rated above 4 stars"`
- The query is parsed via OpenAI GPT-3.5 to extract:
- Category
- Max price
- Minimum rating

These filters are then applied to the local catalog.

## 🔧 Tech Stack

- Node.js + Express
- OpenAI API (GPT-3.5)
- Static HTML/JS frontend
- Product data from `products.json`

## 🪙 Bonus: Blockchain Integration Ideas

- **Token-gated pricing:** Users holding specific tokens (NFTs or ERC-20) receive dynamic discounts
- **On-chain preferences:** User category interests or budgets stored in wallet-linked smart contracts
- **Loyalty smart contracts:** Rewards based on on-chain purchase history




