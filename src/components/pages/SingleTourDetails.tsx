import { useGetsingleTourMutation } from "@/redux/features/tour/tour.api";
import { useEffect } from "react";
import { useParams } from "react-router";

const SingleTourDetails = () => {

const [getSingleTour, { data, isLoading }] = useGetsingleTourMutation();

const {id} = useParams()
console.log(id)

useEffect(() => {
   if (id) {
      getSingleTour(id);
    }
} , [id])

  const tour = data?.data;

  return (
     <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">{tour?.title}</h1>
      <p>{tour?.description}</p>
    </div>
  );
};

export default SingleTourDetails;