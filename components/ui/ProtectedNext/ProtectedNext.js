import React from "react";
import { useAuth, SignForm } from "../../../context/AuthContext";
import Sign from "../Sign/Sign";
import { useRouter } from "next/router";
const ProtectedNext = ({ children }) => {
  const [Protected, setProtected] = React.useState(true);
  const { isSignedIn, Getme, userdata, authToken } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    setProtected(isSignedIn());
  }, [authToken]);

  React.useEffect(() => {
    if (!userdata) {
      Getme();
    }
  }, [Getme, userdata]);
  React.useEffect(() => {
    if (!Protected) router.push("/");
  });
  return <>{Protected && children}</>;
};

export default ProtectedNext;
