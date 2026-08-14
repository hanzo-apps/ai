
export interface OperatorModel {
  name: string;
  provider: string;
  features: string[];
  recommended: boolean;
  command: string;
}

export const operatorModels: OperatorModel[] = [
  {
    name: "Hanzo",
    provider: "The default",
    features: [
      "Runs through api.hanzo.ai",
      "Every run shows up in the console with its cost",
      "Bring a Hanzo key, or one you already have",
      "Pick the model in the sidebar",
    ],
    recommended: true,
    command: "docker run -e HANZO_API_KEY …"
  },
  {
    name: "Direct",
    provider: "Straight to the model vendor",
    features: [
      "No Hanzo in the request path",
      "Your existing key and your existing bill",
      "Nothing here to log the run for you",
      "Set API_PROVIDER=anthropic",
    ],
    recommended: false,
    command: "docker run -e API_PROVIDER=anthropic …"
  },
  {
    name: "Bedrock",
    provider: "Inside your AWS account",
    features: [
      "Reads your local AWS profile",
      "Stays in the region you name",
      "For when the model must not leave your account",
      "Set API_PROVIDER=bedrock",
    ],
    recommended: false,
    command: "docker run -e API_PROVIDER=bedrock -e AWS_PROFILE …"
  },
  {
    name: "Vertex",
    provider: "Inside your Google Cloud project",
    features: [
      "Application default credentials",
      "Names a region and a project id",
      "Same container, same desktop, same tools",
      "Set API_PROVIDER=vertex",
    ],
    recommended: false,
    command: "docker run -e API_PROVIDER=vertex -e VERTEX_PROJECT_ID …"
  }
];
