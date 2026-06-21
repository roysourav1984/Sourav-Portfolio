import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { db } from '../src/db';
import {
  heroContent,
  heroStats,
  summary,
  focusAreas,
  initiatives,
  experienceRoles,
  skillCategories,
  functionalSkills,
  certifications,
  awards,
  education,
  contactInfo,
} from '../src/db/schema';

export async function seedDatabase() {
  console.log('🌱 Starting database seed...');

  try {
    await db.delete(heroStats).execute();
    await db.delete(heroContent).execute();
    await db.delete(summary).execute();
    await db.delete(focusAreas).execute();
    await db.delete(initiatives).execute();
    await db.delete(experienceRoles).execute();
    await db.delete(skillCategories).execute();
    await db.delete(functionalSkills).execute();
    await db.delete(certifications).execute();
    await db.delete(awards).execute();
    await db.delete(education).execute();
    await db.delete(contactInfo).execute();

    console.log('✓ Cleared existing data');

    // Hero Content
    const heroId = (
      await db
        .insert(heroContent)
        .values({
          headline: 'Technical Program Manager & Delivery Leader',
          subtitle: 'AI/GenAI Solutions & Enterprise Transformation',
          location: 'Kolkata, West Bengal, India',
        })
        .returning()
    )[0].id;

    await db.insert(heroStats).values([
      { label: '19+ Years', value: 'Technical Leadership' },
      { label: '500+ Engineers', value: 'Teams Managed' },
      { label: '$50M+', value: 'Program Budgets' },
    ]);

    console.log('✓ Seeded Hero Section');

    // Summary
    await db.insert(summary).values({
      paragraphs: [
        'Strategic IT Delivery Manager and seasoned technology leader with 19+ years driving multi-million-dollar enterprise program portfolios across distributed, cross-functional global teams using SAFe, Waterfall, Hybrid, and Agile delivery models.',
        'Expertise in Program Delivery Governance, Technical Project Management, Stakeholder Engagement, AI/ML Solutions delivery, and Intelligent Automation. Proven track record managing complex, multi-year initiatives with cross-functional stakeholder alignment and delivering measurable business impact across Banking, Travel & Hospitality, Insurance, and Airlines domains.',
      ],
      pullQuote: 'Technology is a business enabler. Excellence comes from aligning people, process, and platforms through governance without bureaucracy.',
    });

    console.log('✓ Seeded Summary');

    // Focus Areas
    await db.insert(focusAreas).values([
      {
        title: 'Program Delivery & Governance',
        description: 'Expert in Agile, Waterfall, and Hybrid models—managing WBS, critical path, budget forecasting, change control, and multi-million-dollar portfolios with cross-functional stakeholder alignment.',
        stat: '19+ years enterprise leadership',
        order: 1,
      },
      {
        title: 'AI/GenAI & Platform Engineering',
        description: 'Leading AI-driven supply chain optimization, GenAI chatbots, intelligent automation (RPA, document intelligence), and modern data platform architecture leveraging Azure, Databricks, and LLM technologies.',
        stat: '5+ major AI platforms',
        order: 2,
      },
      {
        title: 'Agile Leadership & Transformation',
        description: 'Servant-leader Scrum Master (8+ years) with expertise in SAFe, Scrum, and large-scale organizational transformation—facilitating PI Planning, sprint ceremonies, and maintaining 90%+ delivery commitment rates.',
        stat: '500+ engineers transformed',
        order: 3,
      },
    ]);

    console.log('✓ Seeded Focus Areas');

    // Initiatives
    await db.insert(initiatives).values([
      {
        slug: 'ai-supply-chain-platform',
        title: 'AI-Driven Supply Chain Optimization Platform',
        oneLiner: 'Architected and delivering end-to-end supply chain platform using Agentic AI and Medallion Architecture data pipelines',
        year: '2025',
        tags: ['Agentic AI', 'Azure Data Factory', 'Databricks', 'Analytics'],
        context:
          'Enterprise required modern AI-driven supply chain optimization across demand forecasting, inventory management, predictive maintenance, and logistics analytics. Legacy systems lacked data integration and ML capabilities.',
        approach:
          'Designed comprehensive solution architecture leveraging Agentic AI, Azure Data Factory, and Databricks. Implemented Medallion Architecture (Bronze-Silver-Gold layers) for data modeling. Built ML pipelines for demand forecasting and inventory optimization. Deployed BI dashboards for business intelligence reporting.',
        technologies: ['Agentic AI', 'Azure Data Factory', 'Databricks', 'Medallion Architecture', 'Azure OpenAI', 'Python', 'BI Dashboards'],
        outcome:
          'Delivered demand forecasting, inventory optimization, and predictive maintenance models. Reduced supply chain costs through intelligent automation. Enabled data-driven decision making across logistics operations.',
        order: 1,
      },
      {
        slug: 'enterprise-genai-chatbot',
        title: 'Enterprise-Grade AI-Powered Conversational Chatbot',
        oneLiner: 'Led end-to-end design and deployment of RAG-based chatbot on Java Microservices with AKS and Hybrid Cloud infrastructure',
        year: '2024',
        tags: ['Retrieval-Augmented Generation', 'Azure OpenAI', 'Java Microservices', 'AKS'],
        context:
          'Enterprise needed context-aware, multi-turn conversational AI for customer service automation and enterprise knowledge management. Required seamless integration with existing infrastructure and support for natural language interactions.',
        approach:
          'Architected end-to-end solution using Retrieval-Augmented Generation (RAG), Azure OpenAI, and LangChain. Built on Java Microservices architecture with ReactJS frontend, RESTful APIs, and Azure Kubernetes Service (AKS). Implemented Hybrid Cloud infrastructure (Azure/AWS) with DB2 backend for data persistence.',
        technologies: ['Retrieval-Augmented Generation', 'Azure OpenAI', 'LangChain', 'Java Microservices', 'ReactJS', 'AKS', 'Azure Vector Database', 'DB2'],
        outcome:
          'Delivered context-aware chatbot supporting multi-turn natural language interactions. Automated customer service operations and enterprise knowledge management. Achieved measurable productivity gains across collaboration platforms with reduced manual touchpoints.',
        order: 2,
      },
      {
        slug: 'ap-automation-genai',
        title: 'Accounts Payable Automation with Gen AI',
        oneLiner: 'Led end-to-end AP Invoice Automation program delivering full automation of invoice lifecycle from ingestion to payment',
        year: '2024',
        tags: ['Gen AI', 'Document Intelligence', 'Azure Logic Apps', 'Process Automation'],
        context:
          'Finance operations required streamlined invoice processing with high accuracy. Manual AP processes were time-consuming, error-prone, and created bottlenecks in the invoice-to-pay cycle.',
        approach:
          'Oversaw solution architecture across Azure Document Intelligence (Form Recognizer), Azure Business Rules Engine, and Azure Logic Apps. Implemented full automation of invoice lifecycle: document ingestion, OCR-based data extraction, field validation, GL coding, and multi-tier approval workflows.',
        technologies: ['Azure Document Intelligence', 'Azure Business Rules Engine', 'Azure Logic Apps', 'Gen AI', 'Python', 'OCR'],
        outcome:
          'Delivered measurable reductions in manual touchpoints and accelerated invoice-to-pay cycle times. Improved data accuracy and strengthened audit compliance. Reduced AP processing costs through intelligent automation and workflow optimization.',
        order: 3,
      },
    ]);

    console.log('✓ Seeded Initiatives');

    // Experience
    await db.insert(experienceRoles).values([
      {
        slug: 'engagement-manager-capgemini',
        org: 'Capgemini Technology Services Limited',
        title: 'Engagement Manager',
        startDate: '2025-11-01',
        endDate: 'Present',
        summary: 'Managing 10+ deals across multiple business domains, identifying automation and AI transformation opportunities across customer portfolios.',
        responsibilities: [
          'Managing 10+ deals across multiple business domains and customers; identifying automation and AI transformation opportunities',
          'Performing comprehensive automation opportunity assessments and Agentic AI solutioning using Azure Foundry, Azure OpenAI, Azure Blob Storage, and Azure AI Search',
          'Leveraging UiPath RPA, Copilot Studio, Power Apps, and Azure Business Rules Engine for intelligent automation delivery and benefit realization',
        ],
        order: 1,
      },
      {
        slug: 'technical-program-manager-ltimindtree',
        org: 'LTIMindtree Limited',
        title: 'Technical Program Manager',
        startDate: '2021-09-08',
        endDate: '2025-11-12',
        summary: 'Managed multi-year enterprise-wide transformation program; spearheaded end-to-end project delivery across Java, Mainframe, and Cloud-native environments.',
        responsibilities: [
          'Managed multi-year, enterprise-wide transformation program aligned with customer digital innovation roadmap; enhanced operational efficiency and customer satisfaction',
          'Spearheaded end-to-end project delivery across Java, Mainframe, and Cloud-native environments using Gen AI and Agentic AI chatbot implementation on Java microservices',
          'Oversaw 35+ cross-functional, geographically distributed teams; ensured adherence to multi-million-dollar program budgets and delivery KPIs',
          'Drove Agile transformation initiatives implementing SAFe, Scrum, and Kanban practices; facilitated PI Planning and Sprint ceremonies maintaining 90%+ sprint commitment rates',
          'Deployed Gen AI solutions using GitHub Copilot and Spring Boot for test case automation; significantly improved delivery velocity and accuracy',
          'Designed and executed capability roadmaps aligned to client delivery outcomes and digital transformation goals',
          'Managed delivery financials including resource planning, budget forecasting, and margin management across multi-year programs',
        ],
        order: 2,
      },
      {
        slug: 'project-manager-cognizant',
        org: 'Cognizant Technology Solutions Pvt. Ltd.',
        title: 'Project Manager (Various Roles)',
        startDate: '2006-12-18',
        endDate: '2021-09-03',
        summary: 'Supervised end-to-end project delivery across .NET, Java, Mainframe, and cloud environments; oversaw 80+ member cross-functional teams.',
        responsibilities: [
          'Supervised end-to-end project delivery in .NET, Java, Mainframe, and cloud environments with on-time, high-quality execution',
          'Oversaw 80+ member cross-functional team building and supporting large-scale applications with modern architectures',
          'Managed stakeholder relationships and customer engagement using effective communication strategies ensuring project alignment',
          'Oversaw DevOps integration, CI/CD pipelines, and Agile implementation; streamlined development processes and reduced deployment times',
          'Developed scalable, enterprise-grade applications using C#, ASP.NET, MVC, and .NET Core for web-based and desktop solutions',
          'Designed and applied RESTful APIs and SOAP web services integrating with third-party platforms',
          'Utilized DevOps tools including Jenkins and Azure DevOps for CI/CD pipeline management and automated deployments',
        ],
        order: 3,
      },
    ]);

    console.log('✓ Seeded Experience');

    // Skills - Categories
    await db.insert(skillCategories).values([
      {
        categoryName: 'Cloud Platforms & Infrastructure',
        skills: ['Azure Kubernetes Service (AKS)', 'Azure Blob Storage', 'AWS', 'Azure DevOps', 'Azure Data Factory (ADF)', 'Azure Fabric', 'Databricks', 'Data Modeling & Analytics Architecture'],
        order: 1,
      },
      {
        categoryName: 'AI, GenAI & Machine Learning',
        skills: ['Azure OpenAI', 'Azure MS Foundry', 'Azure AI Search', 'Azure Document Intelligence', 'Azure Business Rules Engine (BRE)', 'LangChain', 'RAG (Retrieval-Augmented Generation)', 'GitHub Copilot'],
        order: 2,
      },
      {
        categoryName: 'Languages & Frameworks',
        skills: ['Java', 'Java Microservices', 'C#', 'VB.NET', 'ASP.NET', 'ADO.NET', 'MVC', 'Entity Data Model', 'LINQ', 'HTML', 'XML', 'JavaScript', 'ReactJS', 'Web Services', 'Windows Services', 'Python'],
        order: 3,
      },
      {
        categoryName: 'Automation & Platforms',
        skills: ['UiPath RPA', 'Microsoft Copilot Studio', 'Power Automate', 'Microsoft 365 Copilot', 'Power Apps', 'Document Intelligence', 'Business Rules Engine'],
        order: 4,
      },
      {
        categoryName: 'Agile & Program Management',
        skills: ['SAFe', 'Scrum Master', 'PI Planning', 'Sprint Ceremonies', 'Team Facilitation', 'Continuous Improvement', 'JIRA', 'Confluence', 'Zephyr', 'Risk Management', 'Program Management', 'OKRs'],
        order: 5,
      },
    ]);

    // Functional Skills
    await db.insert(functionalSkills).values([
      { label: 'Program Delivery & Governance', order: 1 },
      { label: 'Enterprise Stakeholder Management', order: 2 },
      { label: 'Technical Project Management', order: 3 },
      { label: 'Agile/SAFe Leadership', order: 4 },
      { label: 'Technology Modernization', order: 5 },
      { label: 'Team Building & Mentorship', order: 6 },
      { label: 'Cross-Functional Collaboration', order: 7 },
      { label: 'Change Management', order: 8 },
      { label: 'Pre-sales & Solutioning', order: 9 },
      { label: 'Data-Driven Decision Making', order: 10 },
    ]);

    console.log('✓ Seeded Skills');

    // Certifications
    await db.insert(certifications).values([
      { name: 'PRINCE2® Foundation & Practitioner', issuer: 'Axelos', year: '2024', order: 1 },
      { name: 'PSM – I™ Professional Scrum Master', issuer: 'Scrum.org', year: '2023', order: 2 },
      { name: 'PSPO - I™ Professional Scrum Product Owner', issuer: 'Scrum.org', year: '2023', order: 3 },
      { name: 'SAFe® Agilist (SA)', issuer: 'Scaled Agile', year: '2023', order: 4 },
      { name: 'ITIL 4® Foundation Certification', issuer: 'Axelos', year: '2022', order: 5 },
      { name: 'Generative AI Leader', issuer: 'Google Cloud', year: '2024', order: 6 },
      { name: 'GitHub Copilot (GH 300)', issuer: 'GitHub', year: '2023', order: 7 },
      { name: 'Gen AI and Predictive Project Management', issuer: 'PMI', year: '2023', order: 8 },
      { name: 'Gen AI Fundamental', issuer: 'Databricks Academy', year: '2024', order: 9 },
      { name: 'AZ-900 – Microsoft Azure Fundamentals', issuer: 'Microsoft', year: '2023', order: 10 },
      { name: 'DP-900 – Microsoft Azure Data Fundamentals', issuer: 'Microsoft', year: '2023', order: 11 },
      { name: 'AZ-303/304 – Microsoft Azure Architect Technologies', issuer: 'Microsoft', year: '2022', order: 12 },
      { name: 'AWS Technical Accredited Partner', issuer: 'Amazon Web Services', year: '2023', order: 13 },
    ]);

    console.log('✓ Seeded Certifications');

    // Awards
    await db.insert(awards).values([
      {
        title: 'Opus Excellence Award',
        org: 'LTIMindtree',
        description: 'For driving high-margin project delivery and operational excellence across large-scale programs',
        order: 1,
      },
      {
        title: 'North-Star Award',
        org: 'LTIMindtree',
        description: 'For leading seamless delivery with precision, efficiency, and consistent high-quality execution',
        order: 2,
      },
      {
        title: 'Trailblazer Squad Award',
        org: 'LTIMindtree',
        description: 'For driving innovation and delivering transformational impact across enterprise programs',
        order: 3,
      },
      {
        title: 'T&H Icon Award',
        org: 'Cognizant',
        description: 'For sustaining operational excellence and consistent project delivery performance in Travel & Hospitality domain',
        order: 4,
      },
      {
        title: 'Gem Award',
        org: 'Capgemini',
        description: 'For taking initiative in AI-led Hackathon and comprehensive Use Case Assessment',
        order: 5,
      },
    ]);

    console.log('✓ Seeded Awards');

    // Education
    await db.insert(education).values([
      {
        institution: 'WBUT University',
        degree: 'B.Tech in Electronics and Communication Engineering',
        year: '2006',
        order: 1,
      },
    ]);

    console.log('✓ Seeded Education');

    // Contact Info
    await db.insert(contactInfo).values({
      email: 'roysourav0906@gmail.com',
      linkedIn: 'https://linkedin.com/in/souravanand',
    });

    console.log('✓ Seeded Contact Info');

    console.log('✅ Database seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

// Run seed if executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
