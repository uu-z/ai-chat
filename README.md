# AI Efficiency Product MVP - multi-agent chat platform

This is a React-based AI efficiency product MVP that implements multi-agent chat platform functions. Users can talk to the main agent, and the system automatically creates chat groups and adds appropriate AI assistants to generate responses based on meta prompt words.

## Core functions

1. ** Automatic group chat creation ** : After the user sends a message, the system automatically creates a group chat and adds a suitable AI assistant
2. ** Automatic selection of agents ** : Automatically selects the most appropriate AI assistant based on the user's message content
3. ** Multi-Agent collaboration ** : Multiple AI assistants collaborate to answer questions in a group chat, each based on their own expertise and meta prompt words
4. ** Agent Store ** : Users can browse, install and manage AI assistants in various professional areas
5. ** Custom Agents ** : Users can create and customize their own AI assistant and set exclusive meta prompt words

## Technical implementation

- **React + TypeScript** : Front-end framework and type system
- **TailwindCSS** : UI style
- ** High cohesion low coupling ** : component-based design, clear responsibilities
- ** State Management ** : Use React Hooks to manage application state

## Project structure

` ` `
src/
├── components/ # UI components
├── data/ # Simulate data
├── types/ # TypeScript Type definitions
└── utils/ # utility functions
` ` `

## Agent system

Each AI assistant in the system has the following characteristics:

- ** Meta Prompt ** : Defines the assistant's answer style and expertise
- ** Category ** : Field of expertise
- ** Tags ** : Keyword tags for intelligent matching
- ** Description ** : Description of the assistant functions

## Automatic matching algorithm

When a user sends a message, the system will:

1. Extract keywords from user messages
2. Calculate the match degree between each AI assistant and keywords
3. Select the most matched assistants to join the group chat
4. Each assistant generates a response based on its own meta prompt words

## How to use

1. The user sends a message, and the system automatically creates a group chat and adds an appropriate AI assistant
2. Users can manually add or remove AI assistants in group chats
3. Install the new AI assistant through the Agent Store
4. Create and customize AI assistants through the Agent Manager

## Future planning

1. Access real AI apis to achieve real intelligent answers
2. Add AI assistants in more specialized areas
3. Implement the cooperation mechanism between agents
4. Add user feedback and agent rating system
5. Support more complex multi-round conversations and context understanding
