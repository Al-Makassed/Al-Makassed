import React from "react";
// import Paper from '@mui/material/Paper';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Stack, Button } from "@mui/material";
import { FC, useState } from "react";
import { Tooltip, Modal, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import AddDependency from "./AddDependency";

interface PROPS {
  name: string;
}
const Dependency: FC<PROPS> = ({ name }) => {
  const [open, setOpen] = useState(false);
  // const [expanded, setExpanded] = useState<String | false>(false);

  // const handleChange = (isExpanded: boolean, panel: string) => {
  //   setExpanded(isExpanded ? panel : false)
  // }
  return (
    // <Paper elevation={9} sx={{ bgcolor: theme => theme.palette.maqasid.secondary  }}>
    <Box>
      <Accordion
        sx={{ bgcolor: (theme) => theme.palette.maqasid.secondary }}
        // expanded={expanded === name}
        // onChange={(event, isExpanded) => handleChange(isExpanded, name)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="h5"
            sx={{ color: (theme) => theme.palette.maqasid.primary }}
          >
            {name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data.map((e, index) => (
            <Stack key={index} spacing={3} pb={1.5} direction="row">
              <PictureAsPdfIcon
                sx={{ color: (theme) => theme.palette.maqasid.primary }}
              />
              <Typography textAlign="center">{e.label}</Typography>
            </Stack>
          ))}

          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Tooltip
              onClick={() => setOpen(true)}
              title="Add"
              sx={{
                color: (theme) => theme.palette.maqasid.secondary,
                bgcolor: (theme) => theme.palette.maqasid.primary,
              }}
            >
              {/* <Fab  size='small' aria-label="add">
                <AddIcon />
              </Fab> */}
              <Button
                color="success"
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
              >
                Add {name}
              </Button>
            </Tooltip>
            {/* <Typography p={1}>Add {name} </Typography> */}

            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                width={500}
                height={350}
                bgcolor="white"
                p={5}
                borderRadius={5}
              >
                {/* <Typography gutterBottom variant='subtitle1'>{name}s information</Typography>
                <Stack p={2}  width={300} alignItems='center' border=' dashed 5px' borderRadius={5} sx={{ borderColor: theme => theme.palette.maqasid.secondary }} >
                  <DriveFolderUploadIcon sx={{ color: theme => theme.palette.maqasid.primary }} />
                  <Typography lineHeight={2}  variant='h6' >Drag and drop a file or</Typography>
                  <Typography variant='h5' sx={{ color: theme => theme.palette.maqasid.primary }} >Browse</Typography>
                </Stack> */}
                <AddDependency />
              </Box>
            </Modal>
          </Stack>
        </AccordionDetails>
      </Accordion>
      {/* // </Paper> */}
    </Box>
  );
};

export default Dependency;

const data = [
  {
    label: "Form-Name-1",
  },

  {
    label: "Form-Name-2",
  },

  {
    label: "Form-Name-3",
  },
];
