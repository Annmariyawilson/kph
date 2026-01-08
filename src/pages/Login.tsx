import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 opacity-40 blur-3xl animate-float" />
        <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-accent/20 opacity-30 blur-3xl animate-float animation-delay-400" />
      </div>

      <div className="w-full max-w-6xl relative z-10 px-4">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-10 group ml-2"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-body text-[10px] font-black uppercase tracking-widest">Back to Website</span>
        </Link>

        {/* Login Form Component */}
        <LoginForm />

        {/* Info Text below card */}
        <p className="mt-12 text-center font-body text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 max-w-sm mx-auto leading-relaxed">
          Kalangara Paint House — <span className="text-primary italic">Official Management Portal</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
