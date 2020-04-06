import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>createStyles({
        container:{
            alignItems:'flex-start',
            margin: theme.spacing(2)
        },
    })
);

export default function RecipeCard(props) {

    const cutText = (text)=>{
        return text.length<200?text:text.substring(0,200);
    }
    const classes = useStyles();

  return (
    <Card fullWidth>
        <CardContent>
            <div className={classes.container}>
                <div>
          <Typography variant="body1" color="textPrimary" component="p">
            {cutText(props.recipeText)}
          </Typography>
          </div>
          <div>
          <Typography variant="body2" color="textSecondary" component="p">
            Address del paciente: {props.address}
          </Typography>
          </div>
          </div>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Ver
        </Button>
      </CardActions>
    </Card>
  );
}