import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { Stack, Button } from "@mui/material";
import { FC, useState } from "react";
import { Tooltip, Modal, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DragAndDrop from "./DragAndDrop";
import { FORMS } from "../constants";
import { DependencyProps } from "../types";

const Dependency: FC<DependencyProps> = ({ name }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Accordion
        sx={{
          bgcolor: "grey.200",
          py: 0,
          px: 1,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {FORMS.map((e, index) => (
            <Stack key={index} spacing={1.5} pb={1.5} direction="row">
              <PictureAsPdfOutlinedIcon sx={{ color: "red" }} />
              <Typography textAlign="center">{e.label}</Typography>
            </Stack>
          ))}

          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            pt={3}
            pb={1}
          >
            <Tooltip onClick={() => setOpen(true)} title="Add">
              <Button
                sx={{ p: ".5em .75" }}
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
              >
                Add {name}
              </Button>
            </Tooltip>

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
                <Typography variant="subtitle1" gutterBottom lineHeight={3}>
                  {name}s information
                </Typography>
                <DragAndDrop name={name} />
              </Box>
            </Modal>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Dependency;
