import './index.css'

const FilterGroup = props => {
  const renderSalaryRangeView = () => {
    const {salaryRangesList, changeSalaryActiveId} = props

    return salaryRangesList.map(range => {
      const {label, salaryRangeId} = range

      const onchangeActiveId = () => {
        changeSalaryActiveId(salaryRangeId)
      }

      return (
        <li
          className="salary-list-item"
          onClick={onchangeActiveId}
          key={salaryRangeId}
        >
          <input
            type="radio"
            value={salaryRangeId}
            id={salaryRangeId}
            name="salary-range"
          />
          <label htmlFor={salaryRangeId} className="label">
            {label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="type-of-range-container">
      <h1 className="type-of-employment">Salary Range</h1>
      <ul className="salary-ranger-list-container">
        {renderSalaryRangeView()}
      </ul>
    </div>
  )
}
export default FilterGroup
