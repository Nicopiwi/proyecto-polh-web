const BASE_URL = "http://localhost:8080"

const APIs = {
    rest:{
        loginMedico:`${BASE_URL}/medico/login`,
        loginPaciente:`${BASE_URL}/paciente/login`,
        registerMedico:`${BASE_URL}/medico/register`,
        registerPaciente:`${BASE_URL}/paciente/register`,
        createReceta:`${BASE_URL}/receta/issue`,
        getRecetasMedico:`${BASE_URL}/receta/get-medic`,
    },
    test:'https://randomuser.me/api/?results=1'
}

export default APIs