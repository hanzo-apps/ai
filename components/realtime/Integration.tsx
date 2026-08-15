'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Code, ArrowRight } from "lucide-react";
import { Button } from "@hanzo/ui";

// Define a proper type for the presence event
interface PresenceEvent {
  action: 'join' | 'leave';
  userData: {
    name: string;
    [key: string]: string | number | boolean;
  };
}

const Integration = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-4">
            Three calls, then it is live
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Mint a grant, spend it to open the stream, say what you want to hear about
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-[var(--white)] mb-4">The handshake, in full</h3>
            <p className="text-foreground/80 mb-6">
              There is no hidden protocol here. A grant is minted on a normal
              authenticated request, the stream spends it once, and the client
              id that comes back is how you tell the server which collections
              and records you want. The SDK does all three for you; the raw
              calls are there if you would rather do it yourself.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-foreground text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-[var(--white)] font-medium mb-1">Mint a grant</h4>
                  <p className="text-muted-foreground text-sm">One authenticated request returns a string good for thirty seconds and exactly one stream</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-foreground text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-[var(--white)] font-medium mb-1">Open the stream, name your topics</h4>
                  <p className="text-muted-foreground text-sm">Spend the grant, take the client id it hands back, then post the collections and records you care about</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-foreground text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-[var(--white)] font-medium mb-1">Write a record</h4>
                  <p className="text-muted-foreground text-sm">Any create, update or delete reaches everyone watching whose rule lets them see it</p>
                </div>
              </div>
            </div>
            
            <Button className="bg-primary hover:bg-primary/90">
              View Documentation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[var(--black)] rounded-xl border border-neutral-800 p-6"
          >
            <div className="flex items-center mb-4">
              <Code className="h-5 w-5 text-foreground mr-2" />
              <span className="text-foreground/80">The wire, without the SDK</span>
            </div>
            
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm overflow-auto max-h-[400px]">
              <div className="text-foreground/70">// 1. mint a grant on an ordinary authenticated request</div>
              <div className="text-foreground/80">const &#123; token &#125; = await post('/v1/realtime/token');</div>
              <div className="text-foreground/80 mb-4"></div>
              
              <div className="text-foreground/70">// 2. spend it — once, and within thirty seconds</div>
              <div className="text-foreground/80">const es = new EventSource('/v1/realtime?token=' + token);</div>
              <div className="text-foreground/80 pl-4">es.addEventListener('CONNECT', (ev) =&gt; &#123;</div>
              <div className="text-foreground/80 pl-8">const &#123; clientId &#125; = JSON.parse(ev.data);</div>
              <div className="text-foreground/80 pl-8">// 3. name the collections and records you want</div>
              <div className="text-foreground/80 pl-8">post('/v1/realtime', &#123;</div>
              <div className="text-foreground/80 pl-4">clientId,</div>
              <div className="text-foreground/80 pl-4">subscriptions: [</div>
              <div className="text-foreground/80 pl-8">'messages',        // the whole collection</div>
              <div className="text-foreground/80 pl-12">'orders/ord_42',   // one record</div>
              <div className="text-foreground/80 pl-8">],</div>
              <div className="text-foreground/80 pl-12"></div>
              <div className="text-foreground/80 pl-8">&#125;);</div>
              <div className="text-foreground/80 pl-4">&#125;);</div>
              <div className="text-foreground/80"></div>
              <div className="text-foreground/80 mb-4"></div>
              
              <div className="text-foreground/70">// records arrive as events named for the topic</div>
              <div className="text-foreground/80">es.addEventListener('messages', (ev) =&gt; &#123;</div>
              <div className="text-foreground/80 pl-4">const &#123; action, record &#125; = JSON.parse(ev.data);</div>
              <div className="text-foreground/80 pl-8"></div>
              <div className="text-foreground/80 pl-8"></div>
              <div className="text-foreground/80 pl-4">if (action === 'delete') remove(record.id);</div>
              <div className="text-foreground/80 pl-4">else render(record);</div>
              <div className="text-foreground/80 pl-4"></div>
              <div className="text-foreground/80">&#125;);</div>
              <div className="text-foreground/80 mb-4"></div>
              
              <div className="text-foreground/70">// a grant is spent; a dropped stream reopens with a new one</div>
              <div className="text-foreground/80">es.onerror = () =&gt; reconnect();</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Integration;
