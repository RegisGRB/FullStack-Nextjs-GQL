import * as Pages from "../pages";
 const routes = [
  {
    path: "/",
    protectedRoute: false,
    nav: {
      show: true,
      icon: <></>,
      name: "Print lux",
    },
  },
    {
      path: "/Home",
      protectedRoute: true,
      nav: {
        show: true,
        icon: <></>,
        name: "Home",
      },
    },
    
 
  ];
  export default routes;