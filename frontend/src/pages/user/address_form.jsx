import React, { useState } from "react";
import { AddressCard, Container } from '../../FilesPaths/all_path';
import { useNavigate, useParams } from "react-router-dom";

const AddressPage = () => {
  const { userid } = useParams();
  const navigate = useNavigate(); // ✅ needed for navigation
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleAddressId = (addressId) => {
    setSelectedAddressId(addressId); // optional local state update
    navigate(`/cart/${userid}`, { state: { address_id: addressId } }); // ✅ pass address_id to CartPage
  };

  return (
    <div className="h-[95vh] overflow-y-scroll max-w-xl mx-auto space-y-6">
      <AddressCard
        addressid={handleAddressId} // ✅ sending the handler to AddressCard
        userid={userid}
      />
    </div>
  );
};

export default AddressPage;
