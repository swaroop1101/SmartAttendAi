import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Scan, Eye, EyeOff } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (role) => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: `Welcome back, ${role}!`
    });

    // Navigate based on role
    if (role === "professor") {
      navigate("/professor-dashboard");
    } else {
      navigate("/student-portal");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/30 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <Scan className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold text-white font-mono">SmartAttend AI</span>
            </div>
            <Button 
              variant="ghost" 
              className="text-slate-300 hover:text-white hover:bg-slate-800/50 backdrop-blur-sm font-mono"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-md">
        <Card className="bg-slate-800/50 backdrop-blur-md border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white font-mono">Welcome Back</CardTitle>
            <CardDescription className="text-slate-300 font-mono">
              Sign in to your SmartAttend AI account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-700/50 backdrop-blur-sm">
                <TabsTrigger value="student" className="font-mono data-[state=active]:bg-emerald-600/80">Student</TabsTrigger>
                <TabsTrigger value="professor" className="font-mono data-[state=active]:bg-emerald-600/80">Professor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="student" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300 font-mono">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="student@university.edu"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 backdrop-blur-sm font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300 font-mono">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 backdrop-blur-sm font-mono pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button 
                  className="w-full bg-emerald-600/80 hover:bg-emerald-500 text-white backdrop-blur-sm border-emerald-500/30 font-mono"
                  onClick={() => handleLogin("student")}
                >
                  Sign In as Student
                </Button>
              </TabsContent>
              
              <TabsContent value="professor" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="prof-email" className="text-slate-300 font-mono">Email</Label>
                  <Input
                    id="prof-email"
                    name="email"
                    type="email"
                    placeholder="professor@university.edu"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 backdrop-blur-sm font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prof-password" className="text-slate-300 font-mono">Password</Label>
                  <div className="relative">
                    <Input
                      id="prof-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 backdrop-blur-sm font-mono pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button 
                  className="w-full bg-emerald-600/80 hover:bg-emerald-500 text-white backdrop-blur-sm border-emerald-500/30 font-mono"
                  onClick={() => handleLogin("professor")}
                >
                  Sign In as Professor
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button variant="link" className="text-emerald-400 hover:text-emerald-300 font-mono">
              Forgot Password?
            </Button>
            <p className="text-slate-400 text-sm font-mono">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="text-emerald-400 hover:text-emerald-300 p-0 h-auto font-mono"
                onClick={() => navigate("/signup")}
              >
                Sign up here
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;