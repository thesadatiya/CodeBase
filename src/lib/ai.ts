import { templates, generateTemplate } from "./templates";

export interface GeneratedFiles {
  [path: string]: string;
}

interface AIResponse {
  type: "landing" | "dashboard" | "custom";
  customizations: {
    colors?: string[];
    layout?: string;
    features?: string[];
    components?: string[];
    style?: string;
  };
}

interface LLMResponse {
  html: string;
  css: string;
  components: string[];
  features: string[];
}

import { scrapeDesignPatterns, analyzeDesignTrends } from "./webScraper";
import { aiTrainer } from "./aiTraining";

async function queryLLMs(prompt: string): Promise<LLMResponse> {
  // 1. Scrape design patterns from similar websites
  const similarSites = [
    "https://stripe.com",
    "https://vercel.com",
    "https://linear.app",
  ];

  const [designTrends, scrapedDesign] = await Promise.all([
    analyzeDesignTrends(similarSites),
    scrapeDesignPatterns(similarSites[0]),
  ]);

  // 2. Generate optimized code using the trained model
  const optimizedCode = await aiTrainer.generateOptimizedCode(prompt);

  // 3. Analyze and combine design patterns
  const designSystem = designTrends.designSystems[0];
  const interactionPatterns = designTrends.interactionPatterns;

  // 4. Generate optimized components based on trends and patterns
  const components = [
    ...new Set([
      ...designTrends.popularComponents,
      ...scrapedDesign.components.map((c) => c.type),
    ]),
  ];

  // 5. Apply design system and interactions
  const enhancedCode = applyDesignSystem(optimizedCode, {
    designSystem,
    interactions: interactionPatterns,
    animations: scrapedDesign.animations,
    layout: scrapedDesign.layout,
  });

  return {
    html: optimizedCode,
    css: scrapedDesign.css,
    components,
    features: ["authentication", "dark-mode", "responsive-design"],
  };
}

export async function generateWebsite(prompt: string): Promise<GeneratedFiles> {
  // Get enhanced response from multiple LLMs
  const llmResponse = await queryLLMs(prompt);

  // Analyze the prompt and LLM responses
  const aiResponse = analyzePrompt(prompt, llmResponse);

  // Generate the base template with enhanced customizations
  let files = generateTemplate(aiResponse.type, aiResponse.customizations);

  // Add any additional files or customizations
  if (aiResponse.customizations.features?.includes("authentication")) {
    files = {
      ...files,
      "src/pages/SignIn.tsx": templates.auth["src/pages/SignIn.tsx"],
    };
  }

  return files;
}

function analyzePrompt(prompt: string, llmResponse: LLMResponse): AIResponse {
  const keywords = prompt.toLowerCase().split(" ");

  // Combine user intent with LLM suggestions
  const features = new Set([...llmResponse.features]);
  const components = new Set([...llmResponse.components]);

  // Determine the type based on keywords and LLM response
  const type =
    keywords.includes("landing") || keywords.includes("homepage")
      ? "landing"
      : "dashboard";

  return {
    type,
    customizations: {
      colors: ["purple", "teal"],
      layout: "modern",
      features: Array.from(features),
      components: Array.from(components),
      style: "glass-morphism",
    },
  };
}
