const BASE_URL = ""

const APIs = {
    rest:{
        loginMedico:`${BASE_URL}/medic/login`,
        loginPaciente:`${BASE_URL}/patient/login`,
        registerMedico:`${BASE_URL}/medic/register`,
        registerPaciente:`${BASE_URL}/patient/register`,
        createReceta:`${BASE_URL}/patient/create-receta`,
    },
    test:'https://randomuser.me/api/?results=1'
}

export default APIs