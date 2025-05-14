import React, { useState } from "react";
import {AddressCard,Address_form} from '../../FilesPaths/all_path';
import { useParams } from "react-router-dom";

const AddressPage = ({address_id}) => {
  const { userid } = useParams();
  const [isAdding, setIsAdding] = useState(false);
  const[addressId,setAddressId]=useState(null)

 const handleadressid = (addressId)=>{
  console.log("Address ID:", addressId);
  setAddressId(addressId);
   address_id(addressId)


 }

  return (
    <div className="p-4  max-w-xl mx-auto  space-y-6">


      <AddressCard
        addressid={handleadressid}
        userid={userid}
      />
    </div>
  );
};

export default AddressPage;
