import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Sparkles } from "lucide-react"

export default function MusicChatRoom() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 星空背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900">
        {/* 星星效果 */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* 大一点的闪烁星星 */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-white/60 animate-pulse"
              size={12}
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white tracking-wider mb-4 drop-shadow-2xl">音 乐 聊 天 室</h1>
          <p className="text-2xl text-blue-200/80 font-light tracking-wide">Music chat room</p>
        </div>

        {/* 卡片容器 */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-center items-center gap-8 mb-16">
          {/* 电吉他猫 */}
          <div className="group w-full lg:w-1/3 max-w-sm">
            <Link
              href="/chat/guitar"
              className="block transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className="relative rounded-2xl overflow-hidden border-3 border-pink-300/50 bg-gradient-to-b from-pink-100/10 to-purple-100/10 backdrop-blur-sm shadow-2xl hover:shadow-pink-500/25 hover:border-pink-400/80 transition-all duration-300">
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-xlOKBk7U9awFuLdT1PWtHczfscLegp.png"
                    alt="电吉他猫"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="p-6 text-center relative">
                  <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">电 吉 他 猫</h2>
                  <p className="text-sm text-gray-200/90 leading-relaxed mb-4">
                    热情奔放的摇滚灵魂，能带你感受电音的律动与激情。擅长讨论摇滚乐历史、吉他技巧和现场表演艺术。
                    与它聊天，仿佛置身于震撼人心的音乐现场。
                  </p>

                  {/* Chat 按钮 */}
                  <div className="flex items-center justify-center gap-2 bg-pink-500/80 hover:bg-pink-500 text-white px-6 py-3 rounded-full transition-all duration-300 group-hover:bg-pink-400">
                    <MessageCircle size={18} />
                    <span className="font-medium">Chat</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* 钢琴猫 */}
          <div className="group w-full lg:w-1/3 max-w-sm">
            <Link
              href="/chat/piano"
              className="block transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className="relative rounded-2xl overflow-hidden border-3 border-pink-300/50 bg-gradient-to-b from-pink-100/10 to-purple-100/10 backdrop-blur-sm shadow-2xl hover:shadow-blue-500/25 hover:border-blue-400/80 transition-all duration-300">
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-I14yfKAnEPVBengmXpesx7jDv9Qssk.png"
                    alt="钢琴猫"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="p-6 text-center relative">
                  <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">钢 琴 猫</h2>
                  <p className="text-sm text-gray-200/90 leading-relaxed mb-4">
                    优雅沉稳的古典音乐大师，精通巴赫、莫扎特到肖邦的经典作品。
                    能为你讲述钢琴曲背后的故事与情感，分享演奏技巧与乐理知识。与它交流，如同漫步在音符编织的梦境中。
                  </p>

                  {/* Chat 按钮 */}
                  <div className="flex items-center justify-center gap-2 bg-blue-500/80 hover:bg-blue-500 text-white px-6 py-3 rounded-full transition-all duration-300 group-hover:bg-blue-400">
                    <MessageCircle size={18} />
                    <span className="font-medium">Chat</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* DJ猫 */}
          <div className="group w-full lg:w-1/3 max-w-sm">
            <Link
              href="/chat/dj"
              className="block transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className="relative rounded-2xl overflow-hidden border-3 border-pink-300/50 bg-gradient-to-b from-pink-100/10 to-purple-100/10 backdrop-blur-sm shadow-2xl hover:shadow-purple-500/25 hover:border-purple-400/80 transition-all duration-300">
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-vPct5mTsZfriCWU2Zq5VewFarXpSUQ.png"
                    alt="DJ猫"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="p-6 text-center relative">
                  <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">DJ 猫</h2>
                  <p className="text-sm text-gray-200/90 leading-relaxed mb-4">
                    潮流前沿的电子音乐专家，熟悉各类EDM、House和Techno流派。
                    能推荐最新音乐节目单，分享混音技巧和音乐制作软件使用心得。与它对话，仿佛置身于闪烁灯光下的狂欢派对。
                  </p>

                  {/* Chat 按钮 */}
                  <div className="flex items-center justify-center gap-2 bg-purple-500/80 hover:bg-purple-500 text-white px-6 py-3 rounded-full transition-all duration-300 group-hover:bg-purple-400">
                    <MessageCircle size={18} />
                    <span className="font-medium">Chat</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* 底部提示文字 */}
        <div className="text-center">
          <p className="text-xl text-white/90 mb-2 drop-shadow-lg">选择你的聊天室，今天想去哪里探索...</p>
          <p className="text-lg text-blue-200/70">Choose your chat room. Where do you want to explore today</p>
        </div>
      </div>
    </div>
  )
}
