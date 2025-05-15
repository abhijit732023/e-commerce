import React, { useState } from "react";
import {AddressCard,Address_form, Container} from '../../FilesPaths/all_path';
import { useParams } from "react-router-dom";

const AddressPage = ({addressid}) => {
  const { userid } = useParams();
  const [isAdding, setIsAdding] = useState(false);
  const[addressId,setAddressId]=useState(null)

const handleadressid = (addressId) => {
  console.log("Address ID:", addressId);
  setAddressId(addressId);
  // if (typeof address_id === "function") {
  //   address_id(addressId);
  // }
};
  return (
    // <Container>
      
    <div className=" h-[95vh] overflow-y-scroll max-w-xl mx-auto  space-y-6">


      <AddressCard
        addressid={handleadressid}
        userid={userid}
      />
    </div>
  
  // </Container>
    );
};

export default AddressPage;
