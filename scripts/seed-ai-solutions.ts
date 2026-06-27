import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../db/schema";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("❌ DATABASE_URL environment variable is not set");
  process.exit(1);
}

const client = postgres(databaseUrl, { max: 1, idle_timeout: 30 });
const db = drizzle(client, { schema });

const { aiSolutionsSection, aiSolutionItems } = schema;

async function seedAiSolutions() {
  console.log("🌱 Seeding AI Solutions section...");

  try {
    await db.delete(aiSolutionItems).execute();
    await db.delete(aiSolutionsSection).execute();

    await db.insert(aiSolutionsSection).values({
      title: "AI-Led Solutions & Platform Engineering",
      intro:
        "Currently spearheading solution architecture and delivery for an AI-driven Supply Chain Optimization platform that harnesses Agentic AI and advanced data analytics using Azure Data Factory, Databricks and Medallion Architecture to address end-to-end supply chain challenges — encompassing demand forecasting, inventory optimization, predictive maintenance, and logistics analytics.",
    });

    await db.insert(aiSolutionItems).values([
      {
        title: "AI-Led Chatbot Implementation",
        description:
          "Led end-to-end design, implementation, and deployment of an enterprise-grade AI-powered Conversational Chatbot leveraging Retrieval-Augmented Generation (RAG), Azure OpenAI, LangChain, and Azure Vector Database — built on a Java Microservices architecture with ReactJS front-end, RESTful APIs, Azure Kubernetes Service (AKS), and Hybrid Cloud (Azure/AWS) infrastructure with back-end DB2 — delivering context-aware, multi-turn natural language interactions for customer service automation, enterprise knowledge management, and operational query resolution, resulting in measurable productivity gains across collaboration platforms.",
        order: 1,
      },
      {
        title: "Accounts Payable (AP) Automation",
        description:
          "Leading and governing end-to-end program delivery of AP Invoice Automation — overseeing solution architecture, vendor coordination, and cross-functional team execution across Azure Document Intelligence (Form Recognizer), Azure Business Rules Engine (BRE), Azure Logic Apps, and Python — driving full automation of the invoice lifecycle including document ingestion, OCR-based data extraction, field validation, GL coding, and multi-tier approval workflows — delivering measurable reductions in manual touchpoints, accelerated invoice-to-pay cycle times, improved data accuracy, and strengthened audit compliance and financial controls readiness.",
        order: 2,
      },
      {
        title: "HR Process Automation (Agentic AI)",
        description:
          "Led automation of core HR Background Verification process through Copilot Studio and Agentic AI, integrating Azure AI Search and Azure Blob Storage with MS Teams — enhancing HR operations efficiency, reducing manual effort, and establishing process standardization across the HR function.",
        order: 3,
      },
      {
        title: "Bid Accelerator (Agentic AI)",
        description:
          "Led design and implementation of an Agentic AI-powered bid and proposal accelerator on Azure, enabling intelligent content generation, competitive analysis, and compliance checks to significantly compress pursuit timelines and improve win rates — fully integrated with MS Teams for seamless collaboration across pursuit teams.",
        order: 4,
      },
    ]);

    console.log("✅ AI Solutions section seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  } finally {
    await client.end();
  }
}

seedAiSolutions()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
