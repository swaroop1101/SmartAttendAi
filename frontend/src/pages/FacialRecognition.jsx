import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { 
  Camera, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  RefreshCw,
  User,
  Shield,
  Zap,
  Eye,
  AlertTriangle,
  Clock,
  Scan
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const FacialRecognition = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState("idle"); // idle, detecting, analyzing, complete

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: "user"
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        toast({
          title: "Camera Activated",
          description: "Position your face in the center of the frame"
        });
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const simulateFacialRecognition = () => {
    if (!cameraActive) {
      toast({
        title: "Camera Required",
        description: "Please activate camera first",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    setScanResult(null);
    setConfidence(0);
    setProgress(0);
    setScanPhase("detecting");
    
    // Phase 1: Face Detection
    const detectionTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 30) {
          clearInterval(detectionTimer);
          setScanPhase("analyzing");
          
          // Phase 2: Analysis
          const analysisTimer = setInterval(() => {
            setProgress(prev => {
              setConfidence(prev * 3.2); // Convert progress to confidence
              if (prev >= 100) {
                clearInterval(analysisTimer);
                setScanPhase("complete");
                
                // Complete recognition
                setTimeout(() => {
                  const mockResult = {
                    studentId: "STU003",
                    studentName: "Alex Johnson",
                    rollNumber: "CS21009",
                    timestamp: new Date().toLocaleString(),
                    method: "Facial Recognition",
                    confidence: "97.8%",
                    faceMatches: 5,
                    verificationTime: "2.3s"
                  };
                  
                  setScanResult(mockResult);
                  setIsScanning(false);
                  setConfidence(97.8);
                  
                  toast({
                    title: "Face Recognized",
                    description: `Successfully identified ${mockResult.studentName}`
                  });
                }, 500);
                
                return 100;
              }
              return prev + 2;
            });
          }, 50);
          
          return 30;
        }
        return prev + 1;
      });
    }, 100);
  };

  const resetScanner = () => {
    setIsScanning(false);
    setScanResult(null);
    setConfidence(0);
    setProgress(0);
    setScanPhase("idle");
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const getPhaseMessage = () => {
    switch (scanPhase) {
      case "detecting": return "Detecting face...";
      case "analyzing": return "Analyzing facial features...";
      case "complete": return "Recognition complete!";
      default: return "Ready to scan";
    }
  };

  const getPhaseIcon = () => {
    switch (scanPhase) {
      case "detecting": return <Eye className="h-6 w-6 text-blue-600 animate-pulse" />;
      case "analyzing": return <Shield className="h-6 w-6 text-blue-600 animate-spin" />;
      case "complete": return <CheckCircle className="h-6 w-6 text-green-600" />;
      default: return <Camera className="h-6 w-6 text-slate-500" />;
    }
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
          <h1 className="text-4xl font-bold text-slate-800 font-mono mb-2">Facial Recognition</h1>
          <p className="text-slate-600 font-mono">Advanced AI-powered facial recognition for secure attendance</p>
        </div>

        {/* Main Scanner Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera Feed */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-slate-800 font-mono flex items-center justify-center">
                <Camera className="h-6 w-6 mr-2 text-blue-600" />
                Live Camera Feed
              </CardTitle>
              <CardDescription className="text-slate-600 font-mono">
                Position your face in the center of the frame
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Video Element */}
                <div className="relative w-full h-80 bg-slate-100 rounded-lg overflow-hidden border-4 border-dashed border-slate-300">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                    style={{ display: cameraActive ? 'block' : 'none' }}
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {!cameraActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500 font-mono">Camera not active</p>
                      </div>
                    </div>
                  )}

                  {/* Face Detection Overlay */}
                  {cameraActive && (
                    <>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-56 border-2 border-blue-500 rounded-full opacity-60"></div>
                      <div className="absolute top-4 left-4 right-4 flex justify-between">
                        <div className="w-6 h-6 border-l-2 border-t-2 border-blue-500"></div>
                        <div className="w-6 h-6 border-r-2 border-t-2 border-blue-500"></div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                        <div className="w-6 h-6 border-l-2 border-b-2 border-blue-500"></div>
                        <div className="w-6 h-6 border-r-2 border-b-2 border-blue-500"></div>
                      </div>
                    </>
                  )}
                </div>

                {/* Controls */}
                <div className="mt-6 flex flex-col space-y-3">
                  {!cameraActive ? (
                    <Button 
                      className="bg-blue-600/90 hover:bg-blue-700 text-white backdrop-blur-sm font-mono"
                      onClick={startCamera}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Activate Camera
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-green-600/90 hover:bg-green-700 text-white backdrop-blur-sm font-mono"
                        onClick={simulateFacialRecognition}
                        disabled={isScanning}
                      >
                        {isScanning ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            {getPhaseMessage()}
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-2" />
                            Start Face Recognition
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full border-slate-300 text-slate-700 hover:bg-slate-100/50 backdrop-blur-sm font-mono"
                        onClick={stopCamera}
                      >
                        Stop Camera
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recognition Status */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 font-mono flex items-center">
                {getPhaseIcon()}
                <span className="ml-2">Recognition Status</span>
              </CardTitle>
              <CardDescription className="text-slate-600 font-mono">
                Real-time facial recognition analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-slate-600">Analysis Progress</span>
                  <span className="text-sm font-mono text-slate-800">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Confidence Meter */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-slate-600">Confidence Level</span>
                  <span className="text-sm font-mono text-slate-800">{confidence.toFixed(1)}%</span>
                </div>
                <Progress value={confidence} className="h-2" />
              </div>

              {/* Status Message */}
              <div className="p-4 bg-slate-100/50 rounded-lg backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  {getPhaseIcon()}
                  <span className="font-mono text-slate-800">{getPhaseMessage()}</span>
                </div>
                {scanPhase === "analyzing" && (
                  <p className="text-xs text-slate-600 font-mono">
                    Analyzing facial features and matching against database...
                  </p>
                )}
              </div>

              {/* Recognition Result */}
              {scanResult && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h3 className="text-green-800 font-mono font-semibold">Recognition Successful</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-mono">Student Name:</span>
                      <span className="text-slate-800 font-mono font-medium">{scanResult.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-mono">Roll Number:</span>
                      <span className="text-slate-800 font-mono font-medium">{scanResult.rollNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-mono">Confidence:</span>
                      <Badge className="bg-green-600/90 text-white font-mono">{scanResult.confidence}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-mono">Verification Time:</span>
                      <span className="text-slate-800 font-mono font-medium">{scanResult.verificationTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-mono">Timestamp:</span>
                      <span className="text-slate-800 font-mono font-medium text-xs">{scanResult.timestamp}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Zap className="h-8 w-8 text-blue-600" />
                <h3 className="text-slate-800 font-mono">Ultra-Fast Recognition</h3>
              </div>
              <p className="text-slate-600 font-mono text-sm">
                Advanced algorithms provide instant facial recognition in under 3 seconds
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <h3 className="text-slate-800 font-mono">Bank-Grade Security</h3>
              </div>
              <p className="text-slate-600 font-mono text-sm">
                Military-grade encryption ensures your biometric data remains completely secure
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="h-8 w-8 text-blue-600" />
                <h3 className="text-slate-800 font-mono">24/7 Availability</h3>
              </div>
              <p className="text-slate-600 font-mono text-sm">
                Works in any lighting condition with 99.7% accuracy rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Navigation */}
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold text-slate-800 font-mono mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button 
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-100/50 backdrop-blur-sm font-mono justify-start"
                onClick={() => navigate("/qr-scanner")}
              >
                <Scan className="h-4 w-4 mr-2" />
                QR Scanner
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
                <Shield className="h-4 w-4 mr-2" />
                Professor Dashboard
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

export default FacialRecognition;