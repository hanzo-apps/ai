'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Terminal } from "lucide-react";
import { Button } from "@hanzo/ui";

const OperativeUsage = () => {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden" id="get-started">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-6">
              One docker run
            </h2>
            <p className="text-xl text-foreground/80">
              Nothing is installed on your machine. The desktop, the tools and the agent are all inside the image
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-[var(--white)] mb-4">Installation</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-2">Pull the image</p>
                  <div className="bg-neutral-900 rounded-md p-3 font-mono text-sm text-[var(--white)] overflow-x-auto">
                    docker pull ghcr.io/hanzoai/operative:latest
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-2">Run it with your key and the four ports</p>
                  <div className="bg-neutral-900 rounded-md p-3 font-mono text-sm text-[var(--white)] overflow-x-auto">
                    docker run -e ANTHROPIC_API_KEY -p 8501:8501 -p 6080:6080 -p 5900:5900 -p 8080:8080 -it ghcr.io/hanzoai/operative:latest
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-2">Open localhost:8501 and type an objective</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button size="sm" variant="outline" className="text-foreground/80 border-neutral-700">
                  <Terminal className="h-4 w-4 mr-2" />
                  Copy Installation Commands
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-[var(--white)] mb-4">System Requirements</h3>
              
              <ul className="space-y-2 text-muted-foreground">
                <li>• Docker. Nothing else installed on the host</li>
                <li>• A key for the API, Bedrock, or Vertex</li>
                <li>• Four ports free: 8501, 6080, 5900, 8080</li>
                <li>• Give the container the fewest privileges that work</li>
              </ul>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 h-full"
          >
            <h3 className="text-xl font-semibold text-[var(--white)] mb-4">Basic Usage</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-muted-foreground mb-2">Watch it in a browser, no VNC client needed</p>
                <div className="bg-gray-900 rounded-md p-3 font-mono text-sm text-[var(--white)] overflow-x-auto">
                  open http://localhost:6080
                </div>
              </div>

              <div>
                <p className="text-muted-foreground mb-2">Send the model through Bedrock instead</p>
                <div className="bg-neutral-900 rounded-md p-3 font-mono text-sm text-[var(--white)] overflow-x-auto">
                  docker run -e API_PROVIDER=bedrock -e AWS_PROFILE -e AWS_REGION=us-west-2 …
                </div>
              </div>

              <div>
                <p className="text-muted-foreground mb-2">Or through Vertex</p>
                <div className="bg-gray-900 rounded-md p-3 font-mono text-sm text-[var(--white)] overflow-x-auto">
                  docker run -e API_PROVIDER=vertex -e VERTEX_REGION -e VERTEX_PROJECT_ID …
                </div>
              </div>

              <div>
                <p className="text-muted-foreground mb-2">Keep the session between runs</p>
                <div className="bg-gray-900 rounded-md p-3 font-mono text-sm text-[var(--white)] overflow-x-auto">
                  docker run -v $HOME/.anthropic:/home/operative/.anthropic …
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-muted-foreground">Computer use is beta, and instructions written into a web page or an image can try to talk to the model as if they were you. Limit outbound traffic to domains you name, and ask for a human yes before anything with consequences outside the container.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OperativeUsage;
