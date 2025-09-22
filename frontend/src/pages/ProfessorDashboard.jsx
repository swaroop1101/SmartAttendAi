import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Users, 
  UserCheck, 
  UserX, 
  AlertTriangle, 
  TrendingUp, 
  BarChart3, 
  Download,
  Scan,
  LogOut,
  Calendar,
  Clock
} from "lucide-react";
import { mockStudents, mockAttendanceStats, mockWeeklyData, mockProfessorInfo } from "../data/mockData";

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    navigate("/");
  };

  const getRiskBadgeColor = (riskLevel) => {
    switch (riskLevel) {
      case "high": return "bg-red-600/80 text-white hover:bg-red-500";
      case "medium": return "bg-yellow-600/80 text-white hover:bg-yellow-500";
      case "low": return "bg-green-600/80 text-white hover:bg-green-500";
      default: return "bg-slate-600/80 text-white hover:bg-slate-500";
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
              <span className="text-slate-300 font-mono">{mockProfessorInfo.name}</span>
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white font-mono mb-2">Professor Dashboard</h1>
            <p className="text-slate-300 font-mono">Welcome back, {mockProfessorInfo.name}</p>
          </div>
          <Button 
            className="bg-emerald-600/80 hover:bg-emerald-500 text-white backdrop-blur-sm border-emerald-500/30 font-mono"
            onClick={() => navigate("/qr-scanner")}
          >
            <Scan className="h-4 w-4 mr-2" />
            Start Attendance
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 font-mono">Total Students</CardTitle>
              <Users className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-mono">{mockAttendanceStats.totalStudents}</div>
              <p className="text-xs text-slate-400 font-mono">Enrolled in your classes</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 font-mono">Present Today</CardTitle>
              <UserCheck className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-mono">{mockAttendanceStats.presentToday}</div>
              <p className="text-xs text-slate-400 font-mono">
                {((mockAttendanceStats.presentToday / mockAttendanceStats.totalStudents) * 100).toFixed(1)}% attendance rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 font-mono">Absent Today</CardTitle>
              <UserX className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-mono">{mockAttendanceStats.absentToday}</div>
              <p className="text-xs text-slate-400 font-mono">Students not present</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 font-mono">At-Risk Students</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-mono">{mockAttendanceStats.atRiskStudents}</div>
              <p className="text-xs text-slate-400 font-mono">Below 75% attendance</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <TabsTrigger value="overview" className="font-mono data-[state=active]:bg-emerald-600/80">
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="font-mono data-[state=active]:bg-emerald-600/80">
              Students
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
                  Manage attendance and access tools
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
                    Export Data
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800/50 backdrop-blur-sm font-mono justify-start"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Attendance Chart */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white font-mono">Weekly Attendance Trend</CardTitle>
                <CardDescription className="text-slate-300 font-mono">
                  Attendance percentage by day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {mockWeeklyData.map((day, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                      <div 
                        className="bg-emerald-600/80 backdrop-blur-sm rounded-t transition-all duration-300 hover:bg-emerald-500 w-full"
                        style={{ height: `${(day.attendance / 100) * 200}px` }}
                      />
                      <span className="text-slate-300 font-mono text-sm">{day.day}</span>
                      <span className="text-emerald-400 font-mono text-xs">{day.attendance}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white font-mono">Student Attendance</CardTitle>
                  <CardDescription className="text-slate-300 font-mono">
                    Real-time attendance status
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
                        <th className="text-left py-3 px-4 text-slate-300 font-mono">Name</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-mono">Roll Number</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-mono">Status</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-mono">Attendance %</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-mono">Risk Level</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-mono">Last Seen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStudents.map((student) => (
                        <tr key={student.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                          <td className="py-3 px-4 text-white font-mono">{student.name}</td>
                          <td className="py-3 px-4 text-slate-300 font-mono">{student.rollNumber}</td>
                          <td className="py-3 px-4">
                            <Badge className={`${getStatusBadgeColor(student.status)} font-mono`}>
                              {student.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-slate-300 font-mono">{student.attendancePercentage}%</td>
                          <td className="py-3 px-4">
                            <Badge className={`${getRiskBadgeColor(student.riskLevel)} font-mono`}>
                              {student.riskLevel.charAt(0).toUpperCase() + student.riskLevel.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-slate-400 font-mono text-xs">
                            {new Date(student.lastSeen).toLocaleString()}
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
                  <CardTitle className="text-white font-mono">Attendance Distribution</CardTitle>
                  <CardDescription className="text-slate-300 font-mono">
                    Student performance categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-slate-300 font-mono">Regular (>80%)</span>
                      </div>
                      <span className="text-white font-mono">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-slate-300 font-mono">At Risk (60-80%)</span>
                      </div>
                      <span className="text-white font-mono">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-slate-300 font-mono">Critical (<60%)</span>
                      </div>
                      <span className="text-white font-mono">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white font-mono">Recent Trends</CardTitle>
                  <CardDescription className="text-slate-300 font-mono">
                    Key insights and patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg backdrop-blur-sm">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white font-mono text-sm">Attendance Up 5%</p>
                        <p className="text-slate-400 font-mono text-xs">Compared to last week</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg backdrop-blur-sm">
                      <BarChart3 className="h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="text-white font-mono text-sm">Best Day: Friday</p>
                        <p className="text-slate-400 font-mono text-xs">95% average attendance</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg backdrop-blur-sm">
                      <Clock className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-white font-mono text-sm">Peak Time: 9:30 AM</p>
                        <p className="text-slate-400 font-mono text-xs">Most students arrive by</p>
                      </div>
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

export default ProfessorDashboard;