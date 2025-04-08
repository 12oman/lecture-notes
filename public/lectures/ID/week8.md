---
title: deployment and iteration
date: 2025-04-09
course: interaction design ii
previous: week 8 - computational design
---

this week we're going to get everyhing working as an MVP.  

---

It should be deployed. But possibly not at the level that you're happy with submitting.

---

this practice is called Continuous Integration and Continuous Deployment (CI/CD).
so you can put that on your CV after this class. 

---

#recap

#git and github

git is a version control system. it allows you to track changes to files and collaborate with others.
github is a web-based platform that uses git to host and manage code repositories. it allows you to share your code with others and collaborate on projects.
#git is a command line tool. github is a web-based platform.

---

git requires that you actively manage your code.
github allows you to manage your code in a more visual way, collaborate with others and even to deploy it directly to the web.

---

#ai and code

there is an ai for everything now.
including ai's that can help you write code. 

---
while you can copy/paste code from a chat with Claude or ChatGPT, sometimes the issue is that the model doesn't have access to the codebase. 
without context, the model tries to solve the problem in a vacuum.

---

one workflow which is popular is to use a local IDE (like VSCode) and then use the AI Copilot to help you write code.
with VSCode presently there are a few ways to do this:

- In-line completion (like autocomplete on steroids)
- Chat interface (like ChatGPT)
- Edit with Copilot (a more focused version of the chat interface)
- actively highlighting the code you want to change and asking for a suggestion. something like "hey copilot, can you help me with this function?" and it will suggest a new function.

---
# 0. install the Copilot extension
* open VSCode
* go to the extensions panel (Ctrl+Shift+X)
* search for "Copilot"
* click "install" on the Copilot extension
* sign in with your GitHub account
* open a file in your project

---
# 1. the in-line completion method
* open VSCode
* start typing and Copilot will suggest code completions
(this is the older 'in-line completion' method.)

---
# 2. the Chat method.
* open VSCode
* click on the Copilot icon in the top area adjacent to the search bar
* select "Open Chat"
* type your question in the chat window


---
# 3. the Edit with Copilot method
* open VSCode
* click on the Copilot icon in the top area adjacent to the search bar
* select "Edit with Copilot"
* select the file you want to edit or select multiple files using the Add Files button in the 'edit with copilot' chat window. 

---

# 4. the dual Chat and Edit with Copilot method
you might find that you hit an "AI wall" where the AI doesn't understand what you're trying to do. 

---
One way around this, is to manually solve the problem yourself. 

---

However, when you're starting out this might not be possible for you. 

So, you can use the "DualChat" method, Chating with Claude or ChatGPT and editing with Copilot methods together.

---
If you have a premium Claude account you can start a PROJECT discuss with the AI what you're trying to do and use Claude to define a proper README and Changelog for your project. Each time you make changes add it to the changelog along with a rationale and a summary of the changes. This provides incredible context for any of the AIs to work with.

---
# 5. Agentic AI
this level is beyond the scope of this year's work, but it's possible to use AI to mannage your code for you.

:)



