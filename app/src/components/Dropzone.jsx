import { useRef, useState } from "react";

export default function Dropzone() {
  const [files, setFiles] = useState([]);
  const [isOver, setIsOver] = useState(false);
  const inputRef = useRef(null);

  function addFiles(fileList) {
    const incoming = Array.from(fileList);

    // (Opcional) evitar duplicados por nombre+tamaño
    const merged = [...files];
    for (const f of incoming) {
      const exists = merged.some(x => x.name === f.name && x.size === f.size);
      if (!exists) merged.push(f);
    }
    setFiles(merged);
  }

  function onDrop(e) {
    e.preventDefault();
    setIsOver(false);
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDragEnter(e) {
    e.preventDefault();
    setIsOver(true);
  }

  function onDragLeave(e) {
    e.preventDefault();
    setIsOver(false);
  }

  function onPickFiles(e) {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = "";
  }

  function removeAt(idx) {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
        style={{
          border: "2px dashed #888",
          borderRadius: 12,
          padding: 24,
          textAlign: "center",
          cursor: "pointer",
          userSelect: "none",
          transform: isOver ? "scale(1.01)" : "scale(1)",
        }}
      >
        <p style={{ margin: 0, fontWeight: 600 }}>
          Arrastra archivos aquí o haz click para elegir
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={onPickFiles}
          style={{ display: "none" }}
        />
      </div>


      {files.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h3 style={{ margin: "0 0 8px" }}>Archivos ({files.length})</h3>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {files.map((f, idx) => (
              <li key={`${f.name}-${f.size}-${idx}`} style={{ marginBottom: 6 }}>
                <span>
                  {f.name} — {(f.size / 1024).toFixed(1)} KB
                </span>
                <button
                  onClick={() => removeAt(idx)}
                  style={{ marginLeft: 10 }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

