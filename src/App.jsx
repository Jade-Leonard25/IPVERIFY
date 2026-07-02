import React, { useState } from "react";
import { Card, Button, Spinner, Typography } from "@heroui/react";

export default function App() {
  // Application view states: 'idle', 'loading', 'success', 'error'
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);
  const apiMain = import.meta.env.VITE_REACT_API_MAIN
  
  const handleLookup = async () => {
    setStatus("loading");
    try {
      const response = await fetch(apiMain);
      if (!response.ok) throw new Error("API Node connection error");
      
      const payload = await response.json();
      setData(payload);
      setStatus("success");
    } catch (err) {
      console.error("Network payload resolution error:", err);
      setStatus("error");
    }
  };

  // Clipboard functionality
  const handleCopy = () => {
    if (data?.ipAddress) {
      navigator.clipboard.writeText(data.ipAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between font-sans">
      
      {/* Navigation Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Typography className="text-2xl font-black tracking-tight text-indigo-400">
            Net<span className="text-white">Verify</span>
          </Typography>
          <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full font-mono border border-slate-700">
            HeroUI v3 Engine
          </span>
        </div>
      </header>

      {/* Main Grid: Left Ads | Center App Component | Right Ads */}
      <main className="max-w-7xl mx-auto px-4 py-10 flex-grow w-full grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        
        {/* LEFT COLUMN: Vertical Ad Sidebar (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-1 space-y-2 sticky top-24">
          <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase pl-1">Sponsored</p>
          <div className="bg-slate-800/20 border border-slate-800 rounded-xl min-h-[600px] flex flex-col items-center justify-center text-center p-4">
            <span className="text-slate-600 font-mono text-xs">[Insert Skyscraper Script]</span>
            <span className="text-[10px] text-slate-700 font-mono mt-1">160x600 Banner</span>
          </div>
        </div>

        {/* CENTER COLUMN: Core App Content */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          <Card className="bg-slate-800/30 border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
            <Typography variant="h1" className="text-3xl font-extrabold tracking-tight text-center mb-2 text-white">
              What is my public IP address?
            </Typography>
            <Typography className="text-slate-400 text-center text-sm md:text-base mb-8 max-w-xl mx-auto">
              Securely parse your network configuration vector, identify geo-location nodes, and ensure your proxy or VPN configurations are masked perfectly.
            </Typography>

            {/* Application Dynamic Interface Wrapper */}
            <div className="bg-slate-950/50 border border-slate-700/30 rounded-xl p-6 md:p-8 min-h-[240px] flex flex-col justify-center items-center shadow-inner relative">
              
              {/* IDLE LANDING STATE */}
              {status === "idle" && (
                <div className="text-center space-y-4">
                  <p className="text-xs text-slate-400 font-mono">Ready to inspect current connection context.</p>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-8 py-4 shadow-lg shadow-indigo-600/20"
                    onPress={handleLookup}
                  >
                    Analyze My Connection
                  </Button>
                </div>
              )}

              {/* LOADING STATE */}
              {status === "loading" && (
                <div className="text-center space-y-4">
                  <Spinner size="lg" color="primary" />
                  <p className="text-sm font-mono text-indigo-400 animate-pulse">Mapping complete network payload route...</p>
                </div>
              )}

              {/* SUCCESS RESULTS STATE */}
              {status === "success" && data && (
                <div className="w-full space-y-6 text-left font-mono">
                  
                  {/* MAIN TARGET CARD: IP & VERSION */}
                  <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 relative shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-800/60 pb-2 mb-2">
                      <span className="text-[10px] tracking-wider text-slate-500 uppercase">
                        Public Address (IPv{data.ipVersion})
                      </span>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="text-xs font-mono border border-slate-700 bg-slate-800 text-indigo-400 hover:bg-slate-700 h-7"
                        onPress={handleCopy}
                      >
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <div className="text-xl md:text-2xl font-bold tracking-tight text-emerald-400 break-all select-all">
                      {data.ipAddress}
                    </div>
                  </div>

                  {/* METADATA BREAKDOWN GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    
                    {/* Location Panel */}
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                      <span className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">City & Region</span>
                      <span className="text-slate-200 font-semibold block">{data.cityName || "—"}</span>
                      <span className="text-slate-400 text-[11px] block truncate">{data.regionName} ({data.regionCode})</span>
                    </div>

                    {/* Country Details */}
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                      <span className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Country Context</span>
                      <span className="text-slate-200 font-semibold block">{data.countryName} ({data.countryCode})</span>
                      <span className="text-slate-400 text-[11px] block">Capital: {data.capital}</span>
                    </div>

                    {/* Coordinates */}
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                      <span className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Geo Vectors</span>
                      <span className="text-slate-200 font-semibold block">Lat: {data.latitude}</span>
                      <span className="text-slate-200 font-semibold block">Lng: {data.longitude}</span>
                    </div>

                    {/* ISP & Routing Systems */}
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 sm:col-span-2">
                      <span className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Carrier / Autonomous System</span>
                      <span className="text-emerald-400 font-semibold block truncate">{data.asnOrganization}</span>
                      <span className="text-slate-400 text-[11px] block font-mono">ASN Reference Number: AS{data.asn}</span>
                    </div>

                    {/* Proxy Diagnostics */}
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                      <span className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Proxy Detection</span>
                      <span className={`font-bold block uppercase tracking-wide ${data.isProxy ? "text-rose-400" : "text-emerald-400"}`}>
                        {data.isProxy ? "Active Proxy/VPN" : "Secure Connection"}
                      </span>
                    </div>

                    {/* Timezones & Dialing Protocols */}
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                      <span className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Time & Locale</span>
                      <span className="text-slate-200 font-semibold block truncate">{data.timeZones?.join(", ") || "—"}</span>
                      <span className="text-slate-400 text-[11px] block">Postal Code: {data.zipCode || "—"}</span>
                    </div>

                    {/* Currencies and Languages */}
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                      <span className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Financial & Coding</span>
                      <span className="text-slate-200 font-semibold block">Currency: {data.currencies?.join(", ") || "—"}</span>
                      <span className="text-slate-400 text-[11px] block">Languages: {data.languages?.join(", ")}</span>
                    </div>

                    {/* Continental Scope */}
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                      <span className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Regional Vector</span>
                      <span className="text-slate-200 font-semibold block">{data.continent}</span>
                      <span className="text-slate-400 text-[11px] block">Dialing Code: +{data.phoneCodes?.join(", ")}</span>
                    </div>

                  </div>

                </div>
              )}

              {/* ERROR STATE */}
              {status === "error" && (
                <div className="text-center space-y-4">
                  <p className="text-sm text-rose-400 font-mono">Failed to resolve route packet payload.</p>
                  <Button variant="secondary" size="sm" className="bg-slate-800 text-slate-200 border border-slate-700" onPress={() => setStatus("idle")}>
                    Retry Request
                  </Button>
                </div>
              )}

            </div>
          </Card>

          {/* Context / SEO Section */}
          <div className="bg-slate-800/10 border border-slate-800/40 rounded-xl p-5 text-xs text-slate-400 leading-relaxed">
            <Typography variant="h3" className="text-slate-300 font-semibold text-sm mb-1">
              About Dynamic IP Audits
            </Typography>
            <p>
              Your system broadcast profile outputs identifying strings directly onto destination servers during runtime handshake cycles. Validating these pathways ensures configuration stability.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Vertical Ad Sidebar (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-1 space-y-2 sticky top-24">
          <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase pl-1">Sponsored</p>
          <div className="bg-slate-800/20 border border-slate-800 rounded-xl min-h-[600px] flex flex-col items-center justify-center text-center p-4">
            <span className="text-slate-600 font-mono text-xs">[Insert Skyscraper Script]</span>
            <span className="text-[10px] text-slate-700 font-mono mt-1">160x600 Banner</span>
          </div>
        </div>

      </main>

      {/* Horizontal Footer Ads Row */}
      <footer className="border-t border-slate-800 bg-slate-950/40 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-4">
          <div className="w-full max-w-2xl bg-slate-800/10 border border-slate-800/60 py-2 px-4 text-center rounded-lg min-h-[70px] flex items-center justify-center text-xs text-slate-600 font-mono">
            [Optional Bottom 728x90 Leaderboard Banner Placement]
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            &copy; 2026 NetVerify. Built via HeroUI React Engines.
          </p>
        </div>
      </footer>

    </div>
  );
}