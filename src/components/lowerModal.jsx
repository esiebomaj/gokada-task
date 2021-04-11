const LowerModal = ({ infoModalOpen }) => {
  return (
    <div className={infoModalOpen ? "show lower-modal" : "hide lower-modal"}>
      <span className="price"> &#8358;1500,00</span>
      <span className="distance">3.3km | 24mins</span>
      <button>Enter Parcel Details</button>
    </div>
  );
};

export default LowerModal;
