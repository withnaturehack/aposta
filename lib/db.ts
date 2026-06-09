// This file provides the data layer.
// In production this connects to Supabase Postgres via Drizzle.
// For instant working demo it uses in-memory data with realistic content.

export type Employee = {
  id: string
  code: string
  name: string
  email: string
  dept: string
  desig: string
  grade: string
  status: 'active' | 'probation' | 'notice' | 'exited'
  type: string
  doj: string
  ctc: number
  mgr: string
  phone: string
  gender: string
}

export type AttendanceRecord = {
  id: string
  userId: string
  name: string
  date: string
  clockIn: string
  clockOut: string
  mode: string
  status: string
  worked: string
}

export type LeaveRequest = {
  id: string
  name: string
  type: string
  from: string
  to: string
  days: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  applied: string
}

// Singleton in-memory store
const store = {
  employees: [
    { id:'e1', code:'EMP-0001', name:'Priya Verma', email:'priya@acme.com', dept:'Engineering', desig:'Sr. Software Engineer', grade:'Grade A', status:'active' as const, type:'full_time', doj:'2023-01-15', ctc:1200000, mgr:'Kartik Chilkoti', phone:'+91 98100 12345', gender:'Female' },
    { id:'e2', code:'EMP-0002', name:'Rohit Kumar', email:'rohit@acme.com', dept:'Engineering', desig:'Software Engineer', grade:'Grade B', status:'probation' as const, type:'full_time', doj:'2026-01-01', ctc:700000, mgr:'Priya Verma', phone:'+91 98100 23456', gender:'Male' },
    { id:'e3', code:'EMP-0003', name:'Ananya Singh', email:'ananya@acme.com', dept:'HR & Admin', desig:'HR Manager', grade:'Grade A', status:'active' as const, type:'full_time', doj:'2022-06-01', ctc:950000, mgr:'Kartik Chilkoti', phone:'+91 98100 34567', gender:'Female' },
    { id:'e4', code:'EMP-0004', name:'Vikram Patel', email:'vikram@acme.com', dept:'Sales', desig:'Account Executive', grade:'Grade B', status:'active' as const, type:'full_time', doj:'2024-03-10', ctc:600000, mgr:'Kartik Chilkoti', phone:'+91 98100 45678', gender:'Male' },
    { id:'e5', code:'EMP-0005', name:'Meera Joshi', email:'meera@acme.com', dept:'Engineering', desig:'Frontend Engineer', grade:'Grade B', status:'active' as const, type:'full_time', doj:'2024-07-22', ctc:750000, mgr:'Priya Verma', phone:'+91 98100 56789', gender:'Female' },
    { id:'e6', code:'EMP-0006', name:'Arjun Shah', email:'arjun@acme.com', dept:'Sales', desig:'Sales Manager', grade:'Grade A', status:'notice' as const, type:'full_time', doj:'2021-09-15', ctc:1100000, mgr:'Kartik Chilkoti', phone:'+91 98100 67890', gender:'Male' },
    { id:'e7', code:'EMP-0007', name:'Kavya Reddy', email:'kavya@acme.com', dept:'Engineering', desig:'DevOps Engineer', grade:'Grade B', status:'active' as const, type:'full_time', doj:'2025-02-01', ctc:850000, mgr:'Priya Verma', phone:'+91 98100 78901', gender:'Female' },
    { id:'e8', code:'EMP-0008', name:'Nikhil Gupta', email:'nikhil@acme.com', dept:'HR & Admin', desig:'Recruiter', grade:'Grade C', status:'active' as const, type:'full_time', doj:'2025-08-15', ctc:420000, mgr:'Ananya Singh', phone:'+91 98100 89012', gender:'Male' },
  ] as Employee[],

  attendance: [
    { id:'a1', userId:'e1', name:'Priya Verma', date:'2026-06-05', clockIn:'09:02', clockOut:'18:35', mode:'office', status:'present', worked:'9h 33m' },
    { id:'a2', userId:'e2', name:'Rohit Kumar', date:'2026-06-05', clockIn:'09:15', clockOut:'', mode:'office', status:'present', worked:'In progress' },
    { id:'a3', userId:'e3', name:'Ananya Singh', date:'2026-06-05', clockIn:'09:00', clockOut:'18:00', mode:'wfh', status:'wfh', worked:'9h 0m' },
    { id:'a4', userId:'e4', name:'Vikram Patel', date:'2026-06-05', clockIn:'', clockOut:'', mode:'', status:'absent', worked:'—' },
    { id:'a5', userId:'e5', name:'Meera Joshi', date:'2026-06-05', clockIn:'09:05', clockOut:'17:55', mode:'office', status:'present', worked:'8h 50m' },
    { id:'a6', userId:'e6', name:'Arjun Shah', date:'2026-06-05', clockIn:'09:30', clockOut:'18:10', mode:'office', status:'present', worked:'8h 40m' },
    { id:'a7', userId:'e7', name:'Kavya Reddy', date:'2026-06-05', clockIn:'09:10', clockOut:'18:20', mode:'wfh', status:'wfh', worked:'9h 10m' },
    { id:'a8', userId:'e8', name:'Nikhil Gupta', date:'2026-06-05', clockIn:'', clockOut:'', mode:'', status:'absent', worked:'—' },
  ] as AttendanceRecord[],

  leaveRequests: [
    { id:'l1', name:'Priya Verma', type:'Casual Leave', from:'2026-06-10', to:'2026-06-12', days:3, reason:'Personal work', status:'pending' as const, applied:'2026-06-04' },
    { id:'l2', name:'Meera Joshi', type:'Sick Leave', from:'2026-06-06', to:'2026-06-07', days:2, reason:'Not feeling well', status:'pending' as const, applied:'2026-06-05' },
    { id:'l3', name:'Rohit Kumar', type:'Casual Leave', from:'2026-06-15', to:'2026-06-15', days:1, reason:'Dentist appointment', status:'pending' as const, applied:'2026-06-05' },
    { id:'l4', name:'Vikram Patel', type:'Earned Leave', from:'2026-05-25', to:'2026-05-30', days:5, reason:'Vacation', status:'approved' as const, applied:'2026-05-20' },
    { id:'l5', name:'Ananya Singh', type:'Sick Leave', from:'2026-05-10', to:'2026-05-10', days:1, reason:'Fever', status:'approved' as const, applied:'2026-05-09' },
  ] as LeaveRequest[],

  tickets: [
    { id:'t1', subject:'Salary slip for May has wrong PF deduction', category:'Payroll', priority:'high', status:'open', by:'Rohit Kumar', sla:'2026-06-08', raised:'2026-06-05' },
    { id:'t2', subject:'Need laptop replacement — screen broken', category:'Assets', priority:'urgent', status:'open', by:'Meera Joshi', sla:'2026-06-07', raised:'2026-06-04' },
    { id:'t3', subject:'PF UAN not linked to EPFO portal', category:'Compliance', priority:'medium', status:'in_progress', by:'Vikram Patel', sla:'2026-06-10', raised:'2026-06-03' },
    { id:'t4', subject:'Reimbursement for April travel not processed', category:'Payroll', priority:'low', status:'resolved', by:'Ananya Singh', sla:'2026-06-12', raised:'2026-06-01' },
  ],

  payrollRuns: [
    { id:'pr1', month:'May 2026', monthNum:5, year:2026, status:'paid', employees:8, gross:7520000, net:6480000, paidAt:'2026-06-01' },
    { id:'pr2', month:'Apr 2026', monthNum:4, year:2026, status:'paid', employees:8, gross:7520000, net:6480000, paidAt:'2026-05-01' },
    { id:'pr3', month:'Mar 2026', monthNum:3, year:2026, status:'paid', employees:7, gross:6970000, net:6010000, paidAt:'2026-04-01' },
    { id:'pr4', month:'Jun 2026', monthNum:6, year:2026, status:'draft', employees:8, gross:0, net:0, paidAt:null },
  ],

  approvals: [
    { id:'ap1', type:'Leave Request', entity:'Priya Verma — Casual Leave (Jun 10–12)', stage:'1/2', raised:'2026-06-04' },
    { id:'ap2', type:'Leave Request', entity:'Meera Joshi — Sick Leave (Jun 6–7)', stage:'1/2', raised:'2026-06-05' },
    { id:'ap3', type:'Leave Request', entity:'Rohit Kumar — Casual Leave (Jun 15)', stage:'1/2', raised:'2026-06-05' },
    { id:'ap4', type:'Attendance Regularization', entity:'Vikram Patel — May 28, 2026', stage:'1/1', raised:'2026-06-02' },
    { id:'ap5', type:'Employee Movement', entity:'Kavya Reddy — Promotion to Senior', stage:'2/3', raised:'2026-06-01' },
  ],

  assets: [
    { id:'as1', name:'MacBook Pro 14"', tag:'AST-001', category:'Laptop', serial:'C02XG1X', value:180000, status:'assigned', assignedTo:'Priya Verma' },
    { id:'as2', name:'MacBook Pro 14"', tag:'AST-002', category:'Laptop', serial:'C02XG2X', value:180000, status:'assigned', assignedTo:'Meera Joshi' },
    { id:'as3', name:'LG 27" Monitor', tag:'AST-003', category:'Monitor', serial:'LG27UK', value:32000, status:'available', assignedTo:null },
    { id:'as4', name:'iPhone 15 Pro', tag:'AST-004', category:'Phone', serial:'DNPXY8X', value:120000, status:'assigned', assignedTo:'Ananya Singh' },
    { id:'as5', name:'Dell Latitude 5520', tag:'AST-005', category:'Laptop', serial:'5CG123', value:95000, status:'maintenance', assignedTo:null },
    { id:'as6', name:'Logitech MX Keys', tag:'AST-006', category:'Peripheral', serial:'LMX001', value:8500, status:'assigned', assignedTo:'Vikram Patel' },
  ],

  documents: [
    { id:'d1', name:'Aadhaar Card', empName:'Priya Verma', category:'ID Proof', status:'verified', uploaded:'2023-01-15', expires:null },
    { id:'d2', name:'PAN Card', empName:'Priya Verma', category:'ID Proof', status:'verified', uploaded:'2023-01-15', expires:null },
    { id:'d3', name:'Offer Letter', empName:'Rohit Kumar', category:'Employment', status:'verified', uploaded:'2026-01-01', expires:null },
    { id:'d4', name:'Aadhaar Card', empName:'Rohit Kumar', category:'ID Proof', status:'pending', uploaded:'2026-01-05', expires:null },
    { id:'d5', name:'Degree Certificate', empName:'Meera Joshi', category:'Education', status:'verified', uploaded:'2024-07-22', expires:null },
    { id:'d6', name:'Visa Document', empName:'Vikram Patel', category:'Other', status:'pending', uploaded:'2024-03-10', expires:'2027-03-10' },
  ],

  jobs: [
    { id:'j1', title:'Senior Frontend Engineer', dept:'Engineering', type:'Full Time', exp:'4–6 years', status:'open', openings:2, applications:14 },
    { id:'j2', title:'Product Manager', dept:'Product', type:'Full Time', exp:'3–5 years', status:'open', openings:1, applications:7 },
    { id:'j3', title:'Sales Executive', dept:'Sales', type:'Full Time', exp:'1–3 years', status:'paused', openings:3, applications:22 },
    { id:'j4', title:'DevOps Engineer', dept:'Engineering', type:'Full Time', exp:'3–5 years', status:'closed', openings:1, applications:18 },
  ],

  onboarding: [
    { emp:'Rohit Kumar', code:'EMP-0002', tasks:[
      { title:'Upload ID Proof', type:'document', done:true },
      { title:'Upload Address Proof', type:'document', done:true },
      { title:'Submit PAN & Bank Details', type:'payroll', done:true },
      { title:'Set up company email', type:'it', done:true },
      { title:'Complete IT security training', type:'it', done:false },
      { title:'Sign Employment Contract', type:'policy', done:false },
      { title:'Acknowledge HR Handbook', type:'policy', done:false },
      { title:'Meet your buddy', type:'buddy', done:false },
    ]},
    { emp:'Nikhil Gupta', code:'EMP-0008', tasks:[
      { title:'Upload ID Proof', type:'document', done:true },
      { title:'Submit PAN & Bank Details', type:'payroll', done:false },
      { title:'Set up company email', type:'it', done:true },
      { title:'Sign Employment Contract', type:'policy', done:false },
      { title:'Acknowledge HR Handbook', type:'policy', done:false },
    ]},
  ],

  leaveBalances: [
    { type:'Casual Leave', code:'CL', color:'#3b82f6', used:4, total:12 },
    { type:'Sick Leave', code:'SL', color:'#ef4444', used:2, total:12 },
    { type:'Earned Leave', code:'EL', color:'#22c55e', used:8, total:24 },
    { type:'Comp Off', code:'CO', color:'#a855f7', used:1, total:8 },
  ],

  performance: [
    { emp:'Priya Verma', selfDone:true, mgrDone:true, rating:'Exceeds', score:4.7 },
    { emp:'Rohit Kumar', selfDone:true, mgrDone:false, rating:'Meets', score:3.5 },
    { emp:'Ananya Singh', selfDone:true, mgrDone:true, rating:'Exceeds', score:4.4 },
    { emp:'Vikram Patel', selfDone:false, mgrDone:false, rating:'Not Rated', score:null },
    { emp:'Meera Joshi', selfDone:true, mgrDone:true, rating:'Meets', score:3.8 },
    { emp:'Arjun Shah', selfDone:true, mgrDone:false, rating:'Needs Improvement', score:2.8 },
    { emp:'Kavya Reddy', selfDone:true, mgrDone:true, rating:'Meets', score:4.0 },
    { emp:'Nikhil Gupta', selfDone:false, mgrDone:false, rating:'Not Rated', score:null },
  ],
}

export default store
export { store }
