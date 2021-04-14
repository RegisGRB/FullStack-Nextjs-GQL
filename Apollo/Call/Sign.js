function Hello() {
  const [StartLog, { called, loading, data }] = useLazyQuery(
    Apollo.default.UserQuery.Login
  );
  const Login = async ({ Email, Password }) => {
    await StartLog({
      variables: { Email: Email.value, Password: Password.value },
    });
  };
  Login();
  if (called && loading) return "Loading...";
  if (data && data.login) return data.login;
}

const [StartRegister, Regdata] = useMutation(Apollo.default.UserQuery.Register);

const Auth = (data) => {
  localStorage.setItem("token", data);
  UserContextx.SetAuth(true);
  router.push("Home");
};
const Register = async ({
  Email,
  Password,
  Firstname,
  Lastname,
  Phone,
  Adress,
}) => {
  await StartRegister({
    variables: {
      Email: Email.value,
      Password: Password.value,
      Firstname: Firstname.value,
      Lastname: Lastname.value,
      Phone: Phone.value,
      Adress: Adress.value,
      isAdmin: false,
    },
  });
};
React.useEffect(() => {
  if (Logdata.data && Logdata.data.login) {
    Auth(Logdata.data.login);
  }
  if (Regdata.data && Regdata.data.signup) {
  }
}, [Logdata]);
