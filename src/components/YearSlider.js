export default function YearSlider({ year, setYear }) {
  return (
    <div style={{ margin: '20px' }}>
      <label htmlFor="year">Year: {year}</label>
      <input
        type="range"
        id="year"
        min="1991"
        max="2025"
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value))}
      />
    </div>
  );
}
