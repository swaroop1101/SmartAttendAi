import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Scan, 
  Camera, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  RefreshCw,
  User,
  Clock,
  Shield,
  Zap
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const QRScanner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeMode, setActiveMode] = useState("qr");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const simulateQRScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setAttendanceMarked(false);
    
    // Simulate scanning delay
    setTimeout(() => {
      const mockResult = {
        studentId: "STU001",
        studentName: "John Doe",
        rollNumber: "CS21007",
        timestamp: new Date().toLocaleString(),
        method: "QR Code"
      };
      
      setScanResult(mockResult);
      setAttendanceMarked(true);
      setIsScanning(false);
      
      toast({
        title: "Attendance Marked",
        description: `Successfully marked attendance for ${mockResult.studentName}`
      });
    }, 2000);
  };

  const simulateFacialRecognition = () => {
    setIsScanning(true);
    setScanResult(null);
    setAttendanceMarked(false);
    
    // Simulate facial recognition delay
    setTimeout(() => {
      const mockResult = {
        studentId: "STU002",
        studentName: "Jane Smith",
        rollNumber: "CS21008",
        timestamp: new Date().toLocaleString(),
        method: "Facial Recognition",
        confidence: "98.5%"
      };
      
      setScanResult(mockResult);
      setAttendanceMarked(true);
      setIsScanning(false);
      
      toast({
        title: "Face Recognized",
        description: `Successfully identified ${mockResult.studentName} with ${mockResult.confidence} confidence`
      });
    }, 3000);
  };

  const resetScanner = () => {
    setIsScanning(false);
    setScanResult(null);
    setAttendanceMarked(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 backdrop-blur-md bg-slate-900/30 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-800/50 backdrop-blur-sm font-mono"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Scan className="h-8 w-8 text-emerald-400" />
                <span className="text-xl font-bold text-white font-mono">SmartAttend AI</span>
              </div>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-800/50 backdrop-blur-sm font-mono"
              onClick={resetScanner}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white font-mono mb-2">Attendance Scanner</h1>
          <p className="text-slate-300 font-mono">Mark attendance using QR Code or Facial Recognition</p>
        </div>

        {/* Scanner Modes */}
        <Tabs value={activeMode} onValueChange={setActiveMode} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <TabsTrigger value="qr" className="font-mono data-[state=active]:bg-emerald-600/80">
                <Scan className="h-4 w-4 mr-2" />
                QR Scanner
              </TabsTrigger>
              <TabsTrigger value="face" className="font-mono data-[state=active]:bg-emerald-600/80">
                <Camera className="h-4 w-4 mr-2" />
                Face Recognition
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="qr" className="space-y-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader className="text-center">
                <CardTitle className="text-white font-mono flex items-center justify-center">
                  <Scan className="h-6 w-6 mr-2 text-emerald-400" />
                  QR Code Scanner
                </CardTitle>
                <CardDescription className="text-slate-300 font-mono">
                  Scan your QR code to mark attendance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-6">
                  {/* Scanner Area */}
                  <div className="relative">
                    <div className={`w-80 h-80 border-4 border-dashed rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isScanning 
                        ? 'border-emerald-400 bg-emerald-400/10' 
                        : attendanceMarked 
                          ? 'border-green-400 bg-green-400/10'
                          : 'border-slate-600 bg-slate-700/30'
                    }`}>
                      {isScanning ? (
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-400 border-t-transparent mx-auto mb-4"></div>
                          <p className="text-emerald-400 font-mono">Scanning QR Code...</p>
                        </div>
                      ) : attendanceMarked ? (
                        <div className="text-center">
                          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                          <p className="text-green-400 font-mono">Attendance Marked!</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Scan className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-400 font-mono">Position QR code in frame</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Scanning corners */}
                    {!attendanceMarked && (
                      <>
                        <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-emerald-400"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-emerald-400"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-emerald-400"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-emerald-400"></div>
                      </>
                    )}
                  </div>

                  {/* Controls */}
                  <Button 
                    className="bg-emerald-600/80 hover:bg-emerald-500 text-white backdrop-blur-sm border-emerald-500/30 font-mono px-8 py-3"
                    onClick={simulateQRScan}
                    disabled={isScanning}
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Scan className="h-4 w-4 mr-2" />
                        Start QR Scan
                      </>
                    )}
                  </Button>
                </div>

                {/* Result Display */}
                {scanResult && activeMode === "qr" && (
                  <div className="mt-6 p-4 bg-green-600/20 border border-green-600/30 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                      <h3 className="text-green-400 font-mono font-semibold">Attendance Recorded</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400 font-mono">Student Name</p>
                        <p className="text-white font-mono">{scanResult.studentName}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-mono">Roll Number</p>
                        <p className="text-white font-mono">{scanResult.rollNumber}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-mono">Method</p>
                        <p className="text-white font-mono">{scanResult.method}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-mono">Timestamp</p>
                        <p className="text-white font-mono">{scanResult.timestamp}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="face" className="space-y-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader className="text-center">
                <CardTitle className="text-white font-mono flex items-center justify-center">
                  <Camera className="h-6 w-6 mr-2 text-emerald-400" />
                  Facial Recognition
                </CardTitle>
                <CardDescription className="text-slate-300 font-mono">
                  Look at the camera to mark attendance automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-6">
                  {/* Camera Area */}
                  <div className="relative">
                    <div className={`w-80 h-80 border-4 border-dashed rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isScanning 
                        ? 'border-emerald-400 bg-emerald-400/10' 
                        : attendanceMarked 
                          ? 'border-green-400 bg-green-400/10'
                          : 'border-slate-600 bg-slate-700/30'
                    }`}>
                      {isScanning ? (
                        <div className="text-center">
                          <div className="relative">
                            <Camera className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                            <div className="absolute -inset-2 border-2 border-emerald-400 rounded-full animate-ping"></div>
                          </div>
                          <p className="text-emerald-400 font-mono">Analyzing face...</p>
                        </div>
                      ) : attendanceMarked ? (
                        <div className="text-center">
                          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                          <p className="text-green-400 font-mono">Face Recognized!</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Camera className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-400 font-mono">Position face in frame</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Face detection overlay */}
                    {!attendanceMarked && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-48 border-2 border-emerald-400 rounded-full opacity-50"></div>
                    )}
                  </div>

                  {/* Controls */}
                  <Button 
                    className="bg-emerald-600/80 hover:bg-emerald-500 text-white backdrop-blur-sm border-emerald-500/30 font-mono px-8 py-3"
                    onClick={simulateFacialRecognition}
                    disabled={isScanning}
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4 mr-2" />
                        Start Face Scan
                      </>
                    )}
                  </Button>
                </div>

                {/* Result Display */}
                {scanResult && activeMode === "face" && (
                  <div className="mt-6 p-4 bg-green-600/20 border border-green-600/30 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <Shield className="h-6 w-6 text-green-400" />
                      <h3 className="text-green-400 font-mono font-semibold">Face Recognition Successful</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400 font-mono">Student Name</p>
                        <p className="text-white font-mono">{scanResult.studentName}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-mono">Roll Number</p>
                        <p className="text-white font-mono">{scanResult.rollNumber}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-mono">Confidence</p>
                        <p className="text-white font-mono">{scanResult.confidence}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-mono">Timestamp</p>
                        <p className="text-white font-mono">{scanResult.timestamp}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Features Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Zap className="h-8 w-8 text-emerald-400" />
                <h3 className="text-white font-mono">Lightning Fast</h3>
              </div>
              <p className="text-slate-300 font-mono text-sm">
                Mark attendance in seconds with our optimized scanning technology
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="h-8 w-8 text-emerald-400" />
                <h3 className="text-white font-mono">Secure & Private</h3>
              </div>
              <p className="text-slate-300 font-mono text-sm">
                Advanced encryption ensures your biometric data stays protected
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="h-8 w-8 text-emerald-400" />
                <h3 className="text-white font-mono">Real-time Sync</h3>
              </div>
              <p className="text-slate-300 font-mono text-sm">
                Attendance records are instantly updated across all systems
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;