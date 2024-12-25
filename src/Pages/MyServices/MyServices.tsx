import Ripples from 'react-ripples';
import { useState } from "react";
import AddNewService from './AddNewService';
import MyServicesTable from './MyServicesTable';

const MyServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  


  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between font-Poppins">
        <h1 className="text-[#aeb9e1] text-2xl font-semibold font-Poppins">
          My Services
        </h1>
        <Ripples placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="bg-[#1C2242] border border-[#282D45] p-3 rounded-lg text-[#aeb9e1]"
          >
            Add New Service
          </button>
        </Ripples>
      </div>

      {/* Services Table */}
      <MyServicesTable />

      <AddNewService isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default MyServices;
