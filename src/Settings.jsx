function Settings({ hostnameList, setHostnameList }) {
  const handleInputChange = (event, index) => {
    const { value } = event.target
    const list = [...hostnameList]
    list[index] = value
    setHostnameList(list)
  }

  const handleAddInput = () => {
    setHostnameList([...hostnameList, ''])
  }

  const handleRemoveInput = (index) => {
    const list = [...hostnameList]
    list.splice(index, 1)
    setHostnameList(list)
    chrome.storage.local.set({ hostnameList: list })
  }

  const handleBlur = () => {
    chrome.storage.local.set({ hostnameList })
  }

  return (
    <div className="host-list">
      {hostnameList.map((input, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Enter hostname"
            value={input}
            onChange={(event) => handleInputChange(event, index)}
            onBlur={handleBlur}
            readOnly={index < 2}
          />
          <span className="icon" onClick={handleAddInput}>
            +
          </span>
          {index >= 2 && (
            <span className="icon" onClick={() => handleRemoveInput(index)}>
              -
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Settings
