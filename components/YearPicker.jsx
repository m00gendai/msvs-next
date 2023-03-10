import s from "../styles/YearPicker.module.css"

export default function yearPicker({currentYear, setCurrentYear}){
  
    const date = new Date()
    const isYear = date.getFullYear()

  const years = Array.from({ length: 11 }, (v, i) => isYear - i);

  function changeYear() {
    const year = document.getElementById('yearSelector').value;
    setCurrentYear(year);
  }

  return (
      <div className={s.wrapper} >
        <select id="yearSelector" onChange={() => changeYear()}>
          {years.map((year) => {
            return (
              <option key={`select_${year}`} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
  );
}
