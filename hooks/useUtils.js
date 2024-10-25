import axios from "axios";

export default function useUtils() {
  const convertToUSDC = async (id, convert_id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gas/conversion?convert_id=${convert_id}&id=${id}`
      );

      if (response.data.status.error_code !== "0") {
        return 0;
      }

      return response.data.data.quote[0].price;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  return { convertToUSDC };
}
