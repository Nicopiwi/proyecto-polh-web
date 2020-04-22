const BASE_URL = "https://agile-wave-01119.herokuapp.com";

const APIs = {
  rest: {
    loginMedico: `${BASE_URL}/medico/login`,
    loginPaciente: `${BASE_URL}/paciente/login`,
    loginFarmacia: `${BASE_URL}/farmacia/login`,
    registerMedico: `${BASE_URL}/medico/register`,
    registerPaciente: `${BASE_URL}/paciente/register`,
    registerFarmacia: `${BASE_URL}/farmacia/register`,
    forgotPasswordMedico: `${BASE_URL}/medico/forgot`,
    forgotPasswordFarmacia: `${BASE_URL}/farmacia/forgot`,
    createReceta: `${BASE_URL}/receta/issue`,
    getRecetasMedico: `${BASE_URL}/receta/get-medic`,
    getRecetasFarmacia: `${BASE_URL}/receta/get-farmacia`,
    updateMedico: `${BASE_URL}/medico/update`,
    updateFarmacia: `${BASE_URL}/farmacia/update`,
    transformHashToText: `${BASE_URL}/receta/read-recipe/`,
  },
  test: "https://randomuser.me/api/?results=1",
};

export default APIs;
