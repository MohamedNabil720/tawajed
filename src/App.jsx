import { useState } from "react";

const tripTypes = {
  oneWay: "ذهاب",
  roundTrip: "ذهاب وعودة",
};

const fixedLogo = "/logo.jfif";

const createSegment = (defaults = {}) => ({
  attendanceAirport: "",
  attendanceTerminal: "",
  attendanceDate: "",
  attendanceTime: "",
  attendancePeriod: "",
  departureTime: "",
  departurePeriod: "",
  arrivalTime: "",
  arrivalPeriod: "",
  flightNumber: "",
  airline: "",
  baggage: "",
  ...defaults,
});

const fieldGroups = [
  { key: "attendanceAirport", label: "مطار التواجد", placeholder: "مطار القاهرة" },
  { key: "attendanceTerminal", label: "الصالة", placeholder: "صالة 2" },
  { key: "attendanceDate", label: "تاريخ التواجد", placeholder: "20/03/2026" },
  { key: "attendanceTime", label: "وقت التواجد", placeholder: "11:30" },
  { key: "attendancePeriod", label: "فترة التواجد", placeholder: "صباحا" },
  { key: "departureTime", label: "وقت الإقلاع", placeholder: "2:15" },
  { key: "departurePeriod", label: "فترة الإقلاع", placeholder: "ظهرا" },
  { key: "arrivalTime", label: "وقت الوصول", placeholder: "5:20" },
  { key: "arrivalPeriod", label: "فترة الوصول", placeholder: "مساءا" },
  { key: "flightNumber", label: "رقم الرحلة", placeholder: "306" },
  { key: "airline", label: "شركة الطيران", placeholder: "الخطوط السعودية" },
  { key: "baggage", label: "الوزن", placeholder: "هاند باج 7 + 23" },
];

const tableRows = [
  ["التواجد", "attendanceAirport", "attendanceTerminal", "attendanceDate", "attendanceTime", "attendancePeriod"],
  ["الإقلاع", "", "", "", "departureTime", "departurePeriod"],
  ["الوصول", "", "", "", "arrivalTime", "arrivalPeriod"],
  ["رقم الرحلة", "airline", "flightNumber", "", "", ""],
  ["الوزن", "baggage", "", "", "", ""],
];

function SegmentForm({ title, values, onChange }) {
  return (
    <section className="segment-card">
      <div className="segment-header">
        <h3>{title}</h3>
        
      </div>

      <div className="form-grid">
        {fieldGroups.map((field) => (
          <label className="field" key={field.key}>
            <span>{field.label}</span>
            <input
              type="text"
              value={values[field.key]}
              onChange={(event) => onChange(field.key, event.target.value)}
              placeholder={field.placeholder}
            />
          </label>
        ))}
      </div>
    </section>
  );
}

function renderValue(values, key) {
  return key ? values[key] || "ـــ" : "ـــ";
}

function SegmentTable({ title, values }) {
  return (
    <section className="print-section">
      <div className="print-title">{title}</div>
      <table className="flight-table">
        <tbody>
          {tableRows.map(([label, col1, col2, col3, col4, col5]) => (
            <tr key={label}>
              <th>{label}</th>
              <td>{renderValue(values, col1)}</td>
              <td>{renderValue(values, col2)}</td>
              <td>{renderValue(values, col3)}</td>
              <td>{renderValue(values, col4)}</td>
              <td>{renderValue(values, col5)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function App() {
  const [tripType, setTripType] = useState("oneWay");
  const [clientName, setClientName] = useState("");
  const [departure, setDeparture] = useState(
    createSegment({
      attendanceAirport: "مطار القاهرة",
      attendanceTerminal: "صالة 2",
      airline: "الخطوط السعودية",
    }),
  );
  const [returnTrip, setReturnTrip] = useState(
    createSegment({
      attendanceAirport: "مطار جدة",
      attendanceTerminal: "صالة 1",
      airline: "الخطوط السعودية",
    }),
  );

  const handleSegmentChange = (setter) => (key, value) => {
    setter((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <div className="app-shell">
      <main className="layout">
        <section className="panel form-panel no-print">
          <div className="panel-head">
           
            <h1> تواجد   </h1>
          </div>

          <section className="segment-card">
           

            <div className="form-grid">
              <label className="field">
                <span>نوع الرحلة</span>
                <select value={tripType} onChange={(event) => setTripType(event.target.value)}>
                  <option value="oneWay">{tripTypes.oneWay}</option>
                  <option value="roundTrip">{tripTypes.roundTrip}</option>
                </select>
              </label>

              <label className="field">
                <span>اسم العميل</span>
                <input
                  type="text"
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  placeholder="اكتب اسم العميل"
                />
              </label>
            </div>
          </section>

          <SegmentForm
            title="بيانات الذهاب"
            values={departure}
            onChange={handleSegmentChange(setDeparture)}
          />

          {tripType === "roundTrip" ? (
            <SegmentForm
              title="بيانات العودة"
              values={returnTrip}
              onChange={handleSegmentChange(setReturnTrip)}
            />
          ) : null}

          <div className="actions">
            <button type="button" className="primary-btn" onClick={() => window.print()}>
              طباعة
            </button>
          </div>
        </section>

        <section className="panel preview-panel">
          <div className="ticket-sheet">
            <div className="print-header">
              <img src={fixedLogo} alt="Royal Valley Tours" className="print-logo" />
              <div className="print-meta">
                <p><strong>اسم العميل:</strong> {clientName || "................................"}</p>
                <p><strong>نوع الرحلة:</strong> {tripTypes[tripType]}</p>
                <p>مع أطيب التمنيات بقضاء رحلة سعيدة</p>
              </div>
            </div>

            <SegmentTable title="الذهـــــــــــاب" values={departure} />

            {tripType === "roundTrip" ? (
              <SegmentTable title="العــــــــــودة" values={returnTrip} />
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
