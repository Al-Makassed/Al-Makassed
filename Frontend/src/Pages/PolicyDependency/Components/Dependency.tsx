 
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Stack } from '@mui/material';
import { FC, useState } from 'react';
import { Fab, Tooltip, Modal, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';


interface PROPS {
  name: string,
  
}
const Dependency: FC<PROPS> = ({ name   }) => {
  const [open, setOpen] = useState(false)
  return (
    <Paper elevation={9} sx={{ bgcolor: theme => theme.palette.maqasid.secondary, width: 220 }}>
      <Accordion
        sx={{ bgcolor: theme => theme.palette.maqasid.secondary }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          // aria-controls={id}
         
        >
          <Typography variant='h5' sx={{ color: theme => theme.palette.maqasid.primary }}>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails >

          {data.map((e) => (
            <Stack spacing={3} pb={1.5} direction='row'>
              <PictureAsPdfIcon sx={{ color: theme => theme.palette.maqasid.primary }} />
              <Typography textAlign="center">{e.label}</Typography>

            </Stack>
          ))}

          <Stack flexDirection='row' alignItems="center" justifyContent="center">
            <Tooltip
              onClick={()=> setOpen(true)}
              title="Add"
              sx={{ color: theme => theme.palette.maqasid.secondary, bgcolor: theme => theme.palette.maqasid.primary }}
            >
              <Fab  size='small' aria-label="add">
                <AddIcon />
              </Fab>
            </Tooltip>
            <Typography p={1}>Add {name} </Typography>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Box width={400} height={280} bgcolor="white" p={3} borderRadius={5}>
                <Typography variant='h6'>{name}s information</Typography>
                <Stack alignItems='center' border='dashed 1px' sx={{ borderColor: theme => theme.palette.maqasid.secondary }} >
                  <DriveFolderUploadIcon sx={{ color: theme => theme.palette.maqasid.primary }}/>
                  <Typography variant='h5' >Drag and drop a file or</Typography>
                  <Typography variant='h4' sx={{ color: theme => theme.palette.maqasid.primary }} >Browse</Typography>
                </Stack>

              </Box>
            </Modal>

          </Stack>

        </AccordionDetails>


      </Accordion>
    </Paper>

  )
}

export default Dependency

const data = [
  {
    label: 'Form-Name-1'
  },

  {
    label: 'Form-Name-2'
  },

  {
    label: 'Form-Name-3'
  },
];