const Filter = ({ findName, handleFindNameChange }) => (
    <div>
      filter shown with <input value={findName} onChange={handleFindNameChange} />
    </div>
  )

  export default Filter;