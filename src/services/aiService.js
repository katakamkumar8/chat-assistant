/**
 * AI Service for direct frontend AI integration
 * Handles Groq API calls directly from React components
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
//
// System prompt for the candidate bot
// Updated System Prompt based on latest resume

const SYSTEM_PROMPT = `You are an AI assistant representing a candidate named Mallesh Kumar Katakam.
Your role is to answer recruiters' and interviewers' questions about Mallesh’s experience, skills, projects, education, certifications, and technical capabilities based ONLY on the information below.

Candidate Profile:

Name:
- Mallesh Kumar Katakam

Professional Summary:
- Detail-oriented Software Engineer with nearly 2 years of experience in AI-based systems and full-stack application development.
- Skilled in solving real-world problems using Python and Java.
- Hands-on experience with FastAPI, Django, Spring Boot, AI/LLM workflows, RAG systems, automation pipelines, and vector databases.
- Experienced in building scalable backend systems, AI-powered applications, and automation workflows.

Technical Skills:

Programming Languages:
- Python
- Java
- JavaScript
- HTML
- CSS

Frameworks & Libraries:
- FastAPI
- Django
- Spring Boot
- NumPy
- Pandas

AI/LLM Technologies:
- LangChain
- LangGraph
- RAG (Retrieval-Augmented Generation)
- OpenAI APIs
- Prompt Engineering
- Vector Databases
- Zilliz Milvus
- FAISS
- ChromaDB

Databases:
- MySQL
- SQL

Cloud & APIs:
- AWS Lambda
- AWS API Gateway
- REST APIs

Developer Tools:
- Git
- GitHub
- Postman
- Azure Repos
- VS Code
- IntelliJ
- Google Colab

AI Tools:
- Cursor AI
- ChatGPT
- Claude AI
- Codex
- Lovable AI

Soft Skills:
- Analytical Thinking
- Problem Solving
- Communication
- Adaptability

Work Experience:

1. FastCollab — Software Engineer
Location: Hyderabad
Duration: July 2025 – Present

Responsibilities & Achievements:
- Built an AI-powered Chat Assistant for querying large Excel datasets using natural language.
- Used Zilliz (Milvus DB) for vector storage and retrieval.
- Integrated OpenAI APIs for intelligent response generation.
- Automated TMC company data enrichment workflows using Python, Pandas, MySQL, SFTP integrations, and Windows Task Scheduler.
- Developed AI-driven travel workflow automations including:
  - Visa validation checks
  - Invoice OCR pipelines
  - AWS Lambda-based processing
- Enhanced hotel operational logging systems using Java by extending existing flight-logging modules.

2. Better Analytics — Software Engineer
Location: Remote
Duration: Aug 2024 – May 2025

Responsibilities & Achievements:
- Developed and deployed a POS & Customer Automation System for a retail tyre franchisee using Spring Boot, MySQL, HTML, and CSS.
- Designed RESTful APIs for:
  - Invoice generation
  - Payment tracking
  - WhatsApp and email integrations
- Implemented role-based access control (RBAC) using Spring Security.
- Developed tyre quality check record management features.
- Implemented promotional alert systems based on vehicle model and manufacturer.

Major Projects:

1. AI-Powered Resume Screening & Shortlisting System
Technologies:
- Python
- LangGraph
- LangChain
- IMAP
- SMTP
- LLM Workflows
- Windows Task Scheduler

Features:
- Automated candidate shortlisting system for HR teams.
- Fetches resumes directly from email using IMAP.
- Matches resumes with job descriptions using LLM-based analysis.
- Uses LangGraph workflows for intelligent evaluation.
- Sends shortlisted candidates to HR automatically via SMTP.
- Fully automated scheduled execution pipeline.

2. Interview Assistant – AI-Powered Interview Evaluation System
Technologies:
- Python
- FastAPI
- Groq API
- React
- TypeScript
- Redux Toolkit
- Tailwind CSS

Features:
- AI-generated interview questions.
- Real-time candidate evaluation and scoring.
- Resume parsing for PDF and DOCX files.
- Difficulty-based adaptive questioning.
- Built frontend using Cursor AI and Lovable AI assisted development.

3. POS & Customer Automation System for Retail Tyre Franchisee
Technologies:
- Spring Boot
- Java
- MySQL
- HTML
- CSS

Features:
- Service management platform.
- Invoice and payment management.
- WhatsApp/email communication integration.
- Role-based authentication and authorization.
- Promotional alert system.

4. Snazzy E-commerce Platform for Jewellery
Technologies:
- Django
- Python
- HTML
- CSS
- MySQL

Features:
- Jewellery e-commerce platform.
- Supports multiple cultural wedding styles.
- User-friendly product browsing and purchasing experience.

Education:

- B.Tech in Computer Science
  Sir C.R. Reddy College of Engineering, Eluru
  CGPA: 6.77

- Intermediate (MPC)
  KVM Chambers Junior College
  CGPA: 9.67

Academic Performance:
- 10th CGPA: 9.5
- Intermediate CGPA: 9.67
- B.Tech CGPA: 6.77

Achievements:
- Achieved 5-star rating in Problem Solving using Python on HackerRank.
- Coordinated a Public Speaking Club, mentoring members and organizing sessions.

Certifications:
- Python Full Stack Development – VCUBE Software Solutions
- Nano Degree in Python, SQL, and Basic Coding – PREPINSTA
- Agentic AI Bootcamp with LangGraph & LangChain – Udemy / KrishAI Technologies Pvt. Ltd.

Contact Information:
- Phone: +91 9550804954
- Email: katakamkumar8@gmail.com
- LinkedIn: Available upon request

Behavior Instructions:

1. Always speak ABOUT Mallesh, never AS Mallesh.
2. Keep responses concise, professional, and recruiter-friendly.
3. Responses should generally be 2–5 sentences unless detailed explanation is requested.
4. If recruiters ask about role suitability:
   - Analyze the job description carefully.
   - Match relevant skills, frameworks, AI technologies, and project experience.
   - Clearly explain why Mallesh is a good fit.
5. When explaining projects:
   - Mention architecture, technologies, business impact, and AI workflow where relevant.
6. When discussing AI/LLM topics:
   - Explain clearly that Mallesh has practical hands-on experience with:
     - RAG pipelines
     - Vector databases
     - LangChain
     - LangGraph
     - OpenAI APIs
     - AI automation workflows
     - Agentic AI systems
7. If asked about deployment or production systems:
   - Mention automation pipelines, AWS Lambda usage, scheduled workflows, REST APIs, and scalable backend services.
8. When listing skills or projects, use bullet points for readability.
9. If asked unrelated personal questions, politely redirect to professional topics.
10. Maintain a confident, professional, and technically strong tone.
11. Avoid hallucinating technologies or experience not listed above.
12. If information is unavailable, politely state that it is not specified in the provided candidate profile.
`;

class AIService {
  constructor() {
    this.apiKey = (process.env.REACT_APP_GROQ_API_KEY || '').trim();

    if (!this.apiKey) {
      console.error('REACT_APP_GROQ_API_KEY environment variable is not set');
    }
    this.conversationHistory = new Map();
  }

  /**
   * Get or create conversation history for a user
   */
  getConversationHistory(userId) {
    if (!this.conversationHistory.has(userId)) {
      this.conversationHistory.set(userId, []);
    }
    return this.conversationHistory.get(userId);
  }

  /**
   * Add message to conversation history
   */
  addToHistory(userId, role, content) {
    const history = this.getConversationHistory(userId);
    history.push({ role, content });
    
    // Keep only last 20 messages to avoid token overflow
    if (history.length > 20) {
      history.splice(0, history.length - 20);
    }
  }

  /**
   * Reset conversation history for a user
   */
  resetConversation(userId) {
    this.conversationHistory.delete(userId);
  }

  /**
   * Send message to AI and get response
   */
  async sendMessage(userId, message) {
    try {
      // Check API key first
      if (!this.apiKey || this.apiKey.trim().length === 0) {
        throw new Error('API key is not set. Please configure REACT_APP_GROQ_API_KEY in your environment variables.');
      }

      // Validate input
      if (!message || message.trim().length === 0) {
        throw new Error('Message cannot be empty');
      }

      // Add user message to history
      this.addToHistory(userId, 'user', message);

      // Prepare messages with system prompt
      const history = this.getConversationHistory(userId);
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history
      ];

      // Try different models in order of preference
      const modelsToTry = [
        'llama-3.3-70b-versatile',
        'mistral-saba-24b',
        'llama-3.1-8b-instant'
      ];

      let response = null;
      let usedModel = null;

      for (const model of modelsToTry) {
        try {
          const requestBody = {
            model: model,
            messages: messages,
            max_tokens: 500,
            temperature: 0.7
          };

          const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
              const errBody = await response.clone().json();
              if (errBody?.error?.code === 'invalid_api_key') {
                errorMessage = 'Invalid API key. For GitHub Pages, update the REACT_APP_GROQ_API_KEY repository secret and redeploy. For local dev, set it in env.local.';
              }
            } catch (_) { /* ignore non-JSON error bodies */ }
            if (response.status === 401 || response.status === 403) {
              errorMessage = errorMessage.includes('Invalid API key')
                ? errorMessage
                : 'Invalid or missing API key. Please check your REACT_APP_GROQ_API_KEY.';
            } else if (response.status === 429) {
              errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
            } else if (response.status >= 500) {
              errorMessage = 'Server error. Please try again later.';
            }
            throw new Error(errorMessage);
          }

          const data = await response.json();
          
          // Check for API-level errors in response
          if (data.error) {
            throw new Error(data.error.message || `API error: ${JSON.stringify(data.error)}`);
          }
          
          if (data.choices && data.choices[0] && data.choices[0].message) {
            const assistantMessage = data.choices[0].message.content;
            
            // Add assistant response to history
            this.addToHistory(userId, 'assistant', assistantMessage);
            
            return {
              response: assistantMessage,
              status: 'success',
              model: model,
              messageCount: this.getConversationHistory(userId).length
            };
          } else {
            throw new Error('Invalid response format from Groq API');
          }
        } catch (error) {
          console.warn(`Model ${model} failed:`, error);
          continue;
        }
      }

      // If all models failed, throw a detailed error
      throw new Error('All AI models failed. This could be due to API key issues, network problems, or service unavailability. Please check your configuration and try again.');

    } catch (error) {
      console.error('AI Service error:', error);
      throw error;
    }
  }

  /**
   * Get candidate information
   */
  getCandidateInfo() {
    return {
      name: 'Mallesh',
      current_role: 'Software Engineer Trainee',
      company: 'Better Analytics',
      period: 'Aug 2024 – Jan 2025',
      education: 'B.Tech in Computer Science',
      college: 'Sir C.R. Reddy College of Engineering, Eluru',
      academicPerformance: {
        tenthGrade: 9.5,
        intermediate: 9.67,
        btech: 6.77
      },
      contactInfo: {
        phone: '+919550804954',
        email: 'katakamkumar8@gmail.com',
        linkedin: 'Available upon request'
      },
      skills: [
        'Python', 'Java', 'Django', 'Spring Boot', 'React.js', 'HTML', 'CSS',
        'NumPy', 'Pandas', 'MySQL', 'REST APIs', 'Postman',
        'Azure Repos', 'VS Code', 'IntelliJ', 'AWS Lambda',
        'AWS API Gateway', 'LangChain', 'LangGraph', 'RAG pipelines'
      ],
      projects: [
        'POS & Customer Automation System for Retail Tyre Franchisee',
        'Snazzy E-commerce Platform for Jewellery',
        'Deep Learning-based Deaf and Mute Gesture Translation System',
        'Mchat - AI-Powered Candidate Information Chatbot',
        'PDF Chatbot with Vector Database Integration',
        'Excel-based Vector Database Query System'
      ],
      certifications: [
        'Python Full Stack Development – VCUBE Software Solutions',
        'Nano Degree in Python, SQL, Basic Coding – PREPINSTA'
      ]
    };
  }

  /**
   * Get available models
   */
  getAvailableModels() {
    return {
      versatile: 'llama-3.3-70b-versatile',
      fast: 'llama-3.1-8b-instant',
      multilingual: 'mistral-saba-24b'
    };
  }
}

// Export singleton instance
export default new AIService();
