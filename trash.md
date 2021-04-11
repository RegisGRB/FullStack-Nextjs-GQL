 const [xLOG, { data }] = useMutation(LOG);
  const { loading, error, data } = useQuery(LOG, {
    variables: { Email: Email.value, Password: Password.value },
  });
  const { loading, error, data, refetch } = useQuery(LOG, {
    variables: { Email: "frege@ger.gege", Password: "gegege" }
  });

  const Auth = (data) => {
    localStorage.setItem("token", data);
    console.log(localStorage.getItem("token"));
    UserContextx.SetAuth(true);
    router.push("Home");
  };

  const [StartLog, Logdata] = useLazyQuery(
    Apollo.default.UserQuery.Login
  );
  const Login = async ({ Email, Password }) => {
    await StartLog({
      variables: { Email: Email.value, Password: Password.value },
    });
 
  };
  const [StartRegister, Regdata] = useMutation(
    Apollo.default.UserQuery.Register
  );
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
    
    if(Logdata.data && Logdata.data.login){
      Auth(Logdata.data.login)
    }
    if(Regdata.data && Regdata.data.signup){
     console.log(Regdata)
    }
    
  }, [Logdata]);