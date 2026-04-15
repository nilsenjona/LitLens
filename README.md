## Project name

LitLens

## Repository

https://github.com/nilsenjona/LitLens

## One liner

AI‑powered book discovery using Open Library metadata

## Project description

LitLens is a web application that helps users discover new books by selecting a book they already know, and receiving recommendations for similar titles. The app retrieves metadata from Open Library and uses an LLM to analyze themes, tone, and style to produce personalized suggestions. Users can search for books, select a book to view an LLM‑generated summary, filter recommendations by mood or reading preference, and log or rate books they’ve read or plan to read. Users can save favorites, which are stored in a database for retrieval across sessions.

## MVP

Users can select a book and receive AI‑generated recommendations based on its metadata.
The MVP includes:
• AI‑generated book recommendations based on Open Library metadata (full API or mock data depending on what time allows for)
• LLM‑generated book summaries
• Session-specific ability to log and rate books

## Tech stack

Front End
• React (with Vite)
• Back End fetch API
• CSS modules such as Tailwind+Flowbite (or similar)

Back End
• CORS
• Node.js + Express
• API service for Open Library and LLM
• MongoDB + Mongoose
• Optionally JWT‑based authentication (or similar lightweight auth), or hard-coded fixed user, as time allows

## Data sources

• Open Library API for book metadata, subjects, authors, and covers
• LLM API (Web LLM or LM Studio) for summaries, explanations, and recommendations
