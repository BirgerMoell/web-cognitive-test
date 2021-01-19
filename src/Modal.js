import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
 


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Forskningsprojekt om röst och kognition</h2>
      <p id="simple-modal-description">
      Studien bedrivs vid Tal Musik Hörsel på KTH
      med målsättning att förbättra diagnostik vid Alzheimer.
      </p>
      <p id="simple-modal-description">
      Studien riktar sig främst till dig som har fått en diagnos relaterad till kognitiv nedsättning
      som MCI eller Alzheimers sjukdom.
      </p>
      <p id="simple-modal-description">
      Genom att vara med i studien godkänner du att din röst sparas och lagras på
      servrar tillhörande Kungliga Tekniska Högskolans enhet för Tal Musik Hörsel.
      </p>
      <p id="simple-modal-description">
      Ansvarig forskare för studien är Professor Jonas Beskow (beskow@kth.se) och Birger Moëll (bmoell@kth.se).
      </p>

      <button type="button" onClick={props.handleClose}>
        Jag godkänner att min röst används i en forskningsstudie
      </button>
      
      <button type="button" onClick={props.handleOpen}>
        Jag vill inte medverka i studien.
      </button>
      <SimpleModal />
    </div>
  );

  return (
    <div>
      
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
