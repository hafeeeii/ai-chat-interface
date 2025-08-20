# AI Chat Interface

A frontend prototype of an AI chat interface built with Next.js 14, TypeScript, TailwindCSS, and OpenAI API. This project implements core features inspired by leading AI platforms, focusing on usability, responsiveness, and accessibility.

---

## 1. Research

### Platforms Reviewed & Chosen Features

I reviewed three major AI interfaces to identify compelling design patterns and user experience principles:

#### a. Hugging Face Spaces  
Hugging Face Spaces is a directory of AI-powered applications hosted by the community. While it does not provide a single unified interface, many individual Spaces (such as HuggingChat) feature **chat-style interactions** with message alignment, parameter controls, and dark mode. The platform emphasizes **discoverability** through curated categories and trending apps, making it easy for users to explore diverse AI capabilities.

#### b. Anthropic Claude UI  
Anthropic Claude offers a clean, focused chat interface with a **collapsible sidebar** for navigation and chat history. It includes a **model selector** (e.g., Claude Sonnet 4), **persistent conversations**, and **personalized greetings**. The layout prioritizes clarity and workflow, with a minimalist design that reduces cognitive load.

#### c. Microsoft Copilot Lab  
Microsoft Copilot Lab provides a **sidebar-based interface** with access to past conversations and quick-start templates. The main area includes a **prompt input** with **quick-response buttons** (e.g., “Write a first draft”, “Design a logo”) and a **dark theme**. This approach encourages productivity by offering immediate guidance and reducing typing effort.

### Chosen Features (6)

Based on research, I implemented the following features:

1. **Model Selector** – Dropdown to choose between GPT models  
2. **Prompt Editor** – Text area with save/load template functionality  
3. **Parameters Panel** – Controls for temperature and max tokens  
4. **Chat Output Area** – Displays conversation with copy/download actions  
5. **Theme Toggle** – Light/dark mode with system preference detection  
6. **Responsive Layout** – Mobile-first design with collapsible sidebar  

These features balance simplicity and control, enabling both casual and advanced users.

---

## 2. Design

### Figma Mockup

🔗 [Figma mockup link](https://www.figma.com/design/PrsKyrFZ2NSvg2ftBr4VdG/ai-chat-interface?node-id=0-1&t=yTQ8zliujvombmUw-1)  



###  Code Implementation Notes

- **Model Selector**: Implemented with `DropdownMenu` from shadcn/ui.
- **Prompt Editor**: Uses `Textarea` with save/load buttons; templates are stored in component state.
- **Parameters Panel**: `Slider` for temperature, `Input` for max tokens etc.
- **Theme Toggle**: Uses `Toggle` component with `useTheme()` hook; persists preference via `localStorage`.
- **Copy/Download**: Buttons trigger clipboard write and JSON download of chat history.

All components follow shadcn/ui patterns for consistency and accessibility.

---

## 3. Development

### a. Model Selector

- Uses `DropdownMenu` to select between models.
- Fetching available models from API.

### b. Prompt Editor

- `Textarea` with placeholder and min-height.
- Save button stores current prompt in state.
- Template load buttons inject predefined prompts (e.g., "Summarize this text").


### c. Chat Output Area

- Messages rendered as `ChatBubble` components..
- Copy button: copies message text to clipboard.
- Download button: exports full chat as JSON file.

### d. Accessibility & UX

- Full keyboard navigation (Tab, Enter, Esc).
- ARIA labels and roles via shadcn components.
- Focus rings visible.
- Loading state shown during AI response.
- Error handling: error messages if API fails.

### e. Component Library & Storybook

- Built with `shadcn/ui` for consistent, accessible components.
- Storybook configured for:
  - `Button`
  - `Badge`
  - `Dialog`
  - `Slider`
- Run with `npx storybook dev`

---

## What to Submit

1. ✅ **Live URL**: [https://ai-chat-interface-mauve.vercel.app/](https://ai-chat-interface-mauve.vercel.app/)  
2. ✅ **GitHub Repository**: [https://github.com/hafeeeii/ai-chat-interface](https://github.com/hafeeeii/ai-chat-interface)  
3. ✅ **Figma Mockup Link**: [https://www.figma.com/design/PrsKyrFZ2NSvg2ftBr4VdG/ai-chat-interface?node-id=0-1&t=yTQ8zliujvombmUw-1](https://www.figma.com/design/PrsKyrFZ2NSvg2ftBr4VdG/ai-chat-interface?node-id=0-1&t=yTQ8zliujvombmUw-1)  

---

## Limitations

- Chat history not persisted.
- No authentication or user accounts.
- Newly created templates are not saved permanently.
