// Central in-memory store — mutated by server actions, read by pages
// In production: replace with Drizzle + Supabase queries

export type Employee = {
  id: string; code: string; name: string; email: string; dept: string
  desig: string; grade: string; status: 'active'|'probation'|'notice'|'exited'
  type: string; doj: string; ctc: number; mgr: string; phone: string; gender: string
  pan?: string; bank?: string; ifsc?: string; aadhaar?: string
}

export type Attendance = {
  id: string; userId: string; name: string; date: string; clockIn: string
  clockOut: string; mode: string; status: string; worked: string
}

export type LeaveRequest = {
  id: string; name: string; userId: string; type: string; from: string; to: string
  days: number; reason: string; status: 'pending'|'approved'|'rejected'; applied: string
}

export type Ticket = {
  id: string; subject: string; category: string; priority: string; status: string
  by: string; byId: string; sla: string; raised: string; description: string
  comments: { id: string; by: string; text: string; time: string }[]
}

export type PayrollRun = {
  id: string; month: string; monthNum: number; year: number
  status: string; employees: number; gross: number; net: number; paidAt: string|null
}

export type Job = {
  id: string; title: string; dept: string; type: string; exp: string
  status: string; openings: number; applications: number; description: string
}

export type Asset = {
  id: string; name: string; tag: string; category: string; serial: string
  value: number; status: string; assignedTo: string|null; purchaseDate: string
}

export type Document = {
  id: string; name: string; empId: string; empName: string; category: string
  status: string; uploaded: string; expires: string|null; url: string
}

export type OnboardingEmp = {
  id: string; emp: string; code: string
  tasks: { id: string; title: string; type: string; done: boolean; dueDate: string }[]
}

export type PerfRecord = {
  emp: string; deptHead: string; selfDone: boolean; mgrDone: boolean
  rating: string; score: number|null
}

export type Reimbursement = {
  id: string; employee: string; empId: string; category: string;
  amount: number; status: string; requested: string; approvedBy: string | null; due: string; note: string
}

// ── Seed Data ──────────────────────────────────────────────────────────────────

export const employees: Employee[] = [
  { id:'e1', code:'EMP-0001', name:'Priya Verma', email:'priya@acme.com', dept:'Engineering', desig:'Senior Software Engineer', grade:'Grade A', status:'active', type:'Full Time', doj:'2023-01-15', ctc:1200000, mgr:'Admin User', phone:'+91 98100 12345', gender:'Female', pan:'ABCPV1234F', bank:'HDFC Bank - 1234567890', ifsc:'HDFC0001234', aadhaar:'XXXX-XXXX-1234' },
  { id:'e2', code:'EMP-0002', name:'Rohit Kumar', email:'rohit@acme.com', dept:'Engineering', desig:'Software Engineer', grade:'Grade B', status:'probation', type:'Full Time', doj:'2026-01-01', ctc:700000, mgr:'Priya Verma', phone:'+91 98100 23456', gender:'Male', pan:'ABCPK5678G', bank:'SBI - 9876543210', ifsc:'SBIN0001234' },
  { id:'e3', code:'EMP-0003', name:'Ananya Singh', email:'ananya@acme.com', dept:'HR & Admin', desig:'HR Manager', grade:'Grade A', status:'active', type:'Full Time', doj:'2022-06-01', ctc:950000, mgr:'Admin User', phone:'+91 98100 34567', gender:'Female' },
  { id:'e4', code:'EMP-0004', name:'Vikram Patel', email:'vikram@acme.com', dept:'Sales', desig:'Account Executive', grade:'Grade B', status:'active', type:'Full Time', doj:'2024-03-10', ctc:600000, mgr:'Admin User', phone:'+91 98100 45678', gender:'Male' },
  { id:'e5', code:'EMP-0005', name:'Meera Joshi', email:'meera@acme.com', dept:'Engineering', desig:'Frontend Engineer', grade:'Grade B', status:'active', type:'Full Time', doj:'2024-07-22', ctc:750000, mgr:'Priya Verma', phone:'+91 98100 56789', gender:'Female' },
  { id:'e6', code:'EMP-0006', name:'Arjun Shah', email:'arjun@acme.com', dept:'Sales', desig:'Sales Manager', grade:'Grade A', status:'notice', type:'Full Time', doj:'2021-09-15', ctc:1100000, mgr:'Admin User', phone:'+91 98100 67890', gender:'Male' },
  { id:'e7', code:'EMP-0007', name:'Kavya Reddy', email:'kavya@acme.com', dept:'Engineering', desig:'DevOps Engineer', grade:'Grade B', status:'active', type:'Full Time', doj:'2025-02-01', ctc:850000, mgr:'Priya Verma', phone:'+91 98100 78901', gender:'Female' },
  { id:'e8', code:'EMP-0008', name:'Nikhil Gupta', email:'nikhil@acme.com', dept:'HR & Admin', desig:'Recruiter', grade:'Grade C', status:'active', type:'Full Time', doj:'2025-08-15', ctc:420000, mgr:'Ananya Singh', phone:'+91 98100 89012', gender:'Male' },
]

export const attendance: Attendance[] = [
  { id:'a1', userId:'e1', name:'Priya Verma', date:'2026-06-07', clockIn:'09:02', clockOut:'18:35', mode:'office', status:'present', worked:'9h 33m' },
  { id:'a2', userId:'e2', name:'Rohit Kumar', date:'2026-06-07', clockIn:'09:15', clockOut:'', mode:'office', status:'present', worked:'In progress' },
  { id:'a3', userId:'e3', name:'Ananya Singh', date:'2026-06-07', clockIn:'09:00', clockOut:'18:00', mode:'wfh', status:'wfh', worked:'9h 0m' },
  { id:'a4', userId:'e4', name:'Vikram Patel', date:'2026-06-07', clockIn:'', clockOut:'', mode:'', status:'absent', worked:'—' },
  { id:'a5', userId:'e5', name:'Meera Joshi', date:'2026-06-07', clockIn:'09:05', clockOut:'17:55', mode:'office', status:'present', worked:'8h 50m' },
  { id:'a6', userId:'e6', name:'Arjun Shah', date:'2026-06-07', clockIn:'09:30', clockOut:'18:10', mode:'office', status:'present', worked:'8h 40m' },
  { id:'a7', userId:'e7', name:'Kavya Reddy', date:'2026-06-07', clockIn:'09:10', clockOut:'18:20', mode:'wfh', status:'wfh', worked:'9h 10m' },
  { id:'a8', userId:'e8', name:'Nikhil Gupta', date:'2026-06-07', clockIn:'', clockOut:'', mode:'', status:'absent', worked:'—' },
]

export const leaveRequests: LeaveRequest[] = [
  { id:'l1', userId:'e1', name:'Priya Verma', type:'Casual Leave', from:'2026-06-10', to:'2026-06-12', days:3, reason:'Personal work', status:'pending', applied:'2026-06-04' },
  { id:'l2', userId:'e5', name:'Meera Joshi', type:'Sick Leave', from:'2026-06-06', to:'2026-06-07', days:2, reason:'Not feeling well', status:'pending', applied:'2026-06-05' },
  { id:'l3', userId:'e2', name:'Rohit Kumar', type:'Casual Leave', from:'2026-06-15', to:'2026-06-15', days:1, reason:'Dentist appointment', status:'pending', applied:'2026-06-05' },
  { id:'l4', userId:'e4', name:'Vikram Patel', type:'Earned Leave', from:'2026-05-25', to:'2026-05-30', days:5, reason:'Vacation', status:'approved', applied:'2026-05-20' },
  { id:'l5', userId:'e3', name:'Ananya Singh', type:'Sick Leave', from:'2026-05-10', to:'2026-05-10', days:1, reason:'Fever', status:'approved', applied:'2026-05-09' },
]

export const tickets: Ticket[] = [
  { id:'t1', subject:'May salary slip shows wrong PF deduction', category:'Payroll', priority:'high', status:'open', by:'Rohit Kumar', byId:'e2', sla:'2026-06-10', raised:'2026-06-05', description:'The May 2026 salary slip deducted PF on special allowance which is incorrect. PF should only be on basic salary.', comments:[] },
  { id:'t2', subject:'Laptop screen cracked, need replacement', category:'Assets', priority:'urgent', status:'open', by:'Meera Joshi', byId:'e5', sla:'2026-06-08', raised:'2026-06-04', description:'My MacBook Pro screen cracked. Cannot work. Need immediate replacement.', comments:[{ id:'c1', by:'Ananya Singh', text:'Checked availability. One unit in stock. Will be delivered tomorrow.', time:'2026-06-05 10:30' }] },
  { id:'t3', subject:'PF UAN not linked to EPFO portal', category:'Compliance', priority:'medium', status:'in_progress', by:'Vikram Patel', byId:'e4', sla:'2026-06-12', raised:'2026-06-03', description:'My UAN number is not reflecting on the EPFO portal. Cannot withdraw old PF.', comments:[] },
  { id:'t4', subject:'April travel reimbursement not processed', category:'Payroll', priority:'low', status:'resolved', by:'Ananya Singh', byId:'e3', sla:'2026-06-14', raised:'2026-06-01', description:'Submitted April travel bills on May 1st but not reimbursed yet.', comments:[] },
]

export const payrollRuns: PayrollRun[] = [
  { id:'pr1', month:'May 2026', monthNum:5, year:2026, status:'paid', employees:8, gross:7520000, net:6480000, paidAt:'2026-06-01' },
  { id:'pr2', month:'Apr 2026', monthNum:4, year:2026, status:'paid', employees:8, gross:7520000, net:6480000, paidAt:'2026-05-01' },
  { id:'pr3', month:'Mar 2026', monthNum:3, year:2026, status:'paid', employees:7, gross:6970000, net:6010000, paidAt:'2026-04-01' },
  { id:'pr4', month:'Jun 2026', monthNum:6, year:2026, status:'draft', employees:8, gross:0, net:0, paidAt:null },
]

export const jobs: Job[] = [
  { id:'j1', title:'Senior Frontend Engineer', dept:'Engineering', type:'Full Time', exp:'4-6 years', status:'open', openings:2, applications:14, description:'Build next-gen UI for our SaaS products. React, TypeScript, Next.js required.' },
  { id:'j2', title:'Product Manager', dept:'Product', type:'Full Time', exp:'3-5 years', status:'open', openings:1, applications:7, description:'Lead product roadmap and strategy for APOTSA platform.' },
  { id:'j3', title:'Sales Executive', dept:'Sales', type:'Full Time', exp:'1-3 years', status:'paused', openings:3, applications:22, description:'Drive B2B sales for APOTSA across India.' },
  { id:'j4', title:'DevOps Engineer', dept:'Engineering', type:'Full Time', exp:'3-5 years', status:'closed', openings:1, applications:18, description:'Manage infrastructure, CI/CD pipelines, and Kubernetes clusters.' },
]

export const assets: Asset[] = [
  { id:'as1', name:'MacBook Pro 14"', tag:'AST-001', category:'Laptop', serial:'C02XG1X1', value:180000, status:'assigned', assignedTo:'e1', purchaseDate:'2023-01-01' },
  { id:'as2', name:'MacBook Pro 14"', tag:'AST-002', category:'Laptop', serial:'C02XG2X2', value:180000, status:'assigned', assignedTo:'e5', purchaseDate:'2024-07-01' },
  { id:'as3', name:'LG 27" Monitor', tag:'AST-003', category:'Monitor', serial:'LG27UK850', value:32000, status:'available', assignedTo:null, purchaseDate:'2023-03-01' },
  { id:'as4', name:'iPhone 15 Pro', tag:'AST-004', category:'Phone', serial:'DNPXY8XX', value:120000, status:'assigned', assignedTo:'e3', purchaseDate:'2023-12-01' },
  { id:'as5', name:'Dell Latitude 5520', tag:'AST-005', category:'Laptop', serial:'5CG123', value:95000, status:'maintenance', assignedTo:null, purchaseDate:'2022-06-01' },
]

export const documents: Document[] = [
  { id:'d1', name:'Aadhaar Card', empId:'e1', empName:'Priya Verma', category:'ID Proof', status:'verified', uploaded:'2023-01-15', expires:null, url:'#' },
  { id:'d2', name:'PAN Card', empId:'e1', empName:'Priya Verma', category:'ID Proof', status:'verified', uploaded:'2023-01-15', expires:null, url:'#' },
  { id:'d3', name:'Offer Letter', empId:'e2', empName:'Rohit Kumar', category:'Employment', status:'verified', uploaded:'2026-01-01', expires:null, url:'#' },
  { id:'d4', name:'Aadhaar Card', empId:'e2', empName:'Rohit Kumar', category:'ID Proof', status:'pending', uploaded:'2026-01-05', expires:null, url:'#' },
  { id:'d5', name:'Degree Certificate', empId:'e5', empName:'Meera Joshi', category:'Education', status:'verified', uploaded:'2024-07-22', expires:null, url:'#' },
]

export const onboarding: OnboardingEmp[] = [
  { id:'ob1', emp:'Rohit Kumar', code:'EMP-0002', tasks:[
    { id:'ot1', title:'Upload Aadhaar', type:'document', done:true, dueDate:'2026-01-05' },
    { id:'ot2', title:'Submit PAN & Bank Details', type:'payroll', done:true, dueDate:'2026-01-07' },
    { id:'ot3', title:'Set up company email', type:'it', done:true, dueDate:'2026-01-03' },
    { id:'ot4', title:'Complete IT security training', type:'it', done:false, dueDate:'2026-01-15' },
    { id:'ot5', title:'Sign Employment Contract', type:'policy', done:false, dueDate:'2026-01-08' },
    { id:'ot6', title:'Meet your buddy / mentor', type:'buddy', done:false, dueDate:'2026-01-10' },
  ]},
  { id:'ob2', emp:'Nikhil Gupta', code:'EMP-0008', tasks:[
    { id:'ot7', title:'Upload Aadhaar', type:'document', done:true, dueDate:'2025-08-17' },
    { id:'ot8', title:'Submit PAN & Bank Details', type:'payroll', done:false, dueDate:'2025-08-19' },
    { id:'ot9', title:'Set up company email', type:'it', done:true, dueDate:'2025-08-16' },
    { id:'ot10', title:'Sign Employment Contract', type:'policy', done:false, dueDate:'2025-08-18' },
  ]},
]

export const performance: PerfRecord[] = [
  { emp:'Priya Verma', deptHead:'Engineering', selfDone:true, mgrDone:true, rating:'Exceeds', score:4.7 },
  { emp:'Rohit Kumar', deptHead:'Engineering', selfDone:true, mgrDone:false, rating:'Meets', score:3.5 },
  { emp:'Ananya Singh', deptHead:'HR & Admin', selfDone:true, mgrDone:true, rating:'Exceeds', score:4.4 },
  { emp:'Vikram Patel', deptHead:'Sales', selfDone:false, mgrDone:false, rating:'Not Rated', score:null },
  { emp:'Meera Joshi', deptHead:'Engineering', selfDone:true, mgrDone:true, rating:'Meets', score:3.8 },
  { emp:'Arjun Shah', deptHead:'Sales', selfDone:true, mgrDone:false, rating:'Needs Improvement', score:2.8 },
]

export const leaveBalances = [
  { type:'Casual Leave', code:'CL', color:'#3b82f6', used:4, total:12 },
  { type:'Sick Leave', code:'SL', color:'#ef4444', used:2, total:12 },
  { type:'Earned Leave', code:'EL', color:'#22c55e', used:8, total:24 },
  { type:'Comp Off', code:'CO', color:'#8b5cf6', used:1, total:8 },
]

export const reimbursements: Reimbursement[] = [
  { id:'r1', empId:'e4', employee:'Vikram Patel', category:'Travel', amount:8420, status:'pending', requested:'2026-06-04', approvedBy:null, due:'2026-06-12', note:'Client meeting taxi reimbursement' },
  { id:'r2', empId:'e5', employee:'Meera Joshi', category:'Training', amount:15600, status:'approved', requested:'2026-06-01', approvedBy:'Ananya Singh', due:'2026-06-08', note:'Online workshop fee' },
  { id:'r3', empId:'e2', employee:'Rohit Kumar', category:'Allowance', amount:4200, status:'processing', requested:'2026-06-03', approvedBy:'Priya Verma', due:'2026-06-10', note:'Internet reimbursement for remote work' },
  { id:'r4', empId:'e1', employee:'Priya Verma', category:'Equipment', amount:12850, status:'approved', requested:'2026-05-28', approvedBy:'Admin User', due:'2026-06-05', note:'Office accessories purchase' },
]

export const moduleConfig = {
  people: true, attendance: true, leave: true, payroll: true,
  approvals: true, onboarding: true, performance: false, ats: false,
}

// Sessions — demo users
export const users = [
  { id:'u1', name:'Admin User', email:'admin@acme.com', password:'admin123', role:'admin', companyId:'c1' },
  { id:'u2', name:'Priya Verma', email:'priya@acme.com', password:'pass123', role:'hr_admin', companyId:'c1' },
  { id:'u3', name:'Rohit Kumar', email:'rohit@acme.com', password:'pass123', role:'employee', companyId:'c1' },
]

export type Session = { userId: string; name: string; email: string; role: string }
