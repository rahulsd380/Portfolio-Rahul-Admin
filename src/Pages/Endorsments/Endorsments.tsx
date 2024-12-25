import EndorsmentsTable from "./EndorsmentsTable";


const Endorsments = () => {


  return (
    <div className='font-Poppins'>
      {/* Header */}
        <h1 className="text-[#aeb9e1] text-2xl font-semibold font-Poppins">
        Endorsments
        </h1>
      
      {/* Endorsments Table */}
      <EndorsmentsTable />
    </div>
  );
};

export default Endorsments;
