import { motion } from "framer-motion";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent";

const Card = ({ className = "" }) => (
  <div
    className={`h-28 rounded-2xl bg-slate-200/70 ${shimmer} ${className}`}
  />
);

const DashboardLoader = ({size = 56}) => {
  return (
    <div className="relative min-h-screen p-8 bg-slate-100">
      <div className="flex items-center justify-between mb-10">
        <div className="w-64 h-8 rounded-xl bg-slate-200 animate-pulse" />
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 animate-pulse" />
          <div className="w-10 h-10 rounded-xl bg-slate-200 animate-pulse" />
        </div>
      </div>


      <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="h-64" />
        <Card className="h-64" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative rounded-full"
          style={{ width: size, height: size }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-300 to-slate-500/80" />
          <div className="absolute rounded-full inset-2 bg-slate-100" />
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLoader;
