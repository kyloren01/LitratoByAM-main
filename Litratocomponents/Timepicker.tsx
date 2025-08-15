import { useState } from "react";

export default function Timepicker() {
  // State for each time picker
  const [times, setTimes] = useState([
    { hour: "07", minute: "00", ampm: "am" },
    { hour: "07", minute: "00", ampm: "am" },
  ]);

  // Options
  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const ampmOptions = ["am", "pm"];

  // Labels for mapping
  const timePickers = [
    { label: "Start time of booth" },
    { label: "End time of booth" },
  ];

  // Handle selection
  const handleSelect = (
    pickerIdx: number,
    field: "hour" | "minute" | "ampm",
    value: string
  ) => {
    setTimes((prev) =>
      prev.map((t, idx) => (idx === pickerIdx ? { ...t, [field]: value } : t))
    );
  };

  return (
    <div className="flex flex-col rounded-lg p-4">
      <div className="flex flex-col gap-12">
        {timePickers.map((picker, idx) => (
          <div key={idx}>
            <p className="text-2xl font-semibold">{picker.label}</p>
            <div className="flex flex-row justify-center gap-16 items-center">
              {/* Hour */}
              <div className="relative">
                <select
                  className="bg-gray-400 p-2 rounded-md text-7xl cursor-pointer select-none appearance-none"
                  style={{
                    fontSize: "5rem", // Ensures dropdown options are large
                    lineHeight: "1.1",
                  }}
                  value={times[idx].hour}
                  onChange={(e) => handleSelect(idx, "hour", e.target.value)}
                >
                  {hours.map((h) => (
                    <option
                      key={h}
                      value={h}
                      style={{
                        fontSize: "1rem", // Large dropdown options
                        background: "#e5e7eb",
                        color: "#111",
                        textAlign: "center",
                      }}
                    >
                      {h}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-7xl">:</p>
              {/* Minute */}
              <div className="relative">
                <select
                  className="bg-gray-200 p-2 rounded-md text-7xl cursor-pointer select-none appearance-none "
                  style={{
                    fontSize: "5rem",
                    lineHeight: "1",
                  }}
                  value={times[idx].minute}
                  onChange={(e) => handleSelect(idx, "minute", e.target.value)}
                >
                  {minutes.map((m) => (
                    <option
                      key={m}
                      value={m}
                      style={{
                        fontSize: "1rem",
                        background: "#f3f4f6",
                        color: "#111",
                        textAlign: "center",
                      }}
                    >
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              {/* AM/PM */}
              <div className="relative">
                <select
                  className="bg-gray-400 p-2 rounded-md text-2xl cursor-pointer select-none appearance-none"
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: "1.1",
                  }}
                  value={times[idx].ampm}
                  onChange={(e) => handleSelect(idx, "ampm", e.target.value)}
                >
                  {ampmOptions.map((period) => (
                    <option
                      key={period}
                      value={period}
                      style={{
                        fontSize: "1rem",
                        background: "#e5e7eb",
                        color: "#111",
                        textAlign: "center",
                      }}
                    >
                      {period}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
