export const templates = {
  landing: {
    "src/pages/Landing.tsx": `
      import { Button } from "@/components/ui/button";
      
      export default function Landing() {
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-500/20 to-teal-500/20">
            <header className="container mx-auto py-6 px-4">
              <nav className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Logo</h1>
                <div className="space-x-4">
                  <Button variant="ghost">Features</Button>
                  <Button variant="ghost">Pricing</Button>
                  <Button>Sign In</Button>
                </div>
              </nav>
            </header>
            
            <main className="container mx-auto px-4 py-20 text-center">
              <h1 className="text-5xl font-bold mb-6">Your Amazing Product</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Description of your product and its main benefits for your users.
              </p>
              <Button size="lg">Get Started</Button>
            </main>
          </div>
        );
      }
    `,
  },
  dashboard: {
    "src/pages/Dashboard.tsx": `
      import { Card } from "@/components/ui/card";
      
      export default function Dashboard() {
        return (
          <div className="min-h-screen bg-background">
            <header className="border-b">
              <div className="container mx-auto py-4 px-6">
                <nav className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <Button>New Project</Button>
                </nav>
              </div>
            </header>
            
            <main className="container mx-auto py-8 px-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Total Projects</h3>
                  <p className="text-3xl font-bold">12</p>
                </Card>
                {/* Add more cards */}
              </div>
            </main>
          </div>
        );
      }
    `,
  },
};

export function generateTemplate(
  type: keyof typeof templates,
  customizations: any = {},
) {
  const template = templates[type];
  // Here you would customize the template based on the customizations object
  return template;
}
