const BASE_URL = "https://agile-wave-01119.herokuapp.com";

const APIs = {
  rest: {
    loginMedico: `${BASE_URL}/medico/login`,
    loginPaciente: `${BASE_URL}/paciente/login`,
    loginFarmacia: `${BASE_URL}/farmacia/login`,
    registerMedico: `${BASE_URL}/medico/register`,
    registerPaciente: `${BASE_URL}/paciente/register`,
    registerFarmacia: `${BASE_URL}/farmacia/register`,
    createReceta: `${BASE_URL}/receta/issue`,
    getRecetasMedico: `${BASE_URL}/receta/get-medic`,
    transformHashToText: `${BASE_URL}/receta/read-recipe/`,
  },
  test: "https://randomuser.me/api/?results=1",
};

export default APIs;
