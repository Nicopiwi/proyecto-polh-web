import React, {useState, useEffect} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import tiempo from 'tiempo';

import './css/modal.css'


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
    const [tiempoHace, setTiempoHace] = useState('')
    useEffect(()=>{
	let created = new Date(props.date)
	let now = new Date()
	if (now.getTime() - created.getTime() >= 10000){
		tiempo.config({ locale: 'es' });
      		setTiempoHace(tiempo.format(props.date, new Date()));
	}
	else{
		setTiempoHace('hace menos de 10 segundos')
	}
      
    }, [])
    const classes = useStyles();

  return (
    <React.Fragment>
    <Card className={classes.widthRestrict} >
        <CardContent>
            <div className={classes.container}>
                <div>
      
                <Typography variant="h5" color="textPrimary" component="p">
            Receta
          </Typography>
          <div>
            <img alt="receta" src={require('../assets/medical-prescription.png')}/>
          </div>
          {/*props.recipeText && (<><Typography variant="body1" color="textPrimary" component="p">
            {props.recipeText.substring(0,60)}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {props.recipeText.substring(60, 120)}
          </Typography>
	<Typography variant="body1" color="textPrimary" component="p">
            {props.recipeText.substring(120)}
          </Typography></>)*/}
          <Button onClick={()=>props.handleOpen(props.recipeText)} size="small" color="primary">
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
          <Typography variant="body2" color="textSecondary" component="p">
            Creada {tiempoHace}
          </Typography>
          </div>
          </div>
        </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
    
    </React.Fragment>
  );
}