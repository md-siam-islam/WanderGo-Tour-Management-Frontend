import { useGetTourtypeQuery } from "@/redux/features/tour/tour.api";


const AddtourType = () => {

  const {data} = useGetTourtypeQuery(undefined)
  console.log(data)


  return (
    <div className="">
      AddtourType
    </div>
  );
};

export default AddtourType;