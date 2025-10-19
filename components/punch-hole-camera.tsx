export default function PunchHoleCamera() {
  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50">
      {/* Camera container */}
      <div className="w-5 h-5 bg-gradient-to-br from-slate-900 to-black rounded-full shadow-lg border border-slate-800/50 flex items-center justify-center">
        {/* Inner lens */}
        <div className="w-3 h-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full shadow-inner flex items-center justify-center">
          {/* Sensor dot */}
          <div className="w-1.5 h-1.5 bg-slate-600 rounded-full opacity-60"></div>
        </div>
      </div>
      {/* Glow effect */}
      <div className="absolute inset-0 w-5 h-5 bg-slate-800/20 rounded-full blur-sm -z-10"></div>
    </div>
  )
}
