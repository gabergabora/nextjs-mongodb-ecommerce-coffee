import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Shipping() {
  const router = useRouter();

  //? store
  const { userInfo } = useSelector((state) => state.user);

  //? hanlde routing
  if (!userInfo) router.push("/login?redirect=/shipping");

  return <div>Shipping</div>;
}
