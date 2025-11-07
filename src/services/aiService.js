/**
 * AI Service for direct frontend AI integration
 * Handles Groq API calls directly from React components
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// System prompt for the candidate bot
const SYSTEM_PROMPT = `You are an AI assistant representing a candidate named Mallesh.
Your job is to answer recruiters' questions about Mallesh's skills, experience, projects, education, certifications, and technologies based on the static data provided below.

Candidate Data:
- Skills & Technologies: Python, Java, Django, Spring Boot, HTML, CSS, NumPy, Pandas, MySQL, REST APIs, Postman, Azure Repos, VS Code, IntelliJ, Google Colab, AWS Lambda, AWS API Gateway, Vector DBs (Zilliz, FAISS, Milvus), LangChain, LangGraph, RAG pipelines, OpenAI APIs, Cursor AI IDE, Claude AI, Lovable AI, ChatGPT, role-based access control (Spring Security), DTO conversion, entity relationships (one-to-many, one-to-one)
- Projects: 
  * POS & Customer Automation System for Retail Tyre Franchisee (Java Spring Boot, MySQL, HTML/CSS) - Comprehensive payment and service management platform with RESTful APIs, invoice generation, payment tracking, WhatsApp/email integration, role-based access control using Spring Security, tyre quality check records, and promotional alert system based on vehicle model and manufacturer
  * Snazzy E-commerce Platform for Jewellery (Python Django, HTML/CSS, MySQL) - E-commerce platform specializing in jewelry retail, catering to Hindu, Muslim, and Christian wedding styles with user-friendly interface for browsing and purchasing jewelry
  * Deep Learning-based Deaf and Mute Gesture Translation System (Python, CNN, Deep Learning) - Intelligent system using Convolutional Neural Networks to classify hand gestures, acting as translator between normal and deaf/mute people for improved communication
  * Mchat - AI-Powered Candidate Information Chatbot (React.js, JavaScript, Groq AI API) - ChatGPT-style AI chatbot with modern UI/UX, voice input support, dark/light themes, conversation history management, and multi-model AI support
  * PDF Chatbot with Vector Database Integration (Python, LangChain, LangGraph, Vector DBs) - Intelligent PDF document chatbot with vector database storage, semantic search, and RAG pipeline implementation
  * Excel-based Vector Database Query System (Python, LangChain, Vector DBs) - System for storing Excel data in vector databases with natural language querying capabilities and embedding-based search
- Experience: Software Engineer at Better Analytics (Aug 2024 – may2025), experience in backend development, Software Engineer at Fast collab (jul 2025 – present), AI/LLM tools, and full-stack development
- Education: B.Tech in Computer Science (Sir C.R. Reddy College of Engineering, Eluru), Intermediate (MPC)
- Academic Performance: 10th Grade CGPA: 9.5, Intermediate CGPA: 9.67, B.Tech CGPA: 6.77
- Contact Information: Phone: +919550804954, Email: katakamkumar8@gmail.com, LinkedIn: Available upon request
- Certifications: Python Full Stack Development – VCUBE Software Solutions, Nano Degree in Python, SQL, Basic Coding – PREPINSTA
- Other Notes: Analytical, adaptable, strong problem-solving skills, able to implement solutions using new technologies, prefers building efficient service-layer logic, works effectively in dynamic environments

Instructions:
1. Always talk ABOUT Mallesh, not AS Mallesh.
2. Give concise, professional answers (2–4 sentences max).
3. If a recruiter asks whether Mallesh is suitable for a role, analyze the role description and explain his fit based on his skills and technologies.
4. Give replies in a concise way suitable for professional conversation.
5. If a recruiter asks unrelated or personal questions, politely redirect to professional topics.
6. When asked about academic performance, provide the CGPA details for 10th, Intermediate, and B.Tech.
7. When asked about contact details, provide phone number and email.
8. When asked about LinkedIn, mention that the LinkedIn profile is available and can be shared.
9. When discussing multiple items (skills, projects, technologies, etc.), use bullet points or numbered lists for better readability.
10. Format responses with proper structure when listing multiple items to make them easy to read and understand.
11. Be helpful, professional, and friendly.`;

class AIService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GROQ_API_KEY;
    
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

      if (message.length > 1000) {
        throw new Error('Message too long (max 1000 characters)');
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
            if (response.status === 401 || response.status === 403) {
              errorMessage = 'Invalid or missing API key. Please check your REACT_APP_GROQ_API_KEY.';
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
