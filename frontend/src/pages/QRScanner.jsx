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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-slate-600 hover:text-slate-800 hover:bg-slate-100/50 backdrop-blur-sm font-mono"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Scan className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-slate-800 font-mono">SmartAttend AI</span>
              </div>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="border-slate-300 text-slate-700 hover:bg-slate-100/50 backdrop-blur-sm font-mono"
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
          <h1 className="text-4xl font-bold text-slate-800 font-mono mb-2">Attendance Scanner</h1>
          <p className="text-slate-600 font-mono">Mark attendance using QR Code or Facial Recognition</p>
        </div>

        {/* Scanner Modes */}
        <Tabs value={activeMode} onValueChange={setActiveMode} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="bg-white/70 backdrop-blur-sm border-slate-200/50">
              <TabsTrigger value="qr" className="font-mono data-[state=active]:bg-blue-600/90 data-[state=active]:text-white">
                <Scan className="h-4 w-4 mr-2" />
                QR Scanner
              </TabsTrigger>
              <TabsTrigger value="face" className="font-mono data-[state=active]:bg-blue-600/90 data-[state=active]:text-white">
                <Camera className="h-4 w-4 mr-2" />
                Face Recognition
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="qr" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-slate-800 font-mono flex items-center justify-center">
                  <Scan className="h-6 w-6 mr-2 text-blue-600" />
                  QR Code Scanner
                </CardTitle>
                <CardDescription className="text-slate-600 font-mono">
                  Scan your QR code to mark attendance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-6">
                  {/* Scanner Area */}
                  <div className="relative">
                    <div className={`w-80 h-80 border-4 border-dashed rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isScanning 
                        ? 'border-blue-500 bg-blue-50' 
                        : attendanceMarked 
                          ? 'border-green-500 bg-green-50'
                          : 'border-slate-300 bg-slate-50'
                    }`}>
                      {isScanning ? (
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                          <p className="text-blue-600 font-mono">Scanning QR Code...</p>
                        </div>
                      ) : attendanceMarked ? (
                        <div className="text-center">
                          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                          <p className="text-green-600 font-mono">Attendance Marked!</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Scan className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                          <p className="text-slate-600 font-mono">Position QR code in frame</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Scanning corners */}
                    {!attendanceMarked && (
                      <>
                        <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-blue-500"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-blue-500"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-blue-500"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-blue-500"></div>
                      </>
                    )}
                  </div>

                  {/* Controls */}
                  <Button 
                    size="lg" 
                    className="bg-blue-600/90 hover:bg-blue-700 text-white backdrop-blur-sm border-blue-500/30 font-mono px-8 py-3"
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
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <h3 className="text-green-800 font-mono font-semibold">Attendance Recorded</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 font-mono">Student Name</p>
                        <p className="text-slate-800 font-mono font-medium">{scanResult.studentName}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 font-mono">Roll Number</p>
                        <p className="text-slate-800 font-mono font-medium">{scanResult.rollNumber}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 font-mono">Method</p>
                        <p className="text-slate-800 font-mono font-medium">{scanResult.method}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 font-mono">Timestamp</p>
                        <p className="text-slate-800 font-mono font-medium text-xs">{scanResult.timestamp}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="face" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-slate-800 font-mono flex items-center justify-center">
                  <Camera className="h-6 w-6 mr-2 text-blue-600" />
                  Facial Recognition
                </CardTitle>
                <CardDescription className="text-slate-600 font-mono">
                  Look at the camera to mark attendance automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-6">
                  {/* Camera Area */}
                  <div className="relative">
                    <div className={`w-80 h-80 border-4 border-dashed rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isScanning 
                        ? 'border-blue-500 bg-blue-50' 
                        : attendanceMarked 
                          ? 'border-green-500 bg-green-50'
                          : 'border-slate-300 bg-slate-50'
                    }`}>
                      {isScanning ? (
                        <div className="text-center">
                          <div className="relative">
                            <Camera className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                            <div className="absolute -inset-2 border-2 border-blue-600 rounded-full animate-ping"></div>
                          </div>
                          <p className="text-blue-600 font-mono">Analyzing face...</p>
                        </div>
                      ) : attendanceMarked ? (
                        <div className="text-center">
                          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                          <p className="text-green-600 font-mono">Face Recognized!</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Camera className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                          <p className="text-slate-600 font-mono">Position face in frame</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Face detection overlay */}
                    {!attendanceMarked && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-48 border-2 border-blue-500 rounded-full opacity-50"></div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex space-x-4">
                    <Button 
                      size="lg" 
                      className="bg-blue-600/90 hover:bg-blue-700 text-white backdrop-blur-sm border-blue-500/30 font-mono px-8 py-3"
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
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-slate-300 text-slate-700 hover:bg-slate-100/50 backdrop-blur-sm font-mono px-8 py-3"
                      onClick={() => navigate("/facial-recognition")}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Advanced Mode
                    </Button>
                  </div>
                </div>

                {/* Result Display */}
                {scanResult && activeMode === "face" && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <Shield className="h-6 w-6 text-green-600" />
                      <h3 className="text-green-800 font-mono font-semibold">Face Recognition Successful</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 font-mono">Student Name</p>
                        <p className="text-slate-800 font-mono font-medium">{scanResult.studentName}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 font-mono">Roll Number</p>
                        <p className="text-slate-800 font-mono font-medium">{scanResult.rollNumber}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 font-mono">Confidence</p>
                        <p className="text-slate-800 font-mono font-medium">{scanResult.confidence}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 font-mono">Timestamp</p>
                        <p className="text-slate-800 font-mono font-medium text-xs">{scanResult.timestamp}</p>
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
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Zap className="h-8 w-8 text-blue-600" />
                <h3 className="text-slate-800 font-mono">Lightning Fast</h3>
              </div>
              <p className="text-slate-600 font-mono text-sm">
                Mark attendance in seconds with our optimized scanning technology
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <h3 className="text-slate-800 font-mono">Secure & Private</h3>
              </div>
              <p className="text-slate-600 font-mono text-sm">
                Advanced encryption ensures your biometric data stays protected
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="h-8 w-8 text-blue-600" />
                <h3 className="text-slate-800 font-mono">Real-time Sync</h3>
              </div>
              <p className="text-slate-600 font-mono text-sm">
                Attendance records are instantly updated across all systems
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Links */}
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold text-slate-800 font-mono mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button 
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-100/50 backdrop-blur-sm font-mono justify-start"
                onClick={() => navigate("/facial-recognition")}
              >
                <Shield className="h-4 w-4 mr-2" />
                Advanced Face Scan
              </Button>
              <Button 
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-100/50 backdrop-blur-sm font-mono justify-start"
                onClick={() => navigate("/student-portal")}
              >
                <User className="h-4 w-4 mr-2" />
                Student Portal
              </Button>
              <Button 
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-100/50 backdrop-blur-sm font-mono justify-start"
                onClick={() => navigate("/professor-dashboard")}
              >
                <Clock className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button 
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-100/50 backdrop-blur-sm font-mono justify-start"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRScanner;