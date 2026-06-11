import { useState } from 'react';
import Link from 'next/link';
import {
  Pencil, CalendarDays, MoreHorizontal, Camera,
  CheckCircle2, Shield, FileText, TrendingUp,
  Phone, MessageSquare, AlertCircle, Dog, Cat, Rabbit, PawPrint,
  X, Search, ArrowLeft, Plus, Syringe, Pill, ScanLine,
  Paperclip, AlertTriangle, Download, ChevronRight, Clock,
  FlaskConical, Activity,
} from 'lucide-react';

// ─── Search roster ────────────────────────────────────────────────────────────

const MOCK_PATIENTS = [
  { id: 'PET-000321', name: 'Lucky',  species: 'Dog',    breed: 'Golden Retriever', owner: 'คุณณัฐิดา วงศ์สวัสดิ์', gender: 'M', status: 'Active',   lastVisit: '10 พ.ย. 2567' },
  { id: 'PET-000322', name: 'Mochi',  species: 'Cat',    breed: 'Scottish Fold',    owner: 'คุณณัฐิดา วงศ์สวัสดิ์', gender: 'F', status: 'Active',   lastVisit: '15 พ.ค. 2567' },
  { id: 'PET-000323', name: 'Choco',  species: 'Dog',    breed: 'French Bulldog',   owner: 'คุณณัฐิดา วงศ์สวัสดิ์', gender: 'M', status: 'Active',   lastVisit: '10 พ.ค. 2567' },
  { id: 'PET-000314', name: 'Tiger',  species: 'Dog',    breed: 'Thai Dog',         owner: 'คุณวิชัย สมพร',          gender: 'M', status: 'Active',   lastVisit: '18 พ.ค. 2567' },
  { id: 'PET-000305', name: 'Sakura', species: 'Cat',    breed: 'Siamese',          owner: 'คุณปัณณดา ศรีสุข',       gender: 'F', status: 'Active',   lastVisit: '12 พ.ค. 2567' },
  { id: 'PET-000298', name: 'Peanut', species: 'Rabbit', breed: 'Holland Lop',      owner: 'คุณปัณณดา ศรีสุข',       gender: 'M', status: 'Active',   lastVisit: '8 พ.ค. 2567'  },
  { id: 'PET-000287', name: 'Butter', species: 'Cat',    breed: 'Persian',          owner: 'คุณสมชาย ใจดี',          gender: 'F', status: 'Active',   lastVisit: '25 เม.ย. 2567' },
  { id: 'PET-000276', name: 'Max',    species: 'Dog',    breed: 'French Bulldog',   owner: 'คุณสมชาย ใจดี',          gender: 'M', status: 'Inactive', lastVisit: '20 เม.ย. 2567' },
];

// ─── Detail data (mock — real app fetched by patient ID) ──────────────────────

const patient = {
  name: 'Lucky', gender: 'M', status: 'Active',
  species: 'Dog', breed: 'Golden Retriever', color: 'Golden',
  sex: 'Male (Neutered)',
  dob: '12 พ.ค. 2562', age: '5 ปี 0 เดือน',
  weight: '28.5 kg', weightDate: '10 พ.ย. 2567',
  microchip: '900215000123456', animalId: 'PET-000321',
  regNo: '–', insurance: '–',
};

const owner = { name: 'คุณณัฐิดา วงศ์สวัสดิ์', phone: '098-123-4567', lineId: 'nattida_w', href: '/clients' };

const quickInfo = [
  { label: 'Blood Type',          value: 'DEA 1.1 (+)'                      },
  { label: 'Allergies',           value: 'Chicken protein (Food)'            },
  { label: 'Chronic Conditions',  value: 'Hip Dysplasia (Mild, Grade B/B)'  },
  { label: 'Current Medications', value: 'Amoxicillin-Clavulanate (Active)' },
  { label: 'Diet',                value: 'Hydrolyzed Protein — RC HP'       },
  { label: 'Last Deworm',         value: '10 ก.ย. 2566'                     },
  { label: 'Last Flea & Tick',    value: '10 ก.ย. 2566'                     },
  { label: 'Remark',              value: 'Sensitive skin — avoid chicken'   },
];

const growthPts = [
  { label: 'พ.ค.66', v: 21.5 }, { label: 'ก.ย.66', v: 23   },
  { label: 'พ.ย.66', v: 24   }, { label: 'ม.ค.67', v: 25.5 },
  { label: 'มี.ค.67',v: 26.5 }, { label: 'พ.ค.67', v: 27.5 },
  { label: 'ก.ย.67', v: 28   }, { label: 'พ.ย.67', v: 28.5 },
];

const overviewVaccinations = [
  { name: 'DHPPiL',        date: '15 เม.ย. 2567', due: '15 เม.ย. 2568' },
  { name: 'Rabies',        date: '15 เม.ย. 2567', due: '15 เม.ย. 2568' },
  { name: 'Leptospirosis', date: '15 เม.ย. 2567', due: '15 เม.ย. 2568' },
  { name: 'Bordetella',    date: '15 เม.ย. 2567', due: '15 เม.ย. 2568' },
];

const recentVisits = [
  { date: '10 พ.ย. 2567', type: 'OPD',     detail: 'Fever, Cough',    doctor: 'Dr. Natthapon' },
  { date: '15 เม.ย. 2567', type: 'Vaccine', detail: 'DHPPiL, Rabies', doctor: 'Dr. Natthapon' },
  { date: '20 ก.พ. 2567',  type: 'OPD',    detail: 'Vomiting',        doctor: 'Dr. Natthapon' },
  { date: '05 ม.ค. 2567',  type: 'Check',  detail: 'Annual Check Up', doctor: 'Dr. Natthapon' },
];

const labSummary = [
  { name: 'CBC',          date: '10 พ.ย. 2567', result: 'Normal',   ok: true  },
  { name: 'Chemistry',    date: '10 พ.ย. 2567', result: 'Normal',   ok: true  },
  { name: 'Heartworm Ag', date: '10 พ.ย. 2567', result: 'Negative', ok: true  },
];

const invoices = [
  { id: 'INV-6705102', date: '10 พ.ย. 2567', amount: '฿2,150.00', red: true  },
  { id: 'INV-6702018', date: '20 ก.พ. 2567', amount: '฿0.00',     red: false },
];

// ── Tab-specific data ─────────────────────────────────────────────────────────

const medRecords = [
  {
    date: '10 พ.ย. 2567', type: 'OPD', doctor: 'Dr. Natthapon', room: 'Exam Room 1',
    S: 'เจ้าของรายงาน: Lucky มีไข้ ไอ และเบื่ออาหารมา 2 วัน ดื่มน้ำน้อยลง',
    O: 'T: 39.8°C · P: 112/min · R: 28/min · BW: 28.5 kg · CRT: <2s · MM: Pale pink\nLung: Mild crackles bilateral · Lymph: Submandibular slightly enlarged',
    A: 'Upper Respiratory Tract Infection (URTI) with Mild Fever',
    P: '1. Amoxicillin-Clavulanate 625 mg PO SID × 7 days\n2. Cough syrup PO BID × 5 days\n3. Encourage oral hydration\n4. Recheck in 7 days or sooner if T >40.5°C',
  },
  {
    date: '15 เม.ย. 2567', type: 'Vaccine', doctor: 'Dr. Natthapon', room: 'Exam Room 2',
    S: 'Annual vaccination — no complaints, eating well, active',
    O: 'T: 38.5°C · P: 98/min · BW: 27.5 kg · General condition: Excellent',
    A: 'Healthy adult dog — Annual core vaccination',
    P: '1. DHPPiL vaccine IM administered\n2. Rabies vaccine IM administered\n3. Next due: เม.ย. 2568\n4. Recommend dental scaling at next visit',
  },
  {
    date: '20 ก.พ. 2567', type: 'OPD', doctor: 'Dr. Natthapon', room: 'Exam Room 1',
    S: 'อาเจียน 3 ครั้ง ท้องเสีย 1 วัน หลังกินอาหารใหม่',
    O: 'T: 38.9°C · P: 105/min · BW: 27.2 kg · Abdomen: Mild pain on palpation · GI sounds: Hyperactive',
    A: 'Acute Gastroenteritis — suspected dietary indiscretion',
    P: '1. Metronidazole 250 mg PO BID × 7 days\n2. Maropitant 60 mg PO SID × 3 days\n3. Bland diet (boiled chicken-free) × 5 days\n4. Recheck if no improvement in 48 hrs',
  },
  {
    date: '05 ม.ค. 2567', type: 'Check up', doctor: 'Dr. Natthapon', room: 'Exam Room 1',
    S: 'Annual wellness check — no concerns',
    O: 'T: 38.6°C · P: 96/min · BW: 26.5 kg · Full physical exam: Within normal limits\nHips: Mild laxity, consistent with prior grade B/B dysplasia',
    A: 'Healthy — Annual physical examination',
    P: '1. CBC + Chemistry panel ordered\n2. Heartworm test negative\n3. Joint supplement (Omega-3 + Glucosamine) recommended\n4. Monitor hip dysplasia — recheck X-ray in 12 months',
  },
];

const visitHistory = [
  { date: '10 พ.ย. 2567', type: 'OPD',     detail: 'Fever, Cough (URTI)',          doctor: 'Dr. Natthapon', inv: '฿2,150', paid: false },
  { date: '15 เม.ย. 2567', type: 'Vaccine', detail: 'DHPPiL, Rabies Annual',        doctor: 'Dr. Natthapon', inv: '฿850',   paid: true  },
  { date: '20 ก.พ. 2567',  type: 'OPD',    detail: 'Vomiting, Diarrhea',           doctor: 'Dr. Natthapon', inv: '฿1,800', paid: true  },
  { date: '05 ม.ค. 2567',  type: 'Check',  detail: 'Annual Wellness Exam',         doctor: 'Dr. Natthapon', inv: '฿1,200', paid: true  },
  { date: '10 ก.ย. 2566',  type: 'Vaccine', detail: 'Booster + Deworm + Flea/Tick',doctor: 'Dr. Natthapon', inv: '฿1,500', paid: true  },
  { date: '15 พ.ค. 2566',  type: 'OPD',    detail: 'Skin Allergy, Pruritus',       doctor: 'Dr. Piyawan',   inv: '฿3,200', paid: true  },
  { date: '02 ม.ค. 2566',  type: 'Check',  detail: 'Annual Wellness Exam',         doctor: 'Dr. Natthapon', inv: '฿1,200', paid: true  },
];

const allVaccinations = [
  { name: 'DHPPiL',         date: '15 เม.ย. 2567', due: '15 เม.ย. 2568', status: 'Valid',   batch: 'VX2024-001', dr: 'Dr. Natthapon' },
  { name: 'Rabies',         date: '15 เม.ย. 2567', due: '15 เม.ย. 2568', status: 'Valid',   batch: 'RB2024-044', dr: 'Dr. Natthapon' },
  { name: 'Leptospirosis',  date: '15 เม.ย. 2567', due: '15 เม.ย. 2568', status: 'Valid',   batch: 'LP2024-012', dr: 'Dr. Natthapon' },
  { name: 'Bordetella',     date: '15 เม.ย. 2567', due: '15 เม.ย. 2568', status: 'Valid',   batch: 'BD2024-003', dr: 'Dr. Natthapon' },
  { name: 'Influenza H3N8', date: '10 ก.ย. 2566',  due: '10 ก.ย. 2567',  status: 'Expired', batch: 'IF2023-029', dr: 'Dr. Natthapon' },
  { name: 'DHPPiL',         date: '10 ก.ย. 2565',  due: '10 ก.ย. 2566',  status: 'Expired', batch: 'VX2022-018', dr: 'Dr. Natthapon' },
  { name: 'Rabies',         date: '10 ก.ย. 2565',  due: '10 ก.ย. 2566',  status: 'Expired', batch: 'RB2022-031', dr: 'Dr. Natthapon' },
];

const labPanels = [
  {
    date: '10 พ.ย. 2567', panel: 'CBC',
    items: [
      { name: 'WBC',        value: '8.2',  unit: '×10³/µL', range: '5.0–17.0',  ok: true  },
      { name: 'RBC',        value: '6.5',  unit: '×10⁶/µL', range: '5.5–8.5',   ok: true  },
      { name: 'HGB',        value: '14.8', unit: 'g/dL',    range: '12.0–18.0', ok: true  },
      { name: 'HCT',        value: '44.2', unit: '%',       range: '37–55',     ok: true  },
      { name: 'PLT',        value: '312',  unit: '×10³/µL', range: '200–500',   ok: true  },
    ],
  },
  {
    date: '10 พ.ย. 2567', panel: 'Chemistry Panel',
    items: [
      { name: 'ALT',        value: '42',   unit: 'U/L',     range: '10–100',    ok: true  },
      { name: 'AST',        value: '31',   unit: 'U/L',     range: '10–50',     ok: true  },
      { name: 'ALP',        value: '68',   unit: 'U/L',     range: '20–150',    ok: true  },
      { name: 'BUN',        value: '18',   unit: 'mg/dL',   range: '7–27',      ok: true  },
      { name: 'Creatinine', value: '0.9',  unit: 'mg/dL',   range: '0.5–1.5',   ok: true  },
      { name: 'Glucose',    value: '95',   unit: 'mg/dL',   range: '70–118',    ok: true  },
    ],
  },
  {
    date: '10 พ.ย. 2567', panel: 'Heartworm Ag / 4Dx',
    items: [
      { name: 'Heartworm Ag', value: 'Negative', unit: '', range: 'Negative', ok: true },
      { name: 'Ehrlichia',    value: 'Negative', unit: '', range: 'Negative', ok: true },
      { name: 'Anaplasma',    value: 'Negative', unit: '', range: 'Negative', ok: true },
      { name: 'Lyme',         value: 'Negative', unit: '', range: 'Negative', ok: true },
    ],
  },
  {
    date: '05 ม.ค. 2567', panel: 'CBC',
    items: [
      { name: 'WBC',        value: '7.8',  unit: '×10³/µL', range: '5.0–17.0',  ok: true  },
      { name: 'RBC',        value: '6.3',  unit: '×10⁶/µL', range: '5.5–8.5',   ok: true  },
      { name: 'HGB',        value: '14.2', unit: 'g/dL',    range: '12.0–18.0', ok: true  },
      { name: 'PLT',        value: '298',  unit: '×10³/µL', range: '200–500',   ok: true  },
    ],
  },
];

const imagingStudies = [
  { date: '10 พ.ย. 2567', type: 'X-Ray',      region: 'Thorax (PA + Lateral)',     dr: 'Dr. Natthapon', result: 'Mild increased bronchial pattern. No mass lesion or pleural effusion detected.' },
  { date: '20 ก.พ. 2567', type: 'Ultrasound', region: 'Abdomen (Complete)',         dr: 'Dr. Piyawan',   result: 'Liver, spleen, kidneys and bladder within normal limits. No free fluid.' },
  { date: '05 ม.ค. 2566', type: 'X-Ray',      region: 'Pelvis + Both Hips (VD)',   dr: 'Dr. Natthapon', result: 'Hip dysplasia Grade B/B per OFA classification. Mild subluxation bilaterally.' },
];

const currentMeds = [
  { name: 'Amoxicillin-Clavulanate 625 mg', dose: '625 mg', freq: 'SID', route: 'PO', start: '10 พ.ย. 2567', end: '17 พ.ย. 2567', dr: 'Dr. Natthapon' },
  { name: 'Omega-3 + Glucosamine supplement', dose: '1 cap', freq: 'SID', route: 'PO', start: '05 ม.ค. 2567', end: 'Ongoing',      dr: 'Dr. Natthapon' },
];

const pastMeds = [
  { name: 'Metronidazole 250 mg', dose: '250 mg', freq: 'BID', route: 'PO', start: '20 ก.พ. 2567', end: '27 ก.พ. 2567', dr: 'Dr. Natthapon' },
  { name: 'Maropitant 60 mg',     dose: '60 mg',  freq: 'SID', route: 'PO', start: '20 ก.พ. 2567', end: '23 ก.พ. 2567', dr: 'Dr. Natthapon' },
  { name: 'Apoquel (Oclacitinib) 16 mg', dose: '16 mg', freq: 'BID→SID', route: 'PO', start: '15 พ.ค. 2566', end: '12 มิ.ย. 2566', dr: 'Dr. Piyawan' },
  { name: 'Prednisolone 5 mg',    dose: '5 mg',   freq: 'SID', route: 'PO', start: '15 พ.ค. 2566', end: '22 พ.ค. 2566', dr: 'Dr. Piyawan' },
];

const allergies = [
  { allergen: 'Chicken protein',  type: 'Food',       reaction: 'Pruritus, skin rash, erythema',      severity: 'Moderate', date: '15 พ.ค. 2566', dr: 'Dr. Piyawan' },
  { allergen: 'Environmental',    type: 'Atopic',     reaction: 'Seasonal pruritus, paw licking',      severity: 'Mild',     date: '15 พ.ค. 2566', dr: 'Dr. Piyawan' },
];

const drugReactions = [
  { drug: 'None documented', reaction: '–', severity: '–', date: '–', dr: '–' },
];

const documents = [
  { name: 'Blood Report CBC + Chemistry - Nov 2567.pdf', size: '248 KB',  date: '10 พ.ย. 2567', type: 'Lab Report',   by: 'Dr. Natthapon'  },
  { name: 'Chest X-Ray (PA+Lateral) - Nov 2567.jpg',     size: '1.4 MB',  date: '10 พ.ย. 2567', type: 'Imaging',      by: 'Tech. Somkiat'  },
  { name: 'Annual Vaccination Certificate 2567.pdf',      size: '180 KB',  date: '15 เม.ย. 2567', type: 'Certificate',  by: 'Dr. Natthapon'  },
  { name: 'Health Certificate for Export.pdf',            size: '210 KB',  date: '12 มี.ค. 2567', type: 'Certificate',  by: 'Dr. Natthapon'  },
  { name: 'Abdominal Ultrasound Report - Feb 2567.pdf',   size: '320 KB',  date: '20 ก.พ. 2567', type: 'Imaging',      by: 'Dr. Piyawan'    },
  { name: 'Dermatology Consult Note - May 2566.pdf',      size: '145 KB',  date: '15 พ.ค. 2566', type: 'Clinical Note',by: 'Dr. Piyawan'    },
  { name: 'Hip Dysplasia X-Ray (VD) - Jan 2566.jpg',      size: '2.1 MB',  date: '05 ม.ค. 2566', type: 'Imaging',      by: 'Tech. Somkiat'  },
];

const clinicalNotes = [
  { date: '10 พ.ย. 2567', by: 'Dr. Natthapon',  role: 'Veterinarian', text: 'Patient presented with mild URTI. Responded well to initial exam. Owner instructed to monitor for worsening. Follow-up in 7 days or immediately if T >40.5°C or respiratory distress.' },
  { date: '10 พ.ย. 2567', by: 'Nurse Siriwan',   role: 'Nurse',        text: 'Pre-consultation vitals recorded. Patient calm and cooperative during exam. Weight 28.5 kg. Owner expressed concern about laboured breathing during sleep.' },
  { date: '15 เม.ย. 2567', by: 'Dr. Natthapon',  role: 'Veterinarian', text: 'Annual vaccination completed. Patient in excellent health condition. Recommended professional dental scaling at next visit. Owner educated on home dental hygiene routine.' },
  { date: '20 ก.พ. 2567',  by: 'Dr. Natthapon',  role: 'Veterinarian', text: 'Acute GE likely from dietary indiscretion. Owner mentioned Lucky ate barbecue chicken scraps 2 days prior — possible trigger given known food sensitivity. Reinforced no chicken diet.' },
  { date: '15 พ.ค. 2566',  by: 'Dr. Piyawan',    role: 'Veterinarian', text: 'Dermatology consultation completed. Atopic dermatitis with suspected chicken food allergy confirmed via food elimination trial history. Switched to hydrolyzed protein diet (RC HP). Apoquel initiated.' },
];

const TABS = ['Overview', 'Medical Record', 'Visits', 'Vaccination', 'Lab Results', 'Imaging', 'Medications', 'Allergies', 'Documents', 'Notes'];

// ─── Growth Chart ─────────────────────────────────────────────────────────────

function GrowthChart() {
  const W = 360, H = 130;
  const pL = 30, pR = 8, pT = 12, pB = 28;
  const pW = W - pL - pR, pH = H - pT - pB;
  const yMax = 40, n = growthPts.length;
  const tx = (i) => pL + (i / (n - 1)) * pW;
  const ty = (v) => pT + pH * (1 - v / yMax);
  const pts = growthPts.map((d, i) => ({ ...d, x: tx(i), y: ty(d.v) }));
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const yTicks = [0, 10, 20, 30, 40];
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      {yTicks.map(t => (
        <g key={t}>
          <line x1={pL} y1={ty(t)} x2={W - pR} y2={ty(t)} stroke="#f0f5f8" strokeWidth={1} />
          <text x={pL - 4} y={ty(t) + 3.5} textAnchor="end" fontSize={8} fill="#9ab0bc">{t}</text>
        </g>
      ))}
      <path d={`${path} L${(W - pR).toFixed(1)} ${(pT + pH).toFixed(1)} L${pL} ${(pT + pH).toFixed(1)} Z`} fill="#3b82f6" fillOpacity={0.06} />
      <path d={path} fill="none" stroke="#3b82f6" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === n - 1 ? 4.5 : 3} fill={i === n - 1 ? '#2563eb' : '#3b82f6'} stroke="white" strokeWidth={1.5} />
      ))}
      {pts.map((p, i) => (
        (i % 2 === 0 || i === n - 1) && (
          <text key={i} x={p.x} y={H - 4} textAnchor="middle" fontSize={7.5} fill="#9ab0bc">{p.label}</text>
        )
      ))}
      <text x={4} y={pT + pH / 2} textAnchor="middle" fontSize={8} fill="#9ab0bc" transform={`rotate(-90 4 ${pT + pH / 2})`}>kg</text>
    </svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SpeciesIcon({ species, size = 36 }) {
  const map = {
    Dog:    { Icon: Dog,    bg: 'bg-[#fef3c7]', ic: 'text-[#b45309]' },
    Cat:    { Icon: Cat,    bg: 'bg-[#ede9fe]', ic: 'text-[#7c3aed]' },
    Rabbit: { Icon: Rabbit, bg: 'bg-[#dcfce7]', ic: 'text-[#15803d]' },
  };
  const { Icon, bg, ic } = map[species] || { Icon: PawPrint, bg: 'bg-[#f0f5f8]', ic: 'text-[#64788a]' };
  const px = Math.round(size * 0.52);
  return (
    <div className={`rounded-full flex items-center justify-center shrink-0 ${bg}`} style={{ width: size, height: size }}>
      <Icon size={px} className={ic} />
    </div>
  );
}

const typeColor = { OPD: 'bg-[#e0f2fe] text-[#0369a1]', Vaccine: 'bg-[#dcfce7] text-[#15803d]', Check: 'bg-[#f3f4f6] text-[#374151]', 'Check up': 'bg-[#f3f4f6] text-[#374151]' };
const Card = ({ icon: Icon, title, action, children }) => (
  <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-[#2563eb]" />
        <span className="text-[13px] font-black text-[#102a43]">{title}</span>
      </div>
      {action}
    </div>
    {children}
  </div>
);

// ─── Modal helpers ───────────────────────────────────────────────────────────

function Modal({ title, onClose, onSave, saveLabel = 'บันทึก', maxWidth = 'max-w-md', children }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onMouseDown={onClose}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} flex flex-col max-h-[90vh]`} onMouseDown={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f5f8]">
          <span className="text-[15px] font-black text-[#102a43]">{title}</span>
          <button onClick={onClose} className="text-[#9ab0bc] hover:text-[#64788a] bg-transparent border-0 cursor-pointer p-0"><X size={18} /></button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-4">{children}</div>
        {onSave && (
          <div className="px-6 py-4 border-t border-[#f0f5f8] flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 text-[13px] font-semibold text-[#64788a] border border-[#e3edf3] rounded-lg hover:bg-[#f8fafc] cursor-pointer bg-white">ยกเลิก</button>
            <button onClick={onSave} className="px-4 py-2 text-[13px] font-semibold text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] cursor-pointer">{saveLabel}</button>
          </div>
        )}
      </div>
    </div>
  );
}
function FRow({ label, children }) {
  return <div className="flex flex-col gap-1"><label className="text-[12px] font-bold text-[#39576d]">{label}</label>{children}</div>;
}
function FInput(props) {
  return <input {...props} className="border border-[#e3edf3] rounded-lg px-3 py-2 text-[13px] w-full outline-none focus:border-[#2563eb]" />;
}
function FSelect({ options, ...props }) {
  return <select {...props} className="border border-[#e3edf3] rounded-lg px-3 py-2 text-[13px] w-full outline-none focus:border-[#2563eb]">{options.map(o => <option key={o}>{o}</option>)}</select>;
}
function FTextarea(props) {
  return <textarea {...props} className="border border-[#e3edf3] rounded-lg px-3 py-2 text-[13px] w-full outline-none focus:border-[#2563eb] resize-none h-24" />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PatientsPage() {
  const [query, setQuery]         = useState('');
  const [selected, setSelected]   = useState(null);
  const [tab, setTab]             = useState('Overview');
  const [medIdx, setMedIdx]       = useState(0);
  const [toast, setToast]         = useState('');
  const [modal, setModal]         = useState(null);
  const [modalData, setModalData] = useState(null);
  const closeModal = () => { setModal(null); setModalData(null); };
  const done = (msg) => { closeModal(); setToast(msg); };

  const filtered = MOCK_PATIENTS.filter(p => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.species.toLowerCase().includes(q) ||
      p.breed.toLowerCase().includes(q) ||
      p.owner.includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  });

  const Toast = toast && (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
      <span className="font-bold">{toast}</span>
      <button onClick={() => setToast('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2"><X size={14} /></button>
    </div>
  );

  // ── Search mode ─────────────────────────────────────────────────────────────
  if (!selected) {
    return (
      <div className="h-full bg-[#f8fafc] flex flex-col overflow-hidden">
        {Toast}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[760px] mx-auto pt-12 pb-10 px-6">

            <div className="mb-8">
              <h1 className="text-[28px] font-black text-[#102a43] m-0 mb-1">Patients</h1>
              <p className="m-0 text-[#64788a] text-[14px]">ค้นหาสัตว์เลี้ยงด้วยชื่อ, สายพันธุ์, ชื่อเจ้าของ หรือ Animal ID</p>
            </div>

            <div className="flex items-center gap-3 bg-white border-2 border-[#e3edf3] focus-within:border-[#2563eb] rounded-2xl px-4 py-3 shadow-sm transition-colors mb-3">
              <Search size={18} className="text-[#9ab0bc] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="ค้นหาชื่อสัตว์เลี้ยง, สายพันธุ์, เจ้าของ หรือ Animal ID..."
                className="flex-1 border-0 outline-none text-[15px] bg-transparent text-[#102a43] placeholder-[#9ab0bc]"
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-[#9ab0bc] hover:text-[#64788a] bg-transparent border-0 cursor-pointer p-0">
                  <X size={16} />
                </button>
              )}
            </div>

            {query.trim() ? (
              filtered.length > 0 ? (
                <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-5 py-2.5 border-b border-[#f0f5f8] text-[11px] font-bold text-[#9ab0bc] uppercase tracking-wider">
                    พบ {filtered.length} รายการ
                  </div>
                  {filtered.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => { setSelected(p); setTab('Overview'); setMedIdx(0); }}
                      className={`w-full flex items-center gap-4 px-5 py-3.5 hover:bg-[#f8fafc] text-left cursor-pointer border-0 bg-transparent transition-colors ${i < filtered.length - 1 ? 'border-b border-[#f0f5f8]' : ''}`}
                    >
                      <SpeciesIcon species={p.species} size={42} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#102a43] text-[14px]">{p.name}</span>
                          <span className={`text-[11px] font-bold border px-1.5 py-0.5 rounded ${p.gender === 'M' ? 'text-[#3b82f6] border-[#3b82f6]' : 'text-[#ec4899] border-[#ec4899]'}`}>{p.gender}</span>
                        </div>
                        <div className="text-[12px] text-[#9ab0bc] mt-0.5">{p.species} · {p.breed} · {p.id}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${p.status === 'Active' ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-gray-100 text-gray-500'}`}>{p.status}</span>
                        <span className="text-[11px] text-[#9ab0bc]">{p.owner}</span>
                        <span className="text-[10px] text-[#c4d6e0]">ล่าสุด {p.lastVisit}</span>
                      </div>
                      <ChevronRight size={15} className="text-[#c4d6e0] shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm p-10 text-center">
                  <PawPrint size={36} className="text-[#c4d6e0] mx-auto mb-3" />
                  <div className="text-[14px] font-bold text-[#64788a]">ไม่พบสัตว์เลี้ยงที่ตรงกัน</div>
                  <div className="text-[12px] text-[#9ab0bc] mt-1">ลองค้นหาด้วยคำอื่น หรือตรวจสอบการสะกด</div>
                </div>
              )
            ) : (
              <div className="text-center mt-12">
                <div className="w-16 h-16 rounded-2xl bg-[#fef3c7] flex items-center justify-center mx-auto mb-4">
                  <PawPrint size={32} className="text-[#b45309]" />
                </div>
                <div className="text-[15px] font-bold text-[#64788a] mb-1">เริ่มต้นด้วยการค้นหา</div>
                <div className="text-[13px] text-[#9ab0bc]">พิมพ์ชื่อสัตว์, สายพันธุ์, ชื่อเจ้าของ หรือ Animal ID เพื่อค้นหาข้อมูลผู้ป่วย</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Detail mode ─────────────────────────────────────────────────────────────
  const pt = selected;

  return (
    <div className="h-full overflow-y-auto bg-[#f8fafc]">
    <div className="p-5 flex flex-col gap-4">
      {Toast}

      {/* ── Modals ── */}
      {modal === 'editPatient' && (
        <Modal title="แก้ไขข้อมูลผู้ป่วย" onClose={closeModal} onSave={() => done('บันทึกข้อมูลผู้ป่วยเรียบร้อย')}>
          <FRow label="ชื่อสัตว์เลี้ยง"><FInput defaultValue={patient.name} /></FRow>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="Species"><FInput defaultValue={patient.species} /></FRow>
            <FRow label="Breed"><FInput defaultValue={patient.breed} /></FRow>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="สี / Color"><FInput defaultValue={patient.color} /></FRow>
            <FRow label="เพศ"><FSelect options={['Male (Neutered)', 'Male (Intact)', 'Female (Spayed)', 'Female (Intact)']} defaultValue={patient.sex} /></FRow>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="วันเกิด"><FInput type="date" /></FRow>
            <FRow label="น้ำหนัก (kg)"><FInput defaultValue="28.5" /></FRow>
          </div>
          <FRow label="Microchip No."><FInput defaultValue={patient.microchip} /></FRow>
        </Modal>
      )}

      {modal === 'newVisit' && (
        <Modal title="สร้างการมาพบใหม่" onClose={closeModal} onSave={() => done('สร้างการมาพบใหม่เรียบร้อย')}>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="วันที่"><FInput type="date" /></FRow>
            <FRow label="เวลา"><FInput type="time" /></FRow>
          </div>
          <FRow label="ประเภทการมาพบ"><FSelect options={['OPD', 'Vaccine', 'Check-up', 'Surgery', 'Emergency', 'Follow-up']} /></FRow>
          <FRow label="อาการนำ / Chief Complaint"><FTextarea placeholder="ระบุอาการหลักที่นำมาพบแพทย์..." /></FRow>
          <FRow label="แพทย์ผู้รับผิดชอบ"><FSelect options={['Dr. Natthapon', 'Dr. Siriporn', 'Dr. Wanchai', 'Dr. Priya']} /></FRow>
        </Modal>
      )}

      {modal === 'moreOptions' && (
        <Modal title="ตัวเลือกเพิ่มเติม" onClose={closeModal} onSave={null} maxWidth="max-w-xs">
          <div className="flex flex-col gap-1">
            {[
              { label: 'โอนย้ายผู้ป่วย', icon: '🔁', action: () => done('ส่งคำขอโอนย้ายผู้ป่วยแล้ว') },
              { label: 'พิมพ์ประวัติผู้ป่วย', icon: '🖨️', action: () => done('ส่งไปพิมพ์แล้ว') },
              { label: 'ส่งออกข้อมูล (PDF)', icon: '📄', action: () => done('ส่งออกไฟล์ PDF แล้ว') },
              { label: 'ระงับบัญชีผู้ป่วย', icon: '🚫', action: () => done('บัญชีถูกระงับชั่วคราว') },
            ].map(({ label, icon, action }) => (
              <button key={label} onClick={action} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f8fafc] text-left cursor-pointer border-0 bg-transparent w-full text-[13px] font-semibold text-[#102a43]">
                <span>{icon}</span> {label}
              </button>
            ))}
          </div>
        </Modal>
      )}

      {modal === 'changePhoto' && (
        <Modal title="เปลี่ยนรูปภาพสัตว์เลี้ยง" onClose={closeModal} onSave={() => done('บันทึกรูปภาพใหม่เรียบร้อย')}>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-24 h-24 rounded-2xl bg-[#f0f5f8] flex items-center justify-center border-2 border-dashed border-[#c4d6e0]">
              <Camera size={32} className="text-[#9ab0bc]" />
            </div>
            <label className="px-4 py-2 bg-[#2563eb] text-white text-[13px] font-semibold rounded-lg cursor-pointer hover:bg-[#1d4ed8]">
              เลือกไฟล์จากเครื่อง
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <div className="text-[11px] text-[#9ab0bc]">รองรับ JPG, PNG, WEBP ขนาดไม่เกิน 5MB</div>
          </div>
        </Modal>
      )}

      {modal === 'printRecord' && (
        <Modal title="พิมพ์บันทึกการตรวจ" onClose={closeModal} onSave={() => done('ส่งไปพิมพ์แล้ว')} saveLabel="สั่งพิมพ์">
          <FRow label="เลือกรายการที่ต้องการพิมพ์">
            <FSelect options={['บันทึกการตรวจครั้งล่าสุด', 'บันทึกการตรวจทั้งหมด', 'สรุปประวัติผู้ป่วย']} />
          </FRow>
          <FRow label="รูปแบบ">
            <FSelect options={['A4 (PDF)', 'ใบสั่งยา', 'รายงานสรุป']} />
          </FRow>
          <div className="flex items-center gap-2 p-3 bg-[#eff6ff] rounded-xl border border-[#bfdbfe] text-[12px] text-[#2563eb]">
            <FileText size={14} /> ไฟล์จะถูกเปิดในหน้าต่างใหม่
          </div>
        </Modal>
      )}

      {modal === 'addVaccine' && (
        <Modal title="บันทึกวัคซีนใหม่" onClose={closeModal} onSave={() => done('บันทึกวัคซีนเรียบร้อย')}>
          <FRow label="ชื่อวัคซีน"><FSelect options={['DHPPiL', 'Rabies', 'Leptospirosis', 'Bordetella', 'Influenza', 'Other']} /></FRow>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="วันที่ฉีด"><FInput type="date" /></FRow>
            <FRow label="วันนัดครั้งต่อไป"><FInput type="date" /></FRow>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="Batch No."><FInput placeholder="BCH-2024-001" /></FRow>
            <FRow label="แพทย์ผู้ฉีด"><FSelect options={['Dr. Natthapon', 'Dr. Siriporn', 'Dr. Wanchai']} /></FRow>
          </div>
          <FRow label="หมายเหตุ"><FTextarea placeholder="ข้อสังเกตหรือผลข้างเคียงหลังฉีด (ถ้ามี)..." /></FRow>
        </Modal>
      )}

      {modal === 'addStudy' && (
        <Modal title="บันทึกภาพถ่ายทางรังสีใหม่" onClose={closeModal} onSave={() => done('บันทึกข้อมูล Imaging เรียบร้อย')}>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="ประเภท"><FSelect options={['X-Ray', 'Ultrasound', 'CT Scan', 'MRI', 'Endoscopy']} /></FRow>
            <FRow label="บริเวณ / Region"><FInput placeholder="Thorax, Abdomen..." /></FRow>
          </div>
          <FRow label="วันที่"><FInput type="date" /></FRow>
          <FRow label="แพทย์ผู้ตรวจ"><FSelect options={['Dr. Natthapon', 'Dr. Siriporn', 'Dr. Wanchai']} /></FRow>
          <FRow label="ผลการตรวจ / Findings"><FTextarea placeholder="ระบุผลการตรวจและข้อสังเกต..." /></FRow>
        </Modal>
      )}

      {modal === 'viewImage' && modalData && (
        <Modal title={`${modalData.type} — ${modalData.region}`} onClose={closeModal} onSave={null} maxWidth="max-w-lg">
          <div className="w-full h-[200px] bg-[#f0f5f8] rounded-xl flex items-center justify-center border border-[#e3edf3]">
            <div className="text-center">
              <ScanLine size={40} className="text-[#9ab0bc] mx-auto mb-2" />
              <div className="text-[12px] text-[#9ab0bc]">ไม่มีไฟล์ภาพในระบบ (Demo)</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-[12px]">
            {[['ประเภท', modalData.type], ['บริเวณ', modalData.region], ['วันที่', modalData.date], ['แพทย์', modalData.dr]].map(([l, v]) => (
              <div key={l}><span className="text-[#9ab0bc]">{l}: </span><span className="font-semibold text-[#102a43]">{v}</span></div>
            ))}
          </div>
          <div className="p-3 bg-[#f8fafc] rounded-xl border border-[#e3edf3] text-[12px] text-[#39576d] leading-relaxed">{modalData.result}</div>
        </Modal>
      )}

      {modal === 'addMedication' && (
        <Modal title="เพิ่มรายการยา" onClose={closeModal} onSave={() => done('บันทึกรายการยาเรียบร้อย')}>
          <FRow label="ชื่อยา"><FInput placeholder="Amoxicillin-Clavulanate" /></FRow>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="ขนาด / Dose"><FInput placeholder="250mg" /></FRow>
            <FRow label="ความถี่"><FSelect options={['SID (1×/day)', 'BID (2×/day)', 'TID (3×/day)', 'QID (4×/day)', 'PRN (as needed)']} /></FRow>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="ทางที่ให้ / Route"><FSelect options={['PO (Oral)', 'IM', 'IV', 'SC', 'Topical']} /></FRow>
            <FRow label="แพทย์ผู้สั่ง"><FSelect options={['Dr. Natthapon', 'Dr. Siriporn', 'Dr. Wanchai']} /></FRow>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="วันเริ่มต้น"><FInput type="date" /></FRow>
            <FRow label="วันสิ้นสุด"><FInput type="date" /></FRow>
          </div>
        </Modal>
      )}

      {modal === 'addAllergy' && (
        <Modal title="เพิ่มข้อมูลการแพ้" onClose={closeModal} onSave={() => done('บันทึกข้อมูลการแพ้เรียบร้อย')}>
          <FRow label="สารก่อภูมิแพ้ / Allergen"><FInput placeholder="Chicken Protein, Penicillin..." /></FRow>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="ประเภท"><FSelect options={['Food', 'Drug', 'Environmental', 'Contact']} /></FRow>
            <FRow label="ความรุนแรง"><FSelect options={['Mild', 'Moderate', 'Severe', 'Life-threatening']} /></FRow>
          </div>
          <FRow label="อาการที่เกิดขึ้น / Reaction"><FTextarea placeholder="อธิบายอาการที่พบเมื่อได้รับสารก่อภูมิแพ้..." /></FRow>
          <FRow label="แพทย์ผู้บันทึก"><FSelect options={['Dr. Natthapon', 'Dr. Siriporn', 'Dr. Wanchai']} /></FRow>
        </Modal>
      )}

      {modal === 'uploadFile' && (
        <Modal title="อัปโหลดเอกสาร" onClose={closeModal} onSave={() => done('อัปโหลดไฟล์เรียบร้อย')} saveLabel="อัปโหลด">
          <div className="border-2 border-dashed border-[#c4d6e0] rounded-xl p-8 flex flex-col items-center gap-3 bg-[#f8fafc]">
            <Paperclip size={28} className="text-[#9ab0bc]" />
            <div className="text-[13px] font-bold text-[#102a43]">ลากไฟล์มาวางที่นี่</div>
            <label className="px-4 py-2 bg-[#2563eb] text-white text-[12px] font-semibold rounded-lg cursor-pointer hover:bg-[#1d4ed8]">
              เลือกไฟล์ <input type="file" className="hidden" />
            </label>
            <div className="text-[11px] text-[#9ab0bc]">PDF, JPG, PNG — ขนาดไม่เกิน 20MB</div>
          </div>
          <FRow label="ประเภทเอกสาร"><FSelect options={['Lab Report', 'X-Ray', 'Vaccination Certificate', 'Discharge Summary', 'Prescription', 'Other']} /></FRow>
          <FRow label="หมายเหตุ"><FInput placeholder="รายละเอียดเพิ่มเติม..." /></FRow>
        </Modal>
      )}

      {modal === 'addNote' && (
        <Modal title="เพิ่มบันทึก" onClose={closeModal} onSave={() => done('บันทึกข้อความเรียบร้อย')}>
          <FRow label="ประเภทบันทึก"><FSelect options={['Clinical Note', 'Nursing Note', 'Administrative', 'Follow-up Note']} /></FRow>
          <FRow label="เนื้อหาบันทึก"><FTextarea placeholder="ระบุข้อมูลหรือข้อสังเกตสำคัญ..." /></FRow>
        </Modal>
      )}

      {/* Back */}
      <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-[#2563eb] font-bold text-[13px] hover:underline cursor-pointer border-0 bg-transparent w-fit p-0">
        <ArrowLeft size={14} /> กลับไปค้นหา
      </button>

      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[24px] font-black text-[#102a43] m-0 leading-none">{pt.name}</h1>
          <span className={`text-[13px] font-bold leading-none border px-1.5 py-0.5 rounded ${pt.gender === 'M' ? 'text-[#3b82f6] border-[#3b82f6]' : 'text-[#ec4899] border-[#ec4899]'}`}>{pt.gender}</span>
          <span className="px-2.5 py-0.5 bg-[#dcfce7] text-[#15803d] text-[12px] font-bold rounded-full">{patient.status}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setModal('editPatient')} className="flex items-center gap-1.5 px-3.5 py-1.5 border border-[#e3edf3] rounded-lg text-[13px] font-semibold text-[#39576d] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors cursor-pointer bg-white">
            <Pencil size={13} /> Edit
          </button>
          <button onClick={() => setModal('newVisit')} className="flex items-center gap-1.5 px-3.5 py-1.5 border border-[#e3edf3] rounded-lg text-[13px] font-semibold text-[#39576d] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors cursor-pointer bg-white">
            <CalendarDays size={13} /> New Visit
          </button>
          <button onClick={() => setModal('moreOptions')} className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2563eb] rounded-lg text-[13px] font-semibold text-white hover:bg-[#1d4ed8] transition-colors cursor-pointer">
            <MoreHorizontal size={13} /> More
          </button>
        </div>
      </div>

      {/* Patient info card */}
      <div className="bg-white border border-[#e3edf3] rounded-xl p-5 shadow-sm shrink-0">
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2 shrink-0">
            <SpeciesIcon species={pt.species} size={100} />
            <button onClick={() => setModal('changePhoto')} className="flex items-center gap-1 text-[11px] text-[#64788a] border border-[#e3edf3] rounded-lg px-2.5 py-1 hover:border-[#2563eb] hover:text-[#2563eb] transition-colors cursor-pointer">
              <Camera size={11} /> Change Photo
            </button>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-x-8 gap-y-2 min-w-0">
            {[
              ['Species',          pt.species],
              ['Microchip',        patient.microchip],
              ['Breed',            pt.breed],
              ['Animal ID',        pt.id],
              ['Color',            patient.color],
              ['Registration No.', patient.regNo],
              ['Sex',              patient.sex],
              ['Insurance',        patient.insurance],
              ['Birth Date / Age', `${patient.dob} (${patient.age})`],
              ['Weight (Last)',    `${patient.weight} (${patient.weightDate})`],
              ['',     ``],
              ['', ''],
            ].map(([label, value], i) =>
              label ? (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[12px] text-[#9ab0bc] w-[120px] shrink-0 leading-5">{label}</span>
                  <span className="text-[12px] font-semibold text-[#102a43] leading-5">{value}</span>
                </div>
              ) : <div key={i} />
            )}
          </div>
          <div className="w-[200px] shrink-0 border-l border-[#f0f5f8] pl-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#9ab0bc] uppercase tracking-wider">Owner</span>
              <Link href={owner.href} className="text-[11px] text-[#2563eb] font-bold no-underline hover:underline">View Client</Link>
            </div>
            <div className="text-[13px] font-bold text-[#102a43] mb-2">{owner.name}</div>
            <div className="flex items-center gap-1.5 text-[12px] text-[#64788a] mb-1">
              <Phone size={12} className="text-[#9ab0bc]" /> {owner.phone}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-[#64788a]">
              <MessageSquare size={12} className="text-[#9ab0bc]" /> {owner.lineId}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-[#e3edf3] shrink-0 bg-white rounded-t-xl px-2 -mb-1 overflow-x-auto">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-[12px] font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${tab === t ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-[#64748b] hover:text-[#102a43]'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Overview ── */}
      {tab === 'Overview' && (
        <>
          <div className="grid grid-cols-3 gap-4 shrink-0">
            <Card icon={Shield} title="Quick Info">
              <div className="flex flex-col gap-2">
                {quickInfo.map((q) => (
                  <div key={q.label} className="flex items-start gap-2">
                    <span className="text-[11px] text-[#9ab0bc] w-[120px] shrink-0 leading-5">{q.label}</span>
                    <span className="text-[11px] text-[#39576d] leading-5 font-medium">{q.value}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card icon={Syringe} title="Vaccination Status" action={<Link href="/lab" className="text-[11px] text-[#2563eb] font-bold no-underline hover:underline">View All</Link>}>
              <div className="flex flex-col gap-2.5">
                {overviewVaccinations.map((v) => (
                  <div key={v.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#22c55e] shrink-0" />
                      <span className="text-[12px] font-semibold text-[#102a43]">{v.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[#64788a]">{v.date}</div>
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="text-[10px] font-bold text-[#15803d] bg-[#dcfce7] px-1.5 py-0.5 rounded-md">Valid</span>
                        <span className="text-[10px] text-[#9ab0bc]">Due {v.due}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card icon={FileText} title="Recent Visits" action={<Link href="/emr" className="text-[11px] text-[#2563eb] font-bold no-underline hover:underline">View All</Link>}>
              <div className="flex flex-col gap-0">
                {recentVisits.map((v, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 border-b border-[#f8fbfc] last:border-0">
                    <div className="min-w-[72px]">
                      <div className="text-[11px] font-bold text-[#102a43]">{v.date}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${typeColor[v.type] || 'bg-gray-100 text-gray-600'}`}>{v.type}</span>
                      <div className="text-[11px] text-[#39576d] mt-0.5 truncate">{v.detail}</div>
                      <div className="text-[10px] text-[#9ab0bc]">{v.doctor}</div>
                    </div>
                    <FileText size={14} className="text-[#c4d6e0] shrink-0 cursor-pointer hover:text-[#2563eb] transition-colors" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-3 gap-4 shrink-0">
            <Card icon={TrendingUp} title="Growth Chart" action={
              <div className="flex items-center gap-2">
                <select className="text-[11px] text-[#64788a] border border-[#e3edf3] rounded-md px-2 py-1 cursor-pointer outline-none"><option>Weight</option></select>
                <select className="text-[11px] text-[#64788a] border border-[#e3edf3] rounded-md px-2 py-1 cursor-pointer outline-none"><option>1 Year</option><option>All</option></select>
              </div>
            }><GrowthChart /></Card>
            <Card icon={AlertCircle} title="Last 3 Lab Results" action={<Link href="/lab" className="text-[11px] text-[#2563eb] font-bold no-underline hover:underline">View All</Link>}>
              <div className="flex flex-col gap-3">
                {labSummary.map((r) => (
                  <div key={r.name} className="flex items-center justify-between">
                    <div>
                      <div className="text-[12px] font-semibold text-[#102a43]">{r.name}</div>
                      <div className="text-[10px] text-[#9ab0bc]">{r.date}</div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.ok ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fee2e2] text-[#dc2626]'}`}>{r.result}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card icon={FileText} title="Outstanding">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] text-[#9ab0bc] mb-0.5">Total Outstanding</div>
                  <div className="text-[22px] font-black text-[#dc2626]">฿2,150.00</div>
                </div>
                <Link href="/billing" className="px-3 py-1.5 bg-[#fee2e2] text-[#dc2626] text-[11px] font-bold rounded-lg no-underline hover:bg-[#fecaca]">View Invoice</Link>
              </div>
              <div className="flex flex-col gap-2 border-t border-[#f0f5f8] pt-3">
                {invoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-[12px] font-semibold text-[#102a43]">{inv.id}</div>
                      <div className="text-[10px] text-[#9ab0bc]">{inv.date}</div>
                    </div>
                    <span className={`text-[12px] font-bold ${inv.red ? 'text-[#dc2626]' : 'text-[#64788a]'}`}>{inv.amount}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

      {/* ── Medical Record (SOAP) ── */}
      {tab === 'Medical Record' && (
        <div className="flex gap-4 shrink-0">
          <div className="w-[220px] shrink-0 bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-[#f0f5f8] text-[12px] font-black text-[#102a43]">Visit History</div>
            {medRecords.map((r, i) => (
              <button key={i} onClick={() => setMedIdx(i)}
                className={`w-full px-4 py-3 text-left border-b border-[#f8fbfc] last:border-0 cursor-pointer border-0 transition-colors ${medIdx === i ? 'bg-[#eff6ff]' : 'bg-transparent hover:bg-[#f8fafc]'}`}>
                <div className="text-[12px] font-bold text-[#102a43]">{r.date}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${typeColor[r.type] || 'bg-gray-100 text-gray-600'}`}>{r.type}</span>
                  <span className="text-[10px] text-[#9ab0bc]">{r.doctor}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="flex-1 bg-white border border-[#e3edf3] rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f0f5f8]">
              <div>
                <div className="text-[15px] font-black text-[#102a43]">{medRecords[medIdx].date}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${typeColor[medRecords[medIdx].type] || 'bg-gray-100 text-gray-600'}`}>{medRecords[medIdx].type}</span>
                  <span className="text-[12px] text-[#64788a]">{medRecords[medIdx].doctor}</span>
                  <span className="text-[12px] text-[#9ab0bc]">· {medRecords[medIdx].room}</span>
                </div>
              </div>
              <button onClick={() => setModal('printRecord')} className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e3edf3] rounded-lg text-[12px] text-[#64788a] hover:bg-[#f0f5f8] cursor-pointer bg-transparent">
                <FileText size={13} /> Print
              </button>
            </div>
            {[['S — Subjective', medRecords[medIdx].S], ['O — Objective', medRecords[medIdx].O], ['A — Assessment', medRecords[medIdx].A], ['P — Plan', medRecords[medIdx].P]].map(([label, text]) => (
              <div key={label} className="mb-4">
                <div className="text-[11px] font-black text-[#9ab0bc] uppercase tracking-wider mb-1.5">{label}</div>
                <div className="text-[13px] text-[#39576d] leading-relaxed whitespace-pre-line bg-[#f8fafc] rounded-xl px-4 py-3 border border-[#f0f5f8]">{text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Visits ── */}
      {tab === 'Visits' && (
        <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden shrink-0">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0f5f8]">
            <span className="text-[13px] font-black text-[#102a43]">Visit History ({visitHistory.length})</span>
            <button onClick={() => setModal('newVisit')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] rounded-lg text-[12px] font-semibold text-white hover:bg-[#1d4ed8] cursor-pointer">
              <Plus size={13} /> New Visit
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0f5f8]">
                {['Date','Type','Detail','Doctor','Invoice','Paid'].map((h) => (
                  <th key={h} className="px-5 py-3 text-[10px] font-bold text-[#9ab0bc] uppercase text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visitHistory.map((v, i) => (
                <tr key={i} className="border-b border-[#f8fbfc] last:border-0 hover:bg-[#f8fafc] transition-colors">
                  <td className="px-5 py-3 text-[12px] font-semibold text-[#102a43] whitespace-nowrap">{v.date}</td>
                  <td className="px-5 py-3"><span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${typeColor[v.type] || 'bg-gray-100 text-gray-600'}`}>{v.type}</span></td>
                  <td className="px-5 py-3 text-[12px] text-[#39576d]">{v.detail}</td>
                  <td className="px-5 py-3 text-[12px] text-[#64788a] whitespace-nowrap">{v.doctor}</td>
                  <td className="px-5 py-3 text-[12px] font-semibold text-[#102a43]">{v.inv}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.paid ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fee2e2] text-[#dc2626]'}`}>{v.paid ? 'Paid' : 'Unpaid'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Vaccination ── */}
      {tab === 'Vaccination' && (
        <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden shrink-0">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0f5f8]">
            <span className="text-[13px] font-black text-[#102a43]">Vaccination Records ({allVaccinations.length})</span>
            <button onClick={() => setModal('addVaccine')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] rounded-lg text-[12px] font-semibold text-white hover:bg-[#1d4ed8] cursor-pointer">
              <Syringe size={13} /> Add Vaccine
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0f5f8]">
                {['Vaccine','Date Given','Due Date','Batch No.','Doctor','Status'].map(h => (
                  <th key={h} className="px-5 py-3 text-[10px] font-bold text-[#9ab0bc] uppercase text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allVaccinations.map((v, i) => (
                <tr key={i} className="border-b border-[#f8fbfc] last:border-0 hover:bg-[#f8fafc] transition-colors">
                  <td className="px-5 py-3 text-[13px] font-semibold text-[#102a43]">{v.name}</td>
                  <td className="px-5 py-3 text-[12px] text-[#39576d]">{v.date}</td>
                  <td className="px-5 py-3 text-[12px] text-[#39576d]">{v.due}</td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[#64788a]">{v.batch}</td>
                  <td className="px-5 py-3 text-[12px] text-[#64788a]">{v.dr}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.status === 'Valid' ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fef3c7] text-[#b45309]'}`}>{v.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Lab Results ── */}
      {tab === 'Lab Results' && (
        <div className="flex flex-col gap-4 shrink-0">
          {labPanels.map((panel, pi) => (
            <div key={pi} className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#f0f5f8]">
                <div className="flex items-center gap-2">
                  <FlaskConical size={14} className="text-[#2563eb]" />
                  <span className="text-[13px] font-black text-[#102a43]">{panel.panel}</span>
                  <span className="text-[11px] text-[#9ab0bc]">· {panel.date}</span>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f8fbfc]">
                    {['Parameter', 'Value', 'Unit', 'Reference Range', 'Status'].map(h => (
                      <th key={h} className="px-5 py-2.5 text-[10px] font-bold text-[#9ab0bc] uppercase text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {panel.items.map((item, ii) => (
                    <tr key={ii} className="border-b border-[#f8fbfc] last:border-0 hover:bg-[#f8fafc]">
                      <td className="px-5 py-2.5 text-[12px] font-semibold text-[#102a43]">{item.name}</td>
                      <td className="px-5 py-2.5 text-[12px] font-bold text-[#102a43]">{item.value}</td>
                      <td className="px-5 py-2.5 text-[12px] text-[#64788a]">{item.unit}</td>
                      <td className="px-5 py-2.5 text-[12px] text-[#9ab0bc]">{item.range}</td>
                      <td className="px-5 py-2.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.ok ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fee2e2] text-[#dc2626]'}`}>{item.ok ? 'Normal' : 'Abnormal'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* ── Imaging ── */}
      {tab === 'Imaging' && (
        <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden shrink-0">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0f5f8]">
            <span className="text-[13px] font-black text-[#102a43]">Imaging Studies ({imagingStudies.length})</span>
            <button onClick={() => setModal('addStudy')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] rounded-lg text-[12px] font-semibold text-white hover:bg-[#1d4ed8] cursor-pointer">
              <ScanLine size={13} /> Add Study
            </button>
          </div>
          <div className="divide-y divide-[#f8fbfc]">
            {imagingStudies.map((img, i) => (
              <div key={i} className="flex items-start gap-5 px-5 py-4 hover:bg-[#f8fafc] transition-colors">
                <div className="w-[80px] h-[60px] bg-[#f0f5f8] rounded-xl flex items-center justify-center shrink-0 border border-[#e3edf3]">
                  <ScanLine size={24} className="text-[#9ab0bc]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-bold text-[#102a43]">{img.type}</span>
                    <span className="text-[11px] text-[#9ab0bc] bg-[#f0f5f8] px-1.5 py-0.5 rounded-md">{img.region}</span>
                  </div>
                  <div className="text-[11px] text-[#9ab0bc] mb-1.5">{img.date} · {img.dr}</div>
                  <div className="text-[12px] text-[#39576d]">{img.result}</div>
                </div>
                <button onClick={() => { setModalData(img); setModal('viewImage'); }} className="flex items-center gap-1.5 text-[11px] text-[#2563eb] font-bold border border-[#2563eb] rounded-lg px-2.5 py-1.5 hover:bg-[#eff6ff] cursor-pointer bg-transparent shrink-0">
                  <Download size={12} /> View
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Medications ── */}
      {tab === 'Medications' && (
        <div className="flex flex-col gap-4 shrink-0">
          <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0f5f8]">
              <div className="flex items-center gap-2">
                <Pill size={14} className="text-[#2563eb]" />
                <span className="text-[13px] font-black text-[#102a43]">Current Medications</span>
                <span className="text-[11px] font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded-full">{currentMeds.length} Active</span>
              </div>
              <button onClick={() => setModal('addMedication')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] rounded-lg text-[12px] font-semibold text-white hover:bg-[#1d4ed8] cursor-pointer">
                <Plus size={13} /> Add Medication
              </button>
            </div>
            <table className="w-full">
              <thead><tr className="border-b border-[#f8fbfc]">
                {['Drug Name','Dose','Freq','Route','Start','End','Prescribed By'].map(h => (
                  <th key={h} className="px-5 py-2.5 text-[10px] font-bold text-[#9ab0bc] uppercase text-left">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {currentMeds.map((m, i) => (
                  <tr key={i} className="border-b border-[#f8fbfc] last:border-0 hover:bg-[#f8fafc]">
                    <td className="px-5 py-3 text-[12px] font-semibold text-[#102a43]">{m.name}</td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{m.dose}</td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{m.freq}</td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{m.route}</td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{m.start}</td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{m.end}</td>
                    <td className="px-5 py-3 text-[12px] text-[#64788a]">{m.dr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#f0f5f8]">
              <Clock size={14} className="text-[#9ab0bc]" />
              <span className="text-[13px] font-black text-[#102a43]">Past Medications</span>
            </div>
            <table className="w-full">
              <thead><tr className="border-b border-[#f8fbfc]">
                {['Drug Name','Dose','Freq','Route','Start','End','Prescribed By'].map(h => (
                  <th key={h} className="px-5 py-2.5 text-[10px] font-bold text-[#9ab0bc] uppercase text-left">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {pastMeds.map((m, i) => (
                  <tr key={i} className="border-b border-[#f8fbfc] last:border-0 hover:bg-[#f8fafc] opacity-75">
                    <td className="px-5 py-3 text-[12px] font-semibold text-[#102a43]">{m.name}</td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{m.dose}</td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{m.freq}</td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{m.route}</td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{m.start}</td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{m.end}</td>
                    <td className="px-5 py-3 text-[12px] text-[#64788a]">{m.dr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Allergies ── */}
      {tab === 'Allergies' && (
        <div className="flex flex-col gap-4 shrink-0">
          <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0f5f8]">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-[#dc2626]" />
                <span className="text-[13px] font-black text-[#102a43]">Known Allergies</span>
              </div>
              <button onClick={() => setModal('addAllergy')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#dc2626] rounded-lg text-[12px] font-semibold text-white hover:bg-[#b91c1c] cursor-pointer">
                <Plus size={13} /> Add Allergy
              </button>
            </div>
            <table className="w-full">
              <thead><tr className="border-b border-[#f8fbfc]">
                {['Allergen','Type','Reaction','Severity','Identified','Doctor'].map(h => (
                  <th key={h} className="px-5 py-2.5 text-[10px] font-bold text-[#9ab0bc] uppercase text-left">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {allergies.map((a, i) => (
                  <tr key={i} className="border-b border-[#f8fbfc] last:border-0 hover:bg-[#fef8f8]">
                    <td className="px-5 py-3 text-[12px] font-bold text-[#102a43]">{a.allergen}</td>
                    <td className="px-5 py-3"><span className="text-[10px] font-bold bg-[#fee2e2] text-[#dc2626] px-1.5 py-0.5 rounded-md">{a.type}</span></td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{a.reaction}</td>
                    <td className="px-5 py-3"><span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${a.severity === 'Moderate' ? 'bg-[#fef3c7] text-[#b45309]' : 'bg-[#f0f9ff] text-[#0369a1]'}`}>{a.severity}</span></td>
                    <td className="px-5 py-3 text-[12px] text-[#64788a]">{a.date}</td>
                    <td className="px-5 py-3 text-[12px] text-[#64788a]">{a.dr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#f0f5f8]">
              <AlertCircle size={14} className="text-[#9ab0bc]" />
              <span className="text-[13px] font-black text-[#102a43]">Drug Reactions</span>
            </div>
            <table className="w-full">
              <thead><tr className="border-b border-[#f8fbfc]">
                {['Drug','Reaction','Severity','Date','Doctor'].map(h => (
                  <th key={h} className="px-5 py-2.5 text-[10px] font-bold text-[#9ab0bc] uppercase text-left">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {drugReactions.map((r, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="px-5 py-3 text-[12px] text-[#9ab0bc] italic" colSpan={5}>{r.drug}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Documents ── */}
      {tab === 'Documents' && (
        <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden shrink-0">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0f5f8]">
            <span className="text-[13px] font-black text-[#102a43]">Documents ({documents.length})</span>
            <button onClick={() => setModal('uploadFile')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] rounded-lg text-[12px] font-semibold text-white hover:bg-[#1d4ed8] cursor-pointer">
              <Paperclip size={13} /> Upload File
            </button>
          </div>
          <div className="divide-y divide-[#f8fbfc]">
            {documents.map((doc, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#f8fafc] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#f0f5f8] flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-[#64788a]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-[#102a43] truncate">{doc.name}</div>
                  <div className="text-[11px] text-[#9ab0bc] mt-0.5">{doc.date} · {doc.size} · {doc.by}</div>
                </div>
                <span className="text-[10px] font-bold text-[#64788a] bg-[#f0f5f8] px-2 py-0.5 rounded-md shrink-0">{doc.type}</span>
                <button onClick={() => setToast(`กำลังดาวน์โหลด ${doc.name}`)} className="text-[#2563eb] hover:text-[#1d4ed8] cursor-pointer bg-transparent border-0">
                  <Download size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Notes ── */}
      {tab === 'Notes' && (
        <div className="flex flex-col gap-3 shrink-0">
          <div className="flex justify-end">
            <button onClick={() => setModal('addNote')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] rounded-lg text-[12px] font-semibold text-white hover:bg-[#1d4ed8] cursor-pointer">
              <Plus size={13} /> Add Note
            </button>
          </div>
          {clinicalNotes.map((note, i) => (
            <div key={i} className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-[#102a43]">{note.by}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${note.role === 'Veterinarian' ? 'bg-[#eff6ff] text-[#2563eb]' : 'bg-[#f3f4f6] text-[#374151]'}`}>{note.role}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#9ab0bc]">
                  <Clock size={11} /> {note.date}
                </div>
              </div>
              <p className="m-0 text-[13px] text-[#39576d] leading-relaxed">{note.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
