import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { 
  User, 
  Calendar, 
  TrendingUp, 
  Download,
  Scan,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { mockStudentAttendanceHistory, mockStudentInfo } from "../data/mockData";

const StudentPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    navigate("/");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present": return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "Absent": return <XCircle className="h-4 w-4 text-red-400" />;
      case "Late": return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      default: return <Clock className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Present": return "bg-green-600/80 text-white";
      case "Absent": return "bg-red-600/80 text-white";
      case "Late": return "bg-yellow-600/80 text-white";
      default: return "bg-slate-600/80 text-white";
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const recentTrend = mockStudentAttendanceHistory.slice(0, 7);
  const presentDays = recentTrend.filter(day => day.status === "Present").length;
  const weeklyPercentage = (presentDays / recentTrend.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 backdrop-blur-md bg-slate-900/30 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Scan className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold text-white font-mono">SmartAttend AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-300 font-mono">{mockStudentInfo.name}</span>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-800/50 backdrop-blur-sm font-mono"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-white font-mono mb-2">Student Portal</h1>
            <p className="text-slate-300 font-mono">Track your attendance and performance</p>
          </div>
          <Button 
            className="bg-emerald-600/80 hover:bg-emerald-500 text-white backdrop-blur-sm border-emerald-500/30 font-mono"
            onClick={() => navigate("/qr-scanner")}
          >
            <Scan className="h-4 w-4 mr-2" />
            Mark Attendance
          </Button>
        </div>

        {/* Profile Section */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-20 w-20 border-2 border-emerald-400/50">
                <AvatarImage src="" />
                <AvatarFallback className="bg-emerald-600/80 text-white text-xl font-mono">
                  {mockStudentInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold text-white font-mono">{mockStudentInfo.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400 font-mono">Roll Number</p>
                    <p className="text-white font-mono">{mockStudentInfo.rollNumber}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-mono">Year</p>
                    <p className="text-white font-mono">{mockStudentInfo.year}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-mono">Department</p>
                    <p className="text-white font-mono">{mockStudentInfo.department}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-mono">Email</p>
                    <p className="text-white font-mono text-xs">{mockStudentInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 font-mono">Overall Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold font-mono ${getAttendanceColor(mockStudentInfo.attendancePercentage)}`}>
                {mockStudentInfo.attendancePercentage}%
              </div>
              <Progress 
                value={mockStudentInfo.attendancePercentage} 
                className="mt-2 h-2"
              />
              <p className="text-xs text-slate-400 font-mono mt-1">
                {mockStudentInfo.classesAttended} of {mockStudentInfo.totalClasses} classes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 font-mono">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold font-mono ${getAttendanceColor(weeklyPercentage)}`}>
                {weeklyPercentage.toFixed(0)}%
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {presentDays} of {recentTrend.length} days present
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 font-mono">Classes Attended</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-mono">{mockStudentInfo.classesAttended}</div>
              <p className="text-xs text-slate-400 font-mono">Out of {mockStudentInfo.totalClasses} total</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 font-mono">Classes Missed</CardTitle>
              <XCircle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-mono">
                {mockStudentInfo.totalClasses - mockStudentInfo.classesAttended}
              </div>
              <p className="text-xs text-slate-400 font-mono">Absent from classes</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <TabsTrigger value="overview" className="font-mono data-[state=active]:bg-emerald-600/80">
              Overview
            </TabsTrigger>
            <TabsTrigger value="history" className="font-mono data-[state=active]:bg-emerald-600/80">
              Attendance History
            </TabsTrigger>
            <TabsTrigger value="analytics" className="font-mono data-[state=active]:bg-emerald-600/80">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white font-mono">Quick Actions</CardTitle>
                <CardDescription className="text-slate-300 font-mono">
                  Mark attendance and access reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="bg-emerald-600/80 hover:bg-emerald-500 text-white backdrop-blur-sm font-mono justify-start"
                    onClick={() => navigate("/qr-scanner")}
                  >
                    <Scan className="h-4 w-4 mr-2" />
                    QR Scanner
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800/50 backdrop-blur-sm font-mono justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800/50 backdrop-blur-sm font-mono justify-start"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    View Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Trend */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white font-mono">Recent Attendance</CardTitle>
                <CardDescription className="text-slate-300 font-mono">
                  Your attendance for the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTrend.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(day.status)}
                        <div>
                          <p className="text-white font-mono text-sm">
                            {new Date(day.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                          {day.time && (
                            <p className="text-slate-400 font-mono text-xs">
                              Marked at {day.time} via {day.method}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge className={`${getStatusBadgeColor(day.status)} font-mono`}>
                        {day.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white font-mono">Attendance History</CardTitle>
                  <CardDescription className="text-slate-300 font-mono">
                    Complete record of your attendance
                  </CardDescription>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800/50 backdrop-blur-sm font-mono"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-300 font-mono">Date</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-mono">Status</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-mono">Time</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-mono">Method</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStudentAttendanceHistory.map((record, index) => (
                        <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                          <td className="py-3 px-4 text-white font-mono">
                            {new Date(record.date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(record.status)}
                              <Badge className={`${getStatusBadgeColor(record.status)} font-mono`}>
                                {record.status}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-300 font-mono">
                            {record.time || "N/A"}
                          </td>
                          <td className="py-3 px-4 text-slate-400 font-mono">
                            {record.method || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white font-mono">Performance Insights</CardTitle>
                  <CardDescription className="text-slate-300 font-mono">
                    Key metrics and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg backdrop-blur-sm">
                      <div>
                        <p className="text-white font-mono text-sm">Best Month</p>
                        <p className="text-slate-400 font-mono text-xs">Highest attendance rate</p>
                      </div>
                      <span className="text-emerald-400 font-mono">January (95%)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg backdrop-blur-sm">
                      <div>
                        <p className="text-white font-mono text-sm">Preferred Method</p>
                        <p className="text-slate-400 font-mono text-xs">Most used check-in</p>
                      </div>
                      <span className="text-emerald-400 font-mono">QR Code (60%)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg backdrop-blur-sm">
                      <div>
                        <p className="text-white font-mono text-sm">Average Time</p>
                        <p className="text-slate-400 font-mono text-xs">Usual check-in time</p>
                      </div>
                      <span className="text-emerald-400 font-mono">9:28 AM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white font-mono">Recommendations</CardTitle>
                  <CardDescription className="text-slate-300 font-mono">
                    Tips to improve attendance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-emerald-600/20 border border-emerald-600/30 rounded-lg backdrop-blur-sm">
                      <p className="text-emerald-400 font-mono text-sm font-semibold">Great Job!</p>
                      <p className="text-slate-300 font-mono text-xs">Your attendance is above 85%. Keep it up!</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg backdrop-blur-sm">
                      <p className="text-white font-mono text-sm">Set Reminders</p>
                      <p className="text-slate-400 font-mono text-xs">Enable notifications for class timings</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg backdrop-blur-sm">
                      <p className="text-white font-mono text-sm">Early Arrival</p>
                      <p className="text-slate-400 font-mono text-xs">Arrive 5-10 minutes before class starts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentPortal;