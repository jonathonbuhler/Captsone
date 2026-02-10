import { useParams } from "react-router-dom";

function LaptopView() {
  const { id } = useParams();

  return <>{id}</>;
}

export default LaptopView;
