"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, ArrowLeft, Sparkles } from "lucide-react"
import { sendMessage } from "@/lib/api"

interface ChatInfo {
  title: string
  description: string
  image: string
  greeting: string
  color: string
}

const chatTypes: Record<string, ChatInfo> = {
  guitar: {
    title: "电吉他猫",
    description: "热情奔放的摇滚灵魂",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-xlOKBk7U9awFuLdT1PWtHczfscLegp.png",
    greeting: "嘿！准备好来一场摇滚之旅了吗？我可以和你聊聊吉他技巧、经典摇滚乐队，或者教你几个简单的和弦！🎸",
    color: "pink",
  },
  piano: {
    title: "钢琴猫",
    description: "优雅沉稳的古典音乐大师",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-I14yfKAnEPVBengmXpesx7jDv9Qssk.png",
    greeting: "你好，很高兴见到你。今天想了解哪位古典作曲家的作品呢？或者需要我推荐一些适合初学者的钢琴曲目吗？🎹",
    color: "blue",
  },
  dj: {
    title: "DJ猫",
    description: "潮流前沿的电子音乐专家",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-vPct5mTsZfriCWU2Zq5VewFarXpSUQ.png",
    greeting: "Yo！欢迎来到电子音乐的世界！想了解最新的EDM趋势，还是想知道如何开始你的混音生涯？让我们一起嗨起来！🎧",
    color: "purple",
  },
}

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const chatType = params.type as string
  const chatInfo = chatTypes[chatType]

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatInfo) {
      setMessages([
        {
          id: "1",
          content: chatInfo.greeting,
          role: "assistant",
          timestamp: new Date(),
        },
      ])
    } else {
      router.push("/")
    }
  }, [chatInfo, router])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await sendMessage(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.choices[0].message.content,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : "抱歉，我遇到了一些问题。请稍后再试。",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!chatInfo) return null

  const getColorClasses = (color: string) => {
    switch (color) {
      case "pink":
        return {
          bg: "bg-pink-500/80",
          hover: "hover:bg-pink-600",
          border: "border-pink-300/30",
        }
      case "blue":
        return {
          bg: "bg-blue-500/80",
          hover: "hover:bg-blue-600",
          border: "border-blue-300/30",
        }
      case "purple":
        return {
          bg: "bg-purple-500/80",
          hover: "hover:bg-purple-600",
          border: "border-purple-300/30",
        }
      default:
        return {
          bg: "bg-pink-500/80",
          hover: "hover:bg-pink-600",
          border: "border-pink-300/30",
        }
    }
  }

  const colorClasses = getColorClasses(chatInfo.color)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 聊天背景 - 使用图片4 */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-6JqXyGwnV5sLj3jRLfMee0deSiRIU6.png"
          alt="聊天背景"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* 额外的星星效果 */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-white/40 animate-pulse"
              size={8}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* 头部 */}
        <div className="bg-black/40 backdrop-blur-md p-4 flex items-center border-b border-white/10">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 mr-3"
            onClick={() => router.push("/")}
          >
            <ArrowLeft />
          </Button>
          <div className="relative h-12 w-12 mr-4">
            <Image
              src={chatInfo.image || "/placeholder.svg"}
              alt={chatInfo.title}
              fill
              className="rounded-full object-cover border-2 border-white/20"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white drop-shadow-lg">{chatInfo.title}</h1>
            <p className="text-sm text-gray-300">{chatInfo.description}</p>
          </div>
        </div>

        {/* 聊天区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && (
                <div className="relative h-8 w-8 mt-1">
                  <Image
                    src={chatInfo.image || "/placeholder.svg"}
                    alt={chatInfo.title}
                    fill
                    className="rounded-full object-cover border border-white/20"
                  />
                </div>
              )}

              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? `${colorClasses.bg} text-white shadow-lg`
                    : "bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg border border-white/20"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === "user" ? "text-white/70" : "text-gray-500"}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>

              {message.role === "user" && (
                <div className="h-8 w-8 mt-1 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <span className="text-white text-xs font-medium">我</span>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="relative h-8 w-8 mt-1">
                <Image
                  src={chatInfo.image || "/placeholder.svg"}
                  alt={chatInfo.title}
                  fill
                  className="rounded-full object-cover border border-white/20"
                />
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 ${colorClasses.bg.replace("/80", "")} rounded-full animate-bounce`}></div>
                  <div
                    className={`w-2 h-2 ${colorClasses.bg.replace("/80", "")} rounded-full animate-bounce`}
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className={`w-2 h-2 ${colorClasses.bg.replace("/80", "")} rounded-full animate-bounce`}
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className="bg-black/40 backdrop-blur-md border-t border-white/10 p-4">
          <form onSubmit={handleSubmit} className="flex w-full gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入您的消息..."
              className="flex-1 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className={`rounded-full ${colorClasses.bg} ${colorClasses.hover} shadow-lg`}
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">发送消息</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
