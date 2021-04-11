const AutoCompleteComponent = ({ autocompleteClicked, autocomplete }) => {
  return (
    <div className="autocomplete-container">
      {autocomplete?.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => autocompleteClicked(item)}
            className="autocomplete-item"
          >
            <div className="address-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="address">
              <div className="address-1">
                {item.structured_formatting.main_text}
              </div>
              <div className="address-2">
                {item.structured_formatting.secondary_text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AutoCompleteComponent;
