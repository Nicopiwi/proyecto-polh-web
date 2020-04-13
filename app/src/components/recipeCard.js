import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>createStyles({
        container:{
            //alignItems:'flex-start',
            margin: theme.spacing(2),
        },
        widthRestrict:{
          width:'800px',
        }
    })
);

export default function RecipeCard(props) {

    const cutText = (text)=>{
        return {first:text.substring(0,60), second:text.substring(61, 120)};
    }

    
    const classes = useStyles();

  return (
    <Card className={classes.widthRestrict} >
        <CardContent>
            <div className={classes.container}>
                <div>
                <Typography variant="body1" color="textPrimary" component="p">
            Hash:
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {props.recipeText.substring(0,60)}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {props.recipeText.substring(61,props.recipeText)}
          </Typography>
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
        {/*
        <Button size="small" color="primary">
          Ver
        </Button>
        */}
      </CardActions>
    </Card>
  );
}