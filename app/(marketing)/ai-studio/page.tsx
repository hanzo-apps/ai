"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Hero from "@/components/ai-studio/Hero"
import StudioLayout from "@/components/ai-studio/StudioLayout"
import { MessageInterface, ModelInterface } from "@/components/ai-studio/types"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"

import { ProductFooter } from "@/components/products/ProductFooter"
export default function AIStudioPage() {
  const [activeTab, setActiveTab] = useState("chat")
  const [promptText, setPromptText] = useState("")
  const [modelSelection, setModelSelection] = useState("glm-5.2")
  const [showSidebar, setShowSidebar] = useState(true)

  const [conversation, setConversation] = useState<MessageInterface[]>([
    {
      role: "assistant",
      content: "Welcome to Hanzo AI Studio. How can I help you today?",
    },
    {
      role: "user",
      content:
        "I need to create a React component that renders a carousel",
    },
    {
      role: "assistant",
      content:
        'Sure! Here\'s a simple React carousel component using Framer Motion:\n\n```jsx\nimport { motion, AnimatePresence } from \'framer-motion\';\nimport { useState } from \'react\';\n\nconst Carousel = ({ images }) => {\n  const [currentIndex, setCurrentIndex] = useState(0);\n\n  const handleNext = () => {\n    setCurrentIndex((prevIndex) => \n      prevIndex === images.length - 1 ? 0 : prevIndex + 1\n    );\n  };\n\n  const handlePrevious = () => {\n    setCurrentIndex((prevIndex) => \n      prevIndex === 0 ? images.length - 1 : prevIndex - 1\n    );\n  };\n\n  return (\n    <div className="relative overflow-hidden">\n      <div className="flex justify-between absolute inset-x-0 top-1/2 z-10">\n        <button onClick={handlePrevious}>Previous</button>\n        <button onClick={handleNext}>Next</button>\n      </div>\n      <AnimatePresence mode="wait">\n        <motion.img\n          key={currentIndex}\n          src={images[currentIndex]}\n          initial={{ opacity: 0 }}\n          animate={{ opacity: 1 }}\n          exit={{ opacity: 0 }}\n          transition={{ duration: 0.5 }}\n          className="w-full h-64 object-cover"\n        />\n      </AnimatePresence>\n    </div>\n  );\n};\n\nexport default Carousel;\n```\n\nThis component takes an array of image URLs and displays them one at a time with animated transitions. You can customize it further based on your specific needs.',
    },
  ])

  const models: ModelInterface[] = [
    { id: "glm-5.2", name: "GLM 5.2", provider: "Hanzo" },
    { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash", provider: "Hanzo" },
    { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", provider: "Hanzo" },
    { id: "zen5-max", name: "Zen5 Max", provider: "Hanzo" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!promptText.trim()) return

    setConversation([
      ...conversation,
      { role: "user", content: promptText },
    ])

    setTimeout(() => {
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `AI Studio demo — connect your API key to get started.`,
        },
      ])
    }, 1000)

    setPromptText("")
  }

  return (
    <div className="flex-1 flex flex-col mt-16">
      <Hero />
      <StudioLayout
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        models={models}
        modelSelection={modelSelection}
        setModelSelection={setModelSelection}
        conversation={conversation}
        promptText={promptText}
        setPromptText={setPromptText}
        handleSubmit={handleSubmit}
      />
      <OSSRevenueBanner upstreamName="ComfyUI" compact />
      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with AI Studio</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/ai-studio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
            <ProductFooter slug="ai-studio" name="AI Studio" />
</div>
  )
}
