// Mock data for the Smart Attendance System

export const mockStudents = [
  {
    id: "STU001",
    name: "Alice Johnson",
    email: "alice.johnson@university.edu",
    rollNumber: "CS21001",
    status: "Present",
    attendancePercentage: 92,
    lastSeen: "2024-01-15 09:30:00",
    riskLevel: "low"
  },
  {
    id: "STU002", 
    name: "Bob Smith",
    email: "bob.smith@university.edu",
    rollNumber: "CS21002",
    status: "Absent",
    attendancePercentage: 76,
    lastSeen: "2024-01-14 14:20:00",
    riskLevel: "medium"
  },
  {
    id: "STU003",
    name: "Carol Davis",
    email: "carol.davis@university.edu", 
    rollNumber: "CS21003",
    status: "Present",
    attendancePercentage: 88,
    lastSeen: "2024-01-15 09:25:00",
    riskLevel: "low"
  },
  {
    id: "STU004",
    name: "David Wilson",
    email: "david.wilson@university.edu",
    rollNumber: "CS21004", 
    status: "Absent",
    attendancePercentage: 45,
    lastSeen: "2024-01-12 11:15:00",
    riskLevel: "high"
  },
  {
    id: "STU005",
    name: "Emma Brown",
    email: "emma.brown@university.edu",
    rollNumber: "CS21005",
    status: "Present", 
    attendancePercentage: 95,
    lastSeen: "2024-01-15 09:28:00",
    riskLevel: "low"
  },
  {
    id: "STU006",
    name: "Frank Miller",
    email: "frank.miller@university.edu",
    rollNumber: "CS21006",
    status: "Late",
    attendancePercentage: 67,
    lastSeen: "2024-01-15 10:15:00", 
    riskLevel: "medium"
  }
];

export const mockAttendanceStats = {
  totalStudents: 150,
  presentToday: 128,
  absentToday: 22,
  atRiskStudents: 15,
  averageAttendance: 84.5
};

export const mockWeeklyData = [
  { day: "Mon", attendance: 85 },
  { day: "Tue", attendance: 92 },
  { day: "Wed", attendance: 78 },
  { day: "Thu", attendance: 88 },
  { day: "Fri", attendance: 95 },
  { day: "Sat", attendance: 72 },
  { day: "Sun", attendance: 0 }
];

export const mockMonthlyData = [
  { month: "Jan", attendance: 82 },
  { month: "Feb", attendance: 87 },
  { month: "Mar", attendance: 79 },
  { month: "Apr", attendance: 91 },
  { month: "May", attendance: 85 },
  { month: "Jun", attendance: 88 }
];

export const mockPieChartData = [
  { name: "Regular (>80%)", value: 65, color: "#10b981" },
  { name: "At Risk (60-80%)", value: 25, color: "#f59e0b" },
  { name: "Critical (<60%)", value: 10, color: "#ef4444" }
];

export const mockStudentAttendanceHistory = [
  { date: "2024-01-15", status: "Present", time: "09:30:00", method: "QR Code" },
  { date: "2024-01-14", status: "Present", time: "09:25:00", method: "Face Recognition" },
  { date: "2024-01-13", status: "Absent", time: null, method: null },
  { date: "2024-01-12", status: "Present", time: "09:35:00", method: "QR Code" },
  { date: "2024-01-11", status: "Present", time: "09:20:00", method: "Face Recognition" },
  { date: "2024-01-10", status: "Late", time: "10:15:00", method: "QR Code" },
  { date: "2024-01-09", status: "Present", time: "09:28:00", method: "Face Recognition" },
  { date: "2024-01-08", status: "Present", time: "09:22:00", method: "QR Code" }
];

export const mockProfessorInfo = {
  name: "Prof. Sarah Anderson",
  email: "sarah.anderson@university.edu",
  department: "Computer Science",
  subjects: ["Data Structures", "Algorithms", "Database Management"]
};

export const mockStudentInfo = {
  name: "John Doe",
  email: "john.doe@university.edu",
  rollNumber: "CS21007",
  year: "3rd Year",
  department: "Computer Science",
  attendancePercentage: 87.5,
  totalClasses: 120,
  classesAttended: 105
};