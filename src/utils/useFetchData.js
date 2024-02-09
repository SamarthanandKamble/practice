const useFetchData = () => {
  let result = [];
  const fetchTheData = async () => {
    try {
      const data = await fetch("https://api.publicapis.org/entries");
      const { entries } = await data.json();
      result = entries;
      console.log("result:", result);
    } catch (error) {
      console.log("error", error?.message);
    }
  };
  fetchTheData();
  return result;
};

export default useFetchData;
