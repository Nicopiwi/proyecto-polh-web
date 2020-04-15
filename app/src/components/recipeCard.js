import React, {useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import './css/modal.css'
import APIs from '../APIs';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme)=>createStyles({
        container:{
            //alignItems:'flex-start',
            margin: theme.spacing(2),
        },
        widthRestrict:{
          width:'800px',
        },
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
    })
);

export default function RecipeCard(props) {

    const cutText = (text)=>{
        return {first:text.substring(0,60), second:text.substring(61, 120)};
    }
    const [modalStyle] = useState(getModalStyle);
    const [openModal, setOpenModal] = useState(false);
    const [recetaTexto, setRecetaTexto] = useState('');


    const handleOpen= async ()=>{
      setOpenModal(true)
      let headers = new Headers();
      headers.append('token', localStorage.getItem('userToken'));
      let text = await fetch(APIs.rest.transformHashToText + props.recipeText, {method:'GET', headers})
      setRecetaTexto(text.message)
      
    }
    const handleClose = () => {
      setOpenModal(false);
    };
    
    const classes = useStyles();

  return (
    <React.Fragment>
    <Card className={classes.widthRestrict} >
        <CardContent>
            <div className={classes.container}>
                <div>
      
                <Typography variant="body1" color="textPrimary" component="p">
            Receta
          </Typography>
          {/*props.recipeText && (<><Typography variant="body1" color="textPrimary" component="p">
            {props.recipeText.substring(0,60)}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {props.recipeText.substring(60, 120)}
          </Typography>
	<Typography variant="body1" color="textPrimary" component="p">
            {props.recipeText.substring(120)}
          </Typography></>)*/}
          <Button onClick={()=>handleOpen()} size="small" color="primary">
          Ver
        </Button>
          </div>
          
          <Typography variant="body1" color={props.used?'error':'primary'} component="h6">
            Estado: {!props.used && 'No'} usado
          </Typography>
          <div>
          <Typography variant="body2" color="textSecondary" component="p">
            Address del paciente: {props.address}
          </Typography>
          </div>
          </div>
        </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
    <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="receta-texto"
      >
        <textarea value={recetaTexto?recetaTexto:"Texto"} disabled id="textoModal">
        </textarea>
      </Modal>
    </React.Fragment>
  );
}