import { useState, useRef } from "react";

const LOGO_BASE64 = "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";

const countries = [
  "القاهرة", "جدة", "دبي", "الرياض", "المدينة", "الدمام", "أبوظبي", "الشارقة", "الدوحة",
  "الكويت", "مسقط", "الإسكندرية", "شرم الشيخ", "الغردقة", "إسطنبول", "لندن", "باريس",
  "فرانكفورت", "ميونخ", "روما", "ميلانو", "مدريد", "برشلونة", "أثينا", "أمستردام",
  "فيينا", "زيورخ", "كوبنهاغن", "موسكو", "بوخارست", "كييف", "نيويورك", "شيكاغو",
  "لوس أنجلوس", "تورونتو", "بكين", "بانكوك", "كوالالمبور", "مومباي", "دلهي",
  "نيروبي", "أديس أبابا", "تونس", "الدار البيضاء", "طرابلس", "الخرطوم"
];

const airports = [
  "مطار القاهرة الدولي", "مطار برج العرب", "مطار شرم الشيخ الدولي", "مطار الغردقة الدولي",
  "مطار الأقصر الدولي", "مطار أسوان الدولي", "مطار سفنكس الدولي", "مطار مرسى علم",
  "مطار سوهاج الدولي", "مطار أسيوط الدولي", "مطار العلمين الدولي", "مطار العاصمة الإدارية",
  "مطار الملك عبدالعزيز الدولي", "مطار الملك خالد الدولي", "مطار الأمير محمد بن عبدالعزيز",
  "مطار الملك فهد الدولي", "مطار دبي الدولي", "مطار أبوظبي الدولي", "مطار الشارقة الدولي",
  "مطار حمد الدولي", "مطار الكويت الدولي", "مطار مسقط الدولي", "مطار هيثرو", "مطار شارل ديغول",
  "مطار فرانكفورت", "مطار ميونخ", "مطار روما فيوميتشينو", "مطار ميلانو مالبينسا",
  "مطار مدريد باراخاس", "مطار برشلونة", "مطار أثينا الدولي", "مطار إسطنبول",
  "مطار صبيحة كوكجن", "مطار زيورخ", "مطار فيينا الدولي", "مطار أمستردام", "مطار كوبنهاغن",
  "مطار أديس أبابا بولي", "مطار نيروبي", "مطار الخرطوم", "مطار تونس قرطاج",
  "مطار الدار البيضاء", "مطار طرابلس معيتيقة", "مطار جون كينيدي", "مطار شيكاغو أوهير",
  "مطار لوس أنجلوس", "مطار تورونتو بيرسون", "مطار بكين الدولي", "مطار كوالالمبور",
  "مطار بانكوك", "مطار مومباي", "مطار دلهي", "مطار سيدني", "مطار ملبورن",
  "مطار موسكو شيريميتييفو", "مطار كييف", "مطار بوخارست", "مطار برلين", "مطار جنيف",
  "مطار بروكسل", "مطار نابولي", "مطار براغ", "مطار يريفان", "مطار بازل"
];

const tripTypes = [
  { value: "one_way", label: "ذهاب فقط" },
  { value: "round_trip", label: "ذهاب وعودة" },
  { value: "one_way_transit", label: "ذهاب ترانزيت" },
  { value: "transit_direct_return", label: "ذهاب ترانزيت وعودة مباشر" },
  { value: "direct_transit_return", label: "ذهاب مباشر وعودة ترانزيت" },
  { value: "both_transit", label: "ذهاب وعودة ترانزيت" },
  { value: "multi", label: "متعددة الرحلات" },
];

const weightOptions = [
  "بدون وزن - 7 ك هاندباج فقط",
  "10 ك + 7 هاندباج",
  "15 ك + 7 هاندباج",
  "20 ك + 7 هاندباج",
  "23 ك + 7 هاندباج",
  "قطعة واحدة 23 ك + 7 هاندباج",
  "قطعة واحدة 30 ك + 7 هاندباج",
  "قطعتين 30 ك + 7 هاندباج",
  "40 ك + 7 هاندباج",
  "23 ك + 23 ك + 7 هاندباج",
  "23 ك + 23 ك + 23 ك + 7 هاندباج",
  "46 كيلو مقسمة على قطعتين + 7 هاندباج",
  "32 ك + 7 هاندباج",
  "32 ك + 32 ك + 7 هاندباج",
];

const hasTransitOut = (t) => ["one_way_transit", "transit_direct_return", "both_transit"].includes(t);
const hasTransitReturn = (t) => ["direct_transit_return", "both_transit"].includes(t);
const hasReturn = (t) => ["round_trip", "transit_direct_return", "direct_transit_return", "both_transit"].includes(t);

const SelectField = ({ label, value, onChange, options, placeholder }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)} style={styles.select}>
      <option value="">{placeholder || "-- اختر --"}</option>
      {options.map((o, i) => (
        <option key={i} value={typeof o === "object" ? o.value : o}>
          {typeof o === "object" ? o.label : o}
        </option>
      ))}
      <option value="__other__">أخرى (اكتب يدوياً)</option>
    </select>
  </div>
);

const CountrySelect = ({ label, value, onChange }) => {
  const [isOther, setIsOther] = useState(false);
  const [customVal, setCustomVal] = useState("");

  const handleSelect = (v) => {
    if (v === "__other__") { setIsOther(true); onChange(""); }
    else { setIsOther(false); onChange(v); }
  };
  const handleCustom = (v) => { setCustomVal(v); onChange(v); };

  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <select value={isOther ? "__other__" : value} onChange={e => handleSelect(e.target.value)} style={styles.select}>
        <option value="">-- اختر --</option>
        {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
        <option value="__other__">أخرى (اكتب يدوياً)</option>
      </select>
      {isOther && (
        <input
          type="text"
          value={customVal}
          onChange={e => handleCustom(e.target.value)}
          placeholder="اكتب اسم البلد"
          style={{ ...styles.input, marginTop: 6 }}
        />
      )}
    </div>
  );
};

const AirportSelect = ({ label, value, onChange }) => {
  const [isOther, setIsOther] = useState(false);
  const [customVal, setCustomVal] = useState("");

  const handleSelect = (v) => {
    if (v === "__other__") { setIsOther(true); onChange(""); }
    else { setIsOther(false); onChange(v); }
  };
  const handleCustom = (v) => { setCustomVal(v); onChange(v); };

  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <select value={isOther ? "__other__" : value} onChange={e => handleSelect(e.target.value)} style={styles.select}>
        <option value="">-- اختر المطار --</option>
        {airports.map((a, i) => <option key={i} value={a}>{a}</option>)}
        <option value="__other__">أخرى (اكتب يدوياً)</option>
      </select>
      {isOther && (
        <input
          type="text"
          value={customVal}
          onChange={e => handleCustom(e.target.value)}
          placeholder="اكتب اسم المطار"
          style={{ ...styles.input, marginTop: 6 }}
        />
      )}
    </div>
  );
};

const InputField = ({ label, value, onChange, type = "text", placeholder, readOnly = false }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      style={styles.input}
    />
  </div>
);

const getArabicPeriod = (time) => {
  if (!time) {
    return "";
  }

  const [hourText] = time.split(":");
  const hour = Number(hourText);

  if (Number.isNaN(hour)) {
    return "";
  }

  if (hour < 5) return "فجرا";
  if (hour < 12) return "صباحا";
  if (hour < 15) return "ظهرا";
  if (hour < 18) return "عصرا";
  return "مساءا";
};

const formatArabicTime = (time) => {
  if (!time) {
    return "—";
  }

  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return "—";
  }

  const hour12 = hour % 12 || 12;
  const minuteTextPadded = String(minute).padStart(2, "0");
  return `${hour12}:${minuteTextPadded} ${getArabicPeriod(time)}`.trim();
};

const getAirportAttendanceTime = (time) => {
  if (!time || !time.includes(":")) {
    return "—";
  }

  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return "—";
  }

  const totalMinutes = ((hour * 60 + minute) - 180 + 1440) % 1440;
  const nextHour = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const nextMinute = String(totalMinutes % 60).padStart(2, "0");
  return formatArabicTime(`${nextHour}:${nextMinute}`);
};

const getTransitDuration = (arrivalTime, departTime) => {
  if (!arrivalTime || !departTime || !arrivalTime.includes(":") || !departTime.includes(":")) {
    return "—";
  }

  const [arrivalHour, arrivalMinute] = arrivalTime.split(":").map(Number);
  const [departHour, departMinute] = departTime.split(":").map(Number);

  if (
    Number.isNaN(arrivalHour) ||
    Number.isNaN(arrivalMinute) ||
    Number.isNaN(departHour) ||
    Number.isNaN(departMinute)
  ) {
    return "—";
  }

  const arrivalTotal = arrivalHour * 60 + arrivalMinute;
  const departTotal = departHour * 60 + departMinute;
  const diff = (departTotal - arrivalTotal + 1440) % 1440;
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  if (hours && minutes) return `${hours} ساعة و${minutes} دقيقة`;
  if (hours) return `${hours} ساعة`;
  return `${minutes} دقيقة`;
};

const buildRouteText = (from, to) => {
  if (from && to) return `من ${from} إلى ${to}`;
  if (from) return `من ${from}`;
  if (to) return `إلى ${to}`;
  return "—";
};

const buildAttendanceText = (airport, hall) => {
  if (!airport && !hall) return "—";
  if (airport && hall) return `بمطار ${airport} - صالة ${hall}`;
  if (airport) return `بمطار ${airport}`;
  return `صالة ${hall}`;
};

const TimeField = ({ label, value, onChange }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    <input
      type="time"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={styles.input}
    />
    {value ? <span style={styles.timeHint}>سيظهر في الطباعة: {formatArabicTime(value)}</span> : null}
  </div>
);

const emptyLeg = () => ({
  fromCountry: "", toCountry: "",
  airport: "", hall: "",
  date: "", departTime: "", arrivalTime: "", flightNumber: "",
  transit: { place: "", arrivalTime: "", departTime: "", duration: "" }
});

const emptyReturn = () => ({
  fromCountry: "", toCountry: "",
  airport: "", hall: "",
  date: "", departTime: "", arrivalTime: "", flightNumber: "",
  transit: { place: "", arrivalTime: "", departTime: "", duration: "" }
});

export default function App() {
  const [tripType, setTripType] = useState("");
  const [clientName, setClientName] = useState("");
  const [weight, setWeight] = useState("");
  const [legs, setLegs] = useState([emptyLeg()]);
  const [returnData, setReturnData] = useState(emptyReturn());
  const printRef = useRef();

  const isMulti = tripType === "multi";
  const showReturn = hasReturn(tripType);
  const showOutTransit = hasTransitOut(tripType);
  const showReturnTransit = hasTransitReturn(tripType);

  const updateLeg = (idx, field, val) => {
    setLegs(prev => prev.map((l, i) => i === idx ? { ...l, [field]: val } : l));
  };
  const updateLegTransit = (idx, field, val) => {
    setLegs(prev => prev.map((l, i) => i === idx ? { ...l, transit: { ...l.transit, [field]: val } } : l));
  };
  const updateReturn = (field, val) => setReturnData(prev => ({ ...prev, [field]: val }));
  const updateReturnTransit = (field, val) => setReturnData(prev => ({ ...prev, transit: { ...prev.transit, [field]: val } }));

  const getTripTypeLabel = (v) => tripTypes.find(t => t.value === v)?.label || v;

  const handlePrint = () => {
    const printContent = document.getElementById("printArea");
    const win = window.open("", "_blank");
    win.document.write(`
      <html dir="rtl">
      <head>
        <meta charset="utf-8"/>
        <title>تذكرة رحلة - Royal Valley Tours</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
          @page { size: A4 portrait; margin: 6mm; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html, body { width: 100%; min-height: 100%; overflow: hidden; }
          body { font-family: 'Cairo', sans-serif; background: white; color: #1a2744; direction: rtl; display: flex; justify-content: center; align-items: flex-start; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page { width: 198mm; min-height: 283mm; margin: 0 auto; background: white; overflow: hidden; border: 1px solid #dbe3f2; border-radius: 18px; display: flex; flex-direction: column; }
          .header { background: linear-gradient(135deg, #1a2744 0%, #2d4a8e 100%); padding: 20px 24px; display: flex; align-items: center; gap: 16px; direction: ltr; justify-content: flex-start; }
          .logo-frame { width: 86px; height: 86px; background: white; border-radius: 10px; padding: 5px; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
          .header img { width: 100%; height: 100%; object-fit: contain; }
          .header-text { text-align: left; }
          .header-text h1 { color: white; font-size: 24px; font-weight: 900; letter-spacing: 1px; }
          .header-text p { color: #c8d8f8; font-size: 13px; margin-top: 3px; }
          .header-note { color: #ffffff; font-size: 12px; margin-top: 6px; font-weight: 700; }
          .ticket-bar { background: #c0392b; padding: 8px 24px; display: flex; justify-content: space-between; align-items: center; }
          .ticket-bar span { color: white; font-size: 13px; font-weight: 700; }
          .ticket-bar .ticket-label { color: #000;  }
          .ticket-bar .ticket-value { color: #2d4a8e; }
          .content { padding: 0; flex: 1; display: flex; flex-direction: column; }
          .section { margin-bottom: 0; border: 0; border-top: 1.25px solid #ccd7ee; border-radius: 0; overflow: hidden; break-inside: avoid; }
          .section-title { background: #f0f4ff; padding: 8px 14px; font-size: 14px; font-weight: 700; color: #1a2744; border-bottom: 1.25px solid #ccd7ee; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
          .section-title-main { display: flex; align-items: center; gap: 8px; }
          .route-chip { font-size: 11px; font-weight: 700; color: #2d4a8e; background: #e8eefc; padding: 4px 10px; border-radius: 999px; }
          .section-title .icon { color: #c0392b; font-size: 16px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; background: #fff; border-top: 1.25px solid #c7d2ea; border-right: 1.25px solid #c7d2ea; border-left: 1.25px solid #c7d2ea; border-bottom: 1.25px solid #c7d2ea; }
          .cell { padding: 9px 12px; background: #fff; min-height: 62px; display: flex; justify-content: flex-start; align-items: center; gap: 12px; border-left: 1.25px solid #c7d2ea; border-bottom: 1.25px solid #c7d2ea; }
          .cell-wide { grid-column: span 2; }
          .cell-label { font-size: 10.5px; color: #7a8ab0; font-weight: 700; letter-spacing: 0.2px; white-space: nowrap; }
          .cell-value { font-size: 13px; color: #1a2744; font-weight: 700; line-height: 1.45; text-align: right; }
          .transit-box { margin: 0; padding: 10px 14px; background: #fff8f0; border-top: 1.25px dashed #f0a500; border-radius: 0; break-inside: avoid; text-align: center; }
          .transit-title { font-size: 12px; font-weight: 700; color: #c07000; margin-bottom: 8px; }
          .transit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1.25px solid #f0c98a; border-right: 1.25px solid #f0c98a; border-left: 1.25px solid #f0c98a; border-bottom: 1.25px solid #f0c98a; }
          .transit-cell { background: #fff; border-radius: 0; padding: 8px 10px; min-height: 56px; display: flex; justify-content: flex-start; align-items: center; gap: 10px; border-left: 1.25px solid #f0c98a; border-bottom: 1.25px solid #f0c98a; }
          .footer { background: #1a2744; padding: 10px 24px; text-align: center; color: #8ba3d8; font-size: 11px; border-top: 1px solid rgba(255,255,255,0.08); margin-top: auto; }
          .divider { height: 3px; background: linear-gradient(90deg, #c0392b, #f0a500, #c0392b); margin: 0; }
          .watermark { text-align: center; padding: 6px; color: #d0d8ee; font-size: 10px; }
          .contact-card { margin: 0; border: 0; border-top: 1px solid #d8dde8; background: #fff; break-inside: avoid; }
          .contact-grid { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #d8dde8; }
          .contact-block { padding: 10px 14px; min-height: 70px; }
          .contact-block + .contact-block { border-right: 1px solid #d8dde8; }
          .contact-title { color: #c0392b; font-weight: 800; font-size: 11px; margin-bottom: 6px; }
          .contact-line { color: #5a6478; font-size: 9.8px; line-height: 1.65; font-weight: 700; }
          .contact-email { text-align: center; padding: 7px 14px 9px; border-top: 1px solid #d8dde8; color: #5a6478; font-weight: 700; font-size: 10px; }
          .contact-email span { color: #2d4a8e; text-decoration: underline; }
          .contact-message { text-align: center; padding: 8px 14px; color: #c0392b; font-weight: 700; font-size: 11px; }
         
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => {
      const page = win.document.querySelector(".page");
      if (page) {
        const pageHeight = 1123;
        const pageWidth = 794;
        const scale = Math.min(
          (pageWidth - 24) / page.scrollWidth,
          (pageHeight - 24) / page.scrollHeight,
          1
        );
        page.style.zoom = `${scale}`;
      }
      win.print();
    }, 600);
  };

  const mainLeg = legs[0];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoFrame}>
          <img src="/logo-fixed.png" alt="Royal Valley Tours" style={styles.logo} />
        </div>
        <div>
          <div style={styles.companyName}>ROYAL VALLEY TOURS</div>
          <div style={styles.tagline}>PICK YOUR PASSION..</div>
        </div>
      </div>

      <div style={styles.formWrapper}>
        {/* Trip type */}
        <div style={styles.sectionCard}>
          <div style={styles.sectionTitle}>
            <span style={styles.dot} />
            نوع الرحلة
          </div>
          <div style={styles.grid2}>
            <div style={styles.field}>
              <label style={styles.label}>نوع الرحلة</label>
              <select value={tripType} onChange={e => setTripType(e.target.value)} style={styles.select}>
                <option value="">-- اختر نوع الرحلة --</option>
                {tripTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <InputField label="اسم العميل" value={clientName} onChange={setClientName} placeholder="الاسم الكامل" />
          </div>
          <div style={styles.grid2}>
            <SelectField label="الوزن" value={weight} onChange={setWeight} options={weightOptions} placeholder="-- اختر الوزن --" />
          </div>
        </div>

        {/* Outbound legs */}
        {(isMulti ? legs : [legs[0]]).map((leg, idx) => (
          <div key={idx} style={styles.sectionCard}>
            <div style={styles.sectionTitle}>
              <span style={styles.dot} />
              {isMulti ? `رحلة ${idx + 1}` : "بيانات الذهاب"}
            </div>
            <div style={styles.grid2}>
              <CountrySelect label="من (البلد)" value={leg.fromCountry} onChange={v => updateLeg(idx, "fromCountry", v)} />
              <CountrySelect label="إلى (البلد)" value={leg.toCountry} onChange={v => updateLeg(idx, "toCountry", v)} />
            </div>
            <div style={styles.grid2}>
              <AirportSelect label="التواجد بمطار" value={leg.airport} onChange={v => updateLeg(idx, "airport", v)} />
              <InputField label="رقم الصالة" value={leg.hall} onChange={v => updateLeg(idx, "hall", v)} placeholder="مثال: 2" />
            </div>
            <div style={styles.grid2}>
              <InputField label="رقم الرحلة" value={leg.flightNumber} onChange={v => updateLeg(idx, "flightNumber", v)} placeholder="مثال: SV 301" />
            </div>
            <div style={styles.grid3}>
              <InputField label="اليوم / التاريخ" value={leg.date} onChange={v => updateLeg(idx, "date", v)} type="date" />
              <TimeField label="ساعة الإقلاع" value={leg.departTime} onChange={v => updateLeg(idx, "departTime", v)} />
              <TimeField label="وصول الطائرة الساعة" value={leg.arrivalTime} onChange={v => updateLeg(idx, "arrivalTime", v)} />
            </div>

            {/* Transit for outbound */}
            {(showOutTransit || isMulti) && (
              <div style={styles.transitBox}>
                <div style={styles.transitTitle}>✈ بيانات الترانزيت</div>
                <div style={styles.grid2}>
                  <InputField label="مكان الترانزيت" value={leg.transit.place} onChange={v => updateLegTransit(idx, "place", v)} placeholder="مثال: دبي" />
                  <InputField label="مدة الترانزيت" value={getTransitDuration(leg.transit.arrivalTime, leg.transit.departTime)} onChange={() => {}} readOnly />
                </div>
                <div style={styles.grid2}>
                  <TimeField label="وصول الترانزيت الساعة" value={leg.transit.arrivalTime} onChange={v => updateLegTransit(idx, "arrivalTime", v)} />
                  <TimeField label="إقلاع من الترانزيت الساعة" value={leg.transit.departTime} onChange={v => updateLegTransit(idx, "departTime", v)} />
                </div>
              </div>
            )}

            {isMulti && (
              <div style={{ display: "flex", gap: 10, padding: "0 0 8px 0" }}>
                {idx === legs.length - 1 && (
                  <button onClick={() => setLegs(prev => [...prev, emptyLeg()])} style={styles.addBtn}>+ إضافة رحلة</button>
                )}
                {legs.length > 1 && (
                  <button onClick={() => setLegs(prev => prev.filter((_, i) => i !== idx))} style={styles.removeBtn}>حذف</button>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Return */}
        {showReturn && (
          <div style={styles.sectionCard}>
            <div style={styles.sectionTitle}>
              <span style={{ ...styles.dot, background: "#c0392b" }} />
              بيانات العودة
            </div>
            <div style={styles.grid2}>
              <CountrySelect label="من (البلد)" value={returnData.fromCountry} onChange={v => updateReturn("fromCountry", v)} />
              <CountrySelect label="إلى (البلد)" value={returnData.toCountry} onChange={v => updateReturn("toCountry", v)} />
            </div>
            <div style={styles.grid2}>
              <AirportSelect label="التواجد بمطار" value={returnData.airport} onChange={v => updateReturn("airport", v)} />
              <InputField label="رقم الصالة" value={returnData.hall} onChange={v => updateReturn("hall", v)} placeholder="مثال: 1" />
            </div>
            <div style={styles.grid2}>
              <InputField label="رقم الرحلة" value={returnData.flightNumber} onChange={v => updateReturn("flightNumber", v)} placeholder="مثال: SV 302" />
            </div>
            <div style={styles.grid3}>
              <InputField label="اليوم / التاريخ" value={returnData.date} onChange={v => updateReturn("date", v)} type="date" />
              <TimeField label="ساعة الإقلاع" value={returnData.departTime} onChange={v => updateReturn("departTime", v)} />
              <TimeField label="وصول الطائرة الساعة" value={returnData.arrivalTime} onChange={v => updateReturn("arrivalTime", v)} />
            </div>

            {showReturnTransit && (
              <div style={styles.transitBox}>
                <div style={styles.transitTitle}>✈ بيانات ترانزيت العودة</div>
                <div style={styles.grid2}>
                  <InputField label="مكان الترانزيت" value={returnData.transit.place} onChange={v => updateReturnTransit("place", v)} placeholder="مثال: القاهرة" />
                  <InputField label="مدة الترانزيت" value={getTransitDuration(returnData.transit.arrivalTime, returnData.transit.departTime)} onChange={() => {}} readOnly />
                </div>
                <div style={styles.grid2}>
                  <TimeField label="وصول الترانزيت الساعة" value={returnData.transit.arrivalTime} onChange={v => updateReturnTransit("arrivalTime", v)} />
                  <TimeField label="إقلاع من الترانزيت الساعة" value={returnData.transit.departTime} onChange={v => updateReturnTransit("departTime", v)} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Print Button */}
        <button onClick={handlePrint} style={styles.printBtn}>
          🖨 طباعة البيانات كـ PDF
        </button>
      </div>

      {/* Hidden Print Area */}
      <div id="printArea" style={{ display: "none" }}>
        <div className="page">
          <div className="header">
            <div className="logo-frame">
              <img src="/logo-fixed.png" alt="logo" />
            </div>
            <div className="header-text">
              <h1>ROYAL VALLEY TOURS</h1>
              <p>PICK YOUR PASSION.. | بيانات الرحلة</p>
            </div>
          </div>
          <div className="divider" />
          <div className="ticket-bar">
            <span className="ticket-bar-title"><span className="ticket-label">نوع الرحلة :</span> <span className="ticket-value">{getTripTypeLabel(tripType)}</span></span>
            <span className="ticket-bar-title"><span className="ticket-label">اسم العميل :</span> <span className="ticket-value">{clientName}</span></span>
          </div>
          <div className="content">
            {(isMulti ? legs : [legs[0]]).map((leg, idx) => (
              <div key={idx} className="section" style={{ marginBottom: 20 }}>
                <div className="section-title">
                  <div className="section-title-main">
                    <span className="icon">✈</span>
                    {isMulti ? `رحلة ${idx + 1}` : "بيانات الذهاب"}
                  </div>
                  <div className="route-chip">خط السير: {buildRouteText(leg.fromCountry, leg.toCountry)}</div>
                </div>
                <div className="grid">
                  <div className="cell cell-wide"><div className="cell-label">التواجد</div><div className="cell-value">{buildAttendanceText(leg.airport, leg.hall)}</div></div>
                  <div className="cell"><div className="cell-label">التاريخ</div><div className="cell-value">{leg.date || "—"}</div></div>
                  <div className="cell"><div className="cell-label">التواجد في المطار الساعة</div><div className="cell-value">{getAirportAttendanceTime(leg.departTime)}</div></div>
                  <div className="cell"><div className="cell-label">ساعة الإقلاع</div><div className="cell-value">{formatArabicTime(leg.departTime)}</div></div>
                  <div className="cell"><div className="cell-label">وصول الطائرة</div><div className="cell-value">{formatArabicTime(leg.arrivalTime)}</div></div>
                  <div className="cell cell-wide"><div className="cell-label">الوزن</div><div className="cell-value">{weight || "—"}</div></div>
                  <div className="cell"><div className="cell-label">رقم الرحلة</div><div className="cell-value">{leg.flightNumber || "—"}</div></div>

                </div>
                {(showOutTransit || isMulti) && leg.transit.place && (
                  <div className="transit-box">
                    <div className="transit-title">🔄 بيانات الترانزيت</div>
                    <div className="transit-grid">
                      <div className="transit-cell"><div className="cell-label">مكان الترانزيت</div><div className="cell-value">{leg.transit.place}</div></div>
                      <div className="transit-cell"><div className="cell-label">مدة الترانزيت</div><div className="cell-value">{getTransitDuration(leg.transit.arrivalTime, leg.transit.departTime)}</div></div>
                      <div className="transit-cell"><div className="cell-label">وصول الترانزيت</div><div className="cell-value">{formatArabicTime(leg.transit.arrivalTime)}</div></div>
                      <div className="transit-cell"><div className="cell-label">إقلاع من الترانزيت</div><div className="cell-value">{formatArabicTime(leg.transit.departTime)}</div></div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {showReturn && (
              <div className="section">
                <div className="section-title">
                  <div className="section-title-main">
                    <span className="icon">↩</span>
                    بيانات العودة
                  </div>
                  <div className="route-chip">خط السير: {buildRouteText(returnData.fromCountry, returnData.toCountry)}</div>
                </div>
                <div className="grid">
                  <div className="cell cell-wide"><div className="cell-label">التواجد</div><div className="cell-value">{buildAttendanceText(returnData.airport, returnData.hall)}</div></div>
                  <div className="cell"><div className="cell-label">التاريخ</div><div className="cell-value">{returnData.date || "—"}</div></div>
                  <div className="cell"><div className="cell-label">التواجد في المطار الساعة</div><div className="cell-value">{getAirportAttendanceTime(returnData.departTime)}</div></div>
                  <div className="cell"><div className="cell-label">ساعة الإقلاع</div><div className="cell-value">{formatArabicTime(returnData.departTime)}</div></div>
                  <div className="cell"><div className="cell-label">وصول الطائرة</div><div className="cell-value">{formatArabicTime(returnData.arrivalTime)}</div></div>
                  <div className="cell cell-wide"><div className="cell-label">الوزن</div><div className="cell-value myValue">{weight || "—"}</div></div>
                  <div className="cell"><div className="cell-label">رقم الرحلة</div><div className="cell-value">{returnData.flightNumber || "—"}</div></div>
                </div>
                {showReturnTransit && returnData.transit.place && (
                  <div className="transit-box">
                    <div className="transit-title">🔄 بيانات ترانزيت العودة</div>
                    <div className="transit-grid">
                      <div className="transit-cell"><div className="cell-label">مكان الترانزيت</div><div className="cell-value">{returnData.transit.place}</div></div>
                      <div className="transit-cell"><div className="cell-label">مدة الترانزيت</div><div className="cell-value">{getTransitDuration(returnData.transit.arrivalTime, returnData.transit.departTime)}</div></div>
                      <div className="transit-cell"><div className="cell-label">وصول الترانزيت</div><div className="cell-value">{formatArabicTime(returnData.transit.arrivalTime)}</div></div>
                      <div className="transit-cell"><div className="cell-label">إقلاع من الترانزيت</div><div className="cell-value">{formatArabicTime(returnData.transit.departTime)}</div></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="contact-card">
            <div className="contact-grid">
              <div className="contact-block">
                <div className="contact-title">العنوان :</div>
                <div className="contact-line">دمياط الجديدة - المنطقة المركزية - مبنى رقم 152 - مقابل البنك الأهلي</div>
                <div className="contact-line">رقم التليفون: 00201002131321 - 00201002030323</div>
              </div>
              <div className="contact-block" dir="ltr">
                <div className="contact-title">Address :</div>
                <div className="contact-line">Belding No.152, Central Zone, Front of Al - Ahly bank, New Damietta, Egypt</div>
                <div className="contact-line">Tel. +2 0100 20 30 323  -  +2 0100 21 31 321</div>
              </div>
            </div>
            <div className="contact-email"><span>E-Mail :</span> dm@royalvalleytours.com</div>
            <div className="contact-message">مع أطيب التمنيات بقضاء رحلة سعيدة</div>
          </div>

          <div className="footer">جميع الحقوق محفوظة © Royal Valley Tours</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Cairo', 'Segoe UI', sans-serif",
    direction: "rtl",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 0%, #e8edf8 100%)",
    paddingBottom: 60,
  },
  header: {
    background: "linear-gradient(135deg, #1a2744 0%, #2d4a8e 100%)",
    padding: "22px 32px",
    display: "flex",
    alignItems: "center",
    gap: 20,
    direction: "ltr",
    justifyContent: "flex-start",
    boxShadow: "0 4px 20px rgba(26,39,68,0.3)",
  },
  logoFrame: {
    width: 88,
    height: 88,
    background: "white",
    borderRadius: 12,
    padding: 6,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  companyName: {
    color: "white", fontSize: 26, fontWeight: 900,
    letterSpacing: 2, lineHeight: 1.2, textAlign: "left",
  },
  tagline: {
    color: "#a0b4d8", fontSize: 13, marginTop: 3, letterSpacing: 1, textAlign: "left",
  },
  formWrapper: {
    maxWidth: 860, margin: "28px auto", padding: "0 16px",
  },
  sectionCard: {
    background: "white",
    borderRadius: 14,
    boxShadow: "0 2px 16px rgba(26,39,68,0.09)",
    padding: "22px 24px",
    marginBottom: 18,
    border: "1px solid #e2e8f4",
  },
  sectionTitle: {
    display: "flex", alignItems: "center", gap: 10,
    fontSize: 16, fontWeight: 700, color: "#1a2744",
    marginBottom: 18, paddingBottom: 12,
    borderBottom: "2px solid #f0f4ff",
  },
  dot: {
    width: 10, height: 10, borderRadius: "50%",
    background: "#2d4a8e", flexShrink: 0,
  },
  grid2: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16,
  },
  grid3: {
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16,
  },
  field: { display: "flex", flexDirection: "column" },
  label: {
    fontSize: 12, fontWeight: 700, color: "#5a6a8a",
    marginBottom: 6, letterSpacing: 0.3,
  },
  select: {
    border: "1.5px solid #d0d8ee",
    borderRadius: 8, padding: "9px 12px",
    fontSize: 14, color: "#1a2744",
    background: "#fafbff", outline: "none",
    cursor: "pointer", fontFamily: "inherit",
    transition: "border-color 0.2s",
  },
  input: {
    border: "1.5px solid #d0d8ee",
    borderRadius: 8, padding: "9px 12px",
    fontSize: 14, color: "#1a2744",
    background: "#fafbff", outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },
  timeHint: {
    marginTop: 6,
    fontSize: 12,
    color: "#6b7a99",
    fontWeight: 600,
  },
  transitBox: {
    background: "#fff8f0",
    border: "1.5px dashed #f0a500",
    borderRadius: 10, padding: 16,
    marginBottom: 12,
  },
  transitTitle: {
    fontSize: 14, fontWeight: 700, color: "#c07000", marginBottom: 12,
  },
  addBtn: {
    background: "#2d4a8e", color: "white", border: "none",
    borderRadius: 8, padding: "8px 18px", cursor: "pointer",
    fontSize: 13, fontWeight: 700, fontFamily: "inherit",
  },
  removeBtn: {
    background: "#c0392b", color: "white", border: "none",
    borderRadius: 8, padding: "8px 18px", cursor: "pointer",
    fontSize: 13, fontWeight: 700, fontFamily: "inherit",
  },
  printBtn: {
    width: "100%", padding: "16px",
    background: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)",
    color: "white", border: "none", borderRadius: 12,
    fontSize: 18, fontWeight: 900, cursor: "pointer",
    fontFamily: "inherit", letterSpacing: 1,
    boxShadow: "0 4px 20px rgba(192,57,43,0.4)",
    marginTop: 8,
    transition: "transform 0.1s",
  },
};
