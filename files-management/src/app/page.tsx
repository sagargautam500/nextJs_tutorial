import Link from "next/link";
import { Upload, Image, Video, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon: Icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

interface ActionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  gradient: string;
}

function ActionCard({ icon: Icon, title, description, href, gradient }: ActionCardProps) {
  return (
    <Link href={href}>
      <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          {title}
          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-lg border border-gray-200">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-gray-700">Modern File Management</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Manage Your Files
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-transparent bg-clip-text">
              Effortlessly
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Upload, organize, and stream your images, PDFs, and videos in one beautiful platform. Fast, secure, and incredibly simple.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/upload">
              <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Files
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/gallery">
              <button className="bg-white text-gray-800 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-gray-200 hover:border-gray-300">
                View Gallery
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built with modern technology to give you the best file management experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={Zap}
            title="Lightning Fast"
            description="Upload and access your files instantly with our optimized infrastructure. No more waiting around."
            gradient="from-amber-400 to-orange-500"
          />
          <FeatureCard
            icon={Shield}
            title="Secure Storage"
            description="Your files are encrypted and stored safely. We take security seriously so you don't have to worry."
            gradient="from-emerald-400 to-teal-500"
          />
          <FeatureCard
            icon={Sparkles}
            title="Beautiful Interface"
            description="Modern, intuitive design that makes file management a breeze. Everything just works."
            gradient="from-rose-400 to-pink-500"
          />
        </div>

        {/* Action Cards */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Would You Like To Do?
          </h2>
          <p className="text-xl text-gray-600">
            Choose an action to get started
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ActionCard
            icon={Upload}
            title="Upload"
            description="Upload your images, PDFs, and videos with drag-and-drop ease"
            href="/upload"
            gradient="from-emerald-500 to-teal-600"
          />
          <ActionCard
            icon={Image}
            title="Gallery"
            description="Browse and manage all your uploaded files in one place"
            href="/gallery"
            gradient="from-orange-500 to-amber-600"
          />
          <ActionCard
            icon={Video}
            title="Stream"
            description="Watch your videos with our smooth streaming player"
            href="/stream"
            gradient="from-cyan-500 to-sky-600"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-slate-800 to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">Fast</div>
              <div className="text-xl opacity-90">Upload Speed</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">Secure</div>
              <div className="text-xl opacity-90">File Storage</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">Simple</div>
              <div className="text-xl opacity-90">User Interface</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust our platform for their file management needs
        </p>
        <Link href="/upload">
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-5 px-10 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 text-lg flex items-center gap-3 mx-auto">
            <Upload className="w-6 h-6" />
            Start Uploading Now
            <ArrowRight className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </div>
  );
}